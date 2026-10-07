import { productRepository } from "../repositories/product.repository";
import { UpdateProductInput, UpdateProductSchema } from "../schemas/update-product.schema";

export class UpdateProductUseCase {
  async execute(input: UpdateProductInput) {
    const validated = UpdateProductSchema.parse(input);

    const existing = await productRepository.findById(validated.id);
    if (!existing) {
      throw new Error(`Produk dengan ID ${validated.id} tidak ditemukan.`);
    }

    const { id, ...dataToUpdate } = validated;

    return productRepository.update(id, dataToUpdate);
  }
}

export const updateProductUseCase = new UpdateProductUseCase();
