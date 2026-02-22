"use client";

import React from "react";
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ClipboardCopy, Sparkles, Save, FileText } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

const stepIcons = [ClipboardCopy, Sparkles, Save, FileText];
const stepColors = [
  { color: "text-amber-400", bg: "bg-amber-400/10" },
  { color: "text-amber-400", bg: "bg-amber-400/10" },
  { color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { color: "text-orange-400", bg: "bg-orange-400/10" },
];

export function HowItWorks() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const steps = t.steps.map((s: {title:string;desc:string;tip:string}, i: number) => ({
    ...s,
    icon: stepIcons[i],
    ...stepColors[i],
    number: String(i + 1),
  }));

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/5"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-white">📖 {t.howItWorksTitle}</span>
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
          {steps.map((step: {icon: React.ElementType; color: string; bg: string; number: string; title: string; desc: string; tip: string}) => (
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
