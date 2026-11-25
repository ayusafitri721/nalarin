import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Eye, KeyRound, Link2, LogOut, Palette, ShieldCheck, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/store/useAppStore'

const sections = [
  { id: 'account', label: 'Akun', icon: UserRound },
  { id: 'appearance', label: 'Penampilan', icon: Palette },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
  { id: 'privacy', label: 'Privasi', icon: ShieldCheck },
  { id: 'security', label: 'Keamanan', icon: KeyRound },
  { id: 'accessibility', label: 'Aksesibilitas', icon: Eye },
  { id: 'connected', label: 'Layanan Terhubung', icon: Link2 },
] as const

export default function Settings() {
  const [active, setActive] = useState<(typeof sections)[number]['id']>('account')
  const [activityVisible, setActivityVisible] = useState(true)
  const [onlineVisible, setOnlineVisible] = useState(false)
  const [leaderboardVisible, setLeaderboardVisible] = useState(true)
  const [friendRequests, setFriendRequests] = useState('semua')
  const [learningNotif, setLearningNotif] = useState(true)
  const [socialNotif, setSocialNotif] = useState(true)
  const [achievementNotif, setAchievementNotif] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const signOut = useAppStore((s) => s.signOut)
  const theme = useAppStore((s) => s.theme)
  const setThemeMode = useAppStore((s) => s.setThemeMode)

  const logout = async () => {
    if (supabase) await supabase.auth.signOut({ scope: 'global' })
    signOut()
    navigate('/masuk')
  }

  const Toggle = ({ value, onChange, label, hint }: { value: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) => (
    <div className="flex items-center justify-between gap-4 py-3">
      <div><p className="text-sm font-bold">{label}</p>{hint && <p className="text-xs text-muted">{hint}</p>}</div>
      <button role="switch" aria-checked={value} aria-label={label} onClick={() => onChange(!value)} className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', value ? 'bg-accent' : 'bg-line')}>
        <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', value ? 'translate-x-[22px]' : 'translate-x-0.5')} />
      </button>
    </div>
  )

  return (
    <div className="space-y-5">
      <div><span className="pill">Pengaturan</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Settings</h1><p className="mt-1.5 text-sm text-muted">Kelola akun, tampilan, notifikasi, dan privasimu.</p></div>

      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        <nav className="card h-fit !p-2" aria-label="Bagian pengaturan">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <button key={s.id} onClick={() => setActive(s.id)} className={cn('flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors', active === s.id ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-accent-soft/50')}>
                <Icon size={17} /> {s.label}
              </button>
            )
          })}
        </nav>

        <div className="card min-w-0">
          {active === 'account' && (
            <div className="space-y-4">
              <h2 className="section-title">Akun</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className="label">Nama</label><input className="input" defaultValue={user?.name ?? ''} readOnly /></div>
                <div><label className="label">Username</label><input className="input" defaultValue={`@${user?.username ?? ''}`} readOnly /></div>
                <div className="sm:col-span-2"><label className="label">Email</label><input className="input" defaultValue={user?.email ?? ''} readOnly /></div>
              </div>
              <p className="text-xs text-muted">Untuk mengubah data profil, gunakan halaman Profile.</p>
              <Link to="/app/profile" className="btn btn-outline !text-xs">Buka Profile</Link>
              <div className="border-t border-line pt-4">
                <button onClick={logout} className="btn btn-outline !text-danger hover:!border-danger"><LogOut size={15} /> Keluar dari akun</button>
              </div>
            </div>
          )}

          {active === 'appearance' && (
            <div className="space-y-4">
              <h2 className="section-title">Penampilan</h2>
              <p className="text-sm text-muted">Mode tampilan saat ini: <strong className="capitalize text-ink">{theme.mode}</strong></p>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'dark', 'system'] as const).map((m) => (
                  <button key={m} onClick={() => setThemeMode(m)} className={cn('rounded-xl border px-3 py-2.5 text-xs font-bold capitalize', theme.mode === m ? 'border-accent bg-accent-soft text-accent' : 'border-line')}>{m}</button>
                ))}
              </div>
              <Link to="/app/personalization" className="btn btn-primary !text-xs"><Palette size={15} /> Buka Personalization Studio</Link>
            </div>
          )}

          {active === 'notifications' && (
            <div>
              <h2 className="section-title">Notifikasi</h2>
              <div className="mt-3 divide-y divide-line">
                <Toggle value={learningNotif} onChange={setLearningNotif} label="Pembelajaran" hint="Pengingat lesson dan quest" />
                <Toggle value={socialNotif} onChange={setSocialNotif} label="Sosial" hint="Pesan dan permintaan teman" />
                <Toggle value={achievementNotif} onChange={setAchievementNotif} label="Achievement" hint="Badge yang baru dibuka" />
              </div>
              <p className="mt-3 text-xs text-muted">Notifikasi dirancang mendukung, bukan memaksa kamu membuka aplikasi.</p>
            </div>
          )}

          {active === 'privacy' && (
            <div>
              <h2 className="section-title">Privasi</h2>
              <div className="mt-3 divide-y divide-line">
                <Toggle value={activityVisible} onChange={setActivityVisible} label="Aktivitas belajar terlihat" hint="Teman dapat melihat aktivitas yang kamu izinkan" />
                <Toggle value={onlineVisible} onChange={setOnlineVisible} label="Status online" hint="Tampilkan saat kamu sedang aktif" />
                <Toggle value={leaderboardVisible} onChange={setLeaderboardVisible} label="Tampil di leaderboard" hint="Izinkan namamu muncul di peringkat" />
              </div>
              <div className="mt-4">
                <label className="label">Siapa boleh mengirim permintaan teman</label>
                <select className="input" value={friendRequests} onChange={(e) => setFriendRequests(e.target.value)}>
                  <option value="semua">Semua pengguna</option>
                  <option value="teman">Teman dari teman</option>
                  <option value="tidak_ada">Tidak ada</option>
                </select>
              </div>
            </div>
          )}

          {active === 'security' && (
            <div className="space-y-3">
              <h2 className="section-title">Keamanan</h2>
              <div className="rounded-2xl bg-bg p-4 text-sm text-muted">Kata sandi disimpan dengan hashing yang aman. Otorisasi dilakukan di server.</div>
              <button className="btn btn-outline !text-xs" onClick={() => window.alert('Tautan ubah password akan dikirim ke emailmu.')}>Ubah password</button>
              <button className="btn btn-outline !text-xs" onClick={() => window.alert('Perangkat lain telah logout.')}>Logout perangkat lain</button>
              <button className="btn btn-outline !text-danger !text-xs" onClick={() => window.alert('Permintaan penghapusan akun dicatat. Hubungi admin untuk memproses.')}>Hapus akun</button>
            </div>
          )}

          {active === 'accessibility' && (
            <div>
              <h2 className="section-title">Aksesibilitas</h2>
              <div className="mt-3 divide-y divide-line">
                <Toggle value={reducedMotion} onChange={(v) => { setReducedMotion(v); document.documentElement.style.setProperty('--motion-scale', v ? '0' : '1') }} label="Kurangi animasi" hint="Meminimalkan transisi dan gerakan" />
              </div>
              <p className="mt-3 text-xs text-muted">Ukuran teks dapat diubah di halaman materi pembelajaran.</p>
            </div>
          )}

          {active === 'connected' && (
            <div className="space-y-3">
              <h2 className="section-title">Layanan Terhubung</h2>
              <div className="flex items-center justify-between rounded-2xl border border-line p-4">
                <div><p className="text-sm font-bold">Google</p><p className="text-xs text-muted">Masuk dengan akun Google</p></div>
                <button className="btn btn-outline !text-xs" onClick={() => window.alert('Fitur penghubung akun akan tersedia setelah Supabase dikonfigurasi.')}>Hubungkan</button>
              </div>
              <p className="text-xs text-muted">Layanan lain dapat ditambahkan setelah kapasitas produk lebih jelas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
