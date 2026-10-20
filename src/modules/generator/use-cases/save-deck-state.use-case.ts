import { deckStateRepository } from "../repositories/deck-state.repository";
import { SaveDeckStateInput, SaveDeckStateSchema } from "../schemas/save-deck-state.schema";

export class SaveDeckStateUseCase {
  async execute(input: SaveDeckStateInput): Promise<void> {
    const validated = SaveDeckStateSchema.parse(input);
    await deckStateRepository.saveDeckState(validated);
  }
}

export const saveDeckStateUseCase = new SaveDeckStateUseCase();
