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
      "El usuario pregunta en lenguaje natural. Groq invoca herramientas Python sobre datos leídos con SQL fijo en PostgreSQL. FastAPI orquesta; el LLM resume hechos, no inventa cifras. Front en Next.js 15 con métricas y escena three.js.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "three.js",
    ],
    highlights: [
      "Preguntas en lenguaje natural con respuestas ancladas a métricas computadas.",
      "Tool calling para acotar qué puede afirmar el LLM.",
      "UI de exploración con gráficos y escena 3D en el cliente.",
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
      "CSV público de precios de combustible → DuckDB como almacén analítico local. SQL versionado por pregunta de negocio. Memo de una página con límites del dataset. Sin LLM en el MVP.",
    stack: ["Python", "DuckDB", "SQL", "pandas"],
    highlights: [
      "Cinco preguntas de negocio con SQL reproducible.",
      "Memo de analista con límites explícitos del dataset público.",
      "Scripts de ingestión para reemplazar el CSV demo por datos.gob.ar.",
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
      "CSV de movimientos y unidades → validación en Python → staging en PostgreSQL → SQL de hechos y snapshot de estado por unidad. Job idempotente (`run_pipeline.py`) listo para cron o Compose.",
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
