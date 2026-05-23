// ─────────────────────────────────────────────────────────
// SITE — global identity + links
// ─────────────────────────────────────────────────────────
const SITE = {
  name: "ARNAV NATHANI",
  shortName: "ARNAV",
  hero: {
    greeting: "Hi, I'm",
    lines: ["ARNAV", "AND I LIKE TO BUILD THINGS"],
  },
  links: {
    github: "https://github.com/arnavvnn",
    linkedin: "https://www.linkedin.com/in/arnav-nathani/",
    email: "mailto:arnav.nathani@gmail.com",
    cv: "assets/cv.pdf",
  },
};

// ─────────────────────────────────────────────────────────
// SECTIONS shown as cards on the homepage
// ─────────────────────────────────────────────────────────
const SECTIONS = [
  { number: "01", label: "WRITING", title: "BLOG", href: "blog.html", blurb: "Notes and project logs from the process." },
  { number: "02", label: "WORK", title: "PROJECTS", href: "projects.html", blurb: "Case files. Things built. Things shipped." },
  { number: "03", label: "TRACK RECORD", title: "EXPERIENCE", href: "experience.html", blurb: "Companies. Roles. Receipts." },
];

// ─────────────────────────────────────────────────────────
// EXPERIENCE — add a new object here when you get a new role
// status: "active" | "completed"
// end: null means PRESENT
// ─────────────────────────────────────────────────────────
const experiences = [
  {
    company: " WYSER- VC  ",
    role: "AI Analyst Intern",
    status: "Completed",
    start: "June 2025",
    end: "August 2025",
    bullets: [
      "Built and deployed 2 multi-layered agentic AI tools for startup due diligence and founder screening.",
      "Tools orchestrated to analyze founder, product, and market data to support early-stage investment decisions.",
    ],
    tags: ["Agent Orchestration", "LLM", "SCRAPING", "FINTECH"],
  },
  {
    company: "Plaksha Finance Cell",
    role: "President <- Analyst",
    status: "Active",
    start: "September 2024",
    end: "Present",
    bullets: [
      "Led a 25-member core team managing strategy, operations, and execution of initiatives as President in my second year at the Finance Cell.",
      "Organized multiple national finance competition with 100+ participants and over 80,000 prize pool across all of them.",
      "Led discussions on various sector's in the Indian Markets and published articles in the club’s finance newsletter."
    ],
    tags: ["Leadership", "Finance", "Fundraising(Sponsorship)"],
  },
];

// ─────────────────────────────────────────────────────────
// PROJECTS — add a new object here for each project
// status: "shipped" | "live" | "wip"
// ─────────────────────────────────────────────────────────
const projects = [
  {
    name: "Authorship Detection for Rap Lyrics",
    subtitle: "A detailed analysis of stylometric and ML methods on rap lyrics. ",
    year: 2026,
    status: "shipped",
    live: false,
    liveUrl: false,
    githubUrl: "https://github.com/arnavvnn/Authorship-Detection-in-Rap-Kendrick-vs-JCole",
    description: "Built a Kendrick vs J. Cole authorship classifier on a self-scraped 134-song corpus, comparing classical stylometry (Burrows Delta), TF-IDF linear models, and a character-level CNN under unified 5×5 cross-validation with BCa bootstrap CIs and BH-FDRmultiplicity control; best model reached 93.6 percent accuracy. Engineered 18 stylometric features (lexical diversity, function-word rate, CMU-dictionary rhyme density) and delivered TreeSHAP-based interpretability analysis while comparing more than 7 different ML and Statistical Models. ",
    image: "assets/projects/kendrick.png",
  },
  {
    name: "Urban Heat Island Severity Prediction",
    subtitle: "ML methods applied in the Indian Context",
    year: 2026,
    status: "shipped",
    live: false,
    liveUrl: null,
    githubUrl: "https://github.com/arnavvnn/Predicting-UHI-Intensity",
    description: "Built an end-to-end geospatial ML pipeline predicting Urban Heat Island intensity by pulling multispectral indices (NDVI, NDBI, EVI, Albedo) via Google Earth Engine, urban morphology features (building density, street network, SVF) via OSMnx/GeoPandas, and merging them with socioeconomic data. Trained and benchmarked Random Forest, XGBoost, KNN, and SVM models for both regression and 4-class classification using Stratified 5-Fold and Spatial Block Cross-Validation, with Optuna hyperparameter tuning — achieving R² = 0.79 for LST regression and 86.7% ROC-AUC for UHI severity classification using scikit-learn and XGBoost.",
    image: "assets/projects/uhi.png",
  },
];

// ─────────────────────────────────────────────────────────
// BLOG POSTS — add a new object here for each post
// category: "notes" | "project-logs"
// ─────────────────────────────────────────────────────────
const posts = [
  {
    slug: "the art of making a playlist.",
    title: "THE ART OF MAKING A PLAYLIST",
    date: "2026-05-05",
    readTime: 4,
    category: "notes",
    tags: ["BUILDING", "PROCESS", "REFLECTION"],
    excerpt: "Notes on the system that keeps the work standing: process, simplicity, and the case for solving one problem well before scaling.",
    body: "Your full post body goes here.",
  },
];
