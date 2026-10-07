import { verifySessionToken } from "@/infrastructure/auth";
import { authRepository } from "../repositories/auth.repository";
import { User } from "@/types";

export class GetCurrentUserUseCase {
  async execute(token?: string | null): Promise<{ user: User | null; creatorEmail: string | null }> {
    const session = await verifySessionToken(token);
    if (!session) {
      return { user: null, creatorEmail: null };
    }

    const creator = await authRepository.getCreator();

    if (session.role === "SUPERADMIN") {
      return {
        user: {
          email: "superadmin121",
          name: "Master Superadmin",
          role: "SUPERADMIN",
        },
        creatorEmail: creator.email,
      };
    }

    return {
      user: {
        email: creator.email,
        name: creator.email.split("@")[0] || "Creator",
        role: "CREATOR",
      },
      creatorEmail: creator.email,
    };
  }
}

export const getCurrentUserUseCase = new GetCurrentUserUseCase();
