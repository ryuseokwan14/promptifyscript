import React, { useState } from "react";
import { PromptState } from "../types/generator.types";

interface PromptActionsProps {
  promptData: PromptState | null;
}

export function PromptActions({ promptData }: PromptActionsProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    if (!promptData) return;
    navigator.clipboard
      .writeText(promptData.prompt)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      })
      .catch(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      });
  };

  return (
    <div className="flex flex-col gap-space-sm pt-space-xs">
      <button
        onClick={handleCopy}
        className="w-full bg-gradient-to-r from-primary via-primary-container to-secondary hover:brightness-110 active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm py-3.5 px-space-md rounded-xl flex items-center justify-center gap-space-sm shadow-[0_0_24px_rgba(76,215,246,0.3)] transition-all cursor-pointer font-semibold"
        id="btnCopy"
      >
        <span className="material-symbols-outlined text-[24px]">content_copy</span>
        <span>Copy Prompt to Clipboard</span>
      </button>

      {showToast && (
        <div
          className="flex items-center gap-space-sm bg-surface-container-high border border-secondary/40 px-space-md py-space-sm rounded-xl text-secondary shadow-lg transition-all animate-bounce"
          id="copyToast"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-body-md text-body-md font-medium text-white">
            Prompt berhasil disalin! Siap di-paste ke generator video.
          </span>
        </div>
      )}

      <div className="pt-space-xs font-label-code text-label-code">
        <a
          className="w-full bg-surface-container hover:bg-surface-container-high border border-surface-container-high/40 text-on-surface py-2.5 px-space-md rounded-xl flex items-center justify-center gap-2 transition-all text-center cursor-pointer hover:text-primary shadow-xs"
          href="https://gemini.google.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>Buka Gemini Web</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
