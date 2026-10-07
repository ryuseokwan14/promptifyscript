import { locationRepository } from "../repositories/location.repository";
import { CreateLocationInput, CreateLocationSchema } from "../schemas/create-location.schema";

export class CreateLocationUseCase {
  async execute(input: CreateLocationInput) {
    const validated = CreateLocationSchema.parse(input);

    const cleanName = validated.name.trim();
    const existing = await locationRepository.findByName(cleanName);
    if (existing) {
      throw new Error(`Lokasi "${cleanName}" sudah terdaftar.`);
    }

    return locationRepository.create({
      name: cleanName,
      vibe: validated.vibe || "universal",
    });
  }
}

export const createLocationUseCase = new CreateLocationUseCase();
