import { actionRepository } from "../repositories/action.repository";

export class GetActionsUseCase {
  async execute() {
    return actionRepository.findAll();
  }
}

export const getActionsUseCase = new GetActionsUseCase();
