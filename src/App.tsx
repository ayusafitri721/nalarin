import { lazy, Suspense, type ReactNode } from 'react'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { EmptyState } from '@/components/ui'
import { useAppStore } from '@/store/useAppStore'
import { useBackendReady } from '@/lib/useBackendReady'
import Landing from '@/pages/Landing'

const Login = lazy(() => import('@/pages/Auth').then((m) => ({ default: m.Login })))
const Register = lazy(() => import('@/pages/Auth').then((m) => ({ default: m.Register })))
const ForgotPassword = lazy(() => import('@/pages/Auth').then((m) => ({ default: m.ForgotPassword })))
const Onboarding = lazy(() => import('@/pages/Onboarding'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Explore = lazy(() => import('@/pages/Explore'))
const UniverseDetail = lazy(() => import('@/pages/UniverseDetail'))
const TopicDetail = lazy(() => import('@/pages/TopicDetail'))
const Learning = lazy(() => import('@/pages/Learning'))
const QuizPage = lazy(() => import('@/pages/Quiz').then((m) => ({ default: m.QuizPage })))
const QuizResultPage = lazy(() => import('@/pages/Quiz').then((m) => ({ default: m.QuizResultPage })))
const Journey = lazy(() => import('@/pages/Journey'))
const Games = lazy(() => import('@/pages/Games').then((m) => ({ default: m.Games })))
const GamePlay = lazy(() => import('@/pages/Games').then((m) => ({ default: m.GamePlay })))
const Quest = lazy(() => import('@/pages/Quest'))
const Friends = lazy(() => import('@/pages/Social').then((m) => ({ default: m.Friends })))
const FriendProfile = lazy(() => import('@/pages/Social').then((m) => ({ default: m.FriendProfile })))
const Messages = lazy(() => import('@/pages/Social').then((m) => ({ default: m.Messages })))
const StudyRooms = lazy(() => import('@/pages/Social').then((m) => ({ default: m.StudyRooms })))
const Duel = lazy(() => import('@/pages/Social').then((m) => ({ default: m.Duel })))
const Leaderboard = lazy(() => import('@/pages/Social').then((m) => ({ default: m.Leaderboard })))
const CompanionPage = lazy(() => import('@/pages/Growth').then((m) => ({ default: m.CompanionPage })))
const SkillPassport = lazy(() => import('@/pages/Growth').then((m) => ({ default: m.SkillPassport })))
const Achievements = lazy(() => import('@/pages/Growth').then((m) => ({ default: m.Achievements })))
const StreakPage = lazy(() => import('@/pages/Growth').then((m) => ({ default: m.StreakPage })))
const Curiosity = lazy(() => import('@/pages/Growth').then((m) => ({ default: m.Curiosity })))
const Wrapped = lazy(() => import('@/pages/Growth').then((m) => ({ default: m.Wrapped })))
const Help = lazy(() => import('@/pages/Misc').then((m) => ({ default: m.Help })))
const Legal = lazy(() => import('@/pages/Misc').then((m) => ({ default: m.Legal })))
const NotFound = lazy(() => import('@/pages/Misc').then((m) => ({ default: m.NotFound })))
const Notifications = lazy(() => import('@/pages/Notifications'))
const Personalization = lazy(() => import('@/pages/Personalization'))
const Profile = lazy(() => import('@/pages/Profile'))
const SearchPage = lazy(() => import('@/pages/Search'))
const Settings = lazy(() => import('@/pages/Settings'))

function ProtectedRoute() {
  const user = useAppStore((s) => s.user)
  return user ? <Outlet /> : <Navigate to="/masuk" replace />
}

/** Halaman publik/auth tidak boleh diakses saat user masih login. */
function GuestRoute() {
  const user = useAppStore((s) => s.user)
  return user ? <Navigate to="/app" replace /> : <Outlet />
}

function Verification() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg px-4">
      <div className="card max-w-md text-center">
        <CheckCircle2 size={40} className="mx-auto text-success" />
        <h1 className="mt-4 font-display text-xl font-extrabold">Verifikasi email</h1>
        <p className="mt-2 text-sm text-muted">Tautan verifikasi akan dikirim ke emailmu. Periksa kotak masuk dan folder spam.</p>
        <Link to="/masuk" className="btn btn-primary mt-5">Kembali ke Masuk</Link>
      </div>
    </div>
  )
}

function BackendGate({ children }: { children: ReactNode }) {
  const ready = useBackendReady()
  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg">
        <span className="animate-pulse font-display font-extrabold text-accent">Memuat Nalarin...</span>
      </div>
    )
  }
  return <>{children}</>
}

export default function App() {
  return (
    <BackendGate>
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-bg"><span className="animate-pulse font-display font-extrabold text-accent">Memuat Nalarin...</span></div>}>
      <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/jelajahi" element={<Landing />} />
        <Route path="/fitur" element={<Landing />} />
        <Route path="/tentang" element={<Landing />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/daftar" element={<Register />} />
        <Route path="/lupa-password" element={<ForgotPassword />} />
        <Route path="/verifikasi-email" element={<Verification />} />
      </Route>
      <Route path="/privasi" element={<Legal type="privacy" />} />
      <Route path="/ketentuan" element={<Legal type="terms" />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AppShell />}>
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/explore" element={<Explore />} />
          <Route path="/app/universe/:slug" element={<UniverseDetail />} />
          <Route path="/app/topic/:slug" element={<TopicDetail />} />
          <Route path="/app/learn/:lessonId" element={<Learning />} />
          <Route path="/app/quiz/:quizId" element={<QuizPage />} />
          <Route path="/app/quiz/:quizId/result" element={<QuizResultPage />} />
          <Route path="/app/journey" element={<Journey />} />
          <Route path="/app/games" element={<Games />} />
          <Route path="/app/games/:slug" element={<GamePlay />} />
          <Route path="/app/quest" element={<Quest />} />
          <Route path="/app/streak" element={<StreakPage />} />
          <Route path="/app/achievements" element={<Achievements />} />
          <Route path="/app/rewards" element={<Achievements />} />
          <Route path="/app/friends" element={<Friends />} />
          <Route path="/app/friends/:username" element={<FriendProfile />} />
          <Route path="/app/messages" element={<Messages />} />
          <Route path="/app/messages/:conversationId" element={<Messages />} />
          <Route path="/app/study-rooms" element={<StudyRooms />} />
          <Route path="/app/duel" element={<Duel />} />
          <Route path="/app/leaderboard" element={<Leaderboard />} />
          <Route path="/app/companion" element={<CompanionPage />} />
          <Route path="/app/skill-passport" element={<SkillPassport />} />
          <Route path="/app/profile" element={<Profile />} />
          <Route path="/app/personalization" element={<Personalization />} />
          <Route path="/app/settings" element={<Settings />} />
          <Route path="/app/notifications" element={<Notifications />} />
          <Route path="/app/search" element={<SearchPage />} />
          <Route path="/app/curiosity" element={<Curiosity />} />
          <Route path="/app/wrapped" element={<Wrapped />} />
          <Route path="/app/help" element={<Help />} />
          <Route path="/app/*" element={<EmptyState title="Halaman tidak ditemukan" description="Halaman yang kamu cari tidak tersedia." action={<Link className="btn btn-primary" to="/app">Kembali ke Home</Link>} />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </BackendGate>
  )
}
