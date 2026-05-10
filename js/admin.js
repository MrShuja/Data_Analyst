/* ============================================================
   ADMIN.JS — Admin Dashboard  v2
   Auth via sessionStorage | Full CRUD | localStorage sync
   ============================================================ */
"use strict";

// ── State ─────────────────────────────────────────────────────
let adminState = { projects:[], skills:[], services:[], experiences:[], testimonials:[], hero:{} };

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  updateBadges();
  initSidebar();
  initMobileMenu();
  showSection("dashboard");
  setTimeout(initDashboardCharts, 300);
});

// ── Auth / Logout ─────────────────────────────────────────────
function logout() {
  sessionStorage.removeItem("portfolio_admin_auth");
  sessionStorage.removeItem("portfolio_admin_user");
  window.location.href = "login.html";
}

// ── State ─────────────────────────────────────────────────────
function loadState() {
  const raw = localStorage.getItem("portfolioAdminData");
  if (raw) { try { adminState = { ...adminState, ...JSON.parse(raw) }; } catch(e) {} }
  // Seed from JS data files if empty
  if (!adminState.projects.length  && typeof PROJECTS_DATA  !== "undefined") adminState.projects  = JSON.parse(JSON.stringify(PROJECTS_DATA.projects));
  if (!adminState.skills.length    && typeof SKILLS_DATA    !== "undefined") adminState.skills    = JSON.parse(JSON.stringify(SKILLS_DATA.skills));
  if (!adminState.services.length  && typeof SERVICES_DATA  !== "undefined") adminState.services  = JSON.parse(JSON.stringify(SERVICES_DATA));
  if (!adminState.experiences.length && typeof EXPERIENCES_DATA !== "undefined") adminState.experiences = JSON.parse(JSON.stringify(EXPERIENCES_DATA));
  if (!adminState.testimonials.length && typeof TESTIMONIALS_DATA !== "undefined") adminState.testimonials = JSON.parse(JSON.stringify(TESTIMONIALS_DATA));
  if (!Object.keys(adminState.hero).length && typeof SITE_CONTENT !== "undefined") adminState.hero = JSON.parse(JSON.stringify(SITE_CONTENT.hero));
  saveState();
}

function saveState() {
  localStorage.setItem("portfolioAdminData", JSON.stringify(adminState));
  updateBadges();
}

function updateBadges() {
  const map = { projects:"projects", skills:"skills", services:"services", experiences:"experiences", testimonials:"testimonials" };
  Object.entries(map).forEach(([k, v]) => {
    const el = document.getElementById(`badge-${v}`);
    if (el) el.textContent = (adminState[k] || []).length;
  });
}

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, type = "success") {
  const c = document.getElementById("toast-container");
  if (!c) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon"><i class="fa-solid ${type==="success"?"fa-check-circle":"fa-exclamation-circle"}"></i></span><span>${msg}</span>`;
  c.appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

// ── Sidebar ───────────────────────────────────────────────────
function initSidebar() {
  document.querySelectorAll(".nav-item[data-section]").forEach(item => {
    item.addEventListener("click", () => showSection(item.dataset.section));
  });
}
function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu-btn");
  const sb  = document.querySelector(".admin-sidebar");
  if (!btn || !sb) return;
  btn.addEventListener("click", () => sb.classList.toggle("open"));
  document.addEventListener("click", e => { if (!sb.contains(e.target) && !btn.contains(e.target)) sb.classList.remove("open"); });
}

// ── Section Switcher ──────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll(".admin-section").forEach(s => s.style.display = "none");
  const target = document.getElementById(`section-${name}`);
  if (target) target.style.display = "block";
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.section === name));
  const titles = { dashboard:"Dashboard Overview", projects:"Manage Projects", skills:"Manage Skills", services:"Manage Services", experiences:"Manage Experiences", testimonials:"Manage Testimonials", hero:"Hero Content Editor", settings:"Website Settings" };
  const t = document.getElementById("page-title"); if (t) t.textContent = titles[name] || name;
  const renders = { dashboard:renderDashboard, projects:renderProjectsTable, skills:renderSkillsTable, services:renderServicesTable, experiences:renderExperiencesTable, testimonials:renderTestimonialsTable, hero:renderHeroEditor, settings:renderSettings };
  if (renders[name]) renders[name]();
}

// ── Dashboard ─────────────────────────────────────────────────
function renderDashboard() {
  const stats = [
    { label:"Total Projects",    value:adminState.projects.length,    icon:"fa-briefcase", color:"#7C3AED", note:"+2 this month" },
    { label:"Total Skills",      value:adminState.skills.length,      icon:"fa-code",      color:"#06B6D4", note:"All updated" },
    { label:"Services Offered",  value:adminState.services.length,    icon:"fa-cogs",      color:"#10B981", note:"Active" },
    { label:"Testimonials",      value:adminState.testimonials.length, icon:"fa-star",      color:"#F59E0B", note:"5.0 avg rating" }
  ];
  const g = document.getElementById("dash-stats");
  if (g) g.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon-wrap" style="background:${s.color}22;color:${s.color}"><i class="fa-solid ${s.icon}"></i></div>
      <div class="stat-info"><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div><div class="stat-change up">↑ ${s.note}</div></div>
    </div>`).join("");
  const rp = document.getElementById("recent-projects");
  if (rp) {
    rp.innerHTML = `<table><thead><tr><th>Title</th><th>Category</th><th>Technologies</th><th>Featured</th><th>Actions</th></tr></thead><tbody>
      ${adminState.projects.slice(0,5).map(p => `<tr>
        <td style="font-weight:600">${esc(p.title)}</td>
        <td><span class="badge badge-purple">${esc(p.category)}</span></td>
        <td class="td-truncate">${p.technologies.slice(0,3).join(", ")}</td>
        <td>${p.featured?'<span class="badge badge-amber">⭐ Yes</span>':'<span class="badge">No</span>'}</td>
        <td><button class="btn btn-outline btn-sm" onclick="editProject(${p.id})"><i class="fa-solid fa-pen"></i></button></td>
      </tr>`).join("")}
    </tbody></table>`;
  }
}

let _chartsInited = false;
function initDashboardCharts() {
  if (_chartsInited || typeof Chart === "undefined") return;
  _chartsInited = true;
  Chart.defaults.color = "#94A3B8";
  const cats = {};
  adminState.projects.forEach(p => cats[p.category] = (cats[p.category]||0)+1);
  const catCtx = document.getElementById("admin-chart-categories");
  if (catCtx) new Chart(catCtx, { type:"doughnut", data:{ labels:Object.keys(cats), datasets:[{ data:Object.values(cats), backgroundColor:["#7C3AED","#06B6D4","#10B981","#F59E0B","#EC4899","#6366F1"], borderColor:"transparent" }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:"right", labels:{ font:{size:11}, boxWidth:10 } } }, cutout:"60%" } });
  const top8 = adminState.skills.slice(0,8);
  const skCtx = document.getElementById("admin-chart-skills");
  if (skCtx) new Chart(skCtx, { type:"bar", data:{ labels:top8.map(s=>s.name), datasets:[{ label:"Level %", data:top8.map(s=>s.level), backgroundColor:["#7C3AED","#06B6D4","#10B981","#F59E0B","#EC4899","#6366F1","#A78BFA","#67E8F9"], borderRadius:5 }] }, options:{ responsive:true, maintainAspectRatio:false, indexAxis:"y", plugins:{ legend:{ display:false } }, scales:{ x:{ max:100, grid:{ color:"rgba(167,139,250,.07)" } }, y:{ grid:{ display:false }, ticks:{ font:{size:10} } } } } });
}

// ── Projects CRUD ─────────────────────────────────────────────
function renderProjectsTable() {
  const tb = document.getElementById("projects-table-body");
  if (!tb) return;
  if (!adminState.projects.length) { tb.innerHTML = `<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-folder-open"></i><p>No projects yet. Click "Add Project" to get started.</p></div></td></tr>`; return; }
  tb.innerHTML = adminState.projects.map(p => `<tr>
    <td style="font-weight:600">${esc(p.title)}</td>
    <td><span class="badge badge-purple">${esc(p.category)}</span></td>
    <td class="td-truncate">${p.technologies.slice(0,3).join(", ")}</td>
    <td>${p.featured?'<span class="badge badge-amber">⭐ Featured</span>':'<span class="badge">Standard</span>'}</td>
    <td><div style="display:flex;gap:6px">
      <button class="btn btn-outline btn-sm btn-icon" onclick="editProject(${p.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('projects',${p.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
    </div></td>
  </tr>`).join("");
}

function editProject(id) { openProjectModal(adminState.projects.find(x=>x.id===id)||null); }
function openAddProjectModal() { openProjectModal(null); }

function openProjectModal(project) {
  const isEdit = !!project;
  openModal(isEdit?"Edit Project":"Add New Project", `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="form-group"><label class="form-label">Title <span>*</span></label>
        <input id="f-title" class="form-input" value="${isEdit?esc(project.title):""}" placeholder="Project Title" /></div>
      <div class="form-group"><label class="form-label">Category <span>*</span></label>
        <select id="f-category" class="form-select">
          ${["Power BI","Python","Excel","Analytics","Automation"].map(c=>`<option ${isEdit&&project.category===c?"selected":""}>${c}</option>`).join("")}
        </select></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Description <span>*</span></label>
        <textarea id="f-desc" class="form-textarea">${isEdit?esc(project.description):""}</textarea></div>
      <div class="form-group"><label class="form-label">Technologies (comma-separated)</label>
        <input id="f-techs" class="form-input" value="${isEdit?project.technologies.join(", "):""}" placeholder="Python, Power BI, SQL" /></div>
      <div class="form-group"><label class="form-label">Features (one per line)</label>
        <textarea id="f-features" class="form-textarea" style="min-height:72px">${isEdit?project.features.join("\n"):""}</textarea></div>
      <div class="form-group"><label class="form-label">GitHub URL</label>
        <input id="f-github" class="form-input" value="${isEdit?project.github:"#"}" /></div>
      <div class="form-group"><label class="form-label">Demo URL</label>
        <input id="f-demo" class="form-input" value="${isEdit?project.demo:"#"}" /></div>
      <div class="form-group"><label class="form-label">Accent Color</label>
        <input id="f-color" class="form-input" value="${isEdit?project.color:"#7C3AED"}" placeholder="#7C3AED" /></div>
      <div class="form-group" style="display:flex;align-items:center;gap:10px;padding-top:28px">
        <input type="checkbox" id="f-featured" ${isEdit&&project.featured?"checked":""} style="width:17px;height:17px;accent-color:var(--purple)">
        <label class="form-label" style="margin:0;cursor:pointer" for="f-featured">Mark as Featured</label>
      </div>
    </div>`,
    `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
     <button class="btn btn-primary" onclick="saveProject(${isEdit?project.id:'null'})"><i class="fa-solid fa-save"></i> ${isEdit?"Save Changes":"Add Project"}</button>`
  );
}

function saveProject(id) {
  const title = val("f-title"), desc = val("f-desc");
  if (!title || !desc) { toast("Please fill required fields","error"); return; }
  const project = {
    id: id || Date.now(),
    title, category: val("f-category"), description: desc,
    technologies: val("f-techs").split(",").map(t=>t.trim()).filter(Boolean),
    features: val("f-features").split("\n").map(t=>t.trim()).filter(Boolean),
    github: val("f-github")||"#", demo: val("f-demo")||"#",
    color: val("f-color")||"#7C3AED",
    featured: document.getElementById("f-featured")?.checked||false
  };
  if (id) { const i=adminState.projects.findIndex(x=>x.id===id); if(i>=0) adminState.projects[i]=project; }
  else adminState.projects.push(project);
  saveState(); closeModal(); renderProjectsTable();
  toast(id?"Project updated! Refresh your portfolio to see changes.":"Project added! Refresh your portfolio to see it.");
}

// ── Skills CRUD ───────────────────────────────────────────────
function renderSkillsTable() {
  const tb = document.getElementById("skills-table-body");
  if (!tb) return;
  if (!adminState.skills.length) { tb.innerHTML=`<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-code"></i><p>No skills yet.</p></div></td></tr>`; return; }
  tb.innerHTML = adminState.skills.map(s => `<tr>
    <td style="font-weight:600">${esc(s.name)}</td>
    <td><span class="badge badge-cyan">${esc(s.category)}</span></td>
    <td><div style="min-width:130px"><div style="display:flex;justify-content:space-between;font-size:.75rem;margin-bottom:5px"><span style="color:var(--text-secondary)">${s.level}%</span></div>
      <div class="level-bar"><div class="level-fill" style="width:${s.level}%"></div></div></div></td>
    <td class="td-truncate">${esc(s.description)}</td>
    <td><div style="display:flex;gap:6px">
      <button class="btn btn-outline btn-sm btn-icon" onclick="editSkill(${s.id})"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('skills',${s.id})"><i class="fa-solid fa-trash"></i></button>
    </div></td>
  </tr>`).join("");
}

function editSkill(id) { openSkillModal(adminState.skills.find(x=>x.id===id)||null); }
function openSkillModal(skill) {
  const isEdit=!!skill;
  const cats=["Python & Data","Excel & BI","Databases","Visualization"];
  openModal(isEdit?"Edit Skill":"Add New Skill", `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="form-group"><label class="form-label">Skill Name <span>*</span></label>
        <input id="fs-name" class="form-input" value="${isEdit?esc(skill.name):""}" placeholder="Python" /></div>
      <div class="form-group"><label class="form-label">Category</label>
        <select id="fs-cat" class="form-select">${cats.map(c=>`<option ${isEdit&&skill.category===c?"selected":""}>${c}</option>`).join("")}</select></div>
      <div class="form-group"><label class="form-label">Font Awesome Icon class</label>
        <input id="fs-icon" class="form-input" value="${isEdit?skill.icon:"fa-solid fa-code"}" placeholder="fa-brands fa-python" /></div>
      <div class="form-group"><label class="form-label">Level (0–100)</label>
        <input id="fs-level" type="number" min="0" max="100" class="form-input" value="${isEdit?skill.level:80}" /></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Description</label>
        <input id="fs-desc" class="form-input" value="${isEdit?esc(skill.description):""}" placeholder="Short description" /></div>
    </div>`,
    `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
     <button class="btn btn-primary" onclick="saveSkill(${isEdit?skill.id:"null"})"><i class="fa-solid fa-save"></i> ${isEdit?"Save":"Add Skill"}</button>`
  );
}

function saveSkill(id) {
  const name=val("fs-name"); if(!name){toast("Name required","error");return;}
  const skill={id:id||Date.now(),name,category:val("fs-cat"),icon:val("fs-icon")||"fa-solid fa-code",level:parseInt(val("fs-level"))||80,description:val("fs-desc"),color:"#7C3AED"};
  if(id){const i=adminState.skills.findIndex(x=>x.id===id);if(i>=0)adminState.skills[i]=skill;}else adminState.skills.push(skill);
  saveState();closeModal();renderSkillsTable();toast(id?"Skill updated!":"Skill added!");
}

// ── Services CRUD ─────────────────────────────────────────────
function renderServicesTable() {
  const tb=document.getElementById("services-table-body");
  if(!tb)return;
  if(!adminState.services.length){tb.innerHTML=`<tr><td colspan="4"><div class="empty-state"><i class="fa-solid fa-cogs"></i><p>No services yet.</p></div></td></tr>`;return;}
  tb.innerHTML=adminState.services.map(s=>`<tr>
    <td style="font-weight:600;display:flex;align-items:center;gap:8px"><i class="${s.icon}" style="color:var(--purple-light)"></i>${esc(s.title)}</td>
    <td class="td-truncate">${esc(s.description.slice(0,55))}…</td>
    <td>${s.tags.map(t=>`<span class="badge badge-purple" style="margin-right:4px">${t}</span>`).join("")}</td>
    <td><div style="display:flex;gap:6px">
      <button class="btn btn-outline btn-sm btn-icon" onclick="openServiceModal(${s.id})"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('services',${s.id})"><i class="fa-solid fa-trash"></i></button>
    </div></td>
  </tr>`).join("");
}

function openServiceModal(id) {
  const svc=id?adminState.services.find(x=>x.id===id):null; const isEdit=!!svc;
  openModal(isEdit?"Edit Service":"Add Service",`
    <div style="display:grid;gap:14px">
      <div class="form-group"><label class="form-label">Title <span>*</span></label><input id="fsv-title" class="form-input" value="${isEdit?esc(svc.title):""}" /></div>
      <div class="form-group"><label class="form-label">Icon (Font Awesome)</label><input id="fsv-icon" class="form-input" value="${isEdit?svc.icon:"fa-solid fa-chart-bar"}" /></div>
      <div class="form-group"><label class="form-label">Description <span>*</span></label><textarea id="fsv-desc" class="form-textarea">${isEdit?esc(svc.description):""}</textarea></div>
      <div class="form-group"><label class="form-label">Tags (comma-separated)</label><input id="fsv-tags" class="form-input" value="${isEdit?svc.tags.join(", "):""}" /></div>
    </div>`,
    `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
     <button class="btn btn-primary" onclick="saveService(${isEdit?svc.id:"null"})"><i class="fa-solid fa-save"></i> Save</button>`
  );
}

function saveService(id) {
  const title=val("fsv-title");if(!title){toast("Title required","error");return;}
  const svc={id:id||Date.now(),title,icon:val("fsv-icon")||"fa-solid fa-cogs",description:val("fsv-desc"),tags:val("fsv-tags").split(",").map(t=>t.trim()).filter(Boolean),gradient:"linear-gradient(135deg,#7C3AED,#06B6D4)"};
  if(id){const i=adminState.services.findIndex(x=>x.id===id);if(i>=0)adminState.services[i]=svc;}else adminState.services.push(svc);
  saveState();closeModal();renderServicesTable();toast("Service saved!");
}

// ── Experiences CRUD ──────────────────────────────────────────
function renderExperiencesTable() {
  const tb=document.getElementById("experiences-table-body");
  if(!tb)return;
  if(!adminState.experiences.length){tb.innerHTML=`<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-timeline"></i><p>No experiences yet.</p></div></td></tr>`;return;}
  tb.innerHTML=adminState.experiences.map(e=>`<tr>
    <td style="font-weight:600">${esc(e.role)}</td>
    <td>${esc(e.company)}</td>
    <td><span class="badge badge-green">${esc(e.type)}</span></td>
    <td style="color:var(--text-secondary);font-size:.85rem">${esc(e.duration)}</td>
    <td><div style="display:flex;gap:6px">
      <button class="btn btn-outline btn-sm btn-icon" onclick="openExperienceModal(${e.id})"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('experiences',${e.id})"><i class="fa-solid fa-trash"></i></button>
    </div></td>
  </tr>`).join("");
}

function openExperienceModal(id) {
  const exp=id?adminState.experiences.find(x=>x.id===id):null; const isEdit=!!exp;
  openModal(isEdit?"Edit Experience":"Add Experience",`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div class="form-group"><label class="form-label">Role <span>*</span></label><input id="fe-role" class="form-input" value="${isEdit?esc(exp.role):""}" /></div>
      <div class="form-group"><label class="form-label">Company <span>*</span></label><input id="fe-company" class="form-input" value="${isEdit?esc(exp.company):""}" /></div>
      <div class="form-group"><label class="form-label">Type</label>
        <select id="fe-type" class="form-select">${["Full-time","Part-time","Contract","Freelance"].map(t=>`<option ${isEdit&&exp.type===t?"selected":""}>${t}</option>`).join("")}</select></div>
      <div class="form-group"><label class="form-label">Duration</label><input id="fe-duration" class="form-input" value="${isEdit?esc(exp.duration):""}" placeholder="Jan 2023 – Present" /></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Description</label><textarea id="fe-desc" class="form-textarea">${isEdit?esc(exp.description):""}</textarea></div>
      <div class="form-group"><label class="form-label">Key Achievements (one per line)</label><textarea id="fe-ach" class="form-textarea" style="min-height:80px">${isEdit?exp.achievements.join("\n"):""}</textarea></div>
      <div class="form-group"><label class="form-label">Technologies (comma-separated)</label><textarea id="fe-techs" class="form-textarea" style="min-height:80px">${isEdit?exp.technologies.join(", "):""}</textarea></div>
    </div>`,
    `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
     <button class="btn btn-primary" onclick="saveExperience(${isEdit?exp.id:"null"})"><i class="fa-solid fa-save"></i> Save</button>`
  );
}

function saveExperience(id) {
  const role=val("fe-role"),company=val("fe-company");
  if(!role||!company){toast("Role and Company required","error");return;}
  const exp={id:id||Date.now(),role,company,type:val("fe-type"),duration:val("fe-duration"),location:"Remote",description:val("fe-desc"),achievements:val("fe-ach").split("\n").map(a=>a.trim()).filter(Boolean),technologies:val("fe-techs").split(",").map(t=>t.trim()).filter(Boolean),icon:"fa-briefcase",color:"#7C3AED"};
  if(id){const i=adminState.experiences.findIndex(x=>x.id===id);if(i>=0)adminState.experiences[i]=exp;}else adminState.experiences.push(exp);
  saveState();closeModal();renderExperiencesTable();toast("Experience saved!");
}

// ── Testimonials CRUD ─────────────────────────────────────────
function renderTestimonialsTable() {
  const tb=document.getElementById("testimonials-table-body");
  if(!tb)return;
  if(!adminState.testimonials.length){tb.innerHTML=`<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-star"></i><p>No testimonials yet.</p></div></td></tr>`;return;}
  tb.innerHTML=adminState.testimonials.map(t=>`<tr>
    <td><div style="display:flex;align-items:center;gap:10px">
      <div style="width:36px;height:36px;border-radius:50%;background:${t.avatarColor};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#fff">${t.initials}</div>
      <div><div style="font-weight:600">${esc(t.name)}</div><div style="font-size:.75rem;color:var(--text-muted)">${esc(t.role)}</div></div>
    </div></td>
    <td class="td-truncate">${esc(t.review.slice(0,55))}…</td>
    <td>${Array(t.rating).fill("⭐").join("")}</td>
    <td><span class="badge badge-cyan">${esc(t.platform)}</span></td>
    <td><div style="display:flex;gap:6px">
      <button class="btn btn-outline btn-sm btn-icon" onclick="openTestimonialModal(${t.id})"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('testimonials',${t.id})"><i class="fa-solid fa-trash"></i></button>
    </div></td>
  </tr>`).join("");
}

function openTestimonialModal(id) {
  const t=id?adminState.testimonials.find(x=>x.id===id):null; const isEdit=!!t;
  openModal(isEdit?"Edit Testimonial":"Add Testimonial",`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div class="form-group"><label class="form-label">Client Name <span>*</span></label><input id="ft-name" class="form-input" value="${isEdit?esc(t.name):""}" /></div>
      <div class="form-group"><label class="form-label">Role &amp; Company</label><input id="ft-role" class="form-input" value="${isEdit?esc(t.role):""}" /></div>
      <div class="form-group"><label class="form-label">Platform</label>
        <select id="ft-platform" class="form-select">${["Upwork","Direct","LinkedIn","Other"].map(p=>`<option ${isEdit&&t.platform===p?"selected":""}>${p}</option>`).join("")}</select></div>
      <div class="form-group"><label class="form-label">Rating (1–5)</label><input id="ft-rating" type="number" min="1" max="5" class="form-input" value="${isEdit?t.rating:5}" /></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Review <span>*</span></label><textarea id="ft-review" class="form-textarea" style="min-height:100px">${isEdit?esc(t.review):""}</textarea></div>
      <div class="form-group"><label class="form-label">Project Name</label><input id="ft-project" class="form-input" value="${isEdit?esc(t.project):""}" /></div>
      <div class="form-group"><label class="form-label">Avatar Color</label><input id="ft-color" class="form-input" value="${isEdit?t.avatarColor:"#7C3AED"}" /></div>
    </div>`,
    `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
     <button class="btn btn-primary" onclick="saveTestimonial(${isEdit?t.id:"null"})"><i class="fa-solid fa-save"></i> Save</button>`
  );
}

function saveTestimonial(id) {
  const name=val("ft-name"),review=val("ft-review");
  if(!name||!review){toast("Name and Review required","error");return;}
  const t={id:id||Date.now(),name,initials:name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),role:val("ft-role"),review,rating:parseInt(val("ft-rating"))||5,platform:val("ft-platform"),project:val("ft-project"),avatarColor:val("ft-color")||"#7C3AED",avatar:null,location:""};
  if(id){const i=adminState.testimonials.findIndex(x=>x.id===id);if(i>=0)adminState.testimonials[i]=t;}else adminState.testimonials.push(t);
  saveState();closeModal();renderTestimonialsTable();toast("Testimonial saved!");
}

// ── Hero Editor ───────────────────────────────────────────────
function renderHeroEditor() {
  const h=adminState.hero;
  const el=document.getElementById("hero-editor-form");
  if(!el)return;
  el.innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:4px 0 16px">
      <div class="form-group"><label class="form-label">Your Name</label><input id="hf-name" class="form-input" value="${esc(h.name||"")}" /></div>
      <div class="form-group"><label class="form-label">Greeting Text</label><input id="hf-greeting" class="form-input" value="${esc(h.greeting||"")}" /></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Main Headline</label><input id="hf-headline" class="form-input" value="${esc(h.headline||"")}" /></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Typing Texts (one per line)</label>
        <textarea id="hf-typing" class="form-textarea">${(h.typingTexts||[]).join("\n")}</textarea></div>
      <div class="form-group" style="grid-column:1/-1"><label class="form-label">Availability Badge Text</label><input id="hf-avail" class="form-input" value="${esc(h.availability||"")}" /></div>
    </div>
    <button class="btn btn-primary" onclick="saveHero()"><i class="fa-solid fa-save"></i> Save Hero Content</button>
    <p style="font-size:.78rem;color:var(--text-muted);margin-top:10px"><i class="fa-solid fa-info-circle"></i> Changes are saved to localStorage and will appear on the portfolio page on next load.</p>`;
}

function saveHero() {
  adminState.hero = { ...adminState.hero,
    name:val("hf-name")||adminState.hero.name,
    greeting:val("hf-greeting")||adminState.hero.greeting,
    headline:val("hf-headline")||adminState.hero.headline,
    typingTexts:val("hf-typing").split("\n").map(t=>t.trim()).filter(Boolean),
    availability:val("hf-avail")||adminState.hero.availability
  };
  saveState();
  toast("Hero content saved! Open/refresh your portfolio to see the changes.");
}

// ── Settings ──────────────────────────────────────────────────
function renderSettings() {
  const el=document.getElementById("settings-content");
  if(!el)return;
  el.innerHTML=`
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><div class="card-title"><i class="fa-solid fa-shield-halved" style="color:var(--amber);margin-right:6px"></i>Danger Zone</div></div>
      <p style="color:var(--text-secondary);font-size:.875rem;margin-bottom:18px">Reset individual sections or all data back to the original defaults from the JS files.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn btn-danger" onclick="resetSection('projects')"><i class="fa-solid fa-rotate-left"></i> Reset Projects</button>
        <button class="btn btn-danger" onclick="resetSection('skills')"><i class="fa-solid fa-rotate-left"></i> Reset Skills</button>
        <button class="btn btn-danger" onclick="resetSection('all')"><i class="fa-solid fa-trash"></i> Reset Everything</button>
      </div>
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><div class="card-title"><i class="fa-solid fa-download" style="color:var(--cyan);margin-right:6px"></i>Export Data</div></div>
      <p style="color:var(--text-secondary);font-size:.875rem;margin-bottom:16px">Download your current portfolio data as JSON to back it up or transfer it.</p>
      <button class="btn btn-outline" onclick="exportData()"><i class="fa-solid fa-file-arrow-down"></i> Export JSON</button>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fa-solid fa-right-from-bracket" style="color:var(--red);margin-right:6px"></i>Session</div></div>
      <p style="color:var(--text-secondary);font-size:.875rem;margin-bottom:16px">Logged in as <strong>${sessionStorage.getItem("portfolio_admin_user")||"Admin"}</strong></p>
      <button class="btn btn-danger" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
    </div>`;
}

function resetSection(section) {
  if (!confirm(`Reset ${section === "all" ? "ALL data" : section}? This cannot be undone.`)) return;
  if (section === "all") { localStorage.removeItem("portfolioAdminData"); location.reload(); }
  else if (section === "projects") { adminState.projects = JSON.parse(JSON.stringify(PROJECTS_DATA.projects)); saveState(); renderProjectsTable(); showSection("projects"); toast("Projects reset."); }
  else if (section === "skills")   { adminState.skills   = JSON.parse(JSON.stringify(SKILLS_DATA.skills));     saveState(); renderSkillsTable();   showSection("skills");   toast("Skills reset."); }
}

function exportData() {
  const blob = new Blob([JSON.stringify(adminState, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "portfolio-data.json"; a.click();
  toast("Data exported!");
}

// ── Generic Delete ────────────────────────────────────────────
function deleteItem(collection, id) {
  if (!confirm("Delete this item? This cannot be undone.")) return;
  adminState[collection] = adminState[collection].filter(x => x.id !== id);
  saveState();
  const renders = { projects:renderProjectsTable, skills:renderSkillsTable, services:renderServicesTable, experiences:renderExperiencesTable, testimonials:renderTestimonialsTable };
  if (renders[collection]) renders[collection]();
  toast("Item deleted. Refresh your portfolio to see changes.");
}

// ── Modal Helpers ─────────────────────────────────────────────
function openModal(title, bodyHTML, footerHTML) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").innerHTML = bodyHTML;
  document.getElementById("modal-footer").innerHTML = footerHTML;
  document.getElementById("modal-overlay").classList.add("open");
}
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

// ── Utility ───────────────────────────────────────────────────
function val(id)  { return document.getElementById(id)?.value?.trim() || ""; }
function esc(str) { return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
