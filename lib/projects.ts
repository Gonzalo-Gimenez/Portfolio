import { WORKS_EN } from "@/lib/projects-en";

export type WorkSlug =
  | "insightai"
  | "energia"
  | "flota"
  | "autostock-ai"
  | "chatbot-ai"
  | "trading-agents"
  | "agroblock"
  | "perkis"
  | "cinemaland";

export type WorkStatus = "shipped" | "proximo";

export type WorkItem = {
  slug: WorkSlug;
  title: string;
  roleLabel: string;
  status: WorkStatus;
  tagline: string;
  summary: string;
  why: string;
  architecture: string;
  stack: string[];
  highlights: string[];
  coverPath: string;
  demoUrl?: string;
  repoUrl?: string;
  siteUrl?: string;
};

export const WORKS: WorkItem[] = [
  {
    slug: "insightai",
    title: "InsightAI",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline:
      "Plataforma de gestión con chatbot RAG: recupera del warehouse y muestra las gráficas de lo que le pedís.",
    summary:
      "Plataforma analítica: RAG sobre PostgreSQL — el agente recupera datos y actualiza KPIs y gráficos según la pregunta.",
    why: "InsightAI es una plataforma de gestión con un chatbot de inteligencia artificial. El agente no inventa cifras: primero recupera del warehouse Nortec (RAG con tools SQL) y después responde; en el mismo escritorio muestra las gráficas del recorte — ingresos, mix, ranking o una sede.",
    architecture:
      "Retail Nortec en PostgreSQL (~190k líneas). FastAPI + Groq: flujo RAG retrieve-then-generate — herramientas SQL o SELECT read-only validado, contexto al LLM, respuesta anclada. La API arma un ViewSpec; Next.js 15 y Recharts pintan el canvas. El SQL usado queda visible en el chat.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "RAG",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "RAG sobre el warehouse: recupera KPIs, series, mix, ranking o SQL de lectura antes de responder.",
      "Las gráficas se recortan al filtro de la pregunta (sede, año, período).",
      "SELECT de una sentencia, tablas permitidas y LIMIT.",
    ],
    coverPath: "/covers/cover-insightai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/InsightAI",
    demoUrl: "https://insightai-frontend.vercel.app",
  },
  {
    slug: "energia",
    title: "Data Analyst: Empresa petrolera",
    roleLabel: "Data Analyst",
    status: "shipped",
    tagline:
      "Proyecto de Data Analyst sobre una empresa petrolera: de precios públicos a métricas de consumo y costo.",
    summary:
      "Caso de analista: cinco preguntas de negocio en SQL (DuckDB) y el mismo recorte en Power BI.",
    why: "Es un proyecto de Data Analyst planteado sobre una empresa petrolera. El trabajo es el de analista: tomar precios, armar preguntas de consumo, costo y desvío, y dejar métricas que se puedan repetir, con supuestos escritos.",
    architecture:
      "CSV público de precios → DuckDB en Python → SQL versionado por pregunta. Informe Power BI sobre el mismo CSV (medidas DAX). Postgres en Docker queda como warehouse opcional, no como el flujo diario.",
    stack: ["Python", "DuckDB", "SQL", "Power BI", "pandas"],
    highlights: [
      "Cinco preguntas de negocio con SQL en DuckDB y salida en output/.",
      "Informe Power BI alineado al mismo recorte, con PNG para el portfolio.",
      "Motor analítico con pip; sin cliente SQL de escritorio.",
    ],
    coverPath: "/covers/cover-energia.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/Energy-Data",
  },
  {
    slug: "flota",
    title: "Data Engineer: Flota vehicular",
    roleLabel: "Data Engineer",
    status: "shipped",
    tagline:
      "Proyecto de Data Engineer sobre una flota de gestión vehicular: ingesta, contrato de datos y snapshot para reporting.",
    summary:
      "Pipeline: CSV → staging PostgreSQL → hechos y vista fleet_status_snapshot por unidad y sucursal.",
    why: "Es un proyecto de Data Engineer sobre una flota de gestión vehicular. El oficio es el de ingeniería de datos: validar movimientos y unidades, rechazar duplicados y enums inválidos, y entregar un estado por vehículo que reporting pueda consumir.",
    architecture:
      "CSV de movimientos y unidades → validación en Python → staging en PostgreSQL → SQL de hechos y vista `fleet_status_snapshot`. Automatización: job `run_pipeline.py` (idempotente) para cron o Compose. Tests de integración contra Postgres en Docker (puerto 5434).",
    stack: ["Python", "PostgreSQL", "SQL", "Docker Compose"],
    highlights: [
      "Validación de enums e IDs duplicados; CSV rechazado de ejemplo en el repo.",
      "Automatización del pipeline: job idempotente para cron o Compose, con conteos auditables.",
      "Capa de datos (AutoStock-Data); no es la plataforma de gestión AutoStock.",
    ],
    coverPath: "/covers/cover-flota.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-Data",
  },
  {
    slug: "autostock-ai",
    title: "AutoStock",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline:
      "Plataforma de gestión de agencias y flota de vehículos, con un agente de inteligencia artificial para consultar stock y P&L.",
    summary:
      "Plataforma multi-sucursal: landing, escritorio con agente de IA y fichas para cargar costos según la línea de negocio.",
    why: "AutoStock es la plataforma con la que se gestionan agencias y la flota (0 km, usados, renta y apps). El agente RAG recupera del ledger y stock antes de responder; en paralelo, cada unidad tiene ficha para registrar costos con reglas por línea.",
    architecture:
      "Postgres (agencies, units, ledger). FastAPI: CRUD de costos y agente Groq con RAG retrieve-then-generate (kpis_flota, stock, mix, P&L, SELECT read-only). Next.js: landing, /app con canvas Recharts y /app/unidades.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "RAG",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "RAG sobre stock y P&L: el agente recupera antes de contestar.",
      "Tres agencias, ~130 unidades; ledger acotado por línea de negocio.",
      "El agente mueve el canvas (gráficas de lo consultado) y deja el SQL a la vista.",
    ],
    coverPath: "/covers/cover-autostock-ai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-AI",
  },
  {
    slug: "chatbot-ai",
    title: "Agente de Llamadas",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline:
      "IA conversacional telefónica: el agente llama o atiende, recupera FAQs (RAG) y responde en tiempo real.",
    summary:
      "FastAPI + Twilio Voice, dashboard de KPIs y router de motores (Groq, OpenAI, Gemini) con trazabilidad por llamada.",
    why: "Un agente que automatiza el contacto por voz sin inventar políticas: antes de cada respuesta recupera fragmentos de la base de conocimiento (RAG) y conversa en frases cortas aptas para teléfono. El dashboard muestra contactos, llamadas, contestadas, conversión y qué motor de IA usó cada llamada.",
    architecture:
      "Postgres (contacts, calls, utterances, kb_chunks). FastAPI: webhooks Twilio Gather o modo DEV_MOCK; flujo retrieve-then-generate con ranking léxico sobre la KB; interfaz LLMProvider y router por llamada o env. Next.js 15: KPIs, llamadas por día y estados.",
    stack: [
      "Python",
      "FastAPI",
      "Twilio",
      "RAG",
      "Groq",
      "OpenAI",
      "Gemini",
      "Next.js 15",
      "PostgreSQL",
    ],
    highlights: [
      "RAG en cada turno de voz: contexto desde kb_chunks antes del LLM.",
      "Varios motores con Groq por defecto; keys opcionales para OpenAI y Gemini.",
      "Dashboard oscuro con KPIs, serie diaria y motor/modelo por llamada.",
    ],
    coverPath: "/covers/cover-chatbot-ai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/Chatbot-AI",
  },
  {
    slug: "trading-agents",
    title: "TradingAgents",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline:
      "Forex por probabilidad: conteo de cajas, libro entre pares, Groq narra contexto y Kev calibra la decisión.",
    summary:
      "Agente MT4 paper/demo: cambios MN→D1, gestión D3–D6, MAL y cobertura entre majors; dashboard Auto / Confirmar / Manual.",
    why: "La operativa no es un hedge de banco: es contar cambios de caja, esperar retrocesos en zona de 15–20 pips y gestionar un libro EUR-like vs USD-fuerte para empatar o recuperar con 3R. Groq explica el estado estructurado; Kev devuelve probabilidades tipadas antes de disparar.",
    architecture:
      "FastAPI: features de cajas/fractales/psicológicos, book multi-par, política de ladder y canasta. Groq (texto) + Kev `POST /v1/systemone`. Postgres journal. Next.js: KPIs, cola de propuestas y modos de ejecución. EA MQL4 WebRequest.",
    stack: [
      "Python",
      "FastAPI",
      "Groq",
      "Kev",
      "MT4",
      "PostgreSQL",
      "Next.js 15",
    ],
    highlights: [
      "Conteo de cambios y fases MAL; sin inventar el gráfico — estado estructurado.",
      "Book correlacionado/inverso: expandir si ganás, cubrir solo en drawdown.",
      "Auto, Confirmar o Manual; fine-tune Kev desde el diario JSONL.",
    ],
    coverPath: "/covers/cover-trading-agents.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/TradingAgents-AI",
  },
  {
    slug: "agroblock",
    title: "Agroblock",
    roleLabel: "AgTech",
    status: "shipped",
    tagline:
      "Ecosistema agtech de ganado: collares IoT, trazabilidad y gestión del rodeo en el campo.",
    summary:
      "Plataforma para seguir el ganado con collar IoT: ubicación, estado y operación del establecimiento.",
    why: "Agroblock es un ecosistema agtech de ganado. El collar IoT sale al campo; la plataforma concentra trazabilidad, alertas y la operación del rodeo.",
    architecture:
      "Collar IoT en el animal, telemetría hacia la plataforma y pantallas para el productor. Las alertas salen del dato del collar: automatizaciones que entran en el día a día del establecimiento.",
    stack: ["IoT", "Next.js", "Node.js", "PostgreSQL"],
    highlights: [
      "Collar IoT como fuente de verdad del animal en el campo.",
      "Automatizaciones de alerta sobre el rodeo, a partir del collar.",
      "Ecosistema de punta a punta: hardware en el animal y software en el establecimiento.",
    ],
    coverPath: "/covers/cover-agroblock.png",
    siteUrl: "https://agroblock.com.ar",
  },
  {
    slug: "perkis",
    title: "Perkis",
    roleLabel: "Mobile",
    status: "shipped",
    tagline:
      "Aplicación mobile Perkis: producto nativo para usar en el teléfono, de punta a punta.",
    summary:
      "App mobile (React Native) pensada para el uso diario en el celular.",
    why: "Perkis es una aplicación mobile. El caso muestra el producto en el teléfono: flujos, pantallas y el ciclo de una app nativa.",
    architecture:
      "Cliente mobile con React Native. El backend queda del lado del producto; acá se presenta la app y su alcance en el celular.",
    stack: ["React Native", "TypeScript", "APIs REST"],
    highlights: [
      "Producto mobile, no un mock de landing.",
      "Flujos pensados para uso con una mano en el teléfono.",
      "Pantallas y ciclo de una app que se usa todos los días.",
    ],
    coverPath: "/covers/cover-perkis.png",
  },
  {
    slug: "cinemaland",
    title: "Cinemaland",
    roleLabel: "Full stack",
    status: "shipped",
    tagline:
      "Plataforma de cine: frontend y backend para cartelera, funciones y la operación de la sala.",
    summary:
      "Frontend y backend de Cinemaland: cartelera, funciones y la lógica de una plataforma de cine.",
    why: "Cinemaland es una plataforma de cine con frontend y backend. El caso cubre cartelera, funciones y la API que las sostiene.",
    architecture:
      "Frontend de cartelera y flujo de usuario; backend con API REST para películas, funciones y la operación de la sala.",
    stack: ["Angular", "Node.js", "APIs REST", "PostgreSQL"],
    highlights: [
      "Frontend y backend del mismo producto.",
      "Cartelera y funciones como dominio, no un CRUD genérico.",
      "API REST para películas, horarios y la operación de la sala.",
    ],
    coverPath: "/covers/cover-cinemaland.png",
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);

export function localizeWork(
  work: WorkItem,
  locale: "es" | "en",
): WorkItem {
  if (locale !== "en") return work;
  const en = WORKS_EN[work.slug];
  return {
    ...work,
    title: en.title ?? work.title,
    roleLabel: en.roleLabel ?? work.roleLabel,
    tagline: en.tagline,
    summary: en.summary,
    why: en.why,
    architecture: en.architecture,
    highlights: [...en.highlights],
  };
}
