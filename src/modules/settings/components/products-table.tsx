import React, { useState } from "react";
import { toast } from "sonner";
import { Product, ScriptItem } from "@/types";
import { EditProductModal } from "./edit-product-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductsTableProps {
  products: Product[];
  scripts: ScriptItem[];
  onDeleteProduct: (id: string) => void;
  onDeleteBatchProducts?: (ids: string[]) => Promise<boolean | void>;
  onUpdateProduct?: (product: Partial<Product> & { id: string }) => Promise<void> | void;
  onSelectProductForScripts: (id: string) => void;
}

export function ProductsTable({
  products,
  scripts,
  onDeleteProduct,
  onDeleteBatchProducts,
  onUpdateProduct,
  onSelectProductForScripts,
}: ProductsTableProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBatch, setIsDeletingBatch] = useState(false);

  const isAllSelected = products.length > 0 && selectedIds.length === products.length;
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < products.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
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
        `Yakin ingin menghapus ${selectedIds.length} produk terpilih sekaligus beserta seluruh script-nya?`
      )
    ) {
      return;
    }

    setIsDeletingBatch(true);
    try {
      if (onDeleteBatchProducts) {
        await onDeleteBatchProducts(selectedIds);
      } else {
        for (const id of selectedIds) {
          onDeleteProduct(id);
        }
      }
      toast.success(`${selectedIds.length} produk berhasil dihapus secara massal.`);
      setSelectedIds([]);
    } catch {
      toast.error("Gagal menghapus batch produk.");
    } finally {
      setIsDeletingBatch(false);
    }
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Hapus produk "${product.name}" beserta semua script-nya?`)) {
      onDeleteProduct(product.id);
      setSelectedIds((prev) => prev.filter((id) => id !== product.id));
      toast.success(`Produk "${product.name}" berhasil dihapus.`);
    }
  };

  return (
    <div className="bg-surface-container-low border border-surface-container-high/40 rounded-2xl shadow-md overflow-hidden">
      <div className="px-3.5 sm:px-space-lg py-3 sm:py-space-md bg-surface-container border-b border-surface-container-high/40 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Registered Video Products
          </span>
          <span className="font-label-code text-label-code bg-surface-container-highest text-secondary px-2.5 py-0.5 rounded-full font-medium">
            {products.length} Items
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-[18px] text-outline">tune</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Auto-linked with Prompt Compiler engine
          </span>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="px-3.5 sm:px-space-lg py-2.5 bg-primary/10 border-b border-primary/25 flex items-center justify-between flex-wrap gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              check_box
            </span>
            <span className="font-label-code text-sm font-semibold text-on-surface">
              {selectedIds.length} produk terpilih
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
                  : `Hapus (${selectedIds.length}) Produk Terpilih`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Card List View (<md) */}
      <div className="md:hidden flex flex-col divide-y divide-surface-container-high/30">
        {products.map((product) => {
          const isFemale = product.gender === "female";
          const linkedCount = scripts.filter((s) => s.productId === product.id).length;
          const isSelected = selectedIds.includes(product.id);

          return (
            <div
              key={product.id}
              className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                isSelected ? "bg-primary/10" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleSelectOne(product.id)}
                  aria-label={`Pilih ${product.name}`}
                  className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary shrink-0"
                />
                <div className="w-11 h-11 rounded-xl bg-surface-container-highest overflow-hidden shrink-0 relative border border-white/5">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${
                        isFemale ? "text-tertiary" : "text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {product.icon || (isFemale ? "checkroom" : "man")}
                      </span>
                    </div>
                  )}
                  <div
                    className={`absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full ${
                      isFemale ? "bg-tertiary" : "bg-secondary"
                    }`}
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-headline-sm text-[13.5px] text-on-surface truncate font-semibold">
                      {product.name}
                    </span>
                    <span
                      className={`font-label-badge text-[10px] px-1.5 py-0.2 rounded-full inline-flex items-center gap-0.5 ${
                        isFemale
                          ? "bg-tertiary-container/30 text-tertiary"
                          : "bg-secondary-container/20 text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[11px]">
                        {isFemale ? "female" : "male"}
                      </span>
                      <span>{isFemale ? "Cewek" : "Cowok"}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-secondary">
                        graphic_eq
                      </span>
                      {linkedCount} Scripts
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectProductForScripts(product.id)}
                  aria-label="Kelola Lip-Sync"
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-secondary active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(product)}
                  aria-label="Edit product"
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-primary active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  aria-label="Delete product"
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-error active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (>=md) */}
      <div className="hidden md:block w-full overflow-x-auto">
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
                  aria-label="Pilih semua produk"
                  className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </th>
              <th className="px-space-lg py-3">Product Name</th>
              <th className="px-space-md py-3">Gender Persona</th>
              <th className="px-space-md py-3">Linked Lip-Syncs</th>
              <th className="px-space-lg py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-lowest/60">
            {products.map((product) => {
              const isFemale = product.gender === "female";
              const linkedCount = scripts.filter((s) => s.productId === product.id).length;
              const isSelected = selectedIds.includes(product.id);

              return (
                <tr
                  key={product.id}
                  className={`transition-colors ${
                    isSelected ? "bg-primary/10" : "hover:bg-surface-container/60"
                  }`}
                >
                  <td className="px-space-md py-space-md text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelectOne(product.id)}
                      aria-label={`Pilih produk ${product.name}`}
                      className="w-4 h-4 rounded border-surface-container-high text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                  </td>
                  <td className="px-space-lg py-space-md">
                    <div className="flex items-center gap-space-sm">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover border border-surface-container-highest shrink-0 shadow-xs"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 ${
                            isFemale ? "text-primary" : "text-secondary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {product.icon || (isFemale ? "checkroom" : "man")}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-headline-sm text-[16px] text-on-surface font-semibold">
                          {product.name}
                        </div>
                        {product.itemDesc && (
                          <div className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1 max-w-xs">
                            {product.itemDesc}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-space-md py-space-md">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-badge text-label-badge uppercase ${
                        isFemale
                          ? "bg-tertiary-container/20 text-tertiary border border-tertiary/20"
                          : "bg-secondary-container/20 text-secondary border border-secondary/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${isFemale ? "bg-tertiary" : "bg-secondary"}`}
                      ></span>
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          {isFemale ? "female" : "male"}
                        </span>
                        {isFemale ? "Cewek" : "Cowok"}
                      </span>
                    </span>
                  </td>

                  <td className="px-space-md py-space-md">
                    <div className="flex items-center gap-1.5 font-label-code text-label-code text-on-surface font-medium">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        graphic_eq
                      </span>
                      {linkedCount} Linked Scripts
                    </div>
                  </td>

                  <td className="px-space-lg py-space-md text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-8 h-8 rounded-lg hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem
                          onClick={() => onSelectProductForScripts(product.id)}
                          className="gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            record_voice_over
                          </span>
                          <span>Kelola Lip-Sync</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEditingProduct(product)}
                          className="gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            edit
                          </span>
                          <span>Edit Produk</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(product)}
                          className="gap-2 cursor-pointer text-error hover:text-error"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                          <span>Hapus Produk</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={async (updated) => {
            if (onUpdateProduct) {
              await onUpdateProduct(updated);
            }
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
