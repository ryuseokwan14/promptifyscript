"use server";

import { getActionsUseCase } from "../use-cases/get-actions.use-case";

export async function getActionsAction() {
  try {
    const actions = await getActionsUseCase.execute();
    return { success: true, data: actions };
  } catch (error) {
    console.error("Failed to get actions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil daftar aksi",
    };
  }
}
