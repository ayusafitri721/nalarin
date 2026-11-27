import { Link } from 'react-router-dom'
import { BookOpen, Check, Clock, Lock, Map, Trophy } from 'lucide-react'
import { Mascot } from '@/components/Illustrations'
import { ProgressBar } from '@/components/ui'
import { topics } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export default function Journey() {
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)
  const companion = useAppStore((s) => s.user?.companion ?? 'nori')

  const progressOf = (topic: (typeof topics)[number]) => {
    const done = topic.lessons.filter((lesson) => completed.includes(lesson.id)).length
    const lessonValue = topic.lessons.length ? Math.round((done / topic.lessons.length) * 100) : 0
    const quiz = quizResults.find((result) => result.quizId === topic.quizId)
    const quizValue = quiz ? Math.round((quiz.score / quiz.total) * 100) : 0
    return Math.round((lessonValue + quizValue) / 2)
  }
  const doneCount = topics.filter((topic) => progressOf(topic) === 100).length
  const overall = Math.round((doneCount / topics.length) * 100)
  const currentId = topics.find((topic) => progressOf(topic) < 100)?.id

  const pathD = (() => {
    let d = 'M 50 0'
    topics.forEach((_, i) => {
      const y = (((i + 0.5) / topics.length) * 100).toFixed(2)
      const x = i % 2 === 0 ? 21 : 79
      d += ` C 50 ${Number(y) - 4} ${x} ${Number(y) - 4} ${x} ${y}`
    })
    return `${d} C 50 98 50 100 50 100`
  })()

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "url('/assets/nalarin/journey-bg.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '480px 480px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 space-y-6">
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
          <div className="absolute bottom-10 left-6 top-10 w-2 rounded-full bg-line/60 md:hidden" aria-hidden="true" />
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={pathD} fill="none" stroke="var(--line)" strokeWidth={9} strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.75} />
          </svg>

          <div className="space-y-6 md:mx-auto md:max-w-3xl">
            {topics.map((topic, i) => {
              const progress = progressOf(topic)
              const isDone = progress === 100
              const isCurrent = topic.id === currentId
              return (
                <div key={topic.id} className={cn('relative flex items-center gap-4', i % 2 === 1 && 'md:flex-row-reverse')}>
                  <div className="relative z-10 shrink-0">
                    <div
                      className={cn(
                        'grid h-14 w-14 place-items-center rounded-full border-4 border-surface shadow-sm ring-1',
                        isDone ? 'bg-success text-white ring-success/30' : isCurrent ? 'bg-accent-soft text-accent ring-accent/25' : 'bg-bg text-muted ring-line',
                      )}
                    >
                      {isDone ? <Check size={22} /> : isCurrent ? <BookOpen size={22} /> : <Lock size={19} />}
                    </div>
                    {isCurrent && (
                      <Mascot
                        id={companion}
                        size={62}
                        mood="curious"
                        className={cn(
                          'pointer-events-none absolute top-1/2 hidden -translate-y-1/2 md:block',
                          i % 2 === 1 ? 'left-full ml-2' : 'right-full mr-2',
                        )}
                      />
                    )}
                  </div>
                  <Link
                    to={`/app/topic/${topic.slug}`}
                    className={cn('card flex-1 transition-all hover:shadow-hover', isCurrent && 'border-accent/50')}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Unit {i + 1}</p>
                        <h2 className="mt-1 font-display text-base font-extrabold">{topic.title}</h2>
                      </div>
                      <span className={cn('pill !text-[11px]', isDone ? '!bg-success/15 !text-success' : isCurrent ? '' : '!bg-bg !text-muted')}>
                        {isDone ? 'Selesai' : isCurrent ? 'Sedang berjalan' : 'Tersedia'}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <ProgressBar value={progress} className="flex-1 !h-1.5" tone={isDone ? 'var(--success)' : topic.accent} />
                      <span className="text-xs font-bold text-muted">{progress}%</span>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                      <Clock size={13} /> {topic.lessons.length} modul · {topic.duration} menit · {topic.difficulty}
                    </p>
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
    </>
  )
}
