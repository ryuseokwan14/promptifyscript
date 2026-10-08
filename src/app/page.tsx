"use client";

import React, { useState, useEffect } from "react";
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

  const handleGenerate = () => {
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
  };

  const handleReroll = () => {
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
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body && activeVibe && !isRolling) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVibe, isRolling, activeProductId]);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-16 flex-1 px-3 sm:px-gutter max-w-7xl mx-auto pb-24 sm:pb-space-xl">
        <div className="flex flex-col w-full">
          <LiveStudioBar />
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start mt-2">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
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
              <GeneratorControls
                isRolling={isRolling}
                canGenerate={activeVibe !== null}
                onGenerate={handleGenerate}
                onReroll={handleReroll}
              />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <GeneratedPromptStudio
                result={generatedResult}
                onReroll={handleReroll}
                isRolling={isRolling}
              />
            </div>
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
