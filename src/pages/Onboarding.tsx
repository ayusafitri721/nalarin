import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Atom, BookOpen, Brain, Check, Cpu, Flame, Landmark,
  Languages, Palette, Puzzle, Sparkles, Target, Wallet,
} from 'lucide-react'
import { Logo, Mascot } from '@/components/Illustrations'
import { accentPresets, companions } from '@/data/content'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'
import type { ThemeState } from '@/types'

const interests = [
  { id: 'science', label: 'Science', icon: Atom, color: '#5C8DF6' },
  { id: 'technology', label: 'Teknologi', icon: Cpu, color: '#7C6CF0' },
  { id: 'psychology', label: 'Psikologi', icon: Brain, color: '#E58AB6' },
  { id: 'finance', label: 'Finansial', icon: Wallet, color: '#4FB992' },
  { id: 'history', label: 'Sejarah', icon: Landmark, color: '#D9A25B' },
  { id: 'creativity', label: 'Kreativitas', icon: Palette, color: '#E5806C' },
  { id: 'language', label: 'Bahasa', icon: Languages, color: '#59A6C9' },
  { id: 'logic', label: 'Logika', icon: Puzzle, color: '#8E82E8' },
  { id: 'general', label: 'Pengetahuan Umum', icon: BookOpen, color: '#8C8AA0' },
]

const goals = [
  { id: 'knowledge', label: 'Memperluas pengetahuan umum', icon: BookOpen },
  { id: 'thinking', label: 'Mengembangkan kemampuan berpikir', icon: Brain },
  { id: 'skill', label: 'Mempelajari keterampilan baru', icon: Sparkles },
  { id: 'career', label: 'Mendukung kebutuhan akademik atau pekerjaan', icon: Target },
  { id: 'explore', label: 'Mengeksplorasi hal baru', icon: Flame },
]

const dailyGoals = [5, 10, 20, 30]

export default function Onboarding() {
  const navigate = useNavigate()
  const finishOnboarding = useAppStore((s) => s.finishOnboarding)
  const saved = useAppStore((s) => s.onboarding)
  const setAccent = useAppStore((s) => s.setAccent)
  const setThemeMode = useAppStore((s) => s.setThemeMode)
  const theme = useAppStore((s) => s.theme)

  const [step, setStep] = useState(1)
  const [name, setName] = useState(saved?.name ?? '')
  const [selectedInterests, setSelectedInterests] = useState<string[]>(saved?.interests ?? [])
  const [selectedGoals, setSelectedGoals] = useState<string[]>(saved?.goals ?? [])
  const [dailyGoal, setDailyGoal] = useState(saved?.dailyGoal ?? 10)
  const [companion, setCompanion] = useState(saved?.companion ?? 'nori')
  const [accent, setAccentLocal] = useState<ThemeState>(saved?.theme ?? theme)

  const toggle = (list: string[], set: (v: string[]) => void, id: string) => {
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  }

  const next = () => {
    if (step < 7) { setStep(step + 1); return }
    finishOnboarding({ name, interests: selectedInterests, goals: selectedGoals, dailyGoal, companion, theme: accent })
    navigate('/app')
  }

  const back = () => (step > 1 ? setStep(step - 1) : navigate(-1))

  const canContinue =
    step === 1 ? name.trim().length >= 2 :
    step === 2 ? selectedInterests.length > 0 :
    step === 3 ? selectedGoals.length > 0 :
    true

  const applyPreview = (nextTheme: ThemeState) => {
    setAccentLocal(nextTheme)
    setAccent(nextTheme.accent)
    setThemeMode(nextTheme.mode)
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-4">
        <Logo />
        <button onClick={() => navigate('/masuk')} className="text-sm font-bold text-muted hover:text-accent">Lewati nanti</button>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 pb-16 pt-4">
        <div className="mx-auto mb-6 flex max-w-xl items-center gap-1.5" aria-label={`Langkah ${step} dari 7`}>
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors', i < step ? 'bg-accent' : 'bg-line')} />
          ))}
        </div>
        <p className="mb-4 text-center text-xs font-bold text-muted">Step {step} / 7</p>

        <div className="mx-auto max-w-2xl">
          <div className="card relative overflow-hidden !p-7 sm:!p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-soft blur-2xl" />

            {step === 1 && (
              <div className="relative text-center">
                <Mascot id="nori" size={150} mood="happy" className="mx-auto" />
                <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Selamat Datang di Nalarin!</h1>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">Sebelum mulai, sebutkan nama yang ingin kami panggil.</p>
                <input className="input mx-auto mt-6 max-w-xs text-center font-display font-bold" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} />
                {name.length > 0 && name.trim().length < 2 && <p className="mt-2 text-xs font-semibold text-danger">Nama minimal 2 karakter</p>}
              </div>
            )}

            {step === 2 && (
              <div className="relative">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Apa yang kamu sukai?</h1>
                <p className="mt-2 text-sm text-muted">Pilih minat favoritmu (bisa lebih dari satu).</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {interests.map((it) => {
                    const Icon = it.icon
                    const active = selectedInterests.includes(it.id)
                    return (
                      <button key={it.id} onClick={() => toggle(selectedInterests, setSelectedInterests, it.id)} className={cn('relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all', active ? 'border-accent bg-accent-soft shadow-card' : 'border-line bg-surface hover:border-accent/50')} aria-pressed={active}>
                        {active && <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-accent text-white"><Check size={12} /></span>}
                        <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${it.color}22`, color: it.color }}><Icon size={20} /></span>
                        <span className="font-display text-xs font-bold">{it.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="relative">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Apa tujuan belajarmu?</h1>
                <p className="mt-2 text-sm text-muted">Pilih satu atau lebih tujuan agar rekomendasi lebih sesuai.</p>
                <div className="mt-6 space-y-2.5">
                  {goals.map((g) => {
                    const Icon = g.icon
                    const active = selectedGoals.includes(g.id)
                    return (
                      <button key={g.id} onClick={() => toggle(selectedGoals, setSelectedGoals, g.id)} className={cn('flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all', active ? 'border-accent bg-accent-soft' : 'border-line hover:border-accent/50')} aria-pressed={active}>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface text-accent shadow-card"><Icon size={18} /></span>
                        <span className="flex-1 text-sm font-semibold">{g.label}</span>
                        <span className={cn('grid h-5 w-5 place-items-center rounded-full border-2', active ? 'border-accent bg-accent text-white' : 'border-line')}>{active && <Check size={12} />}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="relative">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Target belajar harianmu?</h1>
                <p className="mt-2 text-sm text-muted">Panduan fleksibel, bukan aturan yang menghukum. Bisa diubah kapan saja.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {dailyGoals.map((m) => (
                    <button key={m} onClick={() => setDailyGoal(m)} className={cn('rounded-2xl border p-5 text-center transition-all', dailyGoal === m ? 'border-accent bg-accent-soft shadow-card' : 'border-line hover:border-accent/50')} aria-pressed={dailyGoal === m}>
                      <p className="font-display text-2xl font-extrabold text-accent">{m}</p>
                      <p className="text-xs font-semibold text-muted">menit / hari</p>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-accent-soft p-4">
                  <Mascot id="nori" size={64} mood="curious" />
                  <p className="text-xs leading-relaxed text-muted">Satu langkah kecil tetap berarti. Target ini hanya membantu kamu menjaga ritme.</p>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="relative">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Pilih Companion-mu!</h1>
                <p className="mt-2 text-sm text-muted">Teman belajar yang akan menemani perjalananmu.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {companions.map((c) => (
                    <button key={c.id} onClick={() => setCompanion(c.id)} className={cn('rounded-2xl border p-3 text-center transition-all', companion === c.id ? 'border-accent bg-accent-soft shadow-card' : 'border-line hover:border-accent/50')} aria-pressed={companion === c.id}>
                      <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl" style={{ background: `${c.color}1A` }}>
                        <Mascot id={c.id} size={76} mood="happy" />
                      </div>
                      <p className="mt-2 font-display text-sm font-extrabold">{c.name}</p>
                      <p className="mt-1 text-[11px] leading-snug text-muted">{c.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="relative">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Pilih warna favoritmu!</h1>
                <p className="mt-2 text-sm text-muted">Tampilan ini akan diterapkan ke seluruh Nalarin.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {accentPresets.map((p) => (
                    <button key={p.name} onClick={() => applyPreview({ ...accent, accent: p.value })} className={cn('grid h-9 w-9 place-items-center rounded-full border-2 transition-transform hover:scale-110', accent.accent === p.value ? 'border-ink' : 'border-transparent')} style={{ background: p.value }} aria-label={`Tema ${p.name}`} aria-pressed={accent.accent === p.value}>
                      {accent.accent === p.value && <Check size={16} className="text-white" />}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {(['light', 'dark', 'system'] as const).map((m) => (
                    <button key={m} onClick={() => applyPreview({ ...accent, mode: m })} className={cn('btn flex-1 text-xs', accent.mode === m ? 'btn-primary' : 'btn-outline')} aria-pressed={accent.mode === m}>
                      {m === 'light' ? 'Terang' : m === 'dark' ? 'Gelap' : 'Sistem'}
                    </button>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-line p-4">
                  <p className="mb-3 text-xs font-bold text-muted">Preview tampilan</p>
                  <div className="flex items-center gap-3">
                    <span className="btn btn-primary !py-2 !text-xs">Tombol Utama</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-line"><span className="block h-full w-2/3 rounded-full" style={{ background: accent.accent }} /></span>
                    <Mascot id={companion} size={44} />
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="relative text-center">
                <Mascot id={companion} size={130} mood="celebrating" className="mx-auto" />
                <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Semua siap, {name || 'Learner'}!</h1>
                <p className="mt-2 text-sm text-muted">Ini ringkasan pilihanmu. Kamu bisa mengubahnya kapan saja.</p>
                <div className="mt-6 grid gap-2 text-left sm:grid-cols-2">
                  {[
                    ['Minat', selectedInterests.map((i) => interests.find((x) => x.id === i)?.label).join(', ')],
                    ['Tujuan', `${selectedGoals.length} tujuan dipilih`],
                    ['Target harian', `${dailyGoal} menit`],
                    ['Companion', companions.find((c) => c.id === companion)?.name ?? 'Nori'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-accent-soft p-3">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{label}</p>
                      <p className="mt-1 text-sm font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button onClick={back} className="btn btn-outline"><ArrowLeft size={16} /> Kembali</button>
            <button onClick={next} disabled={!canContinue} className="btn btn-primary px-7">
              {step === 7 ? 'Selesai' : 'Lanjut'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
