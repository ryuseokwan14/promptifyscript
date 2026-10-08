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
    <section className="bg-surface-container-low border border-surface-container-high/40 p-3 sm:p-space-lg rounded-2xl flex flex-col gap-space-md shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-1.5">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold">
            3. Kompilasi Prompt
          </span>
          {!canGenerate && (
            <span className="font-label-code text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              Pilih Vibe Dahulu
            </span>
          )}
        </div>
        <span className="font-body-sm text-[11.5px] sm:text-body-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
          Siap Kompilasi AI
        </span>
      </div>

      <div className="grid grid-cols-12 sm:flex sm:items-center gap-2 sm:gap-space-md">
        <Tooltip>
          <TooltipTrigger
            onClick={canGenerate ? onGenerate : undefined}
            disabled={!canGenerate}
            className={`col-span-8 sm:flex-1 relative group font-headline-sm text-[14px] sm:text-headline-sm py-3 sm:py-3.5 px-3 sm:px-space-lg rounded-xl flex items-center justify-center gap-1.5 sm:gap-space-sm font-bold transition-all ${
              canGenerate
                ? "bg-gradient-to-r from-primary to-primary-container text-white dark:from-primary dark:via-[#b0b2ff] dark:to-secondary dark:text-[#0a0914] shadow-[0_4px_24px_rgba(73,75,214,0.3)] dark:shadow-[0_0_28px_rgba(128,131,255,0.4)] hover:shadow-[0_6px_28px_rgba(73,75,214,0.4)] dark:hover:shadow-[0_0_36px_rgba(128,131,255,0.6)] active:scale-[0.98] cursor-pointer"
                : "bg-surface-container-high text-on-surface-variant/40 border border-surface-container-high cursor-not-allowed opacity-60"
            }`}
            id="btnGenerate"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">bolt</span>
            <span className="tracking-wide truncate">Generate Prompt</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>
              {canGenerate
                ? "Kompilasi variasi prompt baru (Shortcut: Space)"
                : "Silakan pilih Vibe Tempat terlebih dahulu di Langkah 2"}
            </span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={canGenerate ? handleRerollClick : undefined}
            disabled={!canGenerate || isRolling}
            className={`col-span-4 sm:w-auto font-body-sm sm:font-body-md text-[13px] sm:text-body-md py-3 sm:py-3.5 px-2.5 sm:px-space-md rounded-xl flex items-center justify-center gap-1 sm:gap-space-xs transition-all ${
              canGenerate
                ? "bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest/60 text-on-surface active:scale-[0.98] cursor-pointer"
                : "bg-surface-container-high/40 text-on-surface-variant/40 border border-surface-container-high cursor-not-allowed opacity-60"
            }`}
            id="btnReroll"
          >
            <span
              className={`material-symbols-outlined text-[18px] sm:text-[20px] text-secondary transition-transform duration-300 ${
                isRolling ? "rotate-180" : ""
              }`}
            >
              casino
            </span>
            <span className="truncate">Re-roll</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>
              {canGenerate
                ? "Acak ulang latar lokasi & lip-sync"
                : "Pilih Vibe Tempat terlebih dahulu"}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
}

