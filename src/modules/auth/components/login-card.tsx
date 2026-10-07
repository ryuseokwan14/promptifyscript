"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/common/context/app-context";
import { LoginHeader } from "./login-header";
import { OAuthButton } from "./oauth-button";

export function LoginCard() {
  const router = useRouter();
  const { login } = useApp();

  const [email, setEmail] = useState("creator@promptify.ai");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      router.push("/");
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login("workspace.creator@promptify.ai");
      router.push("/");
    }, 500);
  };

  return (
    <div className="relative w-full max-w-md bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl border border-surface-container-high/60 shadow-2xl p-8 space-y-7 overflow-hidden">
      {/* Top Highlight Accent Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <LoginHeader />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label
            className="block font-label-code text-label-code text-on-surface-variant font-medium"
            htmlFor="email"
          >
            Creator ID / Email
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
              mail
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md pl-11 pr-4 py-3 rounded-xl border border-surface-container-high/50 outline-none transition duration-200 focus:bg-surface-container-high focus:border-primary/50 focus:shadow-[0_0_16px_rgba(128,131,255,0.25)]"
              placeholder="creator@promptify.ai"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            className="block font-label-code text-label-code text-on-surface-variant font-medium"
            htmlFor="password"
          >
            Master Key
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
              lock
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md pl-11 pr-11 py-3 rounded-xl border border-surface-container-high/50 outline-none transition duration-200 focus:bg-surface-container-high focus:border-primary/50 focus:shadow-[0_0_16px_rgba(128,131,255,0.25)]"
              placeholder="••••••••••••"
              required
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-outline hover:text-on-surface transition-colors p-1 flex items-center justify-center rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between font-body-sm text-body-sm pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded bg-surface-container peer-checked:bg-primary-container border border-surface-container-high flex items-center justify-center transition shadow-sm group-hover:bg-surface-container-high">
              {rememberMe && (
                <span className="material-symbols-outlined text-on-primary-container text-[14px] font-bold">
                  check
                </span>
              )}
            </div>
            <span className="text-on-surface-variant group-hover:text-on-surface transition">
              Remember me
            </span>
          </label>
          <button
            type="button"
            className="text-secondary hover:text-secondary-fixed transition font-medium text-xs cursor-pointer"
            onClick={() =>
              alert("Password reset instructions have been sent to your registered email.")
            }
          >
            Forgot password?
          </button>
        </div>

        <button
          id="submitBtn"
          type="submit"
          disabled={loading}
          className="w-full relative group overflow-hidden py-3 px-5 rounded-xl bg-gradient-to-r from-primary-container via-primary-container to-secondary-container text-on-primary font-headline-sm text-headline-sm text-center font-semibold shadow-[0_4px_20px_rgba(128,131,255,0.35)] hover:shadow-[0_6px_24px_rgba(76,215,246,0.4)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          <span className="relative z-10 font-headline-sm text-headline-sm font-semibold tracking-wide">
            {loading ? "Authenticating..." : "Sign In"}
          </span>
          <span className="material-symbols-outlined relative z-10 text-[20px] transition-transform duration-200 group-hover:translate-x-1">
            arrow_forward
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="w-full h-px bg-surface-container-highest"></div>
        <span className="absolute bg-surface-container-low px-3 font-label-badge text-label-badge uppercase tracking-wider text-outline">
          or authenticate with
        </span>
      </div>

      <OAuthButton onClick={handleGoogleLogin} disabled={loading} />

      <div className="pt-2 flex flex-col items-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-badge text-label-badge border border-surface-container-high/40">
          <span className="material-symbols-outlined text-[13px] text-secondary">
            verified_user
          </span>
          <span>End-to-End Encrypted Prompt Sync</span>
        </div>
        <p className="font-label-badge text-label-badge text-outline text-center tracking-normal">
          Single Creator Workspace &bull; Google Gemini Video Engine v2.5
        </p>
      </div>
    </div>
  );
}
