import { useState } from 'react'
import { Check, Clock, Gift, ScrollText, Sparkles } from 'lucide-react'
import { ProgressBar } from '@/components/ui'
import { quests } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

const tabs = ['Semua', 'Harian', 'Mingguan', 'Spesial', 'Dunia Nyata'] as const

export default function Quest() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Semua')
  const claimed = useAppStore((s) => s.claimedRewards)
  const claimReward = useAppStore((s) => s.claimReward)
  const visible = tab === 'Semua' ? quests : quests.filter((q) => q.category === tab)

  return (
    <div className="space-y-6">
      <div>
        <span className="pill"><ScrollText size={13} /> Quest Center</span>
        <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Quest</h1>
        <p className="mt-1.5 text-sm text-muted">Tantangan kecil yang membantu menjaga konsistensi belajarmu.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={cn('shrink-0 rounded-full px-4 py-2 text-xs font-bold', tab === t ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-accent')}>{t}</button>)}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((q) => {
          const done = q.status === 'selesai'
          const isClaimed = claimed.includes(`quest:${q.id}`)
          const percent = Math.round((q.progress / q.target) * 100)
          return (
            <div key={q.id} className={cn('card', done && 'border-success/40')}>
              <div className="flex items-start gap-3">
                <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-2xl', done ? 'bg-success/15 text-success' : 'bg-accent-soft text-accent')}>
                  {done ? <Check size={21} /> : <Sparkles size={20} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-base font-extrabold">{q.title}</h2>
                    <span className="pill !py-0.5 !text-[10px]">{q.category}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{q.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs font-bold"><span className="text-muted">Progress</span><span>{q.progress}/{q.target}</span></div>
                <ProgressBar value={done ? 100 : percent} tone={done ? 'var(--success)' : undefined} />
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-warning"><Gift size={14} /> +{q.reward} XP</span>
                {q.deadline && <span className="inline-flex items-center gap-1 text-[11px] text-muted"><Clock size={12} /> {q.deadline}</span>}
                {done && !isClaimed ? (
                  <button className="btn btn-primary !py-2 !text-xs" onClick={() => claimReward(`quest:${q.id}`)}>Klaim Reward</button>
                ) : isClaimed ? (
                  <span className="pill !bg-success/15 !text-success"><Check size={12} /> Diklaim</span>
                ) : (
                  <span className="text-[11px] font-bold text-muted">Berjalan</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-dashed border-line p-5 text-center text-xs leading-relaxed text-muted">
        Real-Life Mission harus aman, sesuai usia, dan dapat diselesaikan secara wajar. Tidak ada tindakan berisiko.
      </div>
    </div>
  )
}
