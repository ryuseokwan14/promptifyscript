"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/common/components/header";
import { Footer } from "@/common/components/footer";
import { useApp } from "@/common/context/app-context";
import { GenerationResult } from "@/types";
import {
  LiveStudioBar,
  ProductSelector,
  GeneratorControls,
  PromptOutputBox,
  PromptActions,
  GeneratedPromptModal,
  PromptState,
} from "@/modules/generator";

export default function GeneratorPage() {
  const {
    products,
    scripts,
    activeProductId,
    setActiveProductId,
    generatePrompt,
    isLoaded,
  } = useApp();

  const [livePromptData, setLivePromptData] = useState<PromptState | null>(null);
  const [generatedResult, setGeneratedResult] = useState<GenerationResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  // Live Assembled Prompt: stabil mengikuti produk yang sedang aktif, tidak diganggu popup generate
  useEffect(() => {
    if (!isLoaded || products.length === 0) return;
    const timer = setTimeout(() => {
      const res = generatePrompt(activeProductId);
      if (res) {
        setLivePromptData({
          prompt: res.prompt,
          location: res.location,
          script: res.script,
          tokens: res.tokens,
        });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeProductId, isLoaded, products, generatePrompt]);

  // Generate Prompt: membuat kompilasi acak baru dan menampilkannya di popup modal
  const handleGenerate = () => {
    setIsRolling(true);
    setTimeout(() => {
      const res = generatePrompt(activeProductId);
      if (res) {
        setGeneratedResult(res);
        setIsModalOpen(true);
      }
      setIsRolling(false);
    }, 250);
  };

  const handleReroll = () => {
    setIsRolling(true);
    setTimeout(() => {
      const res = generatePrompt(activeProductId);
      if (res) {
        setGeneratedResult(res);
      }
      setIsRolling(false);
    }, 200);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Header />

      <main className="w-full pt-16 flex-1 px-gutter max-w-7xl mx-auto">
        <div className="flex flex-col w-full pb-space-xl">
          <LiveStudioBar />

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start mt-2">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <ProductSelector
                products={products}
                scripts={scripts}
                activeProductId={activeProductId}
                onSelectProduct={setActiveProductId}
              />

              <GeneratorControls
                isRolling={isRolling}
                onGenerate={handleGenerate}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <section className="bg-surface-container-low border border-surface-container-high/40 p-space-md rounded-2xl flex flex-col gap-space-md shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      2. Live Assembled Prompt
                    </span>
                  </div>
                  <span className="font-label-badge text-label-badge text-secondary bg-surface-container-highest px-2 py-0.5 rounded-full uppercase font-medium">
                    Live Preview
                  </span>
                </div>

                <PromptOutputBox promptData={livePromptData} />
                <PromptActions promptData={livePromptData} />
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Popup Modal untuk Generated Prompt (Acak) */}
      <GeneratedPromptModal
        isOpen={isModalOpen}
        result={generatedResult}
        onClose={() => setIsModalOpen(false)}
        onReroll={handleReroll}
        isRolling={isRolling}
      />
    </div>
  );
}
