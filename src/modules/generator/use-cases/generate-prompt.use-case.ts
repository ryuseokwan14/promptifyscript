import { productRepository } from "@/modules/products/repositories/product.repository";
import { scriptRepository } from "@/modules/scripts/repositories/script.repository";
import { locationRepository } from "@/modules/locations/repositories/location.repository";
import { templateRepository } from "@/modules/templates/repositories/template.repository";
import { GeneratePromptInput, GeneratePromptSchema } from "../schemas/generate-prompt.schema";

export class GeneratePromptUseCase {
  async execute(input: GeneratePromptInput) {
    const validated = GeneratePromptSchema.parse(input);

    const product = await productRepository.findById(validated.productId);
    if (!product) {
      throw new Error(`Produk dengan ID ${validated.productId} tidak ditemukan.`);
    }

    // 1. Tentukan Vibe Lokasi Berdasarkan Karakter Produk & Gender (3-Mode System)
    const isUrbanOrAdventure =
      product.name.toLowerCase().includes("cargo") ||
      product.name.toLowerCase().includes("boxy") ||
      product.name.toLowerCase().includes("jacket") ||
      product.gender === "male";

    const targetVibes = isUrbanOrAdventure
      ? ["urban_adventure", "universal"]
      : ["casual_aesthetic", "universal"];

    let eligibleLocations = await locationRepository.findByVibe(targetVibes);
    if (eligibleLocations.length === 0) {
      eligibleLocations = await locationRepository.findAll();
    }

    const selectedLocation =
      validated.overrideLocation ||
      (eligibleLocations.length > 0
        ? eligibleLocations[Math.floor(Math.random() * eligibleLocations.length)].name
        : "clean grey seamless photo studio dengan soft lighting");

    // 2. Ambil Script Dialog Gerak Bibir Terkait Produk
    const scripts = await scriptRepository.findByProductId(product.id);
    let selectedScriptText = validated.overrideScriptText || "";
    let selectedScriptId: string | null = null;

    if (!selectedScriptText) {
      if (scripts.length > 0) {
        const picked = scripts[Math.floor(Math.random() * scripts.length)];
        selectedScriptText = picked.text;
        selectedScriptId = picked.id;
      } else {
        selectedScriptText =
          product.gender === "female"
            ? "Bahan ini beneran halus dan adem banget, cuttingannya pas bikin look keliatan effortless!"
            : "Fittingnya beneran pas, bahan kuat dan nyaman banget dipake harian!";
      }
    }

    // Inkrement usedCount jika script berasal dari database
    if (selectedScriptId) {
      scriptRepository.incrementUsedCount(selectedScriptId).catch((err) => {
        console.warn("Failed to increment script count:", err);
      });
    }

    // 3. Ambil Master Template Sesuai Gender Persona
    const genderKey = (product.gender === "male" ? "male" : "female") as "female" | "male";
    const templateRecord = await templateRepository.findByGender(genderKey);

    const fallbackTemplate =
      genderKey === "female"
        ? `Seorang Perempuan berjalan dengan suasana ceria dan gerakan ringan model berada di {tempat}, Gerakan tangan ringan menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi bahagia namun natural, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`
        : `Seorang Pria berjalan dengan langkah santai dan percaya diri model berada di {tempat}, Gerakan tangan santai menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi santai namun percaya diri, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`;

    const templateContent = templateRecord?.content || fallbackTemplate;

    // 4. Kompilasi & Rakit Prompt Video Gemini
    const itemDescription = product.itemDesc || product.name;
    const compiled = templateContent
      .replace(/\{tempat\}/gi, selectedLocation)
      .replace(/\{produk\}/gi, itemDescription)
      .replace(/\{Script gerak bibir\}/gi, selectedScriptText);

    const wordCount = compiled.split(/\s+/).length;
    const tokens = Math.round(wordCount * 1.35);

    return {
      prompt: compiled,
      location: selectedLocation,
      script: selectedScriptText,
      tokens,
      product,
    };
  }
}

export const generatePromptUseCase = new GeneratePromptUseCase();
