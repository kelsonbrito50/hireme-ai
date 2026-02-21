import { NextRequest } from "next/server";

// Mock OpenAI before importing the route
jest.mock("@/lib/openai", () => ({
  analyzeJobDescription: jest.fn().mockResolvedValue({
    skills: [
      { name: "TypeScript", category: "technical" },
      { name: "React", category: "technical" },
    ],
    matchScore: 85,
    summary: "A senior frontend role focusing on React and TypeScript.",
    suggestions: ["Learn GraphQL"],
  }),
}));

import { POST } from "@/app/api/analyze/route";

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost:3000/api/analyze", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/analyze", () => {
  it("returns skills, matchScore, and summary for valid input", async () => {
    const res = await POST(makeRequest({ jobDescription: "We need a React dev" }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.skills).toEqual(["TypeScript", "React"]);
    expect(data.matchScore).toBe(85);
    expect(data.summary).toBeDefined();
  });

  it("returns 400 when jobDescription is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe("jobDescription is required");
  });

  it("returns 400 when jobDescription is not a string", async () => {
    const res = await POST(makeRequest({ jobDescription: 123 }));
    expect(res.status).toBe(400);
  });
});
