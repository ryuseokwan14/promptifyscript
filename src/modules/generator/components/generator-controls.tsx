import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeneratorControlsProps {
  isRolling: boolean;
  canGenerate?: boolean;
  includeAction?: boolean;
  onToggleAction?: (val: boolean) => void;
  onGenerate: () => void;
}

export function GeneratorControls({
  isRolling,
  canGenerate = true,
  includeAction = false,
  onToggleAction,
  onGenerate,
}: GeneratorControlsProps) {
  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-2 sm:p-3 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shadow-sm">
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

      {/* Toggle Sakelar Mode Aksi Dinamis */}
      <Tooltip>
        <TooltipTrigger
          type="button"
          onClick={() => onToggleAction && onToggleAction(!includeAction)}
          className={`h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl font-headline-sm text-[13px] sm:text-sm flex items-center justify-between sm:justify-center gap-2.5 transition-all border cursor-pointer select-none ${
            includeAction
              ? "bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.15)]"
              : "bg-surface-container-high/60 hover:bg-surface-container-high border-surface-container-highest/60 text-on-surface-variant hover:text-on-surface"
          }`}
          id="btnToggleAction"
        >
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[19px] transition-colors ${
                includeAction ? "text-amber-400" : "text-outline"
              }`}
            >
              directions_run
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center text-left sm:text-center leading-tight">
              <span className="font-semibold whitespace-nowrap">
                {includeAction ? "+ Aksi Model" : "Tempat Saja"}
              </span>
              <span className="text-[10px] text-on-surface-variant/70 sm:hidden">
                {includeAction ? "Aksi dinamis model aktif" : "Formula natural klasik"}
              </span>
            </div>
          </div>

          <div
            className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
              includeAction ? "bg-amber-500" : "bg-surface-container-highest"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                includeAction ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>
            {includeAction
              ? "Mode Aksi Aktif: Menyertakan kegiatan dinamis model (jogging, panjat tebing, dll)"
              : "Mode Tempat Saja: Prompt klasik natural tanpa variasi aksi dinamis"}
          </span>
        </TooltipContent>
      </Tooltip>
    </section>
  );
}

