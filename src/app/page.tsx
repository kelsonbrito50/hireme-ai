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
  CheckCircle2,
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

const stats = [
  { value: "0.3s", label: "Average analysis time" },
  { value: "GPT-4", label: "Powered by OpenAI" },
  { value: "100%", label: "Free to use" },
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
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500">
              <Target className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">HireMe AI</span>
          </div>
          <button
            onClick={() => signIn("github")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700"
          >
            <Github className="h-4 w-4" />
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero — dark navy */}
      <header className="bg-slate-900 px-6 pb-24 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-800 bg-teal-950 px-4 py-1.5 text-sm font-medium text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by GPT-4
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Stop Guessing.
            <br />
            <span className="text-teal-400">Start Getting Hired.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            HireMe AI analyzes job descriptions against your skills, gives you
            a real match score, and writes tailored cover letters in seconds.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => signIn("github")}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition hover:bg-teal-400"
            >
              <Github className="h-5 w-5" />
              Get Started Free
            </button>
            <button
              onClick={() => signIn("github")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-8 py-3.5 text-base font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-700"
            >
              See Demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-800 pt-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Everything your job search needs
            </h2>
            <p className="text-slate-500">
              Stop juggling spreadsheets. Let AI do the heavy lifting.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                  <feature.icon className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-slate-900">
            Up and running in 60 seconds
          </h2>
          <div className="space-y-6 text-left">
            {[
              { step: "01", title: "Sign in with GitHub", desc: "One click. No forms. No credit card." },
              { step: "02", title: "Paste a job description", desc: "Copy from LinkedIn, Indeed, or any job board." },
              { step: "03", title: "Get your match score + cover letter", desc: "AI returns a 0–100 match score, extracted skills, and a tailored cover letter." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <CheckCircle2 key={i} className="h-5 w-5 text-teal-400" />
            ))}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to land your next role?
          </h2>
          <p className="mb-8 text-slate-400">
            Join developers using HireMe AI to apply smarter, not harder.
          </p>
          <button
            onClick={() => signIn("github")}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition hover:bg-teal-400"
          >
            <Github className="h-5 w-5" />
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-8 text-center text-sm text-slate-500">
        <p>
          Built with Next.js · Prisma · OpenAI · Neon · MIT License ·{" "}
          <a
            href="https://github.com/kelsonbrito50/hireme-ai"
            className="text-teal-500 transition hover:text-teal-400"
          >
            View Source
          </a>
        </p>
      </footer>
    </div>
  );
}
