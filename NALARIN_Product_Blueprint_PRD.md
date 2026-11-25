# NALARIN — Product Blueprint, PRD, dan UI/UX Specification

> **Tagline:** Learn Beyond Limits.  
> **Kategori produk:** Personal Knowledge, Exploration & Social Learning Platform  
> **Platform:** Responsive Web Application (desktop-first, mobile-friendly)  
> **Status dokumen:** Konsep dan spesifikasi awal — belum menjadi bukti bahwa fitur sudah diimplementasikan  
> **Versi dokumen:** 1.0  
> **Bahasa produk:** Bahasa Indonesia sebagai bahasa awal, dengan struktur yang memungkinkan penambahan bahasa lain

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Latar Belakang dan Permasalahan](#2-latar-belakang-dan-permasalahan)
3. [Visi, Misi, dan Tujuan](#3-visi-misi-dan-tujuan)
4. [Target Pengguna dan Persona](#4-target-pengguna-dan-persona)
5. [Nilai Utama dan Pembeda Produk](#5-nilai-utama-dan-pembeda-produk)
6. [Ruang Lingkup Produk](#6-ruang-lingkup-produk)
7. [Struktur Navigasi dan Peta Halaman](#7-struktur-navigasi-dan-peta-halaman)
8. [Alur Pengguna](#8-alur-pengguna)
9. [Spesifikasi Fitur](#9-spesifikasi-fitur)
10. [Aturan Gamifikasi](#10-aturan-gamifikasi)
11. [Sistem Sosial dan Keamanan Pengguna](#11-sistem-sosial-dan-keamanan-pengguna)
12. [Personalisasi dan Sistem Tema](#12-personalisasi-dan-sistem-tema)
13. [Design System dan UI Guidelines](#13-design-system-dan-ui-guidelines)
14. [Asset dan Art Direction](#14-asset-dan-art-direction)
15. [Struktur Konten Pembelajaran](#15-struktur-konten-pembelajaran)
16. [Kebutuhan Data dan Entitas Utama](#16-kebutuhan-data-dan-entitas-utama)
17. [Kebutuhan Admin dan Pengelolaan Konten](#17-kebutuhan-admin-dan-pengelolaan-konten)
18. [Kebutuhan Non-Fungsional](#18-kebutuhan-non-fungsional)
19. [Metrik Keberhasilan Produk](#19-metrik-keberhasilan-produk)
20. [Roadmap Pengembangan](#20-roadmap-pengembangan)
21. [Kriteria Penerimaan](#21-kriteria-penerimaan)
22. [Panduan untuk AI Coding Agent](#22-panduan-untuk-ai-coding-agent)
23. [Lampiran: Contoh Konten dan Microcopy](#23-lampiran-contoh-konten-dan-microcopy)

---

# 1. Ringkasan Produk

## 1.1 Apa itu Nalarin?

**Nalarin** adalah platform pembelajaran digital yang menggabungkan eksplorasi pengetahuan, pembelajaran interaktif, gamifikasi, personalisasi, dan interaksi sosial dalam satu pengalaman web.

Nalarin dirancang untuk siapa saja yang ingin mempelajari hal baru, memperluas wawasan, melatih cara berpikir, atau mengembangkan keterampilan. Pengguna tidak harus berasal dari jurusan, jenjang pendidikan, maupun bidang pekerjaan tertentu.

Nalarin tidak hanya berfungsi sebagai tempat membaca materi. Platform ini mengajak pengguna untuk:

- menemukan topik dan bidang pengetahuan yang menarik;
- mempelajari materi melalui konten yang terstruktur dan interaktif;
- mencoba kuis, teka-teki, simulasi, dan permainan edukatif;
- melihat perkembangan pembelajaran secara visual;
- membangun kebiasaan belajar yang konsisten tanpa tekanan berlebihan;
- belajar dan menyelesaikan tantangan bersama teman;
- menyesuaikan tampilan aplikasi sesuai preferensi pribadi.

## 1.2 Positioning

Nalarin diposisikan sebagai:

> **A personal knowledge universe where everyone can discover, learn, play, and grow together.**

Dalam bahasa Indonesia: ruang belajar digital yang memungkinkan setiap orang menjelajahi pengetahuan, mengembangkan kemampuan, bermain sambil belajar, dan bertumbuh bersama komunitas.

## 1.3 Konsep Utama

Nalarin dibangun di atas lima pilar:

| Pilar | Makna | Contoh penerapan |
|---|---|---|
| **Discover** | Menemukan pengetahuan baru | Explore, Knowledge Universe, Curiosity Box |
| **Learn** | Memahami materi secara terarah | Learning Page, modul, kuis, catatan |
| **Play** | Belajar melalui tantangan | Brain Games, Mystery Case, Daily Quest |
| **Connect** | Belajar bersama orang lain | Friends, Chat, Study Room, Knowledge Duel |
| **Grow** | Melihat dan mengembangkan kemajuan | Journey, XP, Streak, Skill Passport, Wrapped |

## 1.4 Prinsip Produk

1. **Universal:** topik dan pengalaman belajar tidak dibatasi satu jurusan atau kelompok pengguna.
2. **Curiosity-driven:** pengguna didorong untuk mengeksplorasi hal yang menarik bagi mereka.
3. **Learning-first:** gamifikasi harus mendukung pemahaman, bukan menggantikan kualitas materi.
4. **Personal:** pengguna dapat mengatur minat, target, tema warna, dan tampilan.
5. **Social by choice:** fitur sosial tersedia, tetapi pengguna tetap dapat belajar secara mandiri.
6. **Progressive:** perkembangan ditampilkan dengan jelas, jujur, dan berdasarkan aktivitas nyata.
7. **Accessible and safe:** aplikasi harus mudah digunakan, menjaga privasi, dan menyediakan kontrol keamanan.

---

# 2. Latar Belakang dan Permasalahan

## 2.1 Latar Belakang

Banyak pengalaman belajar digital masih berpusat pada penyampaian materi, seperti membaca teks, melihat video, atau mengerjakan latihan. Pola tersebut bermanfaat, tetapi belum tentu sesuai untuk semua pengguna. Sebagian orang membutuhkan visualisasi, tantangan, praktik, interaksi, atau motivasi tambahan agar tetap tertarik belajar.

Selain itu, kebutuhan belajar setiap orang berbeda. Ada pengguna yang ingin memperluas pengetahuan umum, ada yang ingin memahami teknologi, ada yang ingin melatih logika, dan ada pula yang hanya ingin menjawab rasa ingin tahu terhadap suatu hal.

Nalarin hadir sebagai gagasan platform yang menggabungkan berbagai cara belajar dalam satu tempat tanpa membatasi pengguna pada satu jalur pendidikan.

## 2.2 Permasalahan yang Ingin Dijawab

- Pengalaman belajar digital dapat terasa monoton ketika hanya berisi materi pasif.
- Pengguna sering kesulitan menemukan topik baru di luar bidang yang sudah dikenal.
- Perkembangan belajar tidak selalu ditampilkan secara mudah dipahami.
- Kebiasaan belajar sulit dipertahankan tanpa target yang jelas dan realistis.
- Aktivitas belajar bersama teman sering tersebar di aplikasi yang berbeda.
- Tampilan aplikasi edukasi belum tentu sesuai dengan selera semua pengguna.

## 2.3 Solusi Nalarin

Nalarin menawarkan ruang belajar yang menggabungkan eksplorasi topik, materi terstruktur, permainan edukatif, tantangan, progress tracking, komunitas, dan personalisasi tampilan.

Nalarin tidak menjanjikan bahwa semua pengguna akan belajar dengan cara yang sama. Sebaliknya, platform ini menyediakan beberapa jalur agar pengguna dapat memilih pengalaman yang sesuai dengan kebutuhan masing-masing.

---

# 3. Visi, Misi, dan Tujuan

## 3.1 Visi

Menjadi ruang pembelajaran digital yang mendorong setiap orang untuk terus ingin tahu, mengeksplorasi pengetahuan, dan mengembangkan diri sepanjang hayat.

## 3.2 Misi

1. Menyediakan akses ke berbagai bidang pengetahuan dalam satu platform.
2. Menghadirkan pengalaman belajar yang interaktif dan mudah dieksplorasi.
3. Menggunakan gamifikasi secara sehat untuk mendukung konsistensi belajar.
4. Membuka ruang kolaborasi dan interaksi sosial yang positif.
5. Memberikan pengalaman aplikasi yang personal dan inklusif.

## 3.3 Tujuan Produk

- Membantu pengguna menemukan topik yang relevan dengan minatnya.
- Membantu pengguna memahami materi melalui kombinasi teks, visual, latihan, dan permainan.
- Menyediakan gambaran perkembangan belajar dari waktu ke waktu.
- Mendorong kebiasaan belajar yang realistis dan tidak menghukum pengguna.
- Menghubungkan pengguna melalui aktivitas belajar bersama.
- Memberikan kontrol kepada pengguna terhadap tampilan dan privasi akun.

---

# 4. Target Pengguna dan Persona

## 4.1 Target Pengguna

Nalarin ditujukan untuk **general audience**. Pengguna potensial dapat mencakup:

- pelajar yang ingin memperluas pengetahuan;
- mahasiswa yang ingin mengeksplorasi bidang di luar program studinya;
- pekerja yang ingin mempelajari keterampilan atau wawasan baru;
- pendidik yang mencari materi atau aktivitas interaktif;
- masyarakat umum yang memiliki rasa ingin tahu dan ingin terus belajar.

Target ini tidak berarti semua konten harus cocok untuk setiap kelompok. Materi dapat memiliki label tingkat kesulitan, kebutuhan awal, dan konteks penggunaan.

## 4.2 Persona Contoh

### Persona A — The Curious Explorer

- Suka mencari fakta dan topik baru.
- Belum memiliki target belajar yang spesifik.
- Membutuhkan rekomendasi dan konten singkat yang menarik.
- Fitur relevan: Explore, Curiosity Box, Daily Discovery.

### Persona B — The Goal-Oriented Learner

- Memiliki tujuan mempelajari bidang tertentu.
- Ingin mengetahui progress dan materi yang harus diselesaikan.
- Membutuhkan struktur dan target.
- Fitur relevan: Learning Journey, Topic Detail, Learning Page, Skill Passport.

### Persona C — The Social Learner

- Lebih menikmati aktivitas ketika dilakukan bersama teman.
- Menyukai tantangan dan diskusi.
- Fitur relevan: Friends, Study Room, Buddy Mission, Knowledge Duel.

### Persona D — The Casual Learner

- Ingin belajar dalam waktu singkat dan fleksibel.
- Tidak ingin merasa tertinggal ketika tidak membuka aplikasi.
- Fitur relevan: Daily Goal fleksibel, Curiosity Box, mini games, Learning Wrapped.

---

# 5. Nilai Utama dan Pembeda Produk

## 5.1 Knowledge Universe

Pengetahuan ditampilkan sebagai dunia atau ruang eksplorasi, bukan hanya daftar kategori. Setiap dunia memiliki identitas visual, subkategori, topik, dan aktivitas belajar.

## 5.2 Personalization Studio

Pengguna dapat memilih mode terang/gelap, warna aksen, palet tema, dan beberapa preferensi tampilan. Tema yang dipilih diterapkan secara konsisten ke seluruh aplikasi.

## 5.3 Companion

Pengguna memiliki karakter pendamping yang dapat dikustomisasi. Companion menjadi bagian dari pengalaman visual dan motivasi, bukan pengganti materi belajar.

## 5.4 Learning + Social

Pengguna dapat belajar sendiri atau mengajak teman menyelesaikan tantangan, mengikuti kuis, dan berdiskusi dalam ruang belajar.

## 5.5 Skill Passport

Progress tidak hanya berisi jumlah materi atau XP. Pengguna juga dapat melihat kategori kemampuan yang sudah sering dilatih berdasarkan aktivitas yang benar-benar dilakukan.

---

# 6. Ruang Lingkup Produk

## 6.1 Bentuk Produk

Nalarin adalah **web application** dengan halaman publik dan area aplikasi setelah login.

- **Public website:** landing page, informasi produk, dan autentikasi.
- **Authenticated application:** dashboard dan seluruh fitur pembelajaran.
- **Admin/content management:** area internal untuk mengelola konten dan moderasi.

## 6.2 Prioritas Fitur

| Prioritas | Makna |
|---|---|
| P0 — MVP | Harus tersedia untuk versi awal yang dapat digunakan |
| P1 — Next | Penting, tetapi dapat masuk setelah alur inti stabil |
| P2 — Later | Pengembangan lanjutan atau fitur pembeda tambahan |

## 6.3 Ringkasan Ruang Lingkup

| Modul | Fitur | Prioritas |
|---|---|---|
| Public | Landing, login, register, forgot password | P0 |
| Onboarding | Minat, tujuan, target harian, tema | P0 |
| Learning | Explore, universe, topic, materi, kuis | P0 |
| Dashboard | Continue learning, rekomendasi, aktivitas | P0 |
| Progress | Journey dan progress materi | P0 |
| Personalization | Light/dark, accent presets, custom color | P0 |
| Gamification | XP, level, streak, daily quest | P1 |
| Games | Brain Rush, Logic Escape, Mystery Case | P1 |
| Achievement | Badge dan koleksi | P1 |
| Companion | Pilih dan kustomisasi karakter | P1 |
| Social | Friends, chat, group study | P1/P2 |
| Competition | Knowledge Duel, leaderboard | P2 |
| Insights | Skill Passport, Learning Wrapped | P1/P2 |
| Discovery | Curiosity Box, Knowledge Connection | P1/P2 |
| Admin | CMS materi, kategori, kuis, user reports | P0 untuk operasional konten |

## 6.4 Di Luar Cakupan Versi Awal

Fitur berikut tidak wajib dibangun pada MVP:

- video call langsung;
- live streaming kelas;
- marketplace kursus berbayar;
- sistem pembayaran dan langganan;
- sertifikasi formal;
- tutor privat;
- rekomendasi berbasis AI yang kompleks;
- editor game tanpa batas;
- aplikasi native iOS/Android terpisah.

Fitur tersebut dapat dipertimbangkan setelah kebutuhan dan kapasitas produk lebih jelas.

---

# 7. Struktur Navigasi dan Peta Halaman

## 7.1 Public Website

| Route konseptual | Halaman | Akses |
|---|---|---|
| `/` | Landing Page | Publik |
| `/jelajahi` | Preview Explore | Publik terbatas |
| `/fitur` | Feature Overview | Publik |
| `/tentang` | About Nalarin | Publik |
| `/masuk` | Login | Publik |
| `/daftar` | Register | Publik |
| `/lupa-password` | Forgot Password | Publik |
| `/verifikasi-email` | Email Verification | Pengguna terdaftar |
| `/privasi` | Privacy Policy | Publik |
| `/ketentuan` | Terms of Service | Publik |

## 7.2 Main Application

| Route konseptual | Halaman | Prioritas |
|---|---|---|
| `/app` | Home Dashboard | P0 |
| `/app/explore` | Explore | P0 |
| `/app/universe/:slug` | Universe Detail | P0 |
| `/app/topic/:slug` | Topic Detail | P0 |
| `/app/learn/:lessonId` | Learning Page | P0 |
| `/app/quiz/:quizId` | Quiz Page | P0 |
| `/app/quiz/:quizId/result` | Quiz Result | P0 |
| `/app/journey` | Learning Journey | P0 |
| `/app/games` | Games Center | P1 |
| `/app/games/:slug` | Game Detail/Play | P1 |
| `/app/quest` | Quest Center | P1 |
| `/app/quest/:id` | Quest Detail | P1 |
| `/app/streak` | Streak | P1 |
| `/app/achievements` | Achievement | P1 |
| `/app/rewards` | Rewards & Inventory | P1 |
| `/app/friends` | Friends | P1 |
| `/app/friends/:username` | Friend Profile | P1 |
| `/app/messages` | Chat List | P1 |
| `/app/messages/:conversationId` | Private/Group Chat | P1/P2 |
| `/app/study-rooms` | Group Study | P2 |
| `/app/duel` | Knowledge Duel | P2 |
| `/app/leaderboard` | Leaderboard | P2 |
| `/app/companion` | My Companion | P1 |
| `/app/skill-passport` | Skill Passport | P1 |
| `/app/profile` | Profile | P0 |
| `/app/personalization` | Personalization Studio | P0 |
| `/app/settings` | Settings | P0 |
| `/app/notifications` | Notification Center | P1 |
| `/app/search` | Search Results | P0 |
| `/app/curiosity` | Curiosity Box | P1 |
| `/app/wrapped` | Learning Wrapped | P2 |
| `/app/help` | Help & Support | P1 |

## 7.3 Main Navigation

### Desktop

Gunakan sidebar di sisi kiri dan top header di bagian atas.

**Sidebar utama:**
- Home
- Explore
- Journey
- Games
- Quest
- Friends

**Sidebar bagian bawah:**
- Companion
- Profile
- Settings

**Header:**
- Search
- Streak indicator
- XP indicator
- Notifications
- User avatar / profile menu

### Mobile

Gunakan bottom navigation dengan lima menu utama:
- Home
- Explore
- Journey
- Games
- Friends

Menu tambahan seperti Quest, Companion, Profile, dan Settings dapat diakses melalui halaman Profile atau menu tambahan. Pastikan navigasi tidak terlalu padat.

---

# 8. Alur Pengguna

## 8.1 Alur Pengguna Baru

1. Pengguna membuka Landing Page.
2. Pengguna memilih Mulai Belajar.
3. Pengguna membuat akun atau masuk dengan metode yang tersedia.
4. Pengguna menyelesaikan verifikasi email jika diwajibkan.
5. Pengguna menjalani onboarding.
6. Pengguna memilih minat, tujuan, target harian, companion, dan tema.
7. Preferensi disimpan.
8. Pengguna diarahkan ke Home Dashboard.
9. Dashboard menampilkan rekomendasi berdasarkan minat awal.

## 8.2 Alur Belajar

1. Pengguna membuka Explore.
2. Pengguna memilih Universe.
3. Pengguna memilih Topic.
4. Pengguna melihat detail dan learning objectives.
5. Pengguna memulai materi.
6. Progress materi diperbarui.
7. Pengguna menyelesaikan kuis atau aktivitas.
8. Hasil dan feedback ditampilkan.
9. Progress, XP, dan achievement diperbarui sesuai aturan.
10. Pengguna dapat melanjutkan materi berikutnya atau kembali ke Journey.

## 8.3 Alur Challenge Bersama Teman

1. Pengguna membuka Friends atau Knowledge Duel.
2. Pengguna memilih teman yang sudah terhubung.
3. Pengguna memilih kategori dan tingkat kesulitan.
4. Undangan dikirim.
5. Teman menerima atau menolak undangan.
6. Jika diterima, sesi dimulai.
7. Hasil disimpan dan ditampilkan kepada kedua pemain.
8. Reward diberikan sesuai aturan yang berlaku.

## 8.4 Alur Personalisasi

1. Pengguna membuka Personalization Studio.
2. Pengguna memilih mode tampilan.
3. Pengguna memilih preset warna atau custom color.
4. Live preview diperbarui.
5. Pengguna menekan Apply.
6. Preferensi disimpan ke akun.
7. Tema diterapkan ke seluruh halaman aplikasi.

---

# 9. Spesifikasi Fitur

# 9.1 Landing Page

## Tujuan

Memperkenalkan Nalarin, menjelaskan manfaat utama, dan mengarahkan pengunjung untuk mencoba platform.

## Struktur

1. **Navbar:** logo, Beranda, Jelajahi, Fitur, Tentang, Masuk, Mulai Belajar.
2. **Hero:** headline “Your Curiosity Deserves a Universe.”, deskripsi, CTA, dan ilustrasi Knowledge Universe.
3. **Learning Experience:** Discover, Challenge, Connect.
4. **Knowledge Universe Preview:** beberapa dunia pengetahuan.
5. **Personalization Preview:** contoh pilihan tema dan warna.
6. **Games Preview:** cuplikan mini games.
7. **Social Learning:** teman, grup, dan challenge.
8. **Final CTA:** “Every Great Discovery Starts with Curiosity.”
9. **Footer:** navigasi, tentang, bantuan, legal, dan kontak.

## Interaksi

- CTA mengarah ke registrasi atau halaman terkait.
- Navigasi scroll ke section yang sesuai.
- Kartu universe membuka preview.
- Navbar tetap dapat diakses ketika halaman di-scroll.
- Mobile menggunakan menu navigasi yang ringkas.

# 9.2 Authentication

## Login

Field:
- Email atau username.
- Password.
- Remember me.
- Forgot password.

Aksi:
- Masuk.
- Masuk dengan Google jika integrasi tersedia.
- Pindah ke Register.

## Register

Field:
- Nama lengkap.
- Username.
- Email.
- Password.
- Konfirmasi password.
- Persetujuan ketentuan.

Validasi:
- Format email.
- Username unik.
- Password sesuai aturan keamanan.
- Konfirmasi password cocok.
- Persetujuan ketentuan harus diberikan.

## Forgot Password

- Input email.
- Tampilkan konfirmasi pengiriman instruksi.
- Jangan mengungkap apakah email terdaftar atau tidak melalui pesan yang dapat dimanfaatkan untuk enumerasi akun.

# 9.3 Onboarding

Onboarding terdiri dari beberapa langkah dengan progress indicator.

### Step 1 — Welcome

- Sambutan.
- Deskripsi singkat Nalarin.
- Tombol mulai.

### Step 2 — Choose Interests

Pilihan awal:
- Science
- Technology
- Psychology
- Finance
- History
- Creativity
- Language
- Logic
- General Knowledge

Pengguna dapat memilih lebih dari satu minat dan dapat mengubahnya nanti.

### Step 3 — Learning Goals

Contoh tujuan:
- Memperluas pengetahuan umum.
- Mengembangkan kemampuan berpikir.
- Mempelajari keterampilan baru.
- Mendukung kebutuhan akademik atau pekerjaan.
- Mengeksplorasi hal baru.

### Step 4 — Daily Goal

Pilihan awal:
- 5 menit.
- 10 menit.
- 20 menit.
- 30 menit.

Target dapat diubah kapan saja dan tidak digunakan untuk menghukum pengguna.

### Step 5 — Choose Companion

- Pilih karakter awal.
- Preview karakter.
- Lihat nama dan deskripsi singkat.
- Pilihan dapat diubah setelah onboarding.

### Step 6 — Choose Theme

- Pilih preset warna.
- Pilih Light, Dark, atau System.
- Preview tema.
- Tema dapat diubah setelah onboarding.

### Step 7 — Summary

Menampilkan pilihan pengguna sebelum masuk ke Home Dashboard.

# 9.4 Home Dashboard

## Tujuan

Menjadi pusat aktivitas dan pintu masuk ke seluruh pengalaman Nalarin.

## Komponen

### Header
- Sapaan berdasarkan waktu atau preferensi.
- Search bar.
- Notifications.
- Avatar.

### Daily Statistics
- Current streak.
- Total XP.
- Current level.

### Continue Learning
- Materi terakhir.
- Progress.
- Tombol Continue.

### Daily Quest
- Misi harian.
- Progress penyelesaian.
- Reward.

### My Companion
- Karakter.
- Pesan singkat yang tidak mengganggu.
- Shortcut ke Companion page.

### Weekly Learning Activity
- Grafik aktivitas mingguan.
- Tampilkan data aktual, bukan data contoh permanen.

### Knowledge Discovery
- Satu topik atau pertanyaan menarik.
- CTA untuk membaca atau mencoba kuis.

### Recommended for You
- Materi berdasarkan minat dan aktivitas.

### Friends Activity
- Aktivitas teman yang diizinkan untuk ditampilkan.
- Sediakan pengaturan privasi.

# 9.5 Explore

## Tujuan

Membantu pengguna menemukan pengetahuan baru.

## Komponen
- Search bar.
- Featured Universe.
- Browse by Category.
- Popular Topics.
- Recommended for You.
- New Discoveries.
- Filter.

## Filter yang disarankan
- Kategori.
- Tingkat kesulitan.
- Estimasi durasi.
- Format konten.
- Status: belum dimulai, sedang berjalan, selesai.

# 9.6 Knowledge Universe

Universe adalah pengelompokan visual untuk kategori pengetahuan.

## Universe Awal

| Universe | Deskripsi | Contoh subtopik |
|---|---|---|
| Science Lab | Sains dan fenomena alam | Human Body, Space, Physics, Chemistry |
| Digital World | Teknologi dan dunia digital | Internet, AI, Cyber Safety, Computing |
| Mind Space | Psikologi dan perilaku | Memory, Emotion, Habits, Communication |
| Financial District | Finansial dan ekonomi | Budgeting, Saving, Economy, Business Basics |
| History Vault | Sejarah dan peradaban | Ancient Civilizations, World History, Local History |
| Creative Studio | Seni dan kreativitas | Design, Music, Storytelling, Creative Thinking |
| Language Sphere | Bahasa dan komunikasi | Vocabulary, Grammar, Writing, Public Speaking |
| Logic Arena | Logika dan pemecahan masalah | Reasoning, Patterns, Puzzles, Problem Solving |

## Universe Detail Page

- Hero illustration.
- Judul dan deskripsi.
- Progress pengguna pada universe.
- Jumlah topic, lesson, atau game yang tersedia.
- Subkategori.
- Daftar topik.
- Rekomendasi aktivitas.

Universe dapat memiliki tema visual yang berbeda, tetapi harus mengikuti art direction Nalarin.

# 9.7 Topic Detail

Menampilkan informasi sebelum pengguna memulai pembelajaran.

Komponen:
- Cover.
- Judul.
- Deskripsi.
- Kategori.
- Level kesulitan.
- Estimasi durasi.
- Learning objectives.
- Daftar modul.
- Progress jika sudah pernah dimulai.
- Bookmark.
- Tombol Start Learning atau Continue.

# 9.8 Learning Page

## Layout Desktop

- Sidebar modul di sebelah kiri.
- Area konten utama di tengah.
- Panel kanan opsional untuk catatan atau progress.

## Jenis Materi

- Teks.
- Gambar dan infografis.
- Video.
- Audio.
- Kartu interaktif.
- Simulasi sederhana.
- Pertanyaan reflektif.

## Fitur

- Previous / Next.
- Bookmark.
- Catatan pribadi.
- Progress reading.
- Mark as completed.
- Pengaturan ukuran teks.

Konten harus mudah dibaca dan tidak memaksa pengguna membuka modal berulang kali.

# 9.9 Quiz

Tipe pertanyaan:
- Multiple choice.
- True / False.
- Matching.
- Fill in the blank.
- Image selection.
- Ordering.

Komponen:
- Nomor soal.
- Progress.
- Pertanyaan.
- Pilihan jawaban.
- Tombol konfirmasi.
- Feedback.
- Penjelasan.

Quiz sebaiknya memberikan penjelasan mengapa jawaban benar atau salah, bukan hanya menampilkan skor.

# 9.10 Quiz Result

Tampilkan:
- Skor.
- Jawaban benar dan salah.
- Penjelasan.
- XP yang diperoleh jika memenuhi aturan reward.
- Materi yang disarankan untuk diulang.
- Retry.
- Continue Learning.

# 9.11 Learning Journey

Learning Journey adalah visualisasi perjalanan belajar pengguna.

Komponen:
- Roadmap.
- Checkpoint.
- Completed node.
- Current node.
- Locked node jika ada prasyarat.
- Milestone.
- Overall progress.

Jangan membuat jalur terlalu kaku. Pengguna tetap dapat mengeksplorasi topik lain tanpa harus menyelesaikan seluruh jalur sebelumnya.

# 9.12 Games Center

## Daftar Game Awal

| Game | Konsep | Kemampuan yang dilatih |
|---|---|---|
| Brain Rush | Pertanyaan singkat dengan tempo cepat | Recall dan pengetahuan umum |
| Logic Escape | Puzzle berjenjang | Penalaran dan pemecahan masalah |
| Word Quest | Tebak atau susun kata | Kosakata dan bahasa |
| Mystery Case | Mengumpulkan petunjuk dan menyelesaikan kasus | Analisis dan interpretasi |
| Memory Grid | Mengingat susunan objek | Memori dan perhatian |
| Fact or Fiction | Membedakan fakta dan klaim keliru | Literasi informasi |
| Decision Room | Memilih solusi dari situasi tertentu | Pengambilan keputusan |

## Games Center

- Kategori game.
- Thumbnail.
- Deskripsi.
- Difficulty.
- Best score.
- Tombol Play.

## Game Detail

- Ilustrasi.
- Instruksi.
- Rules.
- Difficulty.
- Reward.
- Tombol mulai.

## Game Play

- Area permainan.
- Progress.
- Score.
- Timer hanya jika diperlukan.
- Exit confirmation.

## Game Result

- Skor akhir.
- Ringkasan performa.
- Penjelasan bila relevan.
- XP.
- Retry.
- Share result.

Setiap game harus benar-benar dapat dimainkan. Jangan membuat kartu game yang terlihat aktif tetapi tidak memiliki mekanisme permainan.

# 9.13 Quest Center

Kategori:
- Daily Quest.
- Weekly Quest.
- Special Quest.
- Real-Life Mission.

Setiap quest memiliki:
- Judul.
- Deskripsi.
- Syarat penyelesaian.
- Progress.
- Reward.
- Waktu berlaku jika terbatas.
- Status.

Real-Life Mission harus aman, sesuai usia pengguna, tidak meminta tindakan berisiko, dan dapat diselesaikan secara wajar.

# 9.14 Streak System

Halaman Streak menampilkan:
- Current streak.
- Longest streak.
- Total active days.
- Kalender bulanan.
- Milestone.
- Streak protection jika fitur tersebut diaktifkan.

Streak hanya bertambah ketika pengguna menyelesaikan aktivitas yang memenuhi aturan belajar harian. Aturan reset harus jelas dan menggunakan zona waktu pengguna.

Jangan membuat notifikasi yang menimbulkan rasa bersalah atau memaksa pengguna terus membuka aplikasi. Kualitas belajar lebih penting daripada mempertahankan angka streak.

# 9.15 XP, Level, dan Achievement

## XP

XP merupakan poin pengalaman untuk aktivitas belajar yang valid.

Contoh reward awal (dapat disesuaikan):

| Aktivitas | Contoh XP |
|---|---:|
| Menyelesaikan lesson | 20 XP |
| Menyelesaikan quiz | 30 XP |
| Menyelesaikan daily quest | 50 XP |
| Menyelesaikan mini game | 10–40 XP sesuai desain |
| Membantu aktivitas belajar teman | 10–15 XP jika kriterianya dapat diverifikasi |

Nilai XP harus dikelola melalui konfigurasi agar mudah diseimbangkan.

## Level

- Total XP menentukan level.
- Rumus atau tabel level harus ditentukan dan konsisten.
- Level tidak boleh naik hanya karena tindakan berulang yang tidak memberikan nilai belajar.

## Achievement

Kategori:
- Learning.
- Consistency.
- Exploration.
- Social.
- Games.
- Special.

Setiap badge memiliki nama, deskripsi, ikon, kriteria unlock, dan status.

# 9.16 Rewards & Inventory

Item yang mungkin tersedia:
- Companion accessories.
- Avatar decorations.
- Profile frames.
- Profile backgrounds.
- Collectible items.
- Theme decorations.

Reward diperoleh melalui pencapaian yang jelas. Pengguna harus dapat melihat syarat perolehan item.

# 9.17 Friends

Fitur:
- Search friends.
- Add by username atau friend code.
- Friend requests.
- Accept / decline.
- Remove friend.
- Suggested friends berdasarkan mekanisme yang aman.
- Learning buddies.

Friend card dapat menampilkan avatar, username, level, dan informasi publik yang dipilih pengguna.

# 9.18 Friend Profile

- Avatar.
- Display name.
- Username.
- Bio.
- Level.
- Achievement publik.
- Statistik belajar yang dipublikasikan.
- Tombol Chat.
- Tombol Challenge.

Jangan menampilkan data privat secara otomatis.

# 9.19 Chat List dan Private Chat

## Chat List

- Search chat.
- Daftar percakapan.
- Pesan terakhir.
- Timestamp.
- Unread indicator.
- Private dan group conversation.

## Private Chat

- Header profil.
- Message bubbles.
- Waktu pesan.
- Message composer.
- Emoji.
- Share learning content.
- Challenge invitation.
- Block dan report.

Fitur chat harus memiliki aturan akses dan moderasi. Untuk versi awal, percakapan hanya dapat dimulai oleh pengguna yang sudah terhubung sebagai teman atau melalui mekanisme izin yang disetujui.

# 9.20 Group Study / Study Room

- Buat atau bergabung ke grup.
- Nama dan deskripsi grup.
- Daftar anggota.
- Tujuan belajar.
- Materi bersama.
- Progress kelompok.
- Chat grup.

Versi awal cukup menyediakan ruang kolaborasi teks dan materi bersama. Video call bukan kebutuhan MVP.

# 9.21 Knowledge Duel

- Pilih teman.
- Pilih kategori.
- Pilih tingkat kesulitan.
- Undang teman.
- Tampilkan versus screen.
- Kerjakan pertanyaan yang setara.
- Tampilkan hasil dan skor.
- Rematch.

Sistem perlu mencegah reward ganda atau penyalahgunaan sesi.

# 9.22 Leaderboard

Tab:
- Friends.
- Weekly.
- Monthly.
- All Time.

Tampilkan ranking, avatar, username, level, dan XP. Sediakan opsi menyembunyikan diri dari leaderboard jika diperlukan.

# 9.23 My Companion

Companion adalah karakter virtual pendamping pengguna.

Fitur:
- Pilih karakter.
- Ganti nama jika diperbolehkan.
- Pilih ekspresi atau pose.
- Kustomisasi aksesori.
- Background.
- Koleksi item.
- Level atau milestone companion.

Companion tidak boleh membuat pengguna merasa bertanggung jawab atas kondisi karakter ketika tidak menggunakan aplikasi. Tidak ada hukuman emosional atau pesan yang memanipulasi pengguna.

# 9.24 Skill Passport

Menampilkan gambaran kategori kemampuan berdasarkan aktivitas yang telah dilakukan.

Kategori contoh:
- Critical Thinking.
- Problem Solving.
- Creativity.
- Digital Literacy.
- Communication.
- General Knowledge.

Visualisasi:
- Radar chart.
- Progress bar.
- Learning statistics.
- Activity history.
- Growth areas.

Jangan mengklaim kemampuan seseorang telah dikuasai hanya dari satu kuis. Gunakan label seperti “aktivitas yang telah dilatih” atau “perkembangan berdasarkan aktivitas” dan jelaskan dasar perhitungannya.

# 9.25 Profile

- Avatar.
- Nama.
- Username.
- Bio.
- Level.
- XP.
- Streak.
- Achievement pilihan.
- Statistik publik.
- Edit Profile.

Pengguna dapat memilih bagian yang ditampilkan secara publik.

# 9.26 Personalization Studio

Detail lengkap pada [Sistem Tema](#12-personalisasi-dan-sistem-tema).

# 9.27 Settings

Bagian:
- Account.
- Appearance.
- Notifications.
- Privacy.
- Security.
- Accessibility.
- Connected services jika kelak tersedia.

# 9.28 Notification Center

Kategori:
- All.
- Learning.
- Social.
- Achievement.
- System.

Fitur:
- Read/unread.
- Mark all as read.
- Notification preferences.
- Deep link menuju aktivitas yang relevan.

# 9.29 Search Results

Kategori hasil:
- All.
- Topics.
- Games.
- Quests.
- Users.

Sediakan empty state, filter, sorting, dan riwayat pencarian yang dapat dihapus.

# 9.30 Curiosity Box

- Question of the day.
- Fakta atau pengetahuan singkat.
- Ilustrasi.
- Penjelasan.
- Related topics.
- Mini quiz.
- Save to collection.

Konten harus memiliki sumber atau proses editorial yang memadai. Informasi faktual tidak boleh disajikan sebagai kepastian jika belum diverifikasi.

# 9.31 Learning Wrapped

Rangkuman mingguan, bulanan, atau tahunan yang menampilkan:
- Total waktu belajar.
- Topik selesai.
- Kategori favorit.
- Game dimainkan.
- Achievement.
- Streak recap.
- Perkembangan aktivitas.

Hanya tampilkan metrik yang benar-benar dihitung dari data pengguna.

# 9.32 Help & Support

- FAQ.
- Panduan penggunaan.
- Form bantuan.
- Report a problem.
- Status pengiriman laporan.

# 9.33 About Nalarin

- Penjelasan produk.
- Visi dan misi.
- Nilai produk.
- Tim/pengelola jika tersedia.
- Kontak.
- Privacy Policy.
- Terms of Service.

---

# 10. Aturan Gamifikasi

Bagian ini perlu dibuat secara konsisten agar XP, streak, level, dan quest tidak saling bertentangan.

## 10.1 Prinsip Gamifikasi

- Reward harus berhubungan dengan aktivitas yang bernilai.
- Pengguna diberi apresiasi, bukan tekanan.
- Tidak semua aktivitas harus menghasilkan XP.
- Tidak menggunakan sistem yang mendorong penggunaan berlebihan.
- Progress harus berdasarkan data aktual.

## 10.2 Aktivitas yang Dapat Dihitung sebagai Belajar Harian

Contoh aktivitas yang memenuhi syarat streak:
- Menyelesaikan satu lesson yang memenuhi batas minimum.
- Menyelesaikan satu quiz yang valid.
- Menyelesaikan satu learning challenge.
- Menyelesaikan satu aktivitas pembelajaran terstruktur.

Membuka aplikasi, mengirim chat, atau melihat halaman dashboard saja tidak cukup untuk menambah streak.

## 10.3 Perhitungan Streak

- Gunakan tanggal lokal dan zona waktu pengguna.
- Tentukan satu definisi “hari aktif” yang konsisten.
- Aktivitas harus tersimpan di server agar tidak mudah dimanipulasi dari browser.
- Hindari menghitung satu aktivitas yang sama berulang kali sebagai beberapa hari.
- Sediakan penjelasan aturan streak di UI.
- Jika Streak Freeze tersedia, jelaskan batas dan cara penggunaannya.

## 10.4 Daily Goal

Target harian merupakan panduan fleksibel. Pengguna dapat mengubah targetnya melalui Settings atau onboarding ulang yang terkontrol.

Progress daily goal dihitung berdasarkan aktivitas belajar yang memenuhi kriteria, bukan sekadar durasi aplikasi terbuka.

## 10.5 Level

Tentukan tabel ambang XP yang konsisten. Contoh struktur awal:

| Level | Total XP kumulatif (contoh) |
|---|---:|
| 1 | 0 |
| 2 | 100 |
| 3 | 250 |
| 4 | 450 |
| 5 | 700 |
| 6 | 1.000 |

Angka ini adalah contoh awal dan harus diuji serta diseimbangkan. Simpan aturan level di konfigurasi, bukan tersebar di berbagai komponen UI.

## 10.6 Pencegahan Penyalahgunaan Reward

- Reward lesson diberikan satu kali untuk penyelesaian yang valid, kecuali aturan replay menetapkan hal lain.
- Attempt quiz disimpan.
- Reward game memiliki batas atau aturan yang jelas.
- Aktivitas berulang tanpa nilai pembelajaran tidak terus menghasilkan XP.
- Perubahan skor atau reward harus divalidasi oleh server.

---

# 11. Sistem Sosial dan Keamanan Pengguna

Karena Nalarin ditujukan untuk pengguna umum dan berpotensi digunakan oleh pengguna di bawah umur, privasi dan keselamatan harus menjadi bagian desain sejak awal.

## 11.1 Default Privacy

- Profil tidak perlu membuka semua informasi secara publik.
- Aktivitas belajar dapat diatur terlihat atau tersembunyi.
- Pengguna dapat mengatur siapa yang dapat mengirim permintaan pertemanan.
- Status online bersifat opsional.
- Kontak pribadi seperti email tidak ditampilkan kepada pengguna lain.

## 11.2 Chat Safety

- Batasi pesan dari pengguna yang belum terhubung atau belum mendapat izin.
- Sediakan Block dan Report.
- Berikan cara keluar dari grup.
- Sediakan kontrol notifikasi.
- Jangan menampilkan alamat email atau informasi sensitif di profil.
- Terapkan moderasi untuk konten yang dilaporkan.

## 11.3 Moderasi

- Laporan pengguna disimpan dan dapat ditinjau admin.
- Sediakan kategori report yang jelas.
- Admin dapat memberi peringatan, membatasi fitur, atau meninjau akun sesuai kebijakan.
- Sediakan kebijakan komunitas yang mudah ditemukan.

## 11.4 Keamanan Akun

- Password disimpan dengan mekanisme hashing yang aman.
- Otorisasi dilakukan di server.
- Pengguna dapat logout dari perangkat.
- Tindakan sensitif memerlukan validasi ulang bila diperlukan.
- Pesan error tidak membocorkan informasi internal.

---

# 12. Personalisasi dan Sistem Tema

Personalisasi adalah salah satu karakteristik penting Nalarin. Pengguna harus merasa bahwa ruang belajar digital mereka dapat disesuaikan dengan preferensi sendiri.

## 12.1 Prinsip Tema

1. Tema default Nalarin menggunakan pastel purple/lavender.
2. Warna aksen dapat diganti pengguna.
3. Light Mode, Dark Mode, dan System Mode tersedia.
4. Custom color picker dapat digunakan untuk memilih accent color.
5. Perubahan warna harus diterapkan konsisten ke semua halaman.
6. Warna teks dan latar dasar tetap dikontrol oleh design system untuk menjaga keterbacaan.
7. Tema tersimpan di akun dan tetap berlaku saat pengguna login dari perangkat lain.
8. Sediakan tombol Reset to Default.

## 12.2 Default Theme — Nalarin Lavender

| Token | Hex |
|---|---|
| Primary | `#7563E8` |
| Primary Hover | `#6653D7` |
| Primary Dark | `#5546C5` |
| Primary Soft | `#EEEBFF` |
| Background | `#F8F7FC` |
| Surface | `#FFFFFF` |
| Text Primary | `#25233A` |
| Text Secondary | `#858398` |
| Border | `#EAE8F2` |
| Success | `#49B98B` |
| Warning | `#F2B65E` |
| Danger | `#EA777D` |

## 12.3 Preset Accent Palettes

Palet di bawah adalah pilihan awal. Nama dan nilai warna dapat disesuaikan setelah visual testing.

| Nama tema | Primary | Primary Soft | Nuansa |
|---|---|---|---|
| Ocean Blue | `#4779D8` | `#EAF1FF` | Fresh, tenang |
| Mint Green | `#339B79` | `#E7F6EF` | Natural, ringan |
| Lavender | `#7563E8` | `#EEEBFF` | Default Nalarin |
| Sunset Peach | `#D97B50` | `#FFF0E7` | Hangat, energik |
| Rose Pink | `#D45F93` | `#FCEAF2` | Soft, expressive |
| Midnight Purple | `#8E82E8` | `#302B4A` | Dark, elegant |

## 12.4 Theme Mode

### Light Mode

- Background terang.
- Surface putih.
- Teks gelap.
- Accent digunakan untuk tombol utama, active state, progress, dan highlight.

### Dark Mode

- Background gelap keunguan atau neutral dark.
- Surface sedikit lebih terang dari background.
- Teks terang.
- Accent disesuaikan agar tetap terbaca.
- Hindari menggunakan warna hitam pekat untuk seluruh area.

### System Mode

Mengikuti preferensi tampilan perangkat atau browser.

## 12.5 Custom Color Picker

Pengguna dapat memilih accent color sendiri.

Opsi:
- Color picker visual.
- Input HEX opsional.
- Preview tombol dan card.
- Reset color.
- Apply.

Validasi harus menjaga kontras teks dan elemen interaktif. Jika warna yang dipilih tidak memenuhi kontras minimum, sistem dapat memilih teks kontras otomatis atau memberikan rekomendasi warna.

## 12.6 Elemen yang Mengikuti Accent Color

- Primary buttons.
- Active navigation item.
- Selected cards.
- Progress bars.
- Links dan focus ring.
- Badge tertentu.
- Selected tabs.
- Toggle aktif.

## 12.7 Elemen yang Tidak Boleh Berubah Sembarangan

- Warna status success/warning/danger.
- Warna teks utama jika menyebabkan kontras buruk.
- Warna ilustrasi asset yang sudah dirancang khusus.
- Warna kategori yang memiliki makna semantik, kecuali melalui sistem token yang tervalidasi.

## 12.8 Background dan Interface Style

Pengembangan lanjutan dapat menyediakan:
- Minimal.
- Soft Gradient.
- Abstract Pattern.
- Illustration Background.

Sediakan Interface Density:
- Comfortable.
- Compact.

Fitur ini harus tetap menjaga keterbacaan dan tidak mengganggu fokus pembelajaran.

## 12.9 Live Preview

Personalization Studio menampilkan preview komponen seperti:
- Header.
- Sidebar.
- Primary button.
- Learning card.
- Progress bar.
- Selected tab.

Setiap perubahan terlihat langsung sebelum disimpan.

---

# 13. Design System dan UI Guidelines

## 13.1 Art Direction

Gaya visual Nalarin:

- Modern.
- Playful tetapi tidak kekanak-kanakan.
- Premium.
- Soft 3D illustration.
- Pastel dan clean.
- Exploratory/fantasy untuk elemen Knowledge Universe.
- Tetap mengutamakan keterbacaan dan kemudahan penggunaan.

Nalarin boleh mengambil referensi dari produk edukasi yang sudah ada, tetapi tidak boleh menyalin identitas, maskot, layout khas, atau aset milik produk lain. Nalarin harus memiliki bahasa visualnya sendiri.

## 13.2 Typography

Rekomendasi:
- **Plus Jakarta Sans** untuk identitas utama dan heading.
- **Inter** sebagai alternatif untuk UI yang lebih padat.

Skala tipografi awal:

| Style | Ukuran desktop | Penggunaan |
|---|---:|---|
| Display | 48–56 px | Hero landing |
| H1 | 36 px | Judul halaman utama |
| H2 | 28 px | Judul section |
| H3 | 22 px | Judul card/section kecil |
| H4 | 18 px | Subheading |
| Body | 15–16 px | Teks utama |
| Small | 13–14 px | Metadata |
| Caption | 12 px | Label tambahan |

Sesuaikan skala untuk mobile agar heading tidak memenuhi viewport.

## 13.3 Spacing

Gunakan sistem spacing berbasis kelipatan 4 atau 8 px.

Contoh:
- 4 px: jarak ikon kecil.
- 8 px: jarak elemen rapat.
- 12 px: jarak dalam komponen.
- 16 px: padding card standar.
- 24 px: jarak antar-card.
- 32 px: jarak antar-section kecil.
- 48–64 px: jarak section utama.

## 13.4 Border Radius

- Small control: 8 px.
- Input dan button: 10–12 px.
- Card: 14–20 px.
- Modal: 20 px.
- Pill: 999 px.

Gunakan radius yang konsisten. Jangan membuat setiap komponen memiliki radius berbeda tanpa alasan.

## 13.5 Elevation dan Shadow

- Default card: border halus, shadow sangat ringan.
- Hover card: sedikit peningkatan shadow atau pergeseran.
- Modal: shadow lebih kuat.
- Dropdown: shadow medium.

Hindari glow dan shadow berlebihan.

## 13.6 Layout Desktop

Rekomendasi artboard desain awal: 1440 × 1000 px.

- Sidebar: sekitar 232–248 px.
- Header: sekitar 64–72 px.
- Main content: max-width sekitar 1200–1240 px.
- Gunakan grid fleksibel.
- Pertahankan ruang kosong yang cukup.

## 13.7 Responsive Breakpoints

Breakpoints awal (dapat disesuaikan dengan framework):

| Nama | Lebar |
|---|---:|
| Mobile | < 640 px |
| Tablet | 640–1023 px |
| Desktop | ≥ 1024 px |
| Wide Desktop | ≥ 1440 px |

Perilaku:
- Sidebar desktop berubah menjadi drawer atau bottom navigation pada mobile.
- Grid 3–4 kolom berubah menjadi 1–2 kolom.
- Panel samping learning berubah menjadi drawer.
- Tabel dapat menjadi card list atau horizontal scroll yang terkontrol.
- Modal tidak boleh melebihi area viewport.

## 13.8 Komponen Reusable

Komponen global yang perlu disiapkan:

- Logo.
- Sidebar.
- Topbar.
- Mobile navigation.
- Button variants.
- Input.
- Password input.
- Search input.
- Select.
- Checkbox.
- Radio card.
- Toggle.
- Tabs.
- Dropdown.
- Tooltip.
- Modal.
- Confirmation dialog.
- Toast.
- Badge.
- Avatar.
- Avatar group.
- Progress bar.
- Circular progress.
- Stat card.
- Learning card.
- Universe card.
- Game card.
- Quest card.
- Achievement badge.
- Empty state.
- Skeleton loading.
- Error state.

## 13.9 States yang Wajib Dirancang

Untuk setiap fitur penting, pertimbangkan:
- Default.
- Hover.
- Focus.
- Active.
- Selected.
- Disabled.
- Loading.
- Empty.
- Success.
- Error.

Jangan hanya merancang tampilan ketika data sudah terisi.

## 13.10 Accessibility

- Kontras warna teks dan latar harus memadai.
- Semua fungsi penting dapat dijangkau keyboard.
- Gunakan focus indicator yang jelas.
- Gambar informatif memiliki alt text.
- Jangan memakai warna sebagai satu-satunya penanda status.
- Form memiliki label yang jelas.
- Sediakan reduced motion.
- Ukuran teks dapat diperbesar tanpa merusak layout.

---

# 14. Asset dan Art Direction

Asset harus dibuat sebagai satu library yang konsisten, bukan dibuat secara acak per halaman.

## 14.1 Brand Assets

- Logo Nalarin.
- Logo icon.
- Wordmark.
- Favicon.
- Brand pattern.
- Logo versi light dan dark.

Logo sebaiknya berbentuk SVG agar tajam di berbagai ukuran.

## 14.2 Mascot Assets

Karakter awal yang dapat dikembangkan:

| Nama | Peran |
|---|---|
| Nori | Maskot utama Nalarin |
| Lumi | Companion alternatif |
| Kiko | Companion alternatif |
| Mimo | Companion alternatif |

Setiap karakter membutuhkan pose/ekspresi:
- Neutral.
- Happy.
- Curious.
- Thinking.
- Celebrating.
- Encouraging.
- Reading.

Semua pose harus mempertahankan bentuk, proporsi, warna, dan detail karakter.

## 14.3 Knowledge Universe Assets

Buat satu ilustrasi utama untuk setiap universe:
- Science Lab.
- Digital World.
- Mind Space.
- Financial District.
- History Vault.
- Creative Studio.
- Language Sphere.
- Logic Arena.

Masing-masing memiliki landmark dan palet pendukung sendiri, tetapi tetap memakai pencahayaan dan perspektif yang konsisten.

## 14.4 Category Icons

Icon kategori:
- Science.
- Technology.
- Psychology.
- Finance.
- History.
- Creativity.
- Language.
- Logic.
- Communication.
- General Knowledge.

Icon boleh 2D outline untuk navigasi dan 3D untuk kartu kategori. Jangan mencampur gaya icon secara acak.

## 14.5 Game Assets

Thumbnail:
- Brain Rush.
- Logic Escape.
- Word Quest.
- Mystery Case.
- Memory Grid.
- Fact or Fiction.
- Decision Room.

## 14.6 Achievement Assets

Contoh badge:
- First Explorer.
- Knowledge Seeker.
- Consistency Master.
- Social Learner.
- Brain Challenger.
- Curiosity Champion.
- Logic Expert.
- Master Explorer.

## 14.7 Utility Assets

- Empty friends.
- Empty messages.
- Empty notifications.
- Empty search results.
- Empty learning history.
- Empty saved topics.
- Empty achievements.
- Success.
- Error.
- Offline/connection issue.

## 14.8 Aturan Pembuatan Asset

- Gunakan transparansi untuk karakter dan objek yang akan ditempatkan di berbagai background.
- Gunakan WebP untuk ilustrasi web jika sesuai.
- Gunakan SVG untuk logo dan icon vector.
- Jangan menanam teks penting ke dalam gambar.
- Sediakan beberapa ukuran atau gunakan vector jika memungkinkan.
- Gunakan nama file yang deskriptif.
- Hindari watermark dan aset berhak cipta tanpa izin.
- Simpan sumber, lisensi, dan keterangan asset jika berasal dari pihak ketiga.

## 14.9 Struktur Folder Asset yang Disarankan

```text
public/
└── assets/
    └── nalarin/
        ├── brand/
        ├── mascot/
        │   ├── nori/
        │   ├── lumi/
        │   ├── kiko/
        │   └── mimo/
        ├── universe/
        ├── categories/
        ├── games/
        ├── badges/
        ├── avatars/
        ├── empty-states/
        ├── backgrounds/
        └── decorations/
```

---

# 15. Struktur Konten Pembelajaran

## 15.1 Hierarki Konten

Struktur konseptual:

```text
Universe
└── Category / Subcategory
    └── Topic
        └── Course / Learning Path (opsional)
            └── Module
                └── Lesson
                    ├── Content Blocks
                    ├── Activity
                    └── Quiz
```

## 15.2 Informasi Topic

Setiap topic idealnya memiliki:
- Title.
- Slug.
- Short description.
- Full description.
- Universe/category.
- Difficulty.
- Estimated duration.
- Thumbnail.
- Learning objectives.
- Prerequisites jika ada.
- Author/editor.
- Publication status.

## 15.3 Informasi Lesson

- Title.
- Lesson order.
- Content blocks.
- Illustration/media.
- Key takeaways.
- Estimated duration.
- Completion criteria.
- Related lesson.

## 15.4 Content Blocks

Sediakan komponen konten yang dapat disusun oleh editor:
- Heading.
- Paragraph.
- Image.
- Video embed.
- Audio.
- Quote/callout.
- Infographic.
- Interactive question.
- Checklist.
- Summary.

## 15.5 Editorial Quality

- Materi harus memiliki tujuan belajar yang jelas.
- Informasi faktual diperiksa sebelum diterbitkan.
- Referensi dapat dicatat untuk konten yang membutuhkan sumber.
- Materi memiliki tanggal pembaruan.
- Bahasa sesuai target pembaca dan tingkat kesulitan.
- Hindari klaim berlebihan atau informasi yang tidak dapat diverifikasi.

---

# 16. Kebutuhan Data dan Entitas Utama

Bagian ini merupakan rancangan konseptual. Bentuk tabel dan relasi final harus mengikuti teknologi yang dipilih dan kondisi project saat implementasi.

## 16.1 Entitas Pengguna

### User

- id
- name
- username
- email
- password hash atau identity provider reference
- avatar
- bio
- created_at
- updated_at
- account_status

### UserPreference

- user_id
- interests
- learning_goals
- daily_goal_minutes
- theme_mode
- accent_color
- background_style
- interface_density
- language

### UserPrivacySetting

- user_id
- profile_visibility
- activity_visibility
- online_status_visibility
- friend_request_policy
- leaderboard_visibility

## 16.2 Konten

### Universe

- id
- title
- slug
- description
- illustration
- theme metadata
- sort_order
- status

### Category

- id
- universe_id
- title
- slug
- description
- icon

### Topic

- id
- category_id
- title
- slug
- description
- difficulty
- estimated_duration
- thumbnail
- status

### Module / Lesson

- id
- topic_id
- title
- order
- content
- estimated_duration
- completion_rule

### Quiz / Question / Answer

- quiz_id
- topic_id atau lesson_id
- question_type
- prompt
- options
- correct answer reference
- explanation
- points

## 16.3 Progress dan Gamification

### UserLessonProgress

- user_id
- lesson_id
- status
- progress_value
- started_at
- completed_at

### QuizAttempt

- user_id
- quiz_id
- answers
- score
- started_at
- completed_at

### XPTransaction

- user_id
- source_type
- source_id
- amount
- created_at
- idempotency key

### UserStreak

- user_id
- current_streak
- longest_streak
- last_qualifying_activity_date
- timezone

### Achievement / UserAchievement

- achievement_id
- user_id
- unlocked_at
- progress

### Quest / UserQuestProgress

- quest_id
- user_id
- status
- progress
- started_at
- completed_at

## 16.4 Social

### Friendship

- requester_id
- receiver_id
- status
- created_at
- responded_at

### Conversation

- id
- type: private/group
- created_at

### ConversationMember

- conversation_id
- user_id
- role

### Message

- id
- conversation_id
- sender_id
- content
- created_at
- moderation_status

### Report

- reporter_id
- target_type
- target_id
- reason
- description
- status
- reviewed_at

## 16.5 Companion dan Inventory

- CompanionDefinition.
- UserCompanion.
- CosmeticItem.
- UserInventory.
- CompanionCustomization.

## 16.6 Notifications

- Notification.
- NotificationRecipient.
- Read status.
- Type.
- Destination reference.
- Created at.

---

# 17. Kebutuhan Admin dan Pengelolaan Konten

Agar Nalarin dapat berkembang, perlu ada area internal untuk mengelola materi dan aktivitas. Halaman ini bukan bagian dari navigasi pengguna umum.

## 17.1 Admin Dashboard

Menampilkan:
- Jumlah pengguna.
- Pengguna aktif.
- Konten yang diterbitkan.
- Aktivitas pembelajaran.
- Laporan yang perlu ditinjau.

## 17.2 Content Management

Admin/editor dapat:
- Membuat dan mengedit Universe.
- Mengelola kategori.
- Membuat Topic.
- Menyusun Module dan Lesson.
- Menambahkan gambar, video, dan content blocks.
- Membuat Quiz dan pertanyaan.
- Mengatur difficulty dan estimasi durasi.
- Preview sebelum publish.
- Draft, publish, unpublish, archive.

## 17.3 Gamification Management

Admin dapat mengatur:
- Quest.
- Reward XP.
- Achievement criteria.
- Game configuration.
- Level thresholds.

Perubahan reward harus tercatat dan tidak mengubah histori transaksi XP secara diam-diam.

## 17.4 Moderation Management

Admin/moderator dapat:
- Melihat user reports.
- Meninjau konten yang dilaporkan.
- Menentukan tindakan sesuai kebijakan.
- Melihat histori moderasi.

Akses admin harus dibatasi berdasarkan role dan kebutuhan kerja.

---

# 18. Kebutuhan Non-Fungsional

## 18.1 Performance

- Halaman penting harus dimuat dengan cepat.
- Gunakan optimasi ukuran gambar.
- Lazy-load ilustrasi yang tidak langsung terlihat.
- Hindari memuat seluruh data aplikasi sekaligus.
- Gunakan pagination atau infinite loading yang terkontrol untuk daftar panjang.

## 18.2 Responsive Design

- Desktop, tablet, dan mobile harus didukung.
- Navigasi berubah sesuai ukuran layar.
- Konten harus tetap mudah dibaca.
- Kuis dan game harus dapat digunakan pada layar sentuh.
- Tidak boleh ada horizontal overflow yang tidak disengaja.

## 18.3 Reliability

- Tampilkan loading, empty, success, dan error states.
- Simpan progress secara konsisten.
- Tangani kegagalan jaringan.
- Hindari reward ganda akibat pengiriman request berulang.

## 18.4 Security

- Validasi input di client dan server.
- Otorisasi setiap resource privat.
- Password tidak disimpan dalam bentuk plaintext.
- Lindungi session dan token.
- Terapkan rate limiting pada endpoint sensitif.
- Sanitasi konten yang ditampilkan.
- Jangan membocorkan data privat melalui API.

## 18.5 Accessibility

- Keyboard navigable.
- Focus state jelas.
- Contrast yang memadai.
- Label form jelas.
- Alt text untuk gambar penting.
- Reduced motion.
- Informasi tidak hanya disampaikan melalui warna.

## 18.6 Maintainability

- Gunakan reusable components.
- Pisahkan logic, UI, dan data access sesuai arsitektur project.
- Hindari duplikasi design tokens.
- Gunakan tipe data dan validasi yang konsisten bila framework mendukung.
- Dokumentasikan aturan bisnis penting.

---

# 19. Metrik Keberhasilan Produk

Metrik berikut dapat digunakan untuk mengevaluasi kualitas produk setelah tersedia data penggunaan.

## 19.1 Activation

- Persentase pengguna yang menyelesaikan onboarding.
- Persentase pengguna yang memulai lesson pertama.
- Waktu dari registrasi hingga aktivitas belajar pertama.

## 19.2 Learning Engagement

- Lesson completion rate.
- Quiz completion rate.
- Jumlah topic yang dieksplorasi.
- Penggunaan Curiosity Box.
- Penyelesaian quest.

## 19.3 Retention

- Pengguna yang kembali pada hari/minggu berikutnya.
- Konsistensi aktivitas belajar.
- Penggunaan daily goal.

## 19.4 Social Engagement

- Jumlah friendship yang disetujui.
- Partisipasi Study Room.
- Challenge yang diterima dan diselesaikan.
- Aktivitas sosial yang dilaporkan.

## 19.5 Personalization

- Penggunaan theme presets.
- Jumlah pengguna yang mengubah accent color.
- Penggunaan dark mode.

Metrik digunakan untuk memahami kualitas produk, bukan untuk mendorong penggunaan berlebihan.

---

# 20. Roadmap Pengembangan

## Phase 0 — Product Foundation

Tujuan: menyusun fondasi visual dan struktur produk.

- Finalisasi logo dan brand identity.
- Design tokens.
- Typography.
- Responsive layout.
- Komponen global.
- Asset library.
- Routing dan struktur halaman.

**Output:** design system yang dapat digunakan seluruh halaman.

## Phase 1 — MVP: Core Learning Platform

- Landing Page.
- Login/Register.
- Forgot Password.
- Onboarding.
- Home Dashboard.
- Explore.
- Universe Detail.
- Topic Detail.
- Learning Page.
- Quiz.
- Quiz Result.
- Learning Journey.
- Profile dasar.
- Personalization Studio.
- Admin content management dasar.

**Output:** pengguna dapat mendaftar, memilih minat, menemukan materi, belajar, mengerjakan kuis, melihat progress, dan mengatur tema.

## Phase 2 — Gamification

- XP.
- Level.
- Streak.
- Daily Goal.
- Quest.
- Achievement.
- Games Center.
- Game Result.
- Rewards.
- Companion dasar.

**Output:** pengalaman belajar menjadi lebih interaktif dan memiliki feedback perkembangan.

## Phase 3 — Social Learning

- Friends.
- Friend Profile.
- Chat List.
- Private Chat.
- Group Study.
- Knowledge Duel.
- Leaderboard.
- Safety and moderation tools.

**Output:** pengguna dapat terhubung dan belajar bersama dengan kontrol privasi.

## Phase 4 — Personal Growth & Discovery

- Skill Passport.
- Curiosity Box.
- Learning Wrapped.
- Knowledge Connection.
- Growth Insights.
- Rekomendasi lebih personal.

**Output:** Nalarin memberi gambaran perkembangan dan pengalaman eksplorasi yang lebih kaya.

## 20.1 Rekomendasi Urutan Implementasi

Jangan mengimplementasikan semua halaman sekaligus. Utamakan satu alur yang benar-benar berfungsi dari ujung ke ujung:

**Register → Onboarding → Home → Explore → Topic → Learning → Quiz → Result → Progress.**

Setelah alur tersebut stabil, tambahkan sistem gamifikasi. Fitur sosial yang melibatkan pesan dan interaksi antar pengguna sebaiknya dibangun setelah autentikasi, privasi, dan moderasi siap.

---

# 21. Kriteria Penerimaan

## 21.1 Design System

- [ ] Seluruh halaman memakai token warna dan typography yang sama.
- [ ] Komponen dasar reusable.
- [ ] Light, Dark, dan System mode bekerja.
- [ ] Accent color dapat diganti.
- [ ] Tema tersimpan setelah refresh dan login ulang.
- [ ] Kontras dan focus state diperiksa.

## 21.2 Public dan Authentication

- [ ] Landing page responsif.
- [ ] CTA bekerja.
- [ ] Register memiliki validasi.
- [ ] Login bekerja.
- [ ] Forgot password memiliki feedback yang jelas.
- [ ] Akses halaman privat dilindungi.

## 21.3 Learning

- [ ] Explore menampilkan kategori dan topic.
- [ ] Topic Detail menampilkan informasi yang benar.
- [ ] Lesson dapat dibuka dan dinavigasi.
- [ ] Progress tersimpan.
- [ ] Quiz dapat dikerjakan.
- [ ] Hasil quiz dihitung dengan benar.
- [ ] User dapat melihat materi yang telah diselesaikan.

## 21.4 Gamification

- [ ] XP tercatat satu kali untuk aktivitas yang valid.
- [ ] Streak mengikuti aturan dan timezone.
- [ ] Quest progress diperbarui.
- [ ] Achievement hanya terbuka jika syarat terpenuhi.
- [ ] Tidak ada reward ganda akibat request berulang.

## 21.5 Social

- [ ] Friend request dapat dikirim dan dijawab.
- [ ] Chat hanya dapat diakses anggota percakapan.
- [ ] Pengguna dapat block dan report.
- [ ] Privasi profil dihormati.
- [ ] Group membership tervalidasi.

## 21.6 Responsive dan Quality

- [ ] Tidak ada overflow pada mobile.
- [ ] Navigasi dapat digunakan di semua breakpoint.
- [ ] Loading, empty, error, dan success states tersedia.
- [ ] Tidak ada tombol utama yang tidak berfungsi.
- [ ] Tidak ada data demo yang disajikan sebagai data pengguna nyata.

---

# 22. Panduan untuk AI Coding Agent

Bagian ini dapat digunakan sebagai instruksi utama sebelum meminta AI coding agent mengerjakan suatu modul.

## 22.1 Master Instruction

```text
You are working on Nalarin, a responsive web-based Personal Knowledge,
Exploration, and Social Learning Platform.

PRODUCT POSITIONING:
Nalarin helps people discover knowledge, learn through interactive content,
play educational games, track progress, personalize their learning space,
and grow together with friends.

TAGLINE:
Learn Beyond Limits.

DESIGN IDENTITY:
- Modern, premium, playful, clean, and exploratory.
- Default visual direction: pastel purple / lavender.
- Primary color: #7563E8.
- Background: #F8F7FC.
- Surface: #FFFFFF.
- Text primary: #25233A.
- Typography: Plus Jakarta Sans or Inter.
- Rounded cards, soft shadows, balanced whitespace.
- Consistent soft 3D illustrations and original Nalarin mascot assets.

PRODUCT PILLARS:
Discover, Learn, Play, Connect, Grow.

IMPORTANT DESIGN RULES:
- This is a WEB APPLICATION, not a native-only mobile app.
- Build individual pages with real routes; never create one static collage
  as a substitute for the application.
- Support desktop, tablet, and mobile.
- Use a shared design system and reusable components.
- All pages must support the shared theme system.
- The user can change Light/Dark/System mode and accent color.
- Do not copy another product's branding, mascot, or distinctive UI.

BEFORE CODING:
1. Inspect the current project and its existing architecture.
2. Identify framework, routing, styling, components, and current features.
3. Read the relevant files before changing them.
4. Preserve working functionality.
5. Report important assumptions or missing assets.

IMPLEMENTATION RULES:
- Implement only the requested module and its dependencies.
- Do not rewrite unrelated pages.
- Do not replace working architecture without a clear reason.
- Do not use fake statistics as real user data.
- Do not leave primary buttons inactive.
- Include loading, empty, error, success, hover, focus, and disabled states.
- Validate input on client and server where applicable.
- Protect private user data and authenticated routes.
- Use actual persisted data for progress, XP, streak, and achievements.

AFTER CODING:
1. Check routes and navigation.
2. Test primary interactions.
3. Test theme switching.
4. Check desktop, tablet, and mobile layouts.
5. Check console and build errors.
6. Summarize completed work, files changed, and remaining issues.

Do not claim that a feature is complete unless its main interaction and data
flow work as expected.
```

## 22.2 Instruksi Sebelum Mengerjakan Kategori

Gunakan format tambahan seperti ini:

```text
Read the Nalarin product blueprint first.

Today, implement only: [NAMA KATEGORI / MODUL].

Pages included:
- [HALAMAN 1]
- [HALAMAN 2]
- [HALAMAN 3]

Requirements:
- Follow the existing project architecture.
- Reuse the shared Nalarin design system.
- Use the provided assets where available.
- Connect the pages through real navigation.
- Make all primary interactions functional.
- Preserve existing features outside this scope.

Before implementation, inspect the relevant current files and explain briefly
which components and routes will be reused or changed. Then implement the
module and test its main flows.

At the end, report completed pages, working interactions, files changed,
missing assets, and known limitations.
```

---

# 23. Lampiran: Contoh Konten dan Microcopy

## 23.1 Brand Copy

**Nama:** Nalarin  
**Tagline:** Learn Beyond Limits.  
**Hero headline:** Your Curiosity Deserves a Universe.  
**Supporting copy:** Explore knowledge, discover new skills, and grow together through a learning experience designed around you.

## 23.2 Dashboard Copy

- “Selamat datang kembali!”
- “Siap menemukan sesuatu yang baru hari ini?”
- “Lanjutkan perjalanan belajarmu.”
- “Satu langkah kecil tetap berarti.”
- “Temukan topik yang menarik perhatianmu.”

## 23.3 Explore Copy

- “Jelajahi Knowledge Universe.”
- “Apa yang ingin kamu pelajari hari ini?”
- “Temukan dunia baru.”
- “Direkomendasikan untukmu.”
- “Mulai dari rasa ingin tahu.”

## 23.4 Learning Copy

- “Tujuan pembelajaran.”
- “Poin penting.”
- “Coba uji pemahamanmu.”
- “Simpan untuk dipelajari lagi.”
- “Materi selesai. Kamu bisa lanjut ke bagian berikutnya.”

## 23.5 Gamification Copy

- “Quest selesai!”
- “Progress belajarmu bertambah.”
- “Achievement berhasil dibuka.”
- “Kamu berhasil mencapai milestone baru.”
- “Konsistensi dibangun sedikit demi sedikit.”

Hindari copy yang menyalahkan pengguna, misalnya “Kamu mengecewakan companion karena tidak belajar.” Gunakan bahasa yang mendukung dan tidak manipulatif.

## 23.6 Personalization Copy

- “Atur ruang belajarmu.”
- “Pilih warna yang paling kamu sukai.”
- “Tema ini akan diterapkan ke seluruh Nalarin.”
- “Preview tampilanmu.”
- “Kembalikan ke tema awal.”

---

# Penutup

Nalarin dirancang sebagai platform yang menggabungkan pembelajaran, eksplorasi, permainan edukatif, interaksi sosial, dan personalisasi dalam satu ruang digital.

Identitas Nalarin bukan sekadar aplikasi yang memiliki streak, XP, atau tampilan penuh warna. Pembeda utamanya adalah pengalaman belajar yang terbuka dan personal: pengguna bebas menemukan topik, memilih cara belajar, melihat perkembangan, menyesuaikan ruang belajarnya, dan berinteraksi dengan orang lain jika mereka menginginkannya.

**Prinsip akhir Nalarin:**

> Belajar bukan hanya tentang menyelesaikan materi. Belajar adalah proses menemukan hal baru, memahami dunia, mengembangkan kemampuan, dan terus bertumbuh.

Dokumen ini merupakan fondasi konsep dan spesifikasi awal. Keputusan teknis, skema database final, aturan reward final, serta detail implementasi perlu disesuaikan dengan kondisi project dan hasil pengujian selama pengembangan.
