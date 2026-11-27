# Nalarin

Platform web personal knowledge, exploration, dan social learning.
Tagline: **Learn Beyond Limits.**

## Tautan Pengumpulan

| Item | Tautan |
|---|---|
| Repository GitHub | https://github.com/ayusafitri721/nalarin |
| Hasil karya (hosting) | `[TAUTAN HOSTING BELUM DIISI]` |

> Catatan: tautan hosting di atas masih placeholder. Isi dengan URL deployment setelah aplikasi dipublish. Kode program belum di-push ke repository, jadi repository di atas belum berisi implementasi ini sampai proses `git add`, `commit`, dan `push` dilakukan.

---

## Latar Belakang Pembuatan

Belajar daring sering kali terasa generik: materi disajikan secara linear, tanpa arah yang jelas, dan tanpa dopamin yang membuat pengguna kembali. Nalarin dibuat sebagai respons terhadap kondisi tersebut. Produk ini menyatukan eksplorasi pengetahuan, permainan edukatif, dan interaksi sosial ke dalam satu pengalaman yang dipersonalisasi, dengan karakter visual sendiri (companion Nori dan dunia pulau pengetahuan) agar terasa seperti produk yang punya identitas, bukan template.

## Tujuan Dibuatnya Website

1. Membantu pengguna menemukan topik baru melalui eksplorasi yang menyenangkan, bukan sekadar daftar materi.
2. Membuat proses belajar terukur lewat XP, level, streak, quest, dan skill passport.
3. Menyediakan ruang belajar bersama teman, pesan, study room, dan leaderboard.
4. Memberikan pengalaman yang personally relevan lewat onboarding 7 langkah dan pengaturan tema, aksen, serta companion.
5. Menjadi contoh implementasi web modern yang siap dikembangkan lebih lanjut dengan backend Supabase.

## Penjelasan Fitur Website

### Publik
- **Beranda**: hero dengan ilustrasi pengetahuan Nalarin, ringkasan fitur, katalog, dan banner kampanye.
- **Halaman informasi**: Jelajahi, Fitur, Tentang, Kebijakan Privasi, Ketentuan Layanan, dan Pusat Bantuan.
- **Autentikasi**: daftar akun, masuk dengan email/password, Google OAuth, lupa password, dan verifikasi email.

### Onboarding
- Tujuh langkah sesuai PRD: identitas, minat, tujuan, target harian, companion, tema, dan konfirmasi.
- Data onboarding tersimpan di profil Supabase bila backend aktif.

### Belajar
- **Dashboard**: ringkasan progres nyata (XP, level, streak, pelajaran selesai), lanjutkan materi, aktivitas kuis, quest harian, dan companion.
- **Explore & Universe**: katalog dunia pengetahuan dan topik di dalamnya.
- **Topic & Learning**: detail topik, objektif, dan modul pembelajaran.
- **Quiz & Result**: kuis interaktif dengan pembahasan dan hasil akhir.
- **Journey**: riwayat perjalanan belajar.

### Latihan & Progres
- **Games**: game edukatif, termasuk memory grid dengan XP.
- **Quest**: quest harian, mingguan, spesial, dan dunia nyata.
- **Growth**: companion, skill passport, pencapaian, streak, curiosity box, dan wrapped.

### Sosial
- Daftar teman, profil teman, pesan, study room, duel, dan leaderboard.

### Personalisasi & Pengaturan
- Tema terang/gelap/sistem, warna aksen kustom dengan validasi kontras, densitas, dan gaya background.
- Profil, notifikasi, pencarian global, dan pengaturan akun.

### Backend (Supabase)
- Tabel `profiles`, `user_progress`, dan `quiz_results` dengan Row Level Security.
- Hydrasi data saat login dan sinkronisasi progres otomatis ke database.

---

## Tech Stack

| Lapisan | Teknologi |
|---|---|
| UI | React 19, TypeScript, Vite 7, React Router v7 |
| Styling | Tailwind CSS v4, CSS variables |
| State & data | Zustand (persist), TanStack Query, Supabase PostgreSQL |
| Form & validasi | react-hook-form, zod |
| Visualisasi & ikon | Recharts, lucide-react |
| Testing | Vitest |
| Backend | Supabase Auth + PostgreSQL (opsional, fallback lokal) |

PWA belum dipasang. Struktur project sudah berupa SPA dan siap untuk `vite-plugin-pwa`.

---

## Cara Penggunaan

### 1. Prasyarat
- Node.js 20 atau lebih baru
- npm
- Akun Supabase (opsional, untuk backend)

### 2. Menjalankan secara lokal

```bash
git clone https://github.com/ayusafitri721/nalarin.git
cd nalarin
npm install
npm run dev
```

Buka `http://localhost:5173`.

Tanpa konfigurasi Supabase, aplikasi tetap berjalan dengan data lokal dan `localStorage`.

### 3. Mengaktifkan backend Supabase

1. Buat project di https://supabase.com.
2. Buka **SQL Editor**, buat query baru, lalu jalankan seluruh isi `supabase/migrations/0001_initial.sql`.
3. Salin `.env.example` menjadi `.env.local`, lalu isi:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable-key>
```

4. Jalankan ulang `npm run dev`.
5. Opsional: aktifkan Google provider di **Authentication → Providers**. Daftarkan URL aplikasi pada **Authentication → URL Configuration → Redirect URLs**, misalnya `http://localhost:5174/**` sesuai port yang dipakai. UUID ini juga dipakai untuk tautan reset password `/reset-password`.

### 4. Build produksi

```bash
npm run build
npm run preview
```

Hasil build ada di folder `dist/`.

### 5. Alur penggunaan utama

Daftar → Onboarding (7 langkah) → Dashboard → Explore → Universe → Topic → Learning → Quiz → Result → Journey.

### 6. Test

```bash
npm test
```

---

## Struktur Project

```
src/
├── components/     # AppShell, Illustrations (SVG original), UI reusable
├── data/           # Katalog konten Nalarin (universe, topic, quiz, game, quest)
├── lib/            # utils, supabase client, backend data + sync, validasi auth
├── pages/          # Halaman publik, auth, onboarding, dan /app/*
├── store/          # Zustand store dengan persist
└── types/          # Tipe data domain
supabase/
└── migrations/     # Schema PostgreSQL + RLS
public/assets/nalarin/landing/  # Aset SVG original Nalarin
```

## Catatan Implementasi

- Seluruh ilustrasi adalah SVG original milik project ini, bukan aset pihak lain.
- Tema default lavender terang; mode light/dark/system tersedia sebagai toggle pengguna.
- XP dan reward memakai idempotency key untuk mencegah klaim ganda.
- Data katalog masih berasal dari `src/data/content.ts`; tabel CMS belum dibuat.
- Halaman administrasi/CMS belum tersedia.
- Untuk produksi: aktifkan HTTPS, atur JWT expiry sesuai kebutuhan, dan pertimbangkan BFF bila session cookie HttpOnly wajib digunakan.
