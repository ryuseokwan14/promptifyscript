import { locationRepository } from "../repositories/location.repository";
import { DeleteLocationInput, DeleteLocationSchema } from "../schemas/delete-location.schema";

export class DeleteLocationUseCase {
  async execute(input: DeleteLocationInput) {
    const validated = DeleteLocationSchema.parse(input);

    let loc = null;
    if (validated.id) {
      loc = await locationRepository.findById(validated.id);
    }
    if (!loc && validated.name) {
      loc = await locationRepository.findByName(validated.name);
    }
    if (!loc && validated.id) {
      loc = await locationRepository.findByName(validated.id);
    }

    if (!loc) {
      throw new Error("Lokasi tidak ditemukan.");
    }

    return locationRepository.delete(loc.id);
  }
}

export const deleteLocationUseCase = new DeleteLocationUseCase();
