"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ClipboardCopy, Sparkles, Save, FileText } from "lucide-react";

const steps = [
  {
    icon: ClipboardCopy,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    number: "1",
    title: "Find a job on LinkedIn or Indeed",
    desc: 'Open any job posting, select all the description text and copy it (Ctrl+A, Ctrl+C). The more text, the better the analysis.',
    tip: "💡 Tip: Copy the full post — requirements, responsibilities, benefits — everything.",
  },
  {
    icon: Sparkles,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    number: "2",
    title: 'Fill in the form and click "Analyze Job"',
    desc: 'Enter the job title, company name, and paste the full description. Click Analyze Job and wait ~5 seconds for the AI.',
    tip: "💡 The description needs at least 100 characters for an accurate analysis.",
  },
  {
    icon: Save,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    number: "3",
    title: "Read your match score and save",
    desc: "The AI returns a score from 0–100 showing how well your skills match the job, plus the required skills. Click Save Application to track it.",
    tip: "💡 Scores above 60% = strong candidate. Below 40% = skill gap to work on.",
  },
  {
    icon: FileText,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    number: "4",
    title: "Generate a tailored cover letter",
    desc: "Click Generate Cover Letter for an AI-written cover letter personalized to that specific job and company. Ready to copy and send.",
    tip: '💡 Each cover letter is unique — don\'t reuse the same one for every application.',
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/5"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-white">📖 How to use HireMe AI</span>
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">4 steps</span>
        </div>
        {open
          ? <ChevronUp className="h-4 w-4 text-slate-400" />
          : <ChevronDown className="h-4 w-4 text-slate-400" />
        }
      </button>

      {/* Steps — collapsible */}
      {open && (
        <div className="border-t border-white/10 px-6 py-5 grid gap-4 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${step.bg}`}>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">Step {step.number}</p>
                <p className="text-sm font-semibold text-white">{step.title}</p>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                <p className="mt-2 text-xs text-slate-500 italic">{step.tip}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
