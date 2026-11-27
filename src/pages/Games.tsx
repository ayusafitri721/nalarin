import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Brain, Check, CheckCircle2, Clock, Compass, Gamepad2, HelpCircle, KeyRound, Languages, Puzzle, Rocket, RotateCcw, Target, Trophy } from 'lucide-react'
import { EmptyState, ProgressBar } from '@/components/ui'
import { games } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

const categories = ['Semua', 'Brain', 'Puzzle', 'Word', 'Story', 'Memory', 'Fact', 'Decision'] as const

const gameIcons = {
  Brain,
  Puzzle: KeyRound,
  Word: Languages,
  Story: BookOpen,
  Memory: Puzzle,
  Fact: CheckCircle2,
  Decision: Compass,
}

interface GameQuestion {
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

const questionBank: Record<string, GameQuestion[]> = {
  'brain-rush': [
    { prompt: 'Ibu kota Indonesia adalah...', options: ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'], correct: 0, explanation: 'Jakarta adalah ibu kota Indonesia.' },
    { prompt: 'Berapa hasil 7 × 8?', options: ['48', '54', '56', '64'], correct: 2, explanation: '7 × 8 = 56.' },
    { prompt: 'Planet terdekat dengan matahari adalah...', options: ['Venus', 'Merkurius', 'Bumi', 'Mars'], correct: 1, explanation: 'Merkurius merupakan planet terdalam dalam tata surya.' },
    { prompt: 'Air membeku pada suhu...', options: ['0°C', '10°C', '100°C', '-10°C'], correct: 0, explanation: 'Air berubah menjadi es pada 0°C pada tekanan standar.' },
    { prompt: 'Siapa penulis cerita “Laskar Pelangi”?', options: ['Pramoedya A. Toer', 'Andrea Hirata', 'Hamka', 'Eka Kurniawan'], correct: 1, explanation: 'Laskar Pelangi ditulis oleh Andrea Hirata.' },
  ],
  'logic-escape': [
    { prompt: 'Pola berikut: 2, 4, 8, 16, ... Angka selanjutnya?', options: ['24', '30', '32', '36'], correct: 2, explanation: 'Setiap angka dikalikan 2, sehingga 16 × 2 = 32.' },
    { prompt: 'Semua kucing adalah mamalia. Maka pernyataan yang benar adalah...', options: ['Semua mamalia adalah kucing', 'Kucing termasuk mamalia', 'Tidak ada mamalia selain kucing', 'Kucing bukan mamalia'], correct: 1, explanation: 'Jika semua kucing termasuk mamalia, maka kucing adalah mamalia.' },
    { prompt: 'Jika A > B dan B > C, maka...', options: ['C > A', 'A > C', 'A = C', 'Tidak dapat ditentukan'], correct: 1, explanation: 'Sifat transitivitas pada pertidaksamaan: A > C.' },
  ],
  'word-quest': [
    { prompt: 'Ejaan yang benar untuk kata “pengetahuan” adalah...', options: ['Pengetahuan', 'Pengetauan', 'Pangetahuan', 'Pengetehuan'], correct: 0, explanation: 'Kata baku adalah “pengetahuan”.' },
    { prompt: 'Sinonim dari kata “curiosity” adalah...', options: ['Apatis', 'Rasa ingin tahu', 'Kepastian', 'Kemalasan'], correct: 1, explanation: 'Curiosity berarti rasa ingin tahu.' },
    { prompt: 'Kata dasar dari “pembelajaran” adalah...', options: ['Belajar', 'Pembelas', 'Pelajar', 'Belajarlah'], correct: 0, explanation: 'Kata dasar adalah “belajar” dengan awalan pe- dan akhiran -an.' },
  ],
  'mystery-case': [
    { prompt: 'Petunjuk: jejak kaki di dekat jendela, jendela terbuka, dan kunci masih di pintu. Apa kemungkinan terjadi?', options: ['Kunci hilang', 'Seseorang masuk lewat jendela', 'Pintu tidak pernah dikunci', 'Tidak ada yang terjadi'], correct: 1, explanation: 'Kombinasi jejak dan jendela terbuka menunjukkan akses lewat jendela.' },
    { prompt: 'Setelah mengumpulkan 3 petunjuk, langkah terbaik adalah...', options: ['Menebak jawaban', 'Menyusun petunjuk menjadi urutan waktu', 'Mengabaikan petunjuk', 'Menutup kasus'], correct: 1, explanation: 'Menyusun linimasa membantu melihat hubungan antarpetunjuk.' },
  ],
  'fact-or-fiction': [
    { prompt: 'Lebah dapat mengenali warna. Fakta atau fiksi?', options: ['Fakta', 'Fiksi'], correct: 0, explanation: 'Lebah memiliki penglihatan warna, termasuk ultraviolet.' },
    { prompt: 'Semua jamur dapat dimakan. Fakta atau fiksi?', options: ['Fakta', 'Fiksi'], correct: 1, explanation: 'Beberapa jamur beracun, sehingga tidak semua aman dimakan.' },
    { prompt: 'Otak manusia menggunakan sekitar 20% energi tubuh. Fakta atau fiksi?', options: ['Fakta', 'Fiksi'], correct: 0, explanation: 'Otak mengonsumsi sekitar 20% energi tubuh meski ukurannya kecil.' },
  ],
  'decision-room': [
    { prompt: 'Temanmu kesulitan memahami materi. Apa tindakan terbaik?', options: ['Mengabaikannya', 'Menjelaskan dengan bahasa sederhana', 'Memberi jawaban tanpa penjelasan', 'Menyuruhnya berhenti belajar'], correct: 1, explanation: 'Menjelaskan kembali dengan bahasa sederhana membantu pemahaman.' },
    { prompt: 'Kamu menemukan informasi menarik tapi belum terverifikasi. Apa yang dilakukan?', options: ['Langsung dibagikan sebagai fakta', 'Menyebutnya sebagai informasi yang belum diverifikasi', 'Dihapus tanpa jejak', 'Ditulis sebagai kepastian'], correct: 1, explanation: 'Bersikap jujur soal status informasi adalah bagian dari literasi.' },
  ],
  'memory-grid': [],
}

export function Games() {
  const [category, setCategory] = useState<(typeof categories)[number]>('Semua')
  const gameScores = useAppStore((s) => s.gameScores)
  const visible = category === 'Semua' ? games : games.filter((g) => g.category === category)

  return (
    <div className="space-y-6">
      <div>
        <span className="pill">Games Center</span>
        <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Games</h1>
        <p className="mt-1.5 text-sm text-muted">Belajar sambil bermain. Setiap game benar-benar bisa dimainkan.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={cn('shrink-0 rounded-full px-4 py-2 text-xs font-bold', category === c ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-accent')}>{c}</button>)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((g) => (
          <Link key={g.slug} to={`/app/games/${g.slug}`} className="card group overflow-hidden !p-0 transition-all hover:-translate-y-1 hover:shadow-hover">
            <div className="relative grid h-28 place-items-center" style={{ background: `${g.accent}1F` }}>
              {(() => { const Icon = gameIcons[g.category]; return <Icon size={52} style={{ color: g.accent }} /> })()}
              <span className="absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-bold">{g.difficulty}</span>
            </div>
            <div className="p-4">
              <h2 className="font-display text-base font-extrabold">{g.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">{g.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-muted"><Trophy size={13} /> {gameScores[g.slug] ? `Terbaik: ${gameScores[g.slug]}` : 'Belum ada skor'}</span>
                <span className="font-bold text-accent">+{g.xp} XP</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function QuestionGame({ slug, title, xp }: { slug: string; title: string; xp: number }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const awardXp = useAppStore((s) => s.awardXp)
  const submitGameScore = useAppStore((s) => s.submitGameScore)
  const questions = questionBank[slug] ?? []
  const q = questions[index]

  const confirm = () => {
    if (selected === null) return
    const correct = selected === q.correct
    if (correct) setScore(score + 100)
    setAnswers([...answers, selected])
  }

  const next = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1)
      setSelected(null)
      return
    }
    setFinished(true)
    submitGameScore(slug, score)
    awardXp(xp, `game:${slug}`)
  }

  const reset = () => { setIndex(0); setSelected(null); setAnswers([]); setScore(0); setFinished(false) }

  if (finished) {
    return (
      <div className="card mx-auto max-w-lg text-center !py-10">
        {score >= 200 ? <Trophy size={56} className="text-accent" /> : <Gamepad2 size={56} className="text-accent" />}
        <h2 className="mt-4 font-display text-2xl font-extrabold">Game selesai!</h2>
        <p className="mt-2 text-sm text-muted">{title}</p>
        <p className="mt-6 font-display text-4xl font-extrabold text-accent">{score}</p>
        <p className="text-xs text-muted">Skor akhir · +{xp} XP</p>
        <div className="mt-6 flex justify-center gap-3">
          <button className="btn btn-primary" onClick={reset}><RotateCcw size={15} /> Main lagi</button>
          <Link to="/app/games" className="btn btn-outline">Kembali</Link>
        </div>
      </div>
    )
  }

  const answered = answers.length > index
  const isCorrect = answered && answers[index] === q.correct

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-muted">Pertanyaan {index + 1} dari {questions.length}</p>
        <span className="pill"><Clock size={13} /> {title}</span>
      </div>
      <ProgressBar value={((index + (answered ? 1 : 0)) / questions.length) * 100} />
      <div className="card !p-6">
        <h2 className="font-display text-lg font-extrabold leading-snug">{q.prompt}</h2>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={cn('rounded-2xl border p-4 text-left text-sm font-semibold transition-all', answered && i === q.correct ? 'border-success bg-success/10' : answered && i === answers[index] ? 'border-danger bg-danger/10' : selected === i ? 'border-accent bg-accent-soft' : 'border-line hover:border-accent/50')}
            >
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <div className={cn('mt-5 rounded-2xl p-4 text-sm', isCorrect ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
            <p className="font-display font-extrabold">{isCorrect ? 'Benar! +100 poin' : 'Belum tepat'}</p>
            <p className="mt-1 text-muted">{q.explanation}</p>
          </div>
        )}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-muted">Skor: <strong className="text-ink">{score}</strong></p>
          {answered ? <button className="btn btn-primary" onClick={next}>{index === questions.length - 1 ? 'Selesai' : 'Berikutnya'} <ArrowRight size={15} /></button> : <button className="btn btn-primary" disabled={selected === null} onClick={confirm}>Konfirmasi</button>}
        </div>
      </div>
    </div>
  )
}

const memoryIcons = [Brain, BookOpen, Compass, Puzzle, Target, Rocket]

function MemoryGrid({ xp }: { xp: number }) {
  const [deck] = useState(() => [...memoryIcons, ...memoryIcons].map((icon, i) => ({ id: i, icon, key: i % memoryIcons.length })).sort(() => Math.random() - 0.5))
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [done, setDone] = useState(false)
  const awardXp = useAppStore((s) => s.awardXp)
  const submitGameScore = useAppStore((s) => s.submitGameScore)

  const flip = (card: (typeof deck)[number]) => {
    if (done || flipped.includes(card.id) || matched.includes(card.key) || flipped.length === 2) return
    const next = [...flipped, card.id]
    setFlipped(next)
    if (next.length === 2) {
      setMoves(moves + 1)
      const [a, b] = next.map((id) => deck.find((c) => c.id === id)!)
      if (a.key === b.key) {
        const newMatched = [...matched, a.key]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === memoryIcons.length) {
          setDone(true)
          submitGameScore('memory-grid', Math.max(0, 1000 - moves * 50))
          awardXp(xp, 'game:memory-grid')
        }
      } else {
        window.setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  const reset = () => { setFlipped([]); setMatched([]); setMoves(0); setDone(false) }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between"><p className="text-sm font-bold text-muted">Cocokkan pasangan kartu</p><span className="pill">Langkah: {moves}</span></div>
      {done && <div className="card text-center"><p className="font-display text-xl font-extrabold">Semua pasangan cocok!</p><p className="mt-1 text-sm text-muted">+{xp} XP diperoleh, {moves} langkah</p><button className="btn btn-primary mt-4" onClick={reset}><RotateCcw size={15} /> Main lagi</button></div>}
      <div className="grid grid-cols-4 gap-2.5">
        {deck.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.key)
          const Icon = card.icon
          return (
            <button key={card.id} onClick={() => flip(card)} className={cn('grid aspect-square place-items-center rounded-2xl border transition-all', isFlipped ? 'border-accent bg-accent-soft text-accent' : 'border-line bg-surface text-muted hover:border-accent/50')} aria-label={isFlipped ? 'Kartu terbuka' : 'Kartu tertutup'}>
              {isFlipped ? <Icon size={32} /> : <HelpCircle size={28} />}
            </button>
          )
        })}
      </div>
      <Link to="/app/games" className="btn btn-outline w-full">Kembali ke Games</Link>
    </div>
  )
}

export function GamePlay() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const game = games.find((g) => g.slug === slug)
  if (!game) return <EmptyState title="Game tidak ditemukan" description="Game yang kamu cari belum tersedia." action={<Link className="btn btn-primary" to="/app/games">Kembali ke Games</Link>} />

  return (
    <div className="space-y-5">
      <button onClick={() => navigate('/app/games')} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-accent"><ArrowLeft size={15} /> Kembali ke Games</button>
      <div className="flex items-center gap-3">
        <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${game.accent}22`, color: game.accent }}>
          {(() => { const Icon = gameIcons[game.category]; return <Icon size={30} /> })()}
        </span>
        <div><h1 className="font-display text-xl font-extrabold sm:text-2xl">{game.title}</h1><p className="text-sm text-muted">{game.description}</p></div>
        <span className="pill ml-auto hidden sm:inline-flex"><Check size={13} /> +{game.xp} XP</span>
      </div>
      {game.slug === 'memory-grid' ? <MemoryGrid xp={game.xp} /> : <QuestionGame slug={game.slug} title={game.title} xp={game.xp} />}
    </div>
  )
}
