"use server";

import { getLocationsUseCase } from "../use-cases/get-locations.use-case";

export async function getLocationsAction(vibes?: string[]) {
  try {
    const locations = await getLocationsUseCase.execute(vibes);
    return { success: true, data: locations };
  } catch (error) {
    console.error("Failed to get locations:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil data lokasi",
    };
  }
}
