import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { ScriptItem } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ScriptsTableProps {
  scripts: ScriptItem[];
  productName?: string;
  onDeleteScript: (id: string) => void;
  onDeleteBatchScripts?: (ids: string[]) => Promise<boolean | void>;
}

export function ScriptsTable({
  scripts,
  productName,
  onDeleteScript,
  onDeleteBatchScripts,
}: ScriptsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBatch, setIsDeletingBatch] = useState(false);

  const filteredScripts = useMemo(() => {
    if (!searchQuery.trim()) return scripts;
    const query = searchQuery.toLowerCase();
    return scripts.filter((s) => s.text.toLowerCase().includes(query));
  }, [scripts, searchQuery]);

  const isAllSelected =
    filteredScripts.length > 0 && selectedIds.length === filteredScripts.length;
  const isPartiallySelected =
    selectedIds.length > 0 && selectedIds.length < filteredScripts.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredScripts.map((s) => s.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0 || isDeletingBatch) return;
    if (
      !confirm(
        `Yakin ingin menghapus ${selectedIds.length} naskah dialog terpilih secara massal?`
      )
    ) {
      return;
    }

    setIsDeletingBatch(true);
    try {
      if (onDeleteBatchScripts) {
        await onDeleteBatchScripts(selectedIds);
      } else {
        for (const id of selectedIds) {
          onDeleteScript(id);
        }
      }
      toast.success(`${selectedIds.length} naskah dialog berhasil dihapus secara massal.`);
      setSelectedIds([]);
    } catch {
      toast.error("Gagal menghapus batch naskah.");
    } finally {
      setIsDeletingBatch(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Naskah dialog berhasil disalin ke clipboard!");
  };

  const handleDelete = (id: string) => {
    onDeleteScript(id);
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    toast.success("Naskah berhasil dihapus.");
  };

  return (
    <div className="bg-surface-container-low border border-surface-container-high/40 rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* Table Header Bar */}
      <div className="px-space-lg py-space-md bg-surface-container border-b border-surface-container-high/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Daftar Naskah Lip-Sync
          </span>
          {productName && (
            <span className="font-label-code text-xs text-on-surface-variant bg-surface-container-highest/60 border border-surface-container-high/50 px-2 py-0.5 rounded-md">
              {productName}
            </span>
          )}
          <span className="font-label-code text-label-code bg-surface-container-highest text-secondary px-2.5 py-0.5 rounded-full font-medium">
            {filteredScripts.length} Naskah
          </span>
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari naskah dialog..."
            className="w-full bg-surface-container-lowest border border-surface-container-high/60 pl-8 pr-3 py-1.5 rounded-xl text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
          />
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="px-space-lg py-2.5 bg-primary/10 border-b border-primary/25 flex items-center justify-between flex-wrap gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              check_box
            </span>
            <span className="font-label-code text-sm font-semibold text-on-surface">
              {selectedIds.length} naskah terpilih
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              disabled={isDeletingBatch}
              className="px-3 py-1 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition cursor-pointer"
            >
              Batalkan Pilihan
            </button>
            <button
              type="button"
              onClick={handleBatchDelete}
              disabled={isDeletingBatch}
              className="px-3.5 py-1.5 rounded-lg bg-error hover:brightness-110 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>
                {isDeletingBatch
                  ? "Menghapus..."
                  : `Hapus (${selectedIds.length}) Naskah Terpilih`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md">
          <thead className="bg-surface-container-lowest text-on-surface-variant font-label-code text-label-code uppercase tracking-wider border-b border-surface-container-high/30">
            <tr>
              <th className="px-space-md py-3 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={handleToggleSelectAll}
                  aria-label="Pilih semua naskah"
                  className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </th>
              <th className="px-space-md py-3 w-16 text-center">#</th>
              <th className="px-space-lg py-3">Naskah Dialog / Gerak Bibir</th>
              <th className="px-space-lg py-3 w-32 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-lowest/60">
            {filteredScripts.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-on-surface-variant">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[36px] text-outline">
                      chat_bubble_outline
                    </span>
                    <span className="font-body-md text-body-md">
                      {scripts.length === 0
                        ? "Belum ada naskah dialog untuk produk ini. Tambahkan di form atas!"
                        : "Tidak ada naskah dialog yang cocok dengan pencarian."}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredScripts.map((script, idx) => {
                const isSelected = selectedIds.includes(script.id);
                return (
                  <tr
                    key={script.id}
                    className={`transition-colors group ${
                      isSelected ? "bg-primary/10" : "hover:bg-surface-container/60"
                    }`}
                  >
                    <td className="px-space-md py-space-md text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectOne(script.id)}
                        aria-label={`Pilih naskah ${idx + 1}`}
                        className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                      />
                    </td>
                    <td className="px-space-md py-space-md text-center font-label-code text-label-code text-on-surface-variant">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </td>

                  <td className="px-space-lg py-space-md">
                    <p className="font-body-md text-[14.5px] text-on-surface leading-relaxed italic">
                      &quot;{script.text}&quot;
                    </p>
                  </td>

                  <td className="px-space-lg py-space-md text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-8 h-8 rounded-lg hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleCopy(script.text)}
                            className="gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              content_copy
                            </span>
                            <span>Salin Naskah</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(script.id)}
                            className="gap-2 cursor-pointer text-error hover:text-error"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                            <span>Hapus Naskah</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
