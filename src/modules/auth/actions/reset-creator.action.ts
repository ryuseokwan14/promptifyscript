"use server";

import { ResetCreatorSchema } from "../schemas/reset-creator.schema";
import { resetCreatorUseCase } from "../use-cases/reset-creator.use-case";

export async function resetCreatorAction(rawInput: unknown): Promise<{
  success: boolean;
  message: string;
  email?: string;
}> {
  try {
    const validated = ResetCreatorSchema.parse(rawInput);
    return await resetCreatorUseCase.execute(validated);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Gagal mereset kredensial akun utama",
    };
  }
}
