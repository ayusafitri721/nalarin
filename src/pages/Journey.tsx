import { Link } from 'react-router-dom'
import { Check, Lock, Map, Sparkles, Trophy } from 'lucide-react'
import { ProgressBar } from '@/components/ui'
import { topics } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export default function Journey() {
  const completed = useAppStore((s) => s.completedLessons)
  const doneCount = topics.filter((t) => t.lessons.every((l) => completed.includes(l.id))).length
  const overall = Math.round((doneCount / topics.length) * 100)

  return (
    <div className="space-y-6">
      <div>
        <span className="pill"><Map size={13} /> Learning Journey</span>
        <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Perjalanan Belajarmu</h1>
        <p className="mt-1.5 text-sm text-muted">Setiap langkah adalah kemajuan. Kamu tetap bebas mengeksplorasi topik lain kapan saja.</p>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Trophy size={21} /></span>
            <div>
              <p className="font-display text-sm font-extrabold">Overall Progress</p>
              <p className="text-xs text-muted">{doneCount} dari {topics.length} topik terselesaikan</p>
            </div>
          </div>
          <p className="font-display text-2xl font-extrabold text-accent">{overall}%</p>
        </div>
        <ProgressBar value={overall} className="mt-4" />
      </div>

      <div className="relative">
        <div className="absolute bottom-10 left-6 top-10 w-0.5 bg-line md:left-1/2" aria-hidden="true" />
        <div className="space-y-5">
          {topics.map((topic, i) => {
            const isDone = topic.lessons.every((l) => completed.includes(l.id)) || topic.status === 'selesai'
            const isCurrent = !isDone && (topic.status === 'berjalan' || i === topics.findIndex((t) => t.status === 'berjalan'))
            const isLocked = !isDone && !isCurrent && topic.difficulty === 'Lanjut'
            return (
              <div key={topic.id} className={cn('relative flex items-center gap-4', i % 2 === 1 ? 'md:flex-row-reverse' : '')}>
                <div className={cn('relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-bg', isDone ? 'bg-success text-white' : isCurrent ? 'bg-accent text-white shadow-hover' : 'bg-bg text-muted')}>
                  {isDone ? <Check size={20} /> : isLocked ? <Lock size={18} /> : <Sparkles size={18} />}
                </div>
                <Link
                  to={`/app/topic/${topic.slug}`}
                  className={cn('card flex-1 transition-all hover:shadow-hover', isCurrent && 'border-accent/50', isLocked && 'opacity-70')}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Checkpoint {i + 1}</p>
                      <h2 className="mt-1 font-display text-base font-extrabold">{topic.title}</h2>
                    </div>
                    <span className={cn('pill !text-[11px]', isDone ? '!bg-success/15 !text-success' : isCurrent ? '' : '!bg-bg !text-muted')}>
                      {isDone ? 'Selesai' : isCurrent ? 'Sedang berjalan' : isLocked ? 'Terkunci' : 'Tersedia'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={isDone ? 100 : topic.progress} className="flex-1 !h-1.5" tone={isDone ? 'var(--success)' : topic.accent} />
                    <span className="text-xs font-bold text-muted">{isDone ? 100 : topic.progress}%</span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{topic.lessons.length} modul · {topic.duration} menit · {topic.difficulty}</p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-line p-5 text-center">
        <p className="font-display text-sm font-extrabold">Milestone berikutnya</p>
        <p className="mt-1 text-xs text-muted">Selesaikan 3 topik lagi untuk membuka badge Master Explorer.</p>
        <Link to="/app/explore" className="btn btn-primary mt-4">Jelajahi topik baru</Link>
      </div>
    </div>
  )
}
