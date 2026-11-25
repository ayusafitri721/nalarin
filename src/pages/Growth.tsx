import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import { Award, BookOpen, Check, Flame, Heart, Lightbulb, Sparkles, Star } from 'lucide-react'
import { Mascot } from '@/components/Illustrations'
import { ProgressBar, SectionHeader } from '@/components/ui'
import { achievements, companions, skillScores, topics, weeklyActivity } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export function CompanionPage() {
  const user = useAppStore((s) => s.user)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const showToast = useAppStore((s) => s.showToast)
  const [selected, setSelected] = useState(user?.companion ?? 'nori')
  const [name, setName] = useState(companions.find((c) => c.id === selected)?.name ?? 'Nori')
  const [pose, setPose] = useState<'happy' | 'curious' | 'thinking' | 'celebrating' | 'neutral'>('happy')
  const [accessory, setAccessory] = useState('none')
  const [background, setBackground] = useState('#EEEBFF')

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
                <button key={c.id} onClick={() => { setSelected(c.id); setName(c.name) }} className={cn('rounded-2xl border p-3 text-center transition-all', selected === c.id ? 'border-accent bg-accent-soft' : 'border-line hover:border-accent/50')}>
                  <div className="grid h-20 place-items-center rounded-xl" style={{ background: `${c.color}1A` }}><Mascot id={c.id} size={72} /></div>
                  <p className="mt-2 font-display text-sm font-extrabold">{c.name}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted">{c.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 className="section-title">Kustomisasi</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><label className="label">Nama companion</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div>
                <label className="label">Ekspresi</label>
                <div className="flex flex-wrap gap-1.5">
                  {(['happy', 'curious', 'thinking', 'celebrating', 'neutral'] as const).map((p) => (
                    <button key={p} onClick={() => setPose(p)} className={cn('rounded-full px-3 py-1.5 text-[11px] font-bold capitalize', pose === p ? 'bg-accent text-white' : 'bg-bg text-muted')}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Aksesori</label>
                <div className="flex flex-wrap gap-1.5">
                  {['none', '🎀', '🧢', '🕶️', '🎧'].map((a) => (
                    <button key={a} onClick={() => setAccessory(a)} className={cn('rounded-xl border px-3 py-2 text-sm', accessory === a ? 'border-accent bg-accent-soft' : 'border-line')}>{a === 'none' ? 'Tanpa' : a}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Background</label>
                <div className="flex gap-2">
                  {['#EEEBFF', '#E7F6EF', '#FFF0E7', '#FCEAF2'].map((b) => (
                    <button key={b} onClick={() => setBackground(b)} className={cn('h-9 w-9 rounded-full border-2', background === b ? 'border-ink' : 'border-transparent')} style={{ background: b }} aria-label={`Background ${b}`} />
                  ))}
                </div>
              </div>
            </div>
            <button onClick={save} className="btn btn-primary mt-5"><Check size={15} /> Simpan companion</button>
          </section>
        </div>

        <section className="card h-fit lg:sticky lg:top-20">
          <p className="mb-3 text-center text-xs font-bold text-muted">Preview</p>
          <div className="relative grid h-56 place-items-center rounded-2xl" style={{ background }}>
            <Mascot id={selected} size={150} mood={pose} />
            {accessory !== 'none' && <span className="absolute left-1/2 top-[38%] -translate-x-1/2 text-3xl">{accessory}</span>}
          </div>
          <p className="mt-3 text-center font-display text-lg font-extrabold">{name}</p>
          <div className="mt-4 flex items-center justify-between text-xs"><span className="text-muted">Milestone</span><span className="font-bold text-accent">Level 3</span></div>
          <ProgressBar value={64} className="mt-2" />
          <div className="mt-5 rounded-2xl bg-bg p-3 text-xs leading-relaxed text-muted">Companion hanya menjadi bagian visual dan motivasi. Kamu tidak perlu merasa bersalah saat tidak membuka aplikasi.</div>
        </section>
      </div>
    </div>
  )
}

export function SkillPassport() {
  const completed = useAppStore((s) => s.completedLessons)
  return (
    <div className="space-y-6">
      <div><span className="pill"><Award size={13} /> Skill Passport</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Passport Kemampuanmu</h1><p className="mt-1.5 text-sm text-muted">Gambaran aktivitas yang telah kamu latih — bukan klaim penguasaan.</p></div>

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
          <p className="mt-5 rounded-xl bg-bg p-3 text-[11px] leading-relaxed text-muted">Nilai dihitung dari jenis aktivitas yang kamu selesaikan (lesson, kuis, game), bukan dari satu kuis saja.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: BookOpen, label: 'Lesson diselesaikan', value: completed.length + 12 },
          { icon: Flame, label: 'Hari aktif', value: 21 },
          { icon: Sparkles, label: 'Topik dieksplorasi', value: topics.length },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent"><Icon size={18} /></span><div><p className="text-xs text-muted">{s.label}</p><p className="font-display text-lg font-extrabold">{s.value}</p></div></div>
          )
        })}
      </div>
      <div className="card"><SectionHeader title="Riwayat aktivitas" /><div className="space-y-2 text-xs text-muted"><p>• Menyelesaikan modul “Pengenalan” — hari ini</p><p>• Kuis Digital Literacy — kemarin</p><p>• Game Logic Escape — 2 hari lalu</p></div></div>
    </div>
  )
}

export function Achievements() {
  const [filter, setFilter] = useState('Semua')
  const visible = filter === 'Semua' ? achievements : achievements.filter((a) => filter === 'Terbuka' ? a.unlocked : !a.unlocked)
  return (
    <div className="space-y-6">
      <div><span className="pill"><Award size={13} /> Achievement</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Koleksi Badge</h1><p className="mt-1.5 text-sm text-muted">Setiap badge terbuka karena kriteria yang jelas.</p></div>
      <div className="flex gap-2">
        {['Semua', 'Terbuka', 'Terkunci'].map((f) => <button key={f} onClick={() => setFilter(f)} className={cn('rounded-full px-4 py-2 text-xs font-bold', filter === f ? 'bg-accent text-white' : 'bg-surface text-muted')}>{f}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((a) => (
          <div key={a.id} className={cn('card text-center', !a.unlocked && 'opacity-60')}>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl text-3xl" style={{ background: `${a.color}22` }}>{a.icon}</span>
            <p className="mt-3 font-display text-sm font-extrabold">{a.name}</p>
            <p className="mt-1 text-[11px] leading-tight text-muted">{a.description}</p>
            <span className={cn('pill mt-3 !text-[10px]', a.unlocked ? '!bg-success/15 !text-success' : '!bg-bg !text-muted')}>{a.unlocked ? 'Terbuka' : 'Terkunci'}</span>
          </div>
        ))}
      </div>
      <div className="card"><h2 className="font-display text-base font-extrabold">Rewards & Inventory</h2><p className="mt-1 text-xs text-muted">Item kosmetik diperoleh dari pencapaian yang jelas.</p><div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">{['🎀', '🧢', '🕶️', '🎧', '🖼️', '⭐', '🌈', '📦'].map((i) => <span key={i} className="grid aspect-square place-items-center rounded-xl bg-bg text-2xl">{i}</span>)}</div></div>
    </div>
  )
}

export function StreakPage() {
  const user = useAppStore((s) => s.user)
  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const activeDays = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 22, 23, 24]
  const milestones = [{ at: 3, label: '3 hari' }, { at: 7, label: '7 hari' }, { at: 14, label: '14 hari' }, { at: 30, label: '30 hari' }]
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><Flame size={13} /> Streak</span><h1 className="mt-3 font-display text-2xl font-extrabold">Streak Belajarmu</h1></div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Current', value: user?.streak ?? 7 },
          { label: 'Longest', value: user?.longestStreak ?? 14 },
          { label: 'Total aktif', value: user?.totalActiveDays ?? 24 },
        ].map((s) => <div key={s.label} className="card text-center"><p className="font-display text-2xl font-extrabold text-accent">{s.value}</p><p className="text-xs text-muted">{s.label}</p></div>)}
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Kalender bulan ini</h2>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => <span key={d} className="pb-1 text-[10px] font-bold text-muted">{d}</span>)}
          {Array.from({ length: new Date(now.getFullYear(), now.getMonth(), 1).getDay() }).map((_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const active = activeDays.includes(day)
            return <span key={day} className={cn('grid aspect-square place-items-center rounded-lg text-[11px] font-bold', active ? 'bg-accent text-white' : day <= now.getDate() ? 'bg-bg text-muted' : 'text-muted/40')}>{day}</span>
          })}
        </div>
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Milestone</h2>
        <div className="mt-4 space-y-3">{milestones.map((m) => <div key={m.at} className="flex items-center gap-3"><span className={cn('grid h-8 w-8 place-items-center rounded-full', (user?.streak ?? 7) >= m.at ? 'bg-success text-white' : 'bg-bg text-muted')}><Check size={15} /></span><span className="text-sm font-bold">{m.label}</span></div>)}</div>
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
        <div className="grid h-36 place-items-center bg-accent-soft text-6xl">🌅</div>
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
        {choice && <p className="mt-3 text-xs font-bold text-success">{choice === 'Hamburan Rayleigh' ? 'Benar! Penjelasan sesuai fakta di atas.' : 'Belum tepat — coba baca penjelasan kembali.'}</p>}
      </div>
      <Link to="/app/topic/human-body-systems" className="text-sm font-bold text-accent">Topik terkait: Sistem Tubuh Manusia →</Link>
    </div>
  )
}

export function Wrapped() {
  const completed = useAppStore((s) => s.completedLessons)
  const totalMinutes = weeklyActivity.reduce((a, b) => a + b.minutes, 0)
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><Star size={13} /> Learning Wrapped</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Ringkasan Belajarmu</h1><p className="mt-1.5 text-sm text-muted">Minggu ini · hanya metrik yang benar-benar dihitung dari aktivitasmu.</p></div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Total waktu belajar', value: `${totalMinutes} menit` },
          { label: 'Lesson selesai', value: completed.length + 12 },
          { label: 'Hari aktif', value: weeklyActivity.filter((d) => d.minutes > 0).length },
        ].map((s) => <div key={s.label} className="card text-center"><p className="font-display text-xl font-extrabold text-accent">{s.value}</p><p className="mt-1 text-xs text-muted">{s.label}</p></div>)}
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Aktivitas per hari</h2>
        <div className="mt-4 space-y-2.5">{weeklyActivity.map((d) => <div key={d.day} className="flex items-center gap-3"><span className="w-10 text-xs font-bold text-muted">{d.day}</span><ProgressBar value={(d.minutes / 60) * 100} className="flex-1" /><span className="w-12 text-right text-xs font-bold">{d.minutes}m</span></div>)}</div>
      </div>
      <div className="card bg-accent-soft"><Heart size={20} className="text-accent" /><p className="mt-2 font-display text-sm font-extrabold">Konsistensi dibangun sedikit demi sedikit.</p><p className="mt-1 text-xs text-muted">Terima kasih sudah meluangkan waktu untuk belajar minggu ini.</p></div>
      <p className="text-xs text-muted">Data contoh di halaman ini berasal dari ringkasan aktivitas lokal, bukan data pengguna nyata dari server.</p>
    </div>
  )
}
