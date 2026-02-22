"use client";

import { useState } from "react";
import { Loader2, Sparkles, Save, FileText } from "lucide-react";
import { CoverLetterModal } from "@/components/CoverLetterModal";
import { useLang } from "@/lib/LanguageContext";

interface AnalyzeFormProps {
  onApplicationCreated?: () => void;
}

export function AnalyzeForm({ onApplicationCreated }: AnalyzeFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
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

  const { t } = useLang();

  const parseSkills = () =>
    skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

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
        body: JSON.stringify({
          jobDescription,
          userSkills: parseSkills(),
        }),
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
          userSkills: parseSkills(),
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
            placeholder={t.jobTitlePlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t.companyPlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500"
          />
        </div>

        {/* Skills input */}
        <input
          type="text"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder={t.skillsPlaceholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500"
        />

        {/* Job description */}
        <div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={6}
            className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 ${
              descTooShort ? "border-amber-500/50" : "border-white/10"
            }`}
          />
          <div className="mt-1 flex justify-between text-xs">
            {descTooShort ? (
              <span className="text-amber-400">{t.descTooShort}</span>
            ) : descLength >= MIN_DESC_LENGTH ? (
              <span className="text-amber-400">{t.descGood}</span>
            ) : (
              <span className="text-slate-500">{t.descHint}</span>
            )}
            <span className={descTooShort ? "text-amber-400" : "text-slate-500"}>
              {descLength}/{MIN_DESC_LENGTH} {t.minChars}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || descLength < MIN_DESC_LENGTH}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? t.analyzingBtn : t.analyzeBtn}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
          {/* Score */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">{result.matchScore}%</p>
              <p className="text-xs text-slate-500">{t.matchScore}</p>
            </div>
            <p className="flex-1 text-sm text-slate-300">{result.summary}</p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-300"
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
              {saved ? t.saved : saving ? t.saving : t.saveApplication}
            </button>

            <button
              onClick={handleCoverLetter}
              disabled={generating || !jobTitle.trim() || !company.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-400 disabled:opacity-50"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              {generating ? t.generating : t.generateCoverLetter}
            </button>
          </div>

          {(!jobTitle.trim() || !company.trim()) && (
            <p className="text-xs text-amber-400">
              {t.fillTitleCompany}
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
