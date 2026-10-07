"use server";

import { createBatchLocationsUseCase } from "../use-cases/create-batch-locations.use-case";
import { CreateBatchLocationsInput } from "../schemas/create-batch-locations.schema";

export async function createBatchLocationsAction(input: CreateBatchLocationsInput) {
  try {
    const locations = await createBatchLocationsUseCase.execute(input);
    return { success: true, data: locations };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal menambahkan batch lokasi";
    return { success: false, error: message };
  }
}
