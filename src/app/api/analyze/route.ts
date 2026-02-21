import { NextRequest, NextResponse } from "next/server";
import { analyzeJobDescription } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobDescription, userSkills } = body as {
      jobDescription?: string;
      userSkills?: string[];
    };

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "jobDescription is required" },
        { status: 400 }
      );
    }

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
    console.error("[analyze] Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze job description" },
      { status: 500 }
    );
  }
}
