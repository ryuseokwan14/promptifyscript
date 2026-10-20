"use server";

import { deleteActionUseCase } from "../use-cases/delete-action.use-case";
import { DeleteActionInput, DeleteActionSchema } from "../schemas/delete-action.schema";

export async function deleteActionAction(input: DeleteActionInput) {
  try {
    const validated = DeleteActionSchema.parse(input);
    await deleteActionUseCase.execute(validated);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus aksi",
    };
  }
}
