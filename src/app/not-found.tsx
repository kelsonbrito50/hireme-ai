import Link from "next/link";
import { Target } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500">
        <Target className="h-8 w-8 text-white" />
      </div>
      <h1 className="mb-2 text-6xl font-bold text-white">404</h1>
      <p className="mb-8 text-slate-400">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-xl bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-400"
      >
        Back to Home
      </Link>
    </div>
  );
}
