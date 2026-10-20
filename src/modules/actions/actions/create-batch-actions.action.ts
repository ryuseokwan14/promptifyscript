"use server";

import { createBatchActionsUseCase } from "../use-cases/create-batch-actions.use-case";
import { CreateBatchActionsInput, CreateBatchActionsSchema } from "../schemas/create-batch-actions.schema";

export async function createBatchActionsAction(input: CreateBatchActionsInput) {
  try {
    const validated = CreateBatchActionsSchema.parse(input);
    const result = await createBatchActionsUseCase.execute(validated);
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to batch create actions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan batch aksi",
    };
  }
}
