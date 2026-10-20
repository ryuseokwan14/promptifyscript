# Project Todo List - Remediasi Data & Optimasi Generator

## 1. Remediasi Labeling Bank Data Lokasi (Database)
Tujuan: Memindahkan lokasi berkarakteristik outdoor/streetwear dari `casual_aesthetic` ke `urban_adventure` agar tidak terjadi ketidakcocokan suasana saat prompt di-generate.

### A. Kategori Outdoor Ekstrem, Gunung, Hutan & Camping -> Pindah ke `urban_adventure`
- [ ] Area skatepark outdoor
- [ ] Jalur hiking pemula
- [ ] Jalur trekking ringan
- [ ] Tempat istirahat pendaki
- [ ] Area camping di bukit
- [ ] Area tenda camping
- [ ] Pinggir area camping
- [ ] Jalur sepeda pegunungan
- [ ] Jalan kaki di pegunungan
- [ ] Area wisata pegunungan
- [ ] Jalan di tengah hutan pinus
- [ ] Area hutan terbuka
- [ ] Pinggir hutan
- [ ] Jembatan gantung wisata

### B. Kategori Gritty Urban, Industrial & Transportasi -> Pindah ke `urban_adventure`
- [ ] Halaman gudang
- [ ] Area luar bengkel
- [ ] Jalan di bawah jembatan
- [ ] Gang perkotaan
- [ ] Area luar terminal
- [ ] Area parkir terminal
- [ ] Area parkir stasiun
- [ ] Area luar bandara

### C. Kategori Fasilitas Olahraga Lapangan -> Evaluasi / Pindah ke `urban_adventure`
- [ ] Lapangan sepak bola

---

## 2. Sinkronisasi Seed Data
- [ ] Perbarui file `prisma/seed.ts` agar daftar lokasi baku selaras dengan perubahan di database (mencegah data lama ter-upsert kembali saat seeding ulang).

---

## 3. Verifikasi & Pengujian
- [ ] Uji coba generator prompt untuk produk celana kulot dengan filter `casual_aesthetic`.
- [ ] Pastikan seluruh lokasi yang ditarik konsisten bernuansa cafe, galeri, taman, dan studio estetik.
- [ ] Pastikan rotasi kartu (DeckRotator) tetap berjalan anti-duplikat di masing-masing pool.
