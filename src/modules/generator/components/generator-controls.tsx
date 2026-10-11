import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeneratorControlsProps {
  isRolling: boolean;
  canGenerate?: boolean;
  onGenerate: () => void;
  onReroll?: () => void;
}

export function GeneratorControls({
  isRolling,
  canGenerate = true,
  onGenerate,
  onReroll,
}: GeneratorControlsProps) {
  const handleRerollClick = onReroll || onGenerate;

  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-2.5 sm:p-3 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shadow-sm">
      <Tooltip>
        <TooltipTrigger
          onClick={canGenerate ? onGenerate : undefined}
          disabled={!canGenerate || isRolling}
          className={`flex-1 relative group font-headline-sm text-[14px] sm:text-[15px] h-12 px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
            canGenerate
              ? "bg-gradient-to-r from-primary to-primary-container text-white dark:from-primary dark:via-[#b0b2ff] dark:to-secondary dark:text-[#0a0914] shadow-[0_4px_24px_rgba(73,75,214,0.3)] dark:shadow-[0_0_24px_rgba(128,131,255,0.35)] hover:shadow-[0_6px_28px_rgba(73,75,214,0.45)] dark:hover:shadow-[0_0_32px_rgba(128,131,255,0.55)] active:scale-[0.99] cursor-pointer"
              : "bg-surface-container-high text-on-surface-variant/40 border border-surface-container-high cursor-not-allowed opacity-60"
          }`}
          id="btnGenerate"
        >
          <span className={`material-symbols-outlined text-[20px] sm:text-[22px] ${isRolling ? "animate-spin" : ""}`}>
            {isRolling ? "progress_activity" : "bolt"}
          </span>
          <span className="tracking-wide font-bold">
            {isRolling ? "Mengkompilasi Prompt..." : "Generate Prompt"}
          </span>
          {canGenerate && (
            <span className="hidden md:inline-block font-label-code text-[11px] bg-black/20 dark:bg-black/30 px-2 py-0.5 rounded ml-1 opacity-80">
              Space
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>
            {canGenerate
              ? "Kompilasi variasi prompt baru (Shortcut: Space)"
              : "Pilih Vibe Tempat terlebih dahulu di Langkah 2"}
          </span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          onClick={canGenerate ? handleRerollClick : undefined}
          disabled={!canGenerate || isRolling}
          className={`sm:w-auto h-12 px-4 rounded-xl font-headline-sm text-[13px] sm:text-sm flex items-center justify-center gap-2 transition-all ${
            canGenerate
              ? "bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest/60 text-on-surface active:scale-[0.98] cursor-pointer shadow-xs"
              : "bg-surface-container-high/40 text-on-surface-variant/40 border border-surface-container-high cursor-not-allowed opacity-60"
          }`}
          id="btnReroll"
        >
          <span
            className={`material-symbols-outlined text-[19px] text-secondary transition-transform duration-300 ${
              isRolling ? "rotate-180" : ""
            }`}
          >
            casino
          </span>
          <span className="font-semibold">Re-roll Acak</span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>Acak ulang latar lokasi &amp; dialog script</span>
        </TooltipContent>
      </Tooltip>
    </section>
  );
}

