# Rencana Implementasi: Persistent State Generate Unik (Supabase DB) & Tombol Reset Siklus

## 1. Ringkasan & Tujuan
Mengubah sistem kocokan naskah dan lokasi unik (`DeckRotator`) dari yang sebelumnya hanya tersimpan di memori browser (*in-memory*) menjadi tersimpan permanen di Supabase Database (`AppUser.deckState`). 
Dengan ini:
- Saat user keluar aplikasi, menutup tab, atau logout lalu login kembali, status siklus dan sisa naskah yang belum dipakai akan tetap berlanjut (*continue*).
- Disediakan tombol UI manual untuk me-reset siklus naskah kembali ke putaran awal (#1).
- Performa generate tetap instan (0 ms di browser), dengan sinkronisasi ke database di background.

---

## 2. Perubahan Database & Schema (Prisma)

### File: `prisma/schema.prisma`
Tambahkan field `deckState Json?` pada model `AppUser`:
```prisma
model AppUser {
  id        String   @id @default(cuid())
  email     String   @unique @default("najmishfwn@gmail.com")
  password  String   // Hashed password
  role      String   @default("CREATOR") // "CREATOR"
  deckState Json?    // Snapshot antrean deck: { pools: Record<string, string[]>, cycles: Record<string, number> }
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Eksekusi Database:
- Jalankan `npx prisma db push` untuk menyinkronkan schema ke Supabase.
- Update `src/app/api/db-sync/route.ts` sesuai Database Sync Rule agar `deckState` ikut tersinkronisasi.

---

## 3. Peningkatan Utility `DeckRotator`

### File: `src/modules/generator/utils/deck-rotator.ts`
Tambahkan method untuk export dan import state:
1. `getState(): { pools: Record<string, string[]>; cycles: Record<string, number> }`
   - Mengubah `Map` pools dan cycles internal menjadi objek JSON murni.
2. `loadState(state: { pools?: Record<string, string[]>; cycles?: Record<string, number> } | null): void`
   - Mengisi kembali `this.pools` dan `this.cycles` dari data database.
3. `resetPoolsForProduct(productId: string): void`
   - Menghapus key antrean naskah khusus produk tertentu (`generator_scripts_${productId}` dan `live_scripts_${productId}`).

---

## 4. Arsitektur Backend (Clean Architecture / Next.js 15)

Sesuai aturan 1 File = 1 Tanggung Jawab:

1. **Repository (`src/modules/generator/repositories/deck-state.repository.ts`):**
   - `getDeckState(): Promise<DeckStateSnapshot | null>` (Membaca kolom `deckState` dari user Creator).
   - `saveDeckState(state: DeckStateSnapshot): Promise<void>` (Menyimpan snapshot JSON ke user Creator).
   - `resetProductDeckState(productId?: string): Promise<DeckStateSnapshot>` (Mereset pool di database).

2. **Use Cases:**
   - `src/modules/generator/use-cases/get-deck-state.use-case.ts`: Mengambil deck state dari repository.
   - `src/modules/generator/use-cases/save-deck-state.use-case.ts`: Memvalidasi dan menyimpan deck state.
   - `src/modules/generator/use-cases/reset-deck-state.use-case.ts`: Mereset antrean pool produk/semua di database.

3. **Server Actions:**
   - `src/modules/generator/actions/get-deck-state.action.ts`: Server action untuk mengambil data saat awal aplikasi dibuka.
   - `src/modules/generator/actions/save-deck-state.action.ts`: Server action untuk menyimpan snapshot.
   - `src/modules/generator/actions/reset-deck-state.action.ts`: Server action untuk reset antrean.

4. **Export Index:**
   - Daftarkan action baru di `src/modules/generator/index.ts`.

---

## 5. Integrasi Frontend Context (`AppProvider`)

### File: `src/common/context/app-provider.tsx` & `app-context.tsx`
1. **Hydration saat Load (`refreshData`):**
   - Panggil `getDeckStateAction()` bersamaan dengan `Promise.all` saat aplikasi pertama kali dimuat.
   - Masukkan hasilnya ke `deckRotator.loadState(res.data)`.
2. **Auto-Save Background:**
   - Setiap kali `generatePrompt()` dipanggil, panggil `saveDeckStateAction(deckRotator.getState())` secara asinkron tanpa menunggu (*non-blocking*).
3. **Fungsi Reset Manual:**
   - Tambahkan fungsi `resetDeckCycle(productId?: string)` ke dalam `AppContext`.
   - Fungsi ini akan mereset `deckRotator` secara lokal, memicu `resetDeckStateAction(productId)`, lalu memperbarui UI.

---

## 6. UI Tombol Reset Siklus Manual

Sesuai aturan **No Emojis in UI** (gunakan Google Material Symbols):

1. **Komponen Target:**
   - **`src/modules/generator/components/generated-prompt-modal.tsx`** & **`generated-prompt-studio.tsx`**:
     Di baris info siklus (tempat badge "Sisa X naskah unik (Siklus #Y)"), tambahkan tombol kecil bergaya dark-glass:
     - Ikon: `<span className="material-symbols-outlined text-xs">restart_alt</span>`
     - Teks: "Reset Siklus"
     - Tooltip / Dialog singkat: "Kembalikan naskah produk ini ke putaran #1".
   - **`src/modules/generator/components/product-selector.tsx`** atau **`generator-controls.tsx`**:
     Opsi tombol reset cepat di samping target produk aktif.

---

## 7. Rencana Pengujian & Verifikasi

1. **Verifikasi Database:**
   - Cek `AppUser.deckState` di Supabase setelah melakukan 1x generate.
2. **Verifikasi Persistent:**
   - Generate prompt hingga naskah terpakai beberapa kali (misal sisa 10 naskah, siklus #1).
   - Lakukan logout atau tutup tab browser / buka window baru.
   - Login kembali, buka generator: pastikan sisa naskah tetap 10 dan siklus tetap #1.
3. **Verifikasi Reset:**
   - Klik tombol "Reset Siklus" di UI.
   - Pastikan muncul toast "Siklus naskah berhasil direset ke Putaran #1".
   - Sisa naskah kembali penuh ke jumlah total bank naskah.
