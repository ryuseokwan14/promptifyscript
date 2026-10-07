# Konsep & Spesifikasi Sistem: Promptify Script

Aplikasi web Next.js untuk otomasi perakitan dan copy-paste prompt video Gemini secara instan, akurat, dan variatif berbasis database preset yang terkurasi.

---

## 1. Filosofi & Masalah yang Diselesaikan

* **Masalah:** Mengganti secara manual variabel tempat, gerak bibir, dan subjek gender pada prompt video berulang kali menghabiskan waktu dan rawan salah konteks.
* **Solusi:** Sistem **Dynamic Prompt Assembler**. Menggunakan bank data terkurasi di database (bukan AI liar) untuk menghasilkan prompt siap pakai dalam 1 kali klik.
* **Target Output:** Prompt video ultra-realistis untuk di-copy langsung ke Google Gemini (Veo / AI Video Generator).

---

## 2. Struktur Data & Relasi (Database Schema)

### A. Tabel `Product` (Produk)
Menyimpan daftar produk yang dipromosikan (misal: 4 produk fashion).
* `id`: string / integer (Primary Key)
* `nama_produk`: string (contoh: *"Celana Kulot Linen"*, *"Celana Cargo Pria"*)
* `gender`: enum (`"wanita"` | `"pria"`) $\rightarrow$ Menentukan template master mana yang digunakan.
* `deskripsi`: string (opsional)

### B. Tabel `Script_Gerak_Bibir` (Relasi Ketat ke Produk)
Menyimpan variasi naskah ucapan/gerak bibir model. **Hanya aktif jika produk tersebut dipilih**.
* `id`: string / integer (Primary Key)
* `product_id`: Foreign Key ke `Product.id`
* `script_teks`: text (contoh: *"Bahan linennya bener-bener adem dan jatuh banget pas dipake jalan..."*)

### C. Tabel `Location` / `Tempat` (Bank Lokasi & Suasana Berbasis Vibe)
Variasi lokasi tempat pengambilan video dengan sistem kategorisasi Vibe Persona:
* `id`: string (Primary Key)
* `nama_tempat`: string (contoh: *"coffee shop outdoor bernuansa kayu minimalis"*, *"underground subway tunnel brutalist"*)
* `vibe`: enum / string:
  1. `casual_aesthetic` (Santai / Aesthetic — misal: Kulot, Skirt, Blouse, Knitwear)
  2. `urban_adventure` (Adventure / Streetwear — misal: Cargo, Tactical, Jacket, Hoodie)
  3. `universal` (Universal — misal: Studio Clean Grey, Living Room Cahaya Pagi)
* **Logika Injeksi:** Saat produk di-generate, sistem memfilter lokasi sesuai kesesuaian vibe produk + lokasi universal.

### D. Tabel `Master_Prompt_Template` (Berdasarkan Gender)
Format baku super prompt yang diisi secara otomatis:
* **Template Wanita (Cewek):**
  > `"Seorang Perempuan berjalan dengan suasana ceria dan gerakan ringan model berada di {tempat}, Gerakan tangan ringan menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi bahagia namun natural, berbicara jelas ke kamera dengan bahasa indonesia: {Script gerak bibir} video realistis, tanpa subtitle & musik."`
* **Template Pria (Cowok):**
  > `"Seorang Pria berjalan dengan langkah santai dan percaya diri model berada di {tempat}, Gerakan tangan santai menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi santai namun percaya diri, berbicara jelas ke kamera dengan bahasa indonesia: {Script gerak bibir} video realistis, tanpa subtitle & musik."`

---

## 3. Alur Kerja Aplikasi (Workflow)

```
[User Login] 
      │
      ▼
[Pilih Produk] ──> Sistem membaca Gender Produk (Pria / Wanita)
      │
      ├──> Pilih otomatis Master Prompt sesuai Gender
      ├──> Ambil 1 {Script gerak bibir} acak KHUSUS produk tersebut
      └──> Ambil 1 {tempat} acak dari Bank Lokasi
      │
      ▼
[Prompt Assembler] ──> Menggabungkan variabel ke {tempat} dan {Script gerak bibir}
      │
      ▼
[Output Box] ──> 1-Click "COPY PROMPT" ──> Siap di-paste ke Gemini!
```

---

## 4. Kebutuhan Antarmuka Pengguna (UI Screens)

1. **Halaman Login:**
   * Simple, modern dark mode.
   * Input email/password & tombol sign-in cepat.
2. **Dashboard Generator (Halaman Utama Harian):**
   * Selector Kartu Produk (lengkap dengan badge gender: Wanita / Pria).
   * Tombol besar **"Generate Prompt"** & **"Re-roll / Acak Lagi"**.
   * Output Box dengan teks prompt yang sudah dirakit.
   * Tombol besar **"Copy to Clipboard"** dengan notifikasi toast.
3. **Pengaturan / Data Management (CRUD):**
   * **Kelola Produk:** Tambah/edit/hapus produk + set gender (Cewek/Cowok).
   * **Kelola Script Gerak Bibir:** Filter per produk, tambah banyak variasi script ucapan.
   * **Kelola Bank Tempat:** Tambah/edit/hapus list lokasi.
   * **Kelola Master Template:** Edit teks master prompt pria & wanita.

---

## 5. Kebijakan Keamanan & Autentikasi (Strict Kick-Session Auth)

* **Model Sesi: Kick Session (Zero Persistent Session)**
  * Tidak menggunakan sesi jangka panjang (*No persistent Remember Me*).
  * Setiap kali browser/tab ditutup atau pengguna keluar dari web, sesi langsung hangus (*session-only cookie / auto-kick*).
* **Alur Akses:**
  * Pengguna wajib **LOGIN DULU** setiap kali mengakses URL web baru.
  * Jika belum login / sesi habis, Middleware Next.js langsung me-redirect akses root (`/`) dan semua sub-halaman ke `/login`.
  * Setelah kredensial terverifikasi di Supabase Auth, pengguna baru diizinkan masuk ke halaman utama (*Generator Studio*).


