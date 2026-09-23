import { WORKS_EN } from "@/lib/projects-en";

export type WorkSlug =
  | "insightai"
  | "energia"
  | "flota"
  | "autostock-ai"
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
      "Plataforma de gestión con un chatbot de inteligencia artificial: consulta las bases del sistema y muestra las gráficas de lo que le pedís.",
    summary:
      "Plataforma analítica: el agente de IA responde con datos de PostgreSQL y actualiza KPIs y gráficos según la pregunta.",
    why: "InsightAI es una plataforma de gestión con un chatbot de inteligencia artificial. El agente no inventa cifras: consulta las bases de datos del sistema (warehouse Nortec) y, en el mismo escritorio, muestra las gráficas específicas de lo que le consultaste — ingresos, mix, ranking o el recorte de una sede.",
    architecture:
      "Retail Nortec en PostgreSQL (~190k líneas). FastAPI + Groq: el agente de inteligencia artificial invoca herramientas SQL o un SELECT read-only validado. La API arma un ViewSpec; Next.js 15 y Recharts pintan el canvas. El SQL usado queda visible en el chat.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "Chatbot de IA anclado a las bases: KPIs, series, mix, ranking o SQL de lectura.",
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
    why: "AutoStock es la plataforma con la que se gestionan agencias y la flota (0 km, usados, renta y apps). El agente de inteligencia artificial consulta las bases del sistema; en paralelo, cada unidad tiene ficha para registrar costos con reglas por línea.",
    architecture:
      "Postgres (agencies, units, ledger). FastAPI: CRUD de costos con matriz 0km/usados/renta y agente Groq (kpis_flota, stock, mix, P&L, SELECT read-only). Next.js: landing, /app con canvas Recharts y /app/unidades.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "Tres agencias, ~130 unidades; ledger acotado por línea de negocio.",
      "Multa en un 0 km → 400; usados y rentas aceptan multa, patente y mantenimiento.",
      "El agente mueve el canvas (gráficas de lo consultado) y deja el SQL a la vista.",
    ],
    coverPath: "/covers/cover-autostock-ai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-AI",
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
    why: "Agroblock es un ecosistema agtech de ganado. El collar IoT sale al campo; la plataforma concentra trazabilidad, alertas y la operación del rodeo. La landing del producto está en www.agroblock.com.ar.",
    architecture:
      "Collar IoT en el animal, telemetría hacia la plataforma y pantallas para el productor. Las alertas salen del dato del collar: automatizaciones que entran en el día a día del establecimiento. El front público de la landing se ve en www.agroblock.com.ar.",
    stack: ["IoT", "Next.js", "Node.js", "PostgreSQL"],
    highlights: [
      "Collar IoT como fuente de verdad del animal en el campo.",
      "Automatizaciones de alerta sobre el rodeo, a partir del collar.",
      "Ecosistema de punta a punta: hardware en el animal y software en el establecimiento.",
    ],
    coverPath: "/covers/cover-agroblock.png",
    siteUrl: "https://www.agroblock.com.ar",
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
