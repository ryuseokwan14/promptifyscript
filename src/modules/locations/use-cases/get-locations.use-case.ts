import { locationRepository } from "../repositories/location.repository";

export class GetLocationsUseCase {
  async execute(vibes?: string[]) {
    if (vibes && vibes.length > 0) {
      return locationRepository.findByVibe(vibes);
    }
    return locationRepository.findAll();
  }
}

export const getLocationsUseCase = new GetLocationsUseCase();
