import type { WorkSlug } from "@/lib/projects";

export type WorkCopy = {
  title?: string;
  roleLabel?: string;
  tagline: string;
  summary: string;
  why: string;
  architecture: string;
  highlights: readonly string[];
};

export const WORKS_EN: Record<WorkSlug, WorkCopy> = {
  insightai: {
    tagline:
      "Operations platform with an AI chatbot: it queries the system databases and shows charts for what you ask.",
    summary:
      "Analytics platform: the AI agent answers from PostgreSQL and updates KPIs and charts from the question.",
    why: "InsightAI is an operations platform with an AI chatbot. The agent does not invent figures: it queries the system databases (Nortec warehouse) and, on the same desk, shows the specific charts for what you asked: revenue, mix, ranking, or a branch cut.",
    architecture:
      "Nortec retail in PostgreSQL (~190k rows). FastAPI + Groq: the AI agent calls SQL tools or a validated read-only SELECT. The API builds a ViewSpec; Next.js 15 and Recharts paint the canvas. The SQL used stays visible in the chat.",
    highlights: [
      "AI chatbot grounded in the databases: KPIs, series, mix, ranking, or read-only SQL.",
      "Charts clip to the question filter (branch, year, period).",
      "Single-statement SELECT, allowed tables, and LIMIT.",
    ],
  },
  energia: {
    title: "Data Analyst: Oil company",
    tagline:
      "Data Analyst project on an oil company: from public prices to consumption and cost metrics.",
    summary:
      "Analyst case: five business questions in SQL (DuckDB) and the same cut in Power BI.",
    why: "A Data Analyst project framed around an oil company. The work is analysis: take prices, shape consumption, cost, and variance questions, and leave repeatable metrics with written assumptions.",
    architecture:
      "Public price CSV to DuckDB in Python to versioned SQL per question. Power BI report on the same CSV (DAX measures). Postgres in Docker stays an optional warehouse, not the daily flow.",
    highlights: [
      "Five business questions with SQL in DuckDB and output in output/.",
      "Power BI report aligned to the same cut, with PNG for the portfolio.",
      "Analytical engine via pip. No desktop SQL client.",
    ],
  },
  flota: {
    title: "Data Engineer: Vehicle fleet",
    tagline:
      "Data Engineer project on a vehicle fleet: ingest, data contract, and a reporting snapshot.",
    summary:
      "Pipeline: CSV to PostgreSQL staging to facts and a fleet_status_snapshot view per unit and branch.",
    why: "A Data Engineer project on a vehicle-management fleet. The craft is data engineering: validate movements and units, reject duplicates and invalid enums, and deliver a per-vehicle state that reporting can consume.",
    architecture:
      "CSV of movements and units to Python validation to PostgreSQL staging to fact SQL and a fleet_status_snapshot view. Automation: idempotent run_pipeline.py job for cron or Compose. Integration tests against Postgres in Docker (port 5434).",
    highlights: [
      "Enum and duplicate-ID validation; a rejected CSV example in the repo.",
      "Pipeline automation: idempotent job for cron or Compose, with auditable counts.",
      "Data layer (AutoStock-Data). Not the AutoStock management platform.",
    ],
  },
  "autostock-ai": {
    tagline:
      "Agency and vehicle-fleet platform, with an AI agent to query stock and P&L.",
    summary:
      "Multi-branch platform: landing, desk with an AI agent, and unit cards to log costs by business line.",
    why: "AutoStock is the platform used to run agencies and the fleet (new, used, rental, and apps). The AI agent queries the system databases; in parallel, each unit has a card to register costs with rules per line.",
    architecture:
      "Postgres (agencies, units, ledger). FastAPI: cost CRUD with a 0km/used/rental matrix and a Groq agent (fleet KPIs, stock, mix, P&L, read-only SELECT). Next.js: landing, /app with a Recharts canvas, and /app/unidades.",
    highlights: [
      "Three agencies, about 130 units; ledger scoped by business line.",
      "A fine on a new car returns 400; used and rental accept fine, plate, and maintenance.",
      "The agent moves the canvas (charts for what you asked) and leaves the SQL in view.",
    ],
  },
  agroblock: {
    tagline:
      "Livestock agtech ecosystem: IoT collars, traceability, and herd management in the field.",
    summary:
      "Platform to follow cattle with an IoT collar: location, status, and ranch operations.",
    why: "Agroblock is a livestock agtech ecosystem. The IoT collar goes to the field; the platform concentrates traceability, alerts, and herd operations. The product landing is at www.agroblock.com.ar.",
    architecture:
      "IoT collar on the animal, telemetry into the platform, and screens for the producer. Alerts come from the collar data: automations that land in the ranch's everyday work. The public landing is at www.agroblock.com.ar.",
    highlights: [
      "IoT collar as the source of truth for the animal in the field.",
      "Alert automations on the herd, driven by the collar.",
      "End-to-end ecosystem: hardware on the animal and software on the ranch.",
    ],
  },
  perkis: {
    tagline:
      "Perkis mobile app: a native product meant to be used on the phone, end to end.",
    summary: "Mobile app (React Native) designed for daily use on a phone.",
    why: "Perkis is a mobile app. The case shows the product on the phone: flows, screens, and the cycle of a native app.",
    architecture:
      "React Native mobile client. The backend stays with the product; here the app and its reach on the phone are what we show.",
    highlights: [
      "A mobile product, not a landing-page mock.",
      "Flows designed for one-handed use on a phone.",
      "Screens and cycle of an app people use every day.",
    ],
  },
  cinemaland: {
    tagline:
      "Cinema platform: frontend and backend for showtimes, screenings, and theater operations.",
    summary:
      "Cinemaland frontend and backend: billboard, screenings, and the logic of a cinema platform.",
    why: "Cinemaland is a cinema platform with frontend and backend. The case covers the billboard, screenings, and the API that holds them.",
    architecture:
      "Billboard frontend and user flow; backend REST API for movies, screenings, and theater operations.",
    highlights: [
      "Frontend and backend of the same product.",
      "Billboard and screenings as the domain, not a generic CRUD.",
      "REST API for movies, schedules, and theater operations.",
    ],
  },
};
