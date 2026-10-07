"use server";

import { createBatchScriptsUseCase } from "../use-cases/create-batch-scripts.use-case";
import { CreateBatchScriptsInput, CreateBatchScriptsSchema } from "../schemas/create-batch-scripts.schema";

export async function createBatchScriptsAction(input: CreateBatchScriptsInput) {
  try {
    const validated = CreateBatchScriptsSchema.parse(input);
    const result = await createBatchScriptsUseCase.execute(validated);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to batch create scripts:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan batch scripts",
    };
  }
}
