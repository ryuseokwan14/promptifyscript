"use server";

import { generatePromptUseCase } from "../use-cases/generate-prompt.use-case";
import { GeneratePromptInput, GeneratePromptSchema } from "../schemas/generate-prompt.schema";

export async function generatePromptAction(input: GeneratePromptInput) {
  try {
    const validated = GeneratePromptSchema.parse(input);
    const result = await generatePromptUseCase.execute(validated);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to generate prompt:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal meng-compile prompt",
    };
  }
}
