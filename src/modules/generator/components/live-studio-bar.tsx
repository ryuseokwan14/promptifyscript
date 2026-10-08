import React from "react";

export function LiveStudioBar() {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-space-sm py-2 sm:py-space-sm my-2 sm:my-space-sm bg-surface-container-low border border-surface-container-high/40 rounded-xl px-3 sm:px-space-md shadow-sm">
      <div className="flex flex-wrap items-center gap-2 sm:gap-space-sm">
        <div className="flex items-center gap-1.5 bg-surface-container-high px-2.5 py-1 rounded-full">
          <span className="material-symbols-outlined text-secondary text-[14px]">bolt</span>
          <span className="font-label-badge text-[11px] text-on-surface uppercase tracking-wider font-semibold">
            Prompt Assembler Studio
          </span>
        </div>
        <span className="hidden sm:inline text-outline-variant">•</span>
        <div className="flex items-center gap-1.5 font-label-code text-[12px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[15px] text-secondary">database</span>
          <span>Curated Bank Presets</span>
        </div>
      </div>
      <div className="flex items-center gap-space-sm font-label-code text-[11px] text-on-surface-variant">
        <span className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface border border-surface-container-high/40">
          Format: Video Vertikal 9:16
        </span>
      </div>
    </div>
  );
}
