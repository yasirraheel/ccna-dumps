import React, { useEffect, useState } from "react";
import { mergeSiteContent } from "../siteContent";
import { SiteFooter, SiteHeader, SiteMeta } from "./PublicSite";

const FALLBACK_PLANS = [
  { id: "plan_free", name: "Free Study Pass", price: 0, billing_cycle: "lifetime", description: "Start with focused practice and basic review.", features: ["Practice questions", "Basic review", "Progress history"] },
  { id: "plan_pro", name: "CCNA Pro Pass", price: 19.99, billing_cycle: "monthly", description: "The complete practice workspace for serious preparation.", features: ["All exam banks", "Timed simulations", "Interactive labs", "Cloud notes"] },
  { id: "plan_unlimited", name: "CCNA Unlimited Pass", price: 49.99, billing_cycle: "lifetime", description: "Full access for your complete certification journey.", features: ["All Pro features", "Unlimited retakes", "All labs and updates", "Priority support"] },
];

function ViserExamLandingPage({ content, onOpenAuth }) {
  const site = mergeSiteContent(content);
  const home = site.home;
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    fetch(`/api/plans?_t=${Date.now()}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setPlans(Array.isArray(data?.plans) ? data.plans : []))
      .catch(() => setPlans([]));
    return () => { window.history.scrollRestoration = previousRestoration || "auto"; };
  }, []);

  const visiblePlans = plans.length ? plans : FALLBACK_PLANS;
  const planFeatures = (plan) => {
    const features = Array.isArray(plan.features) ? [...plan.features] : [];
    const permissions = plan.bank_permissions || {};
    if (permissions.bank_labs?.enabled && !features.some((item) => /lab/i.test(item))) features.push("Interactive CLI labs");
    if (permissions.allow_simulation && !features.some((item) => /simulation/i.test(item))) features.push("Timed simulations");
    if (permissions.allow_custom_exam && !features.some((item) => /custom/i.test(item))) features.push("Custom exam builder");
    return features.slice(0, 5);
  };

  return (
    <div className="public-site-shell viser-home-shell">
      <SiteMeta content={site} pageKey="home" />
      <SiteHeader content={site} onOpenAuth={onOpenAuth} />
      <main>
        <section className="viser-hero">
          <div className="viser-hero-copy">
            <div className="viser-kicker"><span className="public-eyebrow-dot" />{home.eyebrow}</div>
            <h1>{home.title}<br /><em>{home.highlight}</em></h1>
            <p>{home.body}</p>
            <div className="viser-hero-actions">
              <button type="button" className="public-primary-cta" onClick={() => onOpenAuth?.("signup")}>{home.primaryCta || "Start practicing"}</button>
              <a className="viser-text-cta" href="#plans">{home.secondaryCta || "Explore plans"}</a>
            </div>
            <div className="viser-trust-line"><span>✓</span>{home.trustLine}</div>
          </div>
          <div className="viser-hero-preview" aria-label="Dump Cloud exam workspace preview">
            <div className="viser-preview-top"><span className="viser-window-dots"><i /><i /><i /></span><strong>{site.siteName}</strong><span>LIVE STUDY ROOM</span></div>
            <div className="viser-preview-content">
              <aside><b>DS</b><span className="active">▦</span><span>◷</span><span>⌁</span><span>⚙</span></aside>
              <div className="viser-preview-main">
                <div className="viser-preview-heading"><div><small>YOUR NEXT SESSION</small><h3>CCNA 200-301</h3></div><strong>74% ready</strong></div>
                <div className="viser-preview-cards"><div className="viser-score-card"><small>READINESS SCORE</small><b>74<em>/100</em></b><span><i style={{ width: "74%" }} /></span><strong>+12% this week</strong></div><div className="viser-next-card"><small>NEXT UP</small><b>Configure trunk ports with native VLAN</b><div><span>Switching</span><span>12 min</span></div></div></div>
                <div className="viser-preview-footer"><span><b>12</b> questions reviewed</span><span><b>03</b> labs completed</span><strong>● synced</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="viser-proof-strip"><div><b>01</b><strong>Know what to study</strong><span>Topic-level review and explanations</span></div><div><b>02</b><strong>Configure, don't just click</strong><span>Browser-based switch and router labs</span></div><div><b>03</b><strong>Keep your momentum</strong><span>Cloud history, notes and retakes</span></div></section>

        <section id="features" className="viser-section viser-feature-section"><div className="viser-section-heading"><div className="viser-kicker">THE COMPLETE PRACTICE LOOP</div><h2>One workspace. Every mode of practice.</h2><p>Build exam confidence with the same tools you need on the day: speed, accuracy, configuration, and review.</p></div><div className="viser-feature-grid">{(home.features || []).map((feature, index) => <article key={`${feature.title}-${index}`}><span>0{index + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p><a href="#plans">Explore feature</a></article>)}</div></section>

        <section id="how-it-works" className="viser-section viser-how-section"><div className="viser-section-heading"><div className="viser-kicker">HOW IT WORKS</div><h2>Study with intent, not guesswork.</h2><p>A simple practice loop that turns every session into a clearer next step.</p></div><div className="viser-step-grid">{(home.steps || []).map((step, index) => <article key={`${step.title}-${index}`}><b>0{index + 1}</b><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

        <section className="viser-section viser-testimonial-section"><div className="viser-section-heading"><div className="viser-kicker">FROM THE STUDY ROOM</div><h2>Built for the days when consistency matters.</h2><p>Short sessions, honest feedback, and a workspace that keeps your progress together.</p></div><div className="viser-testimonial-grid">{(home.testimonials || []).map((testimonial, index) => <figure key={`${testimonial.name}-${index}`}><div className="viser-stars">★★★★★</div><blockquote>“{testimonial.quote}”</blockquote><figcaption><b>{testimonial.name}</b><span>{testimonial.role}</span></figcaption></figure>)}</div></section>

        <section className="viser-section viser-roadmap-section"><div className="viser-section-heading"><div className="viser-kicker">WHAT'S AHEAD</div><h2>A platform that grows with your certification path.</h2><p>Start with CCNA and keep your networking practice in one focused workspace.</p></div><div className="viser-roadmap-grid">{(home.roadmap || []).map((item, index) => <article key={`${item.title}-${index}`}><span>0{index + 1}</span><div><small>{item.phase}</small><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

        <section id="plans" className="viser-section viser-pricing-section"><div className="viser-section-heading"><div className="viser-kicker">SIMPLE ACCESS</div><h2>Choose the pace that fits your preparation.</h2><p>Start free. Upgrade when you need more banks, labs, simulations, and retakes.</p></div><div className="viser-pricing-grid">{visiblePlans.map((plan, index) => <article key={plan.id || index} className={index === 1 ? "featured" : ""}>{index === 1 && <span className="viser-plan-badge">MOST POPULAR</span>}<div><small>{index === 0 ? "START HERE" : index === 1 ? "GO FURTHER" : "FULL ACCESS"}</small><h3>{plan.name}</h3><p>{plan.description}</p></div><strong className="viser-plan-price">{Number(plan.price || 0) === 0 ? "Free" : `$${Number(plan.price).toFixed(2)}`}<em>{Number(plan.price || 0) > 0 ? `/${plan.billing_cycle === "lifetime" ? "lifetime" : "month"}` : " forever"}</em></strong><ul>{planFeatures(plan).map((feature, featureIndex) => <li key={`${feature}-${featureIndex}`}><span>✓</span>{feature}</li>)}</ul><button type="button" className={index === 1 ? "public-primary-cta" : "viser-plan-button"} onClick={() => onOpenAuth?.("signup")}>{Number(plan.price || 0) === 0 ? "Start free" : "Choose plan"}</button></article>)}</div></section>

        <section className="viser-faq-section"><div className="viser-section-heading"><div className="viser-kicker">BEFORE YOU START</div><h2>Clear answers. Better preparation.</h2><p>Everything you need to understand the platform before you create an account.</p></div><div className="viser-faq-list">{(home.faq || []).map((item, index) => <details key={`${item.question}-${index}`}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
        <section className="viser-final-cta"><div><div className="viser-kicker">YOUR NEXT SESSION STARTS HERE</div><h2>Replace uncertainty with a plan.</h2><p>Open your free workspace and start with the topic that needs you most.</p></div><button type="button" className="public-primary-cta" onClick={() => onOpenAuth?.("signup")}>Create your free account</button></section>
      </main>
      <SiteFooter content={site} />
    </div>
  );
}

export default ViserExamLandingPage;
