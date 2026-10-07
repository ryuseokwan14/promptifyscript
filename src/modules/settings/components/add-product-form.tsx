"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Product } from "@/types";
import { ProductImageUploader } from "./product-image-uploader";

interface AddProductFormProps {
  onAddProduct: (item: Omit<Product, "id">) => void;
}

export function AddProductForm({ onAddProduct }: AddProductFormProps) {
  const [newProdName, setNewProdName] = useState("");
  const [newProdGender, setNewProdGender] = useState<"female" | "male">("female");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const prodName = newProdName.trim();
    onAddProduct({
      name: prodName,
      gender: newProdGender,
      itemDesc: `${prodName} warna elegan yang jatuh rapi`,
      icon: newProdGender === "female" ? "checkroom" : "man",
      imageUrl: imageUrl || null,
      imageFit: imageUrl || null,
      imageTexture: null,
      imageAtmosphere: null,
    });

    toast.success(`Produk "${prodName}" berhasil ditambahkan!`);
    setNewProdName("");
    setImageUrl("");
  };

  return (
    <div className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">add_box</span>
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Tambah Produk Baru
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tentukan nama produk, persona model, dan foto produk visual.
            </p>
          </div>
        </div>
        <span className="font-label-badge text-label-badge bg-surface-container-highest px-space-sm py-1 rounded-md text-on-surface-variant uppercase font-medium">
          Instant Feed
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-start">
          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant">
              Nama Produk
            </label>
            <input
              type="text"
              value={newProdName}
              onChange={(e) => setNewProdName(e.target.value)}
              placeholder="e.g. Celana Kulot Linen"
              required
              className="w-full bg-surface-container-lowest border border-surface-container-high/60 px-space-md py-2.5 rounded-xl text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
            />
          </div>

          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant">
              Gender Persona Model
            </label>
            <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest border border-surface-container-high/60 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setNewProdGender("female")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-space-sm rounded-lg cursor-pointer transition-all font-body-sm text-body-sm ${
                  newProdGender === "female"
                    ? "bg-tertiary-container/30 text-tertiary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">female</span>
                <span>Cewek</span>
              </button>
              <button
                type="button"
                onClick={() => setNewProdGender("male")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-space-sm rounded-lg cursor-pointer transition-all font-body-sm text-body-sm ${
                  newProdGender === "male"
                    ? "bg-secondary-container/30 text-secondary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">male</span>
                <span>Cowok</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col justify-end">
            <label className="font-label-code text-label-code text-transparent md:block hidden">
              Aksi
            </label>
            <button
              type="submit"
              className="w-full py-2.5 px-space-md rounded-xl bg-primary text-primary-foreground font-headline-sm text-headline-sm flex items-center justify-center gap-1 hover:brightness-105 shadow-sm transition-all cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tambah Produk
            </button>
          </div>
        </div>

        <ProductImageUploader
          imageUrl={imageUrl}
          onImageChange={setImageUrl}
        />
      </form>
    </div>
  );
}
