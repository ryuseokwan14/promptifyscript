"use server";

import { deleteScriptUseCase } from "../use-cases/delete-script.use-case";
import { DeleteScriptInput, DeleteScriptSchema } from "../schemas/delete-script.schema";

export async function deleteScriptAction(input: DeleteScriptInput) {
  try {
    const validated = DeleteScriptSchema.parse(input);
    const deleted = await deleteScriptUseCase.execute(validated);
    return { success: true, data: deleted };
  } catch (error) {
    console.error("Failed to delete script:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus script",
    };
  }
}
