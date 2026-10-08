import React from "react";
import { toast } from "sonner";
import { GenerationResult } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GeneratedPromptStudioProps {
  result: GenerationResult | null;
  onReroll: () => void;
  isRolling?: boolean;
}

const VIBE_LABELS: Record<string, string> = {
  universal: "Universal",
  casual_aesthetic: "Casual Aesthetic",
  urban_adventure: "Urban Adventure",
};

export function GeneratedPromptStudio({
  result,
  onReroll,
  isRolling = false,
}: GeneratedPromptStudioProps) {
  const handleCopy = () => {
    if (!result?.prompt) {
      toast.error("Tidak ada prompt untuk disalin");
      return;
    }
    navigator.clipboard
      .writeText(result.prompt)
      .then(() => {
        toast.success("Prompt berhasil disalin ke clipboard!", {
          description: "Siap langsung di-paste ke generator video AI pilihan Anda.",
        });
      })
      .catch(() => toast.error("Gagal menyalin prompt ke clipboard"));
  };

  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-3 sm:p-space-md rounded-2xl flex flex-col gap-space-md shadow-md min-h-[440px]">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-surface-container-high/30">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              result ? "bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.6)] animate-pulse" : "bg-outline/50"
            }`}
          />
          <h2 className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold">
            Generated Prompt Studio
          </h2>
        </div>
        <span
          className={`font-label-badge text-label-badge px-2 py-0.5 rounded-full uppercase font-medium ${
            result ? "text-secondary bg-secondary/10 border border-secondary/20" : "text-on-surface-variant/70 bg-surface-container-highest/60"
          }`}
        >
          {result ? "Studio Output" : "Standby Mode"}
        </span>
      </div>

      {!result ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl border border-dashed border-surface-container-high/60 bg-surface-container-lowest/40 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-surface-container-high/50 border border-surface-container-highest/60 flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
          </div>
          <div className="max-w-sm flex flex-col gap-1">
            <p className="font-headline-sm text-[14px] sm:text-[15px] text-on-surface font-semibold">
              Prompt Belum Dihasilkan
            </p>
            <p className="font-body-sm text-[12px] sm:text-body-sm text-on-surface-variant leading-relaxed">
              Pilih target produk dan tentukan vibe tempat di sebelah kiri, lalu klik{" "}
              <span className="text-primary font-medium">Generate Prompt</span> untuk memunculkan teks prompt.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-space-sm animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2 text-label-code font-label-code text-xs bg-surface-container-lowest/60 p-2 sm:p-2.5 rounded-xl border border-surface-container-high/30">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded-md font-medium ${
                  result.product.gender === "female"
                    ? "bg-tertiary-container/20 text-tertiary"
                    : "bg-secondary-container/20 text-secondary"
                }`}
              >
                {result.product.name}
              </span>
              {result.vibe && (
                <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">
                  Vibe: {VIBE_LABELS[result.vibe] || result.vibe}
                </span>
              )}
              <span className="text-on-surface-variant truncate max-w-[180px] sm:max-w-[220px]" title={result.location}>
                <span className="text-outline">Spot:</span> {result.location}
              </span>
            </div>
            <span className="text-primary font-medium shrink-0">~{result.tokens} Tokens</span>
          </div>

          <div
            className="flex-1 bg-surface-container-lowest border border-surface-container-high/50 rounded-xl p-3 sm:p-space-md font-body-md text-[14px] sm:text-[14.5px] text-on-surface leading-relaxed select-all shadow-inner whitespace-pre-wrap min-h-[160px] max-h-[340px] overflow-y-auto"
            id="promptOutput"
          >
            {result.prompt}
          </div>

          {result.cycleInfo && (
            <div className="flex items-center justify-between text-[11px] font-label-code px-1 text-on-surface-variant">
              {result.cycleInfo.scriptIsLastInCycle ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">warning</span>
                  Batas aman: Naskah terakhir siklus #{result.cycleInfo.scriptCycleNumber}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-primary">shuffle</span>
                  Sisa {result.cycleInfo.scriptRemaining} naskah unik (Siklus #{result.cycleInfo.scriptCycleNumber})
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="pt-2 border-t border-surface-container-high/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
          <Tooltip>
            <TooltipTrigger
              onClick={result ? onReroll : undefined}
              disabled={!result || isRolling}
              className={`w-full sm:w-auto px-3 sm:px-space-md py-2.5 rounded-xl border font-body-sm sm:font-body-md text-xs sm:text-body-md flex items-center justify-center gap-1.5 transition-all ${
                result
                  ? "bg-surface-container-high hover:bg-surface-container-highest border-surface-container-highest text-on-surface active:scale-95 cursor-pointer"
                  : "bg-surface-container/40 border-surface-container-high text-on-surface-variant/40 cursor-not-allowed opacity-50"
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] text-secondary ${isRolling ? "rotate-180" : ""}`}>
                casino
              </span>
              <span className="truncate">Re-roll</span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span>Acak ulang latar lokasi &amp; dialog</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3 sm:px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-sm sm:font-body-md text-xs sm:text-body-md flex items-center justify-center gap-1.5 transition-all text-center hover:text-primary cursor-pointer"
                />
              }
            >
              <span className="truncate">Gemini Web</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span>Buka Google Gemini di tab baru</span>
            </TooltipContent>
          </Tooltip>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!result}
          className={`w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl font-headline-sm text-[14px] sm:text-headline-sm flex items-center justify-center gap-2 font-bold transition-all ${
            result
              ? "bg-gradient-to-r from-primary to-primary-container text-white dark:from-primary dark:via-[#b0b2ff] dark:to-secondary dark:text-[#0a0914] shadow-[0_4px_20px_rgba(73,75,214,0.25)] hover:brightness-110 active:scale-[0.98] cursor-pointer"
              : "bg-surface-container-high text-on-surface-variant/40 border border-surface-container-high cursor-not-allowed opacity-50"
          }`}
          id="btnCopyStudio"
        >
          <span className="material-symbols-outlined text-[20px]">content_copy</span>
          <span className="truncate">Copy Prompt</span>
        </button>
      </div>
    </section>
  );
}
