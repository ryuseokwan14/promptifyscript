import React, { useState, useEffect, useRef } from "react";
import { Product, GenerationResult } from "@/types";
import { LivePromptCard, LiveCardData } from "./live-prompt-card";

interface LiveAssembledCatalogProps {
  products: Product[];
  compileLivePrompt: (productId: string) => GenerationResult | null;
  isLoaded?: boolean;
  includeAction?: boolean;
}

export function LiveAssembledCatalog({
  products,
  compileLivePrompt,
  isLoaded = true,
  includeAction = false,
}: LiveAssembledCatalogProps) {
  const [promptMap, setPromptMap] = useState<Record<string, LiveCardData>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const compileRef = useRef(compileLivePrompt);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    compileRef.current = compileLivePrompt;
  }, [compileLivePrompt]);

  // Cleanup touch timeout saat unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  // Handler interaksi touch mobile (jeda saat disentuh/scroll, grace period 5s saat dilepas)
  const handleTouchStart = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    setIsHovered(true);
  };

  const handleTouchMove = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 5000); // Waktu tenggang 5 detik setelah jari lepas dari layar HP
  };

  // Populate when products, isLoaded, or includeAction changes
  useEffect(() => {
    if (!isLoaded || products.length === 0) return;

    const initialMap: Record<string, LiveCardData> = {};
    for (const prod of products) {
      const res = compileRef.current(prod.id);
      if (res) {
        initialMap[prod.id] = {
          prompt: res.prompt,
          location: res.location,
          action: res.action,
          script: res.script,
          tokens: res.tokens,
        };
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPromptMap(initialMap);
  }, [products, isLoaded, includeAction]);

  // Interval timer for auto-rotation with Pause on Hover/Touch
  useEffect(() => {
    if (!isLoaded || products.length === 0) return;

    const interval = setInterval(() => {
      // Jika user sedang membaca (hover/touch), hitungan detik membeku/diam di tempat
      if (isHovered) return;

      setCountdown((prev) => {
        if (prev <= 1) {
          setIsTransitioning(true);

          setTimeout(() => {
            setPromptMap((prevMap) => {
              const nextMap = { ...prevMap };
              for (const prod of products) {
                const res = compileRef.current(prod.id);
                if (res) {
                  nextMap[prod.id] = {
                    prompt: res.prompt,
                    location: res.location,
                    action: res.action,
                    script: res.script,
                    tokens: res.tokens,
                  };
                }
              }
              return nextMap;
            });

            setIsTransitioning(false);
          }, 250);

          return 8; // Reset countdown kembali ke 8 detik setelah rotasi selesai
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [products, isLoaded, isHovered]);

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

        {/* Dedicated Countdown Timer Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11.5px] font-label-code font-medium transition-colors duration-200 border ${
              isHovered
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                : "bg-surface-container-high/80 border-surface-container-highest text-on-surface"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[15px] ${
                isHovered ? "text-amber-400" : "text-secondary"
              }`}
            >
              {isHovered ? "pause" : "timer"}
            </span>
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`font-bold font-label-code ${isHovered ? "text-amber-300" : "text-secondary"}`}>
                {countdown}s
              </span>
              <span className="text-outline/40">•</span>
              <span className={`text-[10.5px] ${isHovered ? "text-amber-400/90" : "text-on-surface-variant"}`}>
                {isHovered ? "Dijeda" : "Auto-Rotate"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      {products.length === 0 ? (
        <div className="p-8 text-center bg-surface-container-low rounded-2xl border border-surface-container-high/40 text-on-surface-variant font-body-sm">
          Belum ada produk yang terdaftar di sistem.
        </div>
      ) : (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md items-stretch"
        >
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
