import React, { useState, useMemo } from "react";
import { Product, ScriptItem } from "@/types";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductSelectorProps {
  products: Product[];
  scripts: ScriptItem[];
  activeProductId: string;
  onSelectProduct: (id: string) => void;
  isLoading?: boolean;
}

export function ProductSelector({
  products,
  scripts,
  activeProductId,
  onSelectProduct,
  isLoading = false,
}: ProductSelectorProps) {
  const [genderFilter, setGenderFilter] = useState<"all" | "female" | "male">("all");

  const femaleCount = useMemo(() => products.filter((p) => p.gender === "female").length, [products]);
  const maleCount = useMemo(() => products.filter((p) => p.gender === "male").length, [products]);

  const filteredProducts = useMemo(() => {
    if (genderFilter === "female") return products.filter((p) => p.gender === "female");
    if (genderFilter === "male") return products.filter((p) => p.gender === "male");
    return products;
  }, [products, genderFilter]);

  if (isLoading || products.length === 0) {
    return (
      <section className="bg-surface-container-low border border-surface-container-high/40 p-3 sm:p-space-md rounded-2xl flex flex-col gap-3 shadow-sm h-[350px]">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/30">
          <Skeleton className="h-5 w-40 bg-surface-container-high/60" />
          <Skeleton className="h-5 w-20 bg-surface-container-high/60" />
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl bg-surface-container-high/40" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-container-low border border-surface-container-high/40 p-3 sm:p-space-md rounded-2xl flex flex-col gap-3 shadow-sm h-[350px]">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-surface-container-high/30">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface font-semibold">
            1. Target Produk
          </span>
          <span className="font-label-code text-[11px] text-primary bg-primary-container/20 border border-primary/20 px-2 py-0.5 rounded-full font-medium">
            {products.length}
          </span>
        </div>

        {/* Gender Filter Pills */}
        <div className="flex items-center gap-1 bg-surface-container-lowest/80 p-0.5 rounded-lg border border-surface-container-high/40 text-[11.5px] font-label-code">
          <button
            type="button"
            onClick={() => setGenderFilter("all")}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              genderFilter === "all"
                ? "bg-surface-container-highest text-on-surface font-semibold shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setGenderFilter("female")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
              genderFilter === "female"
                ? "bg-tertiary-container/30 text-tertiary font-semibold border border-tertiary/30 shadow-xs"
                : "text-on-surface-variant hover:text-tertiary"
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">female</span>
            <span>{femaleCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setGenderFilter("male")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
              genderFilter === "male"
                ? "bg-secondary-container/30 text-secondary font-semibold border border-secondary/30 shadow-xs"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">male</span>
            <span>{maleCount}</span>
          </button>
        </div>
      </div>

      {/* Fixed Scrollable List Container */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1.5 focus:outline-none">
        {filteredProducts.map((product) => {
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
    </section>
  );
}
