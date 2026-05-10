// ============================================================
// CONTENTS.JS — Main site content configuration
// Edit this file to update hero, about, stats, and contact info
// ============================================================

const SITE_CONTENT = {
  // ── Hero Section ──────────────────────────────────────────
  hero: {
    greeting: "Hello, I'm",
    name: "Shuja Wali",
    headline: "Turning Raw Data into Powerful Business Insights",
    typingTexts: [
      "Data Analyst",
      "Python Automation Developer",
      "Power BI Specialist",
      "Excel Expert",
      "Business Intelligence Developer"
    ],
    cta: {
      hire: { label: "Hire Me", href: "#contact" },
      projects: { label: "View Projects", href: "#projects" },
      resume: { label: "Download Resume", href: "#" }
    },
    profileImage: null, // Set to image path or null for placeholder
    availability: "Available for Freelance & Remote Projects"
  },

  // ── About Section ─────────────────────────────────────────
  about: {
    title: "About Me",
    subtitle: "Data-Driven Solutions for Modern Businesses",
    bio: [
      "I'm a passionate Data Analyst and Python Automation Developer with 5+ years of experience transforming complex datasets into actionable business intelligence. I specialize in building end-to-end data pipelines, interactive Power BI dashboards, and automated reporting systems that save companies hundreds of hours per month.",
      "My expertise spans across Python automation, Excel mastery, SQL database management, and advanced data visualization. I work closely with clients on Upwork and remote engagements to deliver data solutions that drive measurable ROI and empower smarter decision-making."
    ],
    highlights: [
      { icon: "fa-chart-line", text: "Advanced Data Analytics & BI" },
      { icon: "fa-robot", text: "Python & Excel Automation" },
      { icon: "fa-chart-bar", text: "Power BI Dashboard Development" },
      { icon: "fa-database", text: "SQL & Database Management" }
    ]
  },

  // ── Stats Section ──────────────────────────────────────────
  stats: [
    { value: 120, label: "Projects Completed", icon: "fa-briefcase", suffix: "+" },
    { value: 85,  label: "Dashboards Created",  icon: "fa-chart-pie", suffix: "+" },
    { value: 50,  label: "Automation Systems",  icon: "fa-cogs",      suffix: "+" },
    { value: 200, label: "Data Reports Generated", icon: "fa-file-alt", suffix: "+" }
  ],

  // ── Contact Section ────────────────────────────────────────
  contact: {
    email: "shujawali15201@gmail.com",
    location: "Karachi Pakistan",
    socials: [
      { platform: "LinkedIn",  icon: "fa-linkedin",   href: "#", label: "linkedin.com/in/shujawali" },
      { platform: "GitHub",    icon: "fa-github",     href: "#", label: "github.com/shuja-data" },
      { platform: "Upwork",    icon: "fa-briefcase",  href: "#", label: "upwork.com/fl/shuja" },
      { platform: "Twitter",   icon: "fa-twitter",    href: "#", label: "@shuja_data" }
    ]
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    tagline: "Transforming Data. Automating Workflows. Delivering Insights.",
    copyright: "© 2025 Shuja wali. All rights reserved."
  }
};
