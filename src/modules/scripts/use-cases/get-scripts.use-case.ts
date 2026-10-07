import { scriptRepository } from "../repositories/script.repository";

export class GetScriptsUseCase {
  async execute(productId?: string) {
    if (productId) {
      return scriptRepository.findByProductId(productId);
    }
    return scriptRepository.findAll();
  }
}

export const getScriptsUseCase = new GetScriptsUseCase();
