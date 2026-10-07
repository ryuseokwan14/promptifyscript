import { productRepository } from "../repositories/product.repository";
import {
  DeleteBatchProductsInput,
  DeleteBatchProductsSchema,
} from "../schemas/delete-batch-products.schema";

export class DeleteBatchProductsUseCase {
  async execute(input: DeleteBatchProductsInput) {
    const validated = DeleteBatchProductsSchema.parse(input);
    return productRepository.deleteMany(validated.ids);
  }
}

export const deleteBatchProductsUseCase = new DeleteBatchProductsUseCase();
