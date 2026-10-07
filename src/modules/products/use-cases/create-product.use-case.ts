import { productRepository } from "../repositories/product.repository";
import { CreateProductInput, CreateProductSchema } from "../schemas/create-product.schema";

export class CreateProductUseCase {
  async execute(input: CreateProductInput) {
    const validated = CreateProductSchema.parse(input);

    return productRepository.create({
      name: validated.name,
      gender: validated.gender,
      itemDesc: validated.itemDesc || `${validated.name} fitting premium modern`,
      icon: validated.icon || (validated.gender === "female" ? "checkroom" : "man"),
      imageUrl: validated.imageUrl || null,
      imageFit: validated.imageFit || null,
      imageTexture: validated.imageTexture || null,
      imageAtmosphere: validated.imageAtmosphere || null,
    });
  }
}

export const createProductUseCase = new CreateProductUseCase();
