import { productRepository } from "../repositories/product.repository";

export class GetProductsUseCase {
  async execute() {
    return productRepository.findAll();
  }
}

export const getProductsUseCase = new GetProductsUseCase();
