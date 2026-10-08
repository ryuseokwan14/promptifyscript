import React from "react";
import { MasterTemplates } from "@/types";

interface MasterTemplatesTabProps {
  templates: MasterTemplates;
  draftFemale: string;
  draftMale: string;
  hasUnsavedChanges: boolean;
  onDraftChange: (female: string, male: string) => void;
  onSaveTemplates: () => void;
}

export function MasterTemplatesTab({
  draftFemale,
  draftMale,
  hasUnsavedChanges,
  onDraftChange,
  onSaveTemplates,
}: MasterTemplatesTabProps) {
  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-secondary text-[24px]">bolt</span>
            <span>Master Prompt Templates</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            These system prompts compile input variables into full video instructions. Placeholders
            like{" "}
            <code className="font-label-code text-label-code text-primary bg-surface-container px-1.5 py-0.5 rounded-md">
              {"{tempat}"}
            </code>
            ,{" "}
            <code className="font-label-code text-label-code text-tertiary bg-surface-container px-1.5 py-0.5 rounded-md">
              {"{produk}"}
            </code>{" "}
            and{" "}
            <code className="font-label-code text-label-code text-secondary bg-surface-container px-1.5 py-0.5 rounded-md">
              {"{Script gerak bibir}"}
            </code>{" "}
            get replaced automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-label-code text-label-code text-on-surface-variant">
            Compiler Syntax: Validated
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Template Cewek */}
        <div className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">female</span>
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Template Cewek (Female Model)
                </h3>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col">
            <div className="bg-surface-container-lowest border-t border-x border-surface-container-high/40 text-on-surface-variant px-3 py-1.5 rounded-t-xl font-label-code text-label-code flex items-center justify-between">
              <span>master_prompt_female.prompt</span>
              <span className="text-tertiary">3 Variable Hooks Detected</span>
            </div>
            <textarea
              value={draftFemale}
              onChange={(e) => onDraftChange(e.target.value, draftMale)}
              rows={10}
              className="w-full bg-surface-container-lowest border border-surface-container-high/40 p-space-md rounded-b-xl font-label-code text-label-code text-on-surface focus:outline-none focus:ring-1 focus:ring-tertiary shadow-inner resize-y leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span>Character count: {draftFemale.length}</span>
          </div>
        </div>

        {/* Template Cowok */}
        <div className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">male</span>
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Template Cowok (Male Model)
                </h3>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col">
            <div className="bg-surface-container-lowest border-t border-x border-surface-container-high/40 text-on-surface-variant px-3 py-1.5 rounded-t-xl font-label-code text-label-code flex items-center justify-between">
              <span>master_prompt_male.prompt</span>
              <span className="text-secondary">3 Variable Hooks Detected</span>
            </div>
            <textarea
              value={draftMale}
              onChange={(e) => onDraftChange(draftFemale, e.target.value)}
              rows={10}
              className="w-full bg-surface-container-lowest border border-surface-container-high/40 p-space-md rounded-b-xl font-label-code text-label-code text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary shadow-inner resize-y leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span>Character count: {draftMale.length}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onSaveTemplates}
          disabled={!hasUnsavedChanges}
          className={`w-full sm:w-auto px-space-lg py-2.5 rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-2 transition-all ${
            hasUnsavedChanges
              ? "bg-primary hover:brightness-105 text-primary-foreground shadow-[0_0_16px_rgba(192,193,255,0.3)] cursor-pointer font-bold"
              : "bg-surface-container-high/60 text-on-surface-variant/70 border border-white/10 cursor-not-allowed font-medium"
          }`}
          id="btn-recompile"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          Save Changes
        </button>
      </div>
    </section>
  );
}
