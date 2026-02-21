"use client";

import { MatchScore } from "@/components/MatchScore";
import { formatDate, getStatusColor } from "@/lib/utils";

interface JobCardProps {
  application: {
    id: string;
    title: string;
    company: string;
    status: string;
    matchScore: number | null;
    createdAt: string;
  };
}

export function JobCard({ application }: JobCardProps) {
  const { title, company, status, matchScore, createdAt } = application;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-400">{company}</p>
        </div>
        {matchScore !== null && <MatchScore score={matchScore} />}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
        >
          {status}
        </span>
        <span className="text-xs text-slate-500">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}
