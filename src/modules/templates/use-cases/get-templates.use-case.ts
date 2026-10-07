import { templateRepository } from "../repositories/template.repository";

export class GetTemplatesUseCase {
  async execute() {
    const list = await templateRepository.findAll();
    const female = list.find((t) => t.gender === "female")?.content || "";
    const male = list.find((t) => t.gender === "male")?.content || "";
    return { female, male };
  }
}

export const getTemplatesUseCase = new GetTemplatesUseCase();
