import React from "react";
import Image from "next/image";

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-secondary via-primary to-tertiary-container opacity-60 blur-md group-hover:opacity-90 transition duration-500"></div>
        <div className="relative w-16 h-16 rounded-full bg-surface-container flex items-center justify-center shadow-lg border border-surface-container-high/50">
          <Image
            src="/logo.svg"
            alt="Promptify Script Logo"
            width={44}
            height={44}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
            Promptify Script
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-highest">
            <span className="font-label-code text-[11px] font-semibold text-secondary uppercase tracking-wider">
              PRO
            </span>
          </span>
        </div>
        <h1 className="font-headline-sm text-headline-sm text-on-surface font-semibold pt-1">
          Welcome Back
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Sign in to access your automated prompt generator studio.
        </p>
      </div>
    </div>
  );
}
