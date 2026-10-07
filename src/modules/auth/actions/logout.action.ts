"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/infrastructure/auth";

export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return { success: true };
}
