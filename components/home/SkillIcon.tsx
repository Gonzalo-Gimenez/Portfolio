import type { ComponentType, SVGProps } from "react";
import SiAngular from "@icons-pack/react-simple-icons/icons/SiAngular";
import SiDocker from "@icons-pack/react-simple-icons/icons/SiDocker";
import SiDotnet from "@icons-pack/react-simple-icons/icons/SiDotnet";
import SiDuckdb from "@icons-pack/react-simple-icons/icons/SiDuckdb";
import SiFastapi from "@icons-pack/react-simple-icons/icons/SiFastapi";
import SiGit from "@icons-pack/react-simple-icons/icons/SiGit";
import SiMongodb from "@icons-pack/react-simple-icons/icons/SiMongodb";
import SiN8n from "@icons-pack/react-simple-icons/icons/SiN8n";
import SiNestjs from "@icons-pack/react-simple-icons/icons/SiNestjs";
import SiNextdotjs from "@icons-pack/react-simple-icons/icons/SiNextdotjs";
import SiNodedotjs from "@icons-pack/react-simple-icons/icons/SiNodedotjs";
import SiPandas from "@icons-pack/react-simple-icons/icons/SiPandas";
import SiPostgresql from "@icons-pack/react-simple-icons/icons/SiPostgresql";
import SiPython from "@icons-pack/react-simple-icons/icons/SiPython";
import SiReact from "@icons-pack/react-simple-icons/icons/SiReact";
import SiRedis from "@icons-pack/react-simple-icons/icons/SiRedis";
import SiThreedotjs from "@icons-pack/react-simple-icons/icons/SiThreedotjs";
import SiTypescript from "@icons-pack/react-simple-icons/icons/SiTypescript";
import {
  Brain,
  Broadcast,
  ChartBar,
  ChatTeardropText,
  Cloud,
  Cube,
  Database,
  DeviceMobile,
  FlowArrow,
  Graph,
  Lightning,
  Plugs,
} from "@phosphor-icons/react/dist/ssr";

type Glyph = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; color?: string }
>;

const ICONS: Record<string, Glyph> = {
  "integración de llms": Brain,
  "llm integration": Brain,
  "arquitecturas multi-agente": Graph,
  "multi-agent architectures": Graph,
  n8n: SiN8n,
  "prompt engineering": ChatTeardropText,
  python: SiPython,
  fastapi: SiFastapi,
  sql: Database,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  "power bi": ChartBar,
  pandas: SiPandas,
  etl: FlowArrow,
  "modelado de datos": Cube,
  "data modeling": Cube,
  typescript: SiTypescript,
  nestjs: SiNestjs,
  "node.js": SiNodedotjs,
  react: SiReact,
  angular: SiAngular,
  "next.js": SiNextdotjs,
  "next.js 15": SiNextdotjs,
  "react native": DeviceMobile,
  "c#": SiDotnet,
  redis: SiRedis,
  "apis rest": Plugs,
  docker: SiDocker,
  "docker compose": SiDocker,
  aws: Cloud,
  git: SiGit,
  groq: Lightning,
  "three.js": SiThreedotjs,
  duckdb: SiDuckdb,
  iot: Broadcast,
};

function lookupKey(name: string) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveIcon(name: string): Glyph | undefined {
  const key = lookupKey(name);
  if (ICONS[key]) return ICONS[key];
  const base = key.replace(/\s+\d+(\.\d+)*$/, "").trim();
  return ICONS[base];
}

export function SkillIcon({ name }: { name: string }) {
  const Icon = resolveIcon(name);
  if (!Icon) return null;
  return (
    <Icon
      size={16}
      color="currentColor"
      aria-hidden
      className="shrink-0 text-[var(--accent)]"
    />
  );
}

export function SkillChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)]">
      <SkillIcon name={name} />
      {name}
    </span>
  );
}
