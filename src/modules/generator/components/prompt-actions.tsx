"use client";

import React from "react";
import { toast } from "sonner";
import { PromptState } from "../types/generator.types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PromptActionsProps {
  promptData: PromptState | null;
}

export function PromptActions({ promptData }: PromptActionsProps) {
  const handleCopy = () => {
    if (!promptData?.prompt) {
      toast.error("Tidak ada prompt yang bisa disalin");
      return;
    }

    navigator.clipboard
      .writeText(promptData.prompt)
      .then(() => {
        toast.success("Prompt berhasil disalin ke clipboard!", {
          description: "Siap di-paste ke generator video AI pilihan Anda.",
        });
      })
      .catch(() => {
        toast.error("Gagal menyalin prompt ke clipboard");
      });
  };

  return (
    <div className="flex flex-col gap-space-sm pt-space-xs">
      <Tooltip>
        <TooltipTrigger
          onClick={handleCopy}
          className="w-full bg-gradient-to-r from-primary to-primary-container text-white dark:from-primary dark:via-[#b0b2ff] dark:to-secondary dark:text-[#0a0914] hover:brightness-110 active:scale-[0.99] font-headline-sm text-[15px] sm:text-headline-sm py-3.5 px-space-md rounded-xl flex items-center justify-center gap-2 sm:gap-space-sm shadow-[0_4px_20px_rgba(73,75,214,0.25)] dark:shadow-[0_0_24px_rgba(76,215,246,0.3)] transition-all cursor-pointer font-bold"
          id="btnCopy"
        >
          <span className="material-symbols-outlined text-[22px] sm:text-[24px]">content_copy</span>
          <span className="truncate">Copy Prompt to Clipboard</span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>Salin seluruh instruksi prompt video</span>
        </TooltipContent>
      </Tooltip>

      <div className="pt-space-xs font-label-code text-label-code">
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                className="w-full bg-surface-container hover:bg-surface-container-high border border-surface-container-high/40 text-on-surface py-2.5 px-space-md rounded-xl flex items-center justify-center gap-2 transition-all text-center cursor-pointer hover:text-primary shadow-xs"
                href="https://gemini.google.com"
                rel="noopener noreferrer"
                target="_blank"
              />
            }
          >
            <span>Buka Gemini Web</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <span>Buka web Google Gemini di tab baru</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
