import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import { companionAssets } from '@/data/content'

export function ProgressBar({ value, className, tone }: { value: number; className?: string; tone?: string }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--muted)_18%,transparent)]', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: tone ?? 'var(--accent)' }} />
    </div>
  )
}

export function SectionHeader({ title, subtitle, href, linkLabel = 'Lihat Semua' }: { title: string; subtitle?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link to={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-accent hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  )
}

export function EmptyState({ icon, title, description, action }: { icon?: React.ReactNode; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
        {icon ?? <Inbox size={24} />}
      </div>
      <h3 className="font-display text-base font-bold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Avatar({ color = '#7563E8', name, size = 36 }: { color?: string; name?: string; size?: number }) {
  const initials = (name ?? 'N').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()
  return (
    <span className="relative inline-grid shrink-0 place-items-center rounded-full font-display font-extrabold text-white" style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}>
      {initials}
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-success" />
    </span>
  )
}

export function StatCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string | number; hint?: string }) {
  return (
    <div className="card flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted">{label}</p>
        <p className="font-display text-lg font-extrabold leading-tight">{value}</p>
        {hint && <p className="text-[11px] text-muted">{hint}</p>}
      </div>
    </div>
  )
}

export function ToastHost() {
  const toast = useAppStore((s) => s.toast)
  const clearToast = useAppStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(clearToast, 3200)
    return () => window.clearTimeout(timer)
  }, [toast, clearToast])

  if (!toast) return null
  return (
    <div className="fixed bottom-20 right-4 z-[100] max-w-[calc(100vw-2rem)] md:bottom-6" role="status" aria-live="polite">
      <div className="card flex items-center gap-3 !py-3 shadow-modal">
        <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full', toast.tone === 'error' ? 'bg-danger/15 text-danger' : toast.tone === 'info' ? 'bg-accent-soft text-accent' : 'bg-success/15 text-success')}>
          {toast.tone === 'error' ? '!' : <Check size={16} />}
        </span>
        <p className="text-sm font-semibold">{toast.message}</p>
        <button onClick={clearToast} className="ml-2 text-xs font-bold text-muted hover:text-ink" aria-label="Tutup notifikasi">Tutup</button>
      </div>
    </div>
  )
}

export function CompanionCard({ companionId, message, className, header }: { companionId: string; message: string; className?: string; header?: ReactNode }) {
  return (
    <div className={cn('card flex flex-col gap-4 overflow-hidden', className)}>
      {header}
      <div className="flex flex-1 items-center gap-4">
        <img src={companionAssets[companionId]} alt="Companion" className="h-16 w-16 shrink-0 object-contain" />
        <div className="min-w-0">
          <p className="text-xs leading-relaxed text-muted">{message}</p>
          <Link to="/app/companion" className="mt-2 inline-flex min-h-11 items-center text-xs font-bold text-accent hover:underline">Lihat companion</Link>
        </div>
      </div>
    </div>
  )
}
