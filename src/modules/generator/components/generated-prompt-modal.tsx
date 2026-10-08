import React from "react";
import { toast } from "sonner";
import { GenerationResult } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeneratedPromptModalProps {
  isOpen: boolean;
  result: GenerationResult | null;
  onClose: () => void;
  onReroll: () => void;
  isRolling?: boolean;
}

export function GeneratedPromptModal({
  isOpen,
  result,
  onClose,
  onReroll,
  isRolling = false,
}: GeneratedPromptModalProps) {
  if (!isOpen || !result) return null;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(result.prompt)
      .then(() => {
        toast.success("Prompt berhasil disalin ke clipboard!", {
          description: "Siap digunakan di video generator AI pilihan Anda.",
        });
      })
      .catch(() => {
        toast.error("Gagal menyalin prompt ke clipboard");
      });
  };

  const isFemale = result.product.gender === "female";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-low border border-surface-container-high/60 rounded-2xl w-full max-w-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-space-lg sm:py-space-md bg-surface-container border-b border-surface-container-high/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-space-sm min-w-0">
            <span className="w-8 h-8 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </span>
            <div className="min-w-0">
              <h3 className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold truncate">
                Generated Video Prompt
              </h3>
              <p className="font-body-sm text-[11.5px] sm:text-body-sm text-on-surface-variant line-clamp-1 sm:line-clamp-none">
                Hasil kompilasi acak master prompt, bank lokasi, dan variasi gerak bibir.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer shrink-0 ml-2"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Selected Parameters Badge Summary */}
        <div className="px-4 py-2 sm:px-space-lg sm:py-2.5 bg-surface-container-lowest/60 border-b border-surface-container-high/30 flex items-center justify-between gap-2 sm:gap-space-md flex-wrap text-label-code font-label-code text-xs text-on-surface-variant">
          <div className="flex items-center gap-2 sm:gap-space-md flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-outline">Produk:</span>
              <span
                className={`px-2 py-0.5 rounded-md font-medium ${
                  isFemale
                    ? "bg-tertiary-container/20 text-tertiary"
                    : "bg-secondary-container/20 text-secondary"
                }`}
              >
                {result.product.name}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-outline">Setting:</span>
              <span className="text-on-surface truncate max-w-[150px] sm:max-w-[200px]" title={result.location}>
                {result.location}
              </span>
            </div>
          </div>

          {result.cycleInfo && (
            <div className="flex items-center gap-1.5">
              {result.cycleInfo.scriptIsLastInCycle ? (
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  Batas Aman: Naskah Terakhir Siklus #{result.cycleInfo.scriptCycleNumber}
                </span>
              ) : result.cycleInfo.scriptCycleReset ? (
                <span className="text-secondary bg-secondary/10 border border-secondary/30 px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">autorenew</span>
                  Siklus #{result.cycleInfo.scriptCycleNumber} (Mulai Daur Ulang)
                </span>
              ) : (
                <span className="text-on-surface-variant bg-surface-container-high/40 px-2.5 py-0.5 rounded-md text-[11px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">shuffle</span>
                  Sisa {result.cycleInfo.scriptRemaining} naskah unik (Siklus #{result.cycleInfo.scriptCycleNumber})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Output Box */}
        <div className="p-3.5 sm:p-space-lg flex-1 overflow-y-auto flex flex-col gap-space-sm">
          <div className="flex items-center justify-between font-label-code text-label-code text-xs text-on-surface-variant">
            <span className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[15px]">terminal</span>
              Prompt Siap Copy (Plain Text)
            </span>
            <span>~{result.tokens} Tokens</span>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl p-3.5 sm:p-space-md font-body-md text-[14px] sm:text-[15px] text-on-surface leading-relaxed select-all shadow-inner whitespace-pre-wrap min-h-[140px] sm:min-h-[160px]">
            {result.prompt}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-4 py-3 sm:px-space-lg sm:py-space-md bg-surface-container border-t border-surface-container-high/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-space-sm">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-space-xs w-full sm:w-auto">
            <Tooltip>
              <TooltipTrigger
                onClick={onReroll}
                disabled={isRolling}
                className="w-full sm:w-auto px-3 sm:px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-sm sm:font-body-md text-xs sm:text-body-md flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <span
                  className={`material-symbols-outlined text-[18px] text-secondary ${
                    isRolling ? "rotate-180" : ""
                  }`}
                >
                  casino
                </span>
                <span className="truncate">Re-roll</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>Acak kembali setting &amp; naskah</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3 sm:px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-sm sm:font-body-md text-xs sm:text-body-md flex items-center justify-center gap-1.5 transition-all text-center hover:text-primary"
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
            className="w-full sm:w-auto px-space-lg py-3 sm:py-2.5 rounded-xl bg-primary hover:brightness-110 active:scale-95 text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(128,131,255,0.4)] transition-all cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
            <span>Copy Prompt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
