import { scriptRepository } from "../repositories/script.repository";
import {
  DeleteBatchScriptsInput,
  DeleteBatchScriptsSchema,
} from "../schemas/delete-batch-scripts.schema";

export class DeleteBatchScriptsUseCase {
  async execute(input: DeleteBatchScriptsInput) {
    const validated = DeleteBatchScriptsSchema.parse(input);
    return scriptRepository.deleteMany(validated.ids);
  }
}

export const deleteBatchScriptsUseCase = new DeleteBatchScriptsUseCase();
