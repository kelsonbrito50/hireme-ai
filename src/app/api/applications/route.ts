import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth-utils";

const VALID_STATUSES = [
  "SAVED",
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
  "WITHDRAWN",
] as const;

const createApplicationSchema = z.object({
  title: z.string().min(1).max(500),
  company: z.string().min(1).max(500),
  url: z.string().url().max(2000).optional().nullable(),
  description: z.string().min(1).max(50_000),
  status: z.enum(VALID_STATUSES).optional(),
  matchScore: z.number().min(0).max(100).optional().nullable(),
  skills: z.array(z.string().max(100)).max(100).optional(),
});

export async function GET() {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const applications = await prisma.jobApplication.findMany({
      where: { userId: session.user.id },
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
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const body = await req.json();
    const parsed = createApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { title, company, url, description, status, matchScore, skills } =
      parsed.data;

    const application = await prisma.jobApplication.create({
      data: {
        title,
        company,
        url: url ?? null,
        description,
        status: status ?? "SAVED",
        matchScore: matchScore ?? null,
        userId: session.user.id,
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
