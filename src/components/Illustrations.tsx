import { useId } from 'react'
import { cn } from '@/lib/utils'
import type { Universe } from '@/types'

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <img src="/assets/nalarin/landing/logo.svg" alt="" aria-hidden="true" className="h-9 w-9 shrink-0 object-contain" />
      {!compact && <span className="font-display text-[19px] font-extrabold tracking-tight">Nalarin</span>}
    </span>
  )
}

const mascotColors: Record<string, { main: string; light: string; dark: string; cheek: string }> = {
  nori: { main: '#9B8BF5', light: '#C6BCFF', dark: '#6D5AD1', cheek: '#F6A8C4' },
  lumi: { main: '#F5B66E', light: '#FFDCA8', dark: '#D68A3E', cheek: '#F08C96' },
  kiko: { main: '#EE8C79', light: '#FFC2B4', dark: '#CB6655', cheek: '#F7A0B5' },
  mimo: { main: '#7FB2EE', light: '#B9D7FA', dark: '#4D84C6', cheek: '#F3A6BC' },
}

export function Mascot({
  id = 'nori',
  size = 120,
  mood = 'happy',
  className,
}: {
  id?: string
  size?: number
  mood?: 'happy' | 'curious' | 'thinking' | 'celebrating' | 'neutral'
  className?: string
}) {
  const uid = useId().replace(/:/g, '')
  const c = mascotColors[id] ?? mascotColors.nori
  const isCurious = mood === 'curious'
  const isThinking = mood === 'thinking'
  const isCelebrating = mood === 'celebrating'

  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={cn('drop-shadow-[0_12px_18px_rgba(37,35,58,.18)]', className)} role="img" aria-label={`Maskot ${id}`}>
      <defs>
        <linearGradient id={`body${uid}`} x1="40" y1="30" x2="120" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.light} />
          <stop offset="1" stopColor={c.main} />
        </linearGradient>
        <linearGradient id={`ear${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={c.light} />
          <stop offset="1" stopColor={c.main} />
        </linearGradient>
      </defs>
      {isCelebrating && (
        <g stroke={c.dark} strokeWidth="3" strokeLinecap="round" opacity=".7">
          <path d="M22 40 12 26M138 40l10-14M30 22l-4-12M130 22l4-12" />
        </g>
      )}
      <path d="M40 54C33 38 34 24 43 20c9-4 19 5 22 18" fill={`url(#ear${uid})`} />
      <path d="M120 54c7-16 6-30-3-34-9-4-19 5-22 18" fill={`url(#ear${uid})`} />
      <path d="M46 45c-4-9-4-15 0-17 5-2 10 4 12 11M114 45c4-9 4-15 0-17-5-2-10 4-12 11" fill={c.cheek} opacity=".55" />
      <ellipse cx="80" cy="88" rx="52" ry="50" fill={`url(#body${uid})`} />
      <ellipse cx="80" cy="102" rx="33" ry="30" fill="#fff" opacity=".55" />
      <ellipse cx="58" cy="94" rx="6" ry="8" fill={c.cheek} opacity=".75" />
      <ellipse cx="102" cy="94" rx="6" ry="8" fill={c.cheek} opacity=".75" />
      <ellipse cx="65" cy="80" rx={isCurious ? 9 : 7} ry={isCurious ? 11 : 9} fill="#fff" />
      <ellipse cx="95" cy="80" rx={isCurious ? 9 : 7} ry={isCurious ? 11 : 9} fill="#fff" />
      <circle cx={isThinking ? 68 : 66} cy={isCurious ? 82 : 81} r="4" fill="#25233A" />
      <circle cx={isThinking ? 98 : 96} cy={isCurious ? 82 : 81} r="4" fill="#25233A" />
      <circle cx="67" cy="79" r="1.4" fill="#fff" />
      <circle cx="97" cy="79" r="1.4" fill="#fff" />
      {isCelebrating ? (
        <path d="M70 98c5 8 15 8 20 0" stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path d={isThinking ? 'M73 101c4-3 10-3 14 0' : 'M71 99c5 6 13 6 18 0'} stroke="#25233A" strokeWidth="3" strokeLinecap="round" />
      )}
      <ellipse cx="31" cy="98" rx="9" ry="7" transform="rotate(-25 31 98)" fill={c.main} />
      <ellipse cx="129" cy="98" rx="9" ry="7" transform="rotate(25 129 98)" fill={c.main} />
      {isThinking && (
        <g fill="#fff" opacity=".9">
          <circle cx="122" cy="42" r="5" /><circle cx="133" cy="30" r="8" />
        </g>
      )}
    </svg>
  )
}

function Centerpiece({ art, color }: { art: Universe['art']; color: string }) {
  const dark = color
  switch (art) {
    case 'castle':
      return (
        <g>
          <rect x="172" y="118" width="56" height="58" rx="4" fill="#fff" opacity=".95" />
          <rect x="158" y="92" width="24" height="84" rx="3" fill="#fff" />
          <rect x="218" y="92" width="24" height="84" rx="3" fill="#fff" />
          <path d="M158 92 170 60l12 32ZM218 92l12-32 12 32Z" fill={dark} />
          <rect x="186" y="52" width="28" height="48" rx="3" fill="#fff" />
          <path d="M184 52 200 24l16 28Z" fill={dark} />
          <rect x="194" y="146" width="12" height="30" rx="6" fill={dark} opacity=".55" />
          <circle cx="170" cy="112" r="3" fill={dark} /><circle cx="230" cy="112" r="3" fill={dark} />
        </g>
      )
    case 'brain':
      return (
        <g>
          <path d="M158 108c0-18 14-30 31-30 9-14 32-12 39 3 16 1 25 15 20 29 8 13 0 29-15 32-7 14-29 17-40 6-17 6-34-6-35-23Z" fill="#fff" opacity=".95" />
          <path d="M184 92c-6 9-2 16 6 20-10 4-12 14-4 21M208 90c8 7 8 16 0 22 10 5 11 15 3 22M196 108c-5 6-5 14 1 19" stroke={dark} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".75" />
        </g>
      )
    case 'city':
      return (
        <g>
          <rect x="150" y="120" width="26" height="56" rx="3" fill="#fff" opacity=".9" />
          <rect x="180" y="96" width="30" height="80" rx="3" fill="#fff" />
          <rect x="214" y="132" width="34" height="44" rx="3" fill="#fff" opacity=".9" />
          <path d="M180 96h30l-15-18-15 18Z" fill={dark} />
          {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}-${c}`} x={187 + c * 12} y={110 + r * 16} width="6" height="8" rx="1" fill={dark} opacity=".5" />))}
        </g>
      )
    case 'vault':
      return (
        <g>
          <path d="M156 176V112c0-24 20-44 44-44s44 20 44 44v64" fill="#fff" opacity=".9" />
          <path d="M174 176v-60c0-15 12-26 26-26s26 11 26 26v60" fill={dark} opacity=".22" />
          <rect x="150" y="172" width="100" height="8" rx="3" fill={dark} opacity=".5" />
          <circle cx="200" cy="130" r="10" fill="#fff" /><circle cx="200" cy="130" r="4" fill={dark} />
        </g>
      )
    case 'studio':
      return (
        <g>
          <rect x="192" y="92" width="8" height="84" rx="3" fill={dark} opacity=".6" />
          <path d="M196 104 162 160h68l-34-56Z" fill="#fff" opacity=".9" />
          <circle cx="208" cy="92" r="20" fill="#fff" />
          <circle cx="202" cy="88" r="4" fill={dark} opacity=".6" /><circle cx="214" cy="88" r="4" fill={dark} opacity=".6" /><circle cx="208" cy="98" r="4" fill={dark} opacity=".3" />
        </g>
      )
    case 'sphere':
      return (
        <g>
          <circle cx="200" cy="126" r="48" fill="#fff" opacity=".95" />
          <ellipse cx="200" cy="126" rx="20" ry="48" stroke={dark} strokeWidth="3" fill="none" opacity=".5" />
          <path d="M153 126h94M161 102h78M161 150h78" stroke={dark} strokeWidth="3" opacity=".45" />
          <path d="M170 94c14 8 46 8 60 0" stroke={dark} strokeWidth="3" opacity=".45" fill="none" />
        </g>
      )
    case 'arena':
      return (
        <g>
          <path d="M160 100h34v34h-34zM206 100h34v34h-34z" fill="#fff" opacity=".9" />
          <path d="M183 134h34v34h-34z" fill="#fff" opacity=".75" />
          <circle cx="177" cy="117" r="5" fill={dark} opacity=".5" /><circle cx="223" cy="117" r="5" fill={dark} opacity=".5" />
        </g>
      )
    default:
      return (
        <g>
          <circle cx="200" cy="118" r="38" fill="#fff" opacity=".95" />
          <path d="M168 134c18-10 46-10 64 0" stroke={dark} strokeWidth="4" fill="none" opacity=".5" />
          <circle cx="188" cy="110" r="4" fill={dark} opacity=".6" /><circle cx="212" cy="110" r="4" fill={dark} opacity=".6" />
        </g>
      )
  }
}

export function UniverseArt({
  art,
  accent,
  soft,
  className,
  label,
}: {
  art: Universe['art']
  accent: string
  soft: string
  className?: string
  label?: string
}) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 400 260" className={cn('h-full w-full', className)} role="img" aria-label={label ?? 'Ilustrasi dunia pengetahuan'}>
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={soft} />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`isle${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={accent} stopOpacity=".85" />
          <stop offset="1" stopColor={accent} stopOpacity=".35" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="260" fill={`url(#sky${uid})`} />
      <g fill="#fff" opacity=".75">
        <ellipse cx="64" cy="56" rx="34" ry="12" /><ellipse cx="88" cy="52" rx="22" ry="10" />
        <ellipse cx="324" cy="74" rx="30" ry="11" /><ellipse cx="300" cy="70" rx="18" ry="8" />
      </g>
      <circle cx="348" cy="38" r="14" fill={accent} opacity=".3" />
      <circle cx="52" cy="122" r="9" fill={accent} opacity=".25" />
      <path d="M78 178c38 14 206 14 244 0l-42 34c-30 20-130 20-160 0l-42-34Z" fill={`url(#isle${uid})`} />
      <ellipse cx="200" cy="178" rx="122" ry="20" fill={accent} opacity=".55" />
      <ellipse cx="200" cy="174" rx="112" ry="15" fill="#fff" opacity=".35" />
      <Centerpiece art={art} color={accent} />
      <g fill={accent} opacity=".55">
        <path d="m52 88 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
        <path d="m338 132 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
        <circle cx="120" cy="52" r="3" /><circle cx="286" cy="36" r="4" />
      </g>
    </svg>
  )
}

export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 overflow-hidden rounded-[28px]" style={{ background: 'linear-gradient(180deg, #F3F0FF, #FFFFFF)' }}>
        <UniverseArt art="castle" accent="#7563E8" soft="#EFEBFF" className="h-full w-full" label="Knowledge Universe Nalarin" />
      </div>
      <span className="absolute left-[7%] top-[14%] h-7 w-7 rounded-full bg-[#8E82E8]/70 shadow-card" />
      <span className="absolute right-[7%] top-[10%] h-9 w-9 rounded-full border-[3px] border-[#D9A25B]/60 bg-[#F2B65E]/30 shadow-card" />
      <span className="absolute right-[15%] top-[30%] h-3.5 w-3.5 rounded-full bg-[#E58AB6]/70" />
      <div className="absolute bottom-[3%] left-1/2 w-[48%] -translate-x-1/2">
        <svg viewBox="0 0 240 70" className="h-full w-full drop-shadow-[0_10px_14px_rgba(37,35,58,.16)]" role="img" aria-label="Buku terbuka">
          <path d="M12 14c38-8 78-6 108 6v42c-30-12-70-14-108-6V14Z" fill="#ffffff" stroke="#EAE8F2" strokeWidth="2" />
          <path d="M228 14c-38-8-78-6-108 6v42c30-12 70-14 108-6V14Z" fill="#ffffff" stroke="#EAE8F2" strokeWidth="2" />
          <path d="M30 26h66M30 36h52M30 46h60M144 26h66M144 36h52M144 46h60" stroke="#D7D3E8" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 20v42" stroke="#7563E8" strokeWidth="3" opacity=".5" />
        </svg>
      </div>
      <Mascot id="nori" size={96} mood="happy" className="absolute bottom-[13%] left-1/2 z-10 -translate-x-1/2" />
    </div>
  )
}

export function CloudBackdrop({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" className={cn('h-full w-full', className)} aria-hidden="true">
      <defs>
        <linearGradient id={`cloud${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset="1" stopColor="#DAD4FF" stopOpacity=".55" />
        </linearGradient>
        <filter id={`soft${uid}`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g fill={`url(#cloud${uid})`} filter={`url(#soft${uid})`}>
        <g opacity=".75">
          <ellipse cx="150" cy="96" rx="118" ry="34" />
          <ellipse cx="230" cy="80" rx="78" ry="32" />
          <ellipse cx="86" cy="84" rx="60" ry="26" />
        </g>
        <g opacity=".55">
          <ellipse cx="1030" cy="70" rx="130" ry="32" />
          <ellipse cx="950" cy="58" rx="70" ry="26" />
          <ellipse cx="1110" cy="58" rx="62" ry="24" />
        </g>
        <g opacity=".65">
          <ellipse cx="420" cy="440" rx="150" ry="36" />
          <ellipse cx="520" cy="424" rx="90" ry="30" />
          <ellipse cx="330" cy="426" rx="70" ry="26" />
        </g>
        <g opacity=".5">
          <ellipse cx="880" cy="420" rx="140" ry="32" />
          <ellipse cx="980" cy="408" rx="80" ry="26" />
        </g>
      </g>
    </svg>
  )
}

export function CompanionAvatar({ id, size = 48 }: { id: string; size?: number }) {
  return <Mascot id={id} size={size} mood="happy" />
}
