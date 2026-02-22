import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((ts) => now - ts < 300_000);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}, 300_000);

/**
 * Simple in-memory sliding window rate limiter.
 * Returns null if allowed, or a 429 NextResponse if rate-limited.
 */
export function rateLimit(
  req: NextRequest,
  opts: { windowMs: number; max: number }
): NextResponse | null {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const key = `${ip}:${req.nextUrl.pathname}`;
  const now = Date.now();

  const entry = store.get(key) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((ts) => now - ts < opts.windowMs);

  if (entry.timestamps.length >= opts.max) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  entry.timestamps.push(now);
  store.set(key, entry);
  return null;
}
