"use client";

import React, { useState } from "react";
import { User } from "@/types";
import { updatePasswordAction, resetCreatorAction } from "@/modules/auth";

interface SecurityTabProps {
  user: User | null;
  creatorEmail: string;
  onRefreshUser?: () => Promise<void>;
}

export function SecurityTab({ user, creatorEmail, onRefreshUser }: SecurityTabProps) {
  const isSuperadmin = user?.role === "SUPERADMIN";

  // State untuk form Creator (Ganti Password sendiri)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk form Superadmin (Reset Akun Utama)
  const [targetEmail, setTargetEmail] = useState(creatorEmail || "najmishfwn@gmail.com");
  const [resetPassword, setResetPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Handle Update Password Creator
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Konfirmasi password baru tidak cocok" });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await updatePasswordAction({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (res.success) {
        setStatusMessage({ type: "success", text: "Password berhasil diperbarui!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setStatusMessage({ type: "error", text: res.message || "Gagal memperbarui password" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Terjadi kesalahan server saat memperbarui password" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Reset Creator oleh Superadmin
  const handleResetCreator = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await resetCreatorAction({
        email: targetEmail,
        newPassword: resetPassword,
      });

      if (res.success) {
        setStatusMessage({
          type: "success",
          text: `Kredensial akun utama (${res.email}) berhasil direset!`,
        });
        setResetPassword("");
        if (onRefreshUser) await onRefreshUser();
      } else {
        setStatusMessage({ type: "error", text: res.message || "Gagal mereset akun utama" });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Terjadi kesalahan server saat mereset akun utama" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-secondary text-[24px]">shield</span>
            <span>Security &amp; Kredensial Akun</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Kelola akses otentikasi login, kata sandi akun utama, dan pemulihan superadmin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-surface-container-high text-xs font-label-code">
            <span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
            <span>Role: {isSuperadmin ? "Master Superadmin" : "Primary Creator"}</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`px-4 py-3 rounded-xl border flex items-center gap-2.5 text-sm animate-fade-in ${
            statusMessage.type === "success"
              ? "bg-secondary-container/20 border-secondary/40 text-secondary"
              : "bg-error-container/20 border-error/40 text-error"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {statusMessage.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Panel 1: Akun Master Superadmin */}
        <div className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col justify-between gap-space-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Master Superadmin
                  </h3>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    superadmin121
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-secondary text-xs font-label-code font-semibold">
                IMMUTABLE
              </span>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              Akun pemulih utama dengan username <code className="text-secondary bg-surface-container px-1 py-0.5 rounded">superadmin121</code> dan password induk tetap. Akun ini tidak dapat diubah kredensialnya demi mencegah terkunci dari sistem secara permanen.
            </p>

            <div className="bg-surface-container/60 border border-surface-container-high/30 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[16px]">lock_reset</span>
                <span>Hak Istimewa Superadmin:</span>
              </div>
              <ul className="text-xs text-on-surface-variant space-y-1 pl-5 list-disc">
                <li>Bisa mereset password akun utama tanpa mengetahui password lama.</li>
                <li>Dapat mengganti alamat email akun utama kapan saja.</li>
                <li>Akses darurat jika Anda lupa kata sandi akun creator.</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-surface-container-high/30 text-xs text-outline">
            Status: Kunci Induk Terverifikasi Aktif
          </div>
        </div>

        {/* Panel 2: Form Sesuai Role yang Login */}
        {isSuperadmin ? (
          /* Form Superadmin: Reset Akun Creator */
          <div className="bg-surface-container-low border border-secondary/30 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Kelola Akun Utama (Creator)
                </h3>
                <span className="font-label-code text-label-code text-secondary">
                  Akses Khusus Superadmin
                </span>
              </div>
            </div>

            <form onSubmit={handleResetCreator} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-label-code text-on-surface-variant font-medium">
                  Alamat Email Akun Utama
                </label>
                <input
                  type="email"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  className="w-full bg-surface-container text-on-surface px-3.5 py-2.5 rounded-xl border border-surface-container-high/60 text-sm outline-none focus:border-secondary/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-label-code text-on-surface-variant font-medium">
                  Set Password Baru untuk Akun Utama
                </label>
                <input
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-surface-container text-on-surface px-3.5 py-2.5 rounded-xl border border-surface-container-high/60 text-sm outline-none focus:border-secondary/60"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-secondary text-surface-container-lowest font-headline-sm text-sm font-semibold hover:brightness-110 active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                <span>{loading ? "Menyimpan..." : "Reset Password Akun Utama"}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Form Creator: Ganti Password Akun Sendiri */
          <div className="bg-surface-container-low border border-surface-container-high/40 p-space-lg rounded-2xl shadow-md flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">password</span>
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Ganti Password Akun
                </h3>
                <span className="font-label-code text-label-code text-on-surface-variant">
                  {user?.email || "najmishfwn@gmail.com"}
                </span>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-label-code text-on-surface-variant font-medium">
                  Password Saat Ini
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan password saat ini"
                  className="w-full bg-surface-container text-on-surface px-3.5 py-2.5 rounded-xl border border-surface-container-high/60 text-sm outline-none focus:border-primary/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-label-code text-on-surface-variant font-medium">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-surface-container text-on-surface px-3.5 py-2.5 rounded-xl border border-surface-container-high/60 text-sm outline-none focus:border-primary/60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-label-code text-on-surface-variant font-medium">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  className="w-full bg-surface-container text-on-surface px-3.5 py-2.5 rounded-xl border border-surface-container-high/60 text-sm outline-none focus:border-primary/60"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-semibold hover:brightness-110 active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                <span>{loading ? "Menyimpan..." : "Simpan Password Baru"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
