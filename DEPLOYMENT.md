# Deployment Guide

## Vercel
1. Connect GitHub repo to Vercel
2. Set environment variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)
3. Deploy automatically on push to main

## Environment Variables
- `DATABASE_URL` — Neon PostgreSQL connection string
- `NEXTAUTH_SECRET` — Random secret for NextAuth
- `GITHUB_ID` / `GITHUB_SECRET` — GitHub OAuth app
- `OPENAI_API_KEY` — OpenAI API key
