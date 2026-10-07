import React, { useState } from "react";
import { GenerationResult } from "@/types";

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
  const [copied, setCopied] = useState(false);

  if (!isOpen || !result) return null;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(result.prompt)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
  };

  const isFemale = result.product.gender === "female";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-low border border-surface-container-high/60 rounded-2xl w-full max-w-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-surface-container border-b border-surface-container-high/40 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="w-8 h-8 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Generated Video Prompt
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Hasil kompilasi acak master prompt, bank lokasi, dan variasi gerak bibir.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Selected Parameters Badge Summary */}
        <div className="px-space-lg py-2.5 bg-surface-container-lowest/60 border-b border-surface-container-high/30 flex items-center gap-space-md flex-wrap text-label-code font-label-code text-xs text-on-surface-variant">
          <div className="flex items-center gap-1">
            <span className="text-outline">Produk:</span>
            <span className={`px-2 py-0.5 rounded-md font-medium ${isFemale ? "bg-tertiary-container/20 text-tertiary" : "bg-secondary-container/20 text-secondary"}`}>
              {result.product.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-outline">Setting:</span>
            <span className="text-on-surface truncate max-w-[200px]" title={result.location}>
              {result.location}
            </span>
          </div>
        </div>

        {/* Output Box */}
        <div className="p-space-lg flex-1 overflow-y-auto flex flex-col gap-space-sm">
          <div className="flex items-center justify-between font-label-code text-label-code text-xs text-on-surface-variant">
            <span className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[15px]">terminal</span>
              Prompt Siap Copy (Plain Text)
            </span>
            <span>~{result.tokens} Tokens</span>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl p-space-md font-body-md text-[15px] text-on-surface leading-relaxed select-all shadow-inner whitespace-pre-wrap min-h-[160px]">
            {result.prompt}
          </div>

          {copied && (
            <div className="flex items-center gap-space-sm bg-surface-container-high border border-secondary/40 px-space-md py-2 rounded-xl text-secondary animate-bounce">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span className="font-body-md text-sm font-medium text-white">
                Prompt berhasil disalin! Langsung paste di Google Gemini atau video generator.
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="px-space-lg py-space-md bg-surface-container border-t border-surface-container-high/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={onReroll}
              disabled={isRolling}
              className="px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-md text-body-md flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span className={`material-symbols-outlined text-[18px] text-secondary ${isRolling ? "rotate-180" : ""}`}>
                casino
              </span>
              <span>Re-roll Acak Lagi</span>
            </button>

            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-md text-body-md flex items-center justify-center gap-1.5 transition-all text-center hover:text-primary"
            >
              <span>Gemini Web</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </a>
          </div>

          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-space-lg py-2.5 rounded-xl bg-primary hover:brightness-110 active:scale-95 text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(128,131,255,0.4)] transition-all cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[20px]">content_copy</span>
              <span>{copied ? "Tersalin!" : "Copy Prompt"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
