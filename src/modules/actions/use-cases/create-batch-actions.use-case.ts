import { actionRepository } from "../repositories/action.repository";
import { CreateBatchActionsInput, CreateBatchActionsSchema } from "../schemas/create-batch-actions.schema";

export class CreateBatchActionsUseCase {
  async execute(input: CreateBatchActionsInput) {
    const validated = CreateBatchActionsSchema.parse(input);

    const cleanNames = Array.from(
      new Set(
        validated.names
          .map((n) => n.trim())
          .filter((n) => n.length > 0)
      )
    );

    if (cleanNames.length === 0) {
      throw new Error("Tidak ada aksi valid yang dapat ditambahkan.");
    }

    const items = cleanNames.map((name) => ({
      name,
    }));

    return actionRepository.createMany(items);
  }
}

export const createBatchActionsUseCase = new CreateBatchActionsUseCase();
