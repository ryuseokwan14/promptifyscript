"use server";

import { createActionUseCase } from "../use-cases/create-action.use-case";
import { CreateActionInput, CreateActionSchema } from "../schemas/create-action.schema";

export async function createActionAction(input: CreateActionInput) {
  try {
    const validated = CreateActionSchema.parse(input);
    const action = await createActionUseCase.execute(validated);
    return { success: true, data: action };
  } catch (error) {
    console.error("Failed to create action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan aksi baru",
    };
  }
}
