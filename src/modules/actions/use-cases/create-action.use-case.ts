import { actionRepository } from "../repositories/action.repository";
import { CreateActionInput, CreateActionSchema } from "../schemas/create-action.schema";

export class CreateActionUseCase {
  async execute(input: CreateActionInput) {
    const validated = CreateActionSchema.parse(input);

    const cleanName = validated.name.trim();
    const existing = await actionRepository.findByName(cleanName);
    if (existing) {
      throw new Error(`Aksi "${cleanName}" sudah terdaftar.`);
    }

    return actionRepository.create({
      name: cleanName,
    });
  }
}

export const createActionUseCase = new CreateActionUseCase();
