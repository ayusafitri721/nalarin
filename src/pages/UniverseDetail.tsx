import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Gamepad2, ScrollText, Sparkles } from 'lucide-react'
import { UniverseArt } from '@/components/Illustrations'
import { EmptyState, ProgressBar, SectionHeader } from '@/components/ui'
import { games, getUniverse, quests, topics } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

export default function UniverseDetail() {
  const { slug } = useParams()
  const universe = getUniverse(slug ?? '')
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)
  if (!universe) return <EmptyState title="Universe tidak ditemukan" description="Dunia pengetahuan yang kamu cari belum tersedia." action={<Link className="btn btn-primary" to="/app/explore">Kembali ke Explore</Link>} />

  const universeTopics = topics.filter((t) => t.universeSlug === universe.slug)
  const progressOf = (topic: (typeof topics)[number]) => {
    const done = topic.lessons.filter((lesson) => completed.includes(lesson.id)).length
    const lessonValue = topic.lessons.length ? Math.round((done / topic.lessons.length) * 100) : 0
    const quiz = quizResults.find((result) => result.quizId === topic.quizId)
    const quizValue = quiz ? Math.round((quiz.score / quiz.total) * 100) : 0
    return Math.round((lessonValue + quizValue) / 2)
  }
  const universeProgress = universeTopics.length
    ? Math.round(universeTopics.reduce((sum, topic) => sum + progressOf(topic), 0) / universeTopics.length)
    : 0

  return (
    <div className="space-y-6">
      <Link to="/app/explore" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-accent"><ArrowLeft size={15} /> Kembali ke Explore</Link>

      <section className="overflow-hidden rounded-[24px] border border-line bg-surface">
        <div className="relative h-44 overflow-hidden sm:h-56" style={{ background: universe.soft }}>
          <UniverseArt art={universe.art} accent={universe.accent} soft={universe.soft} label={universe.title} />
        </div>
        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-xl">
              <span className="pill" style={{ background: universe.soft, color: universe.accent }}><Sparkles size={13} /> Knowledge Universe</span>
              <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{universe.title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted">{universe.description}</p>
            </div>
            <div className="w-full max-w-[220px]">
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold"><span>Progress kamu</span><span style={{ color: universe.accent }}>{universeProgress}%</span></div>
              <ProgressBar value={universeProgress} tone={universe.accent} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Clock, value: universeTopics.length, label: 'Topik' },
              { icon: Gamepad2, value: games.length, label: 'Game' },
              { icon: ScrollText, value: quests.length, label: 'Quest' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="rounded-2xl bg-bg p-3.5 text-center">
                  <Icon size={18} className="mx-auto" style={{ color: universe.accent }} />
                  <p className="mt-1 font-display text-lg font-extrabold">{s.value}</p>
                  <p className="text-[11px] text-muted">{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Subkategori" subtitle="Pilih area yang ingin kamu pelajari lebih dalam." />
        <div className="flex flex-wrap gap-2">
          {universe.subcategories.map((s) => (
            <span key={s} className="card !rounded-full !px-4 !py-2 text-sm font-bold">{s}</span>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Topik di Universe Ini" subtitle={`${universeTopics.length} topik tersedia`} />
        {universeTopics.length === 0 ? (
          <EmptyState title="Belum ada topik" description="Topik untuk universe ini sedang disiapkan. Jelajahi universe lain dulu, ya." action={<Link className="btn btn-primary" to="/app/explore">Jelajahi Universe lain</Link>} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {universeTopics.map((t) => (
              <Link key={t.id} to={`/app/topic/${t.slug}`} className="card flex items-center gap-3 transition-transform hover:-translate-y-0.5 hover:shadow-hover">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: t.soft, color: t.accent }}><BookOpen size={22} /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-extrabold">{t.title}</p>
                  <p className="text-xs text-muted">{t.lessons.length} modul · {t.duration} menit</p>
                </div>
                <span className="text-xs font-bold capitalize" style={{ color: t.accent }}>{progressOf(t) === 100 ? 'selesai' : progressOf(t) > 0 ? 'berjalan' : 'belum'}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
