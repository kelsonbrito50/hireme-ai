<p align="center">
  <img src="public/2.png" alt="HireMe AI" width="300" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Neon-PostgreSQL-00E599?logo=neon&logoColor=white" alt="Neon" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/NextAuth.js-Auth-purple?logo=nextdotjs&logoColor=white" alt="NextAuth" />
  <img src="https://img.shields.io/badge/Zod-Validation-3E67B1?logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/github/license/kelsonbrito50/hireme-ai" alt="License" />
  <a href="https://hireme-ai-rust.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-hireme--ai--rust.vercel.app-00C7B7?logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<h1 align="center">🎯 HireMe AI</h1>

<p align="center">
  <strong>AI-powered job application tracker with skill matching, cover letter generation, and multilingual support.</strong><br />
  Paste a job description → get a match score, extracted skills, and a tailored cover letter in seconds.<br /><br />
  🔗 <a href="https://hireme-ai-rust.vercel.app"><strong>Live Demo → hireme-ai-rust.vercel.app</strong></a>
</p>

---

## ✨ Features

### 🔍 AI-Powered Job Analysis
- Paste any job description and instantly extract required skills using **GPT-4o-mini**
- Get a **skill match score (0–100)** comparing your skills vs. job requirements
- Receive an AI-generated **role summary** highlighting key responsibilities
- Visual **circular progress ring** for match score display

### 📝 Smart Cover Letter Generation
- One-click **tailored cover letters** that reference the specific role, company, and your skills
- AI adapts tone and content based on the job description
- Copy-to-clipboard functionality for quick applications

### 📊 Application Dashboard
- Track all your job applications in one place
- **Stats cards**: total applications, average match score, interviews scheduled
- **GitHub profile integration** — displays your repos, followers, and profile info
- **Application status tracking**: Applied → Interviewing → Offered → Rejected
- **CSV export** with formula-injection protection

### 🌐 Multilingual (i18n)
- Full **English and Portuguese** support
- Language toggle in navbar with **localStorage persistence**
- All UI strings internationalized — no hardcoded text

### 🔐 Security & Authentication
- **GitHub OAuth** via NextAuth.js with JWT sessions
- **API route protection** — all endpoints require authentication (401 for unauthenticated)
- **Per-IP rate limiting** — analyze: 10 req/min, cover-letter: 5 req/min
- **Zod input validation** with max lengths on all endpoints
- **Prompt injection mitigation** on OpenAI calls
- **User data isolation** — applications filtered by session userId
- Secure **JSON.parse error handling** on AI responses

### 🎨 Modern UI/UX
- Dark theme with custom **#f20107 red** brand palette
- Responsive design built with **TailwindCSS**
- **"How It Works"** step-by-step guide on the landing page
- Click-outside handler for dropdown menus
- Loading states and error handling throughout

### 🐳 Docker Ready
- **Docker Compose** setup with PostgreSQL
- `output: standalone` Next.js build for optimized containers
- One command to spin up the full stack

### ✅ Testing & CI/CD
- **Jest + ts-jest** unit tests (4/4 passing)
- **GitHub Actions CI** — lint, type-check, build, and test on every PR
- **Branch protection** — main requires PR review before merge

---

## 📸 Screenshots

### Landing Page
<p align="center">
  <img src="docs/landing.png" alt="HireMe AI Landing Page" width="800" />
</p>

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router, Server Components) |
| **Language** | TypeScript 5 (strict mode) |
| **AI Engine** | OpenAI GPT-4o-mini |
| **Database** | PostgreSQL (Neon) + Prisma ORM |
| **Auth** | NextAuth.js v4 (GitHub OAuth, JWT) |
| **Validation** | Zod (schema-based input validation) |
| **Styling** | TailwindCSS 3 + custom brand theme |
| **Internationalization** | Custom React Context + i18n module |
| **Rate Limiting** | Custom per-IP middleware |
| **Testing** | Jest + ts-jest |
| **CI/CD** | GitHub Actions (lint → type-check → build → test) |
| **Hosting** | Vercel (frontend + serverless API) |
| **Database Hosting** | Neon (serverless PostgreSQL) |
| **Container** | Docker + Docker Compose |

---

## 🏛 Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts         # AI job analysis (GPT-4o-mini)
│   │   ├── applications/route.ts    # CRUD — GET (list) + POST (create)
│   │   ├── cover-letter/route.ts    # AI cover letter generation
│   │   └── auth/[...nextauth]/      # GitHub OAuth handler
│   ├── dashboard/page.tsx           # Main dashboard (protected)
│   ├── layout.tsx                   # Root layout + providers
│   ├── page.tsx                     # Landing page
│   └── not-found.tsx                # Custom 404
├── components/
│   ├── AnalyzeForm.tsx              # Job description input + results
│   ├── CoverLetterModal.tsx         # Generated cover letter modal
│   ├── HowItWorks.tsx              # Step-by-step guide
│   ├── JobCard.tsx                  # Application card component
│   └── MatchScore.tsx              # Circular progress ring (SVG)
├── lib/
│   ├── auth.ts                      # NextAuth config + GitHub provider
│   ├── auth-utils.ts                # Server-side session helpers
│   ├── i18n.ts                      # English + Portuguese translations
│   ├── LanguageContext.tsx           # React Context for language state
│   ├── openai.ts                    # OpenAI client + prompt engineering
│   ├── prisma.ts                    # Prisma singleton client
│   ├── rate-limit.ts                # Per-IP rate limiter
│   └── utils.ts                     # Shared utilities + status colors
├── __tests__/
│   └── analyze.test.ts              # API route tests (mocked auth)
├── prisma/
│   └── schema.prisma                # Database schema
├── docker-compose.yml               # Full-stack Docker setup
└── .github/workflows/ci.yml         # GitHub Actions CI pipeline
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL (or use Docker Compose, or Neon free tier)
- OpenAI API key
- GitHub OAuth App ([create one here](https://github.com/settings/developers))

### 1. Clone & Install

```bash
git clone https://github.com/kelsonbrito50/hireme-ai.git
cd hireme-ai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in your `.env`:
```env
DATABASE_URL="postgresql://user:pass@host/db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
OPENAI_API_KEY="sk-..."
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"
```

### 3. Set Up Database

```bash
npx prisma db push
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker (Alternative)

```bash
docker compose up -d
```

---

## 📡 API Reference

All API routes require **GitHub OAuth authentication** via NextAuth.js. Unauthenticated requests receive `401 Unauthorized`.

### `POST /api/analyze`

Analyze a job description against user skills. **Rate limit: 10 req/min per IP.**

**Request:**
```json
{
  "jobDescription": "We are looking for a senior React developer...",
  "userSkills": "React, TypeScript, Node.js"
}
```

**Response:**
```json
{
  "skills": ["React", "TypeScript", "GraphQL"],
  "matchScore": 82,
  "summary": "A senior frontend role focusing on React and TypeScript."
}
```

### `POST /api/cover-letter`

Generate a tailored cover letter. **Rate limit: 5 req/min per IP.**

**Request:**
```json
{
  "jobTitle": "Senior Frontend Engineer",
  "company": "Acme Corp",
  "jobDescription": "...",
  "userSkills": "React, TypeScript",
  "userName": "Your Name"
}
```

**Response:**
```json
{
  "coverLetter": "Dear Hiring Manager at Acme Corp..."
}
```

### `GET /api/applications`

List all job applications for the authenticated user.

### `POST /api/applications`

Create a new job application entry.

**Request:**
```json
{
  "title": "Frontend Engineer",
  "company": "Acme Corp",
  "description": "...",
  "matchScore": 85,
  "skills": ["React", "TypeScript"]
}
```

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) | ✅ |
| `NEXTAUTH_URL` | App URL (e.g., `https://your-app.vercel.app`) | ✅ |
| `NEXTAUTH_SECRET` | Random secret for JWT signing | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o-mini | ✅ |
| `GITHUB_ID` | GitHub OAuth App Client ID | ✅ |
| `GITHUB_SECRET` | GitHub OAuth App Client Secret | ✅ |

---

## 🛡 Security

- **Authentication** on all API routes (NextAuth.js + JWT)
- **Input validation** via Zod schemas with max length constraints
- **Rate limiting** per IP to prevent abuse
- **Prompt injection mitigation** in OpenAI system prompts
- **User data isolation** — each user sees only their own applications
- **CSV export sanitization** — protects against formula injection attacks
- **No secrets in code** — all credentials via environment variables

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feat/amazing-feature`)
5. Open a Pull Request

All PRs run through **GitHub Actions CI** (lint → type-check → build → test).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ☕ and AI by <a href="https://github.com/kelsonbrito50">Kelson Brito</a>
</p>
