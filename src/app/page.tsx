"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Sparkles,
  FileText,
  Target,
  BarChart3,
  ArrowRight,
  Github,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Skill Matching",
    description:
      "AI analyzes job descriptions and calculates how well your skills match — instantly.",
  },
  {
    icon: FileText,
    title: "Cover Letter Generator",
    description:
      "Generate tailored, compelling cover letters that reference specific role requirements.",
  },
  {
    icon: BarChart3,
    title: "Application Dashboard",
    description:
      "Track every application from saved → applied → interviewing → offered in one place.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Get actionable suggestions on skills to learn and how to strengthen your profile.",
  },
];

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Powered by GPT-4
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Land Your Dream Job
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              with AI on Your Side
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            HireMe AI analyzes job descriptions, matches them against your
            skills, and generates tailored cover letters — so you can focus on
            what matters: preparing for interviews.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => signIn("github")}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-gray-800"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </button>
            <button
              onClick={() => signIn("google")}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Continue with Google
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
          Everything you need to track your job search
        </h2>
        <p className="mb-16 text-center text-gray-600">
          Stop juggling spreadsheets. Let AI do the heavy lifting.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-500">
        <p>
          Built with Next.js, Prisma, and OpenAI · MIT License ·{" "}
          <a
            href="https://github.com/yourusername/hireme-ai"
            className="underline hover:text-gray-700"
          >
            View Source
          </a>
        </p>
      </footer>
    </div>
  );
}
