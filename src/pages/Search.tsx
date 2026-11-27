import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BookOpen, Clock, Gamepad2, Search, Target, Trash2, X } from 'lucide-react'
import { EmptyState } from '@/components/ui'
import { games, quests, topics } from '@/data/content'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'all', label: 'Semua' },
  { id: 'topics', label: 'Topik' },
  { id: 'games', label: 'Game' },
  { id: 'quests', label: 'Quest' },
  { id: 'users', label: 'Pengguna' },
] as const

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const [input, setInput] = useState(query)
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('all')
  const [history, setHistory] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('nalarin-search-history') ?? '[]') } catch { return [] }
  })

  const submit = (value: string) => {
    const q = value.trim()
    if (!q) return
    setParams({ q })
    setInput(q)
    const next = [q, ...history.filter((h) => h !== q)].slice(0, 6)
    setHistory(next)
    localStorage.setItem('nalarin-search-history', JSON.stringify(next))
  }

  const q = query.toLowerCase()
  const matchedTopics = q ? topics.filter((t) => (t.title + t.description).toLowerCase().includes(q)) : []
  const matchedGames = q ? games.filter((g) => (g.title + g.description).toLowerCase().includes(q)) : []
  const matchedQuests = q ? quests.filter((s) => (s.title + s.description).toLowerCase().includes(q)) : []
  const matchedUsers = q ? [{ username: 'luna', name: 'Luna', color: '#E58AB6' }, { username: 'raka', name: 'Raka', color: '#5C8DF6' }].filter((u) => (u.name + u.username).toLowerCase().includes(q)) : []
  const total = matchedTopics.length + matchedGames.length + matchedQuests.length + matchedUsers.length

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Pencarian</h1>
        <form onSubmit={(e) => { e.preventDefault(); submit(input) }} className="relative mt-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input !py-3 !pl-12 !pr-12" placeholder="Cari topik, game, quest, atau pengguna..." value={input} onChange={(e) => setInput(e.target.value)} aria-label="Cari" />
          {input && <button type="button" onClick={() => setInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" aria-label="Hapus"><X size={17} /></button>}
        </form>
      </div>

      {!query && history.length > 0 && (
        <section className="card">
          <div className="flex items-center justify-between"><h2 className="font-display text-sm font-extrabold">Riwayat pencarian</h2><button onClick={() => { setHistory([]); localStorage.removeItem('nalarin-search-history') }} className="inline-flex items-center gap-1 text-xs font-bold text-danger hover:underline"><Trash2 size={13} /> Hapus</button></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {history.map((h) => <button key={h} onClick={() => submit(h)} className="inline-flex items-center gap-1.5 rounded-full bg-bg px-3 py-1.5 text-xs font-semibold hover:bg-accent-soft"><Clock size={12} /> {h}</button>)}
          </div>
        </section>
      )}

      {query && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((t) => <button key={t.id} onClick={() => setTab(t.id)} className={cn('shrink-0 rounded-full px-4 py-2 text-xs font-bold', tab === t.id ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-accent')}>{t.label}</button>)}
          </div>
          <p className="text-xs text-muted">{total} hasil untuk “{query}”</p>

          {total === 0 ? (
            <EmptyState icon={<Search size={24} />} title="Tidak ada hasil" description="Coba kata kunci lain atau jelajahi Knowledge Universe." action={<Link className="btn btn-primary" to="/app/explore">Jelajahi materi</Link>} />
          ) : (
            <div className="space-y-2.5">
              {(tab === 'all' || tab === 'topics') && matchedTopics.map((t) => (
                <Link key={t.id} to={`/app/topic/${t.slug}`} className="card flex items-center gap-3 hover:shadow-hover">
                  <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: t.soft, color: t.accent }}><BookOpen size={20} /></span>
                  <div className="min-w-0"><p className="font-display text-sm font-extrabold">{t.title}</p><p className="text-xs text-muted">Topik · {t.difficulty}</p></div>
                </Link>
              ))}
              {(tab === 'all' || tab === 'games') && matchedGames.map((g) => (
                <Link key={g.slug} to={`/app/games/${g.slug}`} className="card flex items-center gap-3 hover:shadow-hover">
                  <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${g.accent}22`, color: g.accent }}><Gamepad2 size={20} /></span>
                  <div className="min-w-0"><p className="font-display text-sm font-extrabold">{g.title}</p><p className="text-xs text-muted">Game · {g.difficulty}</p></div>
                </Link>
              ))}
              {(tab === 'all' || tab === 'quests') && matchedQuests.map((s) => (
                <Link key={s.id} to="/app/quest" className="card flex items-center gap-3 hover:shadow-hover">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-warning/15 text-warning"><Target size={20} /></span>
                  <div className="min-w-0"><p className="font-display text-sm font-extrabold">{s.title}</p><p className="text-xs text-muted">Quest · {s.category}</p></div>
                </Link>
              ))}
              {(tab === 'all' || tab === 'users') && matchedUsers.map((u) => (
                <Link key={u.username} to={`/app/friends/${u.username}`} className="card flex items-center gap-3 hover:shadow-hover">
                  <span className="grid h-11 w-11 place-items-center rounded-full font-display font-extrabold text-white" style={{ background: u.color }}>{u.name[0]}</span>
                  <div><p className="font-display text-sm font-extrabold">{u.name}</p><p className="text-xs text-muted">@{u.username}</p></div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
