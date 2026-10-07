import React from "react";

export function RetentionForecastCard() {
  return (
    <div className="bg-surface-container border border-surface-container-high/40 p-space-md rounded-2xl flex flex-col gap-space-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          Retention Forecast
        </span>
        <span className="font-label-badge text-label-badge text-secondary bg-surface-container-highest px-2 py-0.5 rounded-full">
          Estimated 88% Retention
        </span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Prompt includes psychological anchor in first 1.2s and explicit material-flow cues to trigger algorithm engagement flags.
      </p>
      <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden mt-1 border border-surface-container-high/30">
        <div
          className="bg-gradient-to-r from-primary-container to-secondary h-full rounded-full transition-all duration-500"
          style={{ width: "88%" }}
        ></div>
      </div>
    </div>
  );
}
