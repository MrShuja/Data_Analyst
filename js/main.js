/* ============================================================
   MAIN.JS — Portfolio Dynamic Rendering + Interactions
   Reads from localStorage (admin edits) first, falls back to JS files
   ============================================================ */
"use strict";

// ── Merge localStorage admin data over default JS-file data ──
(function mergeAdminData() {
  try {
    const raw = localStorage.getItem("portfolioAdminData");
    if (!raw) return;
    const saved = JSON.parse(raw);
    // Override global data objects if admin has saved versions
    if (saved.projects && saved.projects.length) {
      PROJECTS_DATA.projects = saved.projects;
    }
    if (saved.skills && saved.skills.length) {
      SKILLS_DATA.skills = saved.skills;
    }
    if (saved.services && saved.services.length) {
      // Reassign the array contents
      SERVICES_DATA.length = 0;
      saved.services.forEach(s => SERVICES_DATA.push(s));
    }
    if (saved.experiences && saved.experiences.length) {
      EXPERIENCES_DATA.length = 0;
      saved.experiences.forEach(e => EXPERIENCES_DATA.push(e));
    }
    if (saved.testimonials && saved.testimonials.length) {
      TESTIMONIALS_DATA.length = 0;
      saved.testimonials.forEach(t => TESTIMONIALS_DATA.push(t));
    }
    if (saved.hero && Object.keys(saved.hero).length) {
      Object.assign(SITE_CONTENT.hero, saved.hero);
    }
  } catch(e) {
    console.warn("Could not load admin data from localStorage:", e);
  }
})();

// ── DOM Ready ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initTheme();
  initParticles();
  initTyping();
  renderHero();
  renderAbout();
  renderStats();
  renderSkills();
  renderServices();
  initProjectFilters();
  renderExperiences();
  renderTestimonials();
  renderContact();
  renderFooter();
  initScrollAnimations();
  initScrollTop();
  initCounters();
  initCharts();
  initTestimonialsSlider();
  initContactForm();
  initHamburger();
});

// ── Loader ────────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  window.addEventListener("load", () => setTimeout(() => loader.classList.add("hidden"), 500));
  setTimeout(() => loader && loader.classList.add("hidden"), 3000);
}

// ── Navbar ────────────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const section = document.querySelector(href);
      if (section) {
        const rect = section.getBoundingClientRect();
        link.classList.toggle("active", rect.top <= 100 && rect.bottom > 100);
      }
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── Theme ─────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  const btns = document.querySelectorAll(".theme-toggle");
  btns.forEach(btn => {
    updateThemeIcon(btn, saved);
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
      btns.forEach(b => updateThemeIcon(b, next));
    });
  });
}
function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

// ── Hamburger ─────────────────────────────────────────────────
function initHamburger() {
  const btn = document.querySelector(".hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (!btn || !mobileNav) return;
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    mobileNav.classList.toggle("open");
    btn.setAttribute("aria-expanded", mobileNav.classList.contains("open"));
  });
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => { btn.classList.remove("open"); mobileNav.classList.remove("open"); });
  });
  document.addEventListener("click", e => {
    if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
      btn.classList.remove("open"); mobileNav.classList.remove("open");
    }
  });
}

// ── Scroll Top ────────────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById("scroll-top");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("visible", window.scrollY > 400), { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ── Particles ─────────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let W, H;
  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildParticles();
  };
  const buildParticles = () => {
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .4, alpha: Math.random() * .45 + .1
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,58,237,${p.alpha})`;
      ctx.fill();
      for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(124,58,237,${.07 * (1 - d / 110)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };
  window.addEventListener("resize", resize);
  resize(); draw();
}

// ── Typing ────────────────────────────────────────────────────
function initTyping() {
  const el = document.getElementById("typing-text");
  if (!el) return;
  const texts = SITE_CONTENT.hero.typingTexts || ["Data Analyst", "Python Developer"];
  let idx = 0, ch = 0, del = false;
  const type = () => {
    const cur = texts[idx];
    if (del) {
      el.textContent = cur.substring(0, ch--);
      if (ch < 0) { del = false; idx = (idx + 1) % texts.length; ch = 0; setTimeout(type, 500); return; }
      setTimeout(type, 48);
    } else {
      el.textContent = cur.substring(0, ++ch);
      if (ch === cur.length) { del = true; setTimeout(type, 2200); return; }
      setTimeout(type, 85);
    }
  };
  type();
}

// ── Hero ──────────────────────────────────────────────────────
function renderHero() {
  const c = SITE_CONTENT.hero;
  setEl("hero-greeting", c.greeting);
  setEl("hero-name", c.name);
  setEl("hero-headline", c.headline);
  setEl("hero-availability", c.availability);
  const ctas = document.getElementById("hero-cta");
  if (ctas) {
    ctas.innerHTML = `
      <a href="${c.cta.hire.href}" class="btn btn-primary"><i class="fa-solid fa-handshake"></i>${c.cta.hire.label}</a>
      <a href="${c.cta.projects.href}" class="btn btn-outline"><i class="fa-solid fa-eye"></i>${c.cta.projects.label}</a>
      <a href="${c.cta.resume.href}" class="btn btn-ghost"><i class="fa-solid fa-download"></i>${c.cta.resume.label}</a>`;
  }
  const pi = document.getElementById("profile-inner");
  if (pi) {
    if (c.profileImage) {
      pi.innerHTML = `<img src="${c.profileImage}" alt="${c.name}" />`;
    } else {
      pi.textContent = (c.name || "AM").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    }
  }
}

// ── About ─────────────────────────────────────────────────────
function renderAbout() {
  const c = SITE_CONTENT.about;
  setEl("about-title-tag", c.subtitle);
  const bioEl = document.getElementById("about-bio");
  if (bioEl) bioEl.innerHTML = c.bio.map(p => `<p class="about-bio">${p}</p>`).join("");
  const hlEl = document.getElementById("about-highlights");
  if (hlEl) {
    hlEl.innerHTML = c.highlights.map(h => `
      <div class="highlight-item fade-up"><i class="${h.icon}"></i> ${h.text}</div>`).join("");
  }
}

// ── Stats ─────────────────────────────────────────────────────
function renderStats() {
  const container = document.getElementById("stats-row");
  if (!container) return;
  container.innerHTML = SITE_CONTENT.stats.map(s => `
    <div class="stat-card fade-up">
      <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
      <div class="stat-num counter" data-target="${s.value}" data-suffix="${s.suffix || '+'}">0</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join("");
  const heroStats = document.getElementById("hero-stats");
  if (heroStats) {
    heroStats.innerHTML = SITE_CONTENT.stats.slice(0, 3).map(s => `
      <div class="hero-stat-item">
        <div class="hero-stat-num counter" data-target="${s.value}" data-suffix="${s.suffix || '+'}">${s.suffix || '+'}</div>
        <div class="hero-stat-label">${s.label}</div>
      </div>`).join("");
  }
}

// ── Skills ────────────────────────────────────────────────────
function renderSkills() {
  const filterWrap = document.getElementById("skills-filter");
  const grid = document.getElementById("skills-grid");
  if (!filterWrap || !grid) return;
  const cats = SKILLS_DATA.categories || ["All"];
  filterWrap.innerHTML = cats.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join("");
  const renderCards = (cat) => {
    const filtered = cat === "All" ? SKILLS_DATA.skills : SKILLS_DATA.skills.filter(s => s.category === cat);
    grid.innerHTML = filtered.map(s => `
      <div class="skill-card fade-up">
        <div class="skill-header">
          <div class="skill-icon-wrap"><i class="${s.icon}"></i></div>
          <div class="skill-name">${s.name}</div>
          <div class="skill-level">${s.level}%</div>
        </div>
        <div class="skill-desc">${s.description}</div>
        <div class="skill-bar"><div class="skill-bar-fill" data-level="${s.level}" style="width:0%"></div></div>
      </div>`).join("");
    setTimeout(() => {
      grid.querySelectorAll(".skill-bar-fill").forEach(b => b.style.width = b.dataset.level + "%");
      initScrollAnimations();
    }, 60);
  };
  renderCards("All");
  filterWrap.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filterWrap.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.dataset.cat);
    });
  });
}

// ── Services ──────────────────────────────────────────────────
function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  grid.innerHTML = SERVICES_DATA.map(s => `
    <div class="service-card fade-up">
      <div class="service-gradient-bar" style="background:${s.gradient}"></div>
      <div class="service-icon-wrap"><i class="${s.icon}"></i></div>
      <div class="service-title">${s.title}</div>
      <div class="service-desc">${s.description}</div>
      <div class="service-tags">${s.tags.map(t => `<span class="service-tag">${t}</span>`).join("")}</div>
    </div>`).join("");
}

// ── Projects ──────────────────────────────────────────────────
let _currentCat = "All";
function renderProjects(category = "All", search = "") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  let list = PROJECTS_DATA.projects;
  if (category !== "All") list = list.filter(p => p.category === category);
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q))
    );
  }
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:56px;color:var(--text-muted)">
      <i class="fa-solid fa-magnifying-glass" style="font-size:2.2rem;display:block;margin-bottom:14px"></i>
      No projects found. Try a different filter or search term.</div>`;
    return;
  }
  const emojiMap = { "Power BI":"📊","Python":"🐍","Excel":"📗","Analytics":"📈","Automation":"⚙️" };
  grid.innerHTML = list.map(p => `
    <div class="project-card fade-up">
      <div class="project-thumbnail" style="background:linear-gradient(135deg,${p.color || '#7C3AED'}22,${p.color || '#7C3AED'}44)">
        <span style="position:relative;z-index:2">${emojiMap[p.category] || "💡"}</span>
        ${p.featured ? '<span class="project-featured-badge">⭐ Featured</span>' : ""}
      </div>
      <div class="project-body">
        <div class="project-category">${p.category}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.description}</div>
        <div class="project-features">${p.features.map(f => `<div class="project-feature">${f}</div>`).join("")}</div>
        <div class="project-techs">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("")}</div>
        <div class="project-actions">
          <a href="${p.github}" class="btn btn-outline btn-sm"><i class="fa-brands fa-github"></i> GitHub</a>
          <a href="${p.demo}" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
        </div>
      </div>
    </div>`).join("");
  setTimeout(initScrollAnimations, 60);
}

function initProjectFilters() {
  const fw = document.getElementById("projects-filter");
  const si = document.getElementById("project-search");
  if (!fw) return;
  fw.innerHTML = PROJECTS_DATA.categories.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join("");
  fw.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      fw.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      _currentCat = btn.dataset.cat;
      renderProjects(_currentCat, si ? si.value : "");
    });
  });
  if (si) si.addEventListener("input", () => renderProjects(_currentCat, si.value));
  renderProjects("All");
}

// ── Experiences ───────────────────────────────────────────────
function renderExperiences() {
  const container = document.getElementById("timeline");
  if (!container) return;
  container.innerHTML = EXPERIENCES_DATA.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot" style="color:${e.color}"><i class="fa-solid ${e.icon}"></i></div>
      <div class="timeline-content">
        <div class="tl-top">
          <div class="tl-role">${e.role}</div>
          <span class="tl-badge">${e.type}</span>
        </div>
        <div class="tl-company">${e.company}</div>
        <div class="tl-meta"><i class="fa-solid fa-calendar fa-xs"></i> ${e.duration} &nbsp;·&nbsp; <i class="fa-solid fa-location-dot fa-xs"></i> ${e.location}</div>
        <div class="tl-desc">${e.description}</div>
        <ul class="tl-achievements">${e.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
        <div class="tl-techs">${e.technologies.map(t => `<span class="tl-tech">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  container.querySelectorAll(".timeline-item").forEach(item => obs.observe(item));
}

// ── Testimonials ──────────────────────────────────────────────
function renderTestimonials() {
  const track = document.getElementById("testimonials-track");
  if (!track) return;
  track.innerHTML = TESTIMONIALS_DATA.map(t => `
    <div class="testimonial-card">
      <div class="t-stars">${Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join("")}</div>
      <div class="t-review">"${t.review}"</div>
      <div class="t-author">
        <div class="t-avatar" style="background:${t.avatarColor}">${t.initials}</div>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-role">${t.role} · ${t.location}</div>
          <div class="t-project">Project: ${t.project}</div>
        </div>
        <span class="t-platform">${t.platform}</span>
      </div>
    </div>`).join("");
}

function initTestimonialsSlider() {
  const track = document.getElementById("testimonials-track");
  const dotsC = document.getElementById("slider-dots");
  const prev  = document.getElementById("slider-prev");
  const next  = document.getElementById("slider-next");
  if (!track) return;
  let cur = 0;
  const count = TESTIMONIALS_DATA.length;
  const vis = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  const maxI = () => Math.max(0, count - vis());
  if (dotsC) {
    dotsC.innerHTML = Array.from({ length: count }, (_, i) =>
      `<div class="slider-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>`).join("");
    dotsC.querySelectorAll(".slider-dot").forEach(d =>
      d.addEventListener("click", () => goTo(+d.dataset.idx)));
  }
  const goTo = n => {
    cur = Math.max(0, Math.min(n, maxI()));
    const card = track.querySelector(".testimonial-card");
    const w = card ? card.offsetWidth + 26 : 0;
    track.style.transform = `translateX(-${cur * w}px)`;
    dotsC && dotsC.querySelectorAll(".slider-dot").forEach((d, i) => d.classList.toggle("active", i === cur));
  };
  prev  && prev.addEventListener("click",  () => goTo(cur - 1));
  next  && next.addEventListener("click",  () => goTo(cur + 1));
  const autoInterval = setInterval(() => goTo(cur < maxI() ? cur + 1 : 0), 5000);
  window.addEventListener("resize", () => goTo(0));
}

// ── Contact ───────────────────────────────────────────────────
function renderContact() {
  const c = SITE_CONTENT.contact;
  const emailEl = document.getElementById("contact-email");
  if (emailEl) { emailEl.textContent = c.email; emailEl.href = `mailto:${c.email}`; }
  const socials = document.getElementById("social-links");
  if (socials) {
    socials.innerHTML = c.socials.map(s =>
      `<a href="${s.href}" class="social-link" title="${s.platform}"><i class="fa-brands ${s.icon}"></i></a>`
    ).join("");
  }
  const items = document.getElementById("contact-items");
  if (items) {
    items.innerHTML = `
      <a class="contact-item" href="mailto:${c.email}">
        <div class="ci-icon"><i class="fa-solid fa-envelope"></i></div>
        <div><div class="ci-label">Email</div><div class="ci-value">${c.email}</div></div>
      </a>
      <a class="contact-item" href="#">
        <div class="ci-icon"><i class="fa-solid fa-location-dot"></i></div>
        <div><div class="ci-label">Location</div><div class="ci-value">${c.location}</div></div>
      </a>
      ${c.socials.map(s => `
        <a class="contact-item" href="${s.href}">
          <div class="ci-icon"><i class="fa-brands ${s.icon}"></i></div>
          <div><div class="ci-label">${s.platform}</div><div class="ci-value">${s.label}</div></div>
        </a>`).join("")}`;
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach(f => {
      const grp = f.closest(".form-group");
      const bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      grp && grp.classList.toggle("error", bad);
      if (bad) valid = false;
    });
    if (!valid) return;
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset(); btn.innerHTML = orig; btn.disabled = false;
      const s = document.getElementById("form-success");
      if (s) { s.style.display = "block"; setTimeout(() => s.style.display = "none", 5000); }
    }, 1800);
  });
  form.querySelectorAll("input,textarea").forEach(f =>
    f.addEventListener("input", () => f.closest(".form-group")?.classList.remove("error")));
}

// ── Footer ────────────────────────────────────────────────────
function renderFooter() {
  const c = SITE_CONTENT.footer;
  setEl("footer-tagline",  c.tagline);
  setEl("footer-copyright", c.copyright);
}

// ── Charts ────────────────────────────────────────────────────
function initCharts() {
  if (typeof Chart === "undefined") return;
  Chart.defaults.color = "#94A3B8";
  Chart.defaults.borderColor = "rgba(167,139,250,.1)";
  const gp = ctx => { const g = ctx.createLinearGradient(0,0,0,300); g.addColorStop(0,"rgba(124,58,237,.4)"); g.addColorStop(1,"rgba(124,58,237,0)"); return g; };
  const gc = ctx => { const g = ctx.createLinearGradient(0,0,0,300); g.addColorStop(0,"rgba(6,182,212,.35)"); g.addColorStop(1,"rgba(6,182,212,0)"); return g; };

  // KPI cards
  const kpiRow = document.getElementById("kpi-cards");
  if (kpiRow) {
    kpiRow.innerHTML = CHARTS_DATA.kpiCards.map(k => `
      <div class="kpi-card fade-up">
        <div class="kpi-icon-wrap" style="background:${k.color}22;color:${k.color}">
          <i class="fa-solid ${k.icon}"></i>
        </div>
        <div>
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-value" style="color:${k.color}">${k.value}</div>
          <div class="kpi-change positive"><i class="fa-solid fa-arrow-trend-up fa-xs"></i> ${k.change}</div>
        </div>
      </div>`).join("");
  }

  // Sales Growth Line chart
  const salesEl = document.getElementById("chart-sales");
  if (salesEl) {
    const ctx = salesEl.getContext("2d");
    new Chart(salesEl, {
      type: "line",
      data: {
        labels: CHARTS_DATA.salesGrowth.labels,
        datasets: [
          { label: CHARTS_DATA.salesGrowth.datasets[0].label, data: CHARTS_DATA.salesGrowth.datasets[0].data, borderColor: "#7C3AED", backgroundColor: gp(ctx), tension: .4, borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: "#7C3AED", fill: true },
          { label: CHARTS_DATA.salesGrowth.datasets[1].label, data: CHARTS_DATA.salesGrowth.datasets[1].data, borderColor: "#06B6D4", backgroundColor: gc(ctx), tension: .4, borderWidth: 2, pointRadius: 3, pointBackgroundColor: "#06B6D4", fill: true, borderDash: [5, 5] }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } }, scales: { y: { grid: { color: "rgba(167,139,250,.07)" } }, x: { grid: { display: false } } } }
    });
  }

  // Profit Bar chart
  const profitEl = document.getElementById("chart-profit");
  if (profitEl) {
    new Chart(profitEl, {
      type: "bar",
      data: {
        labels: CHARTS_DATA.profitAnalysis.labels,
        datasets: [
          { label: "Revenue ($K)", data: CHARTS_DATA.profitAnalysis.datasets[0].data, backgroundColor: "rgba(124,58,237,.82)", borderColor: "#7C3AED", borderWidth: 1.5, borderRadius: 6 },
          { label: "Profit ($K)",  data: CHARTS_DATA.profitAnalysis.datasets[1].data, backgroundColor: "rgba(6,182,212,.82)",  borderColor: "#06B6D4", borderWidth: 1.5, borderRadius: 6 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } }, scales: { y: { grid: { color: "rgba(167,139,250,.07)" } }, x: { grid: { display: false } } } }
    });
  }

  // Customer Doughnut
  const custEl = document.getElementById("chart-customers");
  if (custEl) {
    new Chart(custEl, {
      type: "doughnut",
      data: {
        labels: CHARTS_DATA.customerAnalytics.labels,
        datasets: [{ data: CHARTS_DATA.customerAnalytics.data, backgroundColor: CHARTS_DATA.customerAnalytics.colors, borderColor: "transparent", hoverOffset: 9 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right" } }, cutout: "65%" }
    });
  }

  // Revenue Pie
  const revEl = document.getElementById("chart-revenue");
  if (revEl) {
    new Chart(revEl, {
      type: "pie",
      data: {
        labels: CHARTS_DATA.revenueByCategory.labels,
        datasets: [{ data: CHARTS_DATA.revenueByCategory.data, backgroundColor: CHARTS_DATA.revenueByCategory.colors, borderColor: "transparent", hoverOffset: 9 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
    });
  }
}

// ── Animated Counters ─────────────────────────────────────────
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || "+";
      let cur = 0;
      const step = target / (1800 / 16);
      const tick = () => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur) + suffix;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".counter").forEach(c => obs.observe(c));
}

// ── Scroll Animations ─────────────────────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.classList.contains("visible")) {
        e.target.classList.add("visible"); obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".fade-up,.fade-in,.slide-left,.slide-right").forEach(el => {
    if (!el.classList.contains("visible")) obs.observe(el);
  });
}

// ── Utility ───────────────────────────────────────────────────
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || "";
}
