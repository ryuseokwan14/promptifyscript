/**
 * DeckRotator Utility
 * Mengelola shuffle pool (kocokan deck) anti-duplikat.
 * Menjamin setiap kandidat terpilih merata dan tidak berulang dalam satu putaran penuh.
 * Memberikan info status siklus putaran untuk penanda batas aman & daur ulang.
 */
export interface DeckPickResult<T> {
  item: T | null;
  isCycleReset: boolean; // true jika item ini memulai putaran baru (recycle)
  isLastInCycle: boolean; // true jika item ini adalah kartu unik terakhir di siklus berjalan
  remainingInCycle: number; // sisa kartu yang belum terpakai di siklus ini
  totalCandidates: number; // jumlah total variasi di bank data
  cycleNumber: number; // putaran ke-berapa
}

class DeckRotator {
  private pools: Map<string, string[]> = new Map();
  private cycles: Map<string, number> = new Map();

  /**
   * Mengambil satu item secara acak tanpa pengulangan (anti-repeat).
   * Melacak siklus putaran, sisa kartu, dan penanda daur ulang.
   */
  pickNonRepeating<T>(
    poolKey: string,
    candidates: T[],
    getId: (item: T) => string
  ): DeckPickResult<T> {
    if (!candidates || candidates.length === 0) {
      return {
        item: null,
        isCycleReset: false,
        isLastInCycle: false,
        remainingInCycle: 0,
        totalCandidates: 0,
        cycleNumber: 1,
      };
    }

    if (candidates.length === 1) {
      return {
        item: candidates[0],
        isCycleReset: false,
        isLastInCycle: true,
        remainingInCycle: 0,
        totalCandidates: 1,
        cycleNumber: 1,
      };
    }

    let remainingIds = this.pools.get(poolKey) || [];
    let currentCycle = this.cycles.get(poolKey) || 1;
    let isCycleReset = false;

    // Validasi ID yang masih relevan dengan daftar kandidat terkini
    const candidateIdSet = new Set(candidates.map(getId));
    remainingIds = remainingIds.filter((id) => candidateIdSet.has(id));

    // Jika deck kosong / habis, isi ulang seluruh ID dan kocok (Fisher-Yates)
    if (remainingIds.length === 0) {
      if (this.pools.has(poolKey)) {
        // Bukan pertama kali init, melainkan putaran sebelumnya sudah habis terpakai
        currentCycle += 1;
        this.cycles.set(poolKey, currentCycle);
        isCycleReset = true;
      }

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

    const isLastInCycle = remainingIds.length === 0;
    const chosenItem = candidates.find((item) => getId(item) === chosenId) || candidates[0];

    return {
      item: chosenItem,
      isCycleReset,
      isLastInCycle,
      remainingInCycle: remainingIds.length,
      totalCandidates: candidates.length,
      cycleNumber: currentCycle,
    };
  }

  /**
   * Reset deck untuk pool tertentu atau seluruh pool.
   */
  reset(poolKey?: string) {
    if (poolKey) {
      this.pools.delete(poolKey);
      this.cycles.delete(poolKey);
    } else {
      this.pools.clear();
      this.cycles.clear();
    }
  }
}

export const deckRotator = new DeckRotator();
