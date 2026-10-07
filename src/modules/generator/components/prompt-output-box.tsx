import React from "react";
import { PromptState } from "../types/generator.types";

interface PromptOutputBoxProps {
  promptData: PromptState | null;
}

export function PromptOutputBox({ promptData }: PromptOutputBoxProps) {
  return (
    <div className="relative bg-surface-container-lowest border border-surface-container-high/40 rounded-xl p-space-md shadow-inner flex flex-col">
      <div className="flex items-center justify-between pb-space-xs mb-space-xs text-on-surface-variant font-label-code text-label-code border-b border-surface-container-high/20">
        <span className="flex items-center gap-1.5 text-primary">
          <span className="material-symbols-outlined text-[16px]">terminal</span>
          Prompt Siap Copy
        </span>
        <span className="text-on-surface-variant text-xs">Plain Text Format</span>
      </div>

      <div
        className="font-body-md text-[15px] text-on-surface leading-relaxed whitespace-pre-wrap select-all py-1 min-h-[140px]"
        id="promptOutput"
      >
        {promptData ? promptData.prompt : "Memuat prompt..."}
      </div>
    </div>
  );
}
