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
      approach: "The experience was shaped around a short journey: enter the studio, upload a portrait, explore a look, generate a preview, review the result and continue toward booking. The interface prioritizes confidence and visual feedback over technical AI language.",
      flow: ["Welcome", "Upload", "Choose look", "Generate", "Result", "Booking"],
      decisions: [
        { title: "Compress uncertainty into a short mobile flow", body: "The product is organized as six screen-level states, keeping each decision focused and progressive instead of exposing a complex tool all at once." },
        { title: "Treat trust as part of the interface", body: "The upload step combines capture guidance, preview validation and visible trust cues before the user continues." },
        { title: "Lead with visual feedback", body: "The experience centers the before-and-after result so the user evaluates the idea visually before thinking about the underlying AI." },
      ],
      highlights: ["Mobile-first product flow", "Before / after visualization", "Bilingual product experience", "AI-assisted styling journey", "Privacy and trust cues"],
      stack: ["Vite", "JavaScript", "AI product UX", "Responsive UI"],
      liveUrl: "https://virtual-hair-style.vercel.app/",
      media: "https://virtual-hair-style.vercel.app/assets/before-after-D7VHgyw4.png",
      gallery: [],
    },
    "taller-express": {
      title: "Taller Express",
      category: "Product / Automotive Service",
      year: "2026",
      statement: "Making car ownership easier to understand.",
      summary: "A Salvadoran automotive product concept built around practical maintenance information, price education, guides and demand capture.",
      challenge: "Car owners often reach a workshop without enough information to evaluate urgency, price or the questions they should ask. The experience needed to reduce uncertainty before the service interaction.",
      approach: "The public experience combines education, local context, trust-building content, a practical guide and subscription paths. Instead of starting with a service catalog, it starts with the questions vehicle owners actually have.",
      flow: ["Discover", "Learn", "Use the guide", "Subscribe"],
      decisions: [
        { title: "Start with questions, not a service catalog", body: "Content architecture begins with maintenance problems and practical owner concerns, helping people orient themselves before a workshop conversation." },
        { title: "Use education as trust infrastructure", body: "Articles and the guide create a pre-service layer where users can understand maintenance and cost context without committing to a transaction." },
        { title: "Keep conversion proportional", body: "Email subscription and lead-magnet routes capture intent without turning the educational experience into an aggressive sales funnel." },
      ],
      highlights: ["Local-first product positioning", "Automotive education system", "Practical maintenance guide", "Email demand capture", "Trust-oriented content architecture"],
      stack: ["Product strategy", "UX/UI", "Content architecture", "Lead capture"],
      liveUrl: "https://tallerexpress.one/",
      media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
      gallery: [],
    },
    "villas-de-san-luis": {
      title: "Villas de San Luis",
      category: "Real Estate / Growth Experience",
      year: "2026",
      statement: "Turning land inventory into an explorable digital product.",
      summary: "A real-estate sales experience for urban lots in Santa Ana Oeste, designed to make location, inventory, financing and buying pathways easier to understand for local and diaspora buyers.",
      challenge: "Selling land remotely requires more than a brochure. Buyers need to understand what is available, where it is, how financing works and what the next step looks like—especially when evaluating the project from outside El Salvador.",
      approach: "The experience combines aerial context, an interactive lot map, availability states, financing information, buyer education and dedicated pathways for people evaluating the project from abroad.",
      flow: ["Orient", "Explore lots", "Understand financing", "Contact"],
      decisions: [
        { title: "Turn inventory into interface", body: "The lot plan is treated as an explorable product surface rather than a static brochure image, making availability part of the buying experience." },
        { title: "Design for remote evaluation", body: "Maps, aerial context and project imagery help buyers understand place and inventory when they cannot visit the property first." },
        { title: "Keep handoff close to intent", body: "Financing information and WhatsApp-oriented contact paths sit near the points where a buyer is most likely to need clarification." },
      ],
      highlights: ["Interactive lot inventory", "Aerial and location storytelling", "Financing communication", "Diaspora buyer journey", "WhatsApp-oriented conversion"],
      stack: ["UX strategy", "Interactive SVG", "GSAP", "Conversion design"],
      liveUrl: "https://villasdesanluis.com/",
      media: "https://villasdesanluis.com/public/poster-video.jpg",
      gallery: [
        { src: "https://villasdesanluis.com/public/VQSL-map-stylish.jpg", alt: "Villas de San Luis location map" },
        { src: "https://villasdesanluis.com/public/VQSL-entorno.jpg", alt: "Villas de San Luis surrounding area" },
        { src: "https://villasdesanluis.com/public/Image-blueprint-02.png", alt: "Villas de San Luis lot blueprint" },
      ],
    },
  },
  es: {
    "reveal-studio": {
      title: "Reveal Studio",
      category: "Producto de IA / Beauty Tech",
      year: "2026",
      statement: "Pruébalo antes de la silla.",
      summary: "Una experiencia de peinado virtual asistida por IA para ayudar a clientes de salón a visualizar un nuevo look antes de su cita.",
      challenge: "Un corte de cabello es una decisión con mucha incertidumbre: las fotos de referencia rara vez muestran cómo se verá un estilo en la persona que debe decidir. El producto necesitaba hacer la experimentación simple, visual y de bajo riesgo desde el móvil.",
      approach: "La experiencia se estructura alrededor de un recorrido corto: entrar al estudio, subir un retrato, explorar un look, generar una visualización, revisar el resultado y continuar hacia la reserva. La interfaz prioriza confianza y retroalimentación visual sobre lenguaje técnico de IA.",
      flow: ["Inicio", "Subir foto", "Elegir look", "Generar", "Resultado", "Reservar"],
      decisions: [
        { title: "Reducir la incertidumbre a un flujo móvil corto", body: "El producto se organiza en seis estados de pantalla, manteniendo cada decisión enfocada y progresiva en lugar de presentar una herramienta compleja de una sola vez." },
        { title: "Tratar la confianza como parte de la interfaz", body: "El paso de carga combina orientación para la foto, validación de vista previa y señales visibles de confianza antes de continuar." },
        { title: "Priorizar la respuesta visual", body: "La experiencia coloca el antes y después en el centro para que la persona evalúe visualmente la idea antes de pensar en la tecnología de IA subyacente." },
      ],
      highlights: ["Flujo diseñado primero para móvil", "Visualización antes / después", "Experiencia bilingüe", "Recorrido asistido por IA", "Señales de privacidad y confianza"],
      stack: ["Vite", "JavaScript", "UX de Producto con IA", "Interfaz Responsive"],
      liveUrl: "https://virtual-hair-style.vercel.app/",
      media: "https://virtual-hair-style.vercel.app/assets/before-after-D7VHgyw4.png",
      gallery: [],
    },
    "taller-express": {
      title: "Taller Express",
      category: "Producto / Servicio Automotriz",
      year: "2026",
      statement: "Hacer más fácil entender la vida con tu carro.",
      summary: "Un concepto de producto automotriz salvadoreño construido alrededor de información práctica de mantenimiento, educación sobre costos, guías y captura de demanda.",
      challenge: "Muchos dueños llegan al taller sin suficiente información para evaluar urgencia, precio o qué deberían preguntar. La experiencia necesitaba reducir esa incertidumbre antes de la interacción de servicio.",
      approach: "La experiencia pública combina educación, contexto local, contenido orientado a confianza, una guía práctica y rutas de suscripción. En lugar de comenzar con un catálogo de servicios, comienza con las preguntas reales del dueño del vehículo.",
      flow: ["Descubrir", "Aprender", "Usar la guía", "Suscribirse"],
      decisions: [
        { title: "Comenzar con preguntas, no con un catálogo", body: "La arquitectura de contenido parte de problemas de mantenimiento y dudas prácticas del propietario, ayudándole a orientarse antes de hablar con un taller." },
        { title: "Usar educación como infraestructura de confianza", body: "Los artículos y la guía crean una capa previa al servicio donde la persona puede comprender mantenimiento y contexto de costos sin comprometerse a una transacción." },
        { title: "Mantener la conversión proporcional", body: "Las rutas de suscripción y recurso descargable capturan intención sin convertir la experiencia educativa en un embudo de venta agresivo." },
      ],
      highlights: ["Posicionamiento local", "Sistema de educación automotriz", "Guía práctica de mantenimiento", "Captura de demanda por email", "Arquitectura de contenido orientada a confianza"],
      stack: ["Estrategia de Producto", "UX/UI", "Arquitectura de Contenido", "Captura de Demanda"],
      liveUrl: "https://tallerexpress.one/",
      media: "https://tallerexpress.one/images/taller-express-hero-bg-mobilie-001.jpg",
      gallery: [],
    },
    "villas-de-san-luis": {
      title: "Villas de San Luis",
      category: "Real Estate / Experiencia de Crecimiento",
      year: "2026",
      statement: "Convertir inventario de tierra en un producto digital explorable.",
      summary: "Una experiencia comercial inmobiliaria para lotes urbanos en Santa Ana Oeste, diseñada para hacer más comprensibles la ubicación, el inventario, el financiamiento y el proceso de compra para compradores locales y de la diáspora.",
      challenge: "Vender tierra a distancia requiere más que un folleto. El comprador necesita comprender qué está disponible, dónde se encuentra, cómo funciona el financiamiento y cuál es el siguiente paso, especialmente cuando evalúa desde fuera de El Salvador.",
      approach: "La experiencia combina contexto aéreo, mapa interactivo de lotes, estados de disponibilidad, información financiera, educación del comprador y recorridos específicos para quienes evalúan el proyecto desde el exterior.",
      flow: ["Orientarse", "Explorar lotes", "Entender financiamiento", "Contactar"],
      decisions: [
        { title: "Convertir inventario en interfaz", body: "El plano de lotes se trata como una superficie explorable del producto y no como una imagen estática, haciendo que la disponibilidad sea parte de la experiencia de compra." },
        { title: "Diseñar para evaluación remota", body: "Mapas, contexto aéreo e imágenes del proyecto ayudan a comprender ubicación e inventario cuando la persona no puede visitar primero." },
        { title: "Mantener el contacto cerca de la intención", body: "La información de financiamiento y las rutas de contacto por WhatsApp aparecen cerca de los momentos donde el comprador probablemente necesita aclaraciones." },
      ],
      highlights: ["Inventario interactivo de lotes", "Narrativa aérea y de ubicación", "Comunicación de financiamiento", "Recorrido para compradores de la diáspora", "Conversión orientada a WhatsApp"],
      stack: ["Estrategia UX", "SVG Interactivo", "GSAP", "Diseño de Conversión"],
      liveUrl: "https://villasdesanluis.com/",
      media: "https://villasdesanluis.com/public/poster-video.jpg",
      gallery: [
        { src: "https://villasdesanluis.com/public/VQSL-map-stylish.jpg", alt: "Mapa de ubicación de Villas de San Luis" },
        { src: "https://villasdesanluis.com/public/VQSL-entorno.jpg", alt: "Entorno de Villas de San Luis" },
        { src: "https://villasdesanluis.com/public/Image-blueprint-02.png", alt: "Plano de lotes de Villas de San Luis" },
      ],
    },
  },
} as const;

export function getProject(locale: Locale, slug: string) {
  return projects[locale][slug as keyof (typeof projects)[typeof locale]] ?? null;
}

export function getProjectSlugs() {
  return ["reveal-studio", "taller-express", "villas-de-san-luis"] as const;
}
