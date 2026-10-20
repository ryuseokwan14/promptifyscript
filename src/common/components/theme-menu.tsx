"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeMenuProps {
  className?: string;
}

export function ThemeMenu({ className = "" }: ThemeMenuProps) {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const getThemeInfo = () => {
    if (!mounted) {
      return { label: "Tema", icon: "palette" };
    }
    if (theme === "light") {
      return { label: "Terang", icon: "light_mode" };
    }
    if (theme === "dark") {
      return { label: "Gelap", icon: "dark_mode" };
    }
    return { label: "Otomatis", icon: "desktop_windows" };
  };

  const { label, icon } = getThemeInfo();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low/90 hover:bg-surface-container border border-surface-container-high/60 backdrop-blur-xl text-on-surface text-xs font-medium cursor-pointer shadow-sm transition active:scale-95 outline-none">
          <span className="material-symbols-outlined text-[17px] text-primary">
            {icon}
          </span>
          <span className="font-body-sm text-[12px] text-on-surface">
            {label}
          </span>
          <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
            expand_more
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 p-1.5 bg-surface-container-low/95 border-surface-container-high/60 backdrop-blur-xl shadow-xl rounded-xl z-50"
        >
          <div className="px-2 py-1 text-[10.5px] font-label-code text-on-surface-variant uppercase tracking-wider font-semibold">
            Pilih Mode Tema
          </div>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`gap-2.5 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
              mounted && theme === "light"
                ? "bg-primary/15 text-primary font-semibold"
                : "text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">light_mode</span>
            <span className="flex-1">Terang (Light)</span>
            {mounted && theme === "light" && (
              <span className="material-symbols-outlined text-[15px] text-primary">check</span>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={`gap-2.5 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
              mounted && theme === "dark"
                ? "bg-primary/15 text-primary font-semibold"
                : "text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">dark_mode</span>
            <span className="flex-1">Gelap (Dark)</span>
            {mounted && theme === "dark" && (
              <span className="material-symbols-outlined text-[15px] text-primary">check</span>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={`gap-2.5 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
              mounted && theme === "system"
                ? "bg-primary/15 text-primary font-semibold"
                : "text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">desktop_windows</span>
            <span className="flex-1">Otomatis (Sistem)</span>
            {mounted && theme === "system" && (
              <span className="material-symbols-outlined text-[15px] text-primary">check</span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
