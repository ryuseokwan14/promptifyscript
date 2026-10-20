/**
 * Universal clipboard utility with automatic fallback for non-secure contexts (HTTP / Tailscale).
 * Modern browsers disable `navigator.clipboard` on HTTP (non-localhost) origins,
 * causing runtime exceptions unless fallback via `document.execCommand` is provided.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. Coba Modern Clipboard API jika tersedia (biasanya aktif di HTTPS atau localhost)
  if (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Jika diblokir (misal permission denied di non-secure context), lanjut ke fallback
    }
  }

  // 2. Fallback untuk HTTP / Non-Secure Context / Tailscale IP / Browser Mobile:
  // Menggunakan elemen textarea tersembunyi + document.execCommand("copy")
  if (typeof document !== "undefined") {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Styling agar tak terlihat dan tidak memicu auto-scroll / zoom di HP
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      textArea.style.opacity = "0";
      textArea.setAttribute("readonly", "");

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, text.length);

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        return true;
      }
    } catch (err) {
      console.warn("Fallback copy execution failed:", err);
    }
  }

  return false;
}
