"use client";

import { useSession } from "next-auth/react";
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
import { useLang } from "@/lib/LanguageContext";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { lang, t, toggle: toggleLang } = useLang();

  const features = [
    { icon: Target, title: t.feat1Title, description: t.feat1Desc },
    { icon: FileText, title: t.feat2Title, description: t.feat2Desc },
    { icon: BarChart3, title: t.feat3Title, description: t.feat3Desc },
    { icon: Sparkles, title: t.feat4Title, description: t.feat4Desc },
  ];

  const stats = [
    { value: "0.3s", label: t.statTime },
    { value: "GPT-4o", label: t.statPowered },
    { value: "100%", label: t.statFree },
  ];

  const steps = [
    { step: "01", title: t.step1Title, desc: t.step1Desc },
    { step: "02", title: t.step2Title, desc: t.step2Desc },
    { step: "03", title: t.step3Title, desc: t.step3Desc },
  ];

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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-xs font-semibold text-[#f5f0eb] transition hover:border-white/20 hover:bg-[#242424]"
            >
              {lang === "en" ? "🇧🇷 PT" : "🇺🇸 EN"}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#f5f0eb] transition hover:border-white/20 hover:bg-[#242424]"
            >
              <Github className="h-4 w-4" />
              {t.signIn}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — dark navy */}
      <header className="bg-[#0a0a0a] px-6 pb-24 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-800 bg-amber-950 px-4 py-1.5 text-sm font-medium text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            {t.heroTagline}
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t.heroTitle1}
            <br />
            <span className="text-amber-400">{t.heroTitle2}</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#888]">
            {t.heroDesc}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-900/40 transition hover:bg-amber-400"
            >
              <Github className="h-5 w-5" />
              {t.getStartedFree}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a1a1a] px-8 py-3.5 text-base font-semibold text-[#f5f0eb] transition hover:border-white/20 hover:bg-[#242424]"
            >
              {t.seeDemo}
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
              {t.featuresTitle}
            </h2>
            <p className="text-[#888]">
              {t.featuresSub}
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
            {t.howTitle}
          </h2>
          <div className="space-y-6 text-left">
            {steps.map((item) => (
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
            {t.ctaTitle}
          </h2>
          <p className="mb-8 text-[#888]">
            {t.ctaSub}
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-900/40 transition hover:bg-amber-400"
          >
            <Github className="h-5 w-5" />
            {t.getStartedFree}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-8 text-center text-sm text-[#888]">
        <p>
          {t.footerText}{" "}
          <a
            href="https://github.com/kelsonbrito50/hireme-ai"
            className="text-amber-500 transition hover:text-amber-400"
          >
            {t.viewSource}
          </a>
        </p>
      </footer>
    </div>
  );
}
