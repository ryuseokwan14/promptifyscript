/**
 * Memecah string batch input berdasarkan pemisah tanda kutip ganda (") atau baris baru.
 * Mendukung format:
 * - "Teks satu" "Teks dua" "Teks tiga"
 * - "Teks satu"\n"Teks dua"
 * - Teks satu " Teks dua " Teks tiga
 * - Baris baru biasa jika tanpa tanda petik
 */
export function parseBatchDelimited(rawText: string): string[] {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  if (trimmed.includes('"')) {
    // Cek apakah format dibungkus tanda kutip, e.g. "Item 1" "Item 2"
    const matchedQuotes = trimmed.match(/"([^"]+)"/g);
    if (matchedQuotes && matchedQuotes.length > 0) {
      const extracted = matchedQuotes
        .map((item) => item.replace(/^"+|"+$/g, "").trim())
        .filter((item) => item.length > 0 && item !== "," && item !== ";");
      if (extracted.length > 0) {
        return extracted;
      }
    }

    // Cek pemisahan berbasis pemisah tanda kutip, e.g. item 1 " item 2 " item 3
    const splitByQuote = trimmed
      .split('"')
      .map((part) => part.trim())
      .filter((part) => part.length > 0 && part !== "," && part !== ";");
    if (splitByQuote.length > 0) {
      return splitByQuote;
    }
  }

  // Fallback: Pisahkan per baris baru jika tanpa tanda petik
  return trimmed
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
