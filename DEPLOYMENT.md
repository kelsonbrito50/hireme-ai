# Deployment Guide

This guide covers deploying **HireMe AI** to [Vercel](https://vercel.com), the recommended hosting platform.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Neon](https://neon.tech) PostgreSQL database
- API keys for OpenAI and OAuth providers

## 1. Fork & Clone

```bash
git clone https://github.com/kelsonbrito50/hireme-ai.git
cd hireme-ai
npm install
```

## 2. Set Up Neon Database

1. Create a new project at [neon.tech](https://neon.tech)
2. Copy the **connection string** from the Neon dashboard
3. Run Prisma migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

## 3. Configure Environment Variables

Create a `.env.local` file (never commit this file):

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

## 4. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel deploy --prod
```

### Option B: GitHub Integration

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no extra config needed

## 5. Add Environment Variables in Vercel

In the Vercel dashboard → **Settings → Environment Variables**, add all variables from your `.env.local`.

Set `NEXTAUTH_URL` to your production URL (e.g., `https://hireme-ai.vercel.app`).

## 6. Run Database Migrations in Production

After deploying, run:

```bash
npx prisma migrate deploy
```

Or configure this in your Vercel build command:

```json
{
  "buildCommand": "prisma migrate deploy && next build"
}
```

## 7. Custom Domain (Optional)

1. In Vercel dashboard → **Domains**
2. Add your domain and follow DNS instructions

## Troubleshooting

- **Database connection errors** → Check `DATABASE_URL` is correct and Neon allows your IP
- **Auth errors** → Verify `NEXTAUTH_URL` matches your deployed URL exactly
- **Build failures** → Check Vercel build logs; ensure all env vars are set

## CI/CD

Vercel automatically:
- Deploys to production on pushes to `main`
- Creates preview deployments for every pull request

No additional CI setup is required for basic deployments.
