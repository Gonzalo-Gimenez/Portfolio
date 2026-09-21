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
