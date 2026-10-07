import { Product, ScriptItem, MasterTemplates, GenerationResult } from "@/types";

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
  // 1. Tentukan Vibe Lokasi Berdasarkan Karakter Produk & Gender
  const isUrbanOrAdventure =
    product.name.toLowerCase().includes("cargo") ||
    product.name.toLowerCase().includes("boxy") ||
    product.name.toLowerCase().includes("jacket") ||
    product.gender === "male";

  // Filter lokasi santai vs adventure jika nama mengandung kata kunci
  let eligibleLocations = locations;
  if (isUrbanOrAdventure) {
    const matched = locations.filter(
      (l) =>
        l.includes("tunnel") ||
        l.includes("subway") ||
        l.includes("skatepark") ||
        l.includes("rooftop") ||
        l.includes("industrial") ||
        l.includes("jembatan") ||
        l.includes("studio") ||
        l.includes("living")
    );
    if (matched.length > 0) eligibleLocations = matched;
  } else {
    const matched = locations.filter(
      (l) =>
        l.includes("coffee") ||
        l.includes("pedestrian") ||
        l.includes("teras") ||
        l.includes("taman") ||
        l.includes("gallery") ||
        l.includes("studio") ||
        l.includes("living")
    );
    if (matched.length > 0) eligibleLocations = matched;
  }

  const selectedLocation =
    overrideLocation ||
    (eligibleLocations.length > 0
      ? eligibleLocations[Math.floor(Math.random() * eligibleLocations.length)]
      : "clean grey seamless photo studio dengan soft lighting");

  // 2. Ambil Script Dialog Gerak Bibir Terkait Produk
  const productScripts = scripts.filter((s) => s.productId === product.id);
  const fallbackScript =
    product.gender === "female"
      ? "Bahan ini beneran halus dan adem banget, cuttingannya pas bikin look keliatan effortless!"
      : "Fittingnya beneran pas, bahan kuat dan nyaman banget dipake harian!";

  const selectedScript =
    overrideScriptText ||
    (productScripts.length > 0
      ? productScripts[Math.floor(Math.random() * productScripts.length)].text
      : fallbackScript);

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
  };
}
