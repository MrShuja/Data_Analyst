// ============================================================
// CHARTS_DATA.JS — Chart.js data for the analytics showcase
// ============================================================

const CHARTS_DATA = {

  // ── Sales Growth — Line Chart ──────────────────────────────
  salesGrowth: {
    title: "Monthly Sales Growth",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2024 Revenue ($K)",
        data: [85, 92, 110, 98, 125, 142, 138, 155, 168, 175, 190, 210],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.1)"
      },
      {
        label: "2023 Revenue ($K)",
        data: [65, 72, 80, 75, 95, 108, 102, 118, 125, 132, 145, 160],
        borderColor: "#06B6D4",
        backgroundColor: "rgba(6, 182, 212, 0.1)"
      }
    ]
  },

  // ── Profit Analysis — Bar Chart ────────────────────────────
  profitAnalysis: {
    title: "Quarterly Profit Analysis",
    labels: ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
    datasets: [
      {
        label: "Revenue ($K)",
        data: [217, 278, 345, 437, 295, 365, 461, 575],
        backgroundColor: "rgba(124, 58, 237, 0.8)",
        borderColor: "#7C3AED"
      },
      {
        label: "Profit ($K)",
        data: [87, 112, 138, 175, 118, 146, 184, 230],
        backgroundColor: "rgba(6, 182, 212, 0.8)",
        borderColor: "#06B6D4"
      }
    ]
  },

  // ── Customer Analytics — Doughnut Chart ────────────────────
  customerAnalytics: {
    title: "Customer Segments",
    labels: ["Enterprise", "Mid-Market", "SMB", "Startup", "Individual"],
    data: [35, 28, 20, 12, 5],
    colors: ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EC4899"],
    hoverColors: ["#6D28D9", "#0891B2", "#059669", "#D97706", "#DB2777"]
  },

  // ── Revenue by Category — Pie Chart ───────────────────────
  revenueByCategory: {
    title: "Revenue by Service",
    labels: ["Power BI Dashboards", "Python Automation", "Excel Solutions", "Data Analysis", "BI Consulting"],
    data: [38, 27, 18, 12, 5],
    colors: ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EC4899"]
  },

  // ── KPI Cards ─────────────────────────────────────────────
  kpiCards: [
    {
      label: "Total Revenue 2024",
      value: "$1.69M",
      change: "+24.3%",
      positive: true,
      icon: "fa-dollar-sign",
      color: "#7C3AED"
    },
    {
      label: "Projects Delivered",
      value: "47",
      change: "+18 YoY",
      positive: true,
      icon: "fa-briefcase",
      color: "#06B6D4"
    },
    {
      label: "Avg Project ROI",
      value: "312%",
      change: "+45% vs 2023",
      positive: true,
      icon: "fa-chart-line",
      color: "#10B981"
    },
    {
      label: "Client Satisfaction",
      value: "98.7%",
      change: "+1.2% YoY",
      positive: true,
      icon: "fa-star",
      color: "#F59E0B"
    }
  ],

  // ── Skills Radar — for potential radar chart ───────────────
  skillsRadar: {
    labels: ["Python", "Power BI", "Excel", "SQL", "Visualization", "Automation"],
    data: [95, 93, 97, 89, 94, 91]
  }
};
