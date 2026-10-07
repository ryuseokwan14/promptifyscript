"use server";

import { cookies } from "next/headers";
import { LoginSchema } from "../schemas/login.schema";
import { loginUseCase } from "../use-cases/login.use-case";
import { signSessionToken, SESSION_COOKIE_NAME } from "@/infrastructure/auth";
import { User } from "@/types";

export async function loginAction(rawInput: unknown): Promise<{
  success: boolean;
  message?: string;
  user?: User;
}> {
  try {
    const validated = LoginSchema.parse(rawInput);
    const session = await loginUseCase.execute(validated);

    const token = await signSessionToken(session);
    const cookieStore = await cookies();

    // Session-only cookie (tanpa maxAge/expires) -> otomatis hangus saat browser ditutup (Kick Session)
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    const user: User = {
      email: session.identifier,
      name: session.role === "SUPERADMIN" ? "Master Superadmin" : session.identifier.split("@")[0] || "Creator",
      role: session.role,
    };

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Gagal memproses autentikasi",
    };
  }
}
