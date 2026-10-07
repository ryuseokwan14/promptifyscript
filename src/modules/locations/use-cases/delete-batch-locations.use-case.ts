import { locationRepository } from "../repositories/location.repository";
import {
  DeleteBatchLocationsInput,
  DeleteBatchLocationsSchema,
} from "../schemas/delete-batch-locations.schema";

export class DeleteBatchLocationsUseCase {
  async execute(input: DeleteBatchLocationsInput) {
    const validated = DeleteBatchLocationsSchema.parse(input);
    return locationRepository.deleteMany(validated.idsOrNames);
  }
}

export const deleteBatchLocationsUseCase = new DeleteBatchLocationsUseCase();
