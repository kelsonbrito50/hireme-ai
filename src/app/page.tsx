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
  { value: "GPT-4o", label: "Powered by OpenAI" },
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
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
              <Target className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">HireMe AI</span>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#f5f0eb] transition hover:border-white/20 hover:bg-[#242424]"
          >
            <Github className="h-4 w-4" />
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero — dark navy */}
      <header className="bg-[#0a0a0a] px-6 pb-24 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-800 bg-amber-950 px-4 py-1.5 text-sm font-medium text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by OpenAI
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Stop Guessing.
            <br />
            <span className="text-amber-400">Start Getting Hired.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#888]">
            HireMe AI analyzes job descriptions against your skills, gives you
            a real match score, and writes tailored cover letters in seconds.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-900/40 transition hover:bg-amber-400"
            >
              <Github className="h-5 w-5" />
              Get Started Free
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a1a1a] px-8 py-3.5 text-base font-semibold text-[#f5f0eb] transition hover:border-white/20 hover:bg-[#242424]"
            >
              See Demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-[#888]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="bg-[#111111] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#f5f0eb]">
              Everything your job search needs
            </h2>
            <p className="text-[#888]">
              Stop juggling spreadsheets. Let AI do the heavy lifting.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-none transition hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                  <feature.icon className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-[#f5f0eb]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
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
          <h2 className="mb-12 text-3xl font-bold text-[#f5f0eb]">
            Up and running in 60 seconds
          </h2>
          <div className="space-y-6 text-left">
            {[
              { step: "01", title: "Sign in with GitHub", desc: "One click. No forms. No credit card." },
              { step: "02", title: "Paste a job description", desc: "Copy from LinkedIn, Indeed, or any job board." },
              { step: "03", title: "Get your match score + cover letter", desc: "AI returns a 0–100 match score, extracted skills, and a tailored cover letter." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 rounded-2xl border border-white/10 bg-[#111111] p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-[#f5f0eb]">{item.title}</p>
                  <p className="mt-1 text-sm text-[#888]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <CheckCircle2 key={i} className="h-5 w-5 text-amber-400" />
            ))}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to land your next role?
          </h2>
          <p className="mb-8 text-[#888]">
            Join developers using HireMe AI to apply smarter, not harder.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-900/40 transition hover:bg-amber-400"
          >
            <Github className="h-5 w-5" />
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-8 text-center text-sm text-[#888]">
        <p>
          Built with Next.js · Prisma · OpenAI · Neon · MIT License ·{" "}
          <a
            href="https://github.com/kelsonbrito50/hireme-ai"
            className="text-amber-500 transition hover:text-amber-400"
          >
            View Source
          </a>
        </p>
      </footer>
    </div>
  );
}
