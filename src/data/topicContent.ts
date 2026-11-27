import type { ContentBlock, Quiz } from '@/types'

export type LessonSeed = { title: string; duration: number; blocks: ContentBlock[] }
export type QuestionSeed = {
  prompt: string
  options: [string, string, string, string]
  correct: 'a' | 'b' | 'c' | 'd'
  explanation: string
}

const P = (text: string): ContentBlock => ({ type: 'paragraph', text })
const C = (text: string): ContentBlock => ({ type: 'callout', text })
const L = (...items: string[]): ContentBlock => ({ type: 'list', items, text: '' })
const S = (text: string): ContentBlock => ({ type: 'summary', text })

export function examQuiz(id: string, topicTitle: string, questions: QuestionSeed[]): Quiz {
  return {
    id,
    topicTitle,
    questions: questions.map((question, index) => ({
      id: `${id}-q${index + 1}`,
      prompt: question.prompt,
      options: question.options.map((label, optionIndex) => ({ id: ['a', 'b', 'c', 'd'][optionIndex], label })),
      correctId: question.correct,
      explanation: question.explanation,
    })),
  }
}

export const lessonContent: Record<string, LessonSeed[]> = {
  'tk-warna-bentuk': [
    {
      title: 'Warna Dasar', duration: 5,
      blocks: [
        P('Warna membantu kita mengenali benda. Empat warna dasar yang mudah dikenali adalah merah, kuning, biru, dan hijau. Merah seperti apel, kuning seperti pisang, biru seperti langit, dan hijau seperti daun.'),
        L('Merah: apel, bendera, bunga mawar', 'Kuning: pisang, matahari, bunga matahari', 'Biru: langit, laut, pensil biru', 'Hijau: daun, rumput, alpukat'),
        C('Ajak anak menyebut warna benda di sekitar rumah. Mengulang dengan benda nyata lebih mudah daripada menghafal daftar.'),
      ],
    },
    {
      title: 'Bentuk di Sekitar Kita', duration: 6,
      blocks: [
        P('Bentuk adalah rupa suatu benda. Lingkaran tidak memiliki sudut. Kotak memiliki empat sisi yang sama panjang. Segitiga memiliki tiga sisi. Persegi panjang memiliki empat sisi dengan dua pasang sisi yang sama panjang.'),
        L('Lingkaran: piring, roda, koin', 'Kotak: dadu, kotak mainan', 'Segitiga: atap rumah, rambu lalu lintas', 'Persegi panjang: buku, pintu, meja'),
      ],
    },
    {
      title: 'Mencocokkan Warna dan Bentuk', duration: 6,
      blocks: [
        P('Sekarang gabungkan keduanya. Lingkaran merah misalnya bola merah, sedangkan kotak biru misalnya kubus biru. Anak bisa bermain mencari benda yang sesuai dengan dua ciri sekaligus.'),
        C('Bermain tebak benda dengan menyebut dua ciri melatih anak mengamati, bukan hanya menghafal.'),
        S('Anak mengenali warna dan bentuk dari benda nyata di sekitarnya. Menggabungkan dua ciri membantu mereka mengamati lebih teliti.'),
      ],
    },
  ],

  'tk-angka-huruf': [
    {
      title: 'Angka 1 sampai 10', duration: 6,
      blocks: [
        P('Angka melambangkan jumlah benda. Kita mulai dari 1 sampai 10 dengan menghitung jari, buah, atau mainan.'),
        L('1 satu, 2 dua, 3 tiga, 4 empat, 5 lima', '6 enam, 7 tujuh, 8 delapan, 9 sembilan, 10 sepuluh'),
        C('Hitunglah benda nyata sambil menyebut angkanya. Urutan angka lebih mudah diingat bila dikaitkan dengan jumlah yang terlihat.'),
      ],
    },
    {
      title: 'Huruf Awal Nama Benda', duration: 6,
      blocks: [
        P('Setiap kata diawali huruf. Huruf pertama pada apel adalah A, pada bola adalah B, dan pada kucing adalah K.'),
        L('A untuk apel, B untuk bola, K untuk kucing', 'M untuk meja, P untuk pintu, S untuk sendok'),
      ],
    },
    {
      title: 'Meniru Angka dan Huruf', duration: 6,
      blocks: [
        P('Anak dapat meniru bentuk angka dan huruf dengan jari di udara, di pasir, atau di kertas. Yang terpenting adalah mengenali bentuknya, bukan menulis dengan sempurna.'),
        S('Angka 1 sampai 10 menyatakan jumlah, sedangkan huruf awal membantu mengenali nama benda. Latihan dengan benda nyata membuat pembelajaran lebih bermakna.'),
      ],
    },
  ],

  'tk-hewan-tumbuhan': [
    {
      title: 'Hewan di Sekitar Kita', duration: 6,
      blocks: [
        P('Hewan adalah makhluk hidup yang dapat bergerak dan mencari makan sendiri. Kucing, ayam, ikan, dan sapi adalah contoh hewan yang dekat dengan keseharian anak.'),
        L('Kucing: suara meong, suka ikan', 'Ayam: suara kukuruyuk, makan biji-bijian', 'Ikan: hidup di air, bernapas dengan insang', 'Sapi: makan rumput, menghasilkan susu'),
      ],
    },
    {
      title: 'Bagian-Bagian Tumbuhan', duration: 6,
      blocks: [
        P('Tumbuhan memiliki bagian yang masing-masing berfungsi. Akar menyerap air, batang menopang, daun membuat makanan, bunga menjadi buah, dan buah berisi biji.'),
        L('Akar: menyerap air dari tanah', 'Batang: menopang daun dan bunga', 'Daun: membuat makanan dengan bantuan cahaya', 'Buah: tempat biji'),
      ],
    },
    {
      title: 'Membedakan Hewan dan Tumbuhan', duration: 6,
      blocks: [
        P('Hewan dan tumbuhan sama-sama makhluk hidup: keduanya tumbuh dan berkembang. Bedanya, hewan biasanya bergerak bebas dan mencari makan, sedangkan tumbuhan umumnya menetap dan membuat makanannya sendiri.'),
        S('Hewan dapat bergerak dan mencari makan; tumbuhan umumnya menetap dan membuat makanan sendiri. Keduanya membutuhkan air, udara, dan makanan untuk hidup.'),
      ],
    },
  ],

  'sd-1-berhitung': [
    {
      title: 'Bilangan 1 sampai 20', duration: 6,
      blocks: [
        P('Bilangan digunakan untuk menyebut jumlah. Kita dapat menghitung benda satu per satu sampai dua puluh, lalu menuliskannya dengan angka.'),
        L('1-5: satu, dua, tiga, empat, lima', '6-10: enam, tujuh, delapan, sembilan, sepuluh', '11-20: sebelas sampai dua puluh'),
        C('Gunakan benda seperti kancing atau biji untuk menghitung. Menyentuh benda sambil menghitung membantu anak memahami bahwa angka berarti jumlah.'),
      ],
    },
    {
      title: 'Menjumlahkan Bilangan Kecil', duration: 6,
      blocks: [
        P('Penjumlahan berarti menggabungkan dua kelompok benda. Jika ada 3 apel lalu ditambah 2 apel, jumlahnya menjadi 5 apel. Tanda tambah dipakai untuk operasi ini.'),
        P('Contoh lain: 6 + 4 = 10. Kita bisa menghitung dengan menyambung dari bilangan pertama: setelah 6 ada 7, 8, 9, 10, jadi empat langkah.'),
      ],
    },
    {
      title: 'Mengurutkan dan Membandingkan', duration: 5,
      blocks: [
        P('Bilangan dapat diurut dari yang terkecil ke terbesar, atau dibandingkan. Tanda kurang dari berarti lebih kecil, tanda lebih dari berarti lebih besar, dan tanda sama dengan berarti nilainya sama.'),
        L('7 < 9 (tujuh kurang dari sembilan)', '12 > 10 (dua belas lebih dari sepuluh)', '5 = 5 (lima sama dengan lima)'),
        S('Menghitung, menjumlahkan, dan membandingkan bilangan sampai 20 adalah dasar berhitung. Latihan dengan benda nyata membuat konsep ini mudah dipahami.'),
      ],
    },
  ],

  'sd-2-membaca': [
    {
      title: 'Dari Suku Kata ke Kata', duration: 6,
      blocks: [
        P('Kata terbentuk dari suku kata. Suku kata adalah potongan kata yang diucapkan dalam satu hembusan napas, misalnya ma, kan, sehingga terbentuk kata makan.'),
        L('ma + kan = makan', 'bo + la = bola', 'ku + ci + ng = kucing'),
      ],
    },
    {
      title: 'Kalimat Pendek yang Jelas', duration: 6,
      blocks: [
        P('Kalimat adalah rangkaian kata yang menyampaikan satu gagasan lengkap. Kalimat diawali huruf kapital dan diakhiri tanda titik.'),
        L('Aku membaca buku.', 'Ibu memasak di dapur.', 'Kucing tidur di sofa.'),
        C('Setelah membaca, tanyakan siapa dan apa dari kalimat tersebut. Kebiasaan ini melatih pemahaman, bukan hanya kelancaran membaca.'),
      ],
    },
    {
      title: 'Menemukan Kata Kunci', duration: 6,
      blocks: [
        P('Kata kunci adalah kata yang paling penting dalam kalimat atau paragraf. Kata kunci membantu kita mengingat isi bacaan singkat.'),
        P('Pada kalimat Andi membeli buku di toko, kata kuncinya adalah Andi, buku, dan toko. Ketiga kata itu sudah cukup untuk mengingat isi kalimat.'),
        S('Membaca dimulai dari suku kata, lalu kata, lalu kalimat. Menemukan kata kunci membantu memahami dan mengingat isi bacaan.'),
      ],
    },
  ],

  'sd-3-alam': [
    {
      title: 'Cuaca dan Musim', duration: 6,
      blocks: [
        P('Cuaca adalah keadaan udara pada suatu waktu, seperti cerah, hujan, berawan, atau berangin. Musim adalah pola cuaca yang berulang selama beberapa bulan.'),
        L('Indonesia memiliki dua musim utama: kemarau dan penghujan', 'Musim kemarau: curah hujan rendah', 'Musim penghujan: curah hujan tinggi'),
      ],
    },
    {
      title: 'Bagian Tubuh Hewan', duration: 6,
      blocks: [
        P('Setiap hewan memiliki bagian tubuh yang membantu mereka hidup. Kaki untuk bergerak, mata untuk melihat, telinga untuk mendengar, dan paruh atau mulut untuk makan.'),
        L('Burung: sayap untuk terbang, paruh untuk makan', 'Ikan: sirip untuk berenang, insang untuk bernapas', 'Kucing: kaki untuk berjalan, kumis untuk mengukur ruang'),
      ],
    },
    {
      title: 'Kebutuhan Tumbuhan', duration: 6,
      blocks: [
        P('Tumbuhan membutuhkan air, cahaya matahari, udara, dan tanah subur untuk tumbuh. Jika salah satu tidak ada, tumbuhan akan layu.'),
        C('Coba tanam biji kacang di kapas basah. Amati setiap hari bagaimana akar muncul lebih dulu, lalu tunas.'),
        S('Cuaca berubah setiap hari, musim berulang setiap tahun. Hewan dan tumbuhan memiliki bagian tubuh serta kebutuhan yang sesuai dengan lingkungannya.'),
      ],
    },
  ],

  'sd-4-operasi': [
    {
      title: 'Penjumlahan dan Pengurangan', duration: 6,
      blocks: [
        P('Penjumlahan menggabungkan jumlah, pengurangan mengambil sebagian dari jumlah. Keduanya saling berlawanan: 8 + 5 = 13 dan 13 - 5 = 8.'),
        L('24 + 15 = 39', '50 - 18 = 32', '100 - 47 = 53'),
      ],
    },
    {
      title: 'Perkalian sebagai Penjumlahan Berulang', duration: 6,
      blocks: [
        P('Perkalian adalah penjumlahan yang diulang. Tiga dikali empat berarti tiga ditambah empat kali, sehingga hasilnya dua belas.'),
        L('2 × 5 = 10', '3 × 4 = 12', '6 × 7 = 42'),
        C('Hafalkan perkalian dasar satu sampai sepuluh. Jika lupa, kembali ke penjumlahan berulang untuk memeriksa hasil.'),
      ],
    },
    {
      title: 'Pembagian sebagai Pembagian Rata', duration: 6,
      blocks: [
        P('Pembagian membagi suatu jumlah menjadi bagian-bagian yang sama besar. Dua belas dibagi tiga berarti dua belas dibagi rata ke tiga kelompok, sehingga setiap kelompok mendapat empat.'),
        L('12 : 3 = 4', '20 : 4 = 5', '45 : 5 = 9'),
        S('Penjumlahan, pengurangan, perkalian, dan pembagian saling terkait. Perkalian adalah penjumlahan berulang, pembagian adalah kebalikan perkalian.'),
      ],
    },
  ],

  'sd-5-lingkungan': [
    {
      title: 'Keragaman Budaya Indonesia', duration: 6,
      blocks: [
        P('Indonesia terdiri dari banyak suku, bahasa, dan budaya. Keragaman ini terlihat pada pakaian adat, tarian, makanan, dan rumah tradisional di setiap daerah.'),
        L('Baju adat: kebaya, beskap, ulos', 'Tarian: tari pendet, tari piring, jaipongan', 'Makanan: rendang, gudeg, soto'),
      ],
    },
    {
      title: 'Manusia dan Lingkungan', duration: 6,
      blocks: [
        P('Manusia memanfaatkan lingkungan untuk makan, tempat tinggal, dan kegiatan ekonomi. Sebaliknya, lingkungan juga dipengaruhi oleh kegiatan manusia, seperti pencemaran dan penebangan hutan.'),
        L('Kegiatan yang merusak: membuang sampah sembarangan, menebang hutan liar', 'Kegiatan yang menjaga: menanam pohon, daur ulang, menghemat air'),
      ],
    },
    {
      title: 'Menjaga Kebersihan Lingkungan', duration: 6,
      blocks: [
        P('Kebersihan lingkungan dimulai dari hal kecil di rumah dan sekolah. Memilah sampah organik dan anorganik membuat sampah lebih mudah diolah.'),
        C('Mulai dari meja belajarmu sendiri. Kebiasaan kecil yang dilakukan setiap hari lebih berpengaruh daripada aksi besar yang hanya sekali.'),
        S('Indonesia kaya akan keragaman budaya. Kegiatan manusia berdampak pada lingkungan, sehingga kita perlu menjaganya dengan kebiasaan sederhana dan konsisten.'),
      ],
    },
  ],

  'sd-6-pecahan': [
    {
      title: 'Mengenal Pecahan Biasa', duration: 6,
      blocks: [
        P('Pecahan menunjukkan bagian dari keseluruhan. Pecahan setengah berarti satu bagian dari dua bagian yang sama besar. Angka atas disebut pembilang, angka bawah disebut penyebut.'),
        L('1/2: setengah', '1/3: sepertiga', '1/4: seperempat', '3/4: tiga perempat'),
      ],
    },
    {
      title: 'Membandingkan Pecahan', duration: 6,
      blocks: [
        P('Jika penyebut sama, pecahan dengan pembilang lebih besar itulah yang lebih besar, misalnya 3/5 lebih besar dari 2/5. Jika penyebut berbeda, samakan penyebutnya terlebih dahulu.'),
        P('Contoh: 1/2 dan 2/4 sama besar. Kita dapat menyamakan penyebut menjadi 4, sehingga 1/2 = 2/4.'),
      ],
    },
    {
      title: 'Pecahan dari Jumlah Benda', duration: 6,
      blocks: [
        P('Untuk mencari seperempat dari 20 benda, bagi 20 dengan 4, hasilnya 5. Jadi seperempat dari 20 adalah 5 benda.'),
        L('1/2 dari 12 = 6', '1/3 dari 15 = 5', '1/5 dari 30 = 6'),
        S('Pecahan menggambarkan bagian dari keseluruhan. Membandingkan pecahan lebih mudah jika penyebutnya disamakan, dan pecahan dari jumlah dihitung dengan pembagian.'),
      ],
    },
  ],

  'smp-7-matematika': [
    {
      title: 'Bilangan Bulat dan Rasional', duration: 7,
      blocks: [
        P('Bilangan bulat mencakup bilangan positif, nol, dan negatif. Bilangan rasional adalah bilangan yang dapat ditulis sebagai perbandingan dua bilangan bulat, seperti 1/2 atau 0,25.'),
        L('Bilangan bulat: -3, -2, -1, 0, 1, 2, 3', 'Bilangan rasional: 1/2, 3/4, -2/5, 0,25'),
        C('Pada garis bilangan, bilangan negatif terletak di sebelah kiri nol. Semakin ke kanan, nilai bilangan semakin besar.'),
      ],
    },
    {
      title: 'Bentuk Aljabar', duration: 7,
      blocks: [
        P('Aljabar menggunakan huruf untuk mewakili bilangan yang belum diketahui. Suku sejenis dapat digabung, misalnya 3x + 2x = 5x.'),
        L('4a + 3a = 7a', '6b - 2b = 4b', '2(x + 3) = 2x + 6'),
      ],
    },
    {
      title: 'Luas dan Volume Bangun Sederhana', duration: 7,
      blocks: [
        P('Luas adalah ukuran permukaan, sedangkan volume adalah ukuran ruang yang ditempati benda. Keduanya dihitung dengan rumus yang bergantung pada bentuk bangunnya.'),
        L('Luas persegi panjang = panjang × lebar', 'Luas segitiga = 1/2 × alas × tinggi', 'Volume kubus = sisi × sisi × sisi'),
        S('Bilangan bulat dan rasional menjadi dasar aljabar. Suku sejenis bisa digabung, dan rumus luas serta volume dipakai untuk mengukur bangun geometri.'),
      ],
    },
  ],

  'smp-8-ipa': [
    {
      title: 'Sistem Organ Tubuh', duration: 7,
      blocks: [
        P('Tubuh manusia terdiri dari beberapa sistem organ yang bekerja sama. Sistem pencernaan mengolah makanan, sistem peredaran darah mengangkut oksigen dan nutrisi, dan sistem saraf mengoordinasikan tubuh.'),
        L('Sistem pencernaan: mulut, kerongkongan, lambung, usus', 'Sistem peredaran darah: jantung, pembuluh darah, darah', 'Sistem saraf: otak, sumsum tulang belakang, saraf'),
      ],
    },
    {
      title: 'Perpindahan Energi', duration: 7,
      blocks: [
        P('Energi tidak dapat diciptakan atau dimusnahkan, hanya berpindah atau berubah bentuk. Energi listrik dapat berubah menjadi energi cahaya pada lampu, atau energi panas pada setrika.'),
        L('Energi kinetik: energi karena gerak', 'Energi potensial: energi karena posisi', 'Energi panas, cahaya, listrik, dan bunyi'),
      ],
    },
    {
      title: 'Klasifikasi Makhluk Hidup', duration: 7,
      blocks: [
        P('Makhluk hidup dikelompokkan berdasarkan persamaan ciri. Tingkat klasifikasi dari yang paling luas adalah kingdom, filum, kelas, ordo, famili, genus, dan spesies.'),
        L('Kingdom: hewan, tumbuhan, jamur, protista, monera', 'Spesies adalah tingkat paling spesifik', 'Persamaan ciri menentukan kelompoknya'),
        S('Sistem organ bekerja sama menjaga tubuh. Energi berubah bentuk tetapi tidak hilang, dan makhluk hidup dikelompokkan berdasarkan persamaan ciri.'),
      ],
    },
  ],

  'smp-9-ips': [
    {
      title: 'Membaca Linimasa Sejarah', duration: 6,
      blocks: [
        P('Linimasa menampilkan peristiwa berdasarkan urutan waktunya. Membaca linimasa membantu memahami sebab-akibat dan kronologi suatu peristiwa.'),
        L('1945: Proklamasi Kemerdekaan', '1949: Pengakuan kedaulatan', '1966: Orde Baru dimulai', '1998: Reformasi'),
      ],
    },
    {
      title: 'Letak Geografis Indonesia', duration: 6,
      blocks: [
        P('Indonesia terletak di antara Benua Asia dan Australia serta Samudra Hindia dan Pasifik. Posisi ini menjadikan Indonesia persimpangan jalur perdagangan dan memiliki iklim tropis.'),
        L('Lintang: 6 derajat LU sampai 11 derajat LS', 'Bujur: 95 derajat BT sampai 141 derajat BT', 'Iklim tropis: musim kemarau dan penghujan'),
      ],
    },
    {
      title: 'Kegiatan Ekonomi Dasar', duration: 6,
      blocks: [
        P('Kegiatan ekonomi meliputi produksi, distribusi, dan konsumsi. Produksi menghasilkan barang, distribusi menyalurkannya, dan konsumsi adalah penggunaan barang oleh masyarakat.'),
        L('Produksi: petani menanam padi', 'Distribusi: pedagang mengirim beras ke pasar', 'Konsumsi: pembeli membeli beras'),
        S('Linimasa membantu memahami urutan sejarah. Letak geografis memengaruhi iklim dan perdagangan, sedangkan kegiatan ekonomi terdiri dari produksi, distribusi, dan konsumsi.'),
      ],
    },
  ],

  'sma-10-matematika': [
    {
      title: 'Konsep Fungsi', duration: 7,
      blocks: [
        P('Fungsi adalah relasi yang memetakan setiap anggota himpunan A tepat satu kali ke anggota himpunan B. Ditulis f(x), fungsi memberi nilai keluaran untuk setiap nilai masukan x.'),
        L('f(x) = 2x + 3', 'Jika x = 2, maka f(2) = 2(2) + 3 = 7', 'Grafik fungsi linear berupa garis lurus'),
      ],
    },
    {
      title: 'Persamaan Linear', duration: 7,
      blocks: [
        P('Persamaan linear satu variabel berbentuk ax + b = 0. Penyelesaiannya diperoleh dengan memindahkan konstanta dan membagi koefisien.'),
        L('3x - 6 = 0 menghasilkan x = 2', '2x + 4 = 10 menghasilkan x = 3', 'Sistem dua persamaan diselesaikan dengan substitusi atau eliminasi'),
      ],
    },
    {
      title: 'Logika Matematika', duration: 7,
      blocks: [
        P('Logika matematika mempelajari pernyataan dan hubungannya. Pernyataan majemuk menggunakan kata hubung dan, atau, jika maka, serta jika dan hanya jika.'),
        L('p dan q: benar jika keduanya benar', 'p atau q: benar jika salah satu benar', 'implikasi p maka q: salah hanya jika p benar dan q salah'),
        S('Fungsi memetakan masukan ke keluaran. Persamaan linear diselesaikan dengan operasi algebra, dan logika mengatur hubungan antarpernyataan.'),
      ],
    },
  ],

  'sma-11-fisika': [
    {
      title: 'Gerak Lurus', duration: 7,
      blocks: [
        P('Gerak lurus terjadi ketika benda bergerak sepanjang garis lurus. Gerak lurus beraturan memiliki kecepatan tetap, sedangkan gerak lurus berubah beraturan memiliki percepatan tetap.'),
        L('Kecepatan = jarak / waktu', 'Percepatan = perubahan kecepatan / waktu', 'Gerak lurus beraturan: kecepatan tetap; gerak lurus berubah beraturan: percepatan tetap'),
      ],
    },
    {
      title: 'Hukum Newton tentang Gerak', duration: 7,
      blocks: [
        P('Hukum I Newton menyatakan bahwa benda akan tetap diam atau bergerak lurus beraturan jika resultan gaya padanya nol. Hukum II dirumuskan F = m × a. Hukum III menyatakan setiap gaya aksi memiliki gaya reaksi yang sama besar dan berlawanan arah.'),
        L('Hukum I: kelembaman', 'Hukum II: F = m × a', 'Hukum III: aksi-reaksi'),
      ],
    },
    {
      title: 'Sifat Gelombang', duration: 7,
      blocks: [
        P('Gelombang adalah gangguan yang merambat dan membawa energi. Gelombang transversal memiliki arah getar tegak lurus arah rambat, sedangkan gelombang longitudinal sejajar arah rambat.'),
        L('Transversal: gelombang air, cahaya', 'Longitudinal: gelombang bunyi', 'Besaran: panjang gelombang, frekuensi, periode, amplitudo'),
        S('Gerak lurus dibedakan berdasarkan kecepatan dan percepatannya. Hukum Newton menjelaskan hubungan gaya dan gerak, sedangkan gelombang membawa energi tanpa memindahkan medium secara permanen.'),
      ],
    },
  ],

  'sma-12-literasi': [
    {
      title: 'Menemukan Argumen Utama', duration: 7,
      blocks: [
        P('Argumen utama adalah gagasan pokok yang ingin disampaikan penulis. Argumen ini biasanya didukung oleh alasan, data, atau contoh yang tersebar di beberapa paragraf.'),
        C('Tanyakan: apa yang ingin dibuktikan penulis? Jawaban itu biasanya menjadi argumen utama, bukan kalimat pertama yang kebetulan muncul.'),
      ],
    },
    {
      title: 'Membedakan Fakta dan Opini', duration: 7,
      blocks: [
        P('Fakta adalah pernyataan yang dapat dibuktikan kebenarannya dengan data atau pengamatan. Opini adalah pendapat atau penilaian yang belum tentu benar bagi semua orang.'),
        L('Fakta: air membeku pada suhu 0 derajat Celsius', 'Opini: air dingin lebih menyegarkan'),
      ],
    },
    {
      title: 'Menyusun Simpulan Logis', duration: 7,
      blocks: [
        P('Simpulan adalah kesimpulan akhir yang ditarik dari rangkaian informasi. Simpulan yang baik tidak menambahkan informasi baru dan tidak bertentangan dengan isi teks.'),
        L('Simpulan harus sesuai dengan bukti', 'Hindari simpulan terlalu luas dari data yang ada', 'Periksa kembali apakah semua kalimat mendukung simpulan'),
        S('Membaca kritis berarti mencari argumen utama, memisahkan fakta dari opini, dan menarik simpulan yang didukung bukti di dalam teks.'),
      ],
    },
  ],

  'snbt-penalaran-umum': [
    {
      title: 'Penalaran Induktif', duration: 8,
      blocks: [
        P('Penalaran induktif menarik prinsip umum dari beberapa fakta atau contoh khusus. Misalnya, setelah mengamati beberapa logam yang memuai saat dipanaskan, kita menyimpulkan bahwa logam umumnya memuai ketika panas.'),
        C('Kesimpulan induktif bersifat mungkin, bukan pasti. Semakin banyak contoh yang mendukung, semakin kuat kesimpulannya.'),
      ],
    },
    {
      title: 'Penalaran Deduktif', duration: 8,
      blocks: [
        P('Penalaran deduktif menarik kesimpulan dari pernyataan umum yang sudah dianggap benar. Jika premis benar dan aturannya sah, maka kesimpulannya pasti benar.'),
        L('Premis 1: semua siswa kelas XII mengikuti ujian', 'Premis 2: Rani adalah siswa kelas XII', 'Kesimpulan: Rani mengikuti ujian'),
      ],
    },
    {
      title: 'Penalaran Kuantitatif', duration: 8,
      blocks: [
        P('Penalaran kuantitatif memecahkan masalah dengan hubungan angka. Termasuk di dalamnya adalah pola bilangan, perbandingan, persentase, dan penalaran proporsional.'),
        L('Pola: 2, 6, 18, 54, yaitu dikalikan 3', 'Perbandingan: jika 3 buku harga Rp45.000, maka 5 buku harga Rp75.000'),
        S('Induktif membangun prinsip dari contoh, deduktif menurunkan kesimpulan dari premis, dan kuantitatif memakai hubungan angka. Ketiganya diuji dalam subtes Penalaran Umum UTBK.'),
      ],
    },
  ],

  'snbt-pengetahuan-umum': [
    {
      title: 'Pengetahuan Leksikal', duration: 6,
      blocks: [
        P('Soal leksikal menguji makna kata dalam konteks. Arti sebuah kata dapat berubah tergantung kalimatnya, sehingga penting membaca seluruh kalimat sebelum memilih jawaban.'),
        L('Kecil pada kecil hati berarti sedih, bukan berukuran kecil', 'Naik pada naik pangkat berarti meningkat, bukan bergerak ke atas'),
      ],
    },
    {
      title: 'Memahami Informasi', duration: 6,
      blocks: [
        P('Bagian ini menguji kemampuan memahami informasi dari teks pendek dan bacaan panjang. Fokusnya adalah menangkap ide pokok, informasi tersurat, dan hubungan antarkalimat.'),
        C('Baca pertanyaan terlebih dahulu, lalu cari kata kuncinya di teks. Cara ini menghemat waktu dibanding membaca seluruh teks tanpa tujuan.'),
      ],
    },
    {
      title: 'Konteks Sosial dan Budaya Indonesia', duration: 6,
      blocks: [
        P('Subtes ini juga menguji pengetahuan tentang kehidupan masyarakat Indonesia, seperti nilai sosial, norma, budaya, dan peristiwa sejarah yang relevan.'),
        L('Nilai sosial: gotong royong, musyawarah, toleransi', 'Norma: adat, agama, hukum, kesopanan'),
        S('Pengetahuan dan Pemahaman Umum menguji makna kata, pemahaman informasi, dan wawasan sosial budaya. Konteks kalimat menjadi penentu utama jawaban yang tepat.'),
      ],
    },
  ],

  'snbt-pemahaman-bacaan': [
    {
      title: 'Pemilihan Gagasan', duration: 7,
      blocks: [
        P('Bagian pemilihan menguji kesesuaian judul, kalimat topik, dan diksi dengan isi paragraf. Jawaban yang baik harus mencakup seluruh isi, bukan hanya sebagian.'),
        C('Jika ada dua pilihan yang hampir sama, pilih yang paling luas cakupannya dan tidak menambahkan informasi yang tidak ada di teks.'),
      ],
    },
    {
      title: 'Penataan Gagasan', duration: 7,
      blocks: [
        P('Penataan menguji urutan kalimat agar paragraf menjadi padu. Perhatikan kata penghubung, rujukan kata ganti, dan urutan sebab-akibat.'),
        L('Kata penghubung: karena, sehingga, namun, selain itu', 'Kata ganti: ini, tersebut, dia merujuk ke kalimat sebelumnya'),
      ],
    },
    {
      title: 'Perbaikan Gagasan', duration: 7,
      blocks: [
        P('Bagian perbaikan meminta perbaikan kalimat yang mubazir, tidak baku, atau tidak logis. Kalimat yang baik efektif, jelas, dan sesuai kaidah bahasa Indonesia.'),
        L('Mubazir: setiap hari selalu menjadi setiap hari', 'Tidak baku: di mimpi menjadi dalam mimpi', 'Tidak logis: ia lari karena duduk, perlu diperbaiki hubungan sebab-akibatnya'),
        S('Pemahaman Bacaan dan Menulis menguji pemilihan, penataan, dan perbaikan gagasan. Kunci jawabannya adalah kesesuaian dengan teks dan kaidah kebahasaan.'),
      ],
    },
  ],

  'snbt-pengetahuan-kuantitatif': [
    {
      title: 'Bilangan dan Aljabar', duration: 7,
      blocks: [
        P('Subtes ini menguji operasi bilangan, perbandingan, persentase, serta manipulasi bentuk aljabar. Kecermatan membaca soal lebih penting daripada kecepatan menghitung.'),
        L('25% dari 80 adalah 20', 'Jika 2x + 5 = 17, maka x = 6'),
      ],
    },
    {
      title: 'Geometri dan Pengukuran', duration: 7,
      blocks: [
        P('Soal geometri mencakup luas, keliling, volume, dan sudut. Pahami rumus dasar serta cara menerapkannya pada bangun gabungan.'),
        L('Luas lingkaran = π × r × r', 'Volume balok = panjang × lebar × tinggi', 'Jumlah sudut segitiga = 180 derajat'),
      ],
    },
    {
      title: 'Analisis Data dan Peluang', duration: 7,
      blocks: [
        P('Analisis data mencakup rata-rata, median, modus, dan pembacaan grafik. Peluang mengukur kemungkinan suatu kejadian terjadi.'),
        L('Rata-rata = jumlah data / banyak data', 'Median = nilai tengah setelah data diurutkan', 'Peluang = jumlah kejadian yang diinginkan / jumlah semua kejadian'),
        S('Pengetahuan Kuantitatif mencakup bilangan, aljabar, geometri, analisis data, dan peluang. Kuasai rumus dasar dan periksa kewajaran hasil.'),
      ],
    },
  ],

  'snbt-literasi-indonesia': [
    {
      title: 'Teks Konteks Saintek', duration: 8,
      blocks: [
        P('Teks sains dan teknologi menyajikan fakta, data, dan penjelasan proses. Pembaca perlu membedakan antara temuan ilmiah, interpretasi penulis, dan spekulasi.'),
        C('Perhatikan kata kerja seperti menyimpulkan, mengamati, dan berhipotesis. Kata-kata ini menunjukkan status informasi di dalam teks.'),
      ],
    },
    {
      title: 'Teks Konteks Sosial Humaniora', duration: 8,
      blocks: [
        P('Teks sosial humaniora membahas masyarakat, budaya, sejarah, dan politik. Pembaca diajak menilai argumen, sudut pandang, dan nilai yang mendasari pendapat penulis.'),
        L('Perhatikan siapa yang bersuara dan apa kepentingannya', 'Bedakan deskripsi dari penilaian'),
      ],
    },
    {
      title: 'Teks Konteks Personal', duration: 8,
      blocks: [
        P('Teks personal berupa pengalaman, refleksi, atau sastra. Fokusnya adalah makna yang dibangun penulis melalui pilihan kata, nada, dan sudut pandang.'),
        L('Nada: optimis, pesimistis, reflektif, humor', 'Makna tersirat sering muncul pada pilihan diksi'),
        S('Literasi Bahasa Indonesia UTBK memakai teks saintek, sosial humaniora, dan personal. Pembaca harus menemukan informasi, menilai argumen, dan merefleksikan makna.'),
      ],
    },
  ],

  'snbt-literasi-inggris': [
    {
      title: 'Main Idea and Details', duration: 7,
      blocks: [
        P('English literacy questions ask for the main idea of a passage and its supporting details. The main idea is usually stated in the topic sentence, but it can also be implied across several sentences.'),
        L('Topic sentence states the main point', 'Supporting details include examples, facts, and explanations'),
      ],
    },
    {
      title: 'Inference and Tone', duration: 7,
      blocks: [
        P('Inference questions ask what the text suggests but does not state directly. Tone questions ask about the author attitude, such as formal, critical, or optimistic.'),
        C('Base your inference only on the text. An answer that is true in real life but unsupported by the passage is not correct.'),
      ],
    },
    {
      title: 'Vocabulary in Context', duration: 7,
      blocks: [
        P('Vocabulary questions ask the meaning of a word as it is used in the passage. A word can have several meanings, so read the whole sentence before choosing.'),
        L('Bear can mean to carry or an animal', 'Fine can mean good or a penalty'),
        S('SNBT English literacy tests main idea, details, inference, tone, and vocabulary in context. Always ground answers in the text.'),
      ],
    },
  ],

  'snbt-penalaran-matematika': [
    {
      title: 'Merumuskan Model Matematika', duration: 8,
      blocks: [
        P('Penalaran Matematika UTBK menekankan penerapan, bukan sekadar hitungan. Langkah pertamanya adalah mengubah situasi nyata menjadi model matematika berupa variabel, persamaan, atau fungsi.'),
        L('Misalkan harga tiket = x', 'Total biaya untuk 4 tiket = 4x', 'Jika ada diskon 10%, model menjadi 4x × 0,9'),
      ],
    },
    {
      title: 'Menggunakan Model untuk Memecahkan Masalah', duration: 8,
      blocks: [
        P('Setelah model terbentuk, selesaikan dengan strategi yang sesuai: substitusi, eliminasi, perbandingan, atau uji coba terarah.'),
        C('Periksa kembali apakah jawaban sudah menjawab pertanyaan yang diminta, bukan hanya nilai variabel antara.'),
      ],
    },
    {
      title: 'Mengevaluasi Kewajaran Hasil', duration: 8,
      blocks: [
        P('Langkah terakhir adalah menilai apakah hasil masuk akal dalam konteks soal. Misalnya, jumlah orang tidak mungkin bernilai pecahan dan harga tidak boleh negatif.'),
        L('Cek satuan: jam, rupiah, kilometer', 'Cek rentang: apakah hasil terlalu besar atau kecil?', 'Cek konsistensi dengan data di soal'),
        S('Penalaran Matematika mengikuti alur: merumuskan model, menggunakan model, lalu mengevaluasi hasil. Konteks nyata menjadi penentu kewajaran jawaban.'),
      ],
    },
  ],

  'skd-twk': [
    {
      title: 'Nasionalisme, Integritas, dan Bela Negara', duration: 8,
      blocks: [
        P('TWK menguji wawasan kebangsaan. Nasionalisme adalah kesadaran akan identitas dan kepentingan bangsa. Integritas berarti konsistensi antara kata dan tindakan berdasarkan nilai moral. Bela negara adalah sikap serta tindakan membangun dan mempertahankan negara.'),
        L('Nasionalisme: bangga menggunakan produk dalam negeri', 'Integritas: jujur dalam melaksanakan tugas', 'Bela negara: menjaga kedaulatan dan persatuan'),
      ],
    },
    {
      title: 'Empat Konsensus Kebangsaan', duration: 8,
      blocks: [
        P('Empat konsensus kebangsaan adalah Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika. Keempatnya menjadi dasar penyelenggaraan negara Indonesia.'),
        L('Pancasila: dasar negara dengan lima sila', 'UUD 1945: konstitusi tertulis', 'NKRI: bentuk negara kesatuan', 'Bhinneka Tunggal Ika: semboyan persatuan dalam keragaman'),
      ],
    },
    {
      title: 'Bahasa Indonesia dalam TWK', duration: 8,
      blocks: [
        P('TWK juga menguji penggunaan Bahasa Indonesia yang baik dan benar, termasuk ejaan, tata baku, dan kesesuaian makna kata.'),
        L('Baku: menggunakan, bukan pakai', 'Ejaan: di mana berbeda dengan dimana', 'Makna: pilih kata sesuai konteks kalimat'),
        S('TWK SKD mencakup nasionalisme, integritas, bela negara, empat konsensus kebangsaan, dan Bahasa Indonesia. Pemahaman nilai lebih utama daripada hafalan angka.'),
      ],
    },
  ],

  'skd-tiu': [
    {
      title: 'Kemampuan Verbal', duration: 8,
      blocks: [
        P('TIU verbal menguji penguasaan kata dan penalaran logis berbasis bahasa. Termasuk sinonim, antonim, analogi, silogisme, dan penalaran analitis.'),
        L('Sinonim: kata dengan makna sama atau mirip', 'Analogi: hubungan yang sepadan antara dua pasangan kata', 'Silogisme: penarikan kesimpulan dari dua premis'),
      ],
    },
    {
      title: 'Kemampuan Numerik', duration: 8,
      blocks: [
        P('TIU numerik menguji kecepatan dan ketepatan menghitung, meliputi deret angka, aritmetika, aljabar, dan perbandingan kuantitatif.'),
        L('Deret: 3, 6, 12, 24, yaitu dikalikan 2', 'Perbandingan: 2 banding 3 sama dengan 8 banding 12', 'Persentase: 20% dari 250 adalah 50'),
      ],
    },
    {
      title: 'Kemampuan Figural', duration: 8,
      blocks: [
        P('TIU figural menguji penalaran terhadap gambar atau pola visual, seperti matriks, deret gambar, dan pembentukan bangun.'),
        C('Amati perubahan dari satu gambar ke gambar berikutnya: bentuk, jumlah, warna, dan posisi. Satu pola yang konsisten biasanya menjadi kunci.'),
        S('TIU SKD terdiri dari kemampuan verbal, numerik, dan figural. Latihan yang rutin membantu mengenali pola lebih cepat.'),
      ],
    },
  ],

  'skd-tkp': [
    {
      title: 'Pelayanan Publik', duration: 8,
      blocks: [
        P('TKP mengukur karakteristik pribadi dalam situasi kerja. Aspek pelayanan publik menekankan sikap ramah, responsif, berorientasi pada kepuasan masyarakat, dan kemauan membantu.'),
        L('Mendengarkan keluhan dengan sabar', 'Memberikan informasi yang jelas', 'Menindaklanjuti kebutuhan pengguna'),
      ],
    },
    {
      title: 'Jejaring Kerja dan Sosial Budaya', duration: 8,
      blocks: [
        P('Aspek jejaring kerja menguji kemampuan berkolaborasi, berbagi informasi, dan menghargai rekan kerja. Aspek sosial budaya menguji respons terhadap keragaman dan norma masyarakat.'),
        L('Berkolaborasi tanpa mengabaikan peran sendiri', 'Menghargai perbedaan pendapat', 'Menyesuaikan sikap dengan norma setempat'),
      ],
    },
    {
      title: 'TIK, Profesionalisme, dan Anti Radikalisme', duration: 8,
      blocks: [
        P('Aspek TIK menguji penggunaan teknologi secara etis dan bertanggung jawab. Profesionalisme menekankan komitmen, disiplin, dan peningkatan kompetensi. Anti radikalisme mengutamakan toleransi serta penolakan kekerasan.'),
        C('Pada soal TKP tidak ada jawaban salah mutlak. Pilih respons yang paling profesional, positif, dan sesuai nilai ASN.'),
        S('TKP SKD mengukur sikap dalam situasi kerja. Pilih jawaban yang menunjukkan pelayanan, kolaborasi, profesionalisme, serta penghargaan terhadap keragaman.'),
      ],
    },
  ],

  'tka-bahasa-indonesia': [
    {
      title: 'Teks Informasi dan Sastra', duration: 8,
      blocks: [
        P('TKA Bahasa Indonesia menguji kemampuan memahami teks informasi dan teks sastra. Teks informasi menekankan fakta dan struktur, sedangkan teks sastra menekankan makna, diksi, dan nilai.'),
        L('Teks informasi: ide pokok, fakta, urutan', 'Teks sastra: tokoh, alur, tema, amanat'),
      ],
    },
    {
      title: 'Kaidah Kebahasaan', duration: 8,
      blocks: [
        P('Kaidah kebahasaan mencakup ejaan, tanda baca, penggunaan kata baku, serta struktur kalimat yang efektif.'),
        L('Kata baku: menggunakan, bukan pakai', 'Ejaan: menggarisbawahi, bukan menggaris bawahi', 'Kalimat efektif: tidak mubazir'),
      ],
    },
    {
      title: 'Menyusun Argumen Tertulis', duration: 8,
      blocks: [
        P('Penulisan argumen yang baik diawali pernyataan pendapat, dilanjutkan alasan dan bukti, lalu diakhiri simpulan.'),
        C('Gunakan satu gagasan utama per paragraf. Paragraf yang berisi lebih dari satu gagasan sebaiknya dipisah.'),
        S('TKA Bahasa Indonesia menguji pemahaman teks, penguasaan kaidah kebahasaan, dan kemampuan menyusun argumen tertulis.'),
      ],
    },
  ],

  'tka-matematika': [
    {
      title: 'Bilangan dan Aljabar TKA', duration: 8,
      blocks: [
        P('TKA Matematika menguji kompetensi sesuai kurikulum jenjang. Materi meliputi bilangan, aljabar, geometri, analisis data, dan peluang dengan tingkat kesulitan menyesuaikan jenjang.'),
        L('Operasi bilangan dan pecahan', 'Persamaan dan pertidaksamaan linear', 'Barisan dan deret sederhana'),
      ],
    },
    {
      title: 'Geometri dan Pengukuran', duration: 8,
      blocks: [
        P('Soal geometri mencakup bangun datar dan ruang, sudut, serta pengukuran. Pahami rumus dan hubungan antarbangun.'),
        L('Keliling persegi = 4 × sisi', 'Luas jajargenjang = alas × tinggi', 'Volume tabung = π × r × r × tinggi'),
      ],
    },
    {
      title: 'Data dan Peluang', duration: 8,
      blocks: [
        P('Analisis data meliputi penyajian data dalam tabel dan grafik, serta ukuran pemusatan. Peluang menguji kemungkinan kejadian dalam percobaan sederhana.'),
        L('Rata-rata, median, modus', 'Grafik batang, garis, dan lingkaran', 'Peluang kejadian'),
        S('TKA Matematika menguji bilangan, aljabar, geometri, data, dan peluang sesuai jenjang. Pahami konsep, lalu terapkan dengan teliti.'),
      ],
    },
  ],

  'tka-bahasa-inggris': [
    {
      title: 'Reading Comprehension', duration: 8,
      blocks: [
        P('TKA Bahasa Inggris jenjang SMA menguji pemahaman teks melalui gagasan utama, informasi rinci, dan makna kata berdasarkan konteks.'),
        L('Skim for the main idea', 'Scan for specific details', 'Guess word meaning from context'),
      ],
    },
    {
      title: 'Structure and Vocabulary', duration: 8,
      blocks: [
        P('Bagian struktur menguji tata bahasa seperti tense, kata ganti, preposisi, dan pembentukan kata. Kosakata yang luas membantu memahami teks lebih cepat.'),
        L('Present, past, and future tense', 'Prepositions: in, on, at', 'Word forms: manage, manager, management'),
      ],
    },
    {
      title: 'Writing and Speaking', duration: 8,
      blocks: [
        P('TKA juga menilai kemampuan menulis teks singkat dan memahami percakapan. Perhatikan kesesuaian register dengan situasi, ejaan, dan tanda baca.'),
        C('Berlatihlah menulis satu paragraf singkat setiap hari tentang topik sederhana. Konsistensi lebih penting daripada panjang tulisan.'),
        S('TKA Bahasa Inggris menguji reading, structure, vocabulary, writing, dan speaking. Konteks dan latihan rutin menjadi kunci.'),
      ],
    },
  ],

  'tka-fisika': [
    {
      title: 'Gerak dan Gaya', duration: 8,
      blocks: [
        P('TKA Fisika menguji pemahaman konsep dan penerapan hukum fisika. Materi gerak mencakup kecepatan, percepatan, dan hukum Newton.'),
        L('Kecepatan = jarak / waktu', 'Percepatan = perubahan kecepatan / waktu', 'Gaya = massa × percepatan'),
      ],
    },
    {
      title: 'Energi dan Gelombang', duration: 8,
      blocks: [
        P('Energi mekanik adalah jumlah energi kinetik dan energi potensial. Gelombang membawa energi; besaran pentingnya adalah panjang gelombang, frekuensi, dan periode.'),
        L('Energi kinetik = 1/2 × massa × kecepatan kuadrat', 'Energi potensial = massa × g × tinggi', 'Kecepatan gelombang = panjang gelombang × frekuensi'),
      ],
    },
    {
      title: 'Penerapan dalam Soal Kontekstual', duration: 8,
      blocks: [
        P('Soal TKA sering membingkai konsep fisika dalam situasi sehari-hari, seperti mobil berhenti, benda jatuh, atau alat listrik. Ubah situasi menjadi besaran yang bisa dihitung.'),
        C('Tuliskan besaran yang diketahui dan ditanya sebelum menghitung. Ini mencegah kesalahan memakai rumus yang salah.'),
        S('TKA Fisika menguji gerak, gaya, energi, dan gelombang dalam konteks nyata. Kuasai rumus dasar dan nyatakan besaran dengan jelas.'),
      ],
    },
  ],

  'tka-biologi': [
    {
      title: 'Sel dan Genetika', duration: 8,
      blocks: [
        P('TKA Biologi menguji pemahaman makhluk hidup mulai dari sel. Sel adalah unit struktural dan fungsional makhluk hidup. Gen membawa informasi keturunan yang tersimpan dalam DNA.'),
        L('Sel hewan memiliki membran, sitoplasma, dan inti', 'Sel tumbuhan memiliki dinding sel dan kloroplas', 'DNA menghasilkan gen, gen menghasilkan protein'),
      ],
    },
    {
      title: 'Metabolisme dan Sistem Organ', duration: 8,
      blocks: [
        P('Metabolisme mencakup semua reaksi kimia dalam tubuh, seperti fotosintesis dan respirasi. Sistem organ bekerja sama untuk menjaga homeostasis.'),
        L('Fotosintesis: cahaya + karbon dioksida + air menghasilkan glukosa + oksigen', 'Respirasi: glukosa + oksigen menghasilkan energi + karbon dioksida + air'),
      ],
    },
    {
      title: 'Ekologi dan Evolusi', duration: 8,
      blocks: [
        P('Ekologi mempelajari hubungan makhluk hidup dengan lingkungannya, seperti rantai makanan dan daur biogeokimia. Evolusi menjelaskan perubahan makhluk hidup dari waktu ke waktu.'),
        L('Rantai makanan: produsen, konsumen, pengurai', 'Adaptasi membantu organisme bertahan', 'Seleksi alam mendorong evolusi'),
        S('TKA Biologi mencakup sel, genetika, metabolisme, sistem organ, ekologi, dan evolusi. Pahami hubungan sebab-akibat antarproses.'),
      ],
    },
  ],

  'internet-works': [
    {
      title: 'Browser, URL, dan DNS', duration: 7,
      blocks: [
        P('Saat mengetik alamat website, browser meminta alamat IP melalui DNS, semacam buku telepon internet. Setelah alamat diketahui, browser dapat menghubungi server yang menyimpan halaman tersebut.'),
        L('Browser: aplikasi untuk mengakses web', 'URL: alamat sumber daya di internet', 'DNS: menerjemahkan nama domain ke alamat IP'),
      ],
    },
    {
      title: 'Perjalanan Data dan HTTP', duration: 7,
      blocks: [
        P('Data dikirim dalam bentuk paket kecil melalui jaringan. Protokol HTTP mengatur aturan permintaan dan jawaban antara browser sebagai client dan server.'),
        L('Client meminta halaman, disebut request', 'Server mengirim halaman, disebut response', 'Paket data melewati beberapa perantara disebut router'),
      ],
    },
    {
      title: 'Keamanan Saat Browsing', duration: 7,
      blocks: [
        P('Koneksi aman ditandai dengan HTTPS dan gembok pada bilah alamat. Hindari mengisi data sensitif di situs yang tidak dikenal atau menggunakan jaringan Wi-Fi publik tanpa perlindungan.'),
        C('Periksa alamat domain dengan teliti. Situs palsu sering memakai nama yang mirip dengan situs resmi.'),
        S('Internet bekerja lewat browser, DNS, server, dan protokol HTTP. Data dikirim sebagai paket, dan keamanan koneksi perlu diperiksa sebelum membagikan informasi.'),
      ],
    },
  ],

  'teknologi-ai': [
    {
      title: 'Apa Itu Kecerdasan Buatan', duration: 7,
      blocks: [
        P('Kecerdasan buatan adalah sistem komputer yang dapat melakukan tugas yang biasanya membutuhkan kecerdasan manusia, seperti mengenali gambar, memahami bahasa, dan membuat keputusan berdasarkan data.'),
        L('Machine learning: AI belajar dari contoh data', 'Deep learning: jaringan saraf tiruan berlapis banyak', 'Contoh: asisten virtual, rekomendasi video, penerjemah'),
      ],
    },
    {
      title: 'Cara Kerja AI Sederhana', duration: 7,
      blocks: [
        P('AI dilatih dengan banyak contoh. Sistem mencari pola dalam data, lalu menggunakan pola itu untuk memprediksi hasil pada data baru.'),
        C('Kualitas hasil AI sangat bergantung pada kualitas data latih. Data yang bias menghasilkan hasil yang bias pula.'),
      ],
    },
    {
      title: 'Batas dan Risiko AI', duration: 7,
      blocks: [
        P('AI tidak memiliki pemahaman seperti manusia dan dapat salah. Risikonya antara lain informasi palsu, pelanggaran privasi, dan ketergantungan. AI sebaiknya dipakai sebagai alat bantu, bukan pengganti pertimbangan manusia.'),
        L('Selalu periksa fakta dari hasil AI', 'Jangan memasukkan data pribadi sensitif', 'Pahami batas kemampuan AI'),
        S('AI belajar dari data untuk mengenali pola dan membuat prediksi. Hasilnya perlu diverifikasi karena AI dapat salah dan memiliki batasan.'),
      ],
    },
  ],

  'teknologi-keamanan': [
    {
      title: 'Kata Sandi yang Kuat', duration: 7,
      blocks: [
        P('Kata sandi yang kuat panjang, unik, dan tidak mudah ditebak. Hindari tanggal lahir, nama, atau kata umum. Gunakan kata sandi berbeda untuk setiap akun.'),
        L('Minimal 12 karakter', 'Campuran huruf, angka, dan simbol', 'Pengelola kata sandi membantu mengingat'),
      ],
    },
    {
      title: 'Mendeteksi Penipuan Online', duration: 7,
      blocks: [
        P('Phishing adalah upaya menipu korban agar membuka tautan palsu atau memberikan data pribadi. Tanda-tandanya adalah pesan mendesak, alamat pengirim mencurigakan, dan tautan yang tidak sesuai dengan situs resmi.'),
        L('Jangan klik tautan dari sumber tidak dikenal', 'Periksa alamat pengirim', 'Hubungi pihak resmi jika ragu'),
      ],
    },
    {
      title: 'Verifikasi Dua Langkah', duration: 7,
      blocks: [
        P('Verifikasi dua langkah menambah lapisan keamanan setelah kata sandi. Biasanya berupa kode dari aplikasi autentikasi atau pesan singkat ke ponsel.'),
        C('Aktifkan verifikasi dua langkah pada akun penting seperti email dan media sosial. Ini adalah langkah tunggal paling efektif untuk melindungi akun.'),
        S('Keamanan digital dimulai dari kata sandi kuat, kewaspadaan terhadap phishing, dan verifikasi dua langkah. Kebiasaan kecil mencegah kerugian besar.'),
      ],
    },
  ],
}

export const questionContent: Record<string, QuestionSeed[]> = {
  'tk-warna-bentuk': [
    { prompt: 'Warna yang sama dengan warna daun adalah...', options: ['Merah', 'Kuning', 'Hijau', 'Biru'], correct: 'c', explanation: 'Daun umumnya berwarna hijau karena mengandung klorofil.' },
    { prompt: 'Benda yang berbentuk lingkaran adalah...', options: ['Buku', 'Piring', 'Pintu', 'Dadu'], correct: 'b', explanation: 'Piring memiliki bentuk lingkaran tanpa sudut.' },
    { prompt: 'Bentuk yang memiliki tiga sisi adalah...', options: ['Kotak', 'Lingkaran', 'Segitiga', 'Persegi panjang'], correct: 'c', explanation: 'Segitiga memiliki tiga sisi dan tiga sudut.' },
  ],
  'tk-angka-huruf': [
    { prompt: 'Angka yang menyatakan jumlah jari satu tangan adalah...', options: ['5', '6', '10', '4'], correct: 'a', explanation: 'Satu tangan memiliki lima jari.' },
    { prompt: "Huruf awal kata 'kucing' adalah...", options: ['A', 'K', 'S', 'B'], correct: 'b', explanation: 'Kata kucing diawali huruf K.' },
    { prompt: "Huruf awal kata 'meja' adalah...", options: ['M', 'N', 'E', 'J'], correct: 'a', explanation: 'Kata meja diawali huruf M.' },
  ],
  'tk-hewan-tumbuhan': [
    { prompt: 'Hewan yang bernapas dengan insang adalah...', options: ['Kucing', 'Ayam', 'Ikan', 'Sapi'], correct: 'c', explanation: 'Ikan mengambil oksigen dari air menggunakan insang.' },
    { prompt: 'Bagian tumbuhan yang menyerap air dari tanah adalah...', options: ['Daun', 'Akar', 'Bunga', 'Buah'], correct: 'b', explanation: 'Akar menyerap air dan mineral dari dalam tanah.' },
    { prompt: 'Persamaan hewan dan tumbuhan adalah...', options: ['Keduanya tidak bernapas', 'Keduanya makhluk hidup yang tumbuh', 'Keduanya dapat berpindah tempat', 'Keduanya membuat makanan sendiri'], correct: 'b', explanation: 'Hewan dan tumbuhan sama-sama makhluk hidup yang mengalami pertumbuhan.' },
  ],
  'sd-1-berhitung': [
    { prompt: 'Hasil dari 8 + 6 adalah...', options: ['12', '13', '14', '15'], correct: 'c', explanation: '8 + 6 = 14.' },
    { prompt: 'Tanda yang tepat untuk 9 ... 11 adalah...', options: ['>', '<', '=', '+'], correct: 'b', explanation: '9 lebih kecil dari 11, sehingga ditulis 9 < 11.' },
    { prompt: 'Urutan bilangan yang benar dari yang terkecil adalah...', options: ['8, 6, 7', '6, 7, 8', '7, 8, 6', '8, 7, 6'], correct: 'b', explanation: 'Urutan menaik dari yang terkecil adalah 6, 7, 8.' },
  ],
  'sd-2-membaca': [
    { prompt: "Suku kata yang benar untuk kata 'makan' adalah...", options: ['ma + kan', 'mak + an', 'ma + ka + n', 'm + akan'], correct: 'a', explanation: 'Kata makan terdiri dari dua suku kata, yaitu ma dan kan.' },
    { prompt: 'Kalimat yang ditulis dengan benar adalah...', options: ['aku membaca buku', 'Aku membaca buku.', 'aku Membaca buku.', 'Aku membaca buku'], correct: 'b', explanation: 'Kalimat diawali huruf kapital dan diakhiri tanda titik.' },
    { prompt: "Siapa yang memasak sup pada kalimat 'Ibu memasak sup di dapur'?", options: ['Ibu', 'Sup', 'Dapur', 'Kucing'], correct: 'a', explanation: 'Subjek atau pelaku pada kalimat tersebut adalah Ibu.' },
  ],
  'sd-3-alam': [
    { prompt: 'Dua musim utama di Indonesia adalah...', options: ['Panas dan dingin', 'Kemarau dan penghujan', 'Semi dan gugur', 'Hujan dan salju'], correct: 'b', explanation: 'Indonesia beriklim tropis dengan musim kemarau dan musim penghujan.' },
    { prompt: 'Alat bernapas ikan adalah...', options: ['Paruh', 'Insang', 'Sayap', 'Kumis'], correct: 'b', explanation: 'Ikan menggunakan insang untuk mengambil oksigen dari air.' },
    { prompt: 'Yang dibutuhkan tumbuhan untuk tumbuh adalah...', options: ['Air dan cahaya', 'Hanya air', 'Hanya tanah', 'Api dan angin'], correct: 'a', explanation: 'Tumbuhan membutuhkan air, cahaya, udara, dan tanah subur.' },
  ],
  'sd-4-operasi': [
    { prompt: 'Hasil dari 36 + 27 adalah...', options: ['53', '63', '64', '73'], correct: 'b', explanation: '36 + 27 = 63.' },
    { prompt: 'Hasil dari 7 × 8 adalah...', options: ['54', '56', '64', '48'], correct: 'b', explanation: '7 × 8 = 56.' },
    { prompt: '24 dibagi rata kepada 6 orang, setiap orang mendapat...', options: ['3', '4', '5', '6'], correct: 'b', explanation: '24 : 6 = 4.' },
  ],
  'sd-5-lingkungan': [
    { prompt: 'Contoh kegiatan yang merusak lingkungan adalah...', options: ['Menanam pohon', 'Membuang sampah ke sungai', 'Daur ulang kertas', 'Menghemat air'], correct: 'b', explanation: 'Membuang sampah ke sungai menyebabkan pencemaran air.' },
    { prompt: 'Tari pendet berasal dari daerah...', options: ['Jawa', 'Bali', 'Sumatera', 'Sulawesi'], correct: 'b', explanation: 'Tari pendet adalah tarian tradisional dari Bali.' },
    { prompt: 'Sampah organik adalah sampah yang...', options: ['Dapat membusuk', 'Terbuat dari plastik', 'Tidak bisa diolah', 'Selalu berbahaya'], correct: 'a', explanation: 'Sampah organik berasal dari makhluk hidup dan dapat terurai.' },
  ],
  'sd-6-pecahan': [
    { prompt: 'Pecahan 3/4 berarti...', options: ['Tiga dari empat bagian', 'Empat dari tiga bagian', 'Tiga ditambah empat', 'Tiga kali empat'], correct: 'a', explanation: 'Pembilang 3 menunjukkan tiga bagian dari penyebut 4 bagian.' },
    { prompt: 'Di antara berikut, pecahan yang paling besar adalah...', options: ['1/3', '1/2', '1/4', '1/5'], correct: 'b', explanation: 'Jika pembilang sama, penyebut terkecil menghasilkan nilai terbesar, yaitu 1/2.' },
    { prompt: 'Hasil dari seperempat dari 20 adalah...', options: ['4', '5', '6', '10'], correct: 'b', explanation: '20 : 4 = 5.' },
  ],
  'smp-7-matematika': [
    { prompt: 'Bilangan berikut yang bukan bilangan bulat adalah...', options: ['-5', '0', '1/2', '12'], correct: 'c', explanation: '1/2 adalah bilangan rasional, bukan bilangan bulat.' },
    { prompt: 'Hasil penyederhanaan 5x + 3x adalah...', options: ['8x', '8x²', '15x', '2x'], correct: 'a', explanation: 'Keduanya merupakan suku sejenis, sehingga 5x + 3x = 8x.' },
    { prompt: 'Luas segitiga dengan alas 10 cm dan tinggi 6 cm adalah...', options: ['16 cm²', '30 cm²', '60 cm²', '32 cm²'], correct: 'b', explanation: 'Luas = 1/2 × 10 × 6 = 30 cm².' },
  ],
  'smp-8-ipa': [
    { prompt: 'Organ yang bertugas memompa darah adalah...', options: ['Paru-paru', 'Jantung', 'Lambung', 'Ginjal'], correct: 'b', explanation: 'Jantung memompa darah ke seluruh tubuh.' },
    { prompt: 'Perubahan energi pada lampu yang menyala adalah...', options: ['Energi listrik menjadi energi cahaya', 'Energi cahaya menjadi energi listrik', 'Energi panas menjadi energi listrik', 'Energi bunyi menjadi energi cahaya'], correct: 'a', explanation: 'Lampu mengubah energi listrik menjadi energi cahaya, disertai sedikit panas.' },
    { prompt: 'Tingkat klasifikasi makhluk hidup yang paling spesifik adalah...', options: ['Kingdom', 'Filum', 'Spesies', 'Kelas'], correct: 'c', explanation: 'Urutan dari luas ke spesifik adalah kingdom, filum, kelas, ordo, famili, genus, spesies.' },
  ],
  'smp-9-ips': [
    { prompt: 'Proklamasi Kemerdekaan Indonesia terjadi pada tahun...', options: ['1942', '1945', '1949', '1966'], correct: 'b', explanation: 'Proklamasi Kemerdekaan dibacakan pada 17 Agustus 1945.' },
    { prompt: 'Indonesia terletak di antara dua benua, yaitu...', options: ['Asia dan Eropa', 'Asia dan Australia', 'Afrika dan Australia', 'Amerika dan Asia'], correct: 'b', explanation: 'Indonesia berada di antara Benua Asia dan Benua Australia.' },
    { prompt: 'Kegiatan menyalurkan barang dari produsen ke konsumen disebut...', options: ['Produksi', 'Distribusi', 'Konsumsi', 'Ekspor'], correct: 'b', explanation: 'Distribusi adalah kegiatan penyaluran barang dari produsen ke konsumen.' },
  ],
  'sma-10-matematika': [
    { prompt: 'Jika f(x) = 3x - 1, nilai f(4) adalah...', options: ['10', '11', '12', '13'], correct: 'b', explanation: 'f(4) = 3(4) - 1 = 12 - 1 = 11.' },
    { prompt: 'Penyelesaian dari 5x - 15 = 0 adalah...', options: ['x = -3', 'x = 0', 'x = 3', 'x = 15'], correct: 'c', explanation: '5x = 15, sehingga x = 3.' },
    { prompt: "Pernyataan 'p dan q' bernilai benar ketika...", options: ['p benar, q salah', 'p salah, q benar', 'p dan q keduanya benar', 'p dan q keduanya salah'], correct: 'c', explanation: 'Konjungsi bernilai benar hanya jika kedua pernyataan benar.' },
  ],
  'sma-11-fisika': [
    { prompt: 'Benda bergerak dengan kecepatan tetap disebut...', options: ['Gerak lurus berubah beraturan', 'Gerak lurus beraturan', 'Gerak melingkar', 'Gerak parabola'], correct: 'b', explanation: 'Gerak lurus beraturan memiliki kecepatan tetap dan percepatan nol.' },
    { prompt: 'Hukum II Newton dirumuskan...', options: ['F = m/a', 'F = m × a', 'F = a/m', 'F = m + a'], correct: 'b', explanation: 'Resultan gaya sama dengan massa dikali percepatan.' },
    { prompt: 'Gelombang bunyi termasuk gelombang...', options: ['Transversal', 'Longitudinal', 'Elektromagnetik', 'Stasioner'], correct: 'b', explanation: 'Arah getar gelombang bunyi sejajar dengan arah rambatnya.' },
  ],
  'sma-12-literasi': [
    { prompt: 'Pernyataan yang merupakan fakta adalah...', options: ['Susu paling enak diminum hangat', 'Air membeku pada 0 derajat Celsius pada tekanan standar', 'Hujan membuat suasana sedih', 'Semua orang sebaiknya minum susu'], correct: 'b', explanation: 'Fakta dapat diverifikasi secara objektif, sedangkan pilihan lain berupa penilaian.' },
    { prompt: 'Cara menemukan argumen utama adalah...', options: ['Mengambil kalimat terakhir', 'Mencari gagasan yang didukung alasan penulis', 'Membaca hanya judul', 'Menghitung jumlah kata'], correct: 'b', explanation: 'Argumen utama dikenali dari gagasan yang didukung oleh alasan dan bukti.' },
    { prompt: 'Simpulan yang baik...', options: ['Menambahkan informasi baru', 'Bertentangan dengan teks', 'Sesuai dengan bukti di teks', 'Berisi opini penulis saja'], correct: 'c', explanation: 'Simpulan harus ditarik dari bukti yang tersedia di dalam teks.' },
  ],
  'snbt-penalaran-umum': [
    { prompt: 'Semua siswa yang berlatih setiap hari memiliki skor tinggi. Dimas berlatih setiap hari. Kesimpulan yang paling tepat adalah...', options: ['Dimas pasti memiliki skor tinggi', 'Dimas mungkin memiliki skor tinggi', 'Dimas tidak memiliki skor tinggi', 'Tidak dapat disimpulkan'], correct: 'a', explanation: 'Dimas memenuhi syarat dalam premis, sehingga kesimpulannya pasti secara deduktif.' },
    { prompt: 'Angka selanjutnya dari pola 4, 12, 36, 108, ... adalah...', options: ['216', '324', '432', '540'], correct: 'b', explanation: 'Setiap suku dikalikan 3, sehingga 108 × 3 = 324.' },
    { prompt: 'Penalaran yang menarik kesimpulan umum dari beberapa contoh disebut...', options: ['Deduktif', 'Induktif', 'Kuantitatif', 'Analitik'], correct: 'b', explanation: 'Penalaran induktif bergerak dari contoh khusus menuju prinsip umum.' },
  ],
  'snbt-pengetahuan-umum': [
    { prompt: "Makna kata 'mengimplementasikan' pada kalimat 'Pemerintah mengimplementasikan kebijakan baru' adalah...", options: ['Menunda', 'Melaksanakan', 'Membatalkan', 'Mengabaikan'], correct: 'b', explanation: 'Mengimplementasikan berarti melaksanakan atau menerapkan dalam praktik.' },
    { prompt: 'Informasi tersurat adalah informasi yang...', options: ['Tersirat di balik teks', 'Dinyatakan langsung dalam teks', 'Hanya berupa opini', 'Tidak ada di dalam teks'], correct: 'b', explanation: 'Informasi tersurat tercantum eksplisit di dalam teks.' },
    { prompt: 'Nilai sosial yang tercermin dalam kegiatan gotong royong adalah...', options: ['Individualisme', 'Kerja sama', 'Persaingan', 'Kebebasan mutlak'], correct: 'b', explanation: 'Gotong royong mengutamakan kerja sama dan kepentingan bersama.' },
  ],
  'snbt-pemahaman-bacaan': [
    { prompt: 'Kalimat yang paling efektif adalah...', options: ['Setiap hari ia selalu membaca', 'Ia selalu membaca setiap hari', 'Ia membaca setiap hari', 'Setiap hari ia selalu membaca setiap hari'], correct: 'c', explanation: 'Kalimat ini tidak mengandung pengulangan makna sehingga paling efektif.' },
    { prompt: 'Penulisan yang benar adalah...', options: ['Ia pergi ke kantor', 'Ia pergi kantor', 'Ia pergi kekantor', 'Ia pergi Ke kantor'], correct: 'a', explanation: 'Kata depan ke ditulis terpisah dan huruf kapital hanya di awal kalimat.' },
    { prompt: 'Kata penghubung yang menunjukkan sebab adalah...', options: ['Namun', 'Karena', 'Selain itu', 'Lalu'], correct: 'b', explanation: 'Karena memperkenalkan alasan atau sebab suatu pernyataan.' },
  ],
  'snbt-pengetahuan-kuantitatif': [
    { prompt: 'Hasil dari 30% dari 150 adalah...', options: ['40', '45', '50', '55'], correct: 'b', explanation: '0,3 × 150 = 45.' },
    { prompt: 'Rata-rata dari data 4, 6, 7, 9, 9 adalah...', options: ['6', '7', '8', '9'], correct: 'b', explanation: 'Jumlah data 35 dibagi 5 menghasilkan 7.' },
    { prompt: 'Peluang munculnya angka genap pada pelemparan dadu enam sisi adalah...', options: ['1/6', '1/3', '1/2', '2/3'], correct: 'c', explanation: 'Ada 3 angka genap dari 6 kemungkinan, sehingga peluangnya 3/6 = 1/2.' },
  ],
  'snbt-literasi-indonesia': [
    { prompt: 'Dalam teks ilmiah, pernyataan yang berupa dugaan sementara disebut...', options: ['Fakta', 'Hipotesis', 'Simpulan akhir', 'Data'], correct: 'b', explanation: 'Hipotesis adalah dugaan sementara yang belum terbukti.' },
    { prompt: 'Untuk menilai argumen penulis, pembaca perlu...', options: ['Membaca hanya kalimat pertama', 'Mencari alasan dan bukti yang mendukung argumen', 'Mengabaikan sudut pandang penulis', 'Menghitung jumlah paragraf'], correct: 'b', explanation: 'Argumen dinilai dari kuatnya alasan dan bukti yang menyertainya.' },
    { prompt: 'Nada teks yang menggambarkan penyesalan penulis adalah...', options: ['Optimistis', 'Melankolis', 'Netral', 'Humor'], correct: 'b', explanation: 'Nada melankolis menggambarkan perasaan sedih atau menyesal.' },
  ],
  'snbt-literasi-inggris': [
    { prompt: 'The main idea of a paragraph is...', options: ['Always the first sentence', 'The central point the paragraph develops', 'Always the longest sentence', 'Always the last sentence'], correct: 'b', explanation: 'The main idea is the central point developed throughout the paragraph.' },
    { prompt: 'An inference is...', options: ['A direct quote from the text', 'A conclusion suggested by the text', 'The author name', 'A question in the text'], correct: 'b', explanation: 'An inference is suggested by the text without being stated directly.' },
    { prompt: "The word 'implement' in 'The school implemented a new rule' means...", options: ['Cancelled', 'Delayed', 'Carried out', 'Ignored'], correct: 'c', explanation: 'To implement means to carry out or put into practice.' },
  ],
  'snbt-penalaran-matematika': [
    { prompt: 'Sebuah tiket seharga Rp50.000 mendapat diskon 20%. Harga yang dibayar adalah...', options: ['Rp30.000', 'Rp40.000', 'Rp45.000', 'Rp48.000'], correct: 'b', explanation: 'Harga setelah diskon = 80% × Rp50.000 = Rp40.000.' },
    { prompt: 'Sebuah mobil menempuh 120 km dalam 2 jam. Kecepatan rata-ratanya adalah...', options: ['50 km/jam', '60 km/jam', '70 km/jam', '80 km/jam'], correct: 'b', explanation: 'Kecepatan = jarak / waktu = 120 / 2 = 60 km/jam.' },
    { prompt: 'Hasil perhitungan yang tidak masuk akal untuk jumlah siswa adalah...', options: ['25 siswa', '30 siswa', '25,5 siswa', '32 siswa'], correct: 'c', explanation: 'Jumlah siswa harus bilangan bulat, sehingga 25,5 tidak mungkin.' },
  ],
  'skd-twk': [
    { prompt: 'Sila pertama Pancasila adalah...', options: ['Kemanusiaan yang adil dan beradab', 'Ketuhanan Yang Maha Esa', 'Persatuan Indonesia', 'Keadilan sosial bagi seluruh rakyat Indonesia'], correct: 'b', explanation: 'Sila pertama Pancasila berbunyi Ketuhanan Yang Maha Esa.' },
    { prompt: 'Bentuk negara Indonesia menurut UUD 1945 adalah...', options: ['Negara kesatuan', 'Negara federasi', 'Negara bagian', 'Kerajaan'], correct: 'a', explanation: 'Pasal 1 ayat 1 UUD 1945 menyatakan Indonesia adalah negara kesatuan yang berbentuk republik.' },
    { prompt: 'Semboyan bangsa Indonesia adalah...', options: ['Gemah Ripah Loh Jinawi', 'Bhinneka Tunggal Ika', 'Satu Bangsa Satu Bahasa', 'Indonesia Raya'], correct: 'b', explanation: 'Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu.' },
  ],
  'skd-tiu': [
    { prompt: "Sinonim dari kata 'sengaja' adalah...", options: ['Kebetulan', 'Disengaja', 'Tidak sengaja', 'Segera'], correct: 'b', explanation: 'Disengaja berarti dilakukan dengan kesadaran dan kehendak.' },
    { prompt: 'Angka selanjutnya dari deret 5, 10, 20, 40, ... adalah...', options: ['60', '70', '80', '90'], correct: 'c', explanation: 'Setiap suku dikalikan 2, sehingga 40 × 2 = 80.' },
    { prompt: 'Dalam penalaran figural, hal yang perlu diamati adalah...', options: ['Warna kertas soal', 'Perubahan bentuk, jumlah, dan posisi', 'Nama peserta', 'Nomor halaman'], correct: 'b', explanation: 'Pola figural dikenali dari perubahan bentuk, jumlah, warna, dan posisi gambar.' },
  ],
  'skd-tkp': [
    { prompt: 'Saat menerima keluhan warga, sikap yang paling profesional adalah...', options: ['Mengabaikan keluhan', 'Mendengarkan dan menindaklanjuti', 'Menjawab singkat tanpa penjelasan', 'Menyalahkan warga'], correct: 'b', explanation: 'Pelayanan publik mengutamakan sikap responsif dan berorientasi pada kepuasan masyarakat.' },
    { prompt: 'Contoh penggunaan teknologi yang etis adalah...', options: ['Menyebarkan hoaks', 'Mencuri data rekan kerja', 'Menjaga kerahasiaan data pribadi', 'Mengakses akun orang lain'], correct: 'c', explanation: 'Menjaga kerahasiaan data merupakan bentuk tanggung jawab dalam penggunaan teknologi.' },
    { prompt: 'Sikap yang mencerminkan anti radikalisme adalah...', options: ['Memaksakan pendapat', 'Menolak perbedaan', 'Menghargai keragaman', 'Menghindari diskusi'], correct: 'c', explanation: 'Anti radikalisme mengutamakan toleransi dan penghargaan terhadap keragaman.' },
  ],
  'tka-bahasa-indonesia': [
    { prompt: 'Kalimat yang menggunakan kata baku adalah...', options: ['Ia pakai pensil', 'Ia memakai pensil', 'Ia menggunakan pensil', 'Ia pakai pensil baru'], correct: 'c', explanation: 'Menggunakan adalah bentuk baku yang sesuai untuk kalimat resmi.' },
    { prompt: 'Struktur argumen yang tepat adalah...', options: ['Simpulan, alasan, pendapat', 'Pendapat, alasan dan bukti, simpulan', 'Alasan, simpulan, pendapat', 'Pendapat, simpulan, alasan'], correct: 'b', explanation: 'Argumen diawali pendapat, didukung alasan dan bukti, lalu diakhiri simpulan.' },
    { prompt: 'Ide pokok paragraf biasanya terdapat pada...', options: ['Kalimat utama', 'Kalimat terakhir saja', 'Semua kalimat sama', 'Judul saja'], correct: 'a', explanation: 'Ide pokok dinyatakan dalam kalimat utama yang menjadi topik paragraf.' },
  ],
  'tka-matematika': [
    { prompt: 'Hasil dari 3/5 + 1/10 adalah...', options: ['4/15', '7/10', '1/2', '4/10'], correct: 'b', explanation: '3/5 disamakan menjadi 6/10, lalu 6/10 + 1/10 = 7/10.' },
    { prompt: 'Keliling persegi dengan sisi 9 cm adalah...', options: ['18 cm', '27 cm', '36 cm', '81 cm'], correct: 'c', explanation: 'Keliling = 4 × sisi = 4 × 9 = 36 cm.' },
    { prompt: 'Modus dari data 3, 5, 5, 7, 9 adalah...', options: ['3', '5', '7', '9'], correct: 'b', explanation: 'Modus adalah nilai yang paling sering muncul, yaitu 5.' },
  ],
  'tka-bahasa-inggris': [
    { prompt: "The past tense of 'go' is...", options: ['Goed', 'Went', 'Gone', 'Going'], correct: 'b', explanation: 'The past tense of go is went; gone is the past participle.' },
    { prompt: 'The main idea of a text is...', options: ['The first word', 'The central message', 'The title only', 'The last sentence'], correct: 'b', explanation: 'The main idea is the central message the text conveys.' },
    { prompt: "Choose the correct preposition: 'She was born ___ 2005.'", options: ['in', 'on', 'at', 'for'], correct: 'a', explanation: 'Use in for years, months, and seasons.' },
  ],
  'tka-fisika': [
    { prompt: 'Satuan SI untuk gaya adalah...', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 'b', explanation: 'Satuan gaya dalam Sistem Internasional adalah Newton.' },
    { prompt: 'Sebuah benda bermassa 2 kg mengalami percepatan 3 m/s². Gayanya adalah...', options: ['3 N', '5 N', '6 N', '9 N'], correct: 'c', explanation: 'F = m × a = 2 × 3 = 6 N.' },
    { prompt: 'Rumus energi kinetik adalah...', options: ['m × g × h', '1/2 × m × v²', 'm × a', 'F × t'], correct: 'b', explanation: 'Energi kinetik dirumuskan 1/2 m v².' },
  ],
  'tka-biologi': [
    { prompt: 'Organel sel tumbuhan yang berperan dalam fotosintesis adalah...', options: ['Mitokondria', 'Kloroplas', 'Ribosom', 'Lisosom'], correct: 'b', explanation: 'Kloroplas mengandung klorofil sebagai tempat berlangsungnya fotosintesis.' },
    { prompt: 'Hasil fotosintesis adalah...', options: ['Glukosa dan oksigen', 'Air dan karbon dioksida', 'Protein dan lemak', 'Energi dan panas'], correct: 'a', explanation: 'Fotosintesis menghasilkan glukosa dan oksigen dari air dan karbon dioksida.' },
    { prompt: 'Tempat terjadi respirasi sel adalah...', options: ['Kloroplas', 'Mitokondria', 'Inti sel', 'Dinding sel'], correct: 'b', explanation: 'Mitokondria adalah tempat penghasilan energi melalui respirasi sel.' },
  ],
  'internet-works': [
    { prompt: 'Fungsi DNS adalah...', options: ['Menyimpan halaman web', 'Menerjemahkan nama domain ke alamat IP', 'Mengenkripsi data', 'Membuat website'], correct: 'b', explanation: 'DNS menerjemahkan nama domain yang mudah diingat menjadi alamat IP.' },
    { prompt: 'Protokol yang digunakan browser untuk meminta halaman web adalah...', options: ['HTTP', 'DNS', 'FTP', 'SMTP'], correct: 'a', explanation: 'HTTP mengatur pertukaran permintaan dan jawaban antara browser dan server web.' },
    { prompt: 'Tanda koneksi yang aman adalah...', options: ['HTTP tanpa gembok', 'HTTPS dengan gembok', 'Alamat tanpa www', 'Ikon tanpa kunci'], correct: 'b', explanation: 'HTTPS dengan gembok menandakan koneksi terenkripsi.' },
  ],
  'teknologi-ai': [
    { prompt: 'Cara AI belajar dari contoh data disebut...', options: ['Machine learning', 'Pemrograman manual', 'Penyimpanan statis', 'Komputasi awan'], correct: 'a', explanation: 'Machine learning melatih model untuk mengenali pola dari data.' },
    { prompt: 'Berikut yang merupakan contoh penggunaan AI sehari-hari adalah...', options: ['Kalkulator sederhana', 'Rekomendasi video', 'Penggaris digital', 'Stopwatch'], correct: 'b', explanation: 'Sistem rekomendasi memakai AI untuk memprediksi preferensi pengguna.' },
    { prompt: 'Sikap yang tepat terhadap hasil AI adalah...', options: ['Diterima apa adanya', 'Diverifikasi kembali', 'Dihapus semua', 'Dipercaya sepenuhnya'], correct: 'b', explanation: 'Hasil AI dapat salah sehingga perlu diverifikasi sebelum dipakai.' },
  ],
  'teknologi-keamanan': [
    { prompt: 'Kata sandi yang paling aman adalah...', options: ['123456', 'Nama sendiri', 'Kata sandi unik minimal 12 karakter', 'Tanggal lahir'], correct: 'c', explanation: 'Kata sandi yang panjang dan unik lebih sulit ditebak atau dibobol.' },
    { prompt: 'Tanda pesan phishing adalah...', options: ['Alamat pengirim resmi', 'Pesan mendesak dan tautan mencurigakan', 'Kalimat sopan', 'Logo sesuai situs'], correct: 'b', explanation: 'Phishing memakai rasa mendesak dan tautan palsu untuk menipu korban.' },
    { prompt: 'Verifikasi dua langkah berfungsi untuk...', options: ['Menghapus kata sandi', 'Menambah lapisan keamanan akun', 'Mengganti nama akun', 'Mempercepat internet'], correct: 'b', explanation: 'Verifikasi dua langkah menambah lapisan keamanan setelah kata sandi.' },
  ],
}
