import { authRepository } from "../repositories/auth.repository";
import { hashPassword } from "@/infrastructure/auth";
import { ResetCreatorInput } from "../types/auth.types";

export class ResetCreatorUseCase {
  async execute(input: ResetCreatorInput): Promise<{ success: boolean; message: string; email: string }> {
    const creator = await authRepository.getCreator();
    const hashedPassword = hashPassword(input.newPassword.trim());

    const updated = await authRepository.updateCreatorCredentials(creator.id, {
      ...(input.email ? { email: input.email.trim() } : {}),
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Kredensial akun utama berhasil direset oleh Superadmin",
      email: updated.email,
    };
  }
}

export const resetCreatorUseCase = new ResetCreatorUseCase();
