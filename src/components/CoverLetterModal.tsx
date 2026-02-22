"use client";

import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

interface CoverLetterModalProps {
  coverLetter: string;
  onClose: () => void;
}

export function CoverLetterModal({
  coverLetter,
  onClose,
}: CoverLetterModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Generated Cover Letter
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: "60vh" }}>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
            {coverLetter}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-white/10 px-6 py-4">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
