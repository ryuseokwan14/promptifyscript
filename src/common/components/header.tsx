"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useApp } from "@/common/context/app-context";
import { GlobalCommandMenu } from "./global-command-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [commandOpen, setCommandOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Berhasil keluar dari sesi.");
  };

  const isGenerator = pathname === "/";
  const isSettings = pathname === "/data-settings" || pathname === "/settings";

  return (
    <>
      <GlobalCommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-surface-container-high/40">
        <div className="w-full h-full px-3 sm:px-gutter flex items-center justify-between max-w-7xl mx-auto gap-2">
          <div className="flex items-center gap-2 sm:gap-space-md shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-space-sm group">
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-1 rounded-full bg-secondary/20 blur-sm group-hover:bg-secondary/40 transition-all"></div>
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-surface-container-low shadow-sm">
                  <Image
                    src="/logo.svg"
                    alt="Promptify Script Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <span className="font-headline-sm text-[15px] sm:text-headline-sm text-on-surface tracking-tight font-semibold truncate max-w-[125px] xs:max-w-none">
                Promptify Script
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-space-sm">
            <nav className="flex items-center gap-1 bg-surface-container-lowest/60 p-1 rounded-xl border border-surface-container-high/30 backdrop-blur-md">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg font-headline-sm text-[13px] transition-all flex items-center gap-1.5 ${
                  isGenerator
                    ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
                <span>Generator</span>
              </Link>
              <Link
                href="/data-settings"
                className={`px-3 py-1.5 rounded-lg font-headline-sm text-[13px] transition-all flex items-center gap-1.5 ${
                  isSettings
                    ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">tune</span>
                <span>Data &amp; Settings</span>
              </Link>
            </nav>
          </div>

          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              aria-label="Cari Cepat"
              onClick={() => setCommandOpen(true)}
              className="w-9 h-9 rounded-xl bg-surface-container-low border border-surface-container-high/50 text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container-high/70 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-label-badge text-[10px] text-secondary font-medium tracking-wide">AI</span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high/50 text-on-surface-variant hover:text-on-surface text-xs hover:border-surface-container-highest transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span className="font-body-sm text-[13px]">Cari...</span>
              <kbd className="font-label-code text-[10px] bg-surface-container-highest px-1.5 py-0.5 rounded border border-surface-container-high/60 text-outline">
                Win + K
              </kbd>
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-semibold text-on-surface leading-tight">
                      {user.role === "SUPERADMIN" ? "superadmin121" : user.name}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      user.role === "SUPERADMIN"
                        ? "bg-secondary text-surface-container-lowest shadow-[0_0_12px_rgba(76,215,246,0.35)]"
                        : "bg-primary text-on-primary shadow-[0_0_12px_rgba(128,131,255,0.35)]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {user.role === "SUPERADMIN" ? "shield" : "person"}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    expand_more
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-xs text-on-surface-variant">
                    <p className="font-medium text-on-surface truncate">
                      {user.role === "SUPERADMIN" ? "superadmin121" : user.name}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/data-settings")}
                    className="gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      tune
                    </span>
                    <span>Data &amp; Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/data-settings?tab=security")}
                    className="gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      shield
                    </span>
                    <span>Security &amp; Auth</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCommandOpen(true)}
                    className="gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      keyboard
                    </span>
                    <span>Command Palette (⌘K)</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <div className="px-2 pt-1.5 pb-1 text-[11px] font-label-code text-on-surface-variant uppercase tracking-wider font-semibold">
                    Tema Tampilan
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-1.5 pb-1.5">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-xs transition cursor-pointer ${
                        mounted && theme === "light"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-xs"
                          : "border-surface-container-high/40 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">light_mode</span>
                      <span>Terang</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-xs transition cursor-pointer ${
                        mounted && theme === "dark"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-xs"
                          : "border-surface-container-high/40 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                      <span>Gelap</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-xs transition cursor-pointer ${
                        mounted && theme === "system"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-xs"
                          : "border-surface-container-high/40 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
                      <span>Otomatis</span>
                    </button>
                  </div>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                    className="gap-2 cursor-pointer text-error hover:text-error"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    <span>Keluar (Logout)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 p-1.5 px-2.5 sm:px-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high/50 text-on-surface text-xs font-semibold cursor-pointer transition shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-primary">account_circle</span>
                  <span>
                    <span className="hidden xs:inline">Masuk / </span>Opsi
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => router.push("/login")}
                    className="gap-2 cursor-pointer font-semibold text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    <span>Masuk ke Studio</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="px-2 pt-1.5 pb-1 text-[11px] font-label-code text-on-surface-variant uppercase tracking-wider font-semibold">
                    Tema Tampilan
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-1.5 pb-1.5">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-xs transition cursor-pointer ${
                        mounted && theme === "light"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-xs"
                          : "border-surface-container-high/40 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">light_mode</span>
                      <span>Terang</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-xs transition cursor-pointer ${
                        mounted && theme === "dark"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-xs"
                          : "border-surface-container-high/40 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                      <span>Gelap</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-xs transition cursor-pointer ${
                        mounted && theme === "system"
                          ? "bg-primary/20 border-primary text-primary font-bold shadow-xs"
                          : "border-surface-container-high/40 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
                      <span>Otomatis</span>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
