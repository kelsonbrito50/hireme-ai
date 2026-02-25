<div align="center">

# 🎯 HireMe AI

### AI-powered job application tracker that gives developers an unfair advantage.

[![CI](https://github.com/kelsonbrito50/hireme-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/kelsonbrito50/hireme-ai/actions) ![Tests](https://img.shields.io/badge/tests-76%20passed-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

## 🚀 [**→ LIVE DEMO ←**](https://hireme-ai-rust.vercel.app)

<br/>

> Stop guessing. Start landing interviews.

</div>

<p align="center">
  <img src="docs/images/preview.png" alt="HireMe AI Preview" width="800" />
</p>

---

## About

**HireMe AI** helps developers land jobs faster with AI-powered insights.

Paste a job description. Get a skill match score from 0 to 100. Generate a tailored cover letter in seconds. Track every application in one clean dashboard. No more spreadsheets, no more guessing if you're a good fit — HireMe AI tells you exactly where you stand and gives you the tools to close the gap.

Built for developers who are serious about their job search.

---

## Features

### 🔍 Job Description Analyzer
Paste any job posting and HireMe AI extracts key requirements, maps them against your profile, and surfaces the skills that matter most.

---

### 📊 Skill Match Score (0–100)
Get a precise compatibility score for every job. Understand exactly what's missing and what you already nail.

---

### ✉️ AI Cover Letter Generator
Generate a polished, job-specific cover letter powered by GPT-4. Tailored to the role. Sounds like you, not a robot.

---

### 📋 Application Dashboard
Track every application in one place — status, dates, notes, match scores. Full visibility over your pipeline.

---

### 📤 CSV Export
Export your entire application history with one click. Own your data, feed your spreadsheets, import to anything.

---

### 🔐 GitHub OAuth
One-click authentication via GitHub. No forms, no passwords, no friction.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Auth** | NextAuth.js + GitHub OAuth |
| **ORM** | Prisma |
| **Database** | Neon (serverless PostgreSQL) |
| **AI** | OpenAI GPT-4 API |
| **Deployment** | Vercel |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Browser                       │
│              (React / Tailwind CSS)              │
└────────────────────┬────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────┐
│              Next.js 14 App Router               │
│  ┌─────────────┐   ┌──────────────────────────┐ │
│  │ Server      │   │  Route Handlers (API)     │ │
│  │ Components  │   │  /api/analyze             │ │
│  │             │   │  /api/cover-letter        │ │
│  │             │   │  /api/applications        │ │
│  └─────────────┘   └──────────┬───────────────┘ │
└─────────────────────────────┬─┴─────────────────┘
                               │
          ┌────────────────────┼─────────────────┐
          │                    │                  │
┌─────────▼──────┐  ┌──────────▼──────┐  ┌───────▼──────┐
│  Prisma ORM    │  │  OpenAI GPT-4   │  │  NextAuth.js │
│                │  │  (Analyze +     │  │  (GitHub     │
│  Schema-first  │  │   Cover Letter) │  │   OAuth)     │
└─────────┬──────┘  └─────────────────┘  └─────────────┘
          │
┌─────────▼──────┐
│  Neon Database │
│  (Serverless   │
│   PostgreSQL)  │
└────────────────┘
```

**Request flow:**
1. User authenticates via GitHub OAuth (NextAuth.js)
2. React Server Components fetch data server-side — no unnecessary round trips
3. Route Handlers proxy AI requests to OpenAI GPT-4
4. Prisma handles all DB operations against Neon's serverless Postgres
5. Everything deployed on Vercel's edge network

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) account (free tier works)
- A [GitHub OAuth App](https://github.com/settings/developers)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone the repository

```bash
git clone https://github.com/kelsonbrito50/hireme-ai.git
cd hireme-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the values (see [Environment Variables](#environment-variables) below).

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# ─── Database ────────────────────────────────────────────
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# ─── NextAuth.js ─────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# ─── GitHub OAuth ─────────────────────────────────────────
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# ─── OpenAI ───────────────────────────────────────────────
OPENAI_API_KEY="sk-your-openai-api-key"
```

> ⚠️ Never commit real credentials. `.env.local` is already in `.gitignore`.

### Getting each value

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Neon dashboard → Connection string |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `GITHUB_CLIENT_ID/SECRET` | GitHub → Settings → Developer settings → OAuth Apps |
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

---

## Contributing

Branch protection is active on `main`. All changes go through PRs.

```bash
# Create a feature branch
git checkout -b feat/your-feature-name

# Commit using conventional commits
git commit -m "feat: add skill gap suggestions"

# Open a PR against main
git push origin feat/your-feature-name
```

---

## What I Learned

Building HireMe AI was a deep dive into integrating multiple complex systems into a cohesive product. Key takeaways:

**Next.js App Router patterns** — Adopting React Server Components from day one changed how I think about data fetching. Keeping data fetching on the server eliminated a whole class of loading states and reduced client-side JavaScript significantly.

**Prompt engineering at scale** — Getting GPT-4 to produce consistently structured, useful output required iterating on prompts far more than expected. A well-crafted system prompt is worth more than a clever model tweak.

**Prisma + Neon as a serverless stack** — The combination is powerful but has nuances. Connection pooling with Neon's `?pgbouncer=true` flag is non-negotiable in a serverless environment where functions spin up cold.

**NextAuth.js session strategy** — Switching from JWT to database sessions (with Prisma adapter) gave me reliable, revocable sessions at the cost of a DB query per request — a trade-off worth understanding before committing to either.

**Designing for developer UX** — Developers are the pickiest users. Every friction point gets noticed. Building something developers would actually use taught me to prioritize speed and clarity above all else.

---

## License

[MIT](./LICENSE) © [Kelson Brito](https://github.com/kelsonbrito50)

---

<div align="center">

Built with focus by **[Kelson Brito](https://github.com/kelsonbrito50)**

⭐ If this helped you, star the repo.

</div>
