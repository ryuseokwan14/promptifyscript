import React, { useState } from "react";
import { toast } from "sonner";
import { ActionItem } from "@/types";

interface EditActionModalProps {
  action: ActionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, name: string) => Promise<void> | void;
}

export function EditActionModal({
  action,
  isOpen,
  onClose,
  onSave,
}: EditActionModalProps) {
  const [prevId, setPrevId] = useState(action?.id);
  const [name, setName] = useState(action?.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (action && action.id !== prevId) {
    setPrevId(action.id);
    setName(action.name);
  }

  if (!isOpen || !action) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      await onSave(action.id, name.trim());
      toast.success("Aksi berhasil diperbarui!");
      onClose();
    } catch (err) {
      console.error("Gagal edit aksi:", err);
      toast.error("Gagal memperbarui aksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-low border border-surface-container-high/60 rounded-2xl w-full max-w-lg shadow-[0_0_36px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Header Modal */}
        <div className="px-4 py-3 sm:px-space-lg sm:py-space-md bg-surface-container border-b border-surface-container-high/40 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
            </span>
            <h3 className="font-headline-sm text-[16px] sm:text-headline-sm text-on-surface font-semibold">
              Edit Deskripsi Aksi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant">
              Deskripsi Aksi / Kegiatan
            </label>
            <div className="flex items-start gap-space-sm bg-surface-container-lowest border border-surface-container-high/60 px-space-md py-2.5 rounded-xl focus-within:border-amber-400/80 transition-colors">
              <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">
                directions_run
              </span>
              <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: sedang jogging santai dengan langkah ringan"
                rows={3}
                required
                className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none resize-none leading-relaxed"
              />
            </div>
            <p className="font-label-code text-[11px] text-on-surface-variant/80">
              Teks ini akan menggantikan variabel <code className="text-amber-400">{"{aksi}"}</code> pada master template prompt.
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-high/40">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-headline-sm text-headline-sm transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="px-space-lg py-2.5 rounded-xl bg-primary hover:brightness-105 text-primary-foreground font-headline-sm text-headline-sm flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(128,131,255,0.3)] transition-all cursor-pointer font-bold disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
