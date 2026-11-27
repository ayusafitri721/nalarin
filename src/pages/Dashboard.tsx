import { Link } from 'react-router-dom'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ArrowRight, BookOpen, Flame, Target, Trophy, Users, Zap } from 'lucide-react'
import { CompanionCard, ProgressBar, SectionHeader, StatCard } from '@/components/ui'
import { companionAssets, quests, topics } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function localDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function lastSevenDays() {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - i))
    return { key: localDateKey(date), label: DAY_LABELS[date.getDay()] }
  })
}

function CardHead({ title, subtitle, to, label }: { title: string; subtitle: string; to: string; label: string }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="section-title">{title}</h2>
        <p className="mt-1 text-xs text-muted">{subtitle}</p>
      </div>
      <Link to={to} className="inline-flex shrink-0 items-center text-xs font-bold text-accent hover:underline">{label}</Link>
    </div>
  )
}

export default function Dashboard() {
  const user = useAppStore((s) => s.user)
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)
  const companion = user?.companion ?? 'nori'

  const hour = new Date().getHours()
  const greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam'

  const topicStates = topics.map((topic) => {
    const lessonIds = topic.lessons.map((lesson) => lesson.id)
    const done = lessonIds.filter((id) => completed.includes(id)).length
    return { topic, done, total: lessonIds.length, percent: lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0 }
  })
  const active = topicStates.find((t) => t.done > 0 && t.done < t.total)
    ?? topicStates.find((t) => t.done < t.total)
    ?? topicStates[0]

  const activity = lastSevenDays().map((day) => ({
    day: day.label,
    quizzes: quizResults.filter((result) => result.completedAt.slice(0, 10) === day.key).length,
  }))
  const hasActivity = activity.some((day) => day.quizzes > 0)

  const dailyQuest = quests.find((quest) => quest.id === 'qd1')
  const questDone = Math.min(completed.length, dailyQuest?.target ?? 1)

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
        <p className="mt-1 text-sm text-muted">Lanjutkan dari tempat kamu berhenti terakhir kali.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard icon={<Flame size={19} />} label="Streak saat ini" value={`${user?.streak ?? 0} hari`} hint={`Terlama ${user?.longestStreak ?? 0} hari`} />
        <StatCard icon={<Zap size={19} />} label="Total XP" value={(user?.xp ?? 0).toLocaleString('id-ID')} hint={`Level ${user?.level ?? 1}`} />
        <StatCard icon={<Trophy size={19} />} label="Pelajaran selesai" value={completed.length} hint="Dari seluruh modul yang tersedia" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
        <section className="flex flex-col lg:col-span-7">
          <div className="card relative flex-1 overflow-hidden !p-5 sm:!p-6 min-h-[190px] lg:h-[210px]">
            <CardHead title="Lanjutkan belajar" subtitle="Ambil kembali materi yang sedang kamu jalani." to="/app/journey" label="Journey" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-40" style={{ background: active.topic.soft }}>
                <div className="absolute inset-0 grid place-items-center text-accent"><BookOpen size={36} /></div>
                <img src={companionAssets[companion]} alt="" aria-hidden="true" className="absolute -bottom-1 right-1 h-12 w-12 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-extrabold uppercase tracking-wide text-accent">Sedang berjalan</p>
                <h3 className="mt-1 font-display text-lg font-extrabold">{active.topic.title}</h3>
                <p className="mt-1 text-xs text-muted">Modul {Math.min(active.done + 1, active.total)} dari {active.total}, {active.topic.duration} menit</p>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={active.percent} className="flex-1 !h-2" />
                  <span className="text-xs font-bold text-accent">{active.percent}%</span>
                </div>
                <Link to={`/app/learn/${active.topic.lessons[0].id}`} className="btn btn-primary mt-3 min-h-10 !py-2">Lanjutkan <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:col-span-5">
          <div className="card flex flex-1 flex-col !p-4 min-h-[190px] lg:h-[210px]">
            <CardHead title="Quest harian" subtitle="Satu tantangan kecil untuk hari ini." to="/app/quest" label="Semua quest" />
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning"><Target size={19} /></span>
              <div>
                <p className="font-display text-sm font-extrabold">{dailyQuest?.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{dailyQuest?.description}</p>
              </div>
            </div>
            {questDone < (dailyQuest?.target ?? 1) ? (
              <>
                <div className="mt-4 flex items-center gap-3">
                  <ProgressBar value={(questDone / (dailyQuest?.target ?? 1)) * 100} className="flex-1" />
                  <span className="text-xs font-bold">{questDone}/{dailyQuest?.target ?? 1}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3 text-xs">
                  <span className="font-bold text-accent">+{dailyQuest?.reward ?? 0} XP</span>
                  <Link to="/app/quest" className="inline-flex min-h-11 items-center font-bold text-accent hover:underline">Buka quest</Link>
                </div>
              </>
            ) : (
              <p className="mt-4 text-xs font-bold text-success">Quest ini sudah selesai.</p>
            )}
          </div>
        </section>

        <section className="flex flex-col lg:col-span-7">
          <div className="card flex-1 !p-4 min-h-[190px] lg:h-[210px]">
            <CardHead title="Aktivitas kuis" subtitle="Kuis selesai dalam tujuh hari terakhir." to="/app/skill-passport" label="Detail" />
            <p className="mb-3 text-xs font-bold text-muted">Kuis selesai per hari</p>
            {hasActivity ? (
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activity} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)' }} />
                    <Tooltip cursor={{ fill: 'var(--accent-soft)' }} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 12 }} />
                    <Bar dataKey="quizzes" fill="var(--accent)" radius={[8, 8, 4, 4]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-24 flex-col items-center justify-center text-center">
                <p className="text-sm font-semibold">Belum ada kuis selesai</p>
                <p className="mt-1 text-xs text-muted">Grafik ini akan terisi setelah kamu menyelesaikan kuis.</p>
                <Link to="/app/explore" className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-accent hover:underline">Cari kuis</Link>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col lg:col-span-5">
          <CompanionCard
            className="flex-1 min-h-[190px] lg:h-[210px] !px-5 !py-4"
            companionId={companion}
            message={`Kamu sudah menyelesaikan ${completed.length} modul. Satu langkah lagi hari ini menjaga streak ${user?.streak ?? 0} hari.`}
            header={<CardHead title="My Companion" subtitle="Teman belajar yang menemani perjalananmu." to="/app/companion" label="Lihat companion" />}
          />
        </section>
      </div>

      <section>
        <SectionHeader title="Pilih topik" subtitle="Topik yang bisa kamu mulai dari katalog Nalarin." href="/app/explore" linkLabel="Jelajahi" />
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.slice(1, 3).map((topic) => (
            <Link key={topic.id} to={`/app/topic/${topic.slug}`} className="card group flex items-center gap-3 transition-transform hover:-translate-y-0.5 hover:shadow-hover">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-accent" style={{ background: topic.soft }}><BookOpen size={20} /></span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-extrabold">{topic.title}</p>
                <p className="mt-0.5 text-xs text-muted">{topic.difficulty} · {topic.duration} menit</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 text-xs text-muted">
        <Link to="/app/games" className="inline-flex items-center gap-1 hover:text-accent"><BookOpen size={13} /> Mainkan game edukatif</Link>
        <Link to="/app/friends" className="inline-flex items-center gap-1 hover:text-accent"><Users size={13} /> Lihat teman</Link>
      </div>
    </div>
  )
}
