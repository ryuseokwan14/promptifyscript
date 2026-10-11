"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Header } from "@/common/components/header";
import { Footer } from "@/common/components/footer";
import { useApp } from "@/common/context/app-context";
import { GenerationResult } from "@/types";
import {
  LiveStudioBar,
  ProductSelector,
  VibeSelector,
  GeneratorControls,
  GeneratedPromptStudio,
  LiveAssembledCatalog,
} from "@/modules/generator";

export default function GeneratorPage() {
  const {
    products,
    scripts,
    activeProductId,
    setActiveProductId,
    activeVibe,
    setActiveVibe,
    locationCounts,
    generatePrompt,
    compileLivePrompt,
    isLoaded,
  } = useApp();

  const [generatedResult, setGeneratedResult] = useState<GenerationResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const triggerCycleAlert = (res: GenerationResult) => {
    if (!res.cycleInfo) return;
    if (res.cycleInfo.scriptCycleReset) {
      toast.info(`Siklus Baru: Putaran #${res.cycleInfo.scriptCycleNumber}`, {
        description: `Seluruh ${res.cycleInfo.scriptTotal} naskah produk ini telah terpakai. Putaran daur ulang dimulai.`,
      });
    } else if (res.cycleInfo.scriptIsLastInCycle) {
      toast.warning("Batas Aman Naskah Unik", {
        description: "Ini naskah unik terakhir di siklus ini. Klik berikutnya akan mulai mendaur ulang.",
      });
    }
  };

  const handleGenerate = useCallback(() => {
    if (!activeVibe) {
      toast.warning("Pilih Vibe Terlebih Dahulu", {
        description: "Silakan pilih salah satu vibe tempat di Langkah 2 sebelum generate.",
      });
      return;
    }
    setIsRolling(true);
    setTimeout(() => {
      const res = generatePrompt(activeProductId, activeVibe);
      if (res) {
        setGeneratedResult(res);
        triggerCycleAlert(res);
        toast.success("Prompt berhasil di-generate!", {
          description: `Vibe: ${activeVibe} • Siap copy di studio.`,
        });
      }
      setIsRolling(false);
    }, 250);
  }, [activeVibe, activeProductId, generatePrompt]);

  const handleReroll = useCallback(() => {
    if (!activeVibe) return;
    setIsRolling(true);
    setTimeout(() => {
      const res = generatePrompt(activeProductId, activeVibe);
      if (res) {
        setGeneratedResult(res);
        triggerCycleAlert(res);
      }
      setIsRolling(false);
    }, 200);
  }, [activeVibe, activeProductId, generatePrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body && activeVibe && !isRolling) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVibe, isRolling, handleGenerate]);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-16 flex-1 px-3 sm:px-gutter max-w-7xl mx-auto pb-24 sm:pb-space-xl">
        <div className="flex flex-col w-full">
          <LiveStudioBar />
          <div className="w-full flex flex-col gap-4 mt-2">
            {/* Layer 1: Konfigurasi 2 Kolom (Target Produk & Vibe Tempat) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <ProductSelector
                products={products}
                scripts={scripts}
                activeProductId={activeProductId}
                onSelectProduct={setActiveProductId}
                isLoading={!isLoaded}
              />
              <VibeSelector
                activeVibe={activeVibe}
                onSelectVibe={setActiveVibe}
                locationCounts={locationCounts}
              />
            </div>

            {/* Layer 2: Tombol Aksi Kompilasi & Re-roll */}
            <GeneratorControls
              isRolling={isRolling}
              canGenerate={activeVibe !== null}
              onGenerate={handleGenerate}
              onReroll={handleReroll}
            />

            {/* Layer 3: Studio Output Hasil Prompt */}
            <GeneratedPromptStudio
              result={generatedResult}
              onReroll={handleReroll}
              isRolling={isRolling}
            />
          </div>
          <LiveAssembledCatalog
            products={products}
            compileLivePrompt={compileLivePrompt}
            isLoaded={isLoaded}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
