"use server";

import { UpdatePasswordSchema } from "../schemas/update-password.schema";
import { updatePasswordUseCase } from "../use-cases/update-password.use-case";

export async function updatePasswordAction(rawInput: unknown): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const validated = UpdatePasswordSchema.parse(rawInput);
    return await updatePasswordUseCase.execute(validated);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Gagal memperbarui password",
    };
  }
}
