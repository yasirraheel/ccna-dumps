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
  return (
    <div className="public-site-shell">
      <SiteMeta content={site} pageKey="home" />
      <SiteHeader content={site} onOpenAuth={onOpenAuth} />
      <main>
        <section className="public-hero">
          <div className="public-hero-copy">
            <div className="public-eyebrow"><span className="public-eyebrow-dot" />{home.eyebrow}</div>
            <h1>{home.title}<br /><span>{home.highlight}</span></h1>
            <p>{home.body}</p>
            <div className="public-hero-actions"><button type="button" className="public-primary-cta" onClick={() => onOpenAuth?.("signup")}>{home.primaryCta}</button><a className="public-secondary-cta" href="#features">{home.secondaryCta}</a></div>
            <div className="public-trust-line"><span>✓</span>{home.trustLine}</div>
          </div>
          <div className="public-hero-console" aria-label="Interactive CLI lab preview">
            <div className="console-top"><span className="console-dot red" /><span className="console-dot amber" /><span className="console-dot green" /><span className="console-label">router-lab / practice</span></div>
            <div className="console-body"><div><span className="console-prompt">R1#</span> show ip interface brief</div><div className="console-dim">Interface&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP-Address&nbsp;&nbsp;&nbsp;OK? Method Status</div><div><span className="console-accent">GigabitEthernet0/0</span>&nbsp;10.10.10.1&nbsp;&nbsp;YES manual up</div><div><span className="console-accent">GigabitEthernet0/1</span>&nbsp;192.168.1.1&nbsp;YES manual up</div><div className="console-spacer" /><div><span className="console-prompt">R1#</span> <span className="console-caret">_</span></div></div>
            <div className="console-footer"><span>CLI lab</span><span>✓ progress saved</span></div>
          </div>
        </section>
        <section className="public-stats-strip"><div><strong>CCNA 200-301</strong><span>Focused exam path</span></div><div><strong>Question banks</strong><span>Practice by topic or exam</span></div><div><strong>Browser labs</strong><span>Switches, routers and CLI</span></div><div><strong>Cloud progress</strong><span>History and notes synced</span></div></section>
        <section id="features" className="public-section"><div className="public-section-heading"><div className="public-eyebrow">WHY DUMPSTART CLOUD</div><h2>One workspace for the way networking is actually learned.</h2><p>Move from recognition to hands-on configuration without losing your progress.</p></div><div className="public-feature-grid">{(home.features || []).map((feature, index) => <article className="public-feature-card" key={`${feature.title}-${index}`}><span className="public-feature-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p><a href="/signup">Try it free <span>↗</span></a></article>)}</div></section>
        <section id="how-it-works" className="public-section public-process-section"><div className="public-section-heading"><div className="public-eyebrow">A CLEAR STUDY LOOP</div><h2>Practice, review, improve.</h2></div><div className="public-process-grid">{(home.steps || []).map((step, index) => <div className="public-process-step" key={`${step.title}-${index}`}><div className="public-process-index">{index + 1}</div><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></section>
        <section className="public-faq-section"><div className="public-section-heading"><div className="public-eyebrow">FAQ</div><h2>Good preparation starts with clear expectations.</h2></div><div className="public-faq-grid">{(home.faq || []).map((item, index) => <details key={`${item.question}-${index}`}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
        <section className="public-final-cta"><div><div className="public-eyebrow">READY WHEN YOU ARE</div><h2>Turn your next study session into progress.</h2></div><button type="button" className="public-primary-cta" onClick={() => onOpenAuth?.("signup")}>Create your free account</button></section>
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
