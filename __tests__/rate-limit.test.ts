/**
 * Tests for src/lib/rate-limit.ts
 * Validates sliding-window in-memory rate limiter behaviour.
 */
import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(ip: string, path = "/api/test"): NextRequest {
  const req = new NextRequest(`http://localhost${path}`, {
    headers: { "x-forwarded-for": ip },
  });
  return req;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("rateLimit()", () => {
  const OPTS = { windowMs: 60_000, max: 3 };

  it("allows requests under the limit", () => {
    const req = makeRequest("10.0.0.1", "/api/under");
    const result1 = rateLimit(req, OPTS);
    expect(result1).toBeNull();
  });

  it("returns null (allowed) for first requests up to max", () => {
    const ip = "10.0.0.2";
    for (let i = 0; i < OPTS.max; i++) {
      const result = rateLimit(makeRequest(ip, "/api/burst"), OPTS);
      expect(result).toBeNull();
    }
  });

  it("returns a 429 response after exceeding the limit", () => {
    const ip = "10.0.0.3";
    const path = "/api/limited";
    // Fill up the window
    for (let i = 0; i < OPTS.max; i++) {
      rateLimit(makeRequest(ip, path), OPTS);
    }
    // Next request should be blocked
    const blocked = rateLimit(makeRequest(ip, path), OPTS);
    expect(blocked).not.toBeNull();
    expect(blocked!.status).toBe(429);
  });

  it("returns a JSON body with an error message on 429", async () => {
    const ip = "10.0.0.4";
    const path = "/api/json-err";
    for (let i = 0; i < OPTS.max; i++) {
      rateLimit(makeRequest(ip, path), OPTS);
    }
    const blocked = rateLimit(makeRequest(ip, path), OPTS);
    const body = await blocked!.json();
    expect(body).toHaveProperty("error");
    expect(typeof body.error).toBe("string");
  });

  it("tracks different IPs independently", () => {
    const path = "/api/indep";
    const ip1 = "192.168.1.10";
    const ip2 = "192.168.1.11";

    // Exhaust ip1
    for (let i = 0; i < OPTS.max; i++) {
      rateLimit(makeRequest(ip1, path), OPTS);
    }

    // ip2 should still be allowed
    const result = rateLimit(makeRequest(ip2, path), OPTS);
    expect(result).toBeNull();
  });

  it("tracks different paths independently for the same IP", () => {
    const ip = "10.0.0.5";
    // Exhaust path A
    for (let i = 0; i < OPTS.max; i++) {
      rateLimit(makeRequest(ip, "/api/path-a"), OPTS);
    }
    // Path B should still be allowed
    const result = rateLimit(makeRequest(ip, "/api/path-b"), OPTS);
    expect(result).toBeNull();
  });

  it("uses x-real-ip header as fallback", () => {
    const req = new NextRequest("http://localhost/api/realip", {
      headers: { "x-real-ip": "172.16.0.1" },
    });
    const result = rateLimit(req, { windowMs: 60_000, max: 5 });
    expect(result).toBeNull();
  });

  it("uses 'unknown' when no IP header present", () => {
    const req = new NextRequest("http://localhost/api/noip");
    const result = rateLimit(req, { windowMs: 60_000, max: 5 });
    expect(result).toBeNull();
  });
});
