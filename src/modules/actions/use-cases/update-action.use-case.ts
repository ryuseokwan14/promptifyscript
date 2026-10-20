import { actionRepository } from "../repositories/action.repository";
import { UpdateActionInput, UpdateActionSchema } from "../schemas/update-action.schema";

export class UpdateActionUseCase {
  async execute(input: UpdateActionInput) {
    const validated = UpdateActionSchema.parse(input);

    const cleanName = validated.name.trim();
    const existing = await actionRepository.findByName(cleanName);
    if (existing && existing.id !== validated.id) {
      throw new Error(`Aksi "${cleanName}" sudah digunakan.`);
    }

    return actionRepository.update(validated.id, {
      name: cleanName,
    });
  }
}

export const updateActionUseCase = new UpdateActionUseCase();
