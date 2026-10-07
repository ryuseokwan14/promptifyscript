import React from "react";


interface GeneratorControlsProps {
  isRolling: boolean;
  onGenerate: () => void;
}

export function GeneratorControls({
  isRolling,
  onGenerate,
}: GeneratorControlsProps) {
  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl flex flex-col gap-space-md shadow-sm">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
        <button
          onClick={onGenerate}
          className="relative group flex-1 bg-gradient-to-r from-primary-container via-primary-container to-secondary text-on-primary font-headline-sm text-headline-sm py-3.5 px-space-lg rounded-xl flex items-center justify-center gap-space-sm shadow-[0_0_28px_rgba(128,131,255,0.4)] hover:shadow-[0_0_36px_rgba(128,131,255,0.6)] active:scale-[0.98] transition-all cursor-pointer font-semibold"
          id="btnGenerate"
        >
          <span className="material-symbols-outlined text-[24px]">bolt</span>
          <span className="tracking-wide">Generate Prompt</span>
        </button>

        <button
          onClick={onGenerate}
          className="bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest/60 text-on-surface font-body-md text-body-md py-3.5 px-space-md rounded-xl flex items-center justify-center gap-space-xs transition-all active:scale-[0.98] cursor-pointer"
          id="btnReroll"
        >
          <span
            className={`material-symbols-outlined text-[20px] text-secondary transition-transform duration-300 ${
              isRolling ? "rotate-180" : ""
            }`}
          >
            casino
          </span>
          <span>Re-roll Variation</span>
        </button>
      </div>
    </section>
  );
}
