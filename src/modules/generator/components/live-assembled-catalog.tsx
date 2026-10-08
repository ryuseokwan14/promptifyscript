import React, { useState, useEffect, useRef } from "react";
import { Product, GenerationResult } from "@/types";
import { LivePromptCard, LiveCardData } from "./live-prompt-card";

interface LiveAssembledCatalogProps {
  products: Product[];
  compileLivePrompt: (productId: string) => GenerationResult | null;
  isLoaded?: boolean;
}

export function LiveAssembledCatalog({
  products,
  compileLivePrompt,
  isLoaded = true,
}: LiveAssembledCatalogProps) {
  const [promptMap, setPromptMap] = useState<Record<string, LiveCardData>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const compileRef = useRef(compileLivePrompt);
  compileRef.current = compileLivePrompt;

  // Initial populate when products or isLoaded changes
  useEffect(() => {
    if (!isLoaded || products.length === 0) return;

    const initialMap: Record<string, LiveCardData> = {};
    for (const prod of products) {
      const res = compileRef.current(prod.id);
      if (res) {
        initialMap[prod.id] = {
          prompt: res.prompt,
          location: res.location,
          script: res.script,
          tokens: res.tokens,
        };
      }
    }
    setPromptMap(initialMap);
  }, [products, isLoaded]);

  // Interval timer for auto-rotation every 8 seconds
  useEffect(() => {
    if (!isLoaded || products.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setPromptMap((prev) => {
          const nextMap = { ...prev };
          for (const prod of products) {
            const res = compileRef.current(prod.id);
            if (res) {
              nextMap[prod.id] = {
                prompt: res.prompt,
                location: res.location,
                script: res.script,
                tokens: res.tokens,
              };
            }
          }
          return nextMap;
        });

        setIsTransitioning(false);
      }, 250);
    }, 8000);

    return () => clearInterval(interval);
  }, [products, isLoaded]);

  if (!isLoaded && products.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-8 sm:mt-12 flex flex-col gap-space-md border-t border-surface-container-high/40 pt-6 sm:pt-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[20px]">dynamic_feed</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-headline-sm text-[16px] sm:text-headline-sm text-on-surface font-semibold">
                Live Assembled Catalog
              </h2>
              <span className="font-label-code text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                {products.length} Produk Aktif
              </span>
            </div>
            <p className="font-body-sm text-[12px] sm:text-body-sm text-on-surface-variant">
              Auto-rotating live prompts per produk setiap ~8 detik dengan Bank Lokasi Universal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-[11px] font-label-code font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            LIVE SYNC • UNIVERSAL
          </span>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      {products.length === 0 ? (
        <div className="p-8 text-center bg-surface-container-low rounded-2xl border border-surface-container-high/40 text-on-surface-variant font-body-sm">
          Belum ada produk yang terdaftar di sistem.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md items-stretch">
          {products.map((product) => (
            <LivePromptCard
              key={product.id}
              product={product}
              data={promptMap[product.id] || null}
              isTransitioning={isTransitioning}
            />
          ))}
        </div>
      )}
    </section>
  );
}
