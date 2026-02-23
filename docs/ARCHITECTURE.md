# Architecture Overview

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM
- **AI:** OpenAI API
- **Auth:** NextAuth.js

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Auth-protected routes
│   ├── api/          # API route handlers
│   └── layout.tsx    # Root layout
├── components/       # Reusable UI components
├── lib/              # Utility functions and config
└── types/            # TypeScript type definitions
```

## Data Flow

1. User authenticates via NextAuth
2. Frontend calls `/api/*` endpoints
3. API routes interact with DB via Prisma
4. AI features call OpenAI API server-side

## Deployment

The app is deployed on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.
