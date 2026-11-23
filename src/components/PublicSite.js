import React, { useEffect } from "react";
import { DEFAULT_SITE_CONTENT, mergeSiteContent } from "../siteContent";

function upsertMeta(name, content, attribute = "name") {
  if (!content) return;
  let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attribute, name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function SiteMeta({ content = DEFAULT_SITE_CONTENT, pageKey = "home" }) {
  const site = mergeSiteContent(content);
  const page = pageKey === "home" ? null : site.pages?.[pageKey];
  const title = page?.title ? `${page.title} | ${site.siteName}` : site.seo.title;
  const description = page?.description || site.seo.description || site.description;
  const canonical = `${String(site.canonicalBaseUrl || "https://dumps.cloud").replace(/\/$/, "")}${pageKey === "home" ? "/" : `/${pageKey}`}`;

  useEffect(() => {
    document.title = title;
    upsertMeta("description", description);
    upsertMeta("keywords", site.seo.keywords);
    upsertMeta("robots", "index,follow,max-image-preview:large");
    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:type", pageKey === "home" ? "website" : "article", "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:image", new URL(site.ogImageUrl || "/og-image.svg", window.location.origin).href, "property");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", new URL(site.ogImageUrl || "/og-image.svg", window.location.origin).href);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
    let favicon = document.head.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = site.faviconUrl || "/favicon-32x32.png";
    let schema = document.getElementById("dumpstart-jsonld");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "dumpstart-jsonld";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: site.siteName,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: canonical,
      description,
      image: new URL(site.ogImageUrl || "/og-image.svg", window.location.origin).href,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free practice access available" },
    });
  }, [canonical, description, pageKey, site.faviconUrl, site.ogImageUrl, site.seo.keywords, site.siteName, title]);

  return null;
}

function SiteHeader({ content, onOpenAuth }) {
  const site = mergeSiteContent(content);
  return (
    <header className="public-site-header">
      <a className="public-brand" href="/" aria-label={`${site.siteName} home`}>
        <span className="public-brand-mark">DS</span>
        <span><strong>{site.siteName}</strong><small>{site.tagline}</small></span>
      </a>
      <nav className="public-site-nav" aria-label="Public navigation">
        <a href="/#features">Features</a>
        <a href="/#how-it-works">How it works</a>
        <a href="/contact">Contact</a>
      </nav>
      <div className="public-header-actions">
        <a className="public-text-link" href="/login">Sign in</a>
        <button type="button" className="public-header-cta" onClick={() => onOpenAuth?.("signup")}>
          Create account
        </button>
      </div>
    </header>
  );
}

function SiteFooter({ content }) {
  const site = mergeSiteContent(content);
  return (
    <footer className="public-site-footer">
      <div className="public-footer-main">
        <div><div className="public-footer-brand">{site.siteName}</div><p>{site.footer.copyright}</p></div>
        <div className="public-footer-links">
          <a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/refund">Refunds</a><a href="/contact">Contact</a>
        </div>
      </div>
      <div className="public-footer-bottom"><span>Independent networking exam preparation</span><a href={`mailto:${site.footer.supportEmail}`}>{site.footer.supportEmail}</a></div>
    </footer>
  );
}

function PublicLandingPage({ content, onOpenAuth }) {
  const site = mergeSiteContent(content);
  const home = site.home;
  const [plans, setPlans] = React.useState([]);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return () => {
      window.history.scrollRestoration = previousRestoration || "auto";
    };
  }, []);
  useEffect(() => {
    fetch(`/api/plans?_t=${Date.now()}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setPlans(Array.isArray(data?.plans) ? data.plans : []))
      .catch(() => setPlans([]));
  }, []);
  const fallbackPlans = [
    { id: "plan_free", name: "Free Study Pass", price: 0, billing_cycle: "lifetime", description: "Start with focused practice and basic review.", features: ["Practice questions", "Basic review", "Progress history"] },
    { id: "plan_pro", name: "CCNA Pro Pass", price: 19.99, billing_cycle: "monthly", description: "The complete practice workspace for serious preparation.", features: ["All exam banks", "Timed simulations", "Interactive labs", "Cloud notes"] },
    { id: "plan_unlimited", name: "CCNA Unlimited Pass", price: 49.99, billing_cycle: "lifetime", description: "Full access for your complete certification journey.", features: ["All Pro features", "Unlimited retakes", "All labs and updates", "Priority support"] },
  ];
  const visiblePlans = plans.length ? plans : fallbackPlans;
  const planFeatures = (plan) => {
    const features = Array.isArray(plan.features) ? [...plan.features] : [];
    const permissions = plan.bank_permissions || {};
    if (permissions.bank_labs?.enabled && !features.some((item) => /lab/i.test(item))) features.push("Interactive CLI labs");
    if (permissions.allow_simulation && !features.some((item) => /simulation/i.test(item))) features.push("Timed simulations");
    if (permissions.allow_custom_exam && !features.some((item) => /custom/i.test(item))) features.push("Custom exam builder");
    return features.slice(0, 5);
  };
  return (
    <div className="public-site-shell public-v2-shell">
      <SiteMeta content={site} pageKey="home" />
      <SiteHeader content={site} onOpenAuth={onOpenAuth} />
      <main>
        <section className="public-v2-hero">
          <div className="public-v2-hero-copy">
            <div className="public-v2-kicker"><span className="public-eyebrow-dot" />{home.eyebrow}</div>
            <h1>Practice the exam.<br /><em>Prove the skill.</em></h1>
            <p className="public-v2-lede">CCNA preparation that moves beyond memorized answers. Work through realistic questions, configure IOS-style CLI labs, and know exactly what to study next.</p>
            <div className="public-v2-actions"><button type="button" className="public-primary-cta" onClick={() => onOpenAuth?.("signup")}>Start practicing</button><a className="public-v2-text-cta" href="#plans">See plans <span>↘</span></a></div>
            <div className="public-v2-proof-row"><span>CCNA 200-301</span><i /> <span>Questions + labs</span><i /> <span>Progress in the cloud</span></div>
          </div>
          <div className="public-v2-product-preview" aria-label="DumpStart Cloud product preview">
            <div className="public-v2-window-bar"><span className="console-dot red" /><span className="console-dot amber" /><span className="console-dot green" /><strong>DumpStart Cloud</strong><span className="public-v2-window-status">LIVE WORKSPACE</span></div>
            <div className="public-v2-preview-body"><aside><span className="public-v2-rail-logo">DS</span><span className="public-v2-rail-active">▦</span><span>⌁</span><span>◷</span><span>⚙</span></aside><div className="public-v2-preview-main"><div className="public-v2-preview-heading"><div><small>YOUR STUDY ROOM</small><h3>CCNA 200-301</h3></div><span className="public-v2-readiness">74% ready</span></div><div className="public-v2-preview-grid"><div className="public-v2-readiness-card"><small>READINESS SCORE</small><strong>74<span>/100</span></strong><div className="public-v2-meter"><b style={{ width: "74%" }} /></div><em>+12% this week</em></div><div className="public-v2-question-card"><span className="public-v2-card-label">NEXT UP</span><strong>Configure trunk ports with native VLAN</strong><div className="public-v2-card-meta"><span>Switching</span><span>12 min</span></div></div></div><div className="public-v2-preview-footer"><span><b>12</b> questions reviewed</span><span><b>03</b> labs completed</span><span className="public-v2-live-dot">● synced</span></div></div></div>
          </div>
        </section>
        <section className="public-v2-proof-strip"><div><strong>01</strong><span>Know what to study</span><small>Topic-level review and explanations</small></div><div><strong>02</strong><span>Configure, don't just click</span><small>Browser-based switch and router labs</small></div><div><strong>03</strong><span>Keep your momentum</span><small>Cloud history, notes and retakes</small></div></section>
        <section id="features" className="public-v2-section public-v2-feature-section"><div className="public-v2-section-intro"><div className="public-v2-kicker">THE COMPLETE PRACTICE LOOP</div><h2>One workspace. Every mode of practice.</h2><p>Build exam confidence with the same tools you need on the day: speed, accuracy, configuration, and review.</p></div><div className="public-v2-feature-layout"><div className="public-v2-feature-list">{(home.features || []).map((feature, index) => <article key={`${feature.title}-${index}`}><span className="public-v2-feature-icon">{["01", "02", "03"][index] || "04"}</span><div><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div><div className="public-v2-feature-art"><div className="public-v2-art-top"><span>LAB / SWITCHING</span><span>CHECKPOINT 04</span></div><div className="public-v2-network-map"><div className="public-v2-node node-router">R1</div><div className="public-v2-link link-one" /><div className="public-v2-node node-switch">SW1</div><div className="public-v2-link link-two" /><div className="public-v2-node node-pc">PC1</div></div><div className="public-v2-art-command"><span>SW1(config-if)#</span> switchport mode trunk</div><div className="public-v2-art-bottom"><span>Objective 2.3</span><b>in progress</b></div></div></div></section>
        <section id="how-it-works" className="public-v2-section public-v2-method-section"><div className="public-v2-section-intro"><div className="public-v2-kicker">HOW IT WORKS</div><h2>Study with intent, not guesswork.</h2></div><div className="public-v2-method-grid">{(home.steps || []).map((step, index) => <article key={`${step.title}-${index}`}><div className="public-v2-method-number">{String(index + 1).padStart(2, "0")}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
        <section className="public-v2-section public-v2-testimonial-section"><div className="public-v2-section-intro"><div className="public-v2-kicker">FROM THE STUDY ROOM</div><h2>Built for the days when consistency matters.</h2><p>Short sessions, honest feedback, and a workspace that keeps your progress together.</p></div><div className="public-v2-testimonial-grid">{(home.testimonials || []).map((testimonial, index) => <figure key={`${testimonial.name}-${index}`} className="public-v2-testimonial"><div className="public-v2-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{testimonial.quote}”</blockquote><figcaption><strong>{testimonial.name}</strong><span>{testimonial.role}</span></figcaption></figure>)}</div></section>
        <section className="public-v2-section public-v2-roadmap-section"><div className="public-v2-pricing-heading"><div><div className="public-v2-kicker">WHAT'S AHEAD</div><h2>A platform that grows with your certification path.</h2></div><p>We are building a focused home for networking learners—starting with CCNA and expanding carefully from there.</p></div><div className="public-v2-roadmap-grid">{(home.roadmap || []).map((item, index) => <article key={`${item.title}-${index}`} className="public-v2-roadmap-item"><div className="public-v2-roadmap-marker"><span>{String(index + 1).padStart(2, "0")}</span></div><div><span className="public-v2-roadmap-phase">{item.phase}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
        <section id="plans" className="public-v2-section public-v2-pricing-section"><div className="public-v2-pricing-heading"><div><div className="public-v2-kicker">SIMPLE ACCESS</div><h2>Choose the pace that fits your preparation.</h2></div><p>Start free. Upgrade when you need more banks, labs, simulations, and retakes.</p></div><div className="public-v2-pricing-grid">{visiblePlans.map((plan, index) => <article key={plan.id || index} className={`public-v2-plan-card ${index === 1 ? "is-featured" : ""}`}>{index === 1 && <span className="public-v2-plan-badge">MOST POPULAR</span>}<div className="public-v2-plan-top"><h3>{plan.name}</h3><p>{plan.description}</p></div><div className="public-v2-plan-price"><strong>{Number(plan.price || 0) === 0 ? "Free" : `$${Number(plan.price).toFixed(2)}`}</strong>{Number(plan.price || 0) > 0 && <span>/{plan.billing_cycle === "lifetime" ? "lifetime" : "month"}</span>}</div><ul>{planFeatures(plan).map((feature, featureIndex) => <li key={`${feature}-${featureIndex}`}><span>✓</span>{feature}</li>)}</ul><button type="button" className={index === 1 ? "public-primary-cta" : "public-v2-plan-button"} onClick={() => onOpenAuth?.("signup")}>{Number(plan.price || 0) === 0 ? "Start free" : "Choose plan"}</button></article>)}</div></section>
        <section className="public-v2-faq-cta"><div className="public-v2-faq-copy"><div className="public-v2-kicker">BEFORE YOU START</div><h2>Clear answers. Better preparation.</h2><p>Everything you need to understand the platform before you create an account.</p></div><div className="public-v2-faq-list">{(home.faq || []).map((item, index) => <details key={`${item.question}-${index}`}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
        <section className="public-v2-final-cta"><div><div className="public-v2-kicker">YOUR NEXT SESSION STARTS HERE</div><h2>Replace uncertainty with a plan.</h2><p>Open your free workspace and start with the topic that needs you most.</p></div><button type="button" className="public-primary-cta" onClick={() => onOpenAuth?.("signup")}>Create your free account</button></section>
      </main>
      <SiteFooter content={site} />
    </div>
  );
}

function LegalPage({ content, pageKey, onOpenAuth }) {
  const site = mergeSiteContent(content);
  const page = site.pages?.[pageKey] || site.pages.privacy;
  return <div className="public-site-shell"><SiteMeta content={site} pageKey={pageKey} /><SiteHeader content={site} onOpenAuth={onOpenAuth} /><main className="public-legal-main"><div className="public-legal-kicker">{site.siteName}</div><h1>{page.title}</h1><p className="public-legal-intro">{page.description}</p><div className="public-legal-card">{(page.sections || []).map((section, index) => <section key={`${section.heading}-${index}`}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div></main><SiteFooter content={site} /></div>;
}

export { PublicLandingPage, LegalPage, SiteFooter, SiteMeta };
