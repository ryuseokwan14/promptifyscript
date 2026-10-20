"use server";

import { updateActionUseCase } from "../use-cases/update-action.use-case";
import { UpdateActionInput, UpdateActionSchema } from "../schemas/update-action.schema";

export async function updateActionAction(input: UpdateActionInput) {
  try {
    const validated = UpdateActionSchema.parse(input);
    const updated = await updateActionUseCase.execute(validated);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui aksi",
    };
  }
}
