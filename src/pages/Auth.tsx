import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Eye, EyeOff, Mail } from 'lucide-react'
import { Logo } from '@/components/Illustrations'
import { useAppStore } from '@/store/useAppStore'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import {
  loginSchema,
  registerSchema,
  forgotSchema,
  resetSchema,
  type LoginForm,
  type RegisterForm,
  type ForgotForm,
  type ResetForm,
} from '@/lib/authValidation'
import { mapGoogleError, mapLoginError, mapSignupError } from '@/lib/authErrors'

function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="landing-light min-h-screen bg-bg text-ink">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block">
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: 'url(/assets/nalarin/landing/bg-login-panel.svg)', backgroundPosition: 'center 25%' }}
            role="img"
            aria-label="Pulau pengetahuan Nalarin dan teman belajar"
          />
          <div className="relative flex h-full flex-col justify-between p-8">
            <div className="mt-auto text-center">
              <h2 className="font-display text-3xl font-extrabold text-[#25233A] drop-shadow-sm">Welcome Back!</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-[#5B5875]">Lanjutkan perjalanan belajarmu di Nalarin.</p>
            </div>
            <p className="mt-6 text-center text-xs text-[#858398]">Learn Beyond Limits · Explore. Learn. Grow.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-8 sm:px-10 md:px-12">
          <div className="mb-7 md:hidden"><Link to="/"><Logo /></Link></div>
          <h1 className="font-display text-2xl font-extrabold">{title}</h1>
          <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-semibold text-danger" role="alert">{error}</p>}
    </div>
  )
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [googleError, setGoogleError] = useState('')
  const navigate = useNavigate()
  const signIn = useAppStore((s) => s.signIn)
  const showToast = useAppStore((s) => s.showToast)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    if (isSupabaseConfigured && supabase && data.email.includes('@')) {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
      if (error) {
        const message = mapLoginError(error.message)
        setGoogleError(message)
        showToast(message, 'error')
        return
      }
    }
    signIn(data.email)
    const { user, onboarding } = useAppStore.getState()
    navigate(user && onboarding ? '/app' : '/onboarding')
  }

  const signInWithGoogle = async () => {
    if (!supabase) {
      setGoogleError('Integrasi Google belum tersedia. Masuk dengan email untuk sekarang.')
      return
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/app' } })
    if (error) setGoogleError(mapGoogleError(error.message))
  }

  return (
    <AuthLayout title="Masuk ke Nalarin" subtitle="Belajar jadi lebih bermakna bersama kami">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Email atau Username" error={errors.email?.message}>
          <input className="input" placeholder="Masukkan email atau username" autoComplete="username" {...register('email')} />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <div className="relative">
            <input className="input !pr-11" type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" autoComplete="current-password" {...register('password')} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </Field>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" className="accent-[var(--accent)]" {...register('remember')} /> Ingat saya</label>
          <Link to="/lupa-password" className="text-sm font-bold text-accent hover:underline">Lupa password?</Link>
        </div>
        {googleError && <p className="rounded-xl bg-danger/10 p-3 text-xs font-semibold text-danger" role="alert">{googleError}</p>}
        <button className="btn btn-primary w-full py-3" disabled={isSubmitting}>Masuk <ArrowRight size={16} /></button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" /> atau <span className="h-px flex-1 bg-line" /></div>
      <button className="btn btn-outline w-full py-3" onClick={signInWithGoogle}>
        <img src="/assets/nalarin/landing/google-icon.png" alt="" aria-hidden="true" className="h-[18px] w-[18px] object-contain" />
        Masuk dengan Google
      </button>
      <p className="mt-6 text-center text-sm text-muted">Belum punya akun? <Link to="/daftar" className="font-bold text-accent hover:underline">Daftar di sini</Link></p>
    </AuthLayout>
  )
}

export function Register() {
  const navigate = useNavigate()
  const signIn = useAppStore((s) => s.signIn)
  const showToast = useAppStore((s) => s.showToast)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterForm) => {
    if (isSupabaseConfigured && supabase) {
      const { data: signUpData, error } = await supabase.auth.signUp({ email: data.email, password: data.password, options: { data: { full_name: data.name, username: data.username } } })
      if (error) {
        showToast(mapSignupError(error.message), 'error')
        return
      }
      // Supabase mengembalikan respons tanpa sesi kalau email sudah dipakai akun
      // lain (termasuk akun Google). Jangan lanjut ke onboarding agar profil
      // akun itu tidak tertimpa data pendaftaran baru.
      if (!signUpData.session) {
        await supabase.auth.signOut()
        if (signUpData.user?.email === data.email) navigate('/verifikasi-email')
        else showToast('Email ini sudah terdaftar. Masuk dengan Google atau gunakan email lain.', 'error')
        return
      }
      const { data: authData } = await supabase.auth.getUser()
      if (authData.user?.email !== data.email) {
        await supabase.auth.signOut()
        showToast('Email ini sudah terdaftar. Masuk dengan Google atau gunakan email lain.', 'error')
        return
      }
    }
    // Mulai dari akun bersih: jangan bawa nama/email/progres akun sebelumnya.
    // Onboarding sengaja belum diselesaikan di sini, supaya guard /app tetap
    // menahan user sampai 7 langkah onboarding benar-benar selesai.
    signIn(data.email)
    navigate('/onboarding', { state: { name: data.name } })
  }

  return (
    <AuthLayout title="Buat Akun Nalarin" subtitle="Mulai perjalanan belajarmu yang personal">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        <Field label="Nama lengkap" error={errors.name?.message}><input className="input" placeholder="Nama kamu" autoComplete="name" {...register('name')} /></Field>
        <Field label="Username" error={errors.username?.message}><input className="input" placeholder="username_kamu" autoComplete="username" {...register('username')} /></Field>
        <Field label="Email" error={errors.email?.message}><input className="input" type="email" placeholder="nama@email.com" autoComplete="email" {...register('email')} /></Field>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Password" error={errors.password?.message}><input className="input" type="password" placeholder="Min. 8 karakter" autoComplete="new-password" {...register('password')} /></Field>
          <Field label="Konfirmasi password" error={errors.confirm?.message}><input className="input" type="password" placeholder="Ulangi password" autoComplete="new-password" {...register('confirm')} /></Field>
        </div>
        <div>
          <label className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <input type="checkbox" className="mt-0.5 accent-[var(--accent)]" {...register('agree')} />
            Saya menyetujui <Link to="/ketentuan" className="font-bold text-accent hover:underline">Ketentuan Layanan</Link> dan <Link to="/privasi" className="font-bold text-accent hover:underline">Kebijakan Privasi</Link>.
          </label>
          {errors.agree && <p className="mt-1.5 text-xs font-semibold text-danger" role="alert">{errors.agree.message}</p>}
        </div>
        <button className="btn btn-primary w-full py-3" disabled={isSubmitting}>Buat Akun <ArrowRight size={16} /></button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">Sudah punya akun? <Link to="/masuk" className="font-bold text-accent hover:underline">Masuk</Link></p>
    </AuthLayout>
  )
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const showToast = useAppStore((s) => s.showToast)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) })

  const onSubmit = async (data: ForgotForm) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, { redirectTo: window.location.origin + '/reset-password' })
      if (error) {
        showToast('Gagal mengirim instruksi. Coba lagi beberapa saat.', 'error')
        return
      }
    }
    setSent(true)
  }

  return (
    <AuthLayout title="Lupa Password?" subtitle="Kami akan mengirimkan instruksi pemulihan ke emailmu.">
      {sent ? (
        <div className="card text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success"><Check size={22} /></span>
          <h2 className="mt-4 font-display text-lg font-extrabold">Instruksi terkirim</h2>
          <p className="mt-2 text-sm text-muted">Jika email terdaftar, kamu akan menerima tautan pemulihan. Periksa folder spam juga, ya.</p>
          <Link to="/masuk" className="btn btn-primary mt-5">Kembali ke Masuk</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field label="Email" error={errors.email?.message}>
            <div className="relative"><Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input className="input !pl-10" type="email" placeholder="nama@email.com" {...register('email')} /></div>
          </Field>
          <button className="btn btn-primary w-full py-3" disabled={isSubmitting}>Kirim Instruksi <ArrowRight size={16} /></button>
          <p className="text-center text-xs text-muted">Untuk keamanan, kami tidak mengungkapkan apakah email terdaftar atau tidak.</p>
          <p className="text-center text-sm"><Link to="/masuk" className="font-bold text-accent hover:underline">← Kembali ke Masuk</Link></p>
        </form>
      )}
    </AuthLayout>
  )
}

export function ResetPassword() {
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const showToast = useAppStore((s) => s.showToast)
  const signOut = useAppStore((s) => s.signOut)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetForm>({ resolver: zodResolver(resetSchema) })

  useEffect(() => {
    let active = true
    const verify = async () => {
      if (!supabase) {
        if (active) { setError('Layanan auth belum tersedia.'); setChecking(false) }
        return
      }
      const code = new URLSearchParams(window.location.search).get('code')
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError && active) {
          setError('Tautan pemulihan tidak valid atau sudah kedaluwarsa.')
          setChecking(false)
          return
        }
      }
      const { data } = await supabase.auth.getSession()
      if (active) {
        setError(data.session ? '' : 'Tautan pemulihan tidak valid atau sudah kedaluwarsa.')
        setChecking(false)
      }
    }
    void verify()
    return () => { active = false }
  }, [])

  const onSubmit = async (data: ResetForm) => {
    if (!supabase) return
    const { error: updateError } = await supabase.auth.updateUser({ password: data.password })
    if (updateError) {
      showToast('Gagal menyimpan password baru. Coba lagi.', 'error')
      return
    }
    await supabase.auth.signOut({ scope: 'global' })
    signOut()
    showToast('Password berhasil diperbarui. Silakan masuk lagi.', 'success')
    navigate('/masuk', { replace: true })
  }

  return (
    <AuthLayout title="Ubah Password" subtitle="Buat password baru untuk akun Nalarinmu">
      {checking ? (
        <p className="text-sm text-muted">Memeriksa tautan pemulihan...</p>
      ) : error ? (
        <div className="card text-center">
          <p className="text-sm font-semibold text-danger" role="alert">{error}</p>
          <Link to="/lupa-password" className="btn btn-primary mt-5">Minta tautan baru</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field label="Password baru" error={errors.password?.message}>
            <input className="input" type="password" placeholder="Minimal 8 karakter" autoComplete="new-password" {...register('password')} />
          </Field>
          <Field label="Konfirmasi password" error={errors.confirm?.message}>
            <input className="input" type="password" placeholder="Ulangi password baru" autoComplete="new-password" {...register('confirm')} />
          </Field>
          <button className="btn btn-primary w-full py-3" disabled={isSubmitting}>Simpan Password</button>
          <p className="text-center text-xs text-muted">Setelah berhasil, kamu perlu masuk lagi dengan password baru.</p>
        </form>
      )}
    </AuthLayout>
  )
}
