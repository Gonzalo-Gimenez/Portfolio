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
    tagline: "IA aplicada a datos que se pueden auditar.",
    summary:
      "Aplicación propia: el modelo no afirma una cifra si no la obtuvo de una herramienta o de SQL.",
    why: "Un negocio que usa IA para decidir no puede convivir con números inventados. InsightAI existe para demostrar un flujo donde la respuesta queda anclada a consultas reales, no a la elocuencia del modelo.",
    architecture:
      "Workspace Nortec (~190k líneas, mar 2024–sep 2026): el copiloto en Groq invoca herramientas SQL (KPIs, series, rankings, mix) o un SELECT validado en PostgreSQL read-only. FastAPI devuelve respuesta + ViewSpec; el canvas (KPIs y gráficos 2D) se actualiza con cada pregunta. Next.js 15 + Recharts.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "Warehouse estrella retail con seed determinista y consultas agregadas en SQL.",
      "Copiloto con historial, SQL visible y canvas reactivo al chat.",
      "SELECT validado y rol read-only para consultas ad-hoc auditables.",
    ],
    coverPath: "/covers/cover-insightai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/InsightAI",
    demoUrl: "https://insightai-frontend.vercel.app",
  },
  {
    slug: "energia",
    title: "Energía",
    roleLabel: "Data Analyst",
    status: "shipped",
    tagline: "Consumo y costo, contados para quien opera el negocio.",
    summary:
      "Análisis exploratorio sobre datos públicos de energía: de la pregunta operativa a la métrica reproducible.",
    why: "En energía las decisiones se mueven por consumo, costo y desvío. El analista no 'hace un dashboard': traduce una pregunta de negocio a una cifra que se puede repetir, con supuestos escritos.",
    architecture:
      "CSV público de precios → DuckDB en el venv de Python (`pip install duckdb`) → SQL versionado por pregunta. Informe Power BI sobre el mismo CSV. Memo de una página. Postgres en Docker queda como warehouse opcional, no como el flujo diario.",
    stack: ["Python", "DuckDB", "SQL", "Power BI", "pandas"],
    highlights: [
      "Cinco preguntas de negocio con SQL en DuckDB y salida en output/.",
      "Informe Power BI con medidas DAX y PNG para el portfolio.",
      "Motor analítico instalado con pip; sin DBeaver ni tarjeta de Google.",
    ],
    coverPath: "/covers/cover-energia.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/Energy-Data",
  },
  {
    slug: "flota",
    title: "Flota",
    roleLabel: "Data Engineer",
    status: "shipped",
    tagline: "Telemetría que llega una vez, a tiempo, con contrato.",
    summary:
      "Pipeline de flota: ingesta, modelado y entrega para reporting, con reproceso y calidad mínima.",
    why: "Una operación de flota no se gestiona con Excel suelto. Si la telemetría duplica, llega tarde o cambia de forma, el reporte miente. El proyecto muestra el oficio de datos: contrato entre fuente y consumidor.",
    architecture:
      "CSV de movimientos y unidades → validación en Python → staging en PostgreSQL → SQL de hechos y vista `fleet_status_snapshot` por unidad/sucursal. Job idempotente (`run_pipeline.py`) listo para cron o Compose.",
    stack: ["Python", "PostgreSQL", "SQL", "Docker Compose"],
    highlights: [
      "Validación de enums y IDs duplicados; ejemplos de CSV rechazado en el repo.",
      "Job idempotente con conteos auditables y vista fleet_status_snapshot.",
      "Tests de integración contra PostgreSQL en Docker (puerto 5434).",
    ],
    coverPath: "/covers/cover-flota.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-Data",
  },
  {
    slug: "autostock-ai",
    title: "AutoStock-AI",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline: "Flota multi-agencia con costos que respetan la línea de negocio.",
    summary:
      "Landing, escritorio con copiloto y fichas por unidad: el 0km solo lleva seguro; renta y usados cargan el ledger que corresponde.",
    why:
      "AutoStock opera varias sucursales en CABA sobre la misma flota. No alcanza un pipeline DE: el negocio necesita cargar multas, patentes e ingresos de alquiler sin romper reglas por línea, y preguntar P&L en lenguaje natural con SQL visible.",
    architecture:
      "Postgres propio (:5436) con agencies, units y ledger. FastAPI valida cada POST según matriz 0km/usados/renta; Groq invoca kpis_flota, stock, mix de costos y SELECT read-only. Next.js: landing editorial oscura, /app con canvas Recharts y /app/unidades para operación.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "Reglas de ledger por línea: multa en 0km devuelve 400 en API y UI.",
      "Copiloto con tools de flota y canvas de stock y P&L por agencia.",
      "Warehouse separado de AutoStock-Data; extiende el dominio sin pisar el DE demo.",
    ],
    coverPath: "/covers/cover-autostock-ai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-AI",
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);
