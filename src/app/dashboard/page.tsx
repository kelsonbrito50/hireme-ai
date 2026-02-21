"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { JobCard } from "@/components/JobCard";
import { AnalyzeForm } from "@/components/AnalyzeForm";
import {
  Briefcase,
  TrendingUp,
  Calendar,
  Target,
  Github,
  LogOut,
  ChevronDown,
  Sparkles,
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
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

  const stats = [
    {
      label: "Total Applications",
      value: totalApps,
      icon: Briefcase,
      color: "text-teal-400",
      bg: "bg-teal-400/10",
    },
    {
      label: "Avg Match Score",
      value: `${avgScore}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: Calendar,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500">
              <Target className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">HireMe AI</span>
            <span className="ml-1 rounded-full bg-teal-500/20 px-2 py-0.5 text-xs font-medium text-teal-400">
              Beta
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
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
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                      {session.user?.name?.[0] ?? "U"}
                    </div>
                  )}
                  <span className="hidden sm:inline">
                    {session.user?.name?.split(" ")[0] ?? "User"}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#1e293b] py-1 shadow-xl">
                    <div className="border-b border-white/10 px-4 py-2">
                      <p className="text-sm font-medium text-white">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {session.user?.email}
                      </p>
                    </div>
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
            ) : (
              <button
                onClick={() => signIn("github")}
                className="flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-400"
              >
                <Github className="h-4 w-4" />
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {session
              ? `Welcome back, ${session.user?.name?.split(" ")[0]} 👋`
              : "Your Dashboard"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Analyze jobs, track applications, and generate cover letters with AI.
          </p>
        </div>

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

        {/* Analyze section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-400" />
            <h2 className="text-lg font-semibold text-white">Analyze a Job</h2>
          </div>
          <AnalyzeForm onApplicationCreated={fetchApplications} />
        </section>

        {/* Applications */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-white">
                Your Applications
              </h2>
              {totalApps > 0 && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-400">
                  {totalApps}
                </span>
              )}
            </div>
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
              <p className="text-slate-400">No applications yet.</p>
              <p className="mt-1 text-sm text-slate-500">
                Analyze a job description above to get started.
              </p>
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
