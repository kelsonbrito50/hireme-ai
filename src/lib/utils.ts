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

/** Get status color for badges */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    SAVED: "bg-gray-100 text-gray-800",
    APPLIED: "bg-blue-100 text-blue-800",
    INTERVIEWING: "bg-yellow-100 text-yellow-800",
    OFFERED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    WITHDRAWN: "bg-purple-100 text-purple-800",
  };
  return colors[status] ?? "bg-gray-100 text-gray-800";
}
