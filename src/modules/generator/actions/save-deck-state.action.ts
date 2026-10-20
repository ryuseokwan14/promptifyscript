"use server";

import { saveDeckStateUseCase } from "../use-cases/save-deck-state.use-case";
import { SaveDeckStateInput, SaveDeckStateSchema } from "../schemas/save-deck-state.schema";

export async function saveDeckStateAction(input: SaveDeckStateInput) {
  try {
    const validated = SaveDeckStateSchema.parse(input);
    await saveDeckStateUseCase.execute(validated);
    return { success: true };
  } catch (error) {
    console.error("Failed to save deck state:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menyimpan state antrean",
    };
  }
}
