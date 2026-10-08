import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeneratorControlsProps {
  isRolling: boolean;
  onGenerate: () => void;
}

export function GeneratorControls({
  isRolling,
  onGenerate,
}: GeneratorControlsProps) {
  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-3 sm:p-space-lg rounded-2xl flex flex-col gap-space-md shadow-sm">
      <div className="grid grid-cols-12 sm:flex sm:items-center gap-2 sm:gap-space-md">
        <Tooltip>
          <TooltipTrigger
            onClick={onGenerate}
            className="col-span-8 sm:flex-1 relative group bg-gradient-to-r from-primary to-primary-container text-white dark:from-primary dark:via-[#b0b2ff] dark:to-secondary dark:text-[#0a0914] font-headline-sm text-[14px] sm:text-headline-sm py-3 sm:py-3.5 px-3 sm:px-space-lg rounded-xl flex items-center justify-center gap-1.5 sm:gap-space-sm shadow-[0_4px_24px_rgba(73,75,214,0.3)] dark:shadow-[0_0_28px_rgba(128,131,255,0.4)] hover:shadow-[0_6px_28px_rgba(73,75,214,0.4)] dark:hover:shadow-[0_0_36px_rgba(128,131,255,0.6)] active:scale-[0.98] transition-all cursor-pointer font-bold"
            id="btnGenerate"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">bolt</span>
            <span className="tracking-wide truncate">Generate Prompt</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>Kompilasi variasi prompt baru (Shortcut: Space)</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={onGenerate}
            className="col-span-4 sm:w-auto bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest/60 text-on-surface font-body-sm sm:font-body-md text-[13px] sm:text-body-md py-3 sm:py-3.5 px-2.5 sm:px-space-md rounded-xl flex items-center justify-center gap-1 sm:gap-space-xs transition-all active:scale-[0.98] cursor-pointer"
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
            <span>Acak ulang latar lokasi &amp; lip-sync</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
}
