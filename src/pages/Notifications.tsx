import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Bell, CheckCheck, Info, MessageCircle, BookOpen } from 'lucide-react'
import { EmptyState } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import type { NotificationItem } from '@/types'

const items: NotificationItem[] = [
  { id: 'n1', type: 'achievement', title: 'Achievement berhasil dibuka!', body: 'Kamu mendapat badge Consistency Master.', time: '5 menit lalu', read: false, href: '/app/achievements' },
  { id: 'n2', type: 'learning', title: 'Quest harian menunggu', body: 'Selesaikan 1 lesson untuk mendapatkan 50 XP.', time: '1 jam lalu', read: false, href: '/app/quest' },
  { id: 'n3', type: 'social', title: 'Luna mengajakmu belajar', body: 'Kamu diundang ke ruang belajar Logika.', time: '3 jam lalu', read: false, href: '/app/friends' },
  { id: 'n4', type: 'learning', title: 'Materi baru tersedia', body: 'Topik “Berpikir Kreatif” sudah bisa dipelajari.', time: 'Kemarin', read: true, href: '/app/explore' },
  { id: 'n5', type: 'system', title: 'Tema disimpan', body: 'Preferensi tampilanmu berlaku di semua perangkat.', time: '2 hari lalu', read: true, href: '/app/personalization' },
]

const tabs = [
  { id: 'all', label: 'Semua' },
  { id: 'learning', label: 'Pembelajaran' },
  { id: 'social', label: 'Sosial' },
  { id: 'achievement', label: 'Achievement' },
  { id: 'system', label: 'Sistem' },
] as const

const icons = { learning: BookOpen, social: MessageCircle, achievement: Award, system: Info }

export default function Notifications() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('all')
  const readIds = useAppStore((s) => s.notificationsRead)
  const markRead = useAppStore((s) => s.markNotificationRead)
  const markAllRead = useAppStore((s) => s.markAllNotificationsRead)
  const visible = items.filter((n) => tab === 'all' || n.type === tab)
  const unread = items.filter((n) => !readIds.includes(n.id)).length

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><span className="pill"><Bell size={13} /> Notification Center</span><h1 className="mt-3 font-display text-2xl font-extrabold">Notifikasi</h1><p className="mt-1 text-sm text-muted">{unread} notifikasi belum dibaca</p></div>
        <button className="btn btn-outline !text-xs" onClick={() => markAllRead(items.map((n) => n.id))}><CheckCheck size={15} /> Tandai semua dibaca</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn('shrink-0 rounded-full px-4 py-2 text-xs font-bold', tab === t.id ? 'bg-accent text-white' : 'bg-surface text-muted hover:text-accent')}>{t.label}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={<Bell size={24} />} title="Belum ada notifikasi" description="Notifikasi untuk kategori ini akan muncul di sini." />
      ) : (
        <div className="space-y-2.5">
          {visible.map((n) => {
            const Icon = icons[n.type]
            const isRead = readIds.includes(n.id) || n.read
            return (
              <Link key={n.id} to={n.href} onClick={() => markRead(n.id)} className={cn('card flex items-start gap-3 transition-all hover:shadow-hover', !isRead && 'border-accent/40')}>
                <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', isRead ? 'bg-bg text-muted' : 'bg-accent-soft text-accent')}><Icon size={18} /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold">{n.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{n.body}</p>
                  <p className="mt-1.5 text-[11px] text-muted">{n.time}</p>
                </div>
                {!isRead && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />}
              </Link>
            )
          })}
        </div>
      )}

      <Link to="/app/settings" className="text-sm font-bold text-accent hover:underline">Atur preferensi notifikasi →</Link>
    </div>
  )
}
