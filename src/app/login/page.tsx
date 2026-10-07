import React from "react";
import { LoginCard } from "@/modules/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased flex items-center justify-center p-gutter relative overflow-hidden">
      {/* Glowing Ambient Atmospheric Halos */}
      <div className="absolute -top-12 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-[88px] pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-10 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tertiary-container/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="w-full max-w-md mx-auto relative z-10 py-6">
        <LoginCard />
      </main>
    </div>
  );
}
