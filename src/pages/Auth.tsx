import { useState } from 'react'
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
  type LoginForm,
  type RegisterForm,
  type ForgotForm,
} from '@/lib/authValidation'
import { mapGoogleError, mapLoginError, mapSignupError } from '@/lib/authErrors'

function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="landing-light min-h-screen bg-bg text-ink">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/nalarin/landing/bg-login-panel.svg)' }}
            role="img"
            aria-label="Pulau pengetahuan Nalarin dan teman belajar"
          />
          <div className="relative flex h-full flex-col justify-between p-8">
            <Link to="/" className="relative"><Logo /></Link>
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
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 20-9 20-20 0-1-.1-2-.4-2.9Z"/><path fill="#34A853" d="M6.3 14.7l6.5 4.9C14.4 15.5 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23c0 2.5.5 4.9 1.4 7.1l7.4-5.7c-.4-1.2-.6-2.5-.6-3.9 0-3 .9-5.8 2.5-8.1l-8.4-6.6Z"/><path fill="#FBBC05" d="M24 43c5.3 0 10.1-2 13.7-5.2l-6.5-5.4C29.3 34 26.8 35 24 35c-5.3 0-9.6-2.9-11.3-7.1l-6.5 5.4C8.9 39.2 15.8 43 24 43Z"/><path fill="#EA4335" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.4C40.7 35.6 44 29.8 44 23c0-1-.1-2-.4-2.9Z"/></svg>
        Masuk dengan Google
      </button>
      <p className="mt-6 text-center text-sm text-muted">Belum punya akun? <Link to="/daftar" className="font-bold text-accent hover:underline">Daftar di sini</Link></p>
    </AuthLayout>
  )
}

export function Register() {
  const navigate = useNavigate()
  const signIn = useAppStore((s) => s.signIn)
  const finishOnboarding = useAppStore((s) => s.finishOnboarding)
  const showToast = useAppStore((s) => s.showToast)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterForm) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({ email: data.email, password: data.password, options: { data: { full_name: data.name, username: data.username } } })
      if (error) {
        showToast(mapSignupError(error.message), 'error')
        return
      }
      // Kalau pendaftaran butuh verifikasi email, sesi lama bisa masih aktif.
      // Cabut dulu supaya data akun baru tidak tersimpan ke akun lama.
      const { data: authData } = await supabase.auth.getUser()
      if (authData.user?.email !== data.email) await supabase.auth.signOut()
    }
    // Mulai dari akun bersih: jangan bawa nama/email/progres akun sebelumnya.
    signIn(data.email)
    finishOnboarding({
      name: data.name, interests: [], goals: [], dailyGoal: 10, companion: 'nori',
      theme: { mode: 'system', accent: '#7563E8', density: 'comfortable', backgroundStyle: 'minimal' },
    })
    navigate('/onboarding')
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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) })

  const onSubmit = async (data: ForgotForm) => {
    if (isSupabaseConfigured && supabase) await supabase.auth.resetPasswordForEmail(data.email, { redirectTo: window.location.origin + '/app/settings' })
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
