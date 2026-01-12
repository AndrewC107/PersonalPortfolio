/**
 * PHASE 0 — Content source of truth (edit this file to personalize the site later).
 *
 * What you'll likely edit first:
 * - Basics: name, headline, location, email, links
 * - Hero: bullets, quickTags, headshot alt text
 * - Projects: replace placeholders (titles, impact, links, tech)
 * - Experience: bullets + dates
 * - Education/Certifications: add your real entries
 *
 * Assets to add in /public:
 * - /public/headshot.jpg
 * - /public/resume.pdf
 * (Optional) /public/og-image.png
 */
export type CtaVariant = "primary" | "secondary" | "ghost";

export interface BasicsLinks {
  github: string;
  linkedin: string;
  website?: string;
}

export interface ResumeLink {
  label: string;
  href: string; // should point to /resume.pdf
}

export interface BasicsSection {
  name: string;
  headline: string;
  location: string;
  email: string;
  links: BasicsLinks;
  resume: ResumeLink;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: CtaVariant;
}

export interface Headshot {
  src: "/headshot.jpg";
  alt: string;
}

export interface HeroSection {
  heroBullets: string[];
  ctas: HeroCta[];
  quickTags: string[];
  headshot: Headshot;
}

export interface AboutHighlight {
  title: string;
  description: string;
}

export interface AboutSection {
  paragraphs: string[];
  highlights: AboutHighlight[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SkillsSection {
  groups: SkillGroup[];
}

export interface ImpactMetric {
  label: string;
  value: string;
  hint?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export type ProjectMediaAspect = "16:9" | "4:3" | "1:1";

export interface ProjectMedia {
  src: string; // e.g. "/projects/password-tester.png"
  alt: string;
  aspect?: ProjectMediaAspect; // defaults to 16:9 if omitted
}

export interface Project {
  title: string;
  impactLine: string;
  description: string;
  tech: string[];
  links: ProjectLinks;
  featured: boolean;
  media?: ProjectMedia;
}

export interface ProjectsSection {
  projects: Project[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  dates: string;
  details?: string[];
  tags?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  tags?: string[];
  status?: "completed" | "in-progress";
  badge?: { src: string; alt: string };
}

export interface EducationSection {
  education: EducationEntry[];
  certifications: Certification[];
}

export interface ExperienceEntry {
  role: string;
  org: string;
  dates: string;
  location?: string;
  bullets: string[];
  tech?: string[];
  tags?: string[];
}

export interface ExperienceSection {
  experience: ExperienceEntry[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactSection {
  contactBlurb: string;
  social: SocialLink[];
}

export interface PortfolioContent {
  basics: BasicsSection;
  hero: HeroSection;
  impactMetrics: ImpactMetric[];
  about: AboutSection;
  skills: SkillsSection;
  projects: ProjectsSection;
  education: EducationSection;
  experience: ExperienceSection;
  contact: ContactSection;
}

const portfolio: PortfolioContent = {
  basics: {
    name: "Andrew Clausen",
    headline: "Information Security + Software Developer",
    location: "Mississauga, ON",
    email: "aclausen567@gmail.com",
    links: {
      github: "https://github.com/AndrewC107",
      linkedin: "https://www.linkedin.com/in/andrew-cl",
      website: "https://andrewcl-portfolio.vercel.app/",
    },
    resume: {
      label: "Download Resume",
      href: "/resume.pdf",
    },
  },

  hero: {
    heroBullets: [
      "4th-year CS student at Queen's University, specializing in cybersecurity",
      "Hands-on experience with security labs, network analysis, and both offensive and defensive simulations",
      "Experience working with structured datasets, APIs, and visualizations",
      "Curious, self-driven, and always learning beyond the classroom",
    ],
    ctas: [
      { label: "View Projects", href: "#projects", variant: "primary" },
      { label: "Download Resume", href: "/resume.pdf", variant: "secondary" },
      { label: "Contact", href: "#contact", variant: "ghost" },
    ],
    quickTags: ["Cybersecurity", "Full-Stack", "Python", "TypeScript", "SQL", "Data Analytics"],
    headshot: {
      src: "/headshot.jpg",
      alt: "Portrait of YOUR NAME",
    },
  },

  impactMetrics: [
    { label: "Years Programming", value: "7", hint: "" },
    { label: "Projects Completed", value: "4", hint: "" },
    { label: "Certifications", value: "4", hint: "Earned / In progress" },
    { label: "Security Labs Completed", value: "6", hint: "Coursework" },
  ],

  about: {
    paragraphs: [
      "I’m a fourth-year Computer Science student with a specialization in cybersecurity and interests in software development and data analytics. I enjoy building technical solutions that balance security, clarity, and real-world usability.",
      "Through projects and coursework, I’ve worked across the stack: analyzing network behavior, implementing defensive techniques, and developing tools that support decision-making. I care about building things that are easy to maintain, communicate clearly, and behave predictably in production-like environments.",
      "Outside of academics, I like to stay active and engaged in a variety of ways. I’ve always been passionate about sports, particularly soccer, hockey, and table tennis, as they challenge me both physically and strategically." +
      "When I’m looking to unwind, I enjoy playing video games like Rocket League and Minecraft, watching action, adventure, and comedy films, or tackling puzzles that test my logic and problem-solving skills. Whether it’s a word challenge or a number-based game, I love the satisfaction that comes from finding solutions.",
    ],
    highlights: [
      {
        title: "Personal Skills",
        description:
          "Strong attention to detail, clear communication, and adaptability in fast-paced environments, with experience taking on leadership responsibilities when needed.",
      },
      {
        title: "Data & analytics",
        description:
          "Experience working with structured datasets, APIs, and visualizations to surface insights and support better technical decisions.",
      },
      {
        title: "Cybersecurity and Threat Analysis",
        description:
          "I think about security through the lens of risk and behavior—identifying potential threats, understanding their impact, and applying defensive principles to reduce exposure.",
      },
    ],
  },

  skills: {
    groups: [
      {
        name: "Languages",
        items: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "SQL", "Bash", "C", "Java", "C#"],
      },
      {
        name: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Chart.js"],
      },
      {
        name: "Backend & Services",
        items: ["Flask", "HIBP API"],
      },
    
      // Split Cloud and AI
      {
        name: "Cloud",
        items: ["AWS", "Cloud Security", "Vercel", "Zero Trust"], // Cloud Security duplicated intentionally
      },
      {
        name: "AI / ML",
        items: ["AI", "Machine Learning"],
      },
    
      // Break Security (Grouped) into the four categories you asked for
      {
        name: "Security — Concepts",
        items: [
          "Cybersecurity",
          "Security Principles",
          "Access Control",
          "Network Security",
          "Web Security",
          "Endpoint Security",
          "Security Operations",
          "Incident Response",
          "Disaster Recovery",
          "Zero Trust",
        ],
      },
      {
        name: "Security — Risk Management",
        items: ["Risk Management", "Zero Trust", "Security Operations", "Incident Response", "Disaster Recovery"],
      },
      {
        name: "Security — Cryptography",
        items: ["Cryptography", "Steganography", "Web Crypto API", "AES-256-GCM", "PBKDF2"],
      },
    
      // Data + systems (kept, but tighter)
      {
        name: "Data & Systems",
        items: [
          "Data Analytics",
          "Data Analysis",
          "Data Normalization",
          "Digitalization",
          "Data Visualization",
          "Databases",
          "Software Architecture",
          "Simulation",
        ],
      },
    
      // Platforms & tools (keep here; remove from Frontend micro-skills)
      {
        name: "Platforms & Tools",
        items: ["GitHub", "Vercel", "Salesforce", "Microsoft Excel", "Microsoft Teams", "Microsoft Word"],
      },
    
      {
        name: "Professional Skills",
        items: [
          "Communication",
          "Leadership",
          "Mentorship",
          "Teaching",
          "Training & Development",
          "Planning",
          "Organization",
          "Team Collaboration",
          "Time Management",
          "Adaptability",
          "Attention to Detail",
          "Operations",
        ],
      },
    ]
  },

  projects: {
    projects: [
      {
        title: "QKD BB84 Simulator",
        impactLine:
          "End-to-end BB84 simulation with live visualization of key exchange and QBER under eavesdropping.",
        description:
          "An interactive, end-to-end BB84 (quantum key distribution) simulation that visualizes the protocol steps and key exchange as it runs. Includes live QBER and key metrics so you can explore how eavesdropping and noise affect the final shared key.",
        tech: [
          "HTML",
          "CSS",
          "JavaScript",
          "Canvas API",
          "Chart.js",
          "Cryptography",
          "Simulation",
          "Data Visualization",
          "Vercel",
        ],
        media: {
          src: "/projects/bb84.png",
          alt: "BB84 simulator interface showing protocol visualization and QBER/key metrics charts",
          aspect: "16:9",
        },
        links: {
          demo: "https://qkd-bb-84-sim.vercel.app/qkd-simulator/",
        },
        featured: true,
      },
      {
        title: "Invisible Ink",
        impactLine:
          "Client-side encrypted steganography: AES-256-GCM notes hidden inside images using LSB embedding.",
        description:
          "A client-side steganography tool that encrypts notes with AES-256-GCM using a key derived via PBKDF2, then embeds the ciphertext into images via LSB encoding. Everything runs locally in the browser, using the Web Crypto API and Canvas/File APIs for secure handling and embedding/extraction.",
        tech: [
          "JavaScript",
          "HTML",
          "CSS",
          "Web Crypto API",
          "AES-256-GCM",
          "PBKDF2",
          "Canvas API",
          "File API",
          "Steganography",
        ],
        media: {
          src: "/projects/invisible-ink.png",
          alt: "Steganography app UI for encrypting a note and embedding it into an image",
          aspect: "16:9",
        },
        links: {
          github: "https://github.com/AndrewC107/Invisible-Ink.git",
          demo: "https://andrewc107.github.io/Invisible-Ink/",
        },
        featured: true,
      },
      {
        title: "Password Guardian",
        impactLine: "Password security tool combining entropy scoring, zxcvbn feedback, and HaveIBeenPwned checks",
        description:
          "A password security web tool that scores passwords and passphrases using entropy estimates and zxcvbn guidance, with clear UX recommendations for stronger choices. Integrates HaveIBeenPwned lookups to flag breached passwords, backed by a Flask service for validation and API calls.",
        tech: ["Python", "Flask", "JavaScript", "HIBP API", "zxcvbn", "Security UX"],
        links: {
          github: "https://github.com/AndrewC107/PasswordGuardian.git",
        },
        featured: false,
      },
      {
        title: "Portfolio Website",
        impactLine: "Personal portfolio site showcasing projects, experience, and contact details in a clean single-page layout",
        description:
          "A lightweight personal portfolio site built to present my projects, background, and contact information in a simple, recruiter-friendly format. Deployed on GitHub Pages and kept intentionally minimal for fast loading and easy navigation.",
        tech: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "lucide-react",
          "clsx",
          "Next/Image",
          "App Router",
          "SEO",
        ],
        links: {
          demo: "https://andrewc107.github.io/andrew-portfolio/",
          github: "https://github.com/AndrewC107/andrew-portfolio.git",
        },
        featured: false,
      },
    ],
  },

  education: {
    education: [
      {
        school: "Queen’s University - School of Computing",
        degree: "Bachelor of Computing (Honours) - Cybersecurity Specialization",
        dates: "2022 — 2027 (Expected)",
        details: [
          "3.72 cumulative GPA - Dean’s Honour List 2022-Present",
          "Relevant courses: Intro to Cybersecurity, Cryptography, Computer Networks, Databases, Software Architecture.",
          "Teaching Assistant: 200 level Discrete Math",
          "Orientation Leader: School of Computing",
          "Co-Founder / Executive: Queen's Table Tennis Club",
        ],
        tags: ["Cybersecurity", "Networks", "SQL", "Data Analytics", "Software Architecture", "Cryptography", "Databases"],
      }
    ],
    certifications: [
      {
        name: "Fortinet Certified Fundamentals - Cybersecurity",
        issuer: "Fortinet",
        date: "Earned 2025",
        credentialUrl: "https://www.credly.com/badges/55b94532-28d3-4214-9652-68923f037c61",
        status: "completed",
        badge: {
          src: "/certs/fortinet-certified-fundamentals.png",
          alt: "Fortinet Certified Fundamentals Cybersecurity badge",
        },
        tags: [
          "Cybersecurity",
          "Network Security",
          "Web Security",
          "Endpoint Security",
          "Cloud Security",
          "Security Operations",
          "Zero Trust",
          "Risk Management",
        ],
      },
      {
        name: "ISC² Certified in Cybersecurity (CC) – Candidate",
        issuer: "ISC²",
        date: "Expected 2026",
        credentialUrl: "https://www.credly.com/badges/47cabfe2-d370-4eaf-b309-7f6a53b0211a",
        status: "completed",
        badge: {
          src: "/certs/isc2-cc-candidate.png",
          alt: "ISC2 Certified in Cybersecurity candidate badge",
        },
        tags: [
          "Cybersecurity",
          "Security Principles",
          "Access Control",
          "Network Security",
          "Cloud Security",
          "Security Operations",
          "Incident Response",
          "Disaster Recovery",
        ],
      },
      {
        name: "AWS Certified Cloud Practitioner (Foundational) – Candidate",
        issuer: "Amazon Web Services",
        date: "Expected 2026",
        status: "in-progress",
        badge: {
          src: "/certs/aws-cloud-practitioner-candidate.png",
          alt: "AWS Cloud Practitioner candidate badge",
        },
        tags: ["AWS", "Cloud", "Cloud Security", "Cybersecurity"],
      },
      {
        name: "AWS Certified AI Practitioner (Foundational) – Candidate",
        issuer: "Amazon Web Services",
        date: "Expected 2026",
        status: "in-progress",
        badge: {
          src: "/certs/aws-ai-practitioner-candidate.png",
          alt: "AWS AI Practitioner candidate badge",
        },
        tags: ["AWS", "AI", "Machine Learning", "Cloud", "Cybersecurity"],
      },
    ],
  },

  experience: {
    experience: [
      {
        role: "Sales Data Analyst",
        org: "Northern Dock Systems",
        dates: "May 2024 – August 2024",
        location: "Mississauga, ON",
        bullets: [
          "Led a data cleanup initiative on a ~25,000-entry client database by assigning unique IDs and removing duplicates, improving lookup efficiency by ~28%.",
          "Worked directly with management as a project lead to deliver accurate, structured sales data for operational use.",
          "Served as a primary point of contact for sales representatives, supporting client verification and lead qualification.",
          "Balanced technical data work with stakeholder communication in a fast-paced business environment.",
        ],
        tech: [
          "Salesforce",
          "Microsoft Excel",
          "Digitalization",
          "Microsoft Teams",
          "Microsoft Word",
          "Data Normalization",
          "Data Analysis",
          "Attention to Detail",
        ],
      },
      {
        role: "Soccer Head Coach / Trainer",
        org: "TOCA Pro FC",
        dates: "June 2018 – Present",
        location: "Mississauga, ON",
        bullets: [
          "Instruct and lead youth athletes (ages 4–14) through structured technical and physical training programs.",
          "Coordinate schedules and communicate regularly with parents and coaching staff to support athlete development.",
          "Develop leadership, adaptability, and clear communication skills in a dynamic, team-based environment.",
        ],
        tech: ["Leadership", "Communication", "Training & Development", "Planning", "Organization"],
      },
      {
        role: "Assistant to the Executive Chef",
        org: "Cook Gourmet Inc.",
        dates: "April 2024 – Present",
        location: "Mississauga, ON",
        bullets: [
          "Supported execution of high-volume corporate events, including Fortune 500 clients, under tight time constraints.",
          "Collaborated with kitchen and service teams to deliver consistent, high-quality outcomes in high-pressure settings.",
          "Demonstrated strong attention to detail, reliability, and adaptability in a fast-paced operational environment.",
        ],
        tech: ["Operations", "Time Management", "Team Collaboration", "Communication", "Adaptability", "Attention to Detail"],
      },
      {
        role: "Teaching Assistant & Student Leadership",
        org: "Queen’s University",
        dates: "2023 – Present",
        location: "Kingston, ON",
        bullets: [
          "Teaching Assistant for second-year Discrete Mathematics, supporting students through tutorials and problem-solving.",
          "Orientation Leader for the School of Computing, helping onboard new students and coordinate academic programming.",
          "Co-Founder and Executive of the Queen’s Table Tennis Club, responsible for organization, leadership, and growth.",
        ],
        tech: ["Teaching", "Leadership", "Mentorship"],
      },
    ],
  },

  contact: {
    contactBlurb:
      "Want to collaborate, chat security, or discuss internships/new-grad roles? Send a message and I’ll get back to you soon.",
    social: [
      { label: "Email", href: "mailto:aclausen567@gmail.com" },
      { label: "GitHub", href: "https://github.com/AndrewC107" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/andrew-cl" },
      { label: "Resume", href: "/resume.pdf" },
    ],
  },
};

export default portfolio;

export const sectionIds = {
  home: "home",
  about: "about",
  skills: "skills",
  projects: "projects",
  education: "education",
  experience: "experience",
  contact: "contact",
} as const;


