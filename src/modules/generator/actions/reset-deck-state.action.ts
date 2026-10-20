"use server";

import { resetDeckStateUseCase } from "../use-cases/reset-deck-state.use-case";
import { ResetDeckStateInput, ResetDeckStateSchema } from "../schemas/reset-deck-state.schema";

export async function resetDeckStateAction(input?: ResetDeckStateInput) {
  try {
    const validated = ResetDeckStateSchema.parse(input || {});
    const data = await resetDeckStateUseCase.execute(validated);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to reset deck state:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mereset siklus antrean",
    };
  }
}
