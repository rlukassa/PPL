# 🚀 STEI-Ascend (Aplikasi SDM STEI)

Selamat datang di repositori resmi **Kelompok 08 - K03**. Proyek ini dikembangkan menggunakan **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS** untuk mendigitalisasi proses usulan kenaikan jabatan fungsional dosen di STEI.

## 📂 Struktur Proyek

Repositori ini telah dikonfigurasi oleh tim infrastruktur dengan struktur sebagai berikut:

### 1. `src/app/` (Routing & Pages)
Mengatur navigasi utama aplikasi melalui sistem file-based routing.
- **`/login`**: Halaman autentikasi akun institusi.
- **`/dashboard`**: Area utama setelah login (menggunakan *shared layout*).
- **`/dashboard/upload`**: Fitur manajemen repositori dan pengunggahan karya ilmiah.
- **`/api`**: Endpoint backend (API Routes) untuk proses Auth dan Upload.

### 2. `src/components/` (UI Components)
Berisi komponen visual yang bersifat *reusable* (dapat digunakan kembali).
- **`ui/`**: Komponen atom dasar (Button, Input, Badge, dll).
- **`layout/`**: Komponen kerangka (Sidebar, Navbar, Footer).
- **`forms/`**: Komponen formulir spesifik (LoginForm, UploadForm).

### 3. `src/lib/` (Core Logic)
"Mesin" utama yang berjalan di sisi server.
- **`db.ts`**: Inisialisasi koneksi database PostgreSQL via Prisma.
- **`auth.ts`**: Konfigurasi keamanan dan sesi pengguna.
- **`storage.ts`**: Logika pemrosesan dan penyimpanan file PDF di server.
- **`utils.ts`**: Fungsi pembantu (format tanggal, angka kredit, dsb).

### 4. File Konfigurasi Lainnya
- **`middleware.ts`**: Mengatur proteksi rute (Auth Guard).
- **`src/types/`**: Definisi tipe data (Interface) agar kode sinkron antar anggota tim.
- **`prisma/`**: Skema database dan riwayat migrasi.
- **`public/uploads/`**: Lokasi fisik penyimpanan berkas PDF yang diunggah.

---

## 🛠 Panduan Kontribusi Tim (Sprint 1)

Agar pengerjaan Sprint 1 berjalan lancar, berikut pembagian fokusnya:

| Anggota | Fokus Pengerjaan | Folder Utama |
| :--- | :--- | :--- |
| **Ivant** | PB01: Login Akun Institusi | `app/login`, `components/forms/LoginForm` |
| **Hafizh** | PB02: Manajemen Repositori | `app/dashboard/upload`, `lib/storage.ts` |
| **Lukas** | Database PostgreSQL | `prisma/`, `lib/db.ts` |
| **Kenan** | Infrastruktur & Config | `.env`, `middleware.ts`, `next.config.ts` |

---

## 🏃 Memulai Pengembangan

1. **Instalasi Dependensi:**
   ```bash
   npm install

2. **Konfigurasi Environment:**
   - Salin file `.env.example` menjadi `.env`:
     ```bash
     cp .env.example .env
     ```
   - Buka file `.env` dan sesuaikan `DATABASE_URL` dengan database PostgreSQL lokal masing-masing.

3. **Setup Database (Prisma):**
   Jalankan perintah berikut untuk menyinkronkan struktur tabel dan generate client:
   ```bash
   # Sinkronisasi tabel ke database lokal
   npx prisma migrate dev

   # Generate Prisma Client (untuk validasi tipe data)
   npx prisma generate