import { scriptRepository } from "../repositories/script.repository";
import { CreateScriptInput, CreateScriptSchema } from "../schemas/create-script.schema";

export class CreateScriptUseCase {
  async execute(input: CreateScriptInput) {
    const validated = CreateScriptSchema.parse(input);

    const wordCount = validated.text.split(/\s+/).length;
    const estSeconds = validated.estimatedSeconds ?? +(wordCount * 0.28).toFixed(1);

    return scriptRepository.create({
      product: {
        connect: { id: validated.productId },
      },
      text: validated.text,
      variationType: validated.variationType || "Custom Hook",
      estimatedSeconds: estSeconds,
      retention: validated.retention ?? 90,
    });
  }
}

export const createScriptUseCase = new CreateScriptUseCase();
