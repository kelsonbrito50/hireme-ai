# Tech Stack Reference

## Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first styling |
| shadcn/ui | latest | Accessible UI components |
| React Hook Form | 7.x | Form handling |

## Backend (API Routes)

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js API Routes | 14.x | Serverless API endpoints |
| Prisma | 5.x | ORM for PostgreSQL |
| NextAuth.js | 4.x | Authentication |

## AI / External

| Service | Purpose |
|---------|---------|
| OpenAI GPT-4 | Cover letter generation, skill analysis |
| Neon PostgreSQL | Serverless database |

## DevOps

| Tool | Purpose |
|------|---------|
| Vercel | Deployment & edge functions |
| GitHub Actions | CI/CD pipeline |
| Docker | Local development |

## Why These Choices?

- **Next.js 14**: App Router enables streaming, server components, and edge runtime
- **Prisma**: Type-safe database access with excellent DX
- **NextAuth**: Built for Next.js, supports many OAuth providers
- **Tailwind + shadcn/ui**: Fast iteration with accessible, composable components
