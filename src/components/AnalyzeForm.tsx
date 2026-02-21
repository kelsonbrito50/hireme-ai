"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface AnalyzeFormProps {
  onApplicationCreated?: () => void;
}

export function AnalyzeForm({ onApplicationCreated }: AnalyzeFormProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    skills: string[];
    matchScore: number;
    summary: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        onApplicationCreated?.();
      }
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <form onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste a job description here…"
          rows={6}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !jobDescription.trim()}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-slate-300">{result.summary}</p>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium">
            Match Score:{" "}
            <span className="text-emerald-400">{result.matchScore}%</span>
          </p>
        </div>
      )}
    </div>
  );
}
