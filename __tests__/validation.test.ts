/**
 * Tests for request validation schemas (Zod).
 * Mirrors the schemas used in the API routes without requiring
 * a live server, database, or OpenAI key.
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Re-define schemas here (mirroring src/app/api/*)
// In a larger project these would be exported from a shared file.
// ---------------------------------------------------------------------------

const analyzeSchema = z.object({
  jobDescription: z.string().min(1).max(50_000),
  userSkills: z.array(z.string().max(100)).max(100).optional(),
});

const applicationSchema = z.object({
  jobTitle: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  jobDescription: z.string().min(1),
  status: z
    .enum(["SAVED", "APPLIED", "INTERVIEWING", "OFFERED", "REJECTED", "WITHDRAWN"])
    .optional()
    .default("SAVED"),
  matchScore: z.number().min(0).max(100).optional(),
});

const coverLetterSchema = z.object({
  jobTitle: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  jobDescription: z.string().min(1).max(50_000),
  userSkills: z.array(z.string()).max(50).optional(),
});

// ---------------------------------------------------------------------------
// analyzeSchema
// ---------------------------------------------------------------------------

describe("analyzeSchema", () => {
  it("accepts valid input", () => {
    const result = analyzeSchema.safeParse({
      jobDescription: "We need a React developer with 3+ years of experience.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid input with optional skills", () => {
    const result = analyzeSchema.safeParse({
      jobDescription: "Looking for a TypeScript backend engineer.",
      userSkills: ["TypeScript", "Node.js", "PostgreSQL"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty jobDescription", () => {
    const result = analyzeSchema.safeParse({ jobDescription: "" });
    expect(result.success).toBe(false);
  });

  it("rejects jobDescription exceeding 50 000 chars", () => {
    const result = analyzeSchema.safeParse({
      jobDescription: "x".repeat(50_001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a skill string longer than 100 chars", () => {
    const result = analyzeSchema.safeParse({
      jobDescription: "Valid description",
      userSkills: ["x".repeat(101)],
    });
    expect(result.success).toBe(false);
  });

  it("rejects more than 100 skills", () => {
    const result = analyzeSchema.safeParse({
      jobDescription: "Valid description",
      userSkills: Array.from({ length: 101 }, (_, i) => `skill${i}`),
    });
    expect(result.success).toBe(false);
  });

  it("allows exactly 100 skills", () => {
    const result = analyzeSchema.safeParse({
      jobDescription: "Valid description",
      userSkills: Array.from({ length: 100 }, (_, i) => `skill${i}`),
    });
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// applicationSchema
// ---------------------------------------------------------------------------

describe("applicationSchema", () => {
  const valid = {
    jobTitle: "Senior React Developer",
    company: "Acme Corp",
    jobDescription: "Build awesome UIs.",
  };

  it("accepts a minimal valid application", () => {
    expect(applicationSchema.safeParse(valid).success).toBe(true);
  });

  it("defaults status to SAVED", () => {
    const result = applicationSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.status).toBe("SAVED");
  });

  it("accepts all valid status values", () => {
    const statuses = ["SAVED", "APPLIED", "INTERVIEWING", "OFFERED", "REJECTED", "WITHDRAWN"];
    for (const status of statuses) {
      const r = applicationSchema.safeParse({ ...valid, status });
      expect(r.success).toBe(true);
    }
  });

  it("rejects an invalid status", () => {
    const r = applicationSchema.safeParse({ ...valid, status: "GHOST" });
    expect(r.success).toBe(false);
  });

  it("rejects missing jobTitle", () => {
    const { jobTitle, ...rest } = valid;
    expect(applicationSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects matchScore above 100", () => {
    const r = applicationSchema.safeParse({ ...valid, matchScore: 101 });
    expect(r.success).toBe(false);
  });

  it("rejects matchScore below 0", () => {
    const r = applicationSchema.safeParse({ ...valid, matchScore: -1 });
    expect(r.success).toBe(false);
  });

  it("accepts matchScore of 0 and 100", () => {
    expect(applicationSchema.safeParse({ ...valid, matchScore: 0 }).success).toBe(true);
    expect(applicationSchema.safeParse({ ...valid, matchScore: 100 }).success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// coverLetterSchema
// ---------------------------------------------------------------------------

describe("coverLetterSchema", () => {
  const valid = {
    jobTitle: "Backend Engineer",
    company: "StartupXYZ",
    jobDescription: "Build scalable APIs.",
  };

  it("accepts valid input", () => {
    expect(coverLetterSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional userSkills", () => {
    const r = coverLetterSchema.safeParse({ ...valid, userSkills: ["Node.js", "Go"] });
    expect(r.success).toBe(true);
  });

  it("rejects empty company", () => {
    expect(coverLetterSchema.safeParse({ ...valid, company: "" }).success).toBe(false);
  });

  it("rejects jobDescription exceeding 50 000 chars", () => {
    const r = coverLetterSchema.safeParse({ ...valid, jobDescription: "x".repeat(50_001) });
    expect(r.success).toBe(false);
  });
});
