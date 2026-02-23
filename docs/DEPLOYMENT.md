# Deployment Guide

## Prerequisites

- Node.js v22+
- A Vercel account
- OpenAI API key
- PostgreSQL database (e.g., Neon, Supabase)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

## Deploying to Vercel

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with `git push origin main`

Vercel auto-deploys on every push to `main`.

## Deploying with Docker

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`.

## Database Migrations

```bash
npx prisma migrate deploy
```

Run after each deploy that includes schema changes.
