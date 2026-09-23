export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai",
    title: "IA y automatización",
    items: [
      "Integración de LLMs",
      "Arquitecturas multi-agente",
      "n8n",
      "Prompt engineering",
      "Python",
      "FastAPI",
    ],
  },
  {
    id: "data",
    title: "Datos",
    items: [
      "SQL",
      "PostgreSQL",
      "DuckDB",
      "MongoDB",
      "Power BI",
      "pandas",
      "ETL",
      "Modelado de datos",
    ],
  },
  {
    id: "software",
    title: "Software",
    items: [
      "TypeScript",
      "NestJS",
      "Node.js",
      "React",
      "Angular",
      "Next.js",
      "React Native",
      "C#",
      "Redis",
      "APIs REST",
      "Docker",
      "AWS",
      "Git",
    ],
  },
];

export function skillGroups(locale: "es" | "en"): SkillGroup[] {
  if (locale !== "en") return SKILL_GROUPS;
  return [
    {
      id: "ai",
      title: "AI and automation",
      items: [
        "LLM integration",
        "Multi-agent architectures",
        "n8n",
        "Prompt engineering",
        "Python",
        "FastAPI",
      ],
    },
    {
      id: "data",
      title: "Data",
      items: [
        "SQL",
        "PostgreSQL",
        "DuckDB",
        "MongoDB",
        "Power BI",
        "pandas",
        "ETL",
        "Data modeling",
      ],
    },
    {
      id: "software",
      title: "Software",
      items: SKILL_GROUPS[2].items,
    },
  ];
}
