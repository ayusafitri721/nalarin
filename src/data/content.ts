import type { Achievement, ContentBlock, Game, Quest, Quiz, Topic, Universe } from '@/types'

export const universes: Universe[] = [
  {
    id: 'u1', slug: 'science-lab', title: 'Science Lab', accent: '#5C8DF6', soft: '#E9F0FF',
    description: 'Jelajahi sains dan fenomena alam, dari tubuh manusia hingga luar angkasa.',
    icon: 'FlaskConical', art: 'castle', topicCount: 24, gameCount: 12, questCount: 8, progress: 75,
    subcategories: ['Human Body', 'Space', 'Physics', 'Chemistry'],
  },
  {
    id: 'u2', slug: 'digital-world', title: 'Digital World', accent: '#7C6CF0', soft: '#EFECFF',
    description: 'Pahami teknologi, internet, AI, dan cara tetap aman di dunia digital.',
    icon: 'Cpu', art: 'island', topicCount: 32, gameCount: 18, questCount: 10, progress: 40,
    subcategories: ['Internet', 'Artificial Intelligence', 'Cyber Safety', 'Computing'],
  },
  {
    id: 'u3', slug: 'mind-space', title: 'Mind Space', accent: '#E58AB6', soft: '#FDECF4',
    description: 'Kenali pikiran, emosi, memori, dan kebiasaan yang membentuk diri kita.',
    icon: 'Brain', art: 'brain', topicCount: 18, gameCount: 9, questCount: 6, progress: 20,
    subcategories: ['Memory', 'Emotion', 'Habits', 'Communication'],
  },
  {
    id: 'u4', slug: 'financial-district', title: 'Financial District', accent: '#4FB992', soft: '#E6F7F0',
    description: 'Belajar mengelola uang, menabung, dan memahami ekonomi sehari-hari.',
    icon: 'Landmark', art: 'city', topicCount: 16, gameCount: 7, questCount: 5, progress: 10,
    subcategories: ['Budgeting', 'Saving', 'Economy', 'Business Basics'],
  },
  {
    id: 'u5', slug: 'history-vault', title: 'History Vault', accent: '#D9A25B', soft: '#FFF3E3',
    description: 'Perjalanan melintasi peradaban dan peristiwa yang membentuk dunia.',
    icon: 'Landmark', art: 'vault', topicCount: 28, gameCount: 11, questCount: 7, progress: 35,
    subcategories: ['Ancient Civilizations', 'World History', 'Local History'],
  },
  {
    id: 'u6', slug: 'creative-studio', title: 'Creative Studio', accent: '#E5806C', soft: '#FFEDE8',
    description: 'Temukan cara baru berpikir, berkarya, dan bercerita.',
    icon: 'Palette', art: 'studio', topicCount: 21, gameCount: 14, questCount: 9, progress: 55,
    subcategories: ['Design', 'Music', 'Storytelling', 'Creative Thinking'],
  },
  {
    id: 'u7', slug: 'language-sphere', title: 'Language Sphere', accent: '#59A6C9', soft: '#E6F5FB',
    description: 'Perluas kosakata, tata bahasa, dan kemampuan berkomunikasi.',
    icon: 'Languages', art: 'sphere', topicCount: 26, gameCount: 15, questCount: 8, progress: 30,
    subcategories: ['Vocabulary', 'Grammar', 'Writing', 'Public Speaking'],
  },
  {
    id: 'u8', slug: 'logic-arena', title: 'Logic Arena', accent: '#8E82E8', soft: '#EFEDFF',
    description: 'Latih penalaran, pola, dan pemecahan masalah dengan tantangan logika.',
    icon: 'Puzzle', art: 'arena', topicCount: 19, gameCount: 16, questCount: 8, progress: 60,
    subcategories: ['Reasoning', 'Patterns', 'Puzzles', 'Problem Solving'],
  },
]

function blocks(title: string, sub: string): ContentBlock[] {
  return [
    { type: 'paragraph', text: `Pernahkah kamu bertanya-tanya tentang ${title.toLowerCase()}? Dalam pelajaran ini kita akan memahami ${sub.toLowerCase()} langkah demi langkah dengan contoh yang dekat dengan kehidupan sehari-hari.` },
    { type: 'heading', text: 'Mengapa ini penting?' },
    { type: 'paragraph', text: `Memahami ${title.toLowerCase()} membantu kamu melihat hubungan antara fakta dan keputusan yang kamu ambil. Pengetahuan ini bukan sekadar hafalan, melainkan cara berpikir yang bisa dipakai di banyak situasi.` },
    { type: 'callout', text: 'Tips belajar: coba jelaskan kembali materi ini dengan bahasamu sendiri sebelum lanjut ke bagian berikutnya.' },
    { type: 'heading', text: 'Poin penting' },
    { type: 'list', items: [`${title} memiliki prinsip dasar yang bisa diamati`, `Contoh sederhana membantu memahami konsep abstrak`, `Latihan kecil lebih efektif daripada membaca berulang kali`], text: '' },
    { type: 'quote', text: 'Rasa ingin tahu adalah awal dari setiap penemuan.' },
    { type: 'summary', text: `Ringkasnya, ${title.toLowerCase()} dapat dipahami melalui observasi, contoh, dan latihan. Lanjutkan ke kuis untuk menguji pemahamanmu.` },
  ]
}

function makeLessons(title: string, sub: string): Topic['lessons'] {
  return [
    { id: `${title}-1`, title: 'Pengenalan', duration: 6, blocks: blocks(title, sub) },
    { id: `${title}-2`, title: 'Konsep Utama', duration: 8, blocks: blocks(title, `prinsip utama ${sub}`) },
    { id: `${title}-3`, title: 'Contoh & Penerapan', duration: 7, blocks: blocks(title, `penerapan ${sub}`) },
  ]
}

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
  progress: number
  status: Topic['status']
}

const topicSeeds: TopicSeed[] = [
  {
    slug: 'internet-works', universeSlug: 'digital-world', title: 'Bagaimana Internet Bekerja',
    description: 'Dari mengetik alamat website sampai halaman muncul di layarmu — pahami perjalanan data di baliknya.',
    difficulty: 'Pemula', duration: 18, objectives: ['Menjelaskan peran browser, server, dan DNS', 'Memahami jalur pengiriman data sederhana', 'Mengenali dasar keamanan saat browsing'],
    art: 'island', accent: '#7C6CF0', soft: '#EFECFF', progress: 60, status: 'berjalan',
  },
  {
    slug: 'human-body-systems', universeSlug: 'science-lab', title: 'Sistem Tubuh Manusia',
    description: 'Kenali sistem organ yang bekerja bersama menjaga tubuh tetap hidup dan sehat.',
    difficulty: 'Pemula', duration: 24, objectives: ['Menyebutkan sistem organ utama', 'Menjelaskan fungsi sistem peredaran darah', 'Memahami hubungan antar sistem'],
    art: 'castle', accent: '#5C8DF6', soft: '#E9F0FF', progress: 0, status: 'belum',
  },
  {
    slug: 'space-exploration', universeSlug: 'science-lab', title: 'Menjelajahi Luar Angkasa',
    description: 'Dari planet dalam tata surya sampai galaksi yang jauh, mulai dari rasa penasaran.',
    difficulty: 'Menengah', duration: 22, objectives: ['Mengenali susunan tata surya', 'Memahami perbedaan planet dan bintang', 'Menjelaskan dasar eksplorasi luar angkasa'],
    art: 'castle', accent: '#5C8DF6', soft: '#E9F0FF', progress: 100, status: 'selesai',
  },
  {
    slug: 'memory-and-learning', universeSlug: 'mind-space', title: 'Memori & Cara Belajar',
    description: 'Mengapa kita mudah lupa dan bagaimana otak menyimpan informasi lebih baik.',
    difficulty: 'Pemula', duration: 15, objectives: ['Memahami tahapan memori', 'Mengetahui pengulangan terarah', 'Menerapkan teknik belajar sederhana'],
    art: 'brain', accent: '#E58AB6', soft: '#FDECF4', progress: 25, status: 'berjalan',
  },
  {
    slug: 'smart-budgeting', universeSlug: 'financial-district', title: 'Budgeting yang Realistis',
    description: 'Susun rencana keuangan harian yang tidak memberatkan dan tetap bisa dijalankan.',
    difficulty: 'Pemula', duration: 14, objectives: ['Mencatat pemasukan dan pengeluaran', 'Membuat kategori budget', 'Menetapkan prioritas yang realistis'],
    art: 'city', accent: '#4FB992', soft: '#E6F7F0', progress: 0, status: 'belum',
  },
  {
    slug: 'ancient-civilizations', universeSlug: 'history-vault', title: 'Peradaban Kuno',
    description: 'Mengapa manusia mulai membangun kota, menulis, dan membentuk peradaban.',
    difficulty: 'Menengah', duration: 20, objectives: ['Mengetahui ciri peradaban awal', 'Memahami peran sungai dalam peradaban', 'Membaca linimasa sederhana'],
    art: 'vault', accent: '#D9A25B', soft: '#FFF3E3', progress: 0, status: 'belum',
  },
  {
    slug: 'creative-thinking', universeSlug: 'creative-studio', title: 'Berpikir Kreatif',
    description: 'Latih cara melihat masalah dari sudut pandang yang berbeda.',
    difficulty: 'Pemula', duration: 12, objectives: ['Mengenali hambatan berpikir', 'Mencoba teknik ide sederhana', 'Menghasilkan beberapa alternatif solusi'],
    art: 'studio', accent: '#E5806C', soft: '#FFEDE8', progress: 45, status: 'berjalan',
  },
  {
    slug: 'logical-reasoning', universeSlug: 'logic-arena', title: 'Dasar Penalaran Logika',
    description: 'Latih pola pikir runtut dengan contoh teka-teki sehari-hari.',
    difficulty: 'Menengah', duration: 16, objectives: ['Memahami pernyataan dan kesimpulan', 'Mengenali pola berulang', 'Menyusun argumen sederhana'],
    art: 'arena', accent: '#8E82E8', soft: '#EFEDFF', progress: 0, status: 'belum',
  },
]

export const topics: Topic[] = topicSeeds.map((seed, index) => ({
  ...seed,
  id: `t${index + 1}`,
  quizId: `q${index + 1}`,
  lessons: makeLessons(seed.title, seed.objectives[1]),
}))

function makeQuiz(topic: Topic): Quiz {
  return {
    id: topic.quizId,
    topicTitle: topic.title,
    questions: [
      {
        id: `${topic.id}-q1`,
        prompt: `Manakah pernyataan yang paling tepat mengenai ${topic.title.toLowerCase()}?`,
        options: [
          { id: 'a', label: topic.objectives[0] },
          { id: 'b', label: 'Semua informasi harus dihafal tanpa konteks' },
          { id: 'c', label: 'Materi ini tidak memiliki penerapan praktis' },
          { id: 'd', label: 'Hanya pakar yang bisa memahaminya' },
        ],
        correctId: 'a',
        explanation: `Pernyataan pertama sesuai dengan tujuan pembelajaran: ${topic.objectives[0].toLowerCase()}.`,
      },
      {
        id: `${topic.id}-q2`,
        prompt: `Apa langkah terbaik ketika mempelajari ${topic.title.toLowerCase()}?`,
        options: [
          { id: 'a', label: 'Membaca sekali lalu langsung selesai' },
          { id: 'b', label: 'Mengulang dengan contoh dan menjelaskannya kembali' },
          { id: 'c', label: 'Menunda sampai besok tanpa rencana' },
          { id: 'd', label: 'Mengabaikan penjelasan yang tersedia' },
        ],
        correctId: 'b',
        explanation: 'Belajar dengan contoh dan penjelasan ulang membantu informasi bertahan lebih lama.',
      },
      {
        id: `${topic.id}-q3`,
        prompt: `Setelah menyelesaikan materi ini, apa yang sebaiknya dilakukan?`,
        options: [
          { id: 'a', label: 'Menutup aplikasi tanpa mencatat apa pun' },
          { id: 'b', label: 'Menyimpan catatan dan mencoba kuis berikutnya' },
          { id: 'c', label: 'Mengulang halaman yang sama berkali-kali tanpa tujuan' },
          { id: 'd', label: 'Menganggap satu kuis sebagai bukti keahlian penuh' },
        ],
        correctId: 'b',
        explanation: 'Catatan dan latihan lanjutan membantu membangun pemahaman bertahap, bukan penguasaan instan.',
      },
    ],
  }
}

export const quizzes: Quiz[] = topics.map(makeQuiz)

export const games: Game[] = [
  { slug: 'brain-rush', title: 'Brain Rush', description: 'Jawab pertanyaan cepat, kejar skor tertinggi!', category: 'Brain', difficulty: 'Pemula', bestScore: 840, accent: '#7C6CF0', art: '⚡', xp: 20 },
  { slug: 'logic-escape', title: 'Logic Escape', description: 'Pecahkan teka-teki untuk keluar dari ruangan.', category: 'Puzzle', difficulty: 'Menengah', bestScore: 620, accent: '#5C8DF6', art: '🔐', xp: 30 },
  { slug: 'word-quest', title: 'Word Quest', description: 'Susun kata dan perluas kosakatamu.', category: 'Word', difficulty: 'Pemula', bestScore: 410, accent: '#E5806C', art: '🔤', xp: 15 },
  { slug: 'mystery-case', title: 'Mystery Case', description: 'Kumpulkan petunjuk dan selesaikan kasusnya.', category: 'Story', difficulty: 'Lanjut', bestScore: 0, accent: '#D9A25B', art: '🕵️', xp: 40 },
  { slug: 'memory-grid', title: 'Memory Grid', description: 'Ingat posisi objek sebelum hilang.', category: 'Memory', difficulty: 'Menengah', bestScore: 300, accent: '#E58AB6', art: '🧠', xp: 20 },
  { slug: 'fact-or-fiction', title: 'Fact or Fiction', description: 'Bedakan fakta dari klaim yang menyesatkan.', category: 'Fact', difficulty: 'Menengah', bestScore: 550, accent: '#4FB992', art: '✅', xp: 25 },
  { slug: 'decision-room', title: 'Decision Room', description: 'Pilih solusi terbaik dari situasi nyata.', category: 'Decision', difficulty: 'Lanjut', bestScore: 0, accent: '#59A6C9', art: '🧭', xp: 35 },
]

export const quests: Quest[] = [
  { id: 'qd1', title: 'Selesaikan 1 pelajaran', description: 'Buka materi apa pun dan selesaikan satu lesson.', category: 'Harian', reward: 50, progress: 1, target: 1, status: 'selesai' },
  { id: 'qd2', title: 'Jawab 5 pertanyaan kuis', description: 'Uji pemahamanmu lewat kuis apa pun.', category: 'Harian', reward: 30, progress: 2, target: 5, status: 'aktif' },
  { id: 'qd3', title: 'Jelajahi 2 universe', description: 'Kunjungi dua dunia pengetahuan berbeda.', category: 'Harian', reward: 25, progress: 1, target: 2, status: 'aktif' },
  { id: 'qw1', title: 'Belajar 3 hari berturut-turut', description: 'Jaga konsistensi dengan aktivitas belajar harian.', category: 'Mingguan', reward: 100, progress: 2, target: 3, status: 'aktif', deadline: 'Minggu ini' },
  { id: 'qw2', title: 'Mainkan 2 mini game', description: 'Belajar sambil bermain di Games Center.', category: 'Mingguan', reward: 60, progress: 0, target: 2, status: 'aktif', deadline: 'Minggu ini' },
  { id: 'qr1', title: 'Tanya satu hal baru', description: 'Tulis satu pertanyaan yang muncul saat belajar.', category: 'Dunia Nyata', reward: 40, progress: 0, target: 1, status: 'aktif' },
]

export const achievements: Achievement[] = [
  { id: 'a1', name: 'First Explorer', description: 'Selesaikan pelajaran pertama', icon: '🧭', unlocked: true, color: '#7C6CF0' },
  { id: 'a2', name: 'Knowledge Seeker', description: 'Selesaikan 5 kuis', icon: '📚', unlocked: true, color: '#5C8DF6' },
  { id: 'a3', name: 'Consistency Master', description: 'Capai streak 7 hari', icon: '🔥', unlocked: true, color: '#E5806C' },
  { id: 'a4', name: 'Logic Expert', description: 'Selesaikan 10 teka-teki logika', icon: '🧩', unlocked: false, color: '#8E82E8' },
  { id: 'a5', name: 'Social Learner', description: 'Selesaikan tantangan bersama teman', icon: '🤝', unlocked: false, color: '#4FB992' },
  { id: 'a6', name: 'Curiosity Champion', description: 'Buka 5 Curiosity Box', icon: '🎁', unlocked: false, color: '#D9A25B' },
]

export const weeklyActivity = [
  { day: 'Sen', minutes: 25 }, { day: 'Sel', minutes: 40 }, { day: 'Rab', minutes: 15 },
  { day: 'Kam', minutes: 55 }, { day: 'Jum', minutes: 30 }, { day: 'Sab', minutes: 45 }, { day: 'Min', minutes: 20 },
]

export const skillScores = [
  { skill: 'Critical Thinking', value: 72 }, { skill: 'Problem Solving', value: 64 },
  { skill: 'Creativity', value: 58 }, { skill: 'Digital Literacy', value: 81 },
  { skill: 'Communication', value: 49 }, { skill: 'General Knowledge', value: 68 },
]

export const companions = [
  { id: 'nori', name: 'Nori', description: 'Sahabat penasaran yang selalu siap menemukan hal baru.', color: '#8E7BF0' },
  { id: 'lumi', name: 'Lumi', description: 'Ceria dan hangat, cocok menemani belajar santai.', color: '#F2B65E' },
  { id: 'kiko', name: 'Kiko', description: 'Pemberani dan suka tantangan logika.', color: '#E5806C' },
  { id: 'mimo', name: 'Mimo', description: 'Tenang, teliti, dan gemar membaca.', color: '#5C8DF6' },
]

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
