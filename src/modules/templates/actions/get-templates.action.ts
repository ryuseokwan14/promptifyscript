"use server";

import { getTemplatesUseCase } from "../use-cases/get-templates.use-case";

export async function getTemplatesAction() {
  try {
    const templates = await getTemplatesUseCase.execute();
    return { success: true, data: templates };
  } catch (error) {
    console.error("Failed to get templates:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil data template",
    };
  }
}
