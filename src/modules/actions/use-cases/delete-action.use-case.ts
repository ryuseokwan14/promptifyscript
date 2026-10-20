import { actionRepository } from "../repositories/action.repository";
import { DeleteActionInput, DeleteActionSchema } from "../schemas/delete-action.schema";

export class DeleteActionUseCase {
  async execute(input: DeleteActionInput) {
    const validated = DeleteActionSchema.parse(input);

    if (validated.id) {
      return actionRepository.delete(validated.id);
    }

    if (validated.name) {
      const existing = await actionRepository.findByName(validated.name);
      if (!existing) {
        throw new Error(`Aksi "${validated.name}" tidak ditemukan.`);
      }
      return actionRepository.delete(existing.id);
    }

    throw new Error("ID atau nama aksi diperlukan untuk menghapus.");
  }
}

export const deleteActionUseCase = new DeleteActionUseCase();
