import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { ActionItem } from "@/types";
import { ActionsTable } from "./actions-table";
import { parseBatchDelimited } from "@/common/utils/batch-parser";

interface ActionsTabProps {
  actions: string[];
  actionItems?: ActionItem[];
  onAddAction: (name: string) => void;
  onAddBatchActions?: (names: string[]) => Promise<boolean | void>;
  onUpdateAction?: (id: string, name: string) => Promise<void> | void;
  onDeleteAction: (nameOrId: string) => void;
  onDeleteBatchActions?: (idsOrNames: string[]) => Promise<boolean | void>;
}

export function ActionsTab({
  actions,
  actionItems = [],
  onAddAction,
  onAddBatchActions,
  onUpdateAction,
  onDeleteAction,
  onDeleteBatchActions,
}: ActionsTabProps) {
  const [newActionText, setNewActionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayList = useMemo(() => {
    if (actionItems && actionItems.length > 0) {
      return actionItems;
    }
    return actions.map((name, idx) => ({
      id: `act-${idx}`,
      name,
    }));
  }, [actions, actionItems]);

  const parsedItems = useMemo(() => {
    return parseBatchDelimited(newActionText);
  }, [newActionText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (onAddBatchActions) {
        await onAddBatchActions(parsedItems);
      } else if (parsedItems.length === 1) {
        onAddAction(parsedItems[0]);
      } else {
        for (const item of parsedItems) {
          onAddAction(item);
        }
      }
      toast.success(`Berhasil menambahkan ${parsedItems.length} aksi kegiatan!`);
      setNewActionText("");
    } catch {
      toast.error("Gagal menambahkan aksi kegiatan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-[24px]">
              directions_run
            </span>
            <span>Video Actions Bank</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Daftar preset aksi dan aktivitas dinamis yang otomatis di-inject ke variabel{" "}
            <code className="text-amber-400 font-label-code">{"{aksi}"}</code> saat compile prompt.
          </p>
        </div>
        <div className="flex items-center gap-space-sm font-label-code text-label-code bg-surface-container-low border border-surface-container-high/40 px-space-md py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="text-amber-400 font-medium">{displayList.length} Total Aksi</span>
        </div>
      </div>

      {/* Form Tambah Aksi */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-low border border-surface-container-high/40 p-4 sm:p-space-lg rounded-2xl shadow-md flex flex-col gap-space-sm"
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="font-label-code text-label-code text-on-surface-variant">
            Deskripsi Aksi / Gerakan Model (Bisa Input Sekaligus / Batch)
          </label>
          {parsedItems.length > 1 && (
            <span className="font-label-code text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
              Terdeteksi {parsedItems.length} Aksi (Batch)
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-space-sm items-stretch md:items-end">
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-start gap-space-sm bg-surface-container-lowest border border-surface-container-high/40 px-space-md py-2.5 rounded-xl">
              <span className="material-symbols-outlined text-outline text-[20px] mt-1">
                sprint
              </span>
              <textarea
                value={newActionText}
                onChange={(e) => setNewActionText(e.target.value)}
                placeholder='Ketik aksi (misal: "sedang jogging santai" "memanjat tebing" "mengendarai motor custom"). Pisahkan dengan tanda kutip atau enter...'
                rows={2}
                className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={parsedItems.length === 0 || isSubmitting}
            className="w-full md:w-auto px-space-lg py-3 md:py-2.5 rounded-xl bg-primary text-primary-foreground font-headline-sm text-headline-sm flex items-center justify-center gap-1.5 hover:brightness-105 shadow-sm transition-all whitespace-nowrap cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">
              {parsedItems.length > 1 ? "library_add" : "add"}
            </span>
            {isSubmitting
              ? "Menyimpan..."
              : parsedItems.length > 1
              ? `Tambah ${parsedItems.length} Aksi`
              : "Tambah Aksi"}
          </button>
        </div>
      </form>

      {/* Tabel Bank Aksi */}
      <ActionsTable
        items={displayList}
        onDeleteAction={onDeleteAction}
        onDeleteBatchActions={onDeleteBatchActions}
        onUpdateAction={onUpdateAction}
      />
    </section>
  );
}
