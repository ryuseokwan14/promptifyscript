"use server";

import { deleteLocationUseCase } from "../use-cases/delete-location.use-case";
import { DeleteLocationInput, DeleteLocationSchema } from "../schemas/delete-location.schema";

export async function deleteLocationAction(input: DeleteLocationInput) {
  try {
    const validated = DeleteLocationSchema.parse(input);
    const deleted = await deleteLocationUseCase.execute(validated);
    return { success: true, data: deleted };
  } catch (error) {
    console.error("Failed to delete location:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus lokasi",
    };
  }
}
