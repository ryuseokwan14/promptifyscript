import { productRepository } from "../repositories/product.repository";
import { DeleteProductInput, DeleteProductSchema } from "../schemas/delete-product.schema";

export class DeleteProductUseCase {
  async execute(input: DeleteProductInput) {
    const validated = DeleteProductSchema.parse(input);

    const existing = await productRepository.findById(validated.id);
    if (!existing) {
      throw new Error(`Produk dengan ID ${validated.id} tidak ditemukan.`);
    }

    return productRepository.delete(validated.id);
  }
}

export const deleteProductUseCase = new DeleteProductUseCase();
