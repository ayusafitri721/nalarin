import { Link } from 'react-router-dom'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ArrowRight, BookOpen, Flame, Target, Trophy, Users, Zap } from 'lucide-react'
import { Mascot } from '@/components/Illustrations'
import { CompanionCard, ProgressBar, SectionHeader, StatCard } from '@/components/ui'
import { quests, topics } from '@/data/content'
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
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{greeting}, {user?.name?.split(' ')[0] ?? 'Learner'}</h1>
        <p className="mt-1 text-sm text-muted">Lanjutkan dari tempat kamu berhenti terakhir kali.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard icon={<Flame size={19} />} label="Streak saat ini" value={`${user?.streak ?? 0} hari`} hint={`Terlama ${user?.longestStreak ?? 0} hari`} />
        <StatCard icon={<Zap size={19} />} label="Total XP" value={(user?.xp ?? 0).toLocaleString('id-ID')} hint={`Level ${user?.level ?? 1}`} />
        <StatCard icon={<Trophy size={19} />} label="Pelajaran selesai" value={completed.length} hint="Dari seluruh modul yang tersedia" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <section>
            <SectionHeader title="Lanjutkan belajar" subtitle="Ambil kembali materi yang sedang kamu jalani." href="/app/journey" linkLabel="Journey" />
            <div className="card relative overflow-hidden">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-36" style={{ background: active.topic.soft }}>
                  <div className="absolute inset-0 grid place-items-center text-accent"><BookOpen size={36} /></div>
                  <Mascot id={companion} size={56} className="absolute -bottom-2 right-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-extrabold">{active.topic.title}</h3>
                  <p className="mt-1 text-xs text-muted">Modul {Math.min(active.done + 1, active.total)} dari {active.total} · {active.topic.duration} menit</p>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={active.percent} className="flex-1" />
                    <span className="text-xs font-bold text-accent">{active.percent}%</span>
                  </div>
                </div>
                <Link to={`/app/learn/${active.topic.lessons[0].id}`} className="btn btn-primary min-h-11 shrink-0">Lanjutkan <ArrowRight size={15} /></Link>
              </div>
            </div>
          </section>

          <section>
            <SectionHeader title="Aktivitas kuis" subtitle="Jumlah kuis yang selesai dalam tujuh hari terakhir." href="/app/skill-passport" linkLabel="Detail" />
            <div className="card">
              <p className="mb-3 text-xs font-bold text-muted">Kuis selesai per hari</p>
              {hasActivity ? (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activity} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)' }} />
                      <Tooltip cursor={{ fill: 'var(--accent-soft)' }} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 12 }} />
                      <Bar dataKey="quizzes" fill="var(--accent)" radius={[8, 8, 4, 4]} maxBarSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center text-center">
                  <p className="text-sm font-semibold">Belum ada kuis selesai</p>
                  <p className="mt-1 text-xs text-muted">Grafik ini akan terisi setelah kamu menyelesaikan kuis.</p>
                  <Link to="/app/explore" className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-accent hover:underline">Cari kuis</Link>
                </div>
              )}
            </div>
          </section>

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
        </div>

        <div className="space-y-5">
          <section>
            <SectionHeader title="Quest harian" href="/app/quest" linkLabel="Semua quest" />
            <div className="card">
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
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-accent">+{dailyQuest?.reward ?? 0} XP</span>
                    <Link to="/app/quest" className="inline-flex min-h-11 items-center font-bold text-accent hover:underline">Buka quest</Link>
                  </div>
                </>
              ) : (
                <p className="mt-4 text-xs font-bold text-success">Quest ini sudah selesai.</p>
              )}
            </div>
          </section>

          <CompanionCard companionId={companion} message="Setiap modul yang kamu selesaikan menambah XP. Lanjutkan satu langkah hari ini." />

          <section>
            <SectionHeader title="Curiosity" href="/app/curiosity" linkLabel="Buka" />
            <div className="card bg-accent-soft">
              <span className="pill !bg-surface/70">Contoh konten</span>
              <p className="mt-3 font-display text-base font-extrabold leading-snug">Mengapa langit berubah warna saat matahari terbenam?</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">Baca penjelasan singkatnya lalu cek pemahamanmu lewat mini kuis.</p>
              <Link to="/app/curiosity" className="btn btn-primary mt-4 min-h-11 !py-2 !text-xs">Lihat penjelasan</Link>
            </div>
          </section>

          <section>
            <SectionHeader title="Belajar bersama" href="/app/friends" linkLabel="Teman" />
            <div className="card flex items-start gap-3">
              <Users size={18} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-xs leading-relaxed text-muted">Aktivitas teman belum tersedia karena belum ada data pertemanan yang tersimpan.</p>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted">
        <Link to="/app/games" className="inline-flex items-center gap-1 hover:text-accent"><BookOpen size={13} /> Mainkan game edukatif</Link>
        <Link to="/app/friends" className="inline-flex items-center gap-1 hover:text-accent"><Users size={13} /> Lihat teman</Link>
      </div>
    </div>
  )
}
