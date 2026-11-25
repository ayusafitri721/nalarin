import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, CircleHelp, Mail, Send, ShieldCheck } from 'lucide-react'
import { EmptyState } from '@/components/ui'
import { useAppStore } from '@/store/useAppStore'

export function Help() {
  const [sent, setSent] = useState(false)
  const showToast = useAppStore((s) => s.showToast)
  const faqs = [
    { q: 'Bagaimana cara memulai belajar?', a: 'Buka Explore, pilih Universe lalu Topic, dan tekan Mulai Belajar pada modul pertama.' },
    { q: 'Apakah target harian bisa diubah?', a: 'Ya. Buka Settings atau ulangi onboarding secara terkontrol. Target hanya panduan fleksibel.' },
    { q: 'Bagaimana XP dan streak dihitung?', a: 'XP diberikan untuk lesson, kuis, quest, dan game yang valid. Streak hanya bertambah saat ada aktivitas belajar yang memenuhi syarat.' },
    { q: 'Bisakah saya belajar tanpa teman?', a: 'Tentu. Semua fitur pembelajaran bisa digunakan secara mandiri. Fitur sosial sepenuhnya opsional.' },
    { q: 'Bagaimana cara mengganti tema?', a: 'Buka Personalization Studio untuk memilih mode terang/gelap/sistem, preset warna, atau warna custom.' },
  ]
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div><span className="pill"><CircleHelp size={13} /> Help & Support</span><h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Butuh bantuan?</h1><p className="mt-1.5 text-sm text-muted">Temukan jawaban atau kirim laporan masalah.</p></div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Pertanyaan umum</h2>
        <div className="mt-4 space-y-3">{faqs.map((f) => <div key={f.q} className="rounded-2xl bg-bg p-4"><p className="font-display text-sm font-extrabold">{f.q}</p><p className="mt-1.5 text-xs leading-relaxed text-muted">{f.a}</p></div>)}</div>
      </div>
      <div className="card">
        <h2 className="font-display text-base font-extrabold">Kirim laporan</h2>
        {sent ? (
          <div className="mt-4 rounded-2xl bg-success/10 p-5 text-center text-sm font-bold text-success"><Check size={22} className="mx-auto" /> Laporan terkirim. Terima kasih!</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); showToast('Laporan berhasil dikirim', 'success') }} className="mt-4 space-y-3">
            <div><label className="label">Kategori</label><select className="input"><option>Masalah teknis</option><option>Laporan konten</option><option>Laporan pengguna</option><option>Saran</option></select></div>
            <div><label className="label">Deskripsi</label><textarea className="input min-h-28" placeholder="Ceritakan masalah yang kamu alami..." required /></div>
            <button className="btn btn-primary"><Send size={15} /> Kirim laporan</button>
          </form>
        )}
      </div>
      <Link to="/app/games" className="text-sm font-bold text-accent">Kembali menjelajah Nalarin <ArrowRight size={14} className="inline" /></Link>
    </div>
  )
}

export function Legal({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy'
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-surface"><div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4"><Link to="/" className="font-display font-extrabold text-accent">← Nalarin</Link><span className="text-xs text-muted">Diperbarui 2026</span></div></header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <span className="pill"><ShieldCheck size={13} /> Legal</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold">{isPrivacy ? 'Kebijakan Privasi' : 'Ketentuan Layanan'}</h1>
        <div className="card mt-6 space-y-4 text-sm leading-relaxed text-muted">
          <p>Nalarin adalah platform pembelajaran digital. Dokumen ini menjelaskan bagaimana kami mengelola data dan menggunakan layanan.</p>
          {isPrivacy ? (
            <>
              <h2 className="font-display text-base font-extrabold text-ink">Data yang kami simpan</h2>
              <p>Kami menyimpan data akun, preferensi tampilan, progres belajar, dan aktivitas yang diperlukan untuk menjalankan fitur. Kontak pribadi seperti email tidak ditampilkan kepada pengguna lain.</p>
              <h2 className="font-display text-base font-extrabold text-ink">Penggunaan data</h2>
              <p>Data digunakan untuk personalisasi, rekomendasi materi, dan keamanan akun. Kamu dapat mengatur visibilitas profil melalui halaman Settings.</p>
              <h2 className="font-display text-base font-extrabold text-ink">Keamanan</h2>
              <p>Password disimpan dengan hashing. Otorisasi dilakukan di server dan akses dibatasi sesuai kebijakan.</p>
            </>
          ) : (
            <>
              <h2 className="font-display text-base font-extrabold text-ink">Penggunaan layanan</h2>
              <p>Nalarin ditujukan untuk pembelajaran. Kamu tidak boleh menggunakan layanan untuk mengganggu pengguna lain, membagikan konten berbahaya, atau menyalahgunakan sistem reward.</p>
              <h2 className="font-display text-base font-extrabold text-ink">Konten</h2>
              <p>Materi disusun dengan proses editorial. Jika menemukan masalah pada konten, gunakan form laporan di Help & Support.</p>
              <h2 className="font-display text-base font-extrabold text-ink">Perubahan</h2>
              <p>Ketentuan dapat diperbarui seiring perkembangan produk. Perubahan penting akan diinformasikan melalui aplikasi.</p>
            </>
          )}
          <Link to="/" className="inline-flex items-center gap-1 font-bold text-accent hover:underline">Kembali ke Beranda <ArrowRight size={14} /></Link>
        </div>
      </main>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg px-4">
      <EmptyState icon={<Mail size={24} />} title="Halaman tidak ditemukan" description="Halaman yang kamu cari tidak tersedia. Coba kembali ke beranda atau dashboard." action={<Link className="btn btn-primary" to="/app">Kembali ke Home</Link>} />
    </div>
  )
}
