/**
 * Tests for src/lib/utils.ts
 * Covers: cn (class merging), formatDate, getStatusColor
 */
import { cn, formatDate, getStatusColor } from "@/lib/utils";

// ---------------------------------------------------------------------------
// cn — Tailwind class merging
// ---------------------------------------------------------------------------

describe("cn()", () => {
  it("returns a string for a single class", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple classes", () => {
    const result = cn("px-4", "py-2", "text-white");
    expect(result).toContain("px-4");
    expect(result).toContain("py-2");
    expect(result).toContain("text-white");
  });

  it("deduplicates conflicting Tailwind classes (last wins)", () => {
    // tailwind-merge: p-4 overrides px-2
    const result = cn("px-2", "p-4");
    expect(result).toBe("p-4");
  });

  it("ignores falsy values", () => {
    const result = cn("foo", false && "bar", undefined, null as unknown as string, "baz");
    expect(result).toBe("foo baz");
  });

  it("handles conditional classes", () => {
    const active = true;
    const result = cn("base", active ? "active" : "inactive");
    expect(result).toBe("base active");
  });
});

// ---------------------------------------------------------------------------
// formatDate
// ---------------------------------------------------------------------------

describe("formatDate()", () => {
  it("formats a Date object", () => {
    // Use a fixed UTC date to avoid timezone drift in CI
    const date = new Date("2024-06-15T12:00:00Z");
    const result = formatDate(date);
    // Should contain the year
    expect(result).toContain("2024");
    // Should contain the month abbreviation
    expect(result).toMatch(/Jun/);
  });

  it("formats an ISO date string", () => {
    const result = formatDate("2025-01-20T00:00:00Z");
    expect(result).toContain("2025");
  });

  it("returns a non-empty string", () => {
    expect(formatDate(new Date())).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// getStatusColor
// ---------------------------------------------------------------------------

describe("getStatusColor()", () => {
  const knownStatuses = [
    "SAVED",
    "APPLIED",
    "INTERVIEWING",
    "OFFERED",
    "REJECTED",
    "WITHDRAWN",
  ] as const;

  it.each(knownStatuses)("returns a non-empty class string for status %s", (s) => {
    const result = getStatusColor(s);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns a default class for an unknown status", () => {
    const result = getStatusColor("UNKNOWN_STATUS");
    expect(result).toContain("slate");
  });

  it("OFFERED returns emerald color", () => {
    expect(getStatusColor("OFFERED")).toContain("emerald");
  });

  it("REJECTED returns red color", () => {
    expect(getStatusColor("REJECTED")).toContain("red");
  });

  it("APPLIED returns blue color", () => {
    expect(getStatusColor("APPLIED")).toContain("blue");
  });
});
