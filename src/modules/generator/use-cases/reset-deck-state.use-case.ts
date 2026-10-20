import { deckStateRepository } from "../repositories/deck-state.repository";
import { ResetDeckStateInput, ResetDeckStateSchema } from "../schemas/reset-deck-state.schema";
import { DeckStateSnapshot } from "../types/generator.types";

export class ResetDeckStateUseCase {
  async execute(input?: ResetDeckStateInput): Promise<DeckStateSnapshot> {
    const validated = ResetDeckStateSchema.parse(input || {});
    return deckStateRepository.resetProductDeckState(validated.productId);
  }
}

export const resetDeckStateUseCase = new ResetDeckStateUseCase();
