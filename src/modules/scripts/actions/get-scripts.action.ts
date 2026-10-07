"use server";

import { getScriptsUseCase } from "../use-cases/get-scripts.use-case";

export async function getScriptsAction(productId?: string) {
  try {
    const scripts = await getScriptsUseCase.execute(productId);
    return { success: true, data: scripts };
  } catch (error) {
    console.error("Failed to get scripts:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil data script",
    };
  }
}
