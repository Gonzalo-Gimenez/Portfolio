export type WorkSlug = "insightai" | "energia" | "flota";

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
      "CSV público de precios (fuente en GitHub) → warehouse PostgreSQL local con Docker (`fuel_prices`, puerto 5435). SQL versionado por pregunta de negocio. Informe Power BI (PBIP) sobre el mismo CSV. Memo de una página con límites del dataset. Sin LLM ni nube de pago.",
    stack: ["Python", "PostgreSQL", "SQL", "Power BI", "pandas", "Docker Compose"],
    highlights: [
      "Cinco preguntas de negocio con SQL sobre el warehouse y salida en output/.",
      "Informe Power BI con medidas DAX y PNG para el portfolio.",
      "Demo reproducible: docker compose up y la tabla queda lista.",
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
      "Validación de enums y IDs duplicados antes de cargar.",
      "Capas staging y marts con SQL explícito.",
      "Tests de calidad sobre reglas de negocio del dominio flota.",
    ],
    coverPath: "/covers/cover-flota.png",
    repoUrl: "https://github.com/Gonzalo-Gimenez/AutoStock-Data",
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);
