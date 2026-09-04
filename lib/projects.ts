import type { Locale } from "./content";

export const projectPresentation = {
  "https://virtual-hair-style.vercel.app/": {
    slug: "reveal-studio",
    media: "https://virtual-hair-style.vercel.app/assets/before-after-D7VHgyw4.png",
  },
  "https://tallerexpress.one": {
    slug: "taller-express",
    media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
  },
  "https://villasdesanluis.com/": {
    slug: "villas-de-san-luis",
    media: "https://villasdesanluis.com/public/poster-video.jpg",
  },
} as const;

export type ProjectSlug = (typeof projectPresentation)[keyof typeof projectPresentation]["slug"];

const projects = {
  en: {
    "reveal-studio": {
      title: "Reveal Studio",
      category: "AI Product / Beauty Tech",
      year: "2026",
      statement: "Try before the chair.",
      summary: "An AI-assisted virtual hairstyle experience designed to help salon clients visualize a new look before their appointment.",
      challenge: "A haircut is a high-friction decision: reference photos rarely show what a style will look like on the person making the decision. The product needed to make experimentation feel simple, visual and low-risk on mobile.",
      approach: "The experience was shaped around a short journey: enter the studio, upload a portrait, explore a look, generate a preview and continue toward the salon conversation. The interface prioritizes confidence and visual feedback over technical AI language.",
      highlights: ["Mobile-first product flow", "Before / after visualization", "Bilingual product experience", "AI-assisted styling journey", "Privacy and trust cues"],
      stack: ["Vite", "JavaScript", "AI product UX", "Responsive UI"],
      liveUrl: "https://virtual-hair-style.vercel.app/",
      media: "https://virtual-hair-style.vercel.app/assets/before-after-D7VHgyw4.png",
    },
    "taller-express": {
      title: "Taller Express",
      category: "Product / Automotive Service",
      year: "2026",
      statement: "Making car ownership easier to understand.",
      summary: "A Salvadoran automotive product concept built around practical maintenance information, trust, market-price education and conversational assistance through CARVIS.",
      challenge: "Car owners often reach a workshop without enough information to evaluate urgency, price or the questions they should ask. The experience needed to reduce uncertainty before the service interaction.",
      approach: "The public experience combines education, local context, trust-building content and a conversational entry point. Instead of starting with a service catalog, it starts with the questions vehicle owners actually have.",
      highlights: ["Local-first product positioning", "Automotive education system", "CARVIS conversational entry point", "Email demand capture", "Trust-oriented content architecture"],
      stack: ["Product strategy", "UX/UI", "Content system", "Conversational interface"],
      liveUrl: "https://tallerexpress.one/",
      media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
    },
    "villas-de-san-luis": {
      title: "Villas de San Luis",
      category: "Real Estate / Growth Experience",
      year: "2026",
      statement: "Turning land inventory into an explorable digital product.",
      summary: "A real-estate sales experience for urban lots in Santa Ana Oeste, designed to make location, inventory, financing and buying pathways easier to understand for local and diaspora buyers.",
      challenge: "Selling land remotely requires more than a brochure. Buyers need to understand what is available, where it is, how financing works and what the next step looks like—especially when evaluating the project from outside El Salvador.",
      approach: "The experience combines aerial context, an interactive lot map, availability states, financing information, buyer education and dedicated pathways for people evaluating the project from abroad.",
      highlights: ["Interactive lot inventory", "Aerial and location storytelling", "Financing communication", "Diaspora buyer journey", "WhatsApp-oriented conversion"],
      stack: ["UX strategy", "Interactive SVG", "GSAP", "Conversion design"],
      liveUrl: "https://villasdesanluis.com/",
      media: "https://villasdesanluis.com/public/poster-video.jpg",
    },
  },
  es: {
    "reveal-studio": {
      title: "Reveal Studio",
      category: "Producto IA / Beauty Tech",
      year: "2026",
      statement: "Pruébalo antes de la silla.",
      summary: "Una experiencia de peinado virtual asistida por IA para ayudar a clientes de salón a visualizar un nuevo look antes de su cita.",
      challenge: "Un corte de cabello es una decisión con mucha incertidumbre: las fotos de referencia rara vez muestran cómo se verá un estilo en la persona que debe decidir. El producto necesitaba hacer la experimentación simple, visual y de bajo riesgo desde el móvil.",
      approach: "La experiencia se estructura alrededor de un recorrido corto: entrar al estudio, subir un retrato, explorar un look, generar una visualización y continuar hacia la conversación con el salón. La interfaz prioriza confianza y feedback visual sobre lenguaje técnico de IA.",
      highlights: ["Flujo mobile-first", "Visualización antes / después", "Experiencia bilingüe", "Recorrido asistido por IA", "Señales de privacidad y confianza"],
      stack: ["Vite", "JavaScript", "AI product UX", "Responsive UI"],
      liveUrl: "https://virtual-hair-style.vercel.app/",
      media: "https://virtual-hair-style.vercel.app/assets/before-after-D7VHgyw4.png",
    },
    "taller-express": {
      title: "Taller Express",
      category: "Producto / Servicio Automotriz",
      year: "2026",
      statement: "Hacer más fácil entender la vida con tu carro.",
      summary: "Un concepto de producto automotriz salvadoreño construido alrededor de información práctica de mantenimiento, confianza, educación sobre precios y asistencia conversacional mediante CARVIS.",
      challenge: "Muchos dueños llegan al taller sin suficiente información para evaluar urgencia, precio o qué deberían preguntar. La experiencia necesitaba reducir esa incertidumbre antes de la interacción de servicio.",
      approach: "La experiencia pública combina educación, contexto local, contenido orientado a confianza y una entrada conversacional. En lugar de comenzar con un catálogo de servicios, comienza con las preguntas reales del dueño del vehículo.",
      highlights: ["Posicionamiento local-first", "Sistema de educación automotriz", "Entrada conversacional CARVIS", "Captura de demanda por email", "Arquitectura de contenido orientada a confianza"],
      stack: ["Product strategy", "UX/UI", "Content system", "Conversational interface"],
      liveUrl: "https://tallerexpress.one/",
      media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
    },
    "villas-de-san-luis": {
      title: "Villas de San Luis",
      category: "Real Estate / Growth Experience",
      year: "2026",
      statement: "Convertir inventario de tierra en un producto digital explorable.",
      summary: "Una experiencia comercial inmobiliaria para lotes urbanos en Santa Ana Oeste, diseñada para hacer más comprensibles la ubicación, el inventario, el financiamiento y el proceso de compra para compradores locales y de la diáspora.",
      challenge: "Vender tierra a distancia requiere más que un brochure. El comprador necesita comprender qué está disponible, dónde se encuentra, cómo funciona el financiamiento y cuál es el siguiente paso, especialmente cuando evalúa desde fuera de El Salvador.",
      approach: "La experiencia combina contexto aéreo, mapa interactivo de lotes, estados de disponibilidad, información financiera, educación del comprador y recorridos específicos para quienes evalúan el proyecto desde el exterior.",
      highlights: ["Inventario interactivo de lotes", "Storytelling aéreo y de ubicación", "Comunicación de financiamiento", "Buyer journey para diáspora", "Conversión orientada a WhatsApp"],
      stack: ["UX strategy", "Interactive SVG", "GSAP", "Conversion design"],
      liveUrl: "https://villasdesanluis.com/",
      media: "https://villasdesanluis.com/public/poster-video.jpg",
    },
  },
} as const;

export function getProject(locale: Locale, slug: string) {
  return projects[locale][slug as keyof (typeof projects)[typeof locale]] ?? null;
}

export function getProjectSlugs() {
  return ["reveal-studio", "taller-express", "villas-de-san-luis"] as const;
}
