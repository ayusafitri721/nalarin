import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Compass, Filter, Search, SlidersHorizontal } from 'lucide-react'
import { UniverseArt } from '@/components/Illustrations'
import { EmptyState, ProgressBar, SectionHeader } from '@/components/ui'
import { topics, universes } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export default function Explore() {
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('Semua')
  const [status, setStatus] = useState('Semua')
  const [showFilters, setShowFilters] = useState(false)
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)

  const progressOf = (topic: (typeof topics)[number]) => {
    const done = topic.lessons.filter((lesson) => completed.includes(lesson.id)).length
    const lessonValue = topic.lessons.length ? Math.round((done / topic.lessons.length) * 100) : 0
    const quiz = quizResults.find((result) => result.quizId === topic.quizId)
    const quizValue = quiz ? Math.round((quiz.score / quiz.total) * 100) : 0
    return Math.round((lessonValue + quizValue) / 2)
  }
  const statusOf = (topic: (typeof topics)[number]) => {
    const progress = progressOf(topic)
    return progress === 100 ? 'selesai' : progress > 0 ? 'berjalan' : 'belum'
  }

  const filtered = topics.filter((t) => {
    const matchQuery = t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase())
    const matchDifficulty = difficulty === 'Semua' || t.difficulty === difficulty
    const matchStatus = status === 'Semua' || statusOf(t) === status
    return matchQuery && matchDifficulty && matchStatus
  })

  return (
    <div className="space-y-7">
      <div className="relative overflow-hidden rounded-[24px] p-6 md:p-9" style={{ background: 'linear-gradient(120deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #25233A))' }}>
        <div className="pointer-events-none absolute inset-0 opacity-25"><UniverseArt art="island" accent="#ffffff" soft="#ffffff" /></div>
        <div className="relative max-w-xl">
          <span className="pill !bg-white/20 !text-white"><Compass size={13} /> Knowledge Universe</span>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">Explore the Knowledge Universe</h1>
          <p className="mt-2 text-sm text-white/80">Temukan dunia pengetahuan sesuai minatmu. Mulai dari rasa ingin tahu.</p>
          <Link to="#kategori" className="btn mt-5 border-0 bg-white !text-accent hover:bg-white/90">Jelajahi Sekarang <ArrowRight size={15} /></Link>
        </div>
      </div>

      <div>
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari topik, universe, game, atau pertanyaan..." aria-label="Cari materi" className="input !py-3 !pl-12 !pr-28" />
          <button type="button" onClick={() => setShowFilters(!showFilters)} className={cn('absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold', showFilters ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>
            <SlidersHorizontal size={14} /> Filter
          </button>
        </form>

        {showFilters && (
          <div className="card mt-3 flex flex-wrap gap-4">
            <div>
              <p className="mb-2 text-xs font-bold text-muted">Tingkat kesulitan</p>
              <div className="flex flex-wrap gap-1.5">
                {['Semua', 'Pemula', 'Menengah', 'Lanjut'].map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold', difficulty === d ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold text-muted">Status</p>
              <div className="flex flex-wrap gap-1.5">
                {['Semua', 'belum', 'berjalan', 'selesai'].map((s) => (
                  <button key={s} onClick={() => setStatus(s)} className={cn('rounded-full px-3 py-1.5 text-xs font-bold capitalize', status === s ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section id="kategori">
        <SectionHeader title="Kategori Populer" subtitle="Pilih dunia yang ingin kamu jelajahi." />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {universes.map((u) => (
            <Link key={u.id} to={`/app/universe/${u.slug}`} className="card group flex flex-col items-center gap-2 !p-3 text-center transition-transform hover:-translate-y-1 hover:shadow-hover">
              <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: u.soft, color: u.accent }}><Compass size={22} /></span>
              <span className="text-[11px] font-bold leading-tight">{u.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Direkomendasikan untukmu" subtitle={`${filtered.length} topik ditemukan`} />
        {filtered.length === 0 ? (
          <EmptyState icon={<Filter size={24} />} title="Tidak ada hasil" description="Coba ubah kata kunci atau filter pencarianmu." action={<button className="btn btn-primary" onClick={() => { setQuery(''); setDifficulty('Semua'); setStatus('Semua') }}>Reset filter</button>} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <Link key={t.id} to={`/app/topic/${t.slug}`} className="card group overflow-hidden !p-0 transition-all hover:-translate-y-1 hover:shadow-hover">
                <div className="relative h-28 overflow-hidden" style={{ background: t.soft }}>
                  <UniverseArt art={t.art} accent={t.accent} soft={t.soft} label={t.title} />
                  <span className="absolute left-3 top-3 rounded-full bg-surface/85 px-2.5 py-1 text-[10px] font-bold text-ink">{t.difficulty}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-extrabold leading-snug">{t.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{t.description}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> {t.duration} menit</span>
                    <span className="font-bold capitalize" style={{ color: t.accent }}>{statusOf(t)}</span>
                  </div>
                  {progressOf(t) > 0 && <ProgressBar value={progressOf(t)} className="mt-3 !h-1.5" tone={t.accent} />}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
