import React from "react";

interface SettingsHeaderProps {
  onExportJSON: () => void;
}

export function SettingsHeader({ onExportJSON }: SettingsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-space-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
            Data &amp; Prompt Settings
          </h1>
          <span className="font-label-badge text-label-badge bg-primary-container/20 border border-primary/20 text-primary px-space-sm py-0.5 rounded-full font-medium">
            Cloud Database
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Kelola katalog produk, variasi naskah ucapan, bank lokasi video, dan template master prompt
          dengan sinkronisasi database instan.
        </p>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={onExportJSON}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 sm:px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-sm sm:font-body-md text-[13px] sm:text-body-md shadow-sm transition-all cursor-pointer font-medium"
          id="btn-export-json"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            file_download
          </span>
          <span className="truncate">Export JSON</span>
        </button>
      </div>
    </div>
  );
}
