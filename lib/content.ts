export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const content = {
  en: {
    nav: { work: "Work", axom: "AXOM", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "AI Product Engineer / Design Engineer",
      lines: ["I build", "intelligent", "digital products."],
      supporting: "Based in Canada. Operating from El Salvador and working across the United States and Latin America.",
      cta: "View selected work",
      secondary: "Discuss a project",
    },
    capabilityRail: [
      "Product Strategy",
      "Experience Design",
      "AI-Enabled Products",
      "Frontend Engineering",
      "Growth & Conversion",
    ],
    work: {
      eyebrow: "01 / Selected Work",
      title: "Selected work",
      items: [
        {
          index: "001",
          title: "Baltica Salon",
          category: "Brand / Website / Service Experience",
          location: "Toronto / Canada",
          summary: "A customer-facing digital presence for a Toronto salon, balancing premium service positioning with commercial clarity.",
          slug: "baltica-salon",
        },
        {
          index: "002",
          title: "Taller Express",
          category: "Product / Service Platform",
          location: "El Salvador / Multi-client",
          summary: "A digital automotive service concept designed around clearer requests, practical guidance and governed service operations.",
          slug: "taller-express",
          media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
        },
        {
          index: "003",
          title: "MasterTax",
          category: "Professional Services / Trust & Conversion",
          location: "Toronto / Canada",
          summary: "A professional-services web experience focused on making complex financial services easier to understand and act on.",
          slug: "mastertax",
        },
      ],
    },
    axom: {
      eyebrow: "02 / Building AXOM",
      title: "Building AXOM",
      body: "AXOM is a governed AI-native system for designing and delivering digital products. It separates capability from authority, keeps human approval explicit and treats evidence as part of the product-development process.",
      principles: ["Governed execution", "Human approval", "Model / provider flexibility", "Evidence-driven delivery"],
      productsEyebrow: "Products being built through AXOM",
      productsTitle: "Real products. Explicit status.",
      products: [
        {
          title: "TLBN",
          status: "PRIVATE PREVIEW",
          description: "A Toronto Latino business-network product being developed through AXOM with a future AI concierge direction.",
        },
        {
          title: "AI Academy",
          status: "IN DEVELOPMENT",
          description: "A guided GenAI learning product evolving through curriculum, platform and pilot evidence.",
        },
        {
          title: "AXOM Client Hub",
          status: "PILOT",
          description: "A minimal client collaboration surface being shaped by real AXOM project requirements rather than speculative feature expansion.",
        },
      ],
    },
    about: {
      eyebrow: "03 / About",
      title: "Across disciplines, toward products.",
      body: "My work connects product thinking, experience design, frontend engineering, AI and commercial strategy. The value is not the number of tools I know; it is being able to move from an ambiguous business problem toward a coherent digital product.",
      disciplines: ["Product Thinking", "Experience Design", "Engineering", "AI", "Commercial Thinking"],
    },
    contact: {
      eyebrow: "04 / Contact",
      title: "Have a product worth building?",
      body: "Available for selected product, web and AI engagements across Canada, the United States, El Salvador and Latin America.",
      email: "Email",
      whatsapp: "WhatsApp",
    },
    footer: "Canada / United States / El Salvador / Latin America",
  },
  es: {
    nav: { work: "Trabajo", axom: "AXOM", about: "Perfil", contact: "Contacto" },
    hero: {
      eyebrow: "AI Product Engineer / Design Engineer",
      lines: ["Construyo", "productos", "inteligentes."],
      supporting: "Basado en Canadá. Operando desde El Salvador y trabajando con mercados en Estados Unidos y Latinoamérica.",
      cta: "Ver trabajo seleccionado",
      secondary: "Hablemos de un proyecto",
    },
    capabilityRail: [
      "Estrategia de Producto",
      "Diseño de Experiencia",
      "Productos con IA",
      "Ingeniería Frontend",
      "Crecimiento & Conversión",
    ],
    work: {
      eyebrow: "01 / Trabajo Seleccionado",
      title: "Trabajo seleccionado",
      items: [
        {
          index: "001",
          title: "Baltica Salon",
          category: "Marca / Website / Experiencia de Servicio",
          location: "Toronto / Canadá",
          summary: "Una presencia digital orientada al cliente para un salón de Toronto, equilibrando posicionamiento premium y claridad comercial.",
          slug: "baltica-salon",
        },
        {
          index: "002",
          title: "Taller Express",
          category: "Producto / Plataforma de Servicio",
          location: "El Salvador / Multi-cliente",
          summary: "Un concepto digital automotriz diseñado alrededor de solicitudes más claras, orientación práctica y operaciones de servicio gobernadas.",
          slug: "taller-express",
          media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
        },
        {
          index: "003",
          title: "MasterTax",
          category: "Servicios Profesionales / Confianza & Conversión",
          location: "Toronto / Canadá",
          summary: "Una experiencia web de servicios profesionales enfocada en hacer más comprensibles y accionables servicios financieros complejos.",
          slug: "mastertax",
        },
      ],
    },
    axom: {
      eyebrow: "02 / Construyendo AXOM",
      title: "Construyendo AXOM",
      body: "AXOM es un sistema nativo de IA y gobernado para diseñar y entregar productos digitales. Separa capacidad de autoridad, mantiene explícita la aprobación humana y trata la evidencia como parte del proceso de desarrollo de producto.",
      principles: ["Ejecución gobernada", "Aprobación humana", "Flexibilidad de modelo / proveedor", "Entrega basada en evidencia"],
      productsEyebrow: "Productos construidos mediante AXOM",
      productsTitle: "Productos reales. Estado explícito.",
      products: [
        {
          title: "TLBN",
          status: "PRIVATE PREVIEW",
          description: "Un producto para la red empresarial latina de Toronto desarrollado mediante AXOM, con una futura dirección de AI Concierge.",
        },
        {
          title: "AI Academy",
          status: "EN DESARROLLO",
          description: "Un producto guiado de aprendizaje GenAI que evoluciona mediante currículo, plataforma y evidencia de piloto.",
        },
        {
          title: "AXOM Client Hub",
          status: "PILOTO",
          description: "Una superficie mínima de colaboración con clientes guiada por necesidades reales de proyectos AXOM y no por expansión especulativa de funciones.",
        },
      ],
    },
    about: {
      eyebrow: "03 / Perfil",
      title: "Entre disciplinas, hacia productos.",
      body: "Mi trabajo conecta pensamiento de producto, diseño de experiencia, ingeniería frontend, IA y estrategia comercial. El valor no está en cuántas herramientas conozco; está en poder mover un problema de negocio ambiguo hacia un producto digital coherente.",
      disciplines: ["Pensamiento de Producto", "Diseño de Experiencia", "Ingeniería", "IA", "Pensamiento Comercial"],
    },
    contact: {
      eyebrow: "04 / Contacto",
      title: "¿Tienes un producto que vale la pena construir?",
      body: "Disponible para proyectos seleccionados de producto, web e IA en Canadá, Estados Unidos, El Salvador y Latinoamérica.",
      email: "Email",
      whatsapp: "WhatsApp",
    },
    footer: "Canadá / Estados Unidos / El Salvador / Latinoamérica",
  },
} as const;

export function getContent(locale: Locale) {
  return content[locale];
}
