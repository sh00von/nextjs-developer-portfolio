"use client";

import { useState } from "react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1.5 pr-1.5 pl-4 font-mono text-[13px] text-[var(--text)]">
      <span className="select-none text-[var(--muted-3)]">$</span>
      <code className="min-w-0 flex-1 truncate">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="grid h-8 min-w-8 shrink-0 place-items-center rounded-md px-2 text-xs font-medium text-[var(--muted-3)] transition-colors hover:bg-white hover:text-[var(--text)]"
        aria-label={copied ? "Copied" : `Copy command: ${command}`}
      >
        {copied ? (
          <span className="text-[var(--accent-strong)]">Copied</span>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
