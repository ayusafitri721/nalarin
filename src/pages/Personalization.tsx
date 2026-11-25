import { useState } from 'react'
import { Check, Monitor, Moon, RotateCcw, Sun } from 'lucide-react'
import { Logo, Mascot } from '@/components/Illustrations'
import { accentPresets } from '@/data/content'
import { cn, contrastRatio, isHexColor } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import type { ThemeState } from '@/types'

const modes = [
  { id: 'light', label: 'Terang', icon: Sun },
  { id: 'dark', label: 'Gelap', icon: Moon },
  { id: 'system', label: 'Sistem', icon: Monitor },
] as const

const backgrounds = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'gradient', label: 'Soft Gradient' },
  { id: 'pattern', label: 'Abstract Pattern' },
  { id: 'illustration', label: 'Ilustrasi' },
] as const

export default function Personalization() {
  const theme = useAppStore((s) => s.theme)
  const setThemeMode = useAppStore((s) => s.setThemeMode)
  const setAccent = useAppStore((s) => s.setAccent)
  const setDensity = useAppStore((s) => s.setDensity)
  const setBackgroundStyle = useAppStore((s) => s.setBackgroundStyle)
  const resetTheme = useAppStore((s) => s.resetTheme)
  const showToast = useAppStore((s) => s.showToast)
  const [custom, setCustom] = useState(theme.accent)
  const [draft, setDraft] = useState<ThemeState>(theme)

  const update = (patch: Partial<ThemeState>) => {
    const next = { ...draft, ...patch }
    setDraft(next)
    if (patch.mode) setThemeMode(patch.mode)
    if (patch.accent) setAccent(patch.accent)
    if (patch.density) setDensity(patch.density)
    if (patch.backgroundStyle) setBackgroundStyle(patch.backgroundStyle)
  }

  const applyCustom = () => {
    if (!isHexColor(custom)) {
      showToast('Masukkan kode HEX yang valid, misalnya #7563E8', 'error')
      return
    }
    const ratio = contrastRatio(custom, '#ffffff')
    const ratioDark = contrastRatio(custom, '#25233A')
    if (Math.max(ratio, ratioDark) < 3) {
      showToast('Warna ini memiliki kontras rendah. Coba warna yang lebih gelap atau terang.', 'error')
      return
    }
    update({ accent: custom })
    showToast('Warna aksen diterapkan', 'success')
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="pill">Personalisasi</span>
        <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Atur ruang belajarmu</h1>
        <p className="mt-1.5 text-sm text-muted">Pilih tampilan dan warna yang paling kamu sukai. Perubahan langsung terlihat di preview.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <section className="card">
            <h2 className="font-display text-base font-extrabold">Mode tampilan</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {modes.map((m) => {
                const Icon = m.icon
                return (
                  <button key={m.id} onClick={() => update({ mode: m.id })} className={cn('flex flex-col items-center gap-2 rounded-2xl border p-4 text-xs font-bold transition-all', draft.mode === m.id ? 'border-accent bg-accent-soft text-accent' : 'border-line hover:border-accent/50')} aria-pressed={draft.mode === m.id}>
                    <Icon size={22} /> {m.label}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="card">
            <h2 className="font-display text-base font-extrabold">Warna aksen</h2>
            <p className="mt-1 text-xs text-muted">Preset pilihan Nalarin.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {accentPresets.map((p) => (
                <button key={p.name} onClick={() => update({ accent: p.value })} className={cn('flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all', draft.accent === p.value ? 'border-accent bg-accent-soft' : 'border-line hover:border-accent/50')} aria-label={`Pilih tema ${p.name}`} aria-pressed={draft.accent === p.value}>
                  <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: p.value }}>{draft.accent === p.value && <Check size={17} className="text-white" />}</span>
                  <span className="text-[10px] font-bold">{p.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-5">
              <label className="label">Custom color</label>
              <div className="flex flex-wrap gap-2">
                <input type="color" value={isHexColor(custom) ? custom : '#7563E8'} onChange={(e) => setCustom(e.target.value)} className="h-11 w-14 cursor-pointer rounded-xl border border-line bg-surface p-1" aria-label="Pilih warna" />
                <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="#7563E8" className="input flex-1 font-mono text-sm" aria-label="Kode HEX" />
                <button onClick={applyCustom} className="btn btn-primary">Apply</button>
              </div>
              <p className="mt-2 text-[11px] text-muted">Kontras teks otomatis disesuaikan agar tetap terbaca.</p>
            </div>
          </section>

          <section className="card">
            <h2 className="font-display text-base font-extrabold">Tampilan & kepadatan</h2>
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold text-muted">Background style</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {backgrounds.map((b) => (
                  <button key={b.id} onClick={() => update({ backgroundStyle: b.id })} className={cn('rounded-xl border px-2 py-2.5 text-[11px] font-bold', draft.backgroundStyle === b.id ? 'border-accent bg-accent-soft text-accent' : 'border-line hover:border-accent/50')}>{b.label}</button>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-2 text-xs font-bold text-muted">Interface density</p>
              <div className="grid grid-cols-2 gap-2">
                {(['comfortable', 'compact'] as const).map((d) => (
                  <button key={d} onClick={() => update({ density: d })} className={cn('rounded-xl border px-3 py-2.5 text-xs font-bold capitalize', draft.density === d ? 'border-accent bg-accent-soft text-accent' : 'border-line hover:border-accent/50')}>{d === 'comfortable' ? 'Comfortable' : 'Compact'}</button>
                ))}
              </div>
            </div>
            <button onClick={resetTheme} className="btn btn-outline mt-5 !text-xs"><RotateCcw size={14} /> Reset ke tema awal</button>
          </section>
        </div>

        <section className="lg:sticky lg:top-20 lg:self-start">
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-extrabold">Preview tampilan</h2>
              <span className="pill !py-1 !text-[10px]">Live</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-bg p-4">
              <div className="flex items-center justify-between rounded-xl bg-surface px-3 py-2 shadow-card"><Logo /><span className="h-7 w-7 rounded-full bg-accent-soft" /></div>
              <div className="mt-3 flex gap-3">
                <div className="w-1/3 rounded-xl bg-surface p-3 shadow-card">
                  <div className="h-2 w-3/4 rounded bg-line" /><div className="mt-2 h-2 w-1/2 rounded bg-line" />
                  <div className="mt-3 h-2 rounded-full bg-line"><div className="h-2 w-2/3 rounded-full" style={{ background: 'var(--accent)' }} /></div>
                </div>
                <div className="flex-1 rounded-xl bg-surface p-3 shadow-card">
                  <div className="h-2 w-2/3 rounded bg-line" />
                  <button className="btn btn-primary mt-3 !px-3 !py-1.5 !text-[10px]">Tombol Utama</button>
                  <div className="mt-3 flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent" /><span className="h-2 w-8 rounded-full bg-accent/30" /></div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface p-3 shadow-card">
                <Mascot id="nori" size={52} />
                <div className="flex-1"><div className="h-2 w-2/3 rounded bg-line" /><div className="mt-2 h-2 w-1/2 rounded bg-line" /></div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">Tema ini akan diterapkan ke seluruh Nalarin dan tersimpan di akunmu.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
