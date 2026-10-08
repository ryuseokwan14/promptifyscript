import React from "react";
import { VibeType } from "@/types";

interface VibeSelectorProps {
  activeVibe: VibeType | null;
  onSelectVibe: (vibe: VibeType) => void;
  locationCounts: {
    universal: number;
    casual_aesthetic: number;
    urban_adventure: number;
  };
}

interface VibeOption {
  id: VibeType;
  label: string;
  desc: string;
  tag: string;
  icon: string;
  countKey: "universal" | "casual_aesthetic" | "urban_adventure";
  accentColor: string;
}

const VIBE_OPTIONS: VibeOption[] = [
  {
    id: "universal",
    label: "Universal",
    desc: "Cocok fleksibel untuk semua model celana",
    tag: "Semua Celana",
    icon: "public",
    countKey: "universal",
    accentColor: "border-primary text-primary bg-primary/10",
  },
  {
    id: "casual_aesthetic",
    label: "Casual Aesthetic",
    desc: "Cafe aesthetic, indoor studio & clean minimalist",
    tag: "Kulot & Barrel",
    icon: "local_cafe",
    countKey: "casual_aesthetic",
    accentColor: "border-tertiary text-tertiary bg-tertiary/10",
  },
  {
    id: "urban_adventure",
    label: "Urban Adventure",
    desc: "Outdoor, rooftop, skatepark & gritty streetwear",
    tag: "Cargo Pants",
    icon: "terrain",
    countKey: "urban_adventure",
    accentColor: "border-secondary text-secondary bg-secondary/10",
  },
];

export function VibeSelector({
  activeVibe,
  onSelectVibe,
  locationCounts,
}: VibeSelectorProps) {
  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-3 sm:p-space-lg rounded-2xl flex flex-col gap-space-md shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold">
            2. Pilih Vibe Tempat
          </span>
          <span
            className={`font-label-code text-[11px] sm:text-label-code px-2 py-0.5 rounded-full border transition-colors ${
              activeVibe
                ? "bg-secondary/15 text-secondary border-secondary/30"
                : "bg-amber-500/15 text-amber-400 border-amber-500/30"
            }`}
          >
            {activeVibe ? "Vibe Terpilih" : "Wajib Dipilih"}
          </span>
        </div>
        <span className="font-body-sm text-[11.5px] sm:text-body-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">tune</span>
          Filter Sesuai Karakter
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-space-sm">
        {VIBE_OPTIONS.map((opt) => {
          const isSelected = activeVibe === opt.id;
          const count = locationCounts[opt.countKey] || 0;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectVibe(opt.id)}
              className={`group relative text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? "bg-surface-container-highest/90 border-primary shadow-[0_0_20px_rgba(128,131,255,0.25)] ring-1 ring-primary/60 scale-[1.01]"
                  : "bg-surface-container hover:bg-surface-container-high border-surface-container-high/60 hover:border-surface-container-highest text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <div className="flex items-start justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? opt.accentColor
                        : "bg-surface-container-highest/60 text-on-surface-variant group-hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {opt.icon}
                    </span>
                  </span>
                  <div className="font-headline-sm text-[13.5px] sm:text-[14px] font-semibold text-on-surface leading-tight">
                    {opt.label}
                  </div>
                </div>

                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? "bg-primary border-primary text-on-primary"
                      : "border-outline/40 text-transparent group-hover:border-outline"
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px] font-bold">
                    check
                  </span>
                </span>
              </div>

              <p className="font-body-sm text-[11.5px] sm:text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                {opt.desc}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/30 text-[10.5px] font-label-code">
                <span className="text-on-surface-variant/80 truncate">{opt.tag}</span>
                <span className="font-medium text-on-surface bg-surface-container-lowest px-1.5 py-0.5 rounded border border-surface-container-high/40 shrink-0">
                  {count} Spot
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
