import React from "react";
import { SettingsTab } from "../types/settings.types";

interface SettingsTabsRailProps {
  activeTab: SettingsTab;
  productsCount: number;
  scriptsCount: number;
  locationsCount: number;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsTabsRail({
  activeTab,
  productsCount,
  scriptsCount,
  locationsCount,
  onTabChange,
}: SettingsTabsRailProps) {
  return (
    <div className="bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high/40 p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-md sticky top-16 z-20">
      <button
        type="button"
        onClick={() => onTabChange("products")}
        className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3.5 sm:px-space-lg py-2 sm:py-2.5 rounded-xl font-headline-sm text-[13px] sm:text-[15px] transition-all cursor-pointer ${
          activeTab === "products"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[17px] sm:text-[18px]">inventory_2</span>
        <span>Products</span>
        <span className="bg-primary/20 text-primary font-label-code text-[11px] px-2 py-0.5 rounded-full ml-0.5">
          {productsCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("scripts")}
        className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3.5 sm:px-space-lg py-2 sm:py-2.5 rounded-xl font-headline-sm text-[13px] sm:text-[15px] transition-all cursor-pointer ${
          activeTab === "scripts"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[17px] sm:text-[18px]">record_voice_over</span>
        <span>Lip-Sync Scripts</span>
        <span className="bg-surface-container-highest text-on-surface-variant font-label-code text-[11px] px-2 py-0.5 rounded-full ml-0.5">
          {scriptsCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("locations")}
        className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3.5 sm:px-space-lg py-2 sm:py-2.5 rounded-xl font-headline-sm text-[13px] sm:text-[15px] transition-all cursor-pointer ${
          activeTab === "locations"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[17px] sm:text-[18px]">explore</span>
        <span>Locations Bank</span>
        <span className="bg-surface-container-highest text-on-surface-variant font-label-code text-[11px] px-2 py-0.5 rounded-full ml-0.5">
          {locationsCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("templates")}
        className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3.5 sm:px-space-lg py-2 sm:py-2.5 rounded-xl font-headline-sm text-[13px] sm:text-[15px] transition-all cursor-pointer ${
          activeTab === "templates"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[17px] sm:text-[18px]">bolt</span>
        <span>Master Templates</span>
        <span className="bg-tertiary-container/30 text-tertiary font-label-code text-[11px] px-2 py-0.5 rounded-full ml-0.5 font-medium">
          Live
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("security")}
        className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3.5 sm:px-space-lg py-2 sm:py-2.5 rounded-xl font-headline-sm text-[13px] sm:text-[15px] transition-all cursor-pointer ${
          activeTab === "security"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[17px] sm:text-[18px]">shield</span>
        <span>Security &amp; Auth</span>
      </button>
    </div>
  );
}
