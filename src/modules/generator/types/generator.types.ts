export interface PromptState {
  prompt: string;
  location: string;
  script: string;
  tokens: number;
}

export interface DeckStateSnapshot {
  pools: Record<string, string[]>;
  cycles: Record<string, number>;
}

