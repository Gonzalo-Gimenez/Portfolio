export type WorkSlug = "insightai" | "energia" | "flota";

export type WorkStatus = "shipped" | "proximo";

export type WorkItem = {
  slug: WorkSlug;
  title: string;
  roleLabel: string;
  status: WorkStatus;
  tagline: string;
  summary: string;
  stack: string[];
  highlights: string[];
  demoUrl?: string;
  repoUrl?: string;
};

export const WORKS: WorkItem[] = [
  {
    slug: "insightai",
    title: "InsightAI",
    roleLabel: "AI Engineer",
    status: "shipped",
    tagline: "Asistente de datos con herramientas y números verificados.",
    summary:
      "Aplicación propia que combina un backend FastAPI con PostgreSQL, tool calling vía Groq y un front en Next.js 15 con visualizaciones three.js. El modelo consulta herramientas y SQL antes de responder: no inventa cifras.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "three.js",
    ],
    highlights: [
      "Flujo de preguntas en lenguaje natural con respuestas ancladas a consultas reales.",
      "Capa de herramientas para acotar qué puede afirmar el LLM.",
      "UI de exploración con gráficos y escena 3D en el cliente.",
    ],
  },
  {
    slug: "energia",
    title: "Energía",
    roleLabel: "Data Analyst",
    status: "proximo",
    tagline: "Próximo: análisis de consumo y costos con historias claras para negocio.",
    summary:
      "Proyecto en diseño para demostrar análisis exploratorio, métricas de consumo energético y narrativa visual para decisiones operativas. Aún no está desplegado.",
    stack: ["Python", "pandas", "SQL", "visualización"],
    highlights: [
      "Preguntas de negocio traducidas a métricas reproducibles.",
      "Tableros y reportes pensados para no técnicos.",
      "Documentación de supuestos y límites de los datos.",
    ],
  },
  {
    slug: "flota",
    title: "Flota",
    roleLabel: "Data Engineer",
    status: "proximo",
    tagline: "Próximo: pipelines confiables para telemetría y reporting de flota.",
    summary:
      "Proyecto planificado para mostrar ingesta, modelado y entrega de datos de flota con pruebas y observabilidad básica. Todavía en construcción.",
    stack: ["Python", "SQL", "orquestación", "almacenamiento en capas"],
    highlights: [
      "Contratos de datos entre fuentes y consumidores.",
      "Jobs idempotentes y ventanas de reproceso.",
      "Calidad mínima verificable antes de publicar datasets.",
    ],
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);
