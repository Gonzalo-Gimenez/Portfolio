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
      "Operations platform with a RAG chatbot: it retrieves from the warehouse and shows charts for what you ask.",
    summary:
      "Analytics platform: RAG over PostgreSQL — the agent retrieves data and updates KPIs and charts from the question.",
    why: "InsightAI is an operations platform with an AI chatbot. The agent does not invent figures: it first retrieves from the Nortec warehouse (RAG via SQL tools), then answers; on the same desk it shows charts for the cut — revenue, mix, ranking, or a branch.",
    architecture:
      "Nortec retail in PostgreSQL (~190k rows). FastAPI + Groq: RAG retrieve-then-generate — SQL tools or validated read-only SELECT, context to the LLM, grounded answer. The API builds a ViewSpec; Next.js 15 and Recharts paint the canvas. The SQL used stays visible in the chat.",
    highlights: [
      "RAG on the warehouse: retrieves KPIs, series, mix, ranking, or read-only SQL before answering.",
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
  "chatbot-ai": {
    title: "Call Agent",
    tagline:
      "Phone conversational AI: the agent calls or answers, retrieves FAQs (RAG), and responds in real time.",
    summary:
      "FastAPI + Twilio Voice, KPI dashboard, and an LLM router (Groq, OpenAI, Gemini) with per-call traceability.",
    why: "An agent that automates voice outreach without inventing policies: before each reply it retrieves knowledge-base chunks (RAG) and speaks in short phone-friendly sentences. The dashboard shows contacts, calls, answered rate, conversion, and which AI engine each call used.",
    architecture:
      "Postgres (contacts, calls, utterances, kb_chunks). FastAPI: Twilio Gather webhooks or DEV_MOCK mode; retrieve-then-generate with lexical ranking on the KB; LLMProvider interface and router per call or env. Next.js 15: KPIs, calls per day, and status mix.",
    highlights: [
      "RAG on every voice turn: context from kb_chunks before the LLM.",
      "Multiple engines with Groq as default; optional keys for OpenAI and Gemini.",
      "Dark dashboard with KPIs, daily series, and engine/model per call.",
    ],
  },
  "trading-agents": {
    title: "TradingAgents",
    tagline:
      "Forex by probability: box change counts, multi-pair book, Groq narrates context and Kev calibrates the decision.",
    summary:
      "MT4 paper/demo agent: MN→D1 change counts, D3–D6 management, MAL and cross-major recovery; Auto / Confirm / Manual dashboard.",
    why: "This is not bank-style hedging: count box changes, wait for retraces in a 15–20 pip zone, and run an EUR-like vs USD-strong book to break even or recover with 3R. Groq explains structured state; Kev returns typed probabilities before firing.",
    architecture:
      "FastAPI: box/fractal/psych features, multi-pair book, ladder and basket policy. Groq (text) + Kev `POST /v1/systemone`. Postgres journal. Next.js: KPIs, proposal queue, execution modes. MQL4 WebRequest EA.",
    highlights: [
      "Change counts and MAL phases from structured state, not chart screenshots.",
      "Correlated/inverse book: expand when ahead, cover only in drawdown.",
      "Auto, Confirm, or Manual; fine-tune Kev from JSONL journal export.",
    ],
  },
  "autostock-ai": {
    tagline:
      "Agency and vehicle-fleet platform, with an AI agent to query stock and P&L.",
    summary:
      "Multi-branch platform: landing, desk with an AI agent, and unit cards to log costs by business line.",
    why: "AutoStock is the platform used to run agencies and the fleet (new, used, rental, and apps). The RAG agent retrieves from ledger and stock before answering; in parallel, each unit has a card to register costs with rules per line.",
    architecture:
      "Postgres (agencies, units, ledger). FastAPI: cost CRUD and a Groq agent with RAG retrieve-then-generate (fleet KPIs, stock, mix, P&L, read-only SELECT). Next.js: landing, /app with a Recharts canvas, and /app/unidades.",
    highlights: [
      "RAG on stock and P&L: the agent retrieves before it answers.",
      "Three agencies, about 130 units; ledger scoped by business line.",
      "The agent moves the canvas (charts for what you asked) and leaves the SQL in view.",
    ],
  },
  agroblock: {
    tagline:
      "Livestock agtech ecosystem: IoT collars, traceability, and herd management in the field.",
    summary:
      "Platform to follow cattle with an IoT collar: location, status, and ranch operations.",
    why: "Agroblock is a livestock agtech ecosystem. The IoT collar goes to the field; the platform concentrates traceability, alerts, and herd operations.",
    architecture:
      "IoT collar on the animal, telemetry into the platform, and screens for the producer. Alerts come from the collar data: automations that land in the ranch's everyday work.",
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
