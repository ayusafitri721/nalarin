import type { Achievement, Game, Quest, Quiz, Topic, Universe } from '@/types'
import { examQuiz, lessonContent, questionContent } from './topicContent'

export const universes: Universe[] = [
  {
    id: 'u1', slug: 'tk', title: 'TK', accent: '#E58AB6', soft: '#FDECF4',
    description: 'Belajar untuk usia 4-6 tahun melalui tema yang dekat dengan keseharian.',
    icon: 'Sparkles', art: 'studio',
    subcategories: ['Warna & Bentuk', 'Angka & Huruf', 'Hewan & Tumbuhan', 'Cerita Singkat'],
    track: 'tk',
  },
  {
    id: 'u2', slug: 'sd', title: 'SD', accent: '#4FB992', soft: '#E6F7F0',
    description: 'Materi dasar untuk kelas 1 sampai 6 dengan bahasa yang mudah diikuti.',
    icon: 'BookOpen', art: 'island',
    subcategories: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
    track: 'sd',
  },
  {
    id: 'u3', slug: 'smp', title: 'SMP', accent: '#5C8DF6', soft: '#E9F0FF',
    description: 'Materi kelas 7 sampai 9 untuk mata pelajaran utama.',
    icon: 'FlaskConical', art: 'castle',
    subcategories: ['Kelas 7', 'Kelas 8', 'Kelas 9'],
    track: 'smp',
  },
  {
    id: 'u4', slug: 'sma', title: 'SMA', accent: '#7C6CF0', soft: '#EFECFF',
    description: 'Materi kelas 10 sampai 12 sebagai dasar sebelum ujian masuk perguruan tinggi.',
    icon: 'GraduationCap', art: 'brain',
    subcategories: ['Kelas 10', 'Kelas 11', 'Kelas 12'],
    track: 'sma',
  },
  {
    id: 'u5', slug: 'snbt', title: 'SNBT', accent: '#3F7FD6', soft: '#E9F0FF',
    description: 'Latihan 7 subtes resmi UTBK-SNBT: Tes Potensi Skolastik dan Tes Literasi.',
    icon: 'GraduationCap', art: 'castle',
    subcategories: ['Penalaran Umum', 'Pengetahuan dan Pemahaman Umum', 'Pemahaman Bacaan dan Menulis', 'Pengetahuan Kuantitatif', 'Literasi Bahasa Indonesia', 'Literasi Bahasa Inggris', 'Penalaran Matematika'],
    track: 'snbt',
  },
  {
    id: 'u6', slug: 'skd', title: 'SKD', accent: '#3FA380', soft: '#E6F7F0',
    description: 'Persiapan Seleksi Kompetensi Dasar sesuai kisi-kisi BKN: TWK, TIU, dan TKP.',
    icon: 'ClipboardCheck', art: 'city',
    subcategories: ['Tes Wawasan Kebangsaan', 'Tes Intelegensia Umum', 'Tes Karakteristik Pribadi'],
    track: 'skd',
  },
  {
    id: 'u7', slug: 'tka', title: 'TKA', accent: '#D9A25B', soft: '#FFF3E3',
    description: 'Latihan Tes Kemampuan Akademik sesuai mapel wajib dan pilihan Kemdikdasmen.',
    icon: 'BadgeCheck', art: 'vault',
    subcategories: ['Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Fisika', 'Biologi'],
    track: 'tka',
  },
  {
    id: 'u8', slug: 'teknologi', title: 'Teknologi', accent: '#59A6C9', soft: '#E6F5FB',
    description: 'Pahami internet, kecerdasan buatan, keamanan digital, dan dasar komputasi.',
    icon: 'Cpu', art: 'sphere',
    subcategories: ['Internet', 'Artificial Intelligence', 'Cyber Safety', 'Computing'],
    track: 'teknologi',
  },
]

interface TopicSeed {
  slug: string
  universeSlug: string
  title: string
  description: string
  difficulty: Topic['difficulty']
  duration: number
  objectives: string[]
  art: Universe['art']
  accent: string
  soft: string
  track: Topic['track']
  grade?: number
}

const topicSeeds: TopicSeed[] = [
  {
    slug: 'tk-warna-bentuk', universeSlug: 'tk', title: 'Warna dan Bentuk',
    description: 'Kenali warna dan bentuk lewat contoh benda di sekitar anak.',
    difficulty: 'Pemula', duration: 8, objectives: ['Menyebutkan warna dasar', 'Mengenali bentuk lingkaran, kotak, dan segitiga', 'Mencocokkan benda dengan warnanya'],
    art: 'studio', accent: '#E58AB6', soft: '#FDECF4', track: 'tk',
  },
  {
    slug: 'tk-angka-huruf', universeSlug: 'tk', title: 'Angka dan Huruf',
    description: 'Mulai mengenal angka 1 sampai 10 dan huruf awal nama benda.',
    difficulty: 'Pemula', duration: 8, objectives: ['Menyebut angka satu sampai sepuluh', 'Mengenali huruf awal nama benda', 'Meniru bentuk huruf sederhana'],
    art: 'island', accent: '#E58AB6', soft: '#FDECF4', track: 'tk',
  },
  {
    slug: 'tk-hewan-tumbuhan', universeSlug: 'tk', title: 'Hewan dan Tumbuhan',
    description: 'Kenali hewan dan tumbuhan yang dekat dengan keseharian anak.',
    difficulty: 'Pemula', duration: 9, objectives: ['Menyebut nama hewan umum', 'Mengenali bagian tumbuhan', 'Membedakan hewan dan tumbuhan'],
    art: 'brain', accent: '#E58AB6', soft: '#FDECF4', track: 'tk',
  },
  {
    slug: 'sd-1-berhitung', universeSlug: 'sd', title: 'Berhitung Kelas 1',
    description: 'Belajar menghitung sampai 20 dengan benda di sekitar.',
    difficulty: 'Pemula', duration: 10, objectives: ['Menghitung benda sampai dua puluh', 'Menulis angka satu sampai dua puluh', 'Menjumlahkan bilangan kecil'],
    art: 'island', accent: '#4FB992', soft: '#E6F7F0', track: 'sd', grade: 1,
  },
  {
    slug: 'sd-2-membaca', universeSlug: 'sd', title: 'Membaca Kelas 2',
    description: 'Latih membaca kalimat pendek dan memahami isinya.',
    difficulty: 'Pemula', duration: 12, objectives: ['Membaca kalimat pendek dengan lancar', 'Menemukan kata kunci dalam kalimat', 'Menyebutkan isi kalimat dengan bahasa sendiri'],
    art: 'castle', accent: '#4FB992', soft: '#E6F7F0', track: 'sd', grade: 2,
  },
  {
    slug: 'sd-3-alam', universeSlug: 'sd', title: 'Mengenal Alam Kelas 3',
    description: 'Belajar cuaca, musim, dan bagian tubuh makhluk hidup.',
    difficulty: 'Pemula', duration: 12, objectives: ['Mengenali jenis cuaca', 'Menyebut bagian tubuh hewan', 'Memahami kebutuhan tumbuhan'],
    art: 'brain', accent: '#4FB992', soft: '#E6F7F0', track: 'sd', grade: 3,
  },
  {
    slug: 'sd-4-operasi', universeSlug: 'sd', title: 'Operasi Hitung Kelas 4',
    description: 'Latih penjumlahan, pengurangan, perkalian, dan pembagian.',
    difficulty: 'Menengah', duration: 14, objectives: ['Menjumlahkan dan mengurangkan bilangan', 'Menghitung perkalian dasar', 'Membagi bilangan dengan tepat'],
    art: 'city', accent: '#4FB992', soft: '#E6F7F0', track: 'sd', grade: 4,
  },
  {
    slug: 'sd-5-lingkungan', universeSlug: 'sd', title: 'Lingkungan Kelas 5',
    description: 'Kenali keragaman budaya dan lingkungan di Indonesia.',
    difficulty: 'Menengah', duration: 14, objectives: ['Menyebutkan contoh keragaman budaya', 'Memahami hubungan manusia dan lingkungan', 'Menjaga kebersihan lingkungan'],
    art: 'vault', accent: '#4FB992', soft: '#E6F7F0', track: 'sd', grade: 5,
  },
  {
    slug: 'sd-6-pecahan', universeSlug: 'sd', title: 'Pecahan Kelas 6',
    description: 'Pahami pecahan sederhana dan penggunaannya sehari-hari.',
    difficulty: 'Menengah', duration: 15, objectives: ['Mengenali pecahan biasa', 'Membandingkan dua pecahan', 'Menghitung pecahan dari jumlah benda'],
    art: 'arena', accent: '#4FB992', soft: '#E6F7F0', track: 'sd', grade: 6,
  },
  {
    slug: 'smp-7-matematika', universeSlug: 'smp', title: 'Matematika Kelas 7',
    description: 'Dasar bilangan, aljabar, dan pengukuran untuk SMP.',
    difficulty: 'Menengah', duration: 18, objectives: ['Memahami bilangan bulat dan rasional', 'Menyederhanakan bentuk aljabar', 'Menghitung luas dan volume sederhana'],
    art: 'city', accent: '#5C8DF6', soft: '#E9F0FF', track: 'smp', grade: 7,
  },
  {
    slug: 'smp-8-ipa', universeSlug: 'smp', title: 'IPA Kelas 8',
    description: 'Sistem tubuh, energi, dan makhluk hidup.',
    difficulty: 'Menengah', duration: 20, objectives: ['Menyebut sistem organ utama', 'Memahami perpindahan energi', 'Mengenal klasifikasi makhluk hidup'],
    art: 'castle', accent: '#5C8DF6', soft: '#E9F0FF', track: 'smp', grade: 8,
  },
  {
    slug: 'smp-9-ips', universeSlug: 'smp', title: 'IPS Kelas 9',
    description: 'Sejarah, geografi, dan ekonomi dasar.',
    difficulty: 'Menengah', duration: 18, objectives: ['Membaca linimasa sejarah', 'Memahami letak wilayah Indonesia', 'Menjelaskan kegiatan ekonomi dasar'],
    art: 'vault', accent: '#5C8DF6', soft: '#E9F0FF', track: 'smp', grade: 9,
  },
  {
    slug: 'sma-10-matematika', universeSlug: 'sma', title: 'Matematika Kelas 10',
    description: 'Fungsi, persamaan, dan logika matematika.',
    difficulty: 'Menengah', duration: 22, objectives: ['Memahami konsep fungsi', 'Menyelesaikan persamaan linear', 'Menggunakan logika matematika'],
    art: 'city', accent: '#7C6CF0', soft: '#EFECFF', track: 'sma', grade: 10,
  },
  {
    slug: 'sma-11-fisika', universeSlug: 'sma', title: 'Fisika Kelas 11',
    description: 'Gerak, gaya, energi, dan gelombang.',
    difficulty: 'Menengah', duration: 24, objectives: ['Menganalisis gerak lurus', 'Memahami hukum Newton', 'Menjelaskan sifat gelombang'],
    art: 'castle', accent: '#7C6CF0', soft: '#EFECFF', track: 'sma', grade: 11,
  },
  {
    slug: 'sma-12-literasi', universeSlug: 'sma', title: 'Literasi Kelas 12',
    description: 'Membaca kritis, menyimpulkan, dan menyusun argumen.',
    difficulty: 'Menengah', duration: 20, objectives: ['Menemukan argumen utama teks', 'Membedakan fakta dan opini', 'Menyusun simpulan yang logis'],
    art: 'brain', accent: '#7C6CF0', soft: '#EFECFF', track: 'sma', grade: 12,
  },
  {
    slug: 'snbt-penalaran-umum', universeSlug: 'snbt', title: 'Penalaran Umum',
    description: 'Subtes TPS UTBK: penalaran induktif, deduktif, dan kuantitatif.',
    difficulty: 'Menengah', duration: 30, objectives: ['Menemukan prinsip dari rangkaian fakta', 'Menarik kesimpulan dari premis yang diberikan', 'Bernalar menggunakan hubungan angka sederhana'],
    art: 'arena', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'snbt-pengetahuan-umum', universeSlug: 'snbt', title: 'Pengetahuan dan Pemahaman Umum',
    description: 'Subtes TPS UTBK: leksikal, informasi, dan konteks sosial budaya Indonesia.',
    difficulty: 'Menengah', duration: 15, objectives: ['Menafsirkan kata dan frasa sesuai konteks', 'Menghubungkan informasi dalam bacaan pendek', 'Menyimpulkan makna dari bacaan panjang'],
    art: 'castle', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'snbt-pemahaman-bacaan', universeSlug: 'snbt', title: 'Pemahaman Bacaan dan Menulis',
    description: 'Subtes TPS UTBK: pemilihan, penataan, dan perbaikan gagasan.',
    difficulty: 'Menengah', duration: 25, objectives: ['Menentukan judul dan diksi yang tepat', 'Mengurutkan kalimat menjadi paragraf yang padu', 'Memperbaiki kalimat mubazir dan tidak baku'],
    art: 'vault', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'snbt-pengetahuan-kuantitatif', universeSlug: 'snbt', title: 'Pengetahuan Kuantitatif',
    description: 'Subtes TPS UTBK: bilangan, aljabar, geometri, analisis data, dan peluang.',
    difficulty: 'Menengah', duration: 20, objectives: ['Memecahkan soal bilangan dan aljabar', 'Menghitung besaran geometri dan pengukuran', 'Menafsirkan data dan peluang'],
    art: 'city', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'snbt-literasi-indonesia', universeSlug: 'snbt', title: 'Literasi dalam Bahasa Indonesia',
    description: 'Subtes literasi UTBK dengan teks konteks saintek, sosial humaniora, dan personal.',
    difficulty: 'Menengah', duration: 42, objectives: ['Menemukan informasi dalam teks ilmiah dan sosial', 'Menilai argumen dan kepercayaan penulis', 'Merefleksikan isi teks sastra dan informasi'],
    art: 'sphere', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'snbt-literasi-inggris', universeSlug: 'snbt', title: 'Literasi dalam Bahasa Inggris',
    description: 'Subtes literasi UTBK berbasis teks berbahasa Inggris.',
    difficulty: 'Menengah', duration: 20, objectives: ['Memahami gagasan utama teks Inggris', 'Mengidentifikasi informasi tersirat', 'Menilai tujuan dan nada penulis'],
    art: 'island', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'snbt-penalaran-matematika', universeSlug: 'snbt', title: 'Penalaran Matematika',
    description: 'Subtes literasi UTBK: merumuskan, menggunakan, dan mengevaluasi model matematika.',
    difficulty: 'Menengah', duration: 42, objectives: ['Mengubah masalah nyata ke model matematika', 'Menerapkan strategi pemecahan masalah', 'Menilai kewajaran hasil dalam konteks asal'],
    art: 'brain', accent: '#3F7FD6', soft: '#E9F0FF', track: 'snbt',
  },
  {
    slug: 'skd-twk', universeSlug: 'skd', title: 'Tes Wawasan Kebangsaan',
    description: 'TWK SKD: nasionalisme, integritas, bela negara, empat konsensus, dan Bahasa Indonesia.',
    difficulty: 'Menengah', duration: 30, objectives: ['Menghayati nilai nasionalisme dan integritas', 'Memahami Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika', 'Menggunakan Bahasa Indonesia secara tepat'],
    art: 'vault', accent: '#3FA380', soft: '#E6F7F0', track: 'skd',
  },
  {
    slug: 'skd-tiu', universeSlug: 'skd', title: 'Tes Intelegensia Umum',
    description: 'TIU SKD: kemampuan verbal, numerik, dan figural.',
    difficulty: 'Menengah', duration: 35, objectives: ['Menyusun silogisme dan penalaran induktif', 'Menghitung deret angka dan perbandingan kuantitatif', 'Menganalisis pola dan penalaran matriks'],
    art: 'city', accent: '#3FA380', soft: '#E6F7F0', track: 'skd',
  },
  {
    slug: 'skd-tkp', universeSlug: 'skd', title: 'Tes Karakteristik Pribadi',
    description: 'TKP SKD: pelayanan publik, jejaring kerja, sosial budaya, TIK, profesionalisme, anti radikalisme.',
    difficulty: 'Menengah', duration: 45, objectives: ['Memilih respons situasi kerja yang profesional', 'Menghargai keragaman dan menjaga kolaborasi', 'Menggunakan teknologi secara etis'],
    art: 'studio', accent: '#3FA380', soft: '#E6F7F0', track: 'skd',
  },
  {
    slug: 'tka-bahasa-indonesia', universeSlug: 'tka', title: 'Bahasa Indonesia TKA',
    description: 'Mata pelajaran wajib TKA SD, SMP, dan SMA: kompetensi berbahasa dan bersastra.',
    difficulty: 'Menengah', duration: 30, objectives: ['Memahami teks informasi dan sastra', 'Menguasai kaidah kebahasaan', 'Menyusun argumen dan teks tertulis'],
    art: 'vault', accent: '#D9A25B', soft: '#FFF3E3', track: 'tka',
  },
  {
    slug: 'tka-matematika', universeSlug: 'tka', title: 'Matematika TKA',
    description: 'Mata pelajaran wajib TKA di semua jenjang: kompetensi matematika sesuai kurikulum.',
    difficulty: 'Menengah', duration: 30, objectives: ['Menguasai bilangan dan aljabar', 'Menyelesaikan geometri dan pengukuran', 'Menganalisis data dan peluang'],
    art: 'city', accent: '#D9A25B', soft: '#FFF3E3', track: 'tka',
  },
  {
    slug: 'tka-bahasa-inggris', universeSlug: 'tka', title: 'Bahasa Inggris TKA',
    description: 'Mata pelajaran wajib TKA jenjang SMA: reading, listening, writing, dan speaking.',
    difficulty: 'Menengah', duration: 30, objectives: ['Memahami teks dan percakapan bahasa Inggris', 'Menguasai struktur dan kosakata', 'Menyusun teks singkat yang benar'],
    art: 'island', accent: '#D9A25B', soft: '#FFF3E3', track: 'tka',
  },
  {
    slug: 'tka-fisika', universeSlug: 'tka', title: 'Fisika TKA',
    description: 'Salah satu mata pelajaran pilihan TKA SMA: konsep dan penalaran fisika.',
    difficulty: 'Menengah', duration: 30, objectives: ['Menganalisis gerak dan gaya', 'Memahami energi dan gelombang', 'Menyelesaikan masalah fisika sederhana'],
    art: 'castle', accent: '#D9A25B', soft: '#FFF3E3', track: 'tka',
  },
  {
    slug: 'tka-biologi', universeSlug: 'tka', title: 'Biologi TKA',
    description: 'Salah satu mata pelajaran pilihan TKA SMA: makhluk hidup dan prosesnya.',
    difficulty: 'Menengah', duration: 30, objectives: ['Memahami sel, genetika, dan metabolisme', 'Menganalisis ekologi dan evolusi', 'Menjelaskan sistem organ tubuh'],
    art: 'brain', accent: '#D9A25B', soft: '#FFF3E3', track: 'tka',
  },
  {
    slug: 'internet-works', universeSlug: 'teknologi', title: 'Bagaimana Internet Bekerja',
    description: 'Dari mengetik alamat website sampai halaman muncul di layarmu, pahami perjalanan data di baliknya.',
    difficulty: 'Pemula', duration: 18, objectives: ['Menjelaskan peran browser, server, dan DNS', 'Memahami jalur pengiriman data sederhana', 'Mengenali dasar keamanan saat browsing'],
    art: 'island', accent: '#59A6C9', soft: '#E6F5FB', track: 'teknologi',
  },
  {
    slug: 'teknologi-ai', universeSlug: 'teknologi', title: 'Dasar Kecerdasan Buatan',
    description: 'Pahami cara kerja AI sederhana dan batasannya.',
    difficulty: 'Pemula', duration: 16, objectives: ['Menjelaskan pengertian kecerdasan buatan', 'Mengenali contoh AI sehari-hari', 'Memahami batas dan risiko AI'],
    art: 'brain', accent: '#59A6C9', soft: '#E6F5FB', track: 'teknologi',
  },
  {
    slug: 'teknologi-keamanan', universeSlug: 'teknologi', title: 'Keamanan Digital',
    description: 'Lindungi akun dan data pribadi saat menggunakan internet.',
    difficulty: 'Pemula', duration: 14, objectives: ['Mengenali kata sandi yang kuat', 'Mendeteksi tautan mencurigakan', 'Memahami pentingnya verifikasi dua langkah'],
    art: 'vault', accent: '#59A6C9', soft: '#E6F5FB', track: 'teknologi',
  },
]

export const topics: Topic[] = topicSeeds.map((seed, index) => ({
  ...seed,
  id: `t${index + 1}`,
  quizId: `q${index + 1}`,
  lessons: (lessonContent[seed.slug] ?? []).map((lesson, index) => ({ ...lesson, id: `${seed.slug}-l${index + 1}` })),
}))

export const quizzes: Quiz[] = topics.map((topic) => examQuiz(topic.quizId, topic.title, questionContent[topic.slug] ?? []))

export const games: Game[] = [
  { slug: 'brain-rush', title: 'Brain Rush', description: 'Jawab pertanyaan cepat, kejar skor tertinggi!', category: 'Brain', difficulty: 'Pemula', accent: '#7C6CF0', xp: 20 },
  { slug: 'logic-escape', title: 'Logic Escape', description: 'Pecahkan teka-teki untuk keluar dari ruangan.', category: 'Puzzle', difficulty: 'Menengah', accent: '#5C8DF6', xp: 30 },
  { slug: 'word-quest', title: 'Word Quest', description: 'Susun kata dan perluas kosakatamu.', category: 'Word', difficulty: 'Pemula', accent: '#E5806C', xp: 15 },
  { slug: 'mystery-case', title: 'Mystery Case', description: 'Kumpulkan petunjuk dan selesaikan kasusnya.', category: 'Story', difficulty: 'Lanjut', accent: '#D9A25B', xp: 40 },
  { slug: 'memory-grid', title: 'Memory Grid', description: 'Ingat posisi objek sebelum hilang.', category: 'Memory', difficulty: 'Menengah', accent: '#E58AB6', xp: 20 },
  { slug: 'fact-or-fiction', title: 'Fact or Fiction', description: 'Bedakan fakta dari klaim yang menyesatkan.', category: 'Fact', difficulty: 'Menengah', accent: '#4FB992', xp: 25 },
  { slug: 'decision-room', title: 'Decision Room', description: 'Pilih solusi terbaik dari situasi nyata.', category: 'Decision', difficulty: 'Lanjut', accent: '#59A6C9', xp: 35 },
]

export const quests: Quest[] = [
  { id: 'qd1', title: 'Selesaikan 1 pelajaran', description: 'Buka materi apa pun dan selesaikan satu lesson.', category: 'Harian', reward: 50, target: 1 },
  { id: 'qd2', title: 'Selesaikan 5 kuis', description: 'Uji pemahamanmu lewat kuis apa pun.', category: 'Harian', reward: 30, target: 5 },
  { id: 'qd3', title: 'Jelajahi 2 universe', description: 'Kunjungi dua dunia pengetahuan berbeda.', category: 'Harian', reward: 25, target: 2 },
  { id: 'qw1', title: 'Belajar 3 hari berturut-turut', description: 'Jaga konsistensi dengan aktivitas belajar harian.', category: 'Mingguan', reward: 100, target: 3, deadline: 'Minggu ini' },
  { id: 'qw2', title: 'Mainkan 2 mini game', description: 'Belajar sambil bermain di Games Center.', category: 'Mingguan', reward: 60, target: 2, deadline: 'Minggu ini' },
  { id: 'qr1', title: 'Tanya satu hal baru', description: 'Tulis satu pertanyaan yang muncul saat belajar.', category: 'Dunia Nyata', reward: 40, target: 1 },
]

export const achievements: Achievement[] = [
  { id: 'a1', name: 'First Explorer', description: 'Selesaikan pelajaran pertama', color: '#7C6CF0' },
  { id: 'a2', name: 'Knowledge Seeker', description: 'Selesaikan 5 kuis', color: '#5C8DF6' },
  { id: 'a3', name: 'Consistency Master', description: 'Capai streak 7 hari', color: '#E5806C' },
  { id: 'a4', name: 'Logic Expert', description: 'Selesaikan 10 kuis', color: '#8E82E8' },
  { id: 'a5', name: 'Social Learner', description: 'Selesaikan tantangan bersama teman', color: '#4FB992' },
  { id: 'a6', name: 'Curiosity Champion', description: 'Simpan 5 Catatan', color: '#D9A25B' },
]

export const companions = [
  { id: 'nori', name: 'Mochi', description: 'Sahabat penasaran yang selalu siap menemukan hal baru.', color: '#8E7BF0' },
  { id: 'kiko', name: 'Fumi', description: 'Pemberani dan suka tantangan logika.', color: '#F08A3C' },
  { id: 'mimo', name: 'Pipi', description: 'Tenang, teliti, dan gemar membaca.', color: '#A78BFA' },
  { id: 'lumi', name: 'Koma', description: 'Ceria dan hangat, cocok menemani belajar santai.', color: '#F2B65E' },
]

export const companionAssets: Record<string, string> = {
  nori: '/assets/nalarin/companion-nori.svg',
  kiko: '/assets/nalarin/companion-kiko.svg',
  mimo: '/assets/nalarin/companion-mimo.svg',
  lumi: '/assets/nalarin/companion-lumi.svg',
}

export const accentPresets = [
  { name: 'Lavender', value: '#7563E8', soft: '#EEEBFF' },
  { name: 'Ocean Blue', value: '#4779D8', soft: '#EAF1FF' },
  { name: 'Mint Green', value: '#339B79', soft: '#E7F6EF' },
  { name: 'Sunset Peach', value: '#D97B50', soft: '#FFF0E7' },
  { name: 'Rose Pink', value: '#D45F93', soft: '#FCEAF2' },
  { name: 'Midnight Purple', value: '#8E82E8', soft: '#302B4A' },
]

export const getTopic = (slug: string) => topics.find((t) => t.slug === slug)
export const getQuiz = (id: string) => quizzes.find((q) => q.id === id) ?? quizzes[0]
export const getUniverse = (slug: string) => universes.find((u) => u.slug === slug)
