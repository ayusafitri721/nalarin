import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Bookmark, Check, Clock, Play, Target } from 'lucide-react'
import { UniverseArt } from '@/components/Illustrations'
import { EmptyState, ProgressBar } from '@/components/ui'
import { getTopic } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export default function TopicDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const topic = getTopic(slug ?? '')
  const completed = useAppStore((s) => s.completedLessons)
  const bookmarks = useAppStore((s) => s.bookmarks)
  const toggleBookmark = useAppStore((s) => s.toggleBookmark)
  const showToast = useAppStore((s) => s.showToast)

  if (!topic) return <EmptyState title="Topik tidak ditemukan" description="Topik yang kamu cari belum tersedia." action={<Link className="btn btn-primary" to="/app/explore">Kembali ke Explore</Link>} />

  const bookmarked = bookmarks.includes(topic.id)
  const done = topic.lessons.filter((l) => completed.includes(l.id)).length
  const progress = topic.lessons.length ? Math.round((done / topic.lessons.length) * 100) : 0
  const firstIncomplete = topic.lessons.find((l) => !completed.includes(l.id)) ?? topic.lessons[0]

  return (
    <div className="space-y-6">
      <Link to="/app/explore" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-accent"><ArrowLeft size={15} /> Kembali ke Explore</Link>

      <section className="overflow-hidden rounded-[24px] border border-line bg-surface">
        <div className="relative h-44 overflow-hidden sm:h-56" style={{ background: topic.soft }}>
          <UniverseArt art={topic.art} accent={topic.accent} soft={topic.soft} label={topic.title} />
          <button
            onClick={() => toggleBookmark(topic.id)}
            className={cn('absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface/90 shadow-card transition-colors', bookmarked ? 'text-accent' : 'text-muted hover:text-accent')}
            aria-label={bookmarked ? 'Hapus bookmark' : 'Simpan topik'}
            aria-pressed={bookmarked}
          >
            <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill" style={{ background: topic.soft, color: topic.accent }}>{topic.difficulty}</span>
            <span className="pill !bg-bg !text-muted"><Clock size={13} /> {topic.duration} menit</span>
            {progress === 100 && <span className="pill !bg-success/15 !text-success"><Check size={13} /> Selesai</span>}
          </div>
          <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{topic.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{topic.description}</p>

          <div className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="flex items-center gap-2 font-display text-sm font-extrabold"><Target size={16} className="text-accent" /> Tujuan pembelajaran</h2>
              <ul className="mt-3 space-y-2">
                {topic.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-muted"><Check size={15} className="mt-0.5 shrink-0 text-success" /> <span>{o}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-bg p-4">
              <div className="mb-2 flex items-center justify-between text-xs font-bold"><span>Progress topik</span><span style={{ color: topic.accent }}>{progress}%</span></div>
              <ProgressBar value={progress} tone={topic.accent} />
              <p className="mt-2 text-xs text-muted">{done} dari {topic.lessons.length} modul selesai</p>
              <button className="btn btn-primary mt-4 w-full" onClick={() => showToast('Buka modul melalui tombol di daftar materi', 'info')}>
                <Play size={15} fill="currentColor" /> {progress > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Daftar Modul</h2>
        <div className="mt-4 space-y-2.5">
          {topic.lessons.map((lesson, i) => {
            const isDone = completed.includes(lesson.id)
            return (
              <Link key={lesson.id} to={`/app/learn/${lesson.id}`} className="card flex items-center gap-4 transition-all hover:shadow-hover">
                <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold', isDone ? 'bg-success/15 text-success' : 'bg-accent-soft text-accent')}>
                  {isDone ? <Check size={18} /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold">{lesson.title}</p>
                  <p className="text-xs text-muted">{lesson.duration} menit · {lesson.blocks.length} bagian</p>
                </div>
                <Play size={16} className="text-accent" />
              </Link>
            )
          })}
          <Link to={`/app/quiz/${topic.quizId}`} className="card flex items-center gap-4 border-accent/40 bg-accent-soft transition-all hover:shadow-hover">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white">?</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-extrabold">Uji Pemahaman: {topic.title}</p>
              <p className="text-xs text-muted">3 pertanyaan · +30 XP</p>
            </div>
            <span className="text-xs font-bold text-accent">Mulai →</span>
          </Link>
        </div>
      </section>

      <button className="btn btn-primary w-full py-3" onClick={() => navigate(`/app/learn/${firstIncomplete.id}`)}>
        <Play size={16} fill="currentColor" /> {progress > 0 ? 'Lanjutkan belajar' : 'Mulai dari modul pertama'}
      </button>
    </div>
  )
}
