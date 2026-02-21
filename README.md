<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/github/license/kelsonbrito50/hireme-ai" alt="License" />
  <a href="https://hireme-ai.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-hireme--ai.vercel.app-00C7B7?logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<h1 align="center">🎯 HireMe AI</h1>

<p align="center">
  <strong>AI-powered job application tracker with skill matching & cover letter generation.</strong><br />
  Paste a job description → get a match score, extracted skills, and a tailored cover letter in seconds.<br /><br />
  🔗 <a href="https://hireme-ai.vercel.app"><strong>Live Demo → hireme-ai.vercel.app</strong></a>
</p>

---

## ✨ Features

- **🔍 Job Analysis** — Paste any job description and instantly extract required skills, get a match score (0–100), and a role summary powered by GPT-4
- **📝 Cover Letter Generation** — One-click tailored cover letters that reference the specific role and company
- **📊 Dashboard** — Track all your applications with stats cards (total apps, avg match score, interviews scheduled)
- **🎨 Dark Theme** — Beautiful, modern UI built with TailwindCSS on a `#0f172a` dark palette
- **🔐 Auth** — GitHub OAuth via NextAuth.js with Prisma adapter
- **🐳 Docker Ready** — One command to spin up the full stack

---

## 📸 Screenshots

<p align="center">
  <em>Screenshots coming soon — run the app locally to see it in action!</em>
</p>

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| AI | OpenAI GPT-4 |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js v4 |
| Styling | TailwindCSS 3 |
| Testing | Jest + ts-jest |
| CI/CD | GitHub Actions |
| Container | Docker + Docker Compose |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL (or use Docker Compose)
- OpenAI API key

### 1. Clone & Install

```bash
git clone https://github.com/kelsonbrito50/hireme-ai.git
cd hireme-ai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your values
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
OPENAI_API_KEY=sk-... docker compose up -d
```

---

## 📡 API Reference

### `POST /api/analyze`

Analyze a job description against user skills.

**Request:**
```json
{
  "jobDescription": "We are looking for a senior React developer...",
  "userSkills": ["React", "TypeScript", "Node.js"]
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

Generate a tailored cover letter.

**Request:**
```json
{
  "jobTitle": "Senior Frontend Engineer",
  "company": "Acme Corp",
  "jobDescription": "...",
  "userSkills": ["React", "TypeScript"],
  "userName": "Kelson Brito"
}
```

**Response:**
```json
{
  "coverLetter": "Dear Hiring Manager at Acme Corp..."
}
```

### `GET /api/applications`

List all job applications.

### `POST /api/applications`

Create a new job application.

**Request:**
```json
{
  "title": "Frontend Engineer",
  "company": "Acme Corp",
  "description": "...",
  "userId": "clxxxxxxxxxx",
  "matchScore": 85,
  "skills": ["React", "TypeScript"]
}
```

---

## 🏛 Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts       # Job analysis endpoint
│   │   ├── applications/route.ts  # CRUD for applications
│   │   └── cover-letter/route.ts  # Cover letter generation
│   ├── dashboard/page.tsx         # Main dashboard
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── AnalyzeForm.tsx            # Job description input
│   ├── CoverLetterModal.tsx       # Generated letter modal
│   ├── JobCard.tsx                # Application card
│   └── MatchScore.tsx             # Circular progress ring
├── lib/
│   ├── auth.ts                    # NextAuth config
│   ├── openai.ts                  # OpenAI client & helpers
│   ├── prisma.ts                  # Prisma singleton
│   └── utils.ts                   # Shared utilities
└── __tests__/
    └── analyze.test.ts            # API route tests
```

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_URL` | App URL for NextAuth | ✅ |
| `NEXTAUTH_SECRET` | Random secret for JWT signing | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `GITHUB_ID` | GitHub OAuth App ID | For auth |
| `GITHUB_SECRET` | GitHub OAuth App Secret | For auth |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ☕ and AI by <a href="https://github.com/kelsonbrito50">Kelson Brito</a>
</p>
