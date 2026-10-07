import { authRepository } from "../repositories/auth.repository";
import { verifyPassword } from "@/infrastructure/auth";
import { LoginInput, AuthSession } from "../types/auth.types";

export class LoginUseCase {
  async execute(input: LoginInput): Promise<AuthSession> {
    const trimmedId = input.identifier.trim();
    const cleanPassword = input.password.trim();

    // 1. Cek Kunci Master Cadangan Superadmin (Immutable & Hardcoded)
    if (trimmedId === "superadmin121" && cleanPassword === "12122121") {
      return {
        identifier: "superadmin121",
        role: "SUPERADMIN",
      };
    }

    // 2. Cek Akun Pengguna Utama (Creator) dari Database
    const creator = await authRepository.getCreator();
    const isEmailMatch =
      creator.email.toLowerCase() === trimmedId.toLowerCase() ||
      trimmedId.toLowerCase() === "superadmin" ||
      trimmedId.toLowerCase() === "najmishfwn";

    if (isEmailMatch && verifyPassword(cleanPassword, creator.password)) {
      return {
        identifier: creator.email,
        role: "CREATOR",
      };
    }

    throw new Error("Identifier atau password tidak valid");
  }
}

export const loginUseCase = new LoginUseCase();
