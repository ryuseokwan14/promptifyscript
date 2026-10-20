import { Product, ScriptItem, MasterTemplates, GenerationResult, VibeType } from "@/types";
import { deckRotator } from "./deck-rotator";

interface CompilePromptOptions {
  product: Product;
  scripts: ScriptItem[];
  locations: string[];
  actions?: string[];
  includeAction?: boolean;
  templates: MasterTemplates;
  overrideLocation?: string;
  overrideAction?: string;
  overrideScriptText?: string;
  locationPoolKey?: string;
  actionPoolKey?: string;
  scriptPoolKey?: string;
  vibe?: VibeType;
}

export function compileVideoPrompt({
  product,
  scripts,
  locations,
  actions = [],
  includeAction = false,
  templates,
  overrideLocation,
  overrideAction,
  overrideScriptText,
  locationPoolKey,
  actionPoolKey,
  scriptPoolKey,
  vibe,
}: CompilePromptOptions): GenerationResult {
  // 1. Pilih Lokasi dari Seluruh Bank Data (Rotasi Non-Repeating Adil)
  let selectedLocation = overrideLocation;
  let locPick = null;
  if (!selectedLocation) {
    if (locations.length > 0) {
      const locKey = locationPoolKey || "generator_locations";
      locPick = deckRotator.pickNonRepeating(
        locKey,
        locations,
        (l) => l
      );
      selectedLocation = locPick.item || locations[0];
    } else {
      selectedLocation = "clean grey seamless photo studio dengan soft lighting";
    }
  }

  // 2. Pilih Aksi HANYA jika mode includeAction aktif
  let selectedAction: string | undefined = undefined;
  let actionPick: ReturnType<typeof deckRotator.pickNonRepeating<string>> | null = null;

  if (includeAction) {
    selectedAction = overrideAction;
    if (!selectedAction) {
      if (actions.length > 0) {
        const actKey = actionPoolKey || "generator_actions";
        actionPick = deckRotator.pickNonRepeating(
          actKey,
          actions,
          (a) => a
        );
        selectedAction = actionPick.item || actions[0];
      } else {
        selectedAction = "berdiri santai dan percaya diri";
      }
    }
  }

  // 3. Ambil Script Dialog Gerak Bibir Terkait Produk (Rotasi Non-Repeating Merata)
  const productScripts = scripts.filter((s) => s.productId === product.id);
  const fallbackScript =
    product.gender === "female"
      ? "Bahan ini beneran halus dan adem banget, cuttingannya pas bikin look keliatan effortless!"
      : "Fittingnya beneran pas, bahan kuat dan nyaman banget dipake harian!";

  let selectedScript = overrideScriptText;
  let scriptPick = null;
  if (!selectedScript) {
    if (productScripts.length > 0) {
      const scrKey = scriptPoolKey || `generator_scripts_${product.id}`;
      scriptPick = deckRotator.pickNonRepeating(
        scrKey,
        productScripts,
        (s) => s.id || s.text
      );
      selectedScript = scriptPick.item?.text || fallbackScript;
    } else {
      selectedScript = fallbackScript;
    }
  }

  // 4. Ambil Master Template Sesuai Gender
  const templateText = product.gender === "female" ? templates.female : templates.male;

  // 5. Injeksi & Kompilasi Variabel Prompt
  let assembled = templateText
    .replace(/\{tempat\}/gi, selectedLocation)
    .replace(/\{produk\}/gi, product.itemDesc || product.name)
    .replace(/\{Script gerak bibir\}/gi, selectedScript);

  if (includeAction && selectedAction) {
    assembled = assembled.replace(/\{aksi\}/gi, selectedAction);
  } else {
    // Smart strip placeholder {aksi} agar tata bahasa tetap mulus dan bebas tanda baca ganda
    assembled = assembled
      .replace(/\s*,\s*\{aksi\}\s*,\s*/gi, ", ")
      .replace(/\s*,\s*\{aksi\}\s*/gi, "")
      .replace(/\s*\{aksi\}\s*,\s*/gi, "")
      .replace(/\s*\.\s*\{aksi\}\s*/gi, ". ")
      .replace(/\s*\{aksi\}\s*\.\s*/gi, ". ")
      .replace(/\{aksi\}/gi, "")
      .replace(/,\s*,/g, ",")
      .replace(/\.\s*\./g, ".")
      .replace(/,\s*\./g, ".")
      .replace(/[ \t]{2,}/g, " ")
      .trim();
  }

  const wordCount = assembled.split(/\s+/).length;
  const tokens = Math.round(wordCount * 1.35);

  return {
    prompt: assembled,
    location: selectedLocation,
    action: selectedAction,
    script: selectedScript,
    tokens,
    product,
    vibe,
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
      actionCycleReset: actionPick?.isCycleReset ?? false,
      actionIsLastInCycle: actionPick?.isLastInCycle ?? false,
      actionRemaining: actionPick?.remainingInCycle ?? 0,
      actionTotal: actionPick?.totalCandidates ?? actions.length,
    },
  };
}
