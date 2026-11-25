import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, MessageCircle, Plus, Search, Send, ShieldCheck, Swords, Users, X } from 'lucide-react'
import { Avatar, EmptyState } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

const friends = [
  { username: 'luna', name: 'Luna', color: '#E58AB6', online: true, lastActive: 'Sekarang', level: 12, common: 4 },
  { username: 'raka', name: 'Raka', color: '#5C8DF6', online: false, lastActive: '5 jam lalu', level: 9, common: 2 },
  { username: 'dinda', name: 'Dinda', color: '#4FB992', online: true, lastActive: 'Sekarang', level: 15, common: 6 },
  { username: 'bima', name: 'Bima', color: '#D9A25B', online: false, lastActive: 'Kemarin', level: 7, common: 1 },
]

export function Friends() {
  const [query, setQuery] = useState('')
  const [requestSent, setRequestSent] = useState(false)
  const showToast = useAppStore((s) => s.showToast)
  const visible = friends.filter((f) => (f.name + f.username).toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <span className="pill"><Users size={13} /> Sosial</span>
        <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Friends</h1>
        <p className="mt-1.5 text-sm text-muted">Belajar bersama teman membuat perjalanan lebih menyenangkan.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari teman berdasarkan username..." className="input !pl-10" />
          </form>

          <section>
            <h2 className="section-title">Temanmu ({visible.length})</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {visible.map((f) => (
                <div key={f.username} className="card">
                  <div className="flex items-center gap-3">
                    <Avatar name={f.name} color={f.color} size={44} />
                    <div className="min-w-0 flex-1">
                      <Link to={`/app/friends/${f.username}`} className="font-display text-sm font-extrabold hover:text-accent">{f.name}</Link>
                      <p className="text-xs text-muted">@{f.username} · Lv {f.level}</p>
                      <p className="text-[11px] text-muted">{f.online ? '🟢 Online' : `Terakhir aktif ${f.lastActive}`}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/app/messages/${f.username}`} className="btn btn-soft flex-1 !py-2 !text-xs"><MessageCircle size={14} /> Chat</Link>
                    <Link to="/app/duel" className="btn btn-outline flex-1 !py-2 !text-xs"><Swords size={14} /> Tantang</Link>
                  </div>
                </div>
              ))}
            </div>
            {visible.length === 0 && <div className="mt-4"><EmptyState icon={<Users size={24} />} title="Teman tidak ditemukan" description="Coba username lain atau kirim permintaan pertemanan." /></div>}
          </section>
        </div>

        <div className="space-y-5">
          <section className="card">
            <h2 className="font-display text-base font-extrabold">Tambah teman</h2>
            <p className="mt-1 text-xs text-muted">Cari berdasarkan username atau friend code.</p>
            {requestSent ? (
              <div className="mt-4 rounded-2xl bg-success/10 p-4 text-center text-sm font-bold text-success"><Check size={20} className="mx-auto" /> Permintaan terkirim</div>
            ) : (
              <button onClick={() => { setRequestSent(true); showToast('Permintaan pertemanan dikirim', 'success') }} className="btn btn-primary mt-4 w-full !text-xs"><Plus size={14} /> Kirim permintaan</button>
            )}
          </section>

          <section className="card">
            <h2 className="font-display text-base font-extrabold">Permintaan masuk</h2>
            <div className="mt-3 space-y-3">
              {[{ name: 'Sari', color: '#8E82E8' }, { name: 'Fajar', color: '#E5806C' }].map((r) => (
                <div key={r.name} className="flex items-center gap-2">
                  <Avatar name={r.name} color={r.color} size={34} />
                  <span className="flex-1 text-xs font-bold">{r.name}</span>
                  <button onClick={() => showToast(`Permintaan ${r.name} diterima`, 'success')} className="grid h-7 w-7 place-items-center rounded-full bg-success/15 text-success" aria-label={`Terima ${r.name}`}><Check size={14} /></button>
                  <button onClick={() => showToast(`Permintaan ${r.name} ditolak`, 'info')} className="grid h-7 w-7 place-items-center rounded-full bg-danger/15 text-danger" aria-label={`Tolak ${r.name}`}><X size={14} /></button>
                </div>
              ))}
            </div>
          </section>

          <div className="card bg-accent-soft">
            <ShieldCheck size={20} className="text-accent" />
            <p className="mt-2 text-xs leading-relaxed text-muted">Kamu dapat memblokir atau melaporkan pengguna dari halaman profil mereka. Privasimu tetap terjaga.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FriendProfile() {
  const { username } = useParams()
  const friend = friends.find((f) => f.username === username)
  const showToast = useAppStore((s) => s.showToast)
  if (!friend) return <EmptyState title="Pengguna tidak ditemukan" description="Profil ini tidak tersedia." action={<Link className="btn btn-primary" to="/app/friends">Kembali</Link>} />

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link to="/app/friends" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-accent"><ArrowLeft size={15} /> Kembali ke Friends</Link>
      <div className="card overflow-hidden !p-0">
        <div className="h-24" style={{ background: friend.color }} />
        <div className="px-5 pb-5">
          <div className="-mt-9 w-fit rounded-full border-4 border-surface"><Avatar name={friend.name} color={friend.color} size={72} /></div>
          <h1 className="mt-3 font-display text-2xl font-extrabold">{friend.name}</h1>
          <p className="text-sm text-muted">@{friend.username} · Level {friend.level}</p>
          <p className="mt-3 text-sm text-muted">Suka menjelajahi topik logika dan sains. Selalu siap belajar bersama.</p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[['Streak', '12'], ['Pelajaran', '24'], ['Achievement', '8']].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-bg p-3"><p className="font-display text-lg font-extrabold">{value}</p><p className="text-[11px] text-muted">{label}</p></div>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <Link to={`/app/messages/${friend.username}`} className="btn btn-primary flex-1"><MessageCircle size={15} /> Chat</Link>
            <Link to="/app/duel" className="btn btn-outline flex-1"><Swords size={15} /> Challenge</Link>
          </div>
          <div className="mt-4 flex gap-2 border-t border-line pt-4">
            <button onClick={() => showToast(`${friend.name} diblokir`, 'info')} className="btn btn-outline flex-1 !text-xs">Blokir</button>
            <button onClick={() => showToast(`Laporan untuk ${friend.name} dikirim`, 'success')} className="btn btn-outline flex-1 !text-xs !text-danger">Laporkan</button>
          </div>
          <p className="mt-3 text-[11px] text-muted">Hanya statistik yang diizinkan pengguna yang ditampilkan.</p>
        </div>
      </div>
    </div>
  )
}

const conversations = [
  { id: 'luna', name: 'Luna', color: '#E58AB6', last: 'Setuju, kita belajar jam 8 ya!', time: '10:42', unread: 2 },
  { id: 'raka', name: 'Raka', color: '#5C8DF6', last: 'Kuis Logika-nya seru banget', time: 'Kemarin', unread: 0 },
  { id: 'dinda', name: 'Dinda', color: '#4FB992', last: 'Cek ruang belajar yuk', time: 'Senin', unread: 0 },
]

export function Messages() {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([
    { from: 'them', text: 'Hai! Sudah lanjut belajar logic arena?', time: '10:38' },
    { from: 'me', text: 'Iya, baru selesai 2 modul 😄', time: '10:40' },
    { from: 'them', text: 'Setuju, kita belajar jam 8 ya!', time: '10:42' },
  ])
  const [input, setInput] = useState('')
  const conversation = conversations.find((c) => c.id === conversationId)

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages([...messages, { from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }])
    setInput('')
  }

  if (conversationId) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Link to="/app/messages" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-accent"><ArrowLeft size={15} /> Daftar chat</Link>
        <div className="card overflow-hidden !p-0">
          <div className="flex items-center gap-3 border-b border-line p-4">
            <Avatar name={conversation?.name ?? conversationId} color={conversation?.color} size={38} />
            <div><p className="font-display text-sm font-extrabold">{conversation?.name ?? conversationId}</p><p className="text-xs text-muted">Percakapan privat</p></div>
            <Link to="/app/friends" className="ml-auto text-xs font-bold text-accent">Profil</Link>
          </div>
          <div className="space-y-3 bg-bg p-4 min-h-80">
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-[80%] rounded-2xl px-4 py-2.5 text-sm', m.from === 'me' ? 'rounded-br-md bg-accent text-white' : 'rounded-bl-md bg-surface')}>
                  {m.text}<span className={cn('mt-1 block text-[10px]', m.from === 'me' ? 'text-white/70' : 'text-muted')}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-line p-3">
            <input className="input" placeholder="Tulis pesan..." value={input} onChange={(e) => setInput(e.target.value)} aria-label="Pesan" />
            <button className="btn btn-primary !px-4" disabled={!input.trim()} aria-label="Kirim"><Send size={16} /></button>
          </form>
          <p className="px-4 pb-3 text-[11px] text-muted">Hanya teman yang terhubung yang dapat memulai percakapan. Block dan report tersedia di profil.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><MessageCircle size={13} /> Messages</span><h1 className="mt-3 font-display text-2xl font-extrabold">Chat</h1></div>
      <div className="space-y-2.5">
        {conversations.map((c) => (
          <Link key={c.id} to={`/app/messages/${c.id}`} className="card flex items-center gap-3 hover:shadow-hover">
            <Avatar name={c.name} color={c.color} size={44} />
            <div className="min-w-0 flex-1"><p className="font-display text-sm font-extrabold">{c.name}</p><p className="truncate text-xs text-muted">{c.last}</p></div>
            <div className="text-right"><p className="text-[11px] text-muted">{c.time}</p>{c.unread > 0 && <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-white">{c.unread}</span>}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function StudyRooms() {
  const [joined, setJoined] = useState<string[]>([])
  const showToast = useAppStore((s) => s.showToast)
  const rooms = [
    { id: 'r1', name: 'Logika & Puzzle', desc: 'Bahas teka-teki dan strategi pemecahan masalah.', members: 8, topic: 'Logic Arena' },
    { id: 'r2', name: 'Science Club', desc: 'Eksplorasi fenomena alam dan eksperimen sederhana.', members: 12, topic: 'Science Lab' },
    { id: 'r3', name: 'Belajar Bahasa', desc: 'Latih kosakata dan percakapan santai.', members: 5, topic: 'Language Sphere' },
  ]
  return (
    <div className="space-y-5">
      <div><span className="pill"><Users size={13} /> Group Study</span><h1 className="mt-3 font-display text-2xl font-extrabold">Study Room</h1><p className="mt-1.5 text-sm text-muted">Ruang kolaborasi teks dan materi bersama. Video call bukan bagian dari versi awal.</p></div>
      <div className="grid gap-3 md:grid-cols-2">
        {rooms.map((r) => (
          <div key={r.id} className="card">
            <p className="pill !text-[10px]">{r.topic}</p>
            <h2 className="mt-3 font-display text-base font-extrabold">{r.name}</h2>
            <p className="mt-1 text-xs text-muted">{r.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted">{r.members} anggota</span>
              <button onClick={() => { setJoined([...joined, r.id]); showToast(`Kamu bergabung dengan ${r.name}`, 'success') }} disabled={joined.includes(r.id)} className="btn btn-primary !py-2 !text-xs">{joined.includes(r.id) ? 'Tergabung' : 'Gabung'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Duel() {
  const [friend, setFriend] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const awardXp = useAppStore((s) => s.awardXp)
  const questions = [
    { q: 'Manakah bilangan prima?', options: ['12', '17', '20', '25'], correct: 1 },
    { q: 'Singkatan dari CPU adalah...', options: ['Central Process Unit', 'Central Processing Unit', 'Computer Process Unit', 'Central Program Unit'], correct: 1 },
    { q: 'Air termasuk benda...', options: ['Padat', 'Cair', 'Gas', 'Plasma'], correct: 1 },
  ]
  const [index, setIndex] = useState(0)

  const answer = (i: number) => {
    if (i === questions[index].correct) setScore(score + 1)
    if (index < questions.length - 1) setIndex(index + 1)
    else { setDone(true); awardXp(15, 'duel:completed') }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill"><Swords size={13} /> Knowledge Duel</span><h1 className="mt-3 font-display text-2xl font-extrabold">Duel Pengetahuan</h1><p className="mt-1.5 text-sm text-muted">Ajak teman, jawab pertanyaan yang setara, dan lihat hasilnya.</p></div>
      {!started ? (
        <div className="card">
          <h2 className="font-display text-base font-extrabold">1. Pilih teman</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {friends.map((f) => (
              <button key={f.username} onClick={() => setFriend(f.username)} className={cn('flex items-center gap-3 rounded-2xl border p-3 text-left', friend === f.username ? 'border-accent bg-accent-soft' : 'border-line')}>
                <Avatar name={f.name} color={f.color} size={34} /><span className="text-sm font-bold">{f.name}</span>
                {friend === f.username && <Check size={16} className="ml-auto text-accent" />}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div><label className="label">Kategori</label><select className="input"><option>Logika</option><option>Pengetahuan Umum</option><option>Sains</option></select></div>
            <div><label className="label">Tingkat kesulitan</label><select className="input"><option>Pemula</option><option>Menengah</option></select></div>
          </div>
          <button disabled={!friend} className="btn btn-primary mt-5 w-full" onClick={() => setStarted(true)}>Kirim undangan & mulai duel</button>
        </div>
      ) : done ? (
        <div className="card text-center !py-10">
          <span className="text-5xl">🏆</span>
          <h2 className="mt-4 font-display text-2xl font-extrabold">Duel selesai!</h2>
          <p className="mt-2 text-sm text-muted">Skor kamu: {score}/{questions.length} · +15 XP</p>
          <p className="mt-1 text-xs text-muted">Hasil disimpan dan ditampilkan kepada kedua pemain.</p>
          <button className="btn btn-primary mt-6" onClick={() => { setStarted(false); setDone(false); setScore(0); setIndex(0) }}>Rematch</button>
        </div>
      ) : (
        <div className="card !p-6">
          <div className="flex items-center justify-between"><p className="text-sm font-bold text-muted">Versus · {friend}</p><span className="pill">Soal {index + 1}/{questions.length}</span></div>
          <h2 className="mt-5 font-display text-lg font-extrabold">{questions[index].q}</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {questions[index].options.map((o, i) => <button key={o} onClick={() => answer(i)} className="rounded-2xl border border-line p-3.5 text-left text-sm font-semibold hover:border-accent hover:bg-accent-soft">{o}</button>)}
          </div>
        </div>
      )}
    </div>
  )
}

export function Leaderboard() {
  const [tab, setTab] = useState('Friends')
  const [hidden, setHidden] = useState(false)
  const entries = [
    { name: 'Dinda', xp: 4820, level: 18, color: '#4FB992' },
    { name: 'Luna', xp: 3950, level: 15, color: '#E58AB6' },
    { name: 'Kamu', xp: 2350, level: 10, color: '#7563E8' },
    { name: 'Raka', xp: 1980, level: 9, color: '#5C8DF6' },
    { name: 'Bima', xp: 1240, level: 7, color: '#D9A25B' },
  ]
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div><span className="pill">Leaderboard</span><h1 className="mt-3 font-display text-2xl font-extrabold">Peringkat</h1></div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['Friends', 'Weekly', 'Monthly', 'All Time'].map((t) => <button key={t} onClick={() => setTab(t)} className={cn('shrink-0 rounded-full px-4 py-2 text-xs font-bold', tab === t ? 'bg-accent text-white' : 'bg-surface text-muted')}>{t}</button>)}
      </div>
      <div className="space-y-2.5">
        {entries.filter((e) => !(hidden && e.name === 'Kamu')).map((e, i) => (
          <div key={e.name} className="card flex items-center gap-3">
            <span className={cn('grid h-8 w-8 place-items-center rounded-full font-display text-sm font-extrabold', i === 0 ? 'bg-warning/20 text-warning' : 'bg-bg text-muted')}>{i + 1}</span>
            <Avatar name={e.name} color={e.color} size={38} />
            <div className="flex-1"><p className="font-display text-sm font-extrabold">{e.name}</p><p className="text-xs text-muted">Level {e.level}</p></div>
            <p className="text-sm font-extrabold text-accent">{e.xp.toLocaleString('id-ID')} XP</p>
          </div>
        ))}
      </div>
      <button onClick={() => setHidden(!hidden)} className="btn btn-outline !text-xs">Sembunyikan diri dari leaderboard: {hidden ? 'Ya' : 'Tidak'}</button>
    </div>
  )
}
