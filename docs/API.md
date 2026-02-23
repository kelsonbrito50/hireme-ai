# API Reference

## Authentication

All API endpoints require authentication via NextAuth session cookies.

## Endpoints

### Jobs

#### `GET /api/jobs`
Returns a list of job applications for the authenticated user.

**Response:**
```json
[
  {
    "id": "string",
    "company": "string",
    "position": "string",
    "status": "applied | interview | offer | rejected",
    "createdAt": "ISO 8601 date"
  }
]
```

#### `POST /api/jobs`
Creates a new job application.

**Body:**
```json
{
  "company": "string",
  "position": "string",
  "url": "string (optional)"
}
```

### AI

#### `POST /api/ai/cover-letter`
Generates an AI-powered cover letter.

**Body:**
```json
{
  "jobId": "string",
  "tone": "professional | casual | enthusiastic"
}
```

**Response:**
```json
{
  "coverLetter": "string"
}
```

## Error Handling

All errors return a JSON body with a `message` field and an appropriate HTTP status code.
