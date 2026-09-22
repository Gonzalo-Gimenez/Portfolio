export type WorkSlug = "insightai" | "energia" | "flota" | "autostock-ai";

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
      "CSV de movimientos y unidades → validación en Python → staging en PostgreSQL → SQL de hechos y vista `fleet_status_snapshot`. Job `run_pipeline.py` (idempotente) para cron o Compose. Tests de integración contra Postgres en Docker (puerto 5434).",
    stack: ["Python", "PostgreSQL", "SQL", "Docker Compose"],
    highlights: [
      "Validación de enums e IDs duplicados; CSV rechazado de ejemplo en el repo.",
      "Job idempotente con conteos auditables y vista fleet_status_snapshot.",
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
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);
