import React, { useState, useMemo } from "react";
import { Product, ScriptItem } from "@/types";
import { parseBatchDelimited } from "@/common/utils/batch-parser";

import { ScriptsTable } from "./scripts-table";

interface ScriptsTabProps {
  products: Product[];
  scripts: ScriptItem[];
  selectedProductId: string;
  onFilterChange: (id: string) => void;
  onAddScript: (productId: string, text: string) => void;
  onAddBatchScripts?: (productId: string, texts: string[]) => Promise<boolean | void>;
  onDeleteScript: (id: string) => void;
  onDeleteBatchScripts?: (ids: string[]) => Promise<boolean | void>;
}

export function ScriptsTab({
  products,
  scripts,
  selectedProductId,
  onFilterChange,
  onAddScript,
  onAddBatchScripts,
  onDeleteScript,
  onDeleteBatchScripts,
}: ScriptsTabProps) {
  const [newScriptText, setNewScriptText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const currentScripts = scripts.filter((s) => s.productId === selectedProductId);

  const parsedItems = useMemo(() => {
    return parseBatchDelimited(newScriptText);
  }, [newScriptText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (onAddBatchScripts) {
        await onAddBatchScripts(selectedProductId, parsedItems);
      } else if (parsedItems.length === 1) {
        onAddScript(selectedProductId, parsedItems[0]);
      } else {
        for (const item of parsedItems) {
          onAddScript(selectedProductId, item);
        }
      }
      setNewScriptText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-secondary text-[24px]">record_voice_over</span>
            <span>Bank Naskah Dialog &amp; Lip-Sync</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Kumpulan naskah ucapan natural untuk injeksi gerak bibir model AI video.
          </p>
        </div>

        <div className="flex items-center gap-space-sm bg-surface-container-low border border-surface-container-high/40 px-space-md py-2 rounded-xl">
          <label className="font-label-code text-label-code text-on-surface-variant">
            Pilih Produk:
          </label>
          <div className="relative">
            <select
              value={selectedProductId}
              onChange={(e) => onFilterChange(e.target.value)}
              className="appearance-none bg-surface-container-highest text-primary font-headline-sm text-headline-sm pl-space-md pr-8 py-1.5 rounded-lg focus:outline-none cursor-pointer border border-surface-container-high/50"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-sm">
        <label className="font-headline-sm text-headline-sm text-on-surface flex items-center justify-between font-semibold flex-wrap gap-2">
          <span>Tambah Naskah Lip-Sync untuk &quot;{selectedProduct?.name}&quot;</span>
          {parsedItems.length > 1 && (
            <span className="font-label-code text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
              Terdeteksi {parsedItems.length} Naskah (Batch)
            </span>
          )}
        </label>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-space-sm">
          <div className="flex-1 relative">
            <textarea
              value={newScriptText}
              onChange={(e) => setNewScriptText(e.target.value)}
              placeholder='Tempel satu atau ratusan skrip sekaligus dipisahkan tanda kutip " (contoh: "Skrip satu" "Skrip dua")...'
              rows={3}
              className="w-full bg-surface-container-lowest border border-surface-container-high/60 p-space-md rounded-xl text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-inner resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={parsedItems.length === 0 || isSubmitting}
            className="sm:self-stretch px-space-lg rounded-xl bg-primary text-primary-foreground font-headline-sm text-headline-sm flex items-center justify-center gap-1.5 hover:brightness-105 shadow-[0_2px_12px_rgba(128,131,255,0.25)] transition-all cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[20px]">
              {parsedItems.length > 1 ? "library_add" : "add_circle"}
            </span>
            {isSubmitting
              ? "Menyimpan..."
              : parsedItems.length > 1
              ? `Tambah ${parsedItems.length} Naskah`
              : "Tambah Naskah"}
          </button>
        </form>
      </div>

      {/* Tabel Naskah Lip-Sync */}
      <ScriptsTable
        scripts={currentScripts}
        productName={selectedProduct?.name}
        onDeleteScript={onDeleteScript}
        onDeleteBatchScripts={onDeleteBatchScripts}
      />
    </section>
  );
}
