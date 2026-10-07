"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

interface GlobalCommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function GlobalCommandMenu({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: GlobalCommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = React.useCallback(
    (value: boolean) => {
      if (isControlled && setControlledOpen) {
        setControlledOpen(value);
      } else {
        setInternalOpen(value);
      }
    },
    [isControlled, setControlledOpen]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Ketik perintah atau cari navigasi..." />
      <CommandList className="max-h-80">
        <CommandEmpty>Tidak ada hasil yang ditemukan.</CommandEmpty>

        <CommandGroup heading="Navigasi Cepat">
          <CommandItem
            onSelect={() => handleSelect(() => router.push("/"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">bolt</span>
            <span>AI Prompt Generator</span>
            <CommandShortcut>G</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => router.push("/data-settings?tab=products"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">inventory_2</span>
            <span>Katalog Video Products</span>
            <CommandShortcut>P</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => router.push("/data-settings?tab=scripts"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>
            <span>Naskah Lip-Sync</span>
            <CommandShortcut>S</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => router.push("/data-settings?tab=locations"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">explore</span>
            <span>Bank Setting Lokasi</span>
            <CommandShortcut>L</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => router.push("/data-settings?tab=templates"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">tune</span>
            <span>Master Templates Engine</span>
            <CommandShortcut>T</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => handleSelect(() => router.push("/data-settings?tab=security"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">shield</span>
            <span>Security &amp; Auth</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Tema Tampilan">
          <CommandItem
            onSelect={() => handleSelect(() => setTheme("light"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">light_mode</span>
            <span>Mode Terang (Light Mode)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => setTheme("dark"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">dark_mode</span>
            <span>Mode Gelap (Dark Mode)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect(() => setTheme("system"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">desktop_windows</span>
            <span>Mode Otomatis (System)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Aksi Eksternal">
          <CommandItem
            onSelect={() =>
              handleSelect(() => window.open("https://gemini.google.com", "_blank"))
            }
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">open_in_new</span>
            <span>Buka Google Gemini Web</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
