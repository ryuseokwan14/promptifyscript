"use server";

import { cookies } from "next/headers";
import { getCurrentUserUseCase } from "../use-cases/get-current-user.use-case";
import { SESSION_COOKIE_NAME } from "@/infrastructure/auth";
import { User } from "@/types";

export async function getCurrentUserAction(): Promise<{
  user: User | null;
  creatorEmail: string | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return await getCurrentUserUseCase.execute(token);
  } catch {
    return { user: null, creatorEmail: null };
  }
}
