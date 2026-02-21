import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: { skills: true },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("[applications:GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, company, url, description, status, matchScore, skills, userId } =
      body as {
        title: string;
        company: string;
        url?: string;
        description: string;
        status?: string;
        matchScore?: number;
        skills?: string[];
        userId: string;
      };

    if (!title || !company || !description || !userId) {
      return NextResponse.json(
        { error: "title, company, description, and userId are required" },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        title,
        company,
        url: url ?? null,
        description,
        status: (status as "SAVED") ?? "SAVED",
        matchScore: matchScore ?? null,
        userId,
        skills: skills
          ? {
              create: skills.map((name) => ({
                name,
                category: "technical",
              })),
            }
          : undefined,
      },
      include: { skills: true },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("[applications:POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
