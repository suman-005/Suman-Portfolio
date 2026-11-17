export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectStory {
  idea: string;
  build: string;
  experience: string;
  result: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  features: ProjectFeature[];
  story: ProjectStory;
  liveUrl?: string;
  apiUrl?: string;
  repositoryUrl?: string;
  isPrototype?: boolean;
  status: 'deployed' | 'in_development' | 'concept';
  year: string;
  image?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
  description?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    role: string;
    tagline: string;
    location: string;
    coordinates: string;
    heroStatement: string;
    introParagraph: string;
    education: {
      degree: string;
      institution: string;
      university: string;
      period: string;
    };
  };
  kineticStatement: string[];
  projects: Project[];
  skills: SkillGroup[];
  exploring: { term: string; context: string }[];
  journey: Milestone[];
  socials: {
    email: { address: string; isPlaceholder: boolean };
    github: { url: string; handle: string; username: string; isPlaceholder: boolean };
    instagram: { url: string; handle: string; username: string; isPlaceholder: boolean };
    linkedin: { url: string; handle: string; isPlaceholder: boolean };
  };
  colophon: {
    year: string;
    version: string;
    stack: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Suman Das',
    firstName: 'Suman',
    lastName: 'Das',
    title: 'Web Developer · AI Enthusiast',
    role: 'Full-Stack Developer & Creative Technologist',
    tagline: 'I build digital experiences with code, creativity and AI.',
    location: 'Bardhaman, India',
    coordinates: '23.2324° N, 87.8615° E',
    heroStatement: 'Engineering scalable web systems, intuitive interfaces, and AI-driven platforms.',
    introParagraph: 'Computer applications student and full-stack developer passionate about building high-performance web systems, kinetic user interfaces, and intelligent backends.',
    education: {
      degree: 'Bachelor of Computer Applications',
      institution: 'Burdwan Institute of Management & Computer Science',
      university: 'Burdwan University',
      period: '2024 — 2027',
    },
  },

  kineticStatement: [
    'I DESIGN AND DEVELOP SCALABLE FULL-STACK WEB SYSTEMS',
    'FOCUSED ON PERFORMANCE, KINETIC INTERFACES, AND MODERN AI APIS',
  ],

  projects: [
    {
      id: 'pujapath',
      number: '01',
      title: 'PUJAPATH',
      category: 'Full-Stack Web Application · Cultural Companion',
      tagline: 'Durga Puja discovery, navigation and crowd intelligence for Purba Bardhaman.',
      description:
        'A digital guide for discovering and navigating Durga Puja experiences across Purba Bardhaman. Combines interactive Leaflet maps, crowd intelligence, cultural pandal registries, a community photo gallery with visitor image uploads, and multilingual support into a cohesive web experience.',
      technologies: [
        'React',
        'TypeScript',
        'Vite',
        'FastAPI',
        'Cloudinary',
        'Leaflet',
        'OpenStreetMap',
        'Tailwind CSS',
        'Render',
      ],
      features: [
        {
          title: 'DISCOVER',
          description:
            'Interactive catalog of Durga Puja pandals across Purba Bardhaman with theme descriptions and location details.',
        },
        {
          title: 'NAVIGATE',
          description:
            'Interactive Leaflet maps with custom markers and turn-by-turn route guidance.',
        },
        {
          title: 'COMMUNITY GALLERY',
          description:
            'Public photo gallery allowing festival visitors to upload and share celebration photos via Cloudinary CDN media hosting, featuring automated 6-second multi-device synchronization and admin PIN moderation.',
        },
        {
          title: 'CROWD INTELLIGENCE',
          description:
            'Live community crowd reporting enabling festival visitors to share footfall updates and avoid congestion during peak hours.',
        },
        {
          title: 'EMERGENCY DIRECTORY',
          description:
            'Quick-access directory of local emergency helplines, police assistance booths, medical centers, and volunteer contacts.',
        },
        {
          title: 'MULTILINGUAL',
          description:
            'Native festival guide accessibility in English, Bengali, and Hindi.',
        },
        {
          title: 'AI ASSISTANT',
          description:
            'Integrated FastAPI assistant endpoint providing guidance on festival logistics, rituals, and pandal route planning.',
        },
      ],
      story: {
        idea:
          'During Durga Puja in Purba Bardhaman, navigating hundreds of distinct pandals across crowded streets is a major challenge for locals and visitors. Existing commercial maps lack cultural context, festival-specific walking routes, and pandal theme details. PujaPath was built as a dedicated digital guide to bring the entire festival ecosystem into one unified, accessible platform.',
        build:
          'Engineered as a full-stack web application. The frontend was built with React, TypeScript, and Vite for reactive performance and interactive map rendering via Leaflet. The backend was structured with Python\'s FastAPI framework to handle asynchronous REST endpoints for pandal registries, theme classifications, community crowd reports, visitor photo gallery uploads integrated with Cloudinary CDN, and an AI assistant service, backed by PostgreSQL.',
        experience:
          'Visitors can explore pandals by region and theme, view interactive map coordinates, plan walking routes, check crowd activity updates, browse and post live celebration photos in the community gallery, switch languages (English, Bengali, Hindi), and quickly access emergency contact numbers during festivities.',
        result:
          'A live, fully functioning web application actively deployed on Render (pujapath-web.onrender.com) with a dedicated cloud-hosted FastAPI backend (pujapath-lt0c.onrender.com), serving community festival data for Purba Bardhaman.',
      },
      liveUrl: 'https://pujapath-web.onrender.com/',
      apiUrl: 'https://pujapath-lt0c.onrender.com/',
      repositoryUrl: 'https://github.com/suman-005/PujaPath.git',
      isPrototype: false,
      status: 'deployed',
      year: '2025',
      image: '/projects/pujapath.webp',
    },
    {
      id: 'financial-practice-portal',
      number: '02',
      title: 'FINANCIAL PRACTICE & AUDIT PORTAL',
      category: 'Full-Stack Web Platform · Client Demo',
      tagline: 'Client practice management and automated tax-filing compliance system.',
      description:
        'A secure, responsive management portal engineered for an accounting and audit practice. Streamlines client financial document intake, tax filing compliance, audit tracking, and automated ledger summaries while enforcing strict data confidentiality.',
      technologies: [
        'React',
        'TypeScript',
        'Vite',
        'FastAPI',
        'Python',
        'Tailwind CSS',
        'REST API',
        'JWT Auth',
      ],
      features: [
        {
          title: 'DOCUMENT INTAKE & VALIDATION',
          description:
            'Secure client submission portal allowing intake of financial records, GST challans, and audit sheets with client-side format checks.',
        },
        {
          title: 'AUDIT & COMPLIANCE TRACKING',
          description:
            'Dynamic task dashboard tracking quarterly audit milestones, compliance deadlines, and filing verification stages.',
        },
        {
          title: 'ROLE-BASED ACCESS CONTROL',
          description:
            'Multi-tier access separation isolating internal audit and tax personnel from external client portals to safeguard sensitive financial data.',
        },
        {
          title: 'LEDGER & SUMMARY REPORTING',
          description:
            'Automated generation and presentation of ledger overviews, filing status summaries, and audit trail metrics.',
        },
      ],
      story: {
        idea:
          'Replace unstructured email exchanges and physical paperwork in client accounting with a unified, confidential digital workflow portal.',
        build:
          'Constructed with a React and TypeScript frontend coupled to a high-performance Python FastAPI backend, utilizing JWT-based role separation and modular REST endpoints.',
        experience:
          'Provides clients with an intuitive dashboard to track tax and audit progress, while giving practice staff a centralized console for document review and validation.',
        result:
          'Eliminated manual follow-up overhead, streamlined compliance lifecycle management, and created an audit-ready digital paper trail.',
      },
      repositoryUrl: 'https://github.com/suman-005',
      status: 'deployed',
      year: '2026',
      image: '/projects/financial-portal.png',
    },
  ],

  skills: [
    {
      category: 'FRONTEND',
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
      description: 'Modern component architectures, typed applications, and responsive design systems.',
    },
    {
      category: 'BACKEND',
      skills: ['FastAPI', 'Python', 'Node.js', 'REST APIs'],
      description: 'Asynchronous services, API development, and data modeling.',
    },
    {
      category: 'DATABASE',
      skills: ['PostgreSQL', 'SQL', 'MongoDB'],
      description: 'Relational schemas, query optimization, and persistent stores.',
    },
    {
      category: 'TOOLS',
      skills: ['Git', 'GitHub'],
      description: 'Version control, collaborative workflows, and deployment setups.',
    },
    {
      category: 'AI / DATA',
      skills: ['Python', 'NumPy', 'Pandas', 'AI / ML'],
      description: 'Data analysis, statistical computing, and machine learning pipelines.',
    },
  ],

  exploring: [
    { term: 'AI', context: 'LLM agents, retrieval pipelines, applied generative models' },
    { term: 'WEB', context: 'Next-gen rendering, kinetic web design, web performance' },
    { term: 'DSA', context: 'Algorithms, complexity analysis, problem solving in C/Python' },
    { term: 'BACKEND', context: 'FastAPI microservices, concurrency, event architectures' },
    { term: 'SYSTEMS', context: 'Operating systems, memory management, Linux tooling' },
    { term: 'CLOUD', context: 'Containerization, serverless compute, modern hosting' },
  ],

  journey: [
    {
      year: '2024',
      title: 'Foundations & Computer Science Core',
      description: 'Started BCA at Burdwan University and began building programming fundamentals, core C, computational thinking, and software principles.',
      highlight: 'First code written, problem-solving in C',
    },
    {
      year: '2025',
      title: 'Deepening Web & Software Development',
      description: 'Focused more deeply on modern web development, JavaScript paradigms, responsive interfaces, and practical software engineering practices.',
      highlight: 'DOM architecture, modern JS, backend exploration',
    },
    {
      year: '2026',
      title: 'Full Stack Systems & AI Exploration',
      description: 'Worked with React, TypeScript, Python, APIs, relational databases, and AI-related learning. Began architecting PujaPath.',
      highlight: 'Full-stack development, geospatial logic & AI tooling',
    },
    {
      year: '2026 — 2027',
      title: 'Production Projects & Future Trajectory',
      description: 'Building real projects, improving algorithmic problem-solving, preparing for internships and placements, and continuing to explore AI-powered web development.',
      highlight: 'Refining craft, high-performance web engineering',
    },
  ],

  socials: {
    email: {
      address: 'sumandas6424@gmail.com',
      isPlaceholder: false,
    },
    github: {
      url: 'https://github.com/suman-005',
      handle: 'github.com/suman-005',
      username: 'suman-005',
      isPlaceholder: false,
    },
    instagram: {
      url: 'https://www.instagram.com/_they_callme_suman/',
      handle: 'instagram.com/_they_callme_suman',
      username: '_they_callme_suman',
      isPlaceholder: false,
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/suman-das-8752aa3a4/',
      handle: 'linkedin.com/in/suman-das-8752aa3a4',
      isPlaceholder: false,
    },
  },

  colophon: {
    year: '2026',
    version: '1.0.0',
    stack: 'React · TypeScript · GSAP · Lenis · Vite',
  },
};
