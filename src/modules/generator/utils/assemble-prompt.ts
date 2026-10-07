import { Product, ScriptItem, MasterTemplates, GenerationResult } from "@/types";
import { deckRotator } from "./deck-rotator";

interface CompilePromptOptions {
  product: Product;
  scripts: ScriptItem[];
  locations: string[];
  templates: MasterTemplates;
  overrideLocation?: string;
  overrideScriptText?: string;
}

export function compileVideoPrompt({
  product,
  scripts,
  locations,
  templates,
  overrideLocation,
  overrideScriptText,
}: CompilePromptOptions): GenerationResult {
  // 1. Pilih Lokasi dari Seluruh Bank Data (Rotasi Non-Repeating Adil)
  let selectedLocation = overrideLocation;
  let locPick = null;
  if (!selectedLocation) {
    if (locations.length > 0) {
      locPick = deckRotator.pickNonRepeating(
        "generator_locations",
        locations,
        (l) => l
      );
      selectedLocation = locPick.item || locations[0];
    } else {
      selectedLocation = "clean grey seamless photo studio dengan soft lighting";
    }
  }

  // 2. Ambil Script Dialog Gerak Bibir Terkait Produk (Rotasi Non-Repeating Merata)
  const productScripts = scripts.filter((s) => s.productId === product.id);
  const fallbackScript =
    product.gender === "female"
      ? "Bahan ini beneran halus dan adem banget, cuttingannya pas bikin look keliatan effortless!"
      : "Fittingnya beneran pas, bahan kuat dan nyaman banget dipake harian!";

  let selectedScript = overrideScriptText;
  let scriptPick = null;
  if (!selectedScript) {
    if (productScripts.length > 0) {
      scriptPick = deckRotator.pickNonRepeating(
        `generator_scripts_${product.id}`,
        productScripts,
        (s) => s.id || s.text
      );
      selectedScript = scriptPick.item?.text || fallbackScript;
    } else {
      selectedScript = fallbackScript;
    }
  }

  // 3. Ambil Master Template Sesuai Gender
  const templateText = product.gender === "female" ? templates.female : templates.male;

  // 4. Injeksi & Kompilasi Variabel Prompt
  const assembled = templateText
    .replace(/\{tempat\}/gi, selectedLocation)
    .replace(/\{produk\}/gi, product.itemDesc || product.name)
    .replace(/\{Script gerak bibir\}/gi, selectedScript);

  const wordCount = assembled.split(/\s+/).length;
  const tokens = Math.round(wordCount * 1.35);

  return {
    prompt: assembled,
    location: selectedLocation,
    script: selectedScript,
    tokens,
    product,
    cycleInfo: {
      scriptCycleReset: scriptPick?.isCycleReset ?? false,
      scriptIsLastInCycle: scriptPick?.isLastInCycle ?? false,
      scriptRemaining: scriptPick?.remainingInCycle ?? 0,
      scriptTotal: scriptPick?.totalCandidates ?? productScripts.length,
      scriptCycleNumber: scriptPick?.cycleNumber ?? 1,
      locationCycleReset: locPick?.isCycleReset ?? false,
      locationIsLastInCycle: locPick?.isLastInCycle ?? false,
      locationRemaining: locPick?.remainingInCycle ?? 0,
      locationTotal: locPick?.totalCandidates ?? locations.length,
    },
  };
}
