import React from "react";

interface SettingsSyncBarProps {
  productsCount: number;
}

export function SettingsSyncBar({ productsCount }: SettingsSyncBarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-space-sm bg-surface-container-low border border-surface-container-high/40 px-space-md py-space-sm rounded-xl shadow-xs">
      <div className="flex items-center gap-space-sm">
        <span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
        <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider font-semibold">
          Database Cloud: Terhubung
        </span>
        <span className="text-outline-variant">•</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {productsCount} Produk Aktif &amp; 2 Blueprint Prompt
        </span>
      </div>
    </div>
  );
}
