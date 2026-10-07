"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-md mt-auto shadow-[0_-1px_8px_rgba(0,0,0,0.2)] border-t border-surface-container-high/30">
      <div className="w-full px-gutter max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
        <div className="flex items-center gap-space-sm">
          <span>Promptify Script &copy; 2026</span>
          <span className="text-outline-variant">&bull;</span>
          <span>Automated Video Prompt Studio</span>
        </div>
        <div className="flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant">
          <span className="text-primary font-medium">9:16 Vertical Reel Mode</span>
        </div>
      </div>
    </footer>
  );
}
