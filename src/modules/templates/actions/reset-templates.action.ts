"use server";

import { resetTemplatesUseCase } from "../use-cases/reset-templates.use-case";

export async function resetTemplatesAction() {
  try {
    const templates = await resetTemplatesUseCase.execute();
    return { success: true, data: templates };
  } catch (error) {
    console.error("Failed to reset templates:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mereset template",
    };
  }
}
