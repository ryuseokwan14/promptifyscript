"use server";

import { deleteBatchLocationsUseCase } from "../use-cases/delete-batch-locations.use-case";
import { DeleteBatchLocationsInput } from "../schemas/delete-batch-locations.schema";

export async function deleteBatchLocationsAction(input: DeleteBatchLocationsInput) {
  try {
    const res = await deleteBatchLocationsUseCase.execute(input);
    return {
      success: true,
      count: res.count,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus batch lokasi",
    };
  }
}
