"use client";

import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { AnalyzeForm } from "@/components/AnalyzeForm";
import { Briefcase, TrendingUp, Calendar } from "lucide-react";

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
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

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
      color: "text-blue-400",
    },
    {
      label: "Avg Match Score",
      value: `${avgScore}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      label: "Interviews Scheduled",
      value: interviews,
      icon: Calendar,
      color: "text-amber-400",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Dashboard</h1>

        {/* Stats */}
        <div className="mb-10 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm text-slate-400">{stat.label}</span>
              </div>
              <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Analyze */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Analyze a Job</h2>
          <AnalyzeForm onApplicationCreated={fetchApplications} />
        </section>

        {/* Applications */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Your Applications</h2>
          {loading ? (
            <p className="text-slate-400">Loading…</p>
          ) : applications.length === 0 ? (
            <p className="text-slate-400">
              No applications yet. Analyze a job description to get started!
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <JobCard key={app.id} application={app} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
