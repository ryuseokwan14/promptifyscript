import React from "react";
import { Product, ScriptItem } from "@/types";
import { ProductCard } from "./product-card";

interface ProductSelectorProps {
  products: Product[];
  scripts: ScriptItem[];
  activeProductId: string;
  onSelectProduct: (id: string) => void;
}

export function ProductSelector({
  products,
  scripts,
  activeProductId,
  onSelectProduct,
}: ProductSelectorProps) {
  const femaleProducts = products.filter((p) => p.gender === "female");
  const maleProducts = products.filter((p) => p.gender === "male");

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            1. Pilih Target Produk
          </span>
          <span className="font-label-code text-label-code text-primary bg-primary-container/20 border border-primary/20 px-2 py-0.5 rounded-full">
            ({products.length} Produk Aktif)
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px]">touch_app</span>
          Klik untuk Pilih
        </span>
      </div>

      {femaleProducts.length > 0 && (
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-1.5 text-tertiary font-label-code text-label-code px-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">female</span>
            <span>Koleksi Wanita ({femaleProducts.length} Produk)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            {femaleProducts.map((product) => {
              const scriptCount = scripts.filter((s) => s.productId === product.id).length;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isActive={product.id === activeProductId}
                  scriptCount={scriptCount}
                  onSelect={onSelectProduct}
                />
              );
            })}
          </div>
        </div>
      )}

      {maleProducts.length > 0 && (
        <div className="flex flex-col gap-space-xs pt-space-xs">
          <div className="flex items-center gap-1.5 text-secondary font-label-code text-label-code px-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">male</span>
            <span>Koleksi Pria ({maleProducts.length} Produk)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            {maleProducts.map((product) => {
              const scriptCount = scripts.filter((s) => s.productId === product.id).length;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isActive={product.id === activeProductId}
                  scriptCount={scriptCount}
                  onSelect={onSelectProduct}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
