import React, { useState, useMemo } from "react";
import { LocationItem } from "@/types";
import { LocationsTable } from "./locations-table";
import { parseBatchDelimited } from "@/common/utils/batch-parser";

interface LocationsTabProps {
  locations: string[];
  locationItems?: LocationItem[];
  onAddLocation: (loc: string, vibe?: "casual_aesthetic" | "urban_adventure" | "universal") => void;
  onAddBatchLocations?: (
    names: string[],
    vibe?: "casual_aesthetic" | "urban_adventure" | "universal"
  ) => Promise<boolean | void>;
  onUpdateLocation?: (id: string, name: string, vibe: string) => Promise<void> | void;
  onDeleteLocation: (loc: string) => void;
}

export function LocationsTab({
  locations,
  locationItems = [],
  onAddLocation,
  onAddBatchLocations,
  onUpdateLocation,
  onDeleteLocation,
}: LocationsTabProps) {
  const [newLocationText, setNewLocationText] = useState("");
  const [newLocationVibe, setNewLocationVibe] = useState<
    "casual_aesthetic" | "urban_adventure" | "universal"
  >("universal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayList = useMemo(() => {
    if (locationItems && locationItems.length > 0) {
      return locationItems;
    }
    return locations.map((name, idx) => ({
      id: `loc-${idx}`,
      name,
      vibe: "universal" as const,
    }));
  }, [locations, locationItems]);

  const parsedItems = useMemo(() => {
    return parseBatchDelimited(newLocationText);
  }, [newLocationText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (onAddBatchLocations) {
        await onAddBatchLocations(parsedItems, newLocationVibe);
      } else if (parsedItems.length === 1) {
        onAddLocation(parsedItems[0], newLocationVibe);
      } else {
        for (const item of parsedItems) {
          onAddLocation(item, newLocationVibe);
        }
      }
      setNewLocationText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">explore</span>
            <span>Aesthetic Video Locations Bank</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Daftar preset setting suasana video yang otomatis di-inject ke variabel{" "}
            <code className="text-secondary font-label-code">{"{tempat}"}</code> saat compile prompt.
          </p>
        </div>
        <div className="flex items-center gap-space-sm font-label-code text-label-code bg-surface-container-low border border-surface-container-high/40 px-space-md py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="text-secondary font-medium">{displayList.length} Total Setting</span>
        </div>
      </div>

      {/* Form Tambah Lokasi */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-sm"
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="font-label-code text-label-code text-on-surface-variant">
            Nama Setting / Suasana Lokasi (Bisa Tambah Batch)
          </label>
          {parsedItems.length > 1 && (
            <span className="font-label-code text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
              Terdeteksi {parsedItems.length} Lokasi (Batch)
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-space-sm items-stretch md:items-end">
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-start gap-space-sm bg-surface-container-lowest border border-surface-container-high/40 px-space-md py-2.5 rounded-xl">
              <span className="material-symbols-outlined text-outline text-[20px] mt-1">
                add_location_alt
              </span>
              <textarea
                value={newLocationText}
                onChange={(e) => setNewLocationText(e.target.value)}
                placeholder='Ketik satu lokasi atau tempel ratusan lokasi sekaligus dipisahkan tanda kutip " (contoh: "cafe rooftop" "mall megah")...'
                rows={2}
                className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="w-full md:w-64 flex flex-col gap-1.5">
            <label className="font-label-code text-label-code text-on-surface-variant">
              Kategori Vibe
            </label>
            <select
              value={newLocationVibe}
              onChange={(e) =>
                setNewLocationVibe(
                  e.target.value as "casual_aesthetic" | "urban_adventure" | "universal"
                )
              }
              className="w-full bg-surface-container-lowest border border-surface-container-high/40 px-space-md py-2.5 rounded-xl text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer"
            >
              <option value="universal">Universal</option>
              <option value="casual_aesthetic">Casual Aesthetic</option>
              <option value="urban_adventure">Urban Adventure</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={parsedItems.length === 0 || isSubmitting}
            className="px-space-lg py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-headline-sm flex items-center justify-center gap-1.5 hover:brightness-110 shadow-sm transition-all whitespace-nowrap cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">
              {parsedItems.length > 1 ? "library_add" : "add"}
            </span>
            {isSubmitting
              ? "Menyimpan..."
              : parsedItems.length > 1
              ? `Tambah ${parsedItems.length} Lokasi`
              : "Tambah Lokasi"}
          </button>
        </div>
      </form>

      {/* Tabel Bank Lokasi */}
      <LocationsTable
        items={displayList}
        onDeleteLocation={onDeleteLocation}
        onUpdateLocation={onUpdateLocation}
      />
    </section>
  );
}
