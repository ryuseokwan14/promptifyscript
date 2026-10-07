"use server";

import { createScriptUseCase } from "../use-cases/create-script.use-case";
import { CreateScriptInput, CreateScriptSchema } from "../schemas/create-script.schema";

export async function createScriptAction(input: CreateScriptInput) {
  try {
    const validated = CreateScriptSchema.parse(input);
    const script = await createScriptUseCase.execute(validated);
    return { success: true, data: script };
  } catch (error) {
    console.error("Failed to create script:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan script baru",
    };
  }
}
