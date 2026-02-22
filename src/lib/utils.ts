import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date for display */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/** Get status color for badges (dark-theme) */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    SAVED: "bg-slate-500/20 text-slate-300",
    APPLIED: "bg-blue-500/20 text-blue-300",
    INTERVIEWING: "bg-brand-500/20 text-brand-300",
    OFFERED: "bg-emerald-500/20 text-emerald-300",
    REJECTED: "bg-red-500/20 text-red-400",
    WITHDRAWN: "bg-purple-500/20 text-purple-300",
  };
  return colors[status] ?? "bg-slate-500/20 text-slate-300";
}
