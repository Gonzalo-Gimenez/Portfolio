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
    tagline: "Copiloto analítico: el modelo no afirma una cifra si no la sacó de una herramienta o de SQL.",
    summary:
      "Workspace de BI conversacional sobre retail Nortec. Groq invoca tools; FastAPI devuelve texto + ViewSpec; el canvas se actualiza con cada pregunta.",
    why: "InsightAI es una app propia de análisis: el LLM no inventa ingresos ni rankings. Si hace falta un número, llama a una herramienta (KPIs, series, mix, ranking) o a un SELECT read-only validado contra PostgreSQL.",
    architecture:
      "Warehouse estrella Nortec (~190k líneas, mar 2024–sep 2026). Copiloto Groq + FastAPI: tools SQL y consultar_sql sobre vistas permitidas. La API arma un ViewSpec (KPIs y gráficos); Next.js 15 + Recharts pintan el canvas. El SQL usado queda visible en el chat.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "Seed determinista y consultas agregadas en SQL, no en el modelo.",
      "Historial de chat, SQL visible y canvas recortado al filtro de la pregunta (sede, año, período).",
      "SELECT de una sentencia, tablas permitidas y LIMIT; rol de lectura.",
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
    tagline: "De un CSV de precios públicos a métricas reproducibles de consumo y costo.",
    summary:
      "Análisis exploratorio: cinco preguntas de negocio en SQL (DuckDB) y el mismo recorte en Power BI.",
    why: "El caso muestra el oficio de analista: tomar precios de energía, plantear preguntas operativas (consumo, costo, desvío) y dejar la métrica versionada para que se pueda repetir, con supuestos escritos.",
    architecture:
      "CSV público → DuckDB en el venv de Python (`pip install duckdb`) → SQL por pregunta en el repo. Informe Power BI sobre el mismo CSV (medidas DAX). Postgres en Docker queda como warehouse opcional, no como el flujo diario.",
    stack: ["Python", "DuckDB", "SQL", "Power BI", "pandas"],
    highlights: [
      "Cinco preguntas de negocio con SQL en DuckDB y salida en output/.",
      "Informe Power BI alineado al mismo recorte, con PNG para el portfolio.",
      "Motor analítico instalado con pip; sin depender de un cliente SQL de escritorio.",
    ],
    coverPath: "/covers/cover-energia.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/Energy-Data",
  },
  {
    slug: "flota",
    title: "Flota",
    roleLabel: "Data Engineer",
    status: "shipped",
    tagline: "Pipeline de telemetría: ingesta, contrato de datos y snapshot para reporting.",
    summary:
      "Job idempotente CSV → staging PostgreSQL → hechos y vista fleet_status_snapshot por unidad y sucursal.",
    why: "Es el oficio DE sobre flota: validar movimientos y unidades, rechazar duplicados y enums inválidos, y entregar un estado por unidad que reporting puede consumir sin pelearse con el Excel.",
    architecture:
      "CSV de movimientos y unidades → validación en Python → staging en PostgreSQL → SQL de hechos y vista `fleet_status_snapshot`. Job `run_pipeline.py` (idempotente) listo para cron o Compose. Tests de integración contra Postgres en Docker (puerto 5434).",
    stack: ["Python", "PostgreSQL", "SQL", "Docker Compose"],
    highlights: [
      "Validación de enums e IDs duplicados; ejemplos de CSV rechazado en el repo.",
      "Job idempotente con conteos auditables y vista fleet_status_snapshot.",
      "Capa de datos de AutoStock (AutoStock-Data); no es el producto de gestión.",
    ],
    coverPath: "/covers/cover-flota.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-Data",
  },
  {
    slug: "autostock-ai",
    title: "AutoStock",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline: "Gestor de agencias y flota: stock, costos y P&L por unidad, con copiloto.",
    summary:
      "Producto interno multi-sucursal: landing, escritorio conversacional y fichas para cargar costos según la línea de negocio.",
    why: "AutoStock es el sistema con el que se gerencian agencias y la flota (0 km, usados, renta particular y apps). No es el pipeline DE: es la app de operación — consultar stock y margen, y registrar movimientos de cada vehículo con reglas por línea.",
    architecture:
      "Postgres propio (agencies, units, ledger). FastAPI: CRUD de costos con matriz 0km/usados/renta (un 0 km no admite multa ni mantenimiento) y copiloto Groq (kpis_flota, stock, mix, P&L, SELECT read-only). Next.js: landing, /app con canvas Recharts y /app/unidades para la ficha.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "Recharts",
    ],
    highlights: [
      "Tres agencias, ~130 unidades seed; ledger con tipos acotados por línea.",
      "POST de multa a un 0 km → 400; usados y rentas aceptan multa, patente y mantenimiento.",
      "Chat anclado a tools: P&L por agencia mueve el canvas y deja el SQL a la vista.",
    ],
    coverPath: "/covers/cover-autostock-ai.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-AI",
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);
