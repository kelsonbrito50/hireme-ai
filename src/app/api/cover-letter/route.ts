import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCoverLetter } from "@/lib/openai";
import { getAuthenticatedSession } from "@/lib/auth-utils";
import { rateLimit } from "@/lib/rate-limit";

const coverLetterSchema = z.object({
  jobTitle: z.string().min(1).max(500),
  company: z.string().min(1).max(500),
  jobDescription: z.string().min(1).max(50_000),
  userSkills: z.array(z.string().max(100)).max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const rateLimited = rateLimit(req, { windowMs: 60_000, max: 5 });
    if (rateLimited) return rateLimited;

    const body = await req.json();
    const parsed = coverLetterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { jobTitle, company, jobDescription, userSkills } = parsed.data;

    const coverLetter = await generateCoverLetter({
      jobTitle,
      company,
      jobDescription,
      userSkills: userSkills ?? [],
      userName: session.user.name ?? undefined,
    });

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("[cover-letter] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}
