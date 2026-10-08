"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Generator",
    icon: "auto_awesome",
  },
  {
    href: "/data-settings",
    label: "Data & Settings",
    icon: "tune",
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe bg-surface-dim/90 backdrop-blur-xl border-t border-surface-container-high/40 shadow-[0_-4px_24px_rgba(0,0,0,0.45)]"
    >
      <div className="h-16 px-6 grid grid-cols-2 items-center max-w-sm mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all min-h-[44px] min-w-[44px] group relative py-1 rounded-xl",
                isActive
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={cn(
                    "material-symbols-outlined text-[22px] transition-transform group-active:scale-95",
                    isActive && "text-primary scale-105"
                  )}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>

              <span
                className={cn(
                  "font-body-sm text-[11.5px] leading-tight transition-colors",
                  isActive ? "text-primary font-semibold" : "text-on-surface-variant"
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="absolute bottom-1 w-8 h-0.5 rounded-full bg-primary shadow-[0_0_6px_rgba(192,193,255,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
