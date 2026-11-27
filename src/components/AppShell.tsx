import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bell, BookOpen, Check, ChevronDown, CircleHelp, Compass, Flame, Gamepad2, Home,
  LogOut, Menu, PanelLeftClose, PanelLeftOpen, Route, ScrollText, Search, Settings,
  Sparkles, UserRound, Users, X, Zap,
} from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import { Logo } from '@/components/Illustrations'
import { Avatar } from '@/components/ui'
import { topics, universes } from '@/data/content'
import type { LearningTrack } from '@/types'

type NavEntry = { to: string; label: string; icon: typeof Home; end?: boolean }

const homeNav: NavEntry = { to: '/app', label: 'Home', icon: Home, end: true }

const mainNav: NavEntry[] = [
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
          ? 'bg-accent-soft text-accent'
          : 'text-muted hover:bg-accent-soft/60 hover:text-ink',
      )}
    >
      <Icon size={19} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
      {!compact && <span>{item.label}</span>}
    </NavLink>
  )
}

const sectionText = 'text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted/70'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className={cn('mb-2 px-3', sectionText)}>{children}</p>
}

function SectionToggle({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={cn('mb-2 flex w-full items-center justify-between px-3 transition-colors hover:text-ink', sectionText)}
    >
      <span>{label}</span>
      <ChevronDown size={13} className={cn('shrink-0 transition-transform', open && 'rotate-180')} />
    </button>
  )
}

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('nalarin:sidebar-collapsed') === '1' } catch { return false }
  })
  const [query, setQuery] = useState('')
  const [activeTrack, setActiveTrack] = useState<'semua' | LearningTrack>(() => {
    try { return (localStorage.getItem('nalarin:active-track') as 'semua' | LearningTrack) || 'semua' } catch { return 'semua' }
  })
  const [trackOpen, setTrackOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(true)
  const [akunOpen, setAkunOpen] = useState(true)
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const signOut = useAppStore((s) => s.signOut)

  useEffect(() => {
    try { localStorage.setItem('nalarin:sidebar-collapsed', collapsed ? '1' : '0') } catch { /* storage opsional */ }
  }, [collapsed])

  useEffect(() => {
    try { localStorage.setItem('nalarin:active-track', activeTrack) } catch { /* storage opsional */ }
  }, [activeTrack])

  useEffect(() => {
    if (!trackOpen) return
    const onPointerDown = (event: MouseEvent) => {
      if (!trackRef.current?.contains(event.target as Node)) setTrackOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setTrackOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [trackOpen])

  useEffect(() => {
    if (!accountOpen) return
    const onPointerDown = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAccountOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [accountOpen])

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase')
    if (supabase) await supabase.auth.signOut({ scope: 'global' })
    signOut()
    setAccountOpen(false)
    navigate('/masuk')
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const currentUniverse = universes.find((u) => u.track === activeTrack)
  const trackTopics = activeTrack === 'semua' ? [] : topics.filter((topic) => topic.track === activeTrack)
  const hasGrades = trackTopics.some((topic) => topic.grade !== undefined)
  const topicGroups = hasGrades
    ? [...new Set(trackTopics.map((topic) => topic.grade).filter((grade): grade is number => grade !== undefined))]
        .sort((a, b) => a - b)
        .map((grade) => ({ label: `Kelas ${grade}`, items: trackTopics.filter((topic) => topic.grade === grade) }))
    : [{ label: 'Topik', items: trackTopics }]

  const topicNav = (topic: (typeof topics)[number]): NavEntry => ({
    to: `/app/topic/${topic.slug}`,
    label: topic.title,
    icon: BookOpen,
  })

  const renderSidebar = (compact: boolean, onClose?: () => void) => (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-3 py-5">
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

      {!compact && (
        <div className="relative mb-5" ref={trackRef}>
          <SectionLabel>Jalur belajar</SectionLabel>
          <button
            type="button"
            onClick={() => setTrackOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={trackOpen}
            className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-bg px-3 py-2.5 text-left transition-colors hover:bg-surface"
          >
            <span className="min-w-0 flex-1 truncate text-xs font-bold">
              {activeTrack === 'semua' ? 'Semua jalur' : currentUniverse?.title}
            </span>
            <ChevronDown size={15} className={cn('shrink-0 text-muted transition-transform', trackOpen && 'rotate-180')} />
          </button>

          {trackOpen && (
            <div
              role="listbox"
              aria-label="Pilih jalur belajar"
              className="absolute left-0 right-0 top-full z-40 mt-1 max-h-72 overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-card"
            >
              <button
                type="button"
                role="option"
                aria-selected={activeTrack === 'semua'}
                onClick={() => { setActiveTrack('semua'); setTrackOpen(false) }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs transition-colors',
                  activeTrack === 'semua' ? 'font-bold text-ink' : 'text-muted hover:text-ink',
                )}
              >
                <span className="flex-1 text-left">Semua jalur</span>
                {activeTrack === 'semua' && <Check size={14} />}
              </button>
              {universes.map((universe) => (
                <button
                  key={universe.track}
                  type="button"
                  role="option"
                  aria-selected={activeTrack === universe.track}
                  onClick={() => { setActiveTrack(universe.track); setTrackOpen(false) }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs transition-colors',
                    activeTrack === universe.track ? 'font-bold text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  <span className="flex-1 text-left">{universe.title}</span>
                  {activeTrack === universe.track && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mb-1">
        <NavItem item={homeNav} onClick={onClose} compact={compact} />
      </div>

      <div className="my-3 divider" />

      {compact ? (
        <nav className="flex flex-col gap-1" aria-label="Navigasi utama">
          {(activeTrack === 'semua' ? mainNav : trackTopics.map(topicNav)).map((item) => (
            <NavItem key={item.to} item={item} onClick={onClose} compact />
          ))}
        </nav>
      ) : (
        <>
          <SectionToggle label="Menu utama" open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
          {menuOpen && (
            activeTrack === 'semua' ? (
              <nav className="flex flex-col gap-1" aria-label="Navigasi utama">
                {mainNav.map((item) => <NavItem key={item.to} item={item} onClick={onClose} />)}
              </nav>
            ) : (
              <div className="space-y-4">
                <Link
                  to={`/app/universe/${currentUniverse?.slug ?? activeTrack}`}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl bg-accent-soft px-3 py-2.5 text-xs font-extrabold text-accent"
                >
                  {currentUniverse?.title ?? activeTrack}
                </Link>
                {topicGroups.map((group) => (
                  <div key={group.label}>
                    <SectionLabel>{group.label}</SectionLabel>
                    <nav className="flex flex-col gap-1" aria-label={`Topik ${group.label}`}>
                      {group.items.map((topic) => <NavItem key={topic.id} item={topicNav(topic)} onClick={onClose} />)}
                    </nav>
                  </div>
                ))}
              </div>
            )
          )}
        </>
      )}

      <div className="my-4 divider" />

      {compact ? (
        <nav className="flex flex-col gap-1" aria-label="Navigasi tambahan">
          {bottomNav.map((item) => <NavItem key={item.to} item={item} onClick={onClose} compact />)}
        </nav>
      ) : (
        <>
          <SectionToggle label="Akun & teman" open={akunOpen} onToggle={() => setAkunOpen((v) => !v)} />
          {akunOpen && (
            <nav className="flex flex-col gap-1" aria-label="Navigasi tambahan">
              {bottomNav.map((item) => <NavItem key={item.to} item={item} onClick={onClose} />)}
            </nav>
          )}
        </>
      )}

      <div className={cn('relative mt-auto shrink-0', compact ? 'pt-4' : 'pt-5')} ref={accountRef}>
        {accountOpen && (
          <div
            role="menu"
            className={cn(
              'absolute z-40 rounded-2xl border border-line bg-surface p-1.5 shadow-card',
              compact ? 'bottom-0 left-full ml-2 w-56' : 'bottom-full left-0 right-0 mb-2',
            )}
          >
            <Link
              to="/app/profile"
              role="menuitem"
              onClick={() => { setAccountOpen(false); onClose?.() }}
              className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-muted hover:bg-accent-soft/60 hover:text-ink"
            >
              <UserRound size={15} /> Profil
            </Link>
            <Link
              to="/app/settings"
              role="menuitem"
              onClick={() => { setAccountOpen(false); onClose?.() }}
              className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-muted hover:bg-accent-soft/60 hover:text-ink"
            >
              <Settings size={15} /> Pengaturan
            </Link>
            <Link
              to="/app/help"
              role="menuitem"
              onClick={() => { setAccountOpen(false); onClose?.() }}
              className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-muted hover:bg-accent-soft/60 hover:text-ink"
            >
              <CircleHelp size={15} /> Bantuan
            </Link>
            <div className="my-1 divider" />
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
            >
              <LogOut size={15} /> Keluar
            </button>
            <p className="px-2.5 pb-1 pt-1.5 text-[10px] text-muted">Nalarin v1.0</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setAccountOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={accountOpen}
          title={compact ? 'Akun' : undefined}
          aria-label={compact ? 'Akun' : undefined}
          className={cn(
            'flex w-full items-center rounded-xl border border-line bg-bg p-2 text-left transition-colors hover:bg-surface',
            compact ? 'justify-center' : 'gap-2.5',
          )}
        >
          <Avatar name={user?.name ?? 'Learner'} color={user?.avatar} size={34} />
          {!compact && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-sm font-extrabold">{user?.name ?? 'Learner'}</span>
                <span className="block truncate text-xs text-muted">{user?.email ?? ''}</span>
              </span>
              <ChevronDown size={14} className={cn('shrink-0 text-muted transition-transform', accountOpen && 'rotate-180')} />
            </>
          )}
        </button>
      </div>
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
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="absolute -right-2 top-6 z-40 grid h-7 w-7 place-items-center rounded-full border border-line bg-surface text-muted shadow-card transition-colors hover:border-accent hover:text-accent"
            aria-label="Buka menu"
            title="Buka menu"
          >
            <PanelLeftOpen size={15} />
          </button>
        )}
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
