import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { LocationItem } from "@/types";
import { EditLocationModal } from "./edit-location-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationsTableProps {
  items: LocationItem[];
  onDeleteLocation: (loc: string) => void;
  onDeleteBatchLocations?: (locsOrIds: string[]) => Promise<boolean | void>;
  onUpdateLocation?: (id: string, name: string, vibe: string) => Promise<void> | void;
}

export function LocationsTable({
  items,
  onDeleteLocation,
  onDeleteBatchLocations,
  onUpdateLocation,
}: LocationsTableProps) {
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBatch, setIsDeletingBatch] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVibeFilter, setSelectedVibeFilter] = useState<string>("all");

  const filteredList = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchVibe =
        selectedVibeFilter === "all" || item.vibe === selectedVibeFilter;
      return matchSearch && matchVibe;
    });
  }, [items, searchQuery, selectedVibeFilter]);

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
        `Yakin ingin menghapus ${selectedIds.length} setting lokasi terpilih secara massal?`
      )
    ) {
      return;
    }

    setIsDeletingBatch(true);
    try {
      if (onDeleteBatchLocations) {
        await onDeleteBatchLocations(selectedIds);
      } else {
        for (const loc of selectedIds) {
          onDeleteLocation(loc);
        }
      }
      toast.success(`${selectedIds.length} setting lokasi berhasil dihapus secara massal.`);
      setSelectedIds([]);
    } catch {
      toast.error("Gagal menghapus batch lokasi.");
    } finally {
      setIsDeletingBatch(false);
    }
  };

  const handleDelete = (item: LocationItem) => {
    if (confirm(`Hapus lokasi "${item.name}"?`)) {
      const targetId = item.id || item.name;
      onDeleteLocation(targetId);
      setSelectedIds((prev) => prev.filter((id) => id !== targetId && id !== item.name));
      toast.success(`Lokasi "${item.name}" berhasil dihapus.`);
    }
  };

  const getVibeConfig = (vibe: string) => {
    switch (vibe) {
      case "casual_aesthetic":
        return {
          label: "Casual Aesthetic",
          tagClass: "bg-tertiary-container/20 text-tertiary border-tertiary/20",
        };
      case "urban_adventure":
        return {
          label: "Urban Adventure",
          tagClass: "bg-secondary-container/20 text-secondary border-secondary/20",
        };
      default:
        return {
          label: "Universal",
          tagClass: "bg-primary-container/20 text-primary border-primary/20",
        };
    }
  };

  return (
    <div className="bg-surface-container-low border border-surface-container-high/40 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="px-space-lg py-space-md bg-surface-container border-b border-surface-container-high/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Daftar Lokasi Terdaftar
          </span>
          <span className="font-label-code text-label-code bg-surface-container-highest text-secondary px-2.5 py-0.5 rounded-full font-medium">
            {filteredList.length} Lokasi
          </span>
        </div>

        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="relative flex-1 sm:w-60">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lokasi..."
              className="w-full bg-surface-container-lowest border border-surface-container-high/60 pl-8 pr-3 py-1.5 rounded-xl text-on-surface text-body-sm placeholder:text-outline focus:outline-none"
            />
          </div>

          <select
            value={selectedVibeFilter}
            onChange={(e) => setSelectedVibeFilter(e.target.value)}
            className="bg-surface-container-lowest border border-surface-container-high/40 px-3 py-1.5 rounded-xl text-on-surface text-body-sm focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Vibe</option>
            <option value="casual_aesthetic">Casual Aesthetic</option>
            <option value="urban_adventure">Urban Adventure</option>
            <option value="universal">Universal</option>
          </select>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="px-space-lg py-2.5 bg-primary/10 border-b border-primary/25 flex items-center justify-between flex-wrap gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              check_box
            </span>
            <span className="font-label-code text-sm font-semibold text-on-surface">
              {selectedIds.length} lokasi terpilih
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
                  : `Hapus (${selectedIds.length}) Lokasi Terpilih`}
              </span>
            </button>
          </div>
        </div>
      )}

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
                  aria-label="Pilih semua lokasi"
                  className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </th>
              <th className="px-space-md py-3 w-16 text-center">#</th>
              <th className="px-space-lg py-3">Nama Setting / Lokasi</th>
              <th className="px-space-md py-3">Vibe Suasana</th>
              <th className="px-space-lg py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-lowest/60">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-on-surface-variant">
                  Tidak ada lokasi yang cocok dengan filter pencarian.
                </td>
              </tr>
            ) : (
              filteredList.map((item, idx) => {
                const vibeCfg = getVibeConfig(item.vibe);
                const targetKey = item.id || item.name;
                const isSelected = selectedIds.includes(targetKey);
                return (
                  <tr
                    key={targetKey}
                    className={`transition-colors ${
                      isSelected ? "bg-primary/10" : "hover:bg-surface-container/60"
                    }`}
                  >
                    <td className="px-space-md py-space-md text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectOne(targetKey)}
                        aria-label={`Pilih lokasi ${item.name}`}
                        className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                      />
                    </td>
                    <td className="px-space-md py-space-md text-center font-label-code text-label-code text-on-surface-variant">
                      {idx + 1}
                    </td>

                    <td className="px-space-lg py-space-md font-medium text-on-surface">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                          location_on
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </td>

                    <td className="px-space-md py-space-md">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-badge text-label-badge uppercase font-medium border ${vibeCfg.tagClass}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {vibeCfg.label}
                      </span>
                    </td>

                    <td className="px-space-lg py-space-md text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-8 h-8 rounded-lg hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => setEditingLocation(item)}
                            className="gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              edit
                            </span>
                            <span>Edit Lokasi</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(item)}
                            className="gap-2 cursor-pointer text-error hover:text-error"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                            <span>Hapus Lokasi</span>
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

      {editingLocation && (
        <EditLocationModal
          location={editingLocation}
          isOpen={!!editingLocation}
          onClose={() => setEditingLocation(null)}
          onSave={async (id, name, vibe) => {
            if (onUpdateLocation) {
              await onUpdateLocation(id, name, vibe);
            }
          }}
        />
      )}
    </div>
  );
}
