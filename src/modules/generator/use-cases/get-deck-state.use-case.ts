import { deckStateRepository } from "../repositories/deck-state.repository";
import { DeckStateSnapshot } from "../types/generator.types";

export class GetDeckStateUseCase {
  async execute(): Promise<DeckStateSnapshot | null> {
    return deckStateRepository.getDeckState();
  }
}

export const getDeckStateUseCase = new GetDeckStateUseCase();
