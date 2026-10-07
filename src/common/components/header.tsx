"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/common/context/app-context";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const isGenerator = pathname === "/";
  const isSettings = pathname === "/data-settings" || pathname === "/settings";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-surface-container-high/40">
      <div className="w-full h-full px-gutter flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-space-md">
          <Link href="/" className="flex items-center gap-space-sm group">
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
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
              Promptify Script
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-1 bg-surface-container-lowest/60 p-1 rounded-xl border border-surface-container-high/30 backdrop-blur-md">
          <Link
            href="/"
            className={`px-space-md py-1.5 rounded-lg font-headline-sm text-[14px] transition-all flex items-center gap-1.5 ${
              isGenerator
                ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Generator</span>
          </Link>
          <Link
            href="/data-settings"
            className={`px-space-md py-1.5 rounded-lg font-headline-sm text-[14px] transition-all flex items-center gap-1.5 ${
              isSettings
                ? "bg-surface-container-high text-primary font-medium shadow-[0_0_12px_rgba(128,131,255,0.18)]"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Data &amp; Settings</span>
          </Link>
        </nav>

        <div className="flex items-center gap-space-sm">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-error transition-all cursor-pointer"
                title="Sign Out"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
              <div
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_rgba(192,193,255,0.35)]"
                title={user.email}
              >
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-xs hover:brightness-110 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
