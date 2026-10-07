import React, { useState } from "react";
import { Product, ScriptItem } from "@/types";
import { EditProductModal } from "./edit-product-modal";

interface ProductsTableProps {
  products: Product[];
  scripts: ScriptItem[];
  onDeleteProduct: (id: string) => void;
  onUpdateProduct?: (product: Partial<Product> & { id: string }) => Promise<void> | void;
  onSelectProductForScripts: (id: string) => void;
}

export function ProductsTable({
  products,
  scripts,
  onDeleteProduct,
  onUpdateProduct,
  onSelectProductForScripts,
}: ProductsTableProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  return (
    <div className="bg-surface-container-low border border-surface-container-high/40 rounded-2xl shadow-md overflow-hidden">
      <div className="px-space-lg py-space-md bg-surface-container border-b border-surface-container-high/40 flex items-center justify-between flex-wrap gap-2">
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

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md">
          <thead className="bg-surface-container-lowest text-on-surface-variant font-label-code text-label-code uppercase tracking-wider border-b border-surface-container-high/30">
            <tr>
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

              return (
                <tr key={product.id} className="hover:bg-surface-container/60 transition-colors">
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
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onSelectProductForScripts(product.id)}
                        className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                        title="View Lip-Sync Scripts"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          record_voice_over
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(product)}
                        className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-secondary transition-all cursor-pointer"
                        title="Edit Produk"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Hapus produk "${product.name}" beserta semua script-nya?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-error-container/30 text-on-surface-variant hover:text-error transition-all cursor-pointer"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
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
