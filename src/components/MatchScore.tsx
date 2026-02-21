"use client";

interface MatchScoreProps {
  score: number;
  size?: number;
}

export function MatchScore({ score, size = 56 }: MatchScoreProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score > 70
      ? "stroke-emerald-400"
      : score > 40
        ? "stroke-amber-400"
        : "stroke-red-400";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          className="text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${color} transition-[stroke-dashoffset] duration-700 ease-out`}
        />
      </svg>
      <span className="absolute text-xs font-semibold">{score}%</span>
    </div>
  );
}
