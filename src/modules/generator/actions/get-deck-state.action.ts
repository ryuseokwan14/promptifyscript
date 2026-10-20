"use server";

import { getDeckStateUseCase } from "../use-cases/get-deck-state.use-case";

export async function getDeckStateAction() {
  try {
    const data = await getDeckStateUseCase.execute();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to get deck state:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil state antrean",
    };
  }
}
