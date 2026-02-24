# Architecture

## Stack
- **Frontend:** Next.js 14 + TypeScript + TailwindCSS
- **ORM:** Prisma
- **Database:** Neon PostgreSQL (serverless)
- **Auth:** NextAuth.js (GitHub OAuth)
- **AI:** OpenAI GPT-4
- **Deploy:** Vercel

## Flow
1. User logs in via GitHub OAuth
2. Pastes job description
3. GPT-4 analyzes skills match (0-100 score)
4. AI generates tailored cover letter
5. Application saved to dashboard
