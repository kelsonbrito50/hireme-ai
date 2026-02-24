# API Reference

## Endpoints

### POST /api/analyze
Analyze a job description against user skills.
- **Body:** `{ description: string }`
- **Response:** `{ score: number, skills: string[], coverLetter: string }`

### GET /api/applications
List saved applications.

### POST /api/applications
Save a new application.

### GET /api/applications/export
Export applications as CSV.
