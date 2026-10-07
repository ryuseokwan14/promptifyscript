"use server";

import { createLocationUseCase } from "../use-cases/create-location.use-case";
import { CreateLocationInput, CreateLocationSchema } from "../schemas/create-location.schema";

export async function createLocationAction(input: CreateLocationInput) {
  try {
    const validated = CreateLocationSchema.parse(input);
    const location = await createLocationUseCase.execute(validated);
    return { success: true, data: location };
  } catch (error) {
    console.error("Failed to create location:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan lokasi baru",
    };
  }
}
