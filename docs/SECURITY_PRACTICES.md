# Security Practices

## Environment Variables

**Never commit secrets.** Always use `.env.local` for local development:

```bash
cp .env.example .env.local
# Edit .env.local — this file is gitignored
```

## Authentication

- NextAuth.js handles auth with CSRF protection built-in
- JWT sessions are httpOnly cookies
- OAuth tokens are never exposed to the client

## API Security

- All `/api/*` routes verify session before processing
- User data is scoped: queries always include `userId` filter
- Rate limiting implemented via middleware

## OpenAI API

- API calls are made server-side only
- API key is never exposed to the browser
- Prompt injection mitigated by strict system prompts

## Database

- Prisma parameterized queries prevent SQL injection
- Row-level security via always-scoped queries
- Connection strings use environment variables

## Dependency Security

- Dependabot enabled for automated vulnerability alerts
- Run `npm audit` regularly: `npm audit --production`
- Update dependencies: `npm update`

## Reporting Security Issues

See [SECURITY.md](../SECURITY.md) for the vulnerability disclosure policy.
