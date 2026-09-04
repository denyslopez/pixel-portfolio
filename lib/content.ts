export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const content = {
  en: {
    nav: { work: "Work", practice: "Practice", lab: "Lab", about: "About", contact: "Contact" },
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
    archive: {
      eyebrow: "03 / Selected Client Work",
      title: "A longer record of building for real businesses.",
      items: [
        { index: "01", title: "All Star Restoration", category: "Service Business / Lead Generation", url: "https://asrservices.ca" },
        { index: "02", title: "MasterTax", category: "Financial Services / Web Experience", url: "https://mastertax.ca" },
        { index: "03", title: "Rina Group", category: "Home Services / Digital Experience", url: "https://rinagroup.ca" },
        { index: "04", title: "CanaRoots", category: "Renovation / Conversion", url: "http://wordpress-1412553-5987634.cloudwaysapps.com/" },
        { index: "05", title: "Baltica Salon", category: "Beauty / Service Experience", url: "https://balticasalon.ca" },
        { index: "06", title: "Lost Connection Games", category: "Educational Product / Brand", url: "https://lostconnectiongames.com" },
        { index: "07", title: "CerKa Marketing", category: "Bilingual Growth / Brand", url: "https://cerkamarketing.com" },
        { index: "08", title: "Seed of Hope Miami", category: "Nonprofit / Community", url: "https://seedofhopemiami.org" },
      ],
    },
    lab: {
      eyebrow: "04 / AI & Product Lab",
      title: "Experiments for what comes next.",
      body: "Applied experiments in AI interfaces, data products and governed agentic systems. The lab turns emerging capability into something observable, testable and useful.",
      items: [
        { index: "L01", title: "Diaspora Heat Map", category: "Data Product / Geospatial Intelligence", description: "An exploratory interface for making diaspora concentration and community infrastructure legible through geography.", url: "https://diaspora-heat-map.netlify.app/" },
        { index: "L02", title: "AXOM", category: "AI-native Product R&D / Governed Agentic Systems", description: "A product and software ecosystem exploring how specialized AI agents, modern engineering and human approval can work together." },
        { index: "L03", title: "Reveal Studio", category: "Applied Consumer AI", description: "A compact AI-assisted product journey designed around visual confidence rather than technical AI language.", slug: "reveal-studio" },
      ],
    },
    capabilities: {
      eyebrow: "05 / Capabilities",
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
      eyebrow: "06 / About",
      title: "Built across disciplines. Operating across markets.",
      body: "Based in El Salvador and working across Canada, the United States and Latin America. My work connects product strategy, design, engineering and AI to turn business ideas into digital experiences people can understand, use and value.",
      denysoft: "Founder of Denysoft, a founder-led digital studio for business websites, ecommerce, branding, UX/UI and digital growth.",
      axom: "Building AXOM, an AI-native product and software ecosystem exploring governed agentic development and intelligent product engineering.",
    },
    contact: {
      eyebrow: "07 / Contact",
      title: ["Let’s build", "something", "valuable."],
      body: "Available for selected product, web and AI engagements.",
      cta: "Start a conversation",
    },
    footer: "Canada / United States / El Salvador",
  },
  es: {
    nav: { work: "Trabajo", practice: "Práctica", lab: "Lab", about: "Perfil", contact: "Contacto" },
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
      body: "Una práctica multidisciplinaria formada por pensamiento de producto, diseño de interfaces, ingeniería frontend, crecimiento y experimentación nativa de IA.",
    },
    work: {
      eyebrow: "02 / Trabajo Seleccionado",
      title: "Evidencia antes que promesas.",
      items: [
        { index: "001", title: "Reveal Studio", category: "Producto de IA / Beauty Tech", url: "https://virtual-hair-style.vercel.app/" },
        { index: "002", title: "Taller Express", category: "Producto / Servicio Automotriz", url: "https://tallerexpress.one" },
        { index: "003", title: "Villas de San Luis", category: "Real Estate / Experiencia de Crecimiento", url: "https://villasdesanluis.com/" },
      ],
    },
    archive: {
      eyebrow: "03 / Trabajo con Clientes",
      title: "Una trayectoria más amplia construyendo para negocios reales.",
      items: [
        { index: "01", title: "All Star Restoration", category: "Servicios / Generación de Demanda", url: "https://asrservices.ca" },
        { index: "02", title: "MasterTax", category: "Servicios Financieros / Experiencia Web", url: "https://mastertax.ca" },
        { index: "03", title: "Rina Group", category: "Servicios para el Hogar / Experiencia Digital", url: "https://rinagroup.ca" },
        { index: "04", title: "CanaRoots", category: "Renovación / Conversión", url: "http://wordpress-1412553-5987634.cloudwaysapps.com/" },
        { index: "05", title: "Baltica Salon", category: "Belleza / Experiencia de Servicio", url: "https://balticasalon.ca" },
        { index: "06", title: "Lost Connection Games", category: "Producto Educativo / Marca", url: "https://lostconnectiongames.com" },
        { index: "07", title: "CerKa Marketing", category: "Crecimiento Bilingüe / Marca", url: "https://cerkamarketing.com" },
        { index: "08", title: "Seed of Hope Miami", category: "Organización Social / Comunidad", url: "https://seedofhopemiami.org" },
      ],
    },
    lab: {
      eyebrow: "04 / AI & Product Lab",
      title: "Experimentos para lo que viene.",
      body: "Experimentos aplicados en interfaces de IA, productos de datos y sistemas agénticos gobernados. El laboratorio convierte capacidades emergentes en algo observable, evaluable y útil.",
      items: [
        { index: "L01", title: "Diaspora Heat Map", category: "Producto de Datos / Inteligencia Geoespacial", description: "Una interfaz exploratoria para hacer legibles mediante geografía la concentración de la diáspora y su infraestructura comunitaria.", url: "https://diaspora-heat-map.netlify.app/" },
        { index: "L02", title: "AXOM", category: "I+D de Producto Nativo de IA / Sistemas Agénticos Gobernados", description: "Un ecosistema de producto y software que explora cómo agentes especializados de IA, ingeniería moderna y aprobación humana pueden trabajar juntos." },
        { index: "L03", title: "Reveal Studio", category: "IA Aplicada al Consumidor", description: "Un recorrido compacto asistido por IA, diseñado alrededor de confianza visual en lugar de lenguaje técnico sobre IA.", slug: "reveal-studio" },
      ],
    },
    capabilities: {
      eyebrow: "05 / Capacidades",
      title: "Una práctica. Múltiples disciplinas.",
      groups: [
        ["Estrategia", "Estrategia de Producto", "Estrategia Digital", "Estrategia de Experiencia"],
        ["Diseño", "UX/UI", "Diseño de Interacción", "Sistemas de Diseño"],
        ["Ingeniería", "React", "Next.js", "TypeScript", "APIs"],
        ["Inteligencia", "Productos Nativos de IA", "Aplicaciones LLM", "Flujos Agénticos"],
        ["Crecimiento", "Conversión", "Recorridos de Cliente", "Ecommerce"],
      ],
    },
    about: {
      eyebrow: "06 / Perfil",
      title: "Construido entre disciplinas. Operando entre mercados.",
      body: "Opero desde El Salvador y trabajo con mercados en Canadá, Estados Unidos y Latinoamérica. Mi trabajo conecta estrategia de producto, diseño, ingeniería e IA para convertir ideas de negocio en experiencias digitales que las personas puedan entender, usar y valorar.",
      denysoft: "Fundador de Denysoft, un estudio digital independiente para sitios web empresariales, ecommerce, branding, UX/UI y crecimiento digital.",
      axom: "Construyendo AXOM, un ecosistema nativo de IA para producto y software que explora desarrollo agéntico gobernado e ingeniería de productos inteligentes.",
    },
    contact: {
      eyebrow: "07 / Contacto",
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
