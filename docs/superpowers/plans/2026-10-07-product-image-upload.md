# Rencana Implementasi: Fitur Upload & Tampilan Foto Produk (Supabase Storage)

> **Untuk pekerja agensi:** WAJIB SUB-SKILL: Gunakan superpowers:executing-plans atau langkah terstruktur per-task. Setiap langkah menggunakan format checkbox (`- [ ]`).

**Tujuan:** Mengintegrasikan fitur upload foto produk ke Supabase Storage (bucket `product-images`), menyimpan URL gambar ke database PostgreSQL via Prisma, dan menampilkannya pada form input, modal edit, tabel katalog, serta kartu preview produk tanpa melanggar aturan Clean Architecture dan No-Emoji UI.

**Arsitektur:** Mengikuti Next.js 15 App Router & Clean Architecture (Feature-Driven). Menambahkan layer `StorageService` di `infrastructure/storage/`, memperluas schema Zod & repository di `modules/products/`, sinkronisasi via `db:push` dan route API `db-sync`, serta pembaruan komponen UI di `modules/settings` dan `modules/generator`.

**Tech Stack:** Next.js 15, Prisma ORM, Supabase Storage (`@supabase/supabase-js`), Tailwind CSS v4, Google Material Symbols.

---

## Batasan Global (Global Constraints)
- Wajib mematuhi SOP 1 File = 1 Responsibility.
- Dilarang menggunakan emoji mentah pada UI; gunakan Google Material Symbols (`<span className="material-symbols-outlined">...</span>`).
- Prisma hanya boleh diakses di layer Repository (`repositories/`).
- Database sync: update `prisma/schema.prisma` -> jalankan `npx prisma db push` -> update API sync.
- File code harus tetap modular dan di bawah batas ukuran file rekomendasi.

---

### Task 1: Update Prisma Schema & Push ke Supabase
**Berkas:**
- Modifikasi: `prisma/schema.prisma`
- Modifikasi: `prisma/seed.ts`

- [ ] **Langkah 1:** Tambahkan kolom `imageUrl String?` pada model `Product` di `prisma/schema.prisma`.
- [ ] **Langkah 2:** Jalankan `npx prisma db push` untuk memperbarui tabel di Supabase PostgreSQL.
- [ ] **Langkah 3:** Tambahkan contoh `imageUrl` pada `prisma/seed.ts` agar data awal memiliki placeholder gambar.

---

### Task 2: Update Schema Zod, Type, & Use Cases Produk
**Berkas:**
- Modifikasi: `src/types/index.ts`
- Modifikasi: `src/modules/products/types/product.types.ts`
- Modifikasi: `src/modules/products/schemas/create-product.schema.ts`
- Modifikasi: `src/modules/products/schemas/update-product.schema.ts`
- Modifikasi: `src/modules/products/use-cases/create-product.use-case.ts`
- Modifikasi: `src/common/context/app-provider.tsx`

- [ ] **Langkah 1:** Tambahkan `imageUrl?: string | null` pada antarmuka `Product` dan `ProductData`.
- [ ] **Langkah 2:** Tambahkan validasi `imageUrl` pada `CreateProductSchema` dan `UpdateProductSchema`.
- [ ] **Langkah 3:** Update `CreateProductUseCase` untuk memasukkan `imageUrl` ke repository.
- [ ] **Langkah 4:** Teruskan parameter `imageUrl` pada pemanggilan `createProductAction` di `AppProvider`.

---

### Task 3: Buat Storage Service untuk Supabase Storage
**Berkas:**
- Buat: `src/infrastructure/storage/storage.service.ts`

- [ ] **Langkah 1:** Buat class `StorageService` yang mengabstraksi upload file ke Supabase Storage (`bucket: 'product-images'`).
- [ ] **Langkah 2:** Buat method `uploadProductImage(file: File): Promise<string>` yang mengembalikan Public URL.
- [ ] **Langkah 3:** Buat method `deleteProductImage(pathOrUrl: string): Promise<boolean>` untuk membersihkan file lama bila diperlukan.

---

### Task 4: Buat Route Handler DB-Sync Sesuai SOP AGENTS.md
**Berkas:**
- Buat: `src/app/api/db-sync/route.ts`

- [ ] **Langkah 1:** Buat route handler `GET` dan `POST` di `src/app/api/db-sync/route.ts` yang memuat `imageUrl` pada `create` dan `update`.

---

### Task 5: Update UI Tambah & Edit Produk (Settings Module)
**Berkas:**
- Modifikasi: `src/modules/settings/components/add-product-form.tsx`
- Modifikasi: `src/modules/settings/components/edit-product-modal.tsx`

- [ ] **Langkah 1:** Pada `AddProductForm`, tambahkan input upload foto dengan preview gambar, indikator proses upload ke Supabase Storage, dan tombol hapus/reset foto.
- [ ] **Langkah 2:** Pada `EditProductModal`, tambahkan area pratinjau foto produk saat ini serta tombol untuk upload/ganti foto ke Supabase Storage.

---

### Task 6: Update UI Tampilan Katalog & Kartu Generator
**Berkas:**
- Modifikasi: `src/modules/settings/components/products-table.tsx`
- Modifikasi: `src/modules/generator/components/product-card.tsx`

- [ ] **Langkah 1:** Pada `ProductsTable`, tampilkan thumbnail `imageUrl` pada kolom nama produk jika tersedia; fallback ke ikon jika belum ada foto.
- [ ] **Langkah 2:** Pada `ProductCard`, tampilkan gambar produk jika `imageUrl` tersedia dengan proporsi rapi dan efek hover dark-glass.

---

### Task 7: Verifikasi dan Build
- [ ] **Langkah 1:** Jalankan `npm run build` untuk memastikan tidak ada kesalahan kompilasi Typescript / Next.js 15.
- [ ] **Langkah 2:** Pastikan tidak ada emoji mentah di seluruh komponen yang baru dimodifikasi.
