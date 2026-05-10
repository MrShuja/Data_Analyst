// ============================================================
// SERVICES.JS — Services offered with icons and descriptions
// ============================================================

const SERVICES_DATA = [
  {
    id: 1,
    icon: "fa-solid fa-broom",
    title: "Excel Data Cleaning",
    description: "Deep-clean your Excel datasets: remove duplicates, standardize formats, fix errors, and prepare data for analysis with precision and speed.",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    tags: ["Excel", "Data Quality", "ETL"]
  },
  {
    id: 2,
    icon: "fa-solid fa-chart-bar",
    title: "Power BI Dashboard Development",
    description: "Build stunning, interactive Power BI dashboards with advanced DAX measures, custom visuals, and real-time data connectivity for executive reporting.",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    tags: ["Power BI", "DAX", "Dashboards"]
  },
  {
    id: 3,
    icon: "fa-brands fa-python",
    title: "Python Automation",
    description: "Automate repetitive tasks, web scraping, email workflows, report generation, and data pipelines using Python to save you hundreds of hours monthly.",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    tags: ["Python", "Automation", "Pipelines"]
  },
  {
    id: 4,
    icon: "fa-solid fa-file-excel",
    title: "Excel Automation (VBA)",
    description: "Develop custom Excel macros and VBA scripts to automate your entire workflow, from data entry to complex multi-sheet calculations.",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    tags: ["Excel", "VBA", "Macros"]
  },
  {
    id: 5,
    icon: "fa-solid fa-file-csv",
    title: "CSV & Excel Processing",
    description: "Batch-process large CSV and Excel files, merge datasets, apply transformations, and generate clean outputs ready for downstream analysis.",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)",
    tags: ["CSV", "Pandas", "ETL"]
  },
  {
    id: 6,
    icon: "fa-solid fa-chart-line",
    title: "Sales Data Analysis",
    description: "Analyze sales trends, forecast revenue, identify top performers, and uncover growth opportunities from your sales data using Python and Excel.",
    gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    tags: ["Sales", "Analysis", "Forecasting"]
  },
  {
    id: 7,
    icon: "fa-solid fa-file-invoice-dollar",
    title: "Financial Reporting",
    description: "Create professional P&L statements, cash flow reports, budget variance analyses, and automated financial summaries that executives trust.",
    gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    tags: ["Finance", "Reporting", "Excel"]
  },
  {
    id: 8,
    icon: "fa-solid fa-gauge-high",
    title: "KPI Dashboard Development",
    description: "Design and build real-time KPI dashboards that keep your team aligned on critical metrics with dynamic filtering and drill-down capabilities.",
    gradient: "linear-gradient(135deg, #30cfd0, #667eea)",
    tags: ["KPIs", "Power BI", "Metrics"]
  },
  {
    id: 9,
    icon: "fa-solid fa-lightbulb",
    title: "Business Intelligence Solutions",
    description: "End-to-end BI solutions: from data warehouse design to dashboard delivery, providing a single source of truth for your organization.",
    gradient: "linear-gradient(135deg, #f77062, #fe5196)",
    tags: ["BI", "Strategy", "Analytics"]
  },
  {
    id: 10,
    icon: "fa-solid fa-chart-pie",
    title: "Data Visualization",
    description: "Transform complex data into clear, compelling visual stories that communicate insights at a glance, using Power BI, Chart.js, and Excel.",
    gradient: "linear-gradient(135deg, #c471f5, #fa71cd)",
    tags: ["Visualization", "Storytelling"]
  },
  {
    id: 11,
    icon: "fa-solid fa-envelope-open-text",
    title: "Automated Reporting Systems",
    description: "Build fully automated reporting pipelines that pull data, generate reports, and email them to stakeholders on your schedule — zero manual effort.",
    gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    tags: ["Automation", "Reports", "Python"]
  },
  {
    id: 12,
    icon: "fa-solid fa-boxes-stacked",
    title: "Inventory Analytics",
    description: "Optimize stock levels, track turnover rates, identify slow-moving inventory, and forecast demand using advanced analytical models.",
    gradient: "linear-gradient(135deg, #fddb92, #d1fdff)",
    tags: ["Inventory", "Forecasting", "Analytics"]
  }
];
