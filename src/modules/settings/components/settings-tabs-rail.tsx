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
    <div className="bg-surface-container-lowest border border-surface-container-high/40 p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto shadow-md">
      <button
        type="button"
        onClick={() => onTabChange("products")}
        className={`flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl font-headline-sm text-[15px] transition-all cursor-pointer ${
          activeTab === "products"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">inventory_2</span>
        <span>Products</span>
        <span className="bg-primary/20 text-primary font-label-code text-label-code px-2 py-0.5 rounded-full ml-1">
          {productsCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("scripts")}
        className={`flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl font-headline-sm text-[15px] transition-all cursor-pointer ${
          activeTab === "scripts"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
        <span>Lip-Sync Scripts</span>
        <span className="bg-surface-container-highest text-on-surface-variant font-label-code text-label-code px-2 py-0.5 rounded-full ml-1">
          {scriptsCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("locations")}
        className={`flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl font-headline-sm text-[15px] transition-all cursor-pointer ${
          activeTab === "locations"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">explore</span>
        <span>Locations Bank</span>
        <span className="bg-surface-container-highest text-on-surface-variant font-label-code text-label-code px-2 py-0.5 rounded-full ml-1">
          {locationsCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("templates")}
        className={`flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl font-headline-sm text-[15px] transition-all cursor-pointer ${
          activeTab === "templates"
            ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">bolt</span>
        <span>Master Templates</span>
        <span className="bg-tertiary-container/30 text-tertiary font-label-code text-label-code px-2 py-0.5 rounded-full ml-1 font-medium">
          Live
        </span>
      </button>
    </div>
  );
}
