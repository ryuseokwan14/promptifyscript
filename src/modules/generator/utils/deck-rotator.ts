/**
 * DeckRotator Utility
 * Mengelola shuffle pool (kocokan deck) anti-duplikat.
 * Menjamin setiap kandidat terpilih merata dan tidak berulang dalam satu putaran penuh.
 */
class DeckRotator {
  private pools: Map<string, string[]> = new Map();

  /**
   * Mengambil satu item secara acak tanpa pengulangan (anti-repeat).
   * Deck hanya dikocok ulang jika seluruh item sudah habis terambil.
   */
  pickNonRepeating<T>(
    poolKey: string,
    candidates: T[],
    getId: (item: T) => string
  ): T | null {
    if (!candidates || candidates.length === 0) return null;
    if (candidates.length === 1) return candidates[0];

    let remainingIds = this.pools.get(poolKey) || [];

    // Validasi ID yang masih relevan dengan daftar kandidat terkini
    const candidateIdSet = new Set(candidates.map(getId));
    remainingIds = remainingIds.filter((id) => candidateIdSet.has(id));

    // Jika deck kosong / habis, isi ulang seluruh ID dan kocok (Fisher-Yates)
    if (remainingIds.length === 0) {
      remainingIds = candidates.map(getId);
      for (let i = remainingIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = remainingIds[i];
        remainingIds[i] = remainingIds[j];
        remainingIds[j] = temp;
      }
    }

    // Ambil item berikutnya dari deck
    const chosenId = remainingIds.pop()!;
    this.pools.set(poolKey, remainingIds);

    const chosenItem = candidates.find((item) => getId(item) === chosenId);
    return chosenItem || candidates[0];
  }

  /**
   * Reset deck untuk pool tertentu atau seluruh pool.
   */
  reset(poolKey?: string) {
    if (poolKey) {
      this.pools.delete(poolKey);
    } else {
      this.pools.clear();
    }
  }
}

export const deckRotator = new DeckRotator();
