export type Locale = "es" | "en";

export const LOCALE_COOKIE = "gg-locale";
export const DEFAULT_LOCALE: Locale = "es";

export function parseLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "es";
}

export const UI = {
  es: {
    navAria: "Secciones del sitio",
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      profile: "Perfil",
      skills: "Habilidades",
      contact: "Hablemos",
    },
    talk: "Hablemos",
    langAria: "Cambiar idioma",
    langEs: "ES",
    langEn: "EN",
    coverLabel: "Portfolio personal",
    galleryTitle: "Proyectos",
    galleryLoading: "Cargando galería",
    galleryPreparing: "Preparando galería",
    viewCase: "Ver caso",
    prevProject: "Proyecto anterior",
    nextProject: "Proyecto siguiente",
    profileTitle: "Perfil",
    aboutLead: "Producto, código y contexto real en la misma mesa.",
    aboutParagraphs: [
      "Entiendo el problema, diseño la experiencia y lo llevo a código. No construyo pantallas sueltas. Construyo sistemas alrededor de operaciones reales.",
      "Entrelazo negocio, mercado, datos e inteligencia. Combino ejecución técnica, criterio de producto y lectura del negocio. También hago automatizaciones que entran en el trabajo de todos los días.",
    ],
    education:
      "Tecnicatura Superior en Desarrollo de Software, IFTS 11. Cursando Licenciatura en Ciencia de Datos en la Universidad de la Ciudad de Buenos Aires.",
    languages: "Inglés intermedio",
    skillsTitle: "Habilidades",
    skillsLead:
      "Stack de software, datos e IA aplicada. Lo que uso para anclar respuestas a hechos, analizar y mover pipelines.",
    contactTitle: "Hablemos",
    contactLead:
      "Si buscás un AI Engineer, Data Analyst o Data Engineer, escribime.",
    contactName: "Nombre",
    contactNamePh: "Tu nombre",
    contactEmail: "Email",
    contactMessage: "Mensaje",
    contactMessagePh: "Contame en qué rol o proyecto estás pensando",
    contactSend: "Enviar",
    notRobot: "No soy un robot",
    notRobotAria: "Confirmá que no sos un robot",
    contactOpened:
      "Se abrió tu correo con el mensaje listo. Si no se abrió, tocá esa dirección.",
    mailSubject: "Consulta portfolio",
    mailName: "Nombre",
    caseBack: "Volver",
    caseWhy: "Por qué",
    caseHow: "Cómo está armado",
    caseShows: "Qué demuestra",
    caseStack: "Stack",
    caseSoon:
      "Este caso se suma al portfolio cuando el entregable esté listo. No hay demo ni métricas publicadas todavía.",
    caseLanding: "Landing",
    caseUpcoming: "Próximo",
    footerAria: "Pie de página",
    photoAlt: "Retrato de",
  },
  en: {
    navAria: "Site sections",
    nav: {
      home: "Home",
      projects: "Work",
      profile: "Profile",
      skills: "Skills",
      contact: "Let's talk",
    },
    talk: "Let's talk",
    langAria: "Switch language",
    langEs: "ES",
    langEn: "EN",
    coverLabel: "Personal portfolio",
    galleryTitle: "Work",
    galleryLoading: "Loading gallery",
    galleryPreparing: "Preparing gallery",
    viewCase: "View case",
    prevProject: "Previous project",
    nextProject: "Next project",
    profileTitle: "Profile",
    aboutLead: "Product, code, and real context on the same table.",
    aboutParagraphs: [
      "I understand the problem, design the experience, and ship it in code. I don't build disconnected screens. I build systems around real operations.",
      "I connect business, market, data, and intelligence. I combine technical execution, product judgment, and business reading. I also build automations that land in everyday work.",
    ],
    education:
      "Advanced technician in Software Development, IFTS 11. Studying a Bachelor's in Data Science at Universidad de la Ciudad de Buenos Aires.",
    languages: "Intermediate English",
    skillsTitle: "Skills",
    skillsLead:
      "Software, data, and applied AI. What I use to ground answers in facts, analyze, and move pipelines.",
    contactTitle: "Let's talk",
    contactLead:
      "If you are looking for an AI Engineer, Data Analyst, or Data Engineer, write me.",
    contactName: "Name",
    contactNamePh: "Your name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactMessagePh: "Tell me about the role or project you have in mind",
    contactSend: "Send",
    notRobot: "I'm not a robot",
    notRobotAria: "Confirm you are not a robot",
    contactOpened:
      "Your mail app opened with the message ready. If it did not, tap that address.",
    mailSubject: "Portfolio inquiry",
    mailName: "Name",
    caseBack: "Back",
    caseWhy: "Why",
    caseHow: "How it's built",
    caseShows: "What it shows",
    caseStack: "Stack",
    caseSoon:
      "This case joins the portfolio when the deliverable is ready. No demo or published metrics yet.",
    caseLanding: "Landing",
    caseUpcoming: "Coming soon",
    footerAria: "Footer",
    photoAlt: "Portrait of",
  },
} as const;

export type UiCopy = (typeof UI)[Locale];
