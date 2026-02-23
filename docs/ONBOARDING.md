# Developer Onboarding Guide

Welcome to HireMe AI! This guide will get you up and running in under 15 minutes.

## Prerequisites

- Node.js v22+ (use `.nvmrc`: `nvm use`)
- npm or pnpm
- PostgreSQL (or use Neon for free serverless PostgreSQL)
- OpenAI API key

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/kelsonbrito50/hireme-ai.git
cd hireme-ai
nvm use  # uses .nvmrc (Node 22)
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
- `DATABASE_URL` — from Neon or local PostgreSQL
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `OPENAI_API_KEY` — from platform.openai.com

### 3. Database Setup

```bash
npx prisma migrate dev
npx prisma db seed  # optional: seed demo data
```

### 4. Run Dev Server

```bash
npm run dev
# Open http://localhost:3000
```

## First Steps

1. Create an account at http://localhost:3000
2. Add a job application
3. Paste a job description to get a skill match score
4. Generate a cover letter

## Key Files

- `src/app/` — Next.js pages and API routes
- `prisma/schema.prisma` — Database schema
- `src/lib/` — Shared utilities
- `src/components/` — Reusable UI components

## Need Help?

- Open an issue on GitHub
- Check existing issues first!
