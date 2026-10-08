"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/common/context/app-context";
import { loginAction } from "../actions/login.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function LoginCard() {
  const router = useRouter();
  const { login } = useApp();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await loginAction({ identifier, password });
      if (res.success && res.user) {
        login(res.user.email, res.user.role);
        router.push("/");
        router.refresh();
      } else {
        setErrorMessage(res.message || "Identifier atau password tidak sesuai");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan pada server saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full bg-surface-container-low/95 border-surface-container-high/60 shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-headline-md text-2xl font-bold tracking-tight text-on-surface">
            Welcome back
          </CardTitle>
          <CardDescription className="text-on-surface-variant font-body-sm text-sm">
            Masuk ke Promptify Script Studio
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {errorMessage && (
            <div className="bg-error-container/20 border border-error/40 text-error px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-medium animate-fade-in">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor="identifier"
                  className="text-xs font-label-code text-on-surface-variant font-medium"
                >
                  Username / Email
                </FieldLabel>
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Username atau Email"
                  required
                  className="bg-surface-container text-on-surface border-surface-container-high/60 h-10 px-3 rounded-xl focus:border-primary"
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="text-xs font-label-code text-on-surface-variant font-medium"
                  >
                    Password
                  </FieldLabel>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-xs text-primary hover:underline underline-offset-4 cursor-pointer font-medium"
                  >
                    Lupa password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="bg-surface-container text-on-surface border-surface-container-high/60 h-10 px-3 pr-10 rounded-xl focus:border-primary"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 text-on-surface-variant hover:text-on-surface transition-colors p-1 flex items-center justify-center rounded cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-headline-sm text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.99] transition cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {loading ? "progress_activity" : "login"}
                  </span>
                  <span>{loading ? "Memverifikasi..." : "Masuk ke Studio"}</span>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password Recovery Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="max-w-sm rounded-2xl bg-surface-container-low border border-surface-container-high/60">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline-sm text-base font-bold text-on-surface">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                help
              </span>
              <span>Bantuan Pemulihan Akun</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-on-surface-variant pt-2 space-y-2 text-left">
              <span>
                Sistem dilindungi kunci induk terpusat:
              </span>
              <span className="block font-medium text-on-surface">
                1. Masuk menggunakan akun administrator.
              </span>
              <span className="block font-medium text-on-surface">
                2. Buka menu Data &amp; Settings &gt; Security &amp; Auth.
              </span>
              <span className="block font-medium text-on-surface">
                3. Reset password akun creator di menu kelola akun utama.
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="pt-3 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setForgotPasswordOpen(false)}
              className="text-xs cursor-pointer"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
