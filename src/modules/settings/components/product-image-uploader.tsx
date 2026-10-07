"use client";

import React, { useState, useRef } from "react";
import { storageService } from "@/infrastructure/storage";

interface ProductImageUploaderProps {
  imageUrl?: string | null;
  onImageChange: (url: string) => void;
  label?: string;
  compact?: boolean;
}

export function ProductImageUploader({
  imageUrl,
  onImageChange,
  label = "Foto Produk",
  compact = false,
}: ProductImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4.2 * 1024 * 1024) {
      setUploadError("Ukuran berkas maksimal 4 MB agar sesuai limit serverless.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    try {
      const publicUrl = await storageService.uploadProductImage(file);
      onImageChange(publicUrl);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah foto.";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onImageChange("");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-container-high/30 p-space-md rounded-xl flex flex-col md:flex-row items-center gap-space-md justify-between">
      <div className="flex items-center gap-space-md w-full md:w-auto">
        {imageUrl ? (
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-secondary/40 shrink-0 shadow-md">
            <img
              src={imageUrl}
              alt="Preview Produk"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-error transition-opacity cursor-pointer"
              title="Hapus foto"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-outline-variant shrink-0 border border-dashed border-surface-container-high">
            <span className="material-symbols-outlined text-[24px]">image</span>
          </div>
        )}

        <div className="flex flex-col">
          <span className="font-label-code text-label-code text-on-surface font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">cloud_upload</span>
            {label}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
            {imageUrl
              ? "Tersimpan di bucket product-images (.webp terkompresi)."
              : "Foto otomatis dikompresi & dikonversi ke format .webp."}
          </span>
          {uploadError && (
            <span className="text-error text-xs mt-0.5 font-medium">{uploadError}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {isUploading ? (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-surface-container rounded-xl text-secondary text-xs">
            <span className="material-symbols-outlined text-[16px] animate-spin">
              progress_activity
            </span>
            <span>Mengunggah...</span>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-space-md py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[15px]">
                {imageUrl ? "sync" : "upload"}
              </span>
              <span>{imageUrl ? "Ganti Foto" : "Pilih Foto"}</span>
            </button>
            {imageUrl && !compact && (
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-xl hover:bg-error-container/30 text-on-surface-variant hover:text-error transition-all cursor-pointer"
                title="Hapus foto"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
