"use server";

import { updateLocationUseCase } from "../use-cases/update-location.use-case";
import { UpdateLocationInput, UpdateLocationSchema } from "../schemas/update-location.schema";

export async function updateLocationAction(input: UpdateLocationInput) {
  try {
    const validated = UpdateLocationSchema.parse(input);
    const updated = await updateLocationUseCase.execute(validated);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update location:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui lokasi",
    };
  }
}
