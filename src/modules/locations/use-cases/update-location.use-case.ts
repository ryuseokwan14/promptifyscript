import { locationRepository } from "../repositories/location.repository";
import { UpdateLocationInput, UpdateLocationSchema } from "../schemas/update-location.schema";

export class UpdateLocationUseCase {
  async execute(input: UpdateLocationInput) {
    const validated = UpdateLocationSchema.parse(input);

    const existing = await locationRepository.findById(validated.id);
    if (!existing) {
      throw new Error(`Lokasi dengan ID "${validated.id}" tidak ditemukan.`);
    }

    return locationRepository.update(validated.id, {
      name: validated.name.trim(),
      ...(validated.vibe ? { vibe: validated.vibe } : {}),
    });
  }
}

export const updateLocationUseCase = new UpdateLocationUseCase();
