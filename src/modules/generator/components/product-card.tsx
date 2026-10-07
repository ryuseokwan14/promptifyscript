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
      className={`product-card group relative flex flex-col rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden border ${
        isActive
          ? "bg-surface-container ring-2 ring-primary-container border-primary-container shadow-[0_0_28px_rgba(128,131,255,0.28)] -translate-y-0.5"
          : "bg-surface-container-low border-surface-container-high/50 hover:bg-surface-container hover:border-surface-container-highest hover:shadow-xl hover:-translate-y-0.5"
      }`}
    >
      {/* Visual Hero Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container-lowest">
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Ambient Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-surface-container-high/40 via-surface-container to-surface-container-lowest text-center">
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest/80 border border-white/5 flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:scale-105 transition-all duration-300 shadow-inner">
              <span className="material-symbols-outlined text-[26px]">
                {product.icon || (isFemale ? "checkroom" : "man")}
              </span>
            </div>
            <span className="mt-2 text-[11px] font-label-code text-on-surface-variant/60">
              Belum ada foto produk
            </span>
          </div>
        )}

        {/* Floating Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
          <span
            className={`font-label-badge text-label-badge px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md transition-colors ${
              isFemale
                ? "text-tertiary bg-surface-container-lowest/80 border-tertiary/30"
                : "text-secondary bg-surface-container-lowest/80 border-secondary/30"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">
                {isFemale ? "female" : "male"}
              </span>
              <span>{isFemale ? "Cewek" : "Cowok"}</span>
            </span>
          </span>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isActive
                ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(192,193,255,0.6)] ring-2 ring-primary/40"
                : "bg-surface-container-lowest/70 backdrop-blur-md text-transparent border border-white/20 group-hover:border-primary/50 group-hover:text-white/40"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[15px] font-bold ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              check
            </span>
          </div>
        </div>
      </div>

      {/* Card Body / Product Info */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 flex-1 justify-between">
        <div>
          <h3
            className={`font-headline-sm text-[16px] font-semibold leading-snug line-clamp-1 transition-colors ${
              isActive ? "text-primary" : "text-on-surface group-hover:text-primary-fixed"
            }`}
          >
            {product.name}
          </h3>
          {product.itemDesc && (
            <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1 mt-0.5">
              {product.itemDesc}
            </p>
          )}
        </div>

        {/* Variations Pill */}
        <div
          className={`flex items-center justify-between font-label-code text-[11.5px] px-2.5 py-1.5 rounded-lg border transition-all ${
            isActive
              ? "bg-primary-container/20 border-primary-container/40 text-primary-fixed"
              : "bg-surface-container-lowest/70 border-surface-container-high/30 text-secondary group-hover:border-secondary/40"
          }`}
        >
          <div className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[15px]">graphic_eq</span>
            <span>{scriptCount} Lip-sync variations</span>
          </div>

          {isActive && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Aktif
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
