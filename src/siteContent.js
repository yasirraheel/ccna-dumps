export const DEFAULT_SITE_CONTENT = {
  siteName: "Dump Cloud",
  shortName: "Dump",
  tagline: "Practice smarter. Pass with confidence.",
  description:
    "Online CCNA and networking exam practice with realistic questions, interactive CLI labs, drag-and-drop exercises, explanations, and progress tracking.",
  canonicalBaseUrl: "https://dumps.cloud",
  ogImageUrl: "/og-image.svg",
  faviconUrl: "/favicon-32x32.png",
  seo: {
    title: "CCNA Practice Exam & Networking Labs | Dump Cloud",
    description:
      "Prepare for Cisco CCNA 200-301 with realistic practice exams, interactive IOS CLI labs, drag-and-drop questions, explanations, and progress tracking.",
    keywords:
      "CCNA practice exam, CCNA 200-301 practice test, Cisco networking practice questions, CCNA CLI labs, networking exam simulator, CCNA study tool",
  },
  home: {
    eyebrow: "NETWORKING CERTIFICATION PRACTICE",
    title: "Build the skills behind the answer.",
    highlight: "Practice CCNA with confidence.",
    body:
      "A focused practice platform for Cisco networking learners. Test your knowledge, configure IOS-style CLI labs, review every explanation, and track the topics that need more work.",
    primaryCta: "Start practicing",
    secondaryCta: "Explore the platform",
    trustLine: "Built for focused practice, not memorizing answer keys.",
    features: [
      { title: "Blueprint-aligned practice", text: "Work through CCNA 200-301 topics with clear question formats and useful explanations." },
      { title: "Hands-on CLI labs", text: "Configure switches and routers in a browser-based IOS-style console." },
      { title: "Progress that stays with you", text: "Review history, retake weak areas, save notes, and keep your study path organized." },
    ],
    steps: [
      { title: "Choose a path", text: "Start with a bank, custom practice set, or guided lab." },
      { title: "Practice actively", text: "Answer, configure, review, and learn from clear feedback." },
      { title: "Return stronger", text: "Use your history and weak areas to target the next session." },
    ],
    faq: [
      { question: "Is Dump Cloud an official Cisco exam?", answer: "No. It is an independent learning and practice platform. Cisco and CCNA are trademarks of Cisco Systems, Inc." },
      { question: "Can I practice CLI configuration in the browser?", answer: "Yes. Guided labs include IOS-style browser consoles for common switching and routing practice." },
      { question: "Will more networking certifications be added?", answer: "The platform is designed to grow beyond CCNA with additional networking certification banks and labs." },
    ],
    testimonials: [
      { quote: "The mix of timed questions and CLI practice gave me a much clearer study routine.", name: "Ahsan R.", role: "CCNA learner" },
      { quote: "I stopped guessing where to focus. The review history points me straight to the topics I need.", name: "Mariam K.", role: "Networking student" },
      { quote: "The browser labs make switching and routing practice feel much closer to real configuration work.", name: "Bilal S.", role: "IT support engineer" },
    ],
    roadmap: [
      { phase: "Now", title: "CCNA 200-301", text: "Question banks, explanations, simulations, CLI labs, and progress history." },
      { phase: "Next", title: "More networking paths", text: "Additional certification banks and focused practice tracks beyond CCNA." },
      { phase: "In progress", title: "Smarter review", text: "More targeted recommendations and clearer mastery signals for every topic." },
    ],
  },
  pages: {
    privacy: {
      title: "Privacy Policy",
      description: "How Dump Cloud collects, uses, protects, and retains account and learning data.",
      sections: [
        { heading: "Information we collect", body: "We collect account details you provide, learning activity needed to save your progress, and technical information required to operate and secure the service." },
        { heading: "How we use information", body: "We use information to authenticate you, provide exams and labs, save progress, improve reliability, communicate important account messages, and prevent abuse." },
        { heading: "Your choices", body: "You may request access, correction, or deletion of your account information by contacting support. Some records may be retained where required for security, billing, or legal compliance." },
      ],
    },
    terms: {
      title: "Terms of Service",
      description: "The terms that apply when you use Dump Cloud practice exams, labs, and account features.",
      sections: [
        { heading: "Educational service", body: "Dump Cloud provides independent educational practice materials and simulations. It is not an official Cisco certification exam or Cisco service." },
        { heading: "Acceptable use", body: "Do not share accounts, scrape protected content, bypass plan restrictions, abuse the service, or represent practice content as live exam questions." },
        { heading: "Accounts and access", body: "You are responsible for keeping your login details secure. Access can be limited or suspended when these terms are violated or when needed to protect the service." },
      ],
    },
    refund: {
      title: "Refund Policy",
      description: "Refund and subscription support information for Dump Cloud plans.",
      sections: [
        { heading: "Contact support first", body: "If a plan, payment, or access issue occurs, contact support with your account email and purchase details so we can investigate promptly." },
        { heading: "Digital access", body: "Because plans provide immediate access to digital practice content, refund eligibility may depend on usage, the plan terms shown at purchase, and applicable law." },
        { heading: "Cancellations", body: "Cancellation requests stop future renewal where applicable. They do not automatically erase historical records or completed learning activity." },
      ],
    },
    contact: {
      title: "Contact Dump Cloud",
      description: "Get help with account access, plans, practice exams, labs, or content corrections.",
      sections: [
        { heading: "Support", body: "For account, billing, or technical support, use the support email configured by the administrator. Include your account email and a short description of the issue." },
        { heading: "Content feedback", body: "If you find an unclear question, outdated explanation, or lab issue, send the question number and a screenshot so our team can review it." },
      ],
    },
  },
  footer: {
    copyright: "© 2026 Dump Cloud. Independent networking exam preparation platform.",
    supportEmail: "support@dumps.cloud",
  },
};

export function mergeSiteContent(payload) {
  if (!payload || typeof payload !== "object") return DEFAULT_SITE_CONTENT;
  return {
    ...DEFAULT_SITE_CONTENT,
    ...payload,
    seo: { ...DEFAULT_SITE_CONTENT.seo, ...(payload.seo || {}) },
    home: { ...DEFAULT_SITE_CONTENT.home, ...(payload.home || {}) },
    pages: { ...DEFAULT_SITE_CONTENT.pages, ...(payload.pages || {}) },
    footer: { ...DEFAULT_SITE_CONTENT.footer, ...(payload.footer || {}) },
  };
}
