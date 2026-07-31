"use client";

import { useEffect, useState } from "react";

export function ResumeBadge({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(284);

  useEffect(() => {
    fetch("/api/resume-count")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        setCount(284);
      });
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-3 py-1 text-xs font-medium text-[#5c5c5c] shadow-2xs ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        Downloaded <strong className="font-semibold text-[#111111]">{count ? `${count}+` : "284+"}</strong> times
      </span>
    </div>
  );
}

export function incrementResumeCount() {
  fetch("/api/resume-count", { method: "POST" }).catch(() => {});
}
