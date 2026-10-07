import { scriptRepository } from "../repositories/script.repository";
import { CreateBatchScriptsInput, CreateBatchScriptsSchema } from "../schemas/create-batch-scripts.schema";

export class CreateBatchScriptsUseCase {
  async execute(input: CreateBatchScriptsInput) {
    const validated = CreateBatchScriptsSchema.parse(input);

    const items = validated.texts.map((text, idx) => {
      const wordCount = text.split(/\s+/).length;
      const estSeconds = +(wordCount * 0.28).toFixed(1);
      return {
        productId: validated.productId,
        text: text.trim(),
        variationType: `Variation #${idx + 1}`,
        estimatedSeconds: estSeconds,
      };
    });

    await scriptRepository.createMany(items);
    return scriptRepository.findByProductId(validated.productId);
  }
}

export const createBatchScriptsUseCase = new CreateBatchScriptsUseCase();
