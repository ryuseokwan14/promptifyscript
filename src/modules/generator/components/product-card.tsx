import React from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  isActive: boolean;
  scriptCount: number;
  onSelect: (id: string) => void;
}

export function ProductCard({ product, isActive, scriptCount, onSelect }: ProductCardProps) {
  const isFemale = product.gender === "female";
  const displayImage = product.imageUrl || product.imageFit;

  return (
    <div
      onClick={() => onSelect(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(product.id);
        }
      }}
      className={`group relative flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
        isActive
          ? "bg-surface-container-highest/90 border-primary shadow-[0_0_18px_rgba(128,131,255,0.2)] ring-1 ring-primary/60"
          : "bg-surface-container hover:bg-surface-container-high border-surface-container-high/60 text-on-surface-variant hover:text-on-surface"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Compact Thumbnail */}
        <div className="w-11 h-11 rounded-lg overflow-hidden bg-surface-container-lowest shrink-0 border border-surface-container-high/50 flex items-center justify-center relative">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              {product.icon || (isFemale ? "checkroom" : "man")}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col min-w-0 flex-1 gap-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-headline-sm text-[13.5px] font-semibold truncate leading-tight transition-colors ${
                isActive ? "text-primary" : "text-on-surface"
              }`}
            >
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-label-code">
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded font-medium ${
                isFemale
                  ? "text-tertiary bg-tertiary/10 border border-tertiary/20"
                  : "text-secondary bg-secondary/10 border border-secondary/20"
              }`}
            >
              <span className="material-symbols-outlined text-[12px]">
                {isFemale ? "female" : "male"}
              </span>
              <span>{isFemale ? "Wanita" : "Pria"}</span>
            </span>

            <span className="text-on-surface-variant flex items-center gap-1 truncate">
              <span className="material-symbols-outlined text-[13px] text-outline">
                graphic_eq
              </span>
              <span>{scriptCount} Naskah</span>
            </span>
          </div>
        </div>
      </div>

      {/* Active Indicator Radio/Check */}
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
          isActive
            ? "bg-primary border-primary text-on-primary shadow-sm"
            : "border-outline/40 text-transparent group-hover:border-outline"
        }`}
      >
        <span className="material-symbols-outlined text-[13px] font-bold">
          check
        </span>
      </div>
    </div>
  );
}
