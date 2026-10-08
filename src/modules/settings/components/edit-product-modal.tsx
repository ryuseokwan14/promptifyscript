"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Product } from "@/types";
import { ProductImageUploader } from "./product-image-uploader";

interface EditProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<Product> & { id: string }) => Promise<void> | void;
}

export function EditProductModal({
  product,
  isOpen,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [name, setName] = useState(product.name);
  const [gender, setGender] = useState<"female" | "male">(product.gender as "female" | "male");
  const [itemDesc, setItemDesc] = useState(product.itemDesc || "");
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave({
        id: product.id,
        name,
        gender,
        itemDesc,
        imageUrl: imageUrl || null,
      });
      toast.success(`Data produk "${name}" berhasil diperbarui!`);
      onClose();
    } catch (err) {
      console.error("Gagal memperbarui produk:", err);
      toast.error("Gagal memperbarui data produk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-surface-container-low border border-surface-container-high/60 rounded-2xl max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="p-4 sm:p-space-lg border-b border-surface-container-high/40 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">edit_note</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-[16px] sm:text-headline-sm text-on-surface font-semibold">
                Edit Data Produk
              </h3>
              <p className="font-body-sm text-[12px] sm:text-body-sm text-on-surface-variant">
                Perbarui detail produk, foto, &amp; prompt pakaian
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-space-lg flex flex-col gap-space-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-code text-label-code text-on-surface-variant">
                Nama Produk
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-surface-container-lowest border border-surface-container-high/40 px-3.5 py-2.5 rounded-xl text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-code text-label-code text-on-surface-variant">
                Gender Persona
              </label>
              <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest p-1 rounded-xl border border-surface-container-high/40">
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg cursor-pointer transition-all font-body-sm text-body-sm ${
                    gender === "female"
                      ? "bg-tertiary-container/30 text-tertiary font-semibold shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">female</span>
                  <span>Cewek</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg cursor-pointer transition-all font-body-sm text-body-sm ${
                    gender === "male"
                      ? "bg-secondary-container/30 text-secondary font-semibold shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">male</span>
                  <span>Cowok</span>
                </button>
              </div>
            </div>
          </div>

          {/* Upload / Ganti Foto Produk */}
          <ProductImageUploader
            imageUrl={imageUrl}
            onImageChange={setImageUrl}
            label="Foto Produk"
            compact
          />

          <div className="flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant flex items-center justify-between">
              <span>Deskripsi Injeksi Prompt {"{produk}"}</span>
              <span className="text-secondary text-xs">Paling Berpengaruh ke AI Video</span>
            </label>
            <input
              type="text"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              placeholder="e.g. Celana Kulot Linen warna broken white yang jatuh elegan"
              className="bg-surface-container-lowest border border-surface-container-high/40 px-3.5 py-2.5 rounded-xl text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
            />
          </div>

          <div className="pt-space-sm flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-space-sm border-t border-surface-container-high/30">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-space-md py-2.5 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-md text-body-md text-center cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-space-lg py-2.5 rounded-xl bg-primary hover:brightness-105 text-primary-foreground font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(128,131,255,0.3)] cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
