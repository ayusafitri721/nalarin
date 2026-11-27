import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Facebook, Instagram, Menu, Twitter, X } from 'lucide-react'
import { Logo } from '@/components/Illustrations'
import { universes as universeCatalog } from '@/data/content'

const asset = (name: string, ext: 'webp' | 'svg' = 'webp') => `/assets/nalarin/landing/${name}.${ext}`

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Jelajahi', href: '#jelajahi' },
  { label: 'Tentang', href: '#tentang' },
]

// Urutan sesuai DOM, dipakai untuk menentukan section aktif saat scroll.
const sectionIds = ['beranda', 'fitur', 'jelajahi', 'tentang']

const features = [
  {
    icon: 'icon-star',
    title: 'Discover',
    text: `Jelajahi ${universeCatalog.length} dunia pengetahuan, dari sains sampai logika. Setiap topik punya modul singkat dan kuis.`,
  },
  {
    icon: 'icon-trophy',
    title: 'Challenge',
    text: 'Uji pemahaman lewat kuis dengan pembahasan, game edukatif, dan quest harian. Progres tercatat dalam skill passport.',
  },
  {
    icon: 'icon-connect',
    title: 'Connect',
    text: 'Tambah teman, kirim pesan, ikut study room, dan bandingkan progres lewat leaderboard.',
  },
]

const universeImages: Record<string, string> = {
  TK: 'topic-creative',
  SD: 'topic-science',
  SMP: 'topic-science',
  SMA: 'topic-mind',
  SNBT: 'topic-history',
  SKD: 'topic-history',
  TKA: 'topic-digital',
  Teknologi: 'topic-digital',
}

const featuredUniverses = universeCatalog
  .filter((universe) => universeImages[universe.title])
  .map((universe) => ({ ...universe, image: universeImages[universe.title] }))

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')
  const [selectedUniverse, setSelectedUniverse] = useState<(typeof featuredUniverses)[number] | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selectedUniverse) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedUniverse(null)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedUniverse])

  useEffect(() => {
    const updateActive = () => {
      // Saat halaman mentok di bawah, section terakhir tidak bisa mencapai
      // puncak viewport, jadi ditentukan eksplisit sebagai aktif.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActiveSection(sectionIds[sectionIds.length - 1])
        return
      }
      const marker = window.scrollY + 96
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) current = id
      }
      setActiveSection(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    window.addEventListener('load', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
      window.removeEventListener('load', updateActive)
    }
  }, [])

  return (
    <div className="landing-light min-h-screen overflow-x-clip bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" aria-label="Nalarin beranda"><Logo /></Link>

          <nav className="hidden items-center gap-8 text-[13px] font-semibold md:flex" aria-label="Navigasi publik">
            {navLinks.map((l) => {
              const id = l.href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`transition-colors ${isActive ? 'text-accent' : 'text-muted hover:text-accent'}`}
                >
                  {l.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/masuk" className="btn btn-ghost hidden px-4 !text-[13px] text-muted sm:inline-flex">Masuk</Link>
            <Link to="/daftar" className="btn btn-primary !px-5 !py-2.5 !text-[13px]">Mulai Belajar</Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-xl text-ink hover:bg-accent-soft md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {menuOpen && (
            <nav className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-line bg-surface p-4 shadow-card md:hidden" aria-label="Navigasi mobile">
              {navLinks.map((l) => {
                const id = l.href.slice(1)
                const isActive = activeSection === id
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-accent-soft hover:text-accent'}`}
                  >
                    {l.label}
                  </a>
                )
              })}
              <Link to="/masuk" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-accent-soft hover:text-accent">Masuk</Link>
              <Link to="/daftar" className="btn btn-primary mt-2 !text-xs">Mulai Belajar</Link>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="beranda" className="relative w-full scroll-mt-16">
          <img
            src={asset('hero-banner', 'svg')}
            alt="Knowledge Universe: pulau apung dengan kastil, awan, planet, mascot astronaut, dan ponsel Nalarin"
            className="block aspect-[9/4] h-[600px] w-full object-cover object-[72%_center] md:h-auto md:object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6F2FF]/95 via-[#F6F2FF]/75 to-[#F6F2FF]/10 md:bg-none" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20">
            <div className="min-w-0 max-w-md">
              <h1 className="font-display text-[30px] font-extrabold leading-[1.06] tracking-tight text-[#25233A] sm:text-[40px] md:text-[48px]">
                Your Curiosity<br />Deserves a<br /><span className="text-accent">Universe.</span>
              </h1>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#5B5875]">
                Explore knowledge, discover new skills, and grow together through a learning experience designed around you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/daftar" className="btn btn-primary min-h-11 !px-5 !py-2.5 !text-xs">Mulai Perjalanan <ArrowRight size={15} /></Link>
                <Link to="/fitur" className="btn btn-outline min-h-11 !px-5 !py-2.5 !text-xs">Jelajahi Nalarin</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-10 md:px-6 md:py-12">
          <div className="text-center">
            <h2 className="font-display text-[26px] font-extrabold md:text-[32px]">Learning Meets Play</h2>
            <p className="mt-2 text-sm text-muted">Belajar jadi lebih seru dengan cara yang interaktif dan menyenangkan.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card flex min-h-[230px] min-w-0 flex-col items-center justify-center !bg-accent-soft text-center">
                <img src={asset(f.icon, 'svg')} alt="" className="h-20 w-20 object-contain" />
                <h3 className="mt-4 font-display text-[18px] font-extrabold">{f.title}</h3>
                <p className="mx-auto mt-2 max-w-[250px] text-xs leading-relaxed text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="jelajahi" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-8 md:px-6 md:py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[22px] font-extrabold md:text-[28px]">Explore Knowledge Universe</h2>
              <p className="mt-1.5 text-sm text-muted">
                Pilih dari {universeCatalog.length} dunia pengetahuan. Berikut {featuredUniverses.length} di antaranya, lengkap dengan topik yang bisa kamu pelajari.
              </p>
            </div>
            <Link to="/daftar" className="hidden shrink-0 items-center gap-1 text-xs font-bold text-accent hover:underline sm:inline-flex">
              Jelajahi Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featuredUniverses.map((universe) => (
              <button
                key={universe.id}
                type="button"
                onClick={() => setSelectedUniverse(universe)}
                aria-label={`Lihat detail ${universe.title}`}
                className="card group flex min-h-[210px] min-w-0 flex-col items-center justify-center !p-3 text-center transition-transform hover:-translate-y-1 hover:shadow-hover"
              >
                <div className="h-24 w-full">
                  <img src={asset(universe.image, 'svg')} alt="" className="h-full w-full object-contain" />
                </div>
                <p className="mt-2 font-display text-[13px] font-extrabold leading-tight">{universe.title}</p>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted">{universe.subcategories.slice(0, 3).join(' · ')}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          <div className="relative h-[300px] overflow-hidden rounded-card border border-line md:h-auto md:aspect-[4/1]">
            <img src={asset('banner-learning-space', 'svg')} alt="Companion Nalarin dan ponsel yang menampilkan aplikasi Nalarin" className="absolute inset-0 h-full w-full object-cover object-[28%_center] md:object-center" />
            <div className="relative z-10 flex h-full max-w-md flex-col justify-center px-6 py-8 md:px-12">
              <h2 className="font-display text-[22px] font-extrabold leading-snug text-[#25233A] md:text-[28px]">Make Your Learning Space Yours.</h2>
              <p className="mt-3 text-xs leading-relaxed text-[#5B5875] md:text-sm">
                Pilih tema terang, gelap, atau mengikuti sistem. Atur warna aksen, densitas tampilan, dan companion yang menemani belajarmu.
              </p>
              <Link to="/daftar" className="btn btn-primary mt-6 w-fit !px-5 !py-2.5 !text-xs">Mulai Menyesuaikan <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        <section id="tentang" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-8 md:px-6 md:py-10">
          <div className="mb-6 grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <h2 className="font-display text-[22px] font-extrabold md:text-[28px]">Tentang Nalarin</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Nalarin adalah platform belajar personal yang menggabungkan eksplorasi pengetahuan, kuis dan game edukatif, serta belajar bersama teman dalam satu tempat.
              </p>
            </div>
            <div className="space-y-1.5 text-xs leading-relaxed text-muted">
              <p>Onboarding tujuh langkah menyesuaikan minat, tujuan, dan target harianmu.</p>
              <p>XP, level, streak, dan skill passport merekam progres belajarmu.</p>
            </div>
          </div>
          <div className="relative h-[330px] overflow-hidden rounded-card md:h-auto md:aspect-[4/1]">
            <img src={asset('cta-banner', 'svg')} alt="Pulau pengetahuan mengambang dengan gerbang cahaya di latar ungu" className="absolute inset-0 h-full w-full object-cover object-[28%_center] md:object-center" />
            <div className="absolute inset-0 bg-[#7563E8]/20 md:hidden" aria-hidden="true" />
            <div className="relative z-10 flex h-full max-w-lg flex-col justify-center px-6 py-10 md:px-12">
              <h2 className="font-display text-[24px] font-extrabold leading-tight text-white md:text-[34px]">
                Every Great Discovery<br />Starts with Curiosity.
              </h2>
              <p className="mt-3 text-sm text-white/90">Mulai dari satu topik yang membuatmu penasaran, lalu lihat seberapa jauh kamu bisa pergi.</p>
              <Link to="/daftar" className="btn mt-6 w-fit border-0 bg-white !px-6 !py-2.5 !text-accent hover:bg-white/90">Mulai Belajar <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
      </main>

      {selectedUniverse && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-4 sm:items-center" onClick={() => setSelectedUniverse(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="universe-dialog-title"
            className="card w-full max-w-md !p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={asset(selectedUniverse.image, 'svg')} alt="" className="h-14 w-14 object-contain" />
                <div>
                  <h2 id="universe-dialog-title" className="font-display text-lg font-extrabold">{selectedUniverse.title}</h2>
                  <p className="text-[11px] font-bold text-accent">Dunia pengetahuan</p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedUniverse(null)}
                aria-label="Tutup detail"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted hover:bg-accent-soft hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{selectedUniverse.description}</p>
            <div className="mt-4">
              <p className="label">Topik yang dibahas</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedUniverse.subcategories.map((subcategory) => (
                  <span key={subcategory} className="pill !py-1 !text-[11px]">{subcategory}</span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">Modul, kuis, dan game di dunia ini terbuka setelah kamu membuat akun.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/daftar" className="btn btn-primary min-h-11 !text-xs">Daftar untuk mulai</Link>
              <button type="button" onClick={() => setSelectedUniverse(null)} className="btn btn-outline min-h-11 !text-xs">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">Learn Beyond Limits. Jelajahi pengetahuan, belajar sambil bermain, dan bertumbuh bersama Nalarin.</p>
            <div className="mt-4 flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent hover:bg-accent hover:text-white" aria-label="Instagram"><Instagram size={15} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent hover:bg-accent hover:text-white" aria-label="Facebook"><Facebook size={15} /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent hover:bg-accent hover:text-white" aria-label="X"><Twitter size={15} /></a>
            </div>
          </div>
          <div>
            <p className="font-display text-xs font-extrabold">Navigasi</p>
            <div className="mt-3 flex flex-col gap-2 text-xs text-muted">
              {navLinks.map((l) => <a key={l.href} className="hover:text-accent" href={l.href}>{l.label}</a>)}
              <a className="hover:text-accent" href="#tentang">Tentang Kami</a>
            </div>
          </div>
          <div>
            <p className="font-display text-xs font-extrabold">Legal</p>
            <div className="mt-3 flex flex-col gap-2 text-xs text-muted">
              <Link className="hover:text-accent" to="/privasi">Kebijakan Privasi</Link>
              <Link className="hover:text-accent" to="/ketentuan">Ketentuan Layanan</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto max-w-[1200px] px-4 py-5 text-center text-[11px] text-muted md:px-6">© {new Date().getFullYear()} Nalarin. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
