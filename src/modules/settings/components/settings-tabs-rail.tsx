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
    <>
      {/* Mobile Only: Dropdown Navigasi tanpa ikon */}
      <div className="sm:hidden w-full bg-surface-container-lowest/95 backdrop-blur-md border border-surface-container-high/60 p-2.5 rounded-2xl shadow-md sticky top-16 z-20">
        <label
          htmlFor="settings-mobile-nav"
          className="block text-[11px] font-label-code text-on-surface-variant font-semibold uppercase tracking-wider mb-1.5 px-1"
        >
          Halaman Pengaturan
        </label>
        <div className="relative">
          <select
            id="settings-mobile-nav"
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value as SettingsTab)}
            className="w-full bg-surface-container-high text-on-surface font-headline-sm text-[14px] font-medium py-2.5 px-3 rounded-xl border border-surface-container-highest focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-colors cursor-pointer"
          >
            <option value="products">Product ({productsCount})</option>
            <option value="scripts">Lip-Sync ({scriptsCount})</option>
            <option value="locations">Locations Bank ({locationsCount})</option>
            <option value="templates">Master Template</option>
            <option value="security">Security &amp; Auth</option>
          </select>
        </div>
      </div>

      {/* Desktop / Tablet: Horizontal Tabs Rail */}
      <div className="hidden sm:flex bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high/40 p-1.5 rounded-2xl items-center gap-1.5 overflow-x-auto no-scrollbar shadow-md sticky top-16 z-20">
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
    </>
  );
}
