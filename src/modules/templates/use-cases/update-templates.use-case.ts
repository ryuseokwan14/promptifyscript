import { templateRepository } from "../repositories/template.repository";
import { UpdateTemplatesInput, UpdateTemplatesSchema } from "../schemas/update-templates.schema";

export class UpdateTemplatesUseCase {
  async execute(input: UpdateTemplatesInput) {
    const validated = UpdateTemplatesSchema.parse(input);

    await Promise.all([
      templateRepository.upsert("female", validated.female),
      templateRepository.upsert("male", validated.male),
    ]);

    return { female: validated.female, male: validated.male };
  }
}

export const updateTemplatesUseCase = new UpdateTemplatesUseCase();
