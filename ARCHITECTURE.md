# Architecture Overview

This document describes the technical architecture of **HireMe AI**, an AI-powered job application assistant.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling | Tailwind CSS |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | [Neon](https://neon.tech/) (Serverless PostgreSQL) |
| AI | OpenAI API |
| Auth | NextAuth.js |
| Deployment | Vercel |

## Directory Structure

```
hireme-ai/
├── app/                  # Next.js App Router pages & layouts
│   ├── api/              # API route handlers
│   ├── (auth)/           # Authentication pages
│   └── dashboard/        # Protected dashboard pages
├── components/           # Reusable React components
├── lib/                  # Utility libraries (prisma client, auth, etc.)
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Data Flow

1. **User** → Next.js frontend (App Router)
2. **Frontend** → Next.js API Routes (`/app/api/`)
3. **API Routes** → Prisma ORM → Neon PostgreSQL
4. **API Routes** → OpenAI API for AI features

## Database (Neon + Prisma)

- Neon provides a **serverless PostgreSQL** database with connection pooling via PgBouncer.
- Prisma is used as the ORM for type-safe database queries and migrations.
- The schema is defined in `prisma/schema.prisma`.

### Key Models

- `User` – Registered users with auth provider info
- `Resume` – Uploaded or generated resume data
- `JobApplication` – Tracked job applications with AI suggestions

## Authentication

NextAuth.js handles authentication with support for:
- Google OAuth
- GitHub OAuth
- Email/Password (credentials provider)

## AI Integration

OpenAI's GPT models are used to:
- Tailor resumes to specific job descriptions
- Generate cover letters
- Score application fit against job postings

## Deployment

The app is deployed on **Vercel** with:
- Automatic preview deployments on PRs
- Environment variables managed via Vercel dashboard
- Edge-compatible API routes where applicable

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | App base URL |
| `OPENAI_API_KEY` | OpenAI API key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
