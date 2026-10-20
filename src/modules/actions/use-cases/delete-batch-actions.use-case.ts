import { actionRepository } from "../repositories/action.repository";
import { DeleteBatchActionsInput, DeleteBatchActionsSchema } from "../schemas/delete-batch-actions.schema";

export class DeleteBatchActionsUseCase {
  async execute(input: DeleteBatchActionsInput) {
    const validated = DeleteBatchActionsSchema.parse(input);

    return actionRepository.deleteMany(validated.idsOrNames);
  }
}

export const deleteBatchActionsUseCase = new DeleteBatchActionsUseCase();
