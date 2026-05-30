// ============================================
// AMOGH PORTFOLIO — PLACEHOLDER DATA
// All content centralized for easy editing
// ============================================

export const personalInfo = {
  name: "Amogh",
  roles: [
    "Full Stack Developer",
    "ML Engineer",
    "Cloud Architect",
    "Blockchain Developer",
    "UI/UX Designer",
  ],
  tagline: "Crafting digital experiences at the intersection of design and technology",
  email: "amogh@example.com",
  location: "San Francisco, CA",
  bio: `I'm a passionate technologist who thrives at the intersection of creativity and engineering. 
  With expertise spanning full-stack development, machine learning, cloud architecture, and blockchain, 
  I build products that are not just functional — they're experiences. I believe great software should 
  feel invisible, empowering users while delighting them with every interaction.`,
  stats: [
    { label: "Projects Built", value: 30 },
    { label: "Tech Domains", value: 6 },
    { label: "Years Experience", value: 4 },
  ],
  social: {
    github: "https://github.com/amogh",
    linkedin: "https://linkedin.com/in/amogh",
    twitter: "https://twitter.com/amogh",
    email: "mailto:amogh@example.com",
  },
  resumeUrl: "/resume.pdf",
};

export const skills = [
  {
    category: "Frontend",
    icon: "Monitor",
    color: "#00F0FF",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Vue.js", level: 80 },
      { name: "TypeScript", level: 92 },
      { name: "HTML/CSS", level: 98 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: "Server",
    color: "#8B5CF6",
    items: [
      { name: "Node.js", level: 92 },
      { name: "Python", level: 90 },
      { name: "Express", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 87 },
      { name: "MongoDB", level: 82 },
    ],
  },
  {
    category: "ML / AI",
    icon: "Brain",
    color: "#F472B6",
    items: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 82 },
      { name: "scikit-learn", level: 88 },
      { name: "NLP", level: 80 },
      { name: "Computer Vision", level: 78 },
      { name: "LLMs / RAG", level: 83 },
    ],
  },
  {
    category: "DevOps / Cloud",
    icon: "Cloud",
    color: "#34D399",
    items: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 82 },
      { name: "AWS", level: 87 },
      { name: "GCP", level: 80 },
      { name: "CI/CD", level: 88 },
      { name: "Terraform", level: 75 },
    ],
  },
  {
    category: "Blockchain",
    icon: "Link",
    color: "#FBBF24",
    items: [
      { name: "Solidity", level: 80 },
      { name: "Ethereum", level: 82 },
      { name: "Web3.js", level: 78 },
      { name: "Smart Contracts", level: 80 },
      { name: "DeFi", level: 75 },
      { name: "Hardhat", level: 77 },
    ],
  },
  {
    category: "UI/UX Design",
    icon: "Palette",
    color: "#FB923C",
    items: [
      { name: "Figma", level: 90 },
      { name: "Adobe XD", level: 80 },
      { name: "Prototyping", level: 85 },
      { name: "Design Systems", level: 88 },
      { name: "User Research", level: 78 },
      { name: "Motion Design", level: 82 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "AI Code Review Assistant",
    description:
      "An intelligent code review tool powered by GPT-4 that analyzes pull requests, suggests improvements, and detects potential bugs in real-time. Integrated with GitHub Actions for seamless CI/CD workflows.",
    tags: ["Python", "FastAPI", "GPT-4", "React", "Docker"],
    category: "ML/AI",
    github: "https://github.com/amogh/ai-code-review",
    live: "https://ai-review.demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "DeFi Yield Dashboard",
    description:
      "A comprehensive DeFi analytics dashboard tracking yield farming opportunities across multiple chains. Real-time data visualization with wallet integration and portfolio tracking.",
    tags: ["React", "Web3.js", "Solidity", "The Graph", "D3.js"],
    category: "Blockchain",
    github: "https://github.com/amogh/defi-dashboard",
    live: "https://defi-dash.demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Real-time Chat Platform",
    description:
      "A scalable real-time messaging platform with E2E encryption, file sharing, video calls, and AI-powered message summarization. Supports 10K+ concurrent users.",
    tags: ["Next.js", "Socket.io", "Redis", "PostgreSQL", "WebRTC"],
    category: "Frontend",
    github: "https://github.com/amogh/chat-platform",
    live: "https://chat.demo.com",
    featured: true,
  },
  {
    id: 4,
    title: "K8s Auto-Scaler Engine",
    description:
      "Custom Kubernetes autoscaler that uses ML-based prediction to proactively scale workloads before traffic spikes. Reduced infrastructure costs by 40% in production.",
    tags: ["Go", "Kubernetes", "Prometheus", "TensorFlow", "Terraform"],
    category: "DevOps",
    github: "https://github.com/amogh/k8s-autoscaler",
    featured: false,
  },
  {
    id: 5,
    title: "Neural Style Transfer App",
    description:
      "A web application that applies artistic styles to photos using neural style transfer. Features real-time preview, batch processing, and a gallery of pre-trained artistic models.",
    tags: ["PyTorch", "React", "FastAPI", "CUDA", "Docker"],
    category: "ML/AI",
    github: "https://github.com/amogh/style-transfer",
    live: "https://style.demo.com",
    featured: true,
  },
  {
    id: 6,
    title: "Design System Library",
    description:
      "A comprehensive, accessible component library with 50+ components, dark/light themes, and full Storybook documentation. Used across 5 production applications.",
    tags: ["React", "TypeScript", "Storybook", "CSS Modules", "Jest"],
    category: "Frontend",
    github: "https://github.com/amogh/design-system",
    live: "https://design.demo.com",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "TechCorp",
    period: "2024 — Present",
    description:
      "Leading the development of a next-generation SaaS platform serving 50K+ users. Architected microservices infrastructure and mentored a team of 6 engineers.",
    highlights: [
      "Rebuilt the frontend with Next.js, improving performance scores by 45%",
      "Designed and implemented real-time collaboration features using WebSockets",
      "Established CI/CD pipelines reducing deployment time from 2 hours to 15 minutes",
      "Mentored junior developers through code reviews and pair programming sessions",
    ],
  },
  {
    id: 2,
    role: "ML Engineer",
    company: "DataLabs AI",
    period: "2022 — 2024",
    description:
      "Built and deployed production ML models for NLP and computer vision applications. Worked on the core recommendation engine processing 1M+ daily predictions.",
    highlights: [
      "Developed a recommendation engine increasing user engagement by 35%",
      "Built an NLP pipeline for automated content moderation with 97% accuracy",
      "Optimized model serving infrastructure, reducing inference latency by 60%",
      "Published research on efficient transformer fine-tuning techniques",
    ],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "StartupXYZ",
    period: "2021 — 2022",
    description:
      "First engineering hire at an early-stage startup. Built the entire frontend from scratch and established the design system and development practices.",
    highlights: [
      "Built the product from 0 to 1, achieving product-market fit within 6 months",
      "Created a reusable component library reducing development time by 40%",
      "Implemented responsive designs achieving 100 Lighthouse accessibility score",
      "Integrated analytics and A/B testing frameworks for data-driven decisions",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Indian Institute of Technology",
    year: "2017 — 2021",
    gpa: "9.2 / 10",
    highlights: [
      "Specialization in Artificial Intelligence and Machine Learning",
      "Published 2 papers in international conferences",
      "Dean's List for Academic Excellence",
    ],
  },
];

export const certifications = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Cloud Professional", issuer: "Google Cloud", year: "2023" },
  { name: "TensorFlow Developer", issuer: "Google", year: "2023" },
  { name: "Certified Kubernetes Admin", issuer: "CNCF", year: "2022" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const terminalCommands = {
  help: {
    output: `Available commands:
  about       — Who is Amogh?
  skills      — View tech stack
  projects    — Browse projects
  experience  — Work history
  contact     — Get in touch
  resume      — Download resume
  clear       — Clear terminal
  sudo hire amogh  — 🎉 Easter egg!
  
Type any command to get started.`,
  },
  about: {
    output: `╔══════════════════════════════════════╗
║           AMOGH                    ║
║   Full Stack • ML • Cloud • Web3   ║
╚══════════════════════════════════════╝

Passionate technologist at the intersection
of creativity and engineering. Building 
products that are experiences, not just tools.

Location: San Francisco, CA
Status:   Open to opportunities ✨`,
  },
  skills: {
    output: `┌─────────────────────────────────────┐
│  TECH STACK                         │
├─────────────────────────────────────┤
│  Frontend  ██████████░  React, Next │
│  Backend   █████████░░  Node, Python│
│  ML / AI   ████████░░░  TF, PyTorch │
│  DevOps    █████████░░  K8s, AWS    │
│  Web3      ████████░░░  Solidity    │
│  Design    █████████░░  Figma, XD   │
└─────────────────────────────────────┘`,
  },
  projects: {
    output: `📂 PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AI Code Review Assistant   [ML/AI]
2. DeFi Yield Dashboard       [Web3]
3. Real-time Chat Platform     [Full Stack]
4. K8s Auto-Scaler Engine      [DevOps]
5. Neural Style Transfer App   [ML/AI]
6. Design System Library       [Frontend]

→ Scroll up to see them in detail!`,
  },
  experience: {
    output: `💼 EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▸ Sr. Full Stack Dev @ TechCorp
  2024 — Present

▸ ML Engineer @ DataLabs AI
  2022 — 2024

▸ Frontend Developer @ StartupXYZ
  2021 — 2022`,
  },
  contact: {
    output: `📬 GET IN TOUCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    amogh@example.com
GitHub:   github.com/amogh
LinkedIn: linkedin.com/in/amogh
Twitter:  twitter.com/amogh

Let's build something amazing! 🚀`,
  },
};
