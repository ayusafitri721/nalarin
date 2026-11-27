import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import { Award, BookOpen, Brain, Check, Compass, Flame, Heart, Lightbulb, Sparkles, Star, Sunset, Users } from 'lucide-react'
import { ProgressBar, SectionHeader } from '@/components/ui'
import { achievements, companionAssets, companions, topics } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export function CompanionPage() {
  const user = useAppStore((s) => s.user)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const showToast = useAppStore((s) => s.showToast)
  const [selected, setSelected] = useState(user?.companion ?? 'nori')
  const [background, setBackground] = useState('#EEEBFF')
  const name = companions.find((c) => c.id === selected)?.name ?? 'Mochi'

  const save = () => {
    updateProfile({ companion: selected })
    showToast('Companion berhasil disimpan', 'success')
  }

  return (
    <div className="space-y-6">
      <div><span className="pill"><Sparkles size={13} /> My Companion</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Companion-mu</h1><p className="mt-1.5 text-sm text-muted">Teman belajar yang menemani perjalananmu. Tidak ada hukuman emosional di sini.</p></div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="card">
            <h2 className="section-title">Pilih karakter</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {companions.map((c) => (
                <button key={c.id} onClick={() => setSelected(c.id)} className={cn('rounded-2xl border p-3 text-center transition-all', selected === c.id ? 'border-accent bg-accent-soft' : 'border-line hover:border-accent/50')}>
                  <div className="grid h-20 place-items-center rounded-xl" style={{ background: `${c.color}1A` }}><img src={companionAssets[c.id]} alt="" aria-hidden="true" className="h-[72px] w-[72px] object-contain" /></div>
                  <p className="mt-2 font-display text-sm font-extrabold">{c.name}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted">{c.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 className="section-title">Kustomisasi</h2>
            <div className="mt-4">
              <label className="label">Background preview</label>
              <div className="flex gap-2">
                {['#EEEBFF', '#E7F6EF', '#FFF0E7', '#FCEAF2'].map((b) => (
                  <button key={b} onClick={() => setBackground(b)} className={cn('h-9 w-9 rounded-full border-2', background === b ? 'border-ink' : 'border-transparent')} style={{ background: b }} aria-label={`Background ${b}`} />
                ))}
              </div>
            </div>
            <button onClick={save} className="btn btn-primary mt-5"><Check size={15} /> Simpan companion</button>
          </section>
        </div>

        <section className="card h-fit lg:sticky lg:top-20">
          <p className="mb-3 text-center text-xs font-bold text-muted">Preview</p>
          <div className="relative grid h-56 place-items-center rounded-2xl" style={{ background }}>
            <img src={companionAssets[selected]} alt={`Companion ${name}`} className="h-[150px] w-[150px] object-contain drop-shadow-[0_12px_18px_rgba(37,35,58,.18)]" />
          </div>
          <p className="mt-3 text-center font-display text-lg font-extrabold">{name}</p>
          <div className="mt-4 flex items-center justify-between text-xs"><span className="text-muted">Level {user?.level ?? 1}</span><span className="font-bold text-accent">{user?.xp ?? 0} XP</span></div>
          <div className="mt-5 rounded-2xl bg-bg p-3 text-xs leading-relaxed text-muted">Companion hanya menjadi bagian visual dan motivasi. Kamu tidak perlu merasa bersalah saat tidak membuka aplikasi.</div>
        </section>
      </div>
    </div>
  )
}

export function SkillPassport() {
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)
  const activeDates = useAppStore((s) => s.activeDates)

  const skillScores = topics.map((topic) => {
    const lessonIds = topic.lessons.map((lesson) => lesson.id)
    const done = lessonIds.filter((id) => completed.includes(id)).length
    const lessonValue = lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0
    const quiz = quizResults.find((result) => result.quizId === topic.quizId)
    const quizValue = quiz ? Math.round((quiz.score / quiz.total) * 100) : 0
    return { skill: topic.title, value: Math.round((lessonValue + quizValue) / 2) }
  })
  const topicsExplored = topics.filter((topic) => topic.lessons.some((lesson) => completed.includes(lesson.id))).length
  const recentQuizzes = [...quizResults].sort((a, b) => b.completedAt.localeCompare(a.completedAt)).slice(0, 5)

  return (
    <div className="space-y-6">
      <div><span className="pill"><Award size={13} /> Skill Passport</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Passport Kemampuanmu</h1><p className="mt-1.5 text-sm text-muted">Gambaran aktivitas yang telah kamu latih, bukan klaim penguasaan.</p></div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-base font-extrabold">Peta aktivitas</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillScores}>
                <PolarGrid stroke="var(--line)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: 'var(--muted)' }} />
                <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h2 className="font-display text-base font-extrabold">Perkembangan berdasarkan aktivitas</h2>
          <div className="mt-5 space-y-4">
            {skillScores.map((s) => (
              <div key={s.skill}>
                <div className="mb-1.5 flex justify-between text-xs font-bold"><span>{s.skill}</span><span className="text-accent">{s.value}%</span></div>
                <ProgressBar value={s.value} />
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-bg p-3 text-[11px] leading-relaxed text-muted">Nilai dihitung dari lesson yang selesai dan skor kuis pada topik yang sama.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: BookOpen, label: 'Lesson diselesaikan', value: completed.length },
          { icon: Flame, label: 'Hari aktif', value: activeDates.length },
          { icon: Sparkles, label: 'Topik dieksplorasi', value: topicsExplored },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent"><Icon size={18} /></span><div><p className="text-xs text-muted">{s.label}</p><p className="font-display text-lg font-extrabold">{s.value}</p></div></div>
          )
        })}
      </div>
      <div className="card">
        <SectionHeader title="Riwayat kuis" />
        {recentQuizzes.length ? (
          <div className="mt-3 space-y-2 text-xs text-muted">
            {recentQuizzes.map((result) => (
              <p key={`${result.quizId}-${result.completedAt}`}>
                Kuis {topics.find((topic) => topic.quizId === result.quizId)?.title ?? result.quizId}, {new Date(result.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted">Belum ada kuis yang selesai.</p>
        )}
      </div>
    </div>
  )
}

const achievementIcons: Record<string, typeof Award> = {
  a1: Compass, a2: BookOpen, a3: Flame, a4: Brain, a5: Users, a6: Lightbulb,
}

export function Achievements() {
  const [filter, setFilter] = useState('Semua')
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)
  const notes = useAppStore((s) => s.notes)
  const user = useAppStore((s) => s.user)

  const unlocked: Record<string, boolean> = {
    a1: completed.length >= 1,
    a2: quizResults.length >= 5,
    a3: (user?.streak ?? 0) >= 7,
    a4: quizResults.length >= 10,
    a5: false,
    a6: Object.keys(notes).length >= 5,
  }
  const opened = Object.values(unlocked).filter(Boolean).length
  const visible = achievements.filter((a) => filter === 'Semua' || (filter === 'Terbuka' ? unlocked[a.id] : !unlocked[a.id]))
  return (
    <div className="space-y-6">
      <div><span className="pill"><Award size={13} /> Achievement</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Koleksi Badge</h1><p className="mt-1.5 text-sm text-muted">Badge terbuka mengikuti progres belajarmu.</p></div>
      <div className="flex gap-2">
        {['Semua', 'Terbuka', 'Terkunci'].map((f) => <button key={f} onClick={() => setFilter(f)} className={cn('rounded-full px-4 py-2 text-xs font-bold', filter === f ? 'bg-accent text-white' : 'bg-surface text-muted')}>{f}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((a) => {
          const Icon = achievementIcons[a.id] ?? Award
          return (
            <div key={a.id} className={cn('card text-center', !unlocked[a.id] && 'opacity-60')}>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl" style={{ background: `${a.color}22`, color: a.color }}><Icon size={30} /></span>
              <p className="mt-3 font-display text-sm font-extrabold">{a.name}</p>
              <p className="mt-1 text-[11px] leading-tight text-muted">{a.description}</p>
              <span className={cn('pill mt-3 !text-[10px]', unlocked[a.id] ? '!bg-success/15 !text-success' : '!bg-bg !text-muted')}>{unlocked[a.id] ? 'Terbuka' : 'Terkunci'}</span>
            </div>
          )
        })}
      </div>
      <div className="card"><p className="text-sm font-bold">Badge terbuka: {opened} dari {achievements.length}</p><p className="mt-1 text-xs text-muted">Kriteria dihitung dari lesson, kuis, catatan, dan streak yang tersimpan di akunmu.</p></div>
    </div>
  )
}

export function StreakPage() {
  const user = useAppStore((s) => s.user)
  const activeDates = useAppStore((s) => s.activeDates)
  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-`
  const activeDays = new Set(
    activeDates.filter((key) => key.startsWith(monthPrefix)).map((key) => Number(key.slice(8, 10))),
  )
  const milestones = [{ at: 3, label: '3 hari' }, { at: 7, label: '7 hari' }, { at: 14, label: '14 hari' }, { at: 30, label: '30 hari' }]
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><Flame size={13} /> Streak</span><h1 className="mt-3 font-display text-2xl font-extrabold">Streak Belajarmu</h1></div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Current', value: user?.streak ?? 0 },
          { label: 'Longest', value: user?.longestStreak ?? 0 },
          { label: 'Total aktif', value: activeDates.length },
        ].map((s) => <div key={s.label} className="card text-center"><p className="font-display text-2xl font-extrabold text-accent">{s.value}</p><p className="text-xs text-muted">{s.label}</p></div>)}
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Kalender bulan ini</h2>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => <span key={d} className="pb-1 text-[10px] font-bold text-muted">{d}</span>)}
          {Array.from({ length: new Date(now.getFullYear(), now.getMonth(), 1).getDay() }).map((_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const active = activeDays.has(day)
            return <span key={day} className={cn('grid aspect-square place-items-center rounded-lg text-[11px] font-bold', active ? 'bg-accent text-white' : day <= now.getDate() ? 'bg-bg text-muted' : 'text-muted/40')}>{day}</span>
          })}
        </div>
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Milestone</h2>
        <div className="mt-4 space-y-3">{milestones.map((m) => <div key={m.at} className="flex items-center gap-3"><span className={cn('grid h-8 w-8 place-items-center rounded-full', (user?.streak ?? 0) >= m.at ? 'bg-success text-white' : 'bg-bg text-muted')}><Check size={15} /></span><span className="text-sm font-bold">{m.label}</span></div>)}</div>
      </div>
      <div className="card bg-bg">
        <h3 className="font-display text-sm font-extrabold">Aturan streak</h3>
        <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted"><li>• Streak bertambah hanya jika kamu menyelesaikan lesson, kuis, atau aktivitas belajar yang valid.</li><li>• Membuka aplikasi atau mengirim chat tidak menambah streak.</li><li>• Menggunakan tanggal dan zona waktu lokalmu.</li><li>• Kualitas belajar lebih penting daripada angka streak.</li></ul>
      </div>
    </div>
  )
}

export function Curiosity() {
  const [saved, setSaved] = useState(false)
  const [answerVisible, setAnswerVisible] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><Lightbulb size={13} /> Curiosity Box</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Pertanyaan hari ini</h1></div>
      <div className="card overflow-hidden !p-0">
        <div className="grid h-36 place-items-center bg-accent-soft text-accent"><Sunset size={72} /></div>
        <div className="p-5">
          <h2 className="font-display text-xl font-extrabold">Mengapa langit berubah warna saat matahari terbenam?</h2>
          <p className="mt-2 text-sm text-muted">Fakta singkat: cahaya matahari melewati lapisan atmosfer yang lebih tebal saat senja, sehingga warna biru tersebar dan warna merah/oranye lebih dominan.</p>
          {answerVisible && <p className="mt-3 rounded-2xl bg-bg p-4 text-sm leading-relaxed">Fenomena ini disebut hamburan Rayleigh. Partikel kecil di udara menyebarkan cahaya berpanjang gelombang pendek lebih kuat daripada cahaya merah.</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setAnswerVisible(true)} className="btn btn-primary !text-xs">Baca penjelasan</button>
            <button onClick={() => { setSaved(!saved) }} className="btn btn-outline !text-xs">{saved ? <><Check size={14} /> Tersimpan</> : 'Simpan ke koleksi'}</button>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Mini kuis</h2>
        <p className="mt-2 text-sm">Fenomena apa yang menjelaskan warna langit saat senja?</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {['Hamburan Rayleigh', 'Efek Doppler', 'Gravitasi', 'Refleksi cahaya'].map((o) => <button key={o} onClick={() => setChoice(o)} className={cn('rounded-xl border p-3 text-left text-sm font-semibold', choice === o ? 'border-accent bg-accent-soft' : 'border-line')}>{o}</button>)}
        </div>
        {choice && <p className="mt-3 text-xs font-bold text-success">{choice === 'Hamburan Rayleigh' ? 'Benar! Penjelasan sesuai fakta di atas.' : 'Belum tepat, coba baca penjelasan kembali.'}</p>}
      </div>
      <Link to="/app/topic/human-body-systems" className="text-sm font-bold text-accent">Topik terkait: Sistem Tubuh Manusia →</Link>
    </div>
  )
}

export function Wrapped() {
  const completed = useAppStore((s) => s.completedLessons)
  const quizResults = useAppStore((s) => s.quizResults)
  const activeDates = useAppStore((s) => s.activeDates)
  const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  const today = new Date()
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - i))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return {
      key,
      label: dayLabels[date.getDay()],
      quizzes: quizResults.filter((result) => result.completedAt.slice(0, 10) === key).length,
      active: activeDates.includes(key),
    }
  })
  const maxQuizzes = Math.max(1, ...week.map((day) => day.quizzes))
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><Star size={13} /> Learning Wrapped</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Ringkasan Belajarmu</h1><p className="mt-1.5 text-sm text-muted">Tujuh hari terakhir, dihitung dari aktivitas yang tersimpan.</p></div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Kuis selesai', value: quizResults.length },
          { label: 'Lesson selesai', value: completed.length },
          { label: 'Hari aktif', value: week.filter((day) => day.active).length },
        ].map((s) => <div key={s.label} className="card text-center"><p className="font-display text-xl font-extrabold text-accent">{s.value}</p><p className="mt-1 text-xs text-muted">{s.label}</p></div>)}
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Kuis per hari</h2>
        <div className="mt-4 space-y-2.5">{week.map((d) => <div key={d.key} className="flex items-center gap-3"><span className="w-10 text-xs font-bold text-muted">{d.label}</span><ProgressBar value={(d.quizzes / maxQuizzes) * 100} className="flex-1" /><span className="w-8 text-right text-xs font-bold">{d.quizzes}</span></div>)}</div>
      </div>
      <div className="card bg-accent-soft"><Heart size={20} className="text-accent" /><p className="mt-2 font-display text-sm font-extrabold">Konsistensi dibangun sedikit demi sedikit.</p><p className="mt-1 text-xs text-muted">Terima kasih sudah meluangkan waktu untuk belajar minggu ini.</p></div>
    </div>
  )
}
