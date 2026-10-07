import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginCard } from "@/modules/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-12 -left-10 w-72 h-72 bg-primary/15 rounded-full blur-[88px] pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-10 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex w-full max-w-sm flex-col gap-6 relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 self-center font-headline-sm text-headline-sm text-on-surface group"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-surface-container-high border border-surface-container-highest shadow-sm group-hover:scale-105 transition-transform">
            <Image
              src="/logo.svg"
              alt="Promptify Script Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <span className="font-bold tracking-tight">Promptify Script</span>
        </Link>

        <LoginCard />

        <div className="text-center text-xs text-on-surface-variant">
          <Link
            href="/"
            className="hover:text-primary transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>Kembali ke Beranda Generator</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
