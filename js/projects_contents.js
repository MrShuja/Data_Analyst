// ============================================================
// PROJECTS_CONTENTS.JS — Portfolio project showcase data
// ============================================================

const PROJECTS_DATA = {
  categories: ["All", "Power BI", "Python", "Excel", "Analytics", "Automation"],

  projects: [
    {
      id: 1,
      title: "Sales Dashboard — Power BI",
      category: "Power BI",
      description: "An executive-level interactive sales dashboard built with Power BI featuring YoY comparisons, regional breakdowns, product performance matrices, and 15 custom DAX measures. Reduced reporting time by 80%.",
      image: null,
      color: "#7C3AED",
      technologies: ["Power BI", "DAX", "SQL", "Excel"],
      features: [
        "Real-time data refresh",
        "Drill-through reports",
        "Custom DAX KPIs",
        "Mobile-optimized layout"
      ],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      id: 2,
      title: "Excel Automation Tool",
      category: "Automation",
      description: "A Python-powered Excel automation suite using OpenPyXL and Pandas that processes 50,000+ rows per minute, generates formatted reports automatically, and emails them to stakeholders on schedule.",
      image: null,
      color: "#06B6D4",
      technologies: ["Python", "OpenPyXL", "Pandas", "SMTP"],
      features: [
        "Batch Excel processing",
        "Auto-email delivery",
        "Custom formatting engine",
        "Error logging system"
      ],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      id: 3,
      title: "Sales Data Analysis — Pandas",
      category: "Python",
      description: "Comprehensive EDA pipeline built with Pandas and Matplotlib that performs cohort analysis, RFM scoring, seasonality detection, and product affinity analysis on 2M+ transaction records.",
      image: null,
      color: "#10B981",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      features: [
        "RFM customer segmentation",
        "Cohort retention analysis",
        "Seasonality decomposition",
        "Automated insight extraction"
      ],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      id: 4,
      title: "Business KPI Dashboard",
      category: "Power BI",
      description: "A 360° business KPI monitoring dashboard integrated with live SQL Server data, featuring traffic-light KPI cards, trend sparklines, forecast bands, and executive-level commentary boxes.",
      image: null,
      color: "#F59E0B",
      technologies: ["Power BI", "SQL Server", "DAX", "M Query"],
      features: [
        "Live SQL connectivity",
        "Traffic-light KPIs",
        "Forecast trend lines",
        "Mobile-first design"
      ],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      id: 5,
      title: "Inventory Management Analytics",
      category: "Analytics",
      description: "End-to-end inventory analytics system that tracks stock levels, calculates reorder points, identifies dead stock, and generates ABC/XYZ classification reports using Python and Excel.",
      image: null,
      color: "#EF4444",
      technologies: ["Python", "Excel", "Pandas", "Matplotlib"],
      features: [
        "ABC-XYZ classification",
        "Automated reorder alerts",
        "Turnover rate analysis",
        "Demand forecasting"
      ],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      id: 6,
      title: "CSV Data Processing Tool",
      category: "Python",
      description: "High-performance CSV processing toolkit handling files up to 10GB using chunked reading, parallel processing, and smart type inference — delivering clean, validated datasets in minutes.",
      image: null,
      color: "#8B5CF6",
      technologies: ["Python", "Pandas", "NumPy", "Multiprocessing"],
      features: [
        "10GB+ file support",
        "Parallel chunk processing",
        "Smart data validation",
        "Custom transformation rules"
      ],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      id: 7,
      title: "Financial Reporting System",
      category: "Excel",
      description: "Automated financial reporting system that pulls data from multiple Excel workbooks, consolidates P&L, balance sheets, and cash flows, then generates executive PDF reports via Python.",
      image: null,
      color: "#EC4899",
      technologies: ["Python", "Excel", "OpenPyXL", "ReportLab"],
      features: [
        "Multi-source consolidation",
        "PDF auto-generation",
        "Budget vs actual variance",
        "Scheduled email delivery"
      ],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      id: 8,
      title: "Customer Analytics Dashboard",
      category: "Analytics",
      description: "360° customer intelligence dashboard featuring acquisition funnels, lifetime value modeling, churn prediction, NPS trends, and segment-level behavioral analysis with Power BI.",
      image: null,
      color: "#14B8A6",
      technologies: ["Power BI", "Python", "SQL", "DAX"],
      features: [
        "CLV calculation",
        "Churn risk scoring",
        "Funnel visualization",
        "NPS trend tracking"
      ],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      id: 9,
      title: "Automated Excel Reporting System",
      category: "Automation",
      description: "Enterprise-grade automated reporting system that generates 20+ branded Excel reports nightly from a MySQL database, complete with charts, conditional formatting, and stakeholder distribution.",
      image: null,
      color: "#6366F1",
      technologies: ["Python", "MySQL", "OpenPyXL", "Scheduler"],
      features: [
        "20+ report templates",
        "MySQL data extraction",
        "Nightly scheduling",
        "Stakeholder auto-distribution"
      ],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      id: 10,
      title: "Profit & Revenue Analysis",
      category: "Analytics",
      description: "Deep-dive profitability analysis dashboard covering margin analysis, product-level contribution, channel profitability, and dynamic what-if scenario modeling with Power BI and DAX.",
      image: null,
      color: "#F97316",
      technologies: ["Power BI", "DAX", "Excel", "SQL"],
      features: [
        "Margin decomposition",
        "What-if scenario modeling",
        "Channel profitability",
        "YoY trend analysis"
      ],
      github: "#",
      demo: "#",
      featured: false
    }
  ]
};
