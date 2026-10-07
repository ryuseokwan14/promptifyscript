"use server";

import { updateTemplatesUseCase } from "../use-cases/update-templates.use-case";
import { UpdateTemplatesInput, UpdateTemplatesSchema } from "../schemas/update-templates.schema";

export async function updateTemplatesAction(input: UpdateTemplatesInput) {
  try {
    const validated = UpdateTemplatesSchema.parse(input);
    const updated = await updateTemplatesUseCase.execute(validated);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update templates:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui template",
    };
  }
}
