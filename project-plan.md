# Project Overview: Promptify Script

Aplikasi web berbasis Next.js yang dirancang khusus untuk mempermudah pembuatan prompt AI dan skrip konten video TikTok secara otomatis dan efisien.

---

## 1. Tujuan Proyek
* Membantu alur pembuatan skrip/prompt konten TikTok menggunakan integrasi AI.
* Digunakan untuk kebutuhan operasional pribadi (single user), memprioritaskan fitur inti dan kepraktisan tanpa kompleksitas autentikasi awal.

---

## 2. Use Cases (Skenario Penggunaan)

* **UC-01: Generate Ide & Hook Konten TikTok**
  * **Aktor:** Pengguna (Kamu)
  * **Deskripsi:** Pengguna memasukkan topik atau tema video ke dalam input frontend, lalu sistem mengirim instruksi ke Gemini API untuk menghasilkan variasi hook awal video yang menarik perhatian penonton.

* **UC-02: Generate Skrip Lengkap Video TikTok**
  * **Aktor:** Pengguna (Kamu)
  * **Deskripsi:** Pengguna menentukan sudut pandang/outline, kemudian AI menghasilkan naskah video per adegan (scene-by-scene) beserta arahan visual/audio (audio cue, visual direction).

* **UC-03: Prompt Engineering untuk AI Generator Video/Gambar**
  * **Aktor:** Pengguna (Kamu)
  * **Deskripsi:** Mengubah konsep video TikTok menjadi format teks prompt yang siap disalin (copy-paste) ke platform AI video/gambar pendukung (seperti Midjourney, Runway, Kling, atau Pika).

---

## 3. Ruang Lingkup & Kebutuhan Fitur

* **Integrasi AI:**
  * Terhubung dengan model Gemini Pro via Google AI Studio API.
  * API Key disimpan dengan aman di file environment (`.env`).
  * Backend API route bertindak sebagai jembatan yang menerima permintaan dari antarmuka pengguna (frontend) dan meneruskannya ke layanan AI.

* **Penggunaan & Autentikasi:**
  * Tidak menggunakan sistem login/otentikasi di tahap awal, fokus langsung pada pengolahan prompt.
  * Memanfaatkan kuota gratis dari Google AI Studio yang cukup memadai untuk alur kerja pengguna tunggal.

---

## 4. Tech Stack & Lingkungan Kerja

* **Framework:** Next.js (App Router / Pages Router via `create-next-app@latest`)
* **AI Engine:** Google AI Studio (Gemini Pro API)
* **IDE / Editor:** Antigravity IDE
* **Sistem Operasi:** Arch Linux
* **Manajemen Proyek:**
  * Nama direktori/proyek npm: `promptify-script` (mengikuti konvensi npm: huruf kecil, tanpa spasi, URL-friendly).