export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const content = {
  en: {
    nav: { work: "Work", lab: "Lab", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "AI Product Engineer / Design Engineer",
      lines: ["I build", "intelligent", "digital products."],
      supporting: "I work at the intersection of design, engineering, AI and business.",
      cta: "Explore selected work",
      secondary: "Start a project",
    },
    identity: {
      eyebrow: "01 / Practice",
      statement: "From visual craft to intelligent systems.",
      words: ["Design", "Build", "AI", "Growth"],
      body: "A multidisciplinary practice shaped by product thinking, interface design, frontend engineering, growth and AI-native experimentation.",
    },
    work: {
      eyebrow: "02 / Selected Work",
      title: "Proof over promises.",
      items: [
        { index: "001", title: "Reveal Studio", category: "AI Product / Beauty Tech", url: "https://virtual-hair-style.vercel.app/" },
        { index: "002", title: "Taller Express", category: "Product / Automotive Service", url: "https://tallerexpress.one" },
        { index: "003", title: "Villas de San Luis", category: "Real Estate / Growth Experience", url: "https://villasdesanluis.com/" },
      ],
    },
    capabilities: {
      eyebrow: "03 / Capabilities",
      title: "One practice. Multiple disciplines.",
      groups: [
        ["Strategy", "Product Strategy", "Digital Strategy", "Experience Strategy"],
        ["Design", "UX/UI", "Interaction Design", "Design Systems"],
        ["Engineering", "React", "Next.js", "TypeScript", "APIs"],
        ["Intelligence", "AI-native Products", "LLM Applications", "Agentic Workflows"],
        ["Growth", "Conversion", "Customer Journeys", "Ecommerce"],
      ],
    },
    about: {
      eyebrow: "04 / About",
      title: "Built across disciplines. Operating across markets.",
      body: "Based in El Salvador and working across Canada, the United States and Latin America. My work connects product strategy, design, engineering and AI to turn business ideas into digital experiences people can understand, use and value.",
      denysoft: "Founder of Denysoft, a founder-led digital studio for business websites, ecommerce, branding, UX/UI and digital growth.",
      axom: "Building AXOM, an AI-native product and software ecosystem exploring governed agentic development and intelligent product engineering.",
    },
    contact: {
      eyebrow: "05 / Contact",
      title: ["Let’s build", "something", "valuable."],
      body: "Available for selected product, web and AI engagements.",
      cta: "Start a conversation",
    },
    footer: "Canada / United States / El Salvador",
  },
  es: {
    nav: { work: "Trabajo", lab: "Lab", about: "Perfil", contact: "Contacto" },
    hero: {
      eyebrow: "AI Product Engineer / Design Engineer",
      lines: ["Construyo", "productos digitales", "inteligentes."],
      supporting: "Trabajo en la intersección entre diseño, ingeniería, IA y negocio.",
      cta: "Ver trabajo seleccionado",
      secondary: "Iniciar un proyecto",
    },
    identity: {
      eyebrow: "01 / Práctica",
      statement: "Del oficio visual a los sistemas inteligentes.",
      words: ["Diseño", "Construyo", "IA", "Crecimiento"],
      body: "Una práctica multidisciplinaria formada por pensamiento de producto, diseño de interfaces, ingeniería frontend, growth y experimentación AI-native.",
    },
    work: {
      eyebrow: "02 / Trabajo Seleccionado",
      title: "Evidencia antes que promesas.",
      items: [
        { index: "001", title: "Reveal Studio", category: "Producto IA / Beauty Tech", url: "https://virtual-hair-style.vercel.app/" },
        { index: "002", title: "Taller Express", category: "Producto / Servicio Automotriz", url: "https://tallerexpress.one" },
        { index: "003", title: "Villas de San Luis", category: "Real Estate / Growth Experience", url: "https://villasdesanluis.com/" },
      ],
    },
    capabilities: {
      eyebrow: "03 / Capacidades",
      title: "Una práctica. Múltiples disciplinas.",
      groups: [
        ["Estrategia", "Estrategia de Producto", "Estrategia Digital", "Experience Strategy"],
        ["Diseño", "UX/UI", "Interaction Design", "Design Systems"],
        ["Ingeniería", "React", "Next.js", "TypeScript", "APIs"],
        ["Inteligencia", "Productos AI-native", "Aplicaciones LLM", "Agentic Workflows"],
        ["Growth", "Conversión", "Customer Journeys", "Ecommerce"],
      ],
    },
    about: {
      eyebrow: "04 / Perfil",
      title: "Construido entre disciplinas. Operando entre mercados.",
      body: "Opero desde El Salvador y trabajo con mercados en Canadá, Estados Unidos y Latinoamérica. Mi trabajo conecta estrategia de producto, diseño, ingeniería e IA para convertir ideas de negocio en experiencias digitales que las personas puedan entender, usar y valorar.",
      denysoft: "Fundador de Denysoft, un estudio digital founder-led para websites empresariales, ecommerce, branding, UX/UI y crecimiento digital.",
      axom: "Construyendo AXOM, un ecosistema AI-native de producto y software que explora desarrollo agéntico gobernado e ingeniería de productos inteligentes.",
    },
    contact: {
      eyebrow: "05 / Contacto",
      title: ["Construyamos", "algo", "valioso."],
      body: "Disponible para proyectos seleccionados de producto, web e IA.",
      cta: "Iniciar conversación",
    },
    footer: "Canadá / Estados Unidos / El Salvador",
  },
} as const;

export function getContent(locale: Locale) {
  return content[locale];
}
