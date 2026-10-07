import { authRepository } from "../repositories/auth.repository";
import { verifyPassword, hashPassword } from "@/infrastructure/auth";
import { UpdatePasswordInput } from "../types/auth.types";

export class UpdatePasswordUseCase {
  async execute(input: UpdatePasswordInput): Promise<{ success: boolean; message: string }> {
    const creator = await authRepository.getCreator();

    const isMatch = verifyPassword(input.currentPassword.trim(), creator.password);
    if (!isMatch) {
      throw new Error("Password saat ini salah");
    }

    const hashed = hashPassword(input.newPassword.trim());
    await authRepository.updatePassword(creator.id, hashed);

    return {
      success: true,
      message: "Password berhasil diperbarui",
    };
  }
}

export const updatePasswordUseCase = new UpdatePasswordUseCase();
