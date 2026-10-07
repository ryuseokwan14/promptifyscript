import React, { useState } from "react";
import { LocationItem } from "@/types";

interface EditLocationModalProps {
  location: LocationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, name: string, vibe: string) => Promise<void> | void;
}

export function EditLocationModal({
  location,
  isOpen,
  onClose,
  onSave,
}: EditLocationModalProps) {
  const [prevId, setPrevId] = useState(location?.id);
  const [name, setName] = useState(location?.name || "");
  const [vibe, setVibe] = useState<"casual_aesthetic" | "urban_adventure" | "universal">(
    (location?.vibe as "casual_aesthetic" | "urban_adventure" | "universal") || "universal"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (location && location.id !== prevId) {
    setPrevId(location.id);
    setName(location.name);
    setVibe((location.vibe as "casual_aesthetic" | "urban_adventure" | "universal") || "universal");
  }

  if (!isOpen || !location) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      await onSave(location.id, name.trim(), vibe);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-low border border-surface-container-high/60 rounded-2xl w-full max-w-lg shadow-[0_0_36px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Header Modal */}
        <div className="px-space-lg py-space-md bg-surface-container border-b border-surface-container-high/40 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="w-8 h-8 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">edit_location_alt</span>
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Edit Setting Lokasi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant">
              Nama Setting / Suasana Lokasi
            </label>
            <div className="flex items-center gap-space-sm bg-surface-container-lowest border border-surface-container-high/40 px-space-md py-2.5 rounded-xl">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                location_on
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. coffee shop outdoor bernuansa kayu minimalis"
                className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant">
              Kategori Vibe
            </label>
            <select
              value={vibe}
              onChange={(e) =>
                setVibe(
                  e.target.value as "casual_aesthetic" | "urban_adventure" | "universal"
                )
              }
              className="w-full bg-surface-container-lowest border border-surface-container-high/40 px-space-md py-2.5 rounded-xl text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer"
            >
              <option value="universal">Universal</option>
              <option value="casual_aesthetic">Casual Aesthetic</option>
              <option value="urban_adventure">Urban Adventure</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container-high/30">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-body-md transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-space-lg py-2 rounded-xl bg-primary hover:brightness-110 text-on-primary font-headline-sm text-headline-sm flex items-center gap-1.5 shadow-[0_0_16px_rgba(128,131,255,0.3)] transition-all cursor-pointer font-semibold disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
