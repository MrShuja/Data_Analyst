// ============================================================
// SKILLS.JS — Skills data with categories, icons, and levels
// ============================================================

const SKILLS_DATA = {
  categories: ["All", "Python & Data", "Excel & BI", "Databases", "Visualization"],

  skills: [
    // ── Python & Data ─────────────────────────────────────
    {
      id: 1,
      name: "Python",
      category: "Python & Data",
      icon: "fa-brands fa-python",
      level: 95,
      color: "#3776AB",
      description: "Data analysis, automation scripts, data pipelines"
    },
    {
      id: 2,
      name: "Pandas",
      category: "Python & Data",
      icon: "fa-solid fa-table",
      level: 92,
      color: "#150458",
      description: "DataFrame manipulation, data wrangling, EDA"
    },
    {
      id: 3,
      name: "NumPy",
      category: "Python & Data",
      icon: "fa-solid fa-calculator",
      level: 88,
      color: "#4dabcf",
      description: "Numerical computing, array operations, statistics"
    },
    {
      id: 4,
      name: "OpenPyXL",
      category: "Python & Data",
      icon: "fa-solid fa-file-excel",
      level: 90,
      color: "#217346",
      description: "Excel automation, report generation, formatting"
    },
    {
      id: 5,
      name: "CSV Processing",
      category: "Python & Data",
      icon: "fa-solid fa-file-csv",
      level: 95,
      color: "#8B5CF6",
      description: "Large-scale CSV handling, batch processing"
    },
    {
      id: 6,
      name: "Data Cleaning",
      category: "Python & Data",
      icon: "fa-solid fa-broom",
      level: 93,
      color: "#EC4899",
      description: "Normalization, deduplication, outlier handling"
    },
    {
      id: 7,
      name: "Automation",
      category: "Python & Data",
      icon: "fa-solid fa-robot",
      level: 91,
      color: "#F59E0B",
      description: "Workflow automation, scheduling, notifications"
    },

    // ── Excel & BI ────────────────────────────────────────
    {
      id: 8,
      name: "Microsoft Excel",
      category: "Excel & BI",
      icon: "fa-solid fa-file-excel",
      level: 97,
      color: "#217346",
      description: "Advanced formulas, pivot tables, macros (VBA)"
    },
    {
      id: 9,
      name: "Power BI",
      category: "Excel & BI",
      icon: "fa-solid fa-chart-bar",
      level: 93,
      color: "#F2C811",
      description: "DAX, custom visuals, live dashboards, reports"
    },
    {
      id: 10,
      name: "Business Intelligence",
      category: "Excel & BI",
      icon: "fa-solid fa-lightbulb",
      level: 90,
      color: "#7C3AED",
      description: "KPI tracking, executive reporting, BI strategy"
    },
    {
      id: 11,
      name: "Reporting Systems",
      category: "Excel & BI",
      icon: "fa-solid fa-chart-line",
      level: 88,
      color: "#06B6D4",
      description: "Automated report generation and distribution"
    },

    // ── Databases ─────────────────────────────────────────
    {
      id: 12,
      name: "SQL",
      category: "Databases",
      icon: "fa-solid fa-database",
      level: 89,
      color: "#336791",
      description: "Complex queries, joins, stored procedures"
    },
    {
      id: 13,
      name: "MySQL",
      category: "Databases",
      icon: "fa-solid fa-server",
      level: 85,
      color: "#4479A1",
      description: "Database design, optimization, data extraction"
    },

    // ── Visualization ─────────────────────────────────────
    {
      id: 14,
      name: "Data Visualization",
      category: "Visualization",
      icon: "fa-solid fa-chart-pie",
      level: 94,
      color: "#EF4444",
      description: "Storytelling with data, interactive dashboards"
    },
    {
      id: 15,
      name: "Chart.js",
      category: "Visualization",
      icon: "fa-solid fa-chart-area",
      level: 87,
      color: "#FF6384",
      description: "Web-based interactive charts and analytics"
    }
  ]
};
