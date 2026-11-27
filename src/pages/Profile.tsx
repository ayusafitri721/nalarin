import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, BookOpen, Check, Flame, Pencil, Settings, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Avatar, StatCard } from '@/components/ui'
import { achievements, companionAssets } from '@/data/content'
import { cn, formatNumber } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export default function Profile() {
  const user = useAppStore((s) => s.user)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const completed = useAppStore((s) => s.completedLessons)
  const showToast = useAppStore((s) => s.showToast)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')
  const [publicStats, setPublicStats] = useState(true)
  const [publicAchievements, setPublicAchievements] = useState(true)

  const save = () => {
    updateProfile({ name: name.trim() || 'Learner', bio })
    setEditing(false)
    showToast('Profil berhasil diperbarui', 'success')
  }

  return (
    <div className="space-y-6">
      <section className="card overflow-hidden !p-0">
        <div className="h-24" style={{ background: 'linear-gradient(120deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #25233A))' }} />
        <div className="relative px-5 pb-5 md:px-7">
          <div className="-mt-9 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-end gap-3">
              <div className="rounded-full border-4 border-surface bg-surface"><Avatar name={user?.name ?? 'Learner'} color={user?.avatar} size={72} /></div>
              <div className="pb-1">
                <h1 className="font-display text-xl font-extrabold sm:text-2xl">{user?.name ?? 'Learner'}</h1>
                <p className="text-sm text-muted">@{user?.username ?? 'learner'}</p>
                <span className="pill mt-2 !py-1 !text-[11px]"><Sparkles size={12} /> Nalarin Explorer</span>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <button onClick={() => setEditing(!editing)} className="btn btn-outline !py-2 !text-xs"><Pencil size={14} /> Edit Profil</button>
              <Link to="/app/settings" className="btn btn-outline !py-2 !text-xs"><Settings size={14} /> Pengaturan</Link>
            </div>
          </div>
          <p className="mt-3 max-w-xl text-sm text-muted">{user?.bio || 'Sedang membangun kebiasaan belajar yang konsisten, satu langkah kecil setiap hari.'}</p>

          {editing && (
            <div className="mt-5 grid gap-3 rounded-2xl bg-bg p-4 sm:grid-cols-2">
              <div><label className="label">Nama tampilan</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><label className="label">Bio</label><input className="input" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Ceritakan sedikit tentang dirimu" /></div>
              <div className="sm:col-span-2 flex gap-2 justify-end">
                <button className="btn btn-outline !py-2 !text-xs" onClick={() => setEditing(false)}>Batal</button>
                <button className="btn btn-primary !py-2 !text-xs" onClick={save}><Check size={14} /> Simpan</button>
              </div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <StatCard icon={<Flame size={18} />} label="Streak" value={user?.streak ?? 7} />
            <StatCard icon={<Award size={18} />} label="Achievement" value={achievements.filter((a) => a.unlocked).length} />
            <StatCard icon={<BookOpen size={18} />} label="Pelajaran" value={completed.length + 12} />
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard icon={<Zap size={18} />} label="Total XP" value={formatNumber(user?.xp ?? 2350)} hint={`Level ${user?.level ?? 10}`} />
        <StatCard icon={<Sparkles size={18} />} label="Topik dijelajahi" value={8} />
        <StatCard icon={<ShieldCheck size={18} />} label="Bergabung sejak" value="2026" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="section-title">Achievement Pilihan</h2>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {achievements.map((a) => (
              <div key={a.id} className={cn('card flex flex-col items-center !p-3 text-center', !a.unlocked && 'opacity-50')}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl text-2xl" style={{ background: `${a.color}22` }}>{a.icon}</span>
                <p className="mt-2 text-[11px] font-bold leading-tight">{a.name}</p>
                <p className="mt-1 text-[10px] leading-tight text-muted">{a.description}</p>
              </div>
            ))}
          </div>
          <Link to="/app/achievements" className="mt-4 inline-block text-sm font-bold text-accent hover:underline">Lihat semua achievement →</Link>
        </section>

        <section>
          <h2 className="section-title">Privasi Profil</h2>
          <div className="card mt-4 space-y-4">
            {[
              { label: 'Tampilkan statistik belajar', value: publicStats, set: setPublicStats, hint: 'Statistik publik terlihat teman.' },
              { label: 'Tampilkan achievement', value: publicAchievements, set: setPublicAchievements, hint: 'Badge yang sudah dibuka.' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3">
                <div><p className="text-sm font-bold">{row.label}</p><p className="text-xs text-muted">{row.hint}</p></div>
                <button
                  role="switch"
                  aria-checked={row.value}
                  onClick={() => row.set(!row.value)}
                  className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', row.value ? 'bg-accent' : 'bg-line')}
                ><span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', row.value ? 'translate-x-[22px]' : 'translate-x-0.5')} /></button>
              </div>
            ))}
            <p className="rounded-xl bg-bg p-3 text-xs leading-relaxed text-muted">Email dan kontak pribadi tidak pernah ditampilkan kepada pengguna lain.</p>
          </div>
        </section>
      </div>

      <div className="card flex items-center gap-4">
        <img src={companionAssets[user?.companion ?? 'nori']} alt="Companion" className="h-[72px] w-[72px] object-contain" />
        <div><p className="font-display text-sm font-extrabold">Companion kamu</p><p className="text-xs text-muted">Kustomisasi teman belajarmu di halaman Companion.</p></div>
        <Link to="/app/companion" className="btn btn-soft ml-auto !text-xs">Lihat →</Link>
      </div>
    </div>
  )
}
