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
      "El usuario pregunta en lenguaje natural. Groq llama herramientas. FastAPI ejecuta SQL sobre PostgreSQL y devuelve hechos. El front en Next.js 15 muestra la exploración, con three.js cuando hace falta ver el dato en espacio. Capa de tools para acotar qué puede afirmar el LLM.",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Groq (tool calling)",
      "Next.js 15",
      "three.js",
    ],
    highlights: [
      "Preguntas en lenguaje natural con respuestas ancladas a consultas reales.",
      "Tool calling para acotar qué puede afirmar el LLM.",
      "UI de exploración con gráficos y escena 3D en el cliente.",
    ],
    coverPath: "/covers/cover-insightai.png",
  },
  {
    slug: "energia",
    title: "Energía",
    roleLabel: "Data Analyst",
    status: "proximo",
    tagline: "Consumo y costo, contados para quien opera el negocio.",
    summary:
      "Análisis exploratorio sobre datos públicos de energía: de la pregunta operativa a la métrica reproducible.",
    why: "En energía las decisiones se mueven por consumo, costo y desvío. El analista no 'hace un dashboard': traduce una pregunta de negocio a una cifra que se puede repetir, con supuestos escritos.",
    architecture:
      "Python y pandas para explorar. SQL para la tabla de verdad. Visualización para que un no técnico lea la historia. Documentación de límites del dataset. Todavía no hay deploy: el caso se suma cuando el entregable esté listo.",
    stack: ["Python", "pandas", "SQL", "visualización"],
    highlights: [
      "Preguntas de negocio traducidas a métricas reproducibles.",
      "Tableros y reportes pensados para no técnicos.",
      "Documentación de supuestos y límites de los datos.",
    ],
    coverPath: "/covers/cover-energia.png",
  },
  {
    slug: "flota",
    title: "Flota",
    roleLabel: "Data Engineer",
    status: "proximo",
    tagline: "Telemetría que llega una vez, a tiempo, con contrato.",
    summary:
      "Pipeline de flota: ingesta, modelado y entrega para reporting, con reproceso y calidad mínima.",
    why: "Una operación de flota no se gestiona con Excel suelto. Si la telemetría duplica, llega tarde o cambia de forma, el reporte miente. El proyecto muestra el oficio de datos: contrato entre fuente y consumidor.",
    architecture:
      "Ingesta hacia almacenamiento en capas. Orquestación de jobs idempotentes y ventanas de reproceso. SQL como contrato. Calidad verificable antes de publicar datasets. Todavía en construcción.",
    stack: ["Python", "SQL", "orquestación", "almacenamiento en capas"],
    highlights: [
      "Contratos de datos entre fuentes y consumidores.",
      "Jobs idempotentes y ventanas de reproceso.",
      "Calidad mínima verificable antes de publicar datasets.",
    ],
    coverPath: "/covers/cover-flota.png",
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export const WORK_SLUGS: WorkSlug[] = WORKS.map((w) => w.slug);
