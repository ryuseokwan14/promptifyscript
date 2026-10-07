import { locationRepository } from "../repositories/location.repository";
import { CreateBatchLocationsInput, CreateBatchLocationsSchema } from "../schemas/create-batch-locations.schema";

export class CreateBatchLocationsUseCase {
  async execute(input: CreateBatchLocationsInput) {
    const validated = CreateBatchLocationsSchema.parse(input);
    const cleanedNames = Array.from(new Set(validated.names.map((n) => n.trim()).filter((n) => n.length > 0)));

    if (cleanedNames.length === 0) {
      throw new Error("Tidak ada lokasi valid yang dapat ditambahkan.");
    }

    const items = cleanedNames.map((name) => ({
      name,
      vibe: validated.vibe || "universal",
    }));

    await locationRepository.createMany(items);
    return locationRepository.findAll();
  }
}

export const createBatchLocationsUseCase = new CreateBatchLocationsUseCase();
