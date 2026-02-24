# Troubleshooting

## Common Issues

### Database connection failed
- Check DATABASE_URL in .env
- Ensure Neon DB is active
- Run `npx prisma db push`

### OAuth not working
- Verify GITHUB_ID and GITHUB_SECRET
- Check callback URL matches Vercel domain

### OpenAI errors
- Verify OPENAI_API_KEY is valid
- Check API quota/billing
