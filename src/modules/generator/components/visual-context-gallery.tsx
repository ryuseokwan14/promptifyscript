import React from "react";
import { Product } from "@/types";

interface VisualContextGalleryProps {
  product?: Product;
}

export function VisualContextGallery({ product }: VisualContextGalleryProps) {
  return (
    <div className="bg-surface-container-lowest border border-surface-container-high/30 p-space-md rounded-2xl flex flex-col gap-space-sm shadow-inner">
      <div className="flex items-center justify-between">
        <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-semibold">
          Active Product Imagery &amp; Setting Context
        </span>
        <span className="font-label-code text-label-code text-secondary flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Synchronized
        </span>
      </div>
      <div className="grid grid-cols-3 gap-space-sm">
        <div className="h-28 rounded-xl overflow-hidden relative group border border-surface-container-high/40">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product?.imageFit || product?.imageUrl || "/next.svg"}
            alt="Fit & Silhouette"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent flex items-end p-2">
            <span className="font-label-badge text-label-badge text-on-surface text-[10px] bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
              Fit &amp; Silhouette
            </span>
          </div>
        </div>

        <div className="h-28 rounded-xl overflow-hidden relative group border border-surface-container-high/40">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product?.imageTexture || "/next.svg"}
            alt="Fabric Texture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent flex items-end p-2">
            <span className="font-label-badge text-label-badge text-on-surface text-[10px] bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
              Fabric Texture
            </span>
          </div>
        </div>

        <div className="h-28 rounded-xl overflow-hidden relative group border border-surface-container-high/40">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product?.imageAtmosphere || "/next.svg"}
            alt="Location Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent flex items-end p-2">
            <span className="font-label-badge text-label-badge text-on-surface text-[10px] bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
              Location Atmosphere
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
