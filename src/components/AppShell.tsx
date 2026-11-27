import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bell, Compass, Flame, Gamepad2, Home, Menu, PanelLeftClose, PanelLeftOpen,
  Route, ScrollText, Search, Settings, Sparkles, UserRound, Users, X, Zap,
} from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import { Logo } from '@/components/Illustrations'
import { Avatar } from '@/components/ui'

type NavEntry = { to: string; label: string; icon: typeof Home; end?: boolean }

const mainNav: NavEntry[] = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/explore', label: 'Explore', icon: Compass },
  { to: '/app/journey', label: 'Journey', icon: Route },
  { to: '/app/games', label: 'Games', icon: Gamepad2 },
  { to: '/app/quest', label: 'Quest', icon: ScrollText },
  { to: '/app/friends', label: 'Friends', icon: Users },
]

const bottomNav: NavEntry[] = [
  { to: '/app/companion', label: 'Companion', icon: Sparkles },
  { to: '/app/profile', label: 'Profile', icon: UserRound },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

const mobileNav: NavEntry[] = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/explore', label: 'Explore', icon: Compass },
  { to: '/app/journey', label: 'Journey', icon: Route },
  { to: '/app/games', label: 'Games', icon: Gamepad2 },
  { to: '/app/friends', label: 'Friends', icon: Users },
]

function NavItem({ item, onClick, compact }: { item: NavEntry; onClick?: () => void; compact?: boolean }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      title={compact ? item.label : undefined}
      aria-label={compact ? item.label : undefined}
      className={({ isActive }) => cn(
        'group relative flex items-center rounded-xl text-sm font-semibold transition-all duration-200',
        compact ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2.5',
        isActive
          ? 'bg-accent-soft text-accent shadow-[inset_3px_0_0_var(--accent)]'
          : 'text-muted hover:bg-accent-soft/60 hover:text-ink',
      )}
    >
      <Icon size={19} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
      {!compact && <span>{item.label}</span>}
    </NavLink>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted/70">{children}</p>
}

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('nalarin:sidebar-collapsed') === '1' } catch { return false }
  })
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)

  useEffect(() => {
    try { localStorage.setItem('nalarin:sidebar-collapsed', collapsed ? '1' : '0') } catch { /* storage opsional */ }
  }, [collapsed])

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const renderSidebar = (compact: boolean, onClose?: () => void) => (
    <div className="flex h-full flex-col px-3 py-5">
      <div className={cn('mb-7 flex items-center', compact ? 'justify-center' : 'justify-between px-2')}>
        <Link to="/app" onClick={onClose} aria-label="Nalarin home"><Logo compact={compact} /></Link>
        {onClose ? (
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl text-muted transition-colors hover:bg-accent-soft hover:text-ink"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        ) : !compact ? (
          <button
            onClick={() => setCollapsed(true)}
            className="grid h-9 w-9 place-items-center rounded-xl text-muted transition-colors hover:bg-accent-soft hover:text-ink"
            aria-label="Ciutkan menu"
            title="Ciutkan menu"
          >
            <PanelLeftClose size={19} />
          </button>
        ) : null}
      </div>

      {!compact && <SectionLabel>Menu utama</SectionLabel>}
      <nav className="flex flex-1 flex-col gap-1" aria-label="Navigasi utama">
        {mainNav.map((item) => <NavItem key={item.to} item={item} onClick={onClose} compact={compact} />)}
      </nav>

      <div className="my-4 divider" />

      {!compact && <SectionLabel>Akun &amp; teman</SectionLabel>}
      <nav className="flex flex-col gap-1" aria-label="Navigasi tambahan">
        {bottomNav.map((item) => <NavItem key={item.to} item={item} onClick={onClose} compact={compact} />)}
      </nav>

      {compact && !onClose && (
        <button
          onClick={() => setCollapsed(false)}
          className="mt-auto grid h-10 w-10 place-items-center self-center rounded-xl text-muted transition-colors hover:bg-accent-soft hover:text-ink"
          aria-label="Buka menu"
          title="Buka menu"
        >
          <PanelLeftOpen size={19} />
        </button>
      )}

      {!compact && (
        <div className="mt-5 rounded-2xl bg-accent-soft p-3.5">
          <p className="font-display text-xs font-extrabold text-accent">Learn Beyond Limits</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">Satu langkah kecil tetap berarti hari ini.</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-bg">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden border-r border-line bg-surface transition-[width] duration-300 ease-in-out lg:block',
          collapsed ? 'w-20' : 'w-60',
        )}
      >
        {renderSidebar(collapsed)}
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu navigasi">
          <button className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Tutup menu" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-modal">
            {renderSidebar(false, () => setDrawerOpen(false))}
          </aside>
        </div>
      )}

      <div className={cn('transition-[padding] duration-300 ease-in-out', collapsed ? 'lg:pl-20' : 'lg:pl-60')}>
        <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-4 md:px-6">
            <button
              className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-accent-soft hover:text-accent lg:grid"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? 'Buka menu' : 'Ciutkan menu'}
              aria-expanded={!collapsed}
              title={collapsed ? 'Buka menu' : 'Ciutkan menu'}
            >
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
            <button
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink transition-colors hover:bg-accent-soft lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Buka menu"
            >
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
                <Flame size={15} /> {user?.streak ?? 0} Day
              </span>
              <span className="hidden items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-extrabold text-success sm:inline-flex" title="Total XP">
                <Zap size={15} /> {formatNumber(user?.xp ?? 0)}
              </span>
              <span className="hidden rounded-full bg-accent-soft px-3 py-1.5 text-xs font-extrabold text-accent md:inline-flex">Lv {user?.level ?? 1}</span>
              <Link to="/app/notifications" className="relative grid h-9 w-9 place-items-center rounded-xl text-muted transition-colors hover:bg-accent-soft hover:text-accent" aria-label="Notifikasi">
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
