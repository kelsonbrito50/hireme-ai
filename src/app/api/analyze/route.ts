import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeJobDescription } from "@/lib/openai";
import { getAuthenticatedSession } from "@/lib/auth-utils";
import { rateLimit } from "@/lib/rate-limit";

const analyzeSchema = z.object({
  jobDescription: z.string().min(1).max(50_000),
  userSkills: z.array(z.string().max(100)).max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const rateLimited = rateLimit(req, { windowMs: 60_000, max: 10 });
    if (rateLimited) return rateLimited;

    const body = await req.json();
    const parsed = analyzeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { jobDescription, userSkills } = parsed.data;

    const result = await analyzeJobDescription(
      jobDescription,
      userSkills ?? []
    );

    return NextResponse.json({
      skills: result.skills.map((s) => s.name),
      matchScore: result.matchScore,
      summary: result.summary,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[analyze] Error:", msg);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
