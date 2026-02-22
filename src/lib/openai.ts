import OpenAI from "openai";

/**
 * Returns a lazily-initialized OpenAI client.
 * Throws at call time (not build time) if the key is missing.
 */
function getClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "Missing OPENAI_API_KEY environment variable. " +
        "Get one at https://platform.openai.com/api-keys"
    );
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ─── Skill Analysis ─────────────────────────────────────────────────────────

export interface AnalysisResult {
  skills: { name: string; category: string }[];
  matchScore: number;
  summary: string;
  suggestions: string[];
}

/**
 * Analyzes a job description against the user's skills,
 * returning extracted skills, a match score (0-100), and suggestions.
 */
export async function analyzeJobDescription(
  jobDescription: string,
  userSkills: string[]
): Promise<AnalysisResult> {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a career analyst AI. Analyze job descriptions and compare them against a candidate's skills.
Return a JSON object with:
- "skills": array of { "name": string, "category": string } extracted from the job description
- "matchScore": number 0-100 representing how well the candidate matches
- "summary": one-paragraph summary of the role
- "suggestions": array of strings with improvement suggestions

Categories: "technical", "soft", "domain", "tool", "language"
Only return valid JSON.`,
      },
      {
        role: "user",
        content: `Job Description:\n${jobDescription}\n\nCandidate Skills: ${userSkills.join(", ") || "Not specified"}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  return JSON.parse(content) as AnalysisResult;
}

// ─── Cover Letter Generation ────────────────────────────────────────────────

/**
 * Generates a tailored cover letter for a specific job application.
 */
export async function generateCoverLetter(params: {
  jobTitle: string;
  company: string;
  jobDescription: string;
  userSkills: string[];
  userName?: string;
}): Promise<string> {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `You are an expert career coach who writes compelling, personalized cover letters.
Write in a professional but warm tone. Be specific — reference the company and role.
Keep it to 3-4 paragraphs. Do not use generic filler phrases.

IMPORTANT FORMAT RULES:
- Start directly with "Dear Hiring Manager," — NO letter header, NO address block, NO date, NO placeholders like [Your Name] or [Your Address]
- End with "Best regards," followed by the candidate's name on the next line
- This is for online/email submission, NOT a physical letter
- Do NOT include any bracketed placeholders`,
      },
      {
        role: "user",
        content: `Write a cover letter for:
Role: ${params.jobTitle} at ${params.company}
Job Description: ${params.jobDescription}
My Skills: ${params.userSkills.join(", ") || "General professional skills"}
My Name: ${params.userName || "Kelson Brito"}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  return content;
}
