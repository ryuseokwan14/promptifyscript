import { productRepository } from "@/modules/products/repositories/product.repository";
import { scriptRepository } from "@/modules/scripts/repositories/script.repository";
import { locationRepository } from "@/modules/locations/repositories/location.repository";
import { templateRepository } from "@/modules/templates/repositories/template.repository";
import { GeneratePromptInput, GeneratePromptSchema } from "../schemas/generate-prompt.schema";
import { deckRotator } from "../utils/deck-rotator";

export class GeneratePromptUseCase {
  async execute(input: GeneratePromptInput) {
    const validated = GeneratePromptSchema.parse(input);

    const product = await productRepository.findById(validated.productId);
    if (!product) {
      throw new Error(`Produk dengan ID ${validated.productId} tidak ditemukan.`);
    }

    // 1. Ambil Lokasi dari Seluruh Bank Data (Rotasi Non-Repeating Adil)
    const allLocations = await locationRepository.findAll();
    let selectedLocation = validated.overrideLocation;
    let locPick = null;
    if (!selectedLocation) {
      if (allLocations.length > 0) {
        locPick = deckRotator.pickNonRepeating(
          "server_locations",
          allLocations,
          (l) => l.name
        );
        selectedLocation = locPick.item ? locPick.item.name : allLocations[0].name;
      } else {
        selectedLocation = "clean grey seamless photo studio dengan soft lighting";
      }
    }

    // 2. Ambil Script Dialog Gerak Bibir Terkait Produk (Rotasi Non-Repeating Merata)
    const scripts = await scriptRepository.findByProductId(product.id);
    let selectedScriptText = validated.overrideScriptText || "";
    let selectedScriptId: string | null = null;
    let scriptPick = null;

    if (!selectedScriptText) {
      if (scripts.length > 0) {
        scriptPick = deckRotator.pickNonRepeating(
          `server_scripts_${product.id}`,
          scripts,
          (s) => s.id
        );
        if (scriptPick.item) {
          selectedScriptText = scriptPick.item.text;
          selectedScriptId = scriptPick.item.id;
        } else {
          selectedScriptText = scripts[0].text;
          selectedScriptId = scripts[0].id;
        }
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

    // 4. Kompilasi & Rakit Prompt Video
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
      cycleInfo: {
        scriptCycleReset: scriptPick?.isCycleReset ?? false,
        scriptIsLastInCycle: scriptPick?.isLastInCycle ?? false,
        scriptRemaining: scriptPick?.remainingInCycle ?? 0,
        scriptTotal: scriptPick?.totalCandidates ?? scripts.length,
        scriptCycleNumber: scriptPick?.cycleNumber ?? 1,
        locationCycleReset: locPick?.isCycleReset ?? false,
        locationIsLastInCycle: locPick?.isLastInCycle ?? false,
        locationRemaining: locPick?.remainingInCycle ?? 0,
        locationTotal: locPick?.totalCandidates ?? allLocations.length,
      },
    };
  }
}

export const generatePromptUseCase = new GeneratePromptUseCase();
