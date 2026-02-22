"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { JobCard } from "@/components/JobCard";
import { AnalyzeForm } from "@/components/AnalyzeForm";
import { HowItWorks } from "@/components/HowItWorks";
import { useLang } from "@/lib/LanguageContext";
import {
  Briefcase,
  TrendingUp,
  Calendar,
  Github,
  LogOut,
  ChevronDown,
  Sparkles,
  Download,
  Users,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface Application {
  id: string;
  title: string;
  company: string;
  status: string;
  matchScore: number | null;
  createdAt: string;
  url: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { lang, t, toggle: toggleLang } = useLang();

  // Redirect unauthenticated users to landing page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const totalApps = applications.length;
  const avgScore =
    applications.filter((a) => a.matchScore !== null).length > 0
      ? Math.round(
          applications
            .filter((a) => a.matchScore !== null)
            .reduce((sum, a) => sum + (a.matchScore ?? 0), 0) /
            applications.filter((a) => a.matchScore !== null).length
        )
      : 0;
  const interviews = applications.filter(
    (a) => a.status === "INTERVIEWING"
  ).length;

  const exportToCSV = () => {
    const headers = ["Job Title", "Company", "Status", "Match Score (%)", "Date Applied"];
    const rows = applications.map((a) => [
      `"${a.title}"`,
      `"${a.company}"`,
      a.status,
      a.matchScore ?? "N/A",
      new Date(a.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hireme-ai-applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      label: t.totalApplications,
      value: totalApps,
      icon: Briefcase,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: t.avgMatchScore,
      value: `${avgScore}%`,
      icon: TrendingUp,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: t.interviews,
      value: interviews,
      icon: Calendar,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="HireMe" width={32} height={32} className="rounded-lg object-cover" />
            <span className="text-lg font-bold text-white">HireMe AI</span>
            <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
              Beta
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10"
              title="Toggle language / Alternar idioma"
            >
              {lang === "en" ? "🇧🇷 PT" : "🇺🇸 EN"}
            </button>
            {status === "loading" ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/10"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                      {session.user?.name?.[0] ?? "U"}
                    </div>
                  )}
                  <span className="hidden sm:inline">
                    {session.user?.name?.split(" ")[0] ?? "User"}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#141414] py-1 shadow-xl">
                    <div className="border-b border-white/10 px-4 py-2">
                      <p className="text-sm font-medium text-white">
                        {session.user?.name}
                      </p>
                      {session.user?.login && (
                        <p className="text-xs text-amber-400">@{session.user.login}</p>
                      )}
                      <p className="text-xs text-slate-400">{session.user?.email}</p>
                    </div>
                    {session.user?.githubUrl && (
                      <a
                        href={session.user.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
                      >
                        <Github className="h-4 w-4" />
                        {t.viewGithub}
                        <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                      </a>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 transition hover:bg-white/5"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {session
              ? t.welcomeBack(session.user?.name?.split(" ")[0] ?? "")
              : t.dashboardTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-400">{t.dashboardSub}</p>
        </div>

        {/* GitHub Profile Card */}
        {session?.user?.login && (
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="GitHub avatar"
                width={56}
                height={56}
                className="rounded-full ring-2 ring-amber-500/30"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-white">{session.user.name}</p>
                <a
                  href={session.user.githubUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  @{session.user.login}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              {session.user.bio && (
                <p className="mt-0.5 text-sm text-slate-400 truncate">{session.user.bio}</p>
              )}
              {session.user.company && (
                <p className="text-xs text-slate-500 mt-0.5">🏢 {session.user.company}</p>
              )}
            </div>
            <div className="flex gap-5 text-center">
              <div>
                <p className="text-lg font-bold text-white">{session.user.publicRepos ?? 0}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <BookOpen className="h-3 w-3" />
                  {t.repos}
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{session.user.followers ?? 0}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Users className="h-3 w-3" />
                  {t.followers}
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{session.user.following ?? 0}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Github className="h-3 w-3" />
                  {t.following}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works guide */}
        <HowItWorks />

        {/* Analyze section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">{t.analyzeSection}</h2>
          </div>
          <AnalyzeForm onApplicationCreated={fetchApplications} />
        </section>

        {/* Applications */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-white">
                {t.applicationsSection}
              </h2>
              {totalApps > 0 && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-400">
                  {totalApps}
                </span>
              )}
            </div>
            {totalApps > 0 && (
              <button
                onClick={exportToCSV}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10"
                title="Export applications to CSV"
              >
                <Download className="h-3.5 w-3.5" />
                {t.exportCsv}
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <Briefcase className="mb-3 h-10 w-10 text-slate-600" />
              <p className="text-slate-400">{t.noApplications}</p>
              <p className="mt-1 text-sm text-slate-500">{t.noApplicationsSub}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <JobCard key={app.id} application={app} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
