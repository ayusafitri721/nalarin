import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bell, Compass, Flame, Gamepad2, Home, Menu, Route, ScrollText, Search,
  Settings, Sparkles, UserRound, Users, X, Zap,
} from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import { Logo } from '@/components/Illustrations'
import { Avatar } from '@/components/ui'

const mainNav = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/explore', label: 'Explore', icon: Compass },
  { to: '/app/journey', label: 'Journey', icon: Route },
  { to: '/app/games', label: 'Games', icon: Gamepad2 },
  { to: '/app/quest', label: 'Quest', icon: ScrollText },
  { to: '/app/friends', label: 'Friends', icon: Users },
]

const bottomNav = [
  { to: '/app/companion', label: 'Companion', icon: Sparkles },
  { to: '/app/profile', label: 'Profile', icon: UserRound },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

const mobileNav = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/explore', label: 'Explore', icon: Compass },
  { to: '/app/journey', label: 'Journey', icon: Route },
  { to: '/app/games', label: 'Games', icon: Gamepad2 },
  { to: '/app/friends', label: 'Friends', icon: Users },
]

function NavItem({ item, onClick }: { item: (typeof mainNav)[number]; onClick?: () => void }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) => cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
        isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-accent-soft/60 hover:text-ink',
      )}
    >
      <Icon size={19} />
      <span>{item.label}</span>
    </NavLink>
  )
}

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const sidebar = (
    <div className="flex h-full flex-col px-3 py-5">
      <Link to="/app" className="mb-7 px-2" onClick={() => setDrawerOpen(false)}><Logo /></Link>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Navigasi utama">
        {mainNav.map((item) => <NavItem key={item.to} item={item} onClick={() => setDrawerOpen(false)} />)}
      </nav>
      <div className="my-4 divider" />
      <nav className="flex flex-col gap-1" aria-label="Navigasi tambahan">
        {bottomNav.map((item) => <NavItem key={item.to} item={item} onClick={() => setDrawerOpen(false)} />)}
      </nav>
      <div className="mt-5 rounded-2xl bg-accent-soft p-3.5">
        <p className="font-display text-xs font-extrabold text-accent">Learn Beyond Limits</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">Satu langkah kecil tetap berarti hari ini.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-line bg-surface lg:block">{sidebar}</aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Tutup menu" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-surface shadow-modal">{sidebar}</aside>
          <button className="absolute left-[268px] top-4 grid h-9 w-9 place-items-center rounded-full bg-surface text-ink shadow-card" onClick={() => setDrawerOpen(false)} aria-label="Tutup"><X size={18} /></button>
        </div>
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-4 md:px-6">
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink hover:bg-accent-soft lg:hidden" onClick={() => setDrawerOpen(true)} aria-label="Buka menu">
              <Menu size={20} />
            </button>
            <form onSubmit={submitSearch} className="relative min-w-0 flex-1 md:max-w-sm">
              <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari materi, game, quest..."
                aria-label="Cari"
                className="input !py-2 !pl-9 text-sm"
              />
            </form>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1.5 text-xs font-extrabold text-warning sm:inline-flex" title="Streak belajar">
                <Flame size={15} /> {user?.streak ?? 7} Day
              </span>
              <span className="hidden items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-extrabold text-success sm:inline-flex" title="Total XP">
                <Zap size={15} /> {formatNumber(user?.xp ?? 2350)}
              </span>
              <span className="hidden rounded-full bg-accent-soft px-3 py-1.5 text-xs font-extrabold text-accent md:inline-flex">Lv {user?.level ?? 10}</span>
              <Link to="/app/notifications" className="relative grid h-9 w-9 place-items-center rounded-xl text-muted hover:bg-accent-soft hover:text-accent" aria-label="Notifikasi">
                <Bell size={19} />
                <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
              </Link>
              <Link to="/app/profile" aria-label="Profil"><Avatar name={user?.name ?? 'Learner'} color={user?.avatar} size={34} /></Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1240px] px-4 pb-28 pt-6 md:px-6 lg:pb-12">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-line bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden" aria-label="Navigasi bawah">
        {mobileNav.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn('flex min-w-[64px] flex-col items-center gap-1 py-2.5 text-[10px] font-bold', isActive ? 'text-accent' : 'text-muted')}
            >
              {({ isActive }) => (<><Icon size={20} strokeWidth={isActive ? 2.5 : 2} /><span>{item.label}</span></>)}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
