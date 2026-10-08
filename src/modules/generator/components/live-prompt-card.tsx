import React from "react";
import { toast } from "sonner";
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export interface LiveCardData {
  prompt: string;
  location: string;
  script: string;
  tokens: number;
}

interface LivePromptCardProps {
  product: Product;
  data: LiveCardData | null;
  isTransitioning?: boolean;
}

export function LivePromptCard({
  product,
  data,
  isTransitioning = false,
}: LivePromptCardProps) {
  const isFemale = product.gender === "female";

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data?.prompt) {
      toast.error("Prompt belum siap disalin");
      return;
    }

    navigator.clipboard
      .writeText(data.prompt)
      .then(() => {
        toast.success(`Prompt "${product.name}" berhasil disalin!`, {
          description: "Siap digunakan di generator AI video.",
        });
      })
      .catch(() => {
        toast.error("Gagal menyalin prompt");
      });
  };

  return (
    <article className="bg-surface-container-low border border-surface-container-high/60 hover:border-surface-container-highest rounded-2xl p-3.5 sm:p-space-md flex flex-col justify-between gap-3 shadow-md hover:shadow-lg transition-all relative overflow-hidden group">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/60 flex items-center justify-center shrink-0 overflow-hidden relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-[20px] text-primary">
                {product.icon || (isFemale ? "female" : "male")}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-headline-sm text-[14px] sm:text-[15px] text-on-surface font-semibold truncate leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`font-label-code text-[10.5px] px-1.5 py-0.2 rounded font-medium ${
                  isFemale
                    ? "bg-tertiary-container/20 text-tertiary"
                    : "bg-secondary-container/20 text-secondary"
                }`}
              >
                {isFemale ? "Wanita" : "Pria"}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-label-code text-on-surface-variant/80">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Universal
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          title="Salin Prompt Produk Ini"
          className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-primary border border-surface-container-highest/60 transition-all cursor-pointer shrink-0 active:scale-95 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">content_copy</span>
        </button>
      </div>

      {/* Main Text Content */}
      <div className="bg-surface-container-lowest border border-surface-container-high/40 rounded-xl p-3 min-h-[140px] max-h-[190px] overflow-y-auto flex flex-col justify-between shadow-inner">
        {data ? (
          <div
            className={`font-body-md text-[13px] sm:text-[13.5px] text-on-surface leading-relaxed whitespace-pre-wrap select-all transition-opacity duration-300 ${
              isTransitioning ? "opacity-30" : "opacity-100"
            }`}
          >
            {data.prompt}
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            <Skeleton className="h-3.5 w-4/5 bg-surface-container-high/60" />
            <Skeleton className="h-3.5 w-full bg-surface-container-high/60" />
            <Skeleton className="h-3.5 w-3/4 bg-surface-container-high/60" />
            <Skeleton className="h-3.5 w-2/3 bg-surface-container-high/60" />
          </div>
        )}
      </div>

      {/* Bottom Metadata */}
      <div className="flex items-center justify-between gap-2 text-[11px] font-label-code text-on-surface-variant pt-1 border-t border-surface-container-high/30">
        <div className="flex items-center gap-1 min-w-0">
          <span className="material-symbols-outlined text-[13px] text-primary shrink-0">
            pin_drop
          </span>
          <span className="truncate text-on-surface" title={data?.location}>
            {data?.location || "Rotasi Universal Spot"}
          </span>
        </div>

        <span className="shrink-0 text-primary font-medium">
          {data ? `~${data.tokens} Tkn` : "..."}
        </span>
      </div>
    </article>
  );
}
