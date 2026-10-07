import React, { useState, useMemo } from "react";
import { ScriptItem } from "@/types";

interface ScriptsTableProps {
  scripts: ScriptItem[];
  productName?: string;
  onDeleteScript: (id: string) => void;
}

export function ScriptsTable({
  scripts,
  productName,
  onDeleteScript,
}: ScriptsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredScripts = useMemo(() => {
    if (!searchQuery.trim()) return scripts;
    const query = searchQuery.toLowerCase();
    return scripts.filter((s) => s.text.toLowerCase().includes(query));
  }, [scripts, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <div className="bg-surface-container-low border border-surface-container-high/40 rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* Table Header Bar */}
      <div className="px-space-lg py-space-md bg-surface-container border-b border-surface-container-high/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Daftar Naskah Lip-Sync
          </span>
          {productName && (
            <span className="font-label-code text-xs text-on-surface-variant bg-surface-container-highest/60 border border-surface-container-high/50 px-2 py-0.5 rounded-md">
              {productName}
            </span>
          )}
          <span className="font-label-code text-label-code bg-surface-container-highest text-secondary px-2.5 py-0.5 rounded-full font-medium">
            {filteredScripts.length} Naskah
          </span>
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari naskah dialog..."
            className="w-full bg-surface-container-lowest border border-surface-container-high/40 pl-8 pr-3 py-1.5 rounded-xl text-on-surface text-body-sm placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md">
          <thead className="bg-surface-container-lowest text-on-surface-variant font-label-code text-label-code uppercase tracking-wider border-b border-surface-container-high/30">
            <tr>
              <th className="px-space-md py-3 w-16 text-center">#</th>
              <th className="px-space-lg py-3">Naskah Dialog / Gerak Bibir</th>
              <th className="px-space-lg py-3 w-32 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-lowest/60">
            {filteredScripts.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-12 text-on-surface-variant">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[36px] text-outline-variant">
                      chat_bubble_outline
                    </span>
                    <span className="font-body-md text-body-md">
                      {scripts.length === 0
                        ? "Belum ada naskah dialog untuk produk ini. Tambahkan di form atas!"
                        : "Tidak ada naskah dialog yang cocok dengan pencarian."}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredScripts.map((script, idx) => {
                const isCopied = copiedId === script.id;
                return (
                  <tr
                    key={script.id}
                    className="hover:bg-surface-container/60 transition-colors group"
                  >
                    <td className="px-space-md py-space-md text-center font-label-code text-label-code text-on-surface-variant">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </td>

                    <td className="px-space-lg py-space-md">
                      <p className="font-body-md text-[14.5px] text-on-surface leading-relaxed italic">
                        &quot;{script.text}&quot;
                      </p>
                    </td>

                    <td className="px-space-lg py-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(script.id, script.text)}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isCopied
                              ? "bg-primary/20 text-primary"
                              : "hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface"
                          }`}
                          title={isCopied ? "Tersalin!" : "Salin Naskah"}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isCopied ? "check" : "content_copy"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteScript(script.id)}
                          className="p-1.5 rounded-lg hover:bg-error-container/30 text-on-surface-variant hover:text-error transition-all cursor-pointer"
                          title="Hapus Naskah"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
