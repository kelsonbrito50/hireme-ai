"use client";

import { useState } from "react";
import { Loader2, Sparkles, Save, FileText } from "lucide-react";
import { CoverLetterModal } from "@/components/CoverLetterModal";

interface AnalyzeFormProps {
  onApplicationCreated?: () => void;
}

export function AnalyzeForm({ onApplicationCreated }: AnalyzeFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [result, setResult] = useState<{
    skills: string[];
    matchScore: number;
    summary: string;
  } | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Candidate skills used for match score calculation
  const USER_SKILLS = [
    "Python", "Django", "Django REST Framework", "React", "JavaScript",
    "TypeScript", "PostgreSQL", "Docker", "GitHub Actions", "AWS S3",
    "Redis", "Celery", "JWT", "TailwindCSS", "HTML5", "CSS3", "Git",
    "Next.js", "Node.js", "REST API", "CI/CD", "OWASP", "Pytest",
  ];

  const MIN_DESC_LENGTH = 100;
  const descLength = jobDescription.trim().length;
  const descTooShort = descLength > 0 && descLength < MIN_DESC_LENGTH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || descLength < MIN_DESC_LENGTH) return;

    setLoading(true);
    setResult(null);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, userSkills: USER_SKILLS }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error ?? "Analysis failed. Try again.");
      }
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result || !jobTitle.trim() || !company.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitle,
          company,
          description: jobDescription,
          matchScore: result.matchScore,
          skills: result.skills,
          userId: "guest",
        }),
      });
      if (res.ok) {
        setSaved(true);
        onApplicationCreated?.();
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCoverLetter = async () => {
    if (!result || !jobTitle.trim() || !company.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          company,
          jobDescription,
          userSkills: USER_SKILLS,
          userName: "Kelson Brito",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCoverLetter(data.coverLetter);
      }
    } catch (err) {
      console.error("Cover letter failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title + Company row */}
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job title (e.g. Senior React Developer)"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500"
          />
        </div>

        {/* Job description */}
        <div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here (requirements, responsibilities, etc.)…"
            rows={6}
            className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500 ${
              descTooShort ? "border-amber-500/50" : "border-white/10"
            }`}
          />
          <div className="mt-1 flex justify-between text-xs">
            {descTooShort ? (
              <span className="text-amber-400">⚠️ Paste the full job description for accurate results</span>
            ) : descLength >= MIN_DESC_LENGTH ? (
              <span className="text-teal-400">✓ Good — description is long enough</span>
            ) : (
              <span className="text-slate-500">Paste the complete job description from LinkedIn/Indeed</span>
            )}
            <span className={descTooShort ? "text-amber-400" : "text-slate-500"}>
              {descLength}/{MIN_DESC_LENGTH} min chars
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || descLength < MIN_DESC_LENGTH}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-400 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? "Analyzing…" : "Analyze Job"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
          {/* Score */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-400">{result.matchScore}%</p>
              <p className="text-xs text-slate-500">Match Score</p>
            </div>
            <p className="flex-1 text-sm text-slate-300">{result.summary}</p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-teal-500/20 px-3 py-1 text-xs text-teal-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              disabled={saving || saved || !jobTitle.trim() || !company.trim()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved ✓" : saving ? "Saving…" : "Save Application"}
            </button>

            <button
              onClick={handleCoverLetter}
              disabled={generating || !jobTitle.trim() || !company.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-400 disabled:opacity-50"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              {generating ? "Generating…" : "Generate Cover Letter"}
            </button>
          </div>

          {(!jobTitle.trim() || !company.trim()) && (
            <p className="text-xs text-amber-400">
              ⚠️ Fill in job title and company above to save or generate a cover letter.
            </p>
          )}
        </div>
      )}

      {/* Cover Letter Modal */}
      {coverLetter && (
        <CoverLetterModal
          coverLetter={coverLetter}
          onClose={() => setCoverLetter(null)}
        />
      )}
    </div>
  );
}
