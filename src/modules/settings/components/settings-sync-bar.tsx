import React from "react";

interface SettingsSyncBarProps {
  productsCount: number;
}

export function SettingsSyncBar({ productsCount }: SettingsSyncBarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2 bg-surface-container-low border border-surface-container-high/40 px-3.5 sm:px-space-md py-2.5 rounded-xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-space-sm w-full sm:w-auto">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
          <span className="font-label-badge text-[11px] text-secondary uppercase tracking-wider font-semibold">
            Database Cloud: Terhubung
          </span>
        </div>
        <span className="hidden sm:inline text-outline-variant">•</span>
        <span className="font-body-sm text-[12px] sm:text-body-sm text-on-surface-variant">
          {productsCount} Produk Aktif &amp; 2 Blueprint Prompt
        </span>
      </div>
    </div>
  );
}
