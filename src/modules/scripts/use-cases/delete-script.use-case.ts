import { scriptRepository } from "../repositories/script.repository";
import { DeleteScriptInput, DeleteScriptSchema } from "../schemas/delete-script.schema";

export class DeleteScriptUseCase {
  async execute(input: DeleteScriptInput) {
    const validated = DeleteScriptSchema.parse(input);

    const existing = await scriptRepository.findById(validated.id);
    if (!existing) {
      throw new Error(`Script dengan ID ${validated.id} tidak ditemukan.`);
    }

    return scriptRepository.delete(validated.id);
  }
}

export const deleteScriptUseCase = new DeleteScriptUseCase();
