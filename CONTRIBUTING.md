# Contributing to HireMe AI

Thank you for your interest in contributing! 🎉 This document outlines how to get started.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Setup

```bash
# Clone the repo
git clone https://github.com/kelsonbrito50/hireme-ai.git
cd hireme-ai

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Fill in your environment variables

# Run database migrations
npx prisma migrate dev

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:3000`.

## How to Contribute

### Reporting Bugs

- Check [existing issues](https://github.com/kelsonbrito50/hireme-ai/issues) first
- Open a new issue using the **Bug Report** template
- Include steps to reproduce, expected vs actual behavior, and environment info

### Suggesting Features

- Open a [Feature Request](https://github.com/kelsonbrito50/hireme-ai/issues/new) issue
- Describe the use case and why it would benefit users

### Submitting Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes** with clear, focused commits
4. **Run checks** locally:
   ```bash
   npm run lint
   npm run build
   ```
5. **Push** and open a PR against `main`

### Commit Style

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `chore:` | Maintenance tasks |
| `ci:` | CI/CD changes |
| `refactor:` | Code restructuring |

### Code Style

- TypeScript is required for all new code
- Follow existing patterns in the codebase
- Run `npm run lint` before committing
- Components go in `/components`, utilities in `/lib`

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to abide by it.

## Questions?

Open a [Discussion](https://github.com/kelsonbrito50/hireme-ai/discussions) or reach out via GitHub issues.
