"use server";

import { deleteBatchActionsUseCase } from "../use-cases/delete-batch-actions.use-case";
import { DeleteBatchActionsInput, DeleteBatchActionsSchema } from "../schemas/delete-batch-actions.schema";

export async function deleteBatchActionsAction(input: DeleteBatchActionsInput) {
  try {
    const validated = DeleteBatchActionsSchema.parse(input);
    const result = await deleteBatchActionsUseCase.execute(validated);
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to batch delete actions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus batch aksi",
    };
  }
}
