import React from "react";

interface SettingsHeaderProps {
  onExportJSON: () => void;
  onSaveAll: () => void;
  hasUnsavedChanges?: boolean;
}

export function SettingsHeader({
  onExportJSON,
  onSaveAll,
  hasUnsavedChanges = false,
}: SettingsHeaderProps) {
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

      <div className="flex items-center gap-space-sm flex-wrap">
        <button
          type="button"
          onClick={onExportJSON}
          className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest text-on-surface font-body-md text-body-md shadow-sm transition-all cursor-pointer font-medium"
          id="btn-export-json"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            file_download
          </span>
          Export JSON Backup
        </button>

        <button
          type="button"
          onClick={onSaveAll}
          disabled={!hasUnsavedChanges}
          className={`flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl font-headline-sm text-headline-sm transition-all ${
            hasUnsavedChanges
              ? "bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(192,193,255,0.4)] hover:brightness-105 active:scale-95 cursor-pointer ring-2 ring-primary/40 animate-pulse font-bold"
              : "bg-surface-container-high/60 text-on-surface-variant/70 border border-white/10 cursor-not-allowed font-medium"
          }`}
          id="btn-save-all"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          Save All Changes
        </button>
      </div>
    </div>
  );
}
