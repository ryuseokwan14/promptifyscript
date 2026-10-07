import React from "react";

export function LiveStudioBar() {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-sm py-space-sm my-space-sm bg-surface-container-low border border-surface-container-high/40 rounded-xl px-space-md shadow-sm">
      <div className="flex items-center gap-space-sm flex-wrap">
        <div className="flex items-center gap-1.5 bg-surface-container-high px-space-sm py-1 rounded-full">
          <span className="material-symbols-outlined text-secondary text-[14px]">bolt</span>
          <span className="font-label-badge text-label-badge text-on-surface uppercase tracking-wider font-semibold">
            Prompt Assembler Studio
          </span>
        </div>
        <span className="text-outline-variant">•</span>
        <div className="flex items-center gap-1.5 font-label-code text-label-code text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">database</span>
          <span>Curated Bank Presets</span>
        </div>
      </div>
      <div className="flex items-center gap-space-sm font-label-code text-label-code text-on-surface-variant flex-wrap">
        <span className="bg-surface-container px-space-sm py-1 rounded-md text-on-surface border border-surface-container-high/40">
          Format: Video Vertikal 9:16
        </span>
      </div>
    </div>
  );
}
