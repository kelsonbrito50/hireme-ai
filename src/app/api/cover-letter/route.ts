import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, company, jobDescription, userSkills, userName } =
      body as {
        jobTitle?: string;
        company?: string;
        jobDescription?: string;
        userSkills?: string[];
        userName?: string;
      };

    if (!jobDescription || !jobTitle || !company) {
      return NextResponse.json(
        { error: "jobTitle, company, and jobDescription are required" },
        { status: 400 }
      );
    }

    const coverLetter = await generateCoverLetter({
      jobTitle,
      company,
      jobDescription,
      userSkills: userSkills ?? [],
      userName,
    });

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("[cover-letter] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
