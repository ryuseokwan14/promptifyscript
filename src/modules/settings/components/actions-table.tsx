import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { ActionItem } from "@/types";
import { EditActionModal } from "./edit-action-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionsTableProps {
  items: ActionItem[];
  onDeleteAction: (nameOrId: string) => void;
  onDeleteBatchActions?: (idsOrNames: string[]) => Promise<boolean | void>;
  onUpdateAction?: (id: string, name: string) => Promise<void> | void;
}

export function ActionsTable({
  items,
  onDeleteAction,
  onDeleteBatchActions,
  onUpdateAction,
}: ActionsTableProps) {
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBatch, setIsDeletingBatch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const isAllSelected =
    filteredList.length > 0 && selectedIds.length === filteredList.length;
  const isPartiallySelected =
    selectedIds.length > 0 && selectedIds.length < filteredList.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredList.map((item) => item.id || item.name));
    }
  };

  const handleToggleSelectOne = (idOrName: string) => {
    setSelectedIds((prev) =>
      prev.includes(idOrName) ? prev.filter((item) => item !== idOrName) : [...prev, idOrName]
    );
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0 || isDeletingBatch) return;
    if (
      !confirm(
        `Yakin ingin menghapus ${selectedIds.length} aksi terpilih secara massal?`
      )
    ) {
      return;
    }

    try {
      setIsDeletingBatch(true);
      if (onDeleteBatchActions) {
        await onDeleteBatchActions(selectedIds);
      } else {
        for (const id of selectedIds) {
          onDeleteAction(id);
        }
      }
      toast.success(`Berhasil menghapus ${selectedIds.length} aksi.`);
      setSelectedIds([]);
    } catch {
      toast.error("Gagal menghapus batch aksi.");
    } finally {
      setIsDeletingBatch(false);
    }
  };

  return (
    <>
      <div className="bg-surface-container-low border border-surface-container-high/40 rounded-2xl overflow-hidden shadow-md">
        {/* Toolbar Pencarian & Filter */}
        <div className="p-4 sm:p-space-md border-b border-surface-container-high/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm bg-surface-container/50">
          <div className="flex-1 max-w-md relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari deskripsi aksi..."
              className="w-full bg-surface-container-lowest border border-surface-container-high/40 rounded-xl pl-9 pr-3 py-2 text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-space-sm self-end md:self-auto">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="font-label-code text-xs text-on-surface-variant">
                  {selectedIds.length} terpilih
                </span>
                <button
                  type="button"
                  onClick={handleBatchDelete}
                  disabled={isDeletingBatch}
                  className="px-3 py-1.5 rounded-lg bg-error/15 hover:bg-error/25 text-error border border-error/30 font-label-code text-xs flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    delete_sweep
                  </span>
                  <span>{isDeletingBatch ? "Menghapus..." : "Hapus Terpilih"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Data Aksi */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high/40 bg-surface-container/80 text-on-surface-variant font-label-code text-label-code uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isPartiallySelected;
                    }}
                    onChange={handleToggleSelectAll}
                    aria-label="Pilih Semua Aksi"
                    className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                  />
                </th>
                <th className="py-3 px-4">Deskripsi Aksi / Kegiatan</th>
                <th className="py-3 px-4 w-28 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/30 font-body-sm text-body-sm text-on-surface">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[32px] text-outline">
                        directions_run
                      </span>
                      <p>Tidak ada data aksi yang sesuai kriteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => {
                  const targetId = item.id || item.name;
                  const isChecked = selectedIds.includes(targetId);

                  return (
                    <tr
                      key={targetId || idx}
                      className={`hover:bg-surface-container-high/30 transition-colors ${
                        isChecked ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectOne(targetId)}
                          aria-label={`Pilih ${item.name}`}
                          className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium text-on-surface">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-amber-400/80">
                            sprint
                          </span>
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingAction(item)}
                            title="Edit Aksi"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                          </button>

                          <DropdownMenu>
                            <DropdownMenuTrigger className="w-8 h-8 rounded-lg hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all cursor-pointer">
                              <span className="material-symbols-outlined text-[18px]">
                                more_vert
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-surface-container-low border-surface-container-high/60"
                            >
                              <DropdownMenuItem
                                onClick={() => setEditingAction(item)}
                                className="cursor-pointer gap-2"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  edit
                                </span>
                                <span>Edit Aksi</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-surface-container-high/40" />
                              <DropdownMenuItem
                                onClick={() => {
                                  if (confirm(`Hapus aksi "${item.name}"?`)) {
                                    onDeleteAction(targetId);
                                    toast.success("Aksi berhasil dihapus.");
                                  }
                                }}
                                className="cursor-pointer gap-2 text-error focus:text-error focus:bg-error/15"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  delete
                                </span>
                                <span>Hapus</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit Aksi */}
      {editingAction && onUpdateAction && (
        <EditActionModal
          action={editingAction}
          isOpen={!!editingAction}
          onClose={() => setEditingAction(null)}
          onSave={async (id, name) => {
            await onUpdateAction(id, name);
          }}
        />
      )}
    </>
  );
}
