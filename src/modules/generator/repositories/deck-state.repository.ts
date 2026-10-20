import { prisma } from "@/infrastructure/prisma";
import { DeckStateSnapshot } from "../types/generator.types";

export class DeckStateRepository {
  async getDeckState(): Promise<DeckStateSnapshot | null> {
    const user = await prisma.appUser.findFirst({
      where: { role: "CREATOR" },
      select: { deckState: true },
    });

    if (!user || !user.deckState) {
      return null;
    }

    return user.deckState as unknown as DeckStateSnapshot;
  }

  async saveDeckState(state: DeckStateSnapshot): Promise<void> {
    const creator = await prisma.appUser.findFirst({
      where: { role: "CREATOR" },
      select: { id: true },
    });

    if (creator) {
      await prisma.appUser.update({
        where: { id: creator.id },
        data: {
          deckState: state as object,
        },
      });
    }
  }

  async resetProductDeckState(productId?: string): Promise<DeckStateSnapshot> {
    const current = await this.getDeckState();
    const updated: DeckStateSnapshot = {
      pools: current?.pools ? { ...current.pools } : {},
      cycles: current?.cycles ? { ...current.cycles } : {},
    };

    if (!productId) {
      updated.pools = {};
      updated.cycles = {};
    } else {
      const keys = [
        `generator_scripts_${productId}`,
        `live_scripts_${productId}`,
      ];

      keys.forEach((key) => {
        delete updated.pools[key];
        updated.cycles[key] = 1;
      });
    }

    await this.saveDeckState(updated);
    return updated;
  }
}

export const deckStateRepository = new DeckStateRepository();
