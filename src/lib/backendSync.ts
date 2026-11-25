import { supabase } from './supabase'
import { useAppStore, type AppUser } from '@/store/useAppStore'
import type { OnboardingData, ThemeState } from '@/types'
import {
  buildProfilePatch,
  fetchRemoteState,
  getAuthUserId,
  upsertProfile,
  upsertProgress,
  upsertQuizResults,
  type ProgressPayload,
  type RemoteState,
} from './backend'

type SyncSlice = {
  user: AppUser | null
  onboarding: OnboardingData | null
  theme: ThemeState | null
  completedLessons: string[]
  quizResults: ReturnType<typeof useAppStore.getState>['quizResults']
  bookmarks: string[]
  notes: Record<string, string>
  claimedRewards: string[]
  notificationsRead: string[]
}

let ready = false
let hydrating = false
let timer: ReturnType<typeof setTimeout> | null = null
let unsubStore: (() => void) | null = null
let unsubAuth: (() => void) | null = null

function fallbackUser(email: string): AppUser {
  const base = email.split('@')[0] || 'learner'
  return {
    name: base.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    username: base.toLowerCase(),
    email,
    level: 1,
    xp: 0,
    streak: 0,
    longestStreak: 0,
    totalActiveDays: 0,
    companion: 'nori',
    avatar: '#7563E8',
  }
}

function currentProgress(): ProgressPayload {
  const s = useAppStore.getState()
  return {
    completedLessons: s.completedLessons,
    bookmarks: s.bookmarks,
    notes: s.notes,
    claimedRewards: s.claimedRewards,
    notificationsRead: s.notificationsRead,
  }
}

function applyRemote(remote: RemoteState) {
  const s = useAppStore.getState()
  const mergedUser = Object.keys(remote.user).length
    ? { ...(s.user ?? fallbackUser(remote.user.email ?? '')), ...remote.user }
    : s.user

  useAppStore.setState({
    ...(mergedUser ? { user: mergedUser } : {}),
    ...(remote.onboarding ? { onboarding: remote.onboarding } : {}),
    ...(remote.theme ? { theme: remote.theme } : {}),
    ...(remote.progress
      ? {
          completedLessons: remote.progress.completedLessons,
          bookmarks: remote.progress.bookmarks,
          notes: remote.progress.notes,
          claimedRewards: remote.progress.claimedRewards,
          notificationsRead: remote.progress.notificationsRead,
        }
      : {}),
    ...(remote.quizResults.length ? { quizResults: remote.quizResults } : {}),
  })

  if (remote.theme) useAppStore.getState().applyTheme()
}

async function push(): Promise<void> {
  const userId = await getAuthUserId()
  if (!userId) return
  const s = useAppStore.getState()
  if (!s.user) return
  await Promise.all([
    upsertProfile(userId, buildProfilePatch(s.user, s.onboarding, s.theme, s.user.email)),
    upsertProgress(userId, currentProgress()),
    upsertQuizResults(userId, s.quizResults),
  ])
}

function schedulePush() {
  if (!ready || hydrating || !supabase) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { void push() }, 700)
}

async function hydrate(): Promise<void> {
  if (!supabase) { ready = true; return }
  const { data } = await supabase.auth.getUser()
  const authUser = data.user
  if (!authUser) {
    // Sesi Supabase adalah sumber kebenaran. User lokal yang tersisa dari akun
    // sebelumnya tidak boleh dianggap masih login.
    if (useAppStore.getState().user) useAppStore.getState().signOut()
    ready = true
    return
  }

  hydrating = true
  try {
    // Samakan user lokal dengan akun yang sedang login di Supabase. Jika beda
    // akun, signIn() juga membersihkan progres/onboarding milik akun lama.
    if (authUser.email) useAppStore.getState().signIn(authUser.email)
    const remote = await fetchRemoteState(authUser.id)
    if (remote) applyRemote(remote)
  } catch (err) {
    console.error('[backend] hydrate failed:', err)
  } finally {
    hydrating = false
    ready = true
  }
  schedulePush()
}

function onStoreChange(state: SyncSlice, prev: SyncSlice) {
  const changed =
    state.user !== prev.user ||
    state.onboarding !== prev.onboarding ||
    state.theme !== prev.theme ||
    state.completedLessons !== prev.completedLessons ||
    state.quizResults !== prev.quizResults ||
    state.bookmarks !== prev.bookmarks ||
    state.notes !== prev.notes ||
    state.claimedRewards !== prev.claimedRewards ||
    state.notificationsRead !== prev.notificationsRead
  if (changed) schedulePush()
}

export function startBackendSync(onReady?: () => void): () => void {
  if (!supabase || unsubStore) return () => {}
  unsubStore = useAppStore.subscribe(onStoreChange)

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    // Supabase menyinkronkan sesi antar tab lewat localStorage. Kalau akun
    // diganti di tab lain, tab ini ikut berpindah supaya UI tidak menampilkan
    // user lama dengan token baru.
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') void hydrate()
    if (event === 'SIGNED_OUT') {
      ready = false
      if (timer) { clearTimeout(timer); timer = null }
      useAppStore.getState().signOut()
    }
  })
  unsubAuth = () => subscription.unsubscribe()

  void hydrate().finally(() => onReady?.())

  return () => {
    unsubStore?.()
    unsubStore = null
    unsubAuth?.()
    unsubAuth = null
    if (timer) { clearTimeout(timer); timer = null }
  }
}
