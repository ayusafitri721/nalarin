import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { darkenColor, readableTextColor } from '@/lib/utils'
import type { OnboardingData, ThemeState } from '@/types'

const defaultTheme: ThemeState = {
  mode: 'light',
  accent: '#7563E8',
  density: 'comfortable',
  backgroundStyle: 'minimal',
}

export interface AppUser {
  name: string
  username: string
  email: string
  level: number
  xp: number
  streak: number
  longestStreak: number
  totalActiveDays: number
  companion: string
  avatar: string
  bio?: string
}

export interface QuizResult {
  quizId: string
  score: number
  total: number
  answers: Record<string, string>
  completedAt: string
}

interface Toast {
  id: number
  message: string
  tone: 'success' | 'info' | 'error'
}

interface AppState {
  theme: ThemeState
  user: AppUser | null
  /** Email akun terakhir dipakai, tetap ada setelah logout untuk mengenali akun yang sama. */
  lastAccountEmail: string | null
  onboarding: OnboardingData | null
  completedLessons: string[]
  quizResults: QuizResult[]
  gameScores: Record<string, number>
  activeDates: string[]
  bookmarks: string[]
  notes: Record<string, string>
  claimedRewards: string[]
  notificationsRead: string[]
  toast: Toast | null

  setThemeMode: (mode: ThemeState['mode']) => void
  setAccent: (accent: string) => void
  setDensity: (density: ThemeState['density']) => void
  setBackgroundStyle: (style: ThemeState['backgroundStyle']) => void
  resetTheme: () => void
  applyTheme: () => void

  signIn: (email: string) => void
  signOut: () => void
  updateProfile: (patch: Partial<AppUser>) => void
  finishOnboarding: (data: OnboardingData) => void
  completeLesson: (id: string) => void
  submitQuiz: (result: QuizResult) => void
  submitGameScore: (slug: string, score: number) => void
  toggleBookmark: (id: string) => void
  setNote: (lessonId: string, note: string) => void
  claimReward: (key: string) => void
  awardXp: (amount: number, key: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: (ids: string[]) => void
  showToast: (message: string, tone?: Toast['tone']) => void
  clearToast: () => void
}

function applyThemeToDocument(theme: ThemeState) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  root.dataset.theme = theme.mode === 'dark' || (theme.mode === 'system' && systemDark) ? 'dark' : 'light'
  root.dataset.density = theme.density
  root.dataset.bg = theme.backgroundStyle
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-hover', darkenColor(theme.accent))
  root.style.setProperty('--accent-on', readableTextColor(theme.accent))
}

const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

function activityPatch(state: AppState) {
  const today = dayKey(new Date())
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const activeDates = state.activeDates.includes(today) ? state.activeDates : [...state.activeDates, today]
  const user = state.user
  if (!user || state.activeDates.includes(today)) return { activeDates }
  const streak = state.activeDates.includes(dayKey(yesterday)) ? user.streak + 1 : 1
  return {
    activeDates,
    user: {
      ...user,
      streak,
      longestStreak: Math.max(user.longestStreak, streak),
      totalActiveDays: activeDates.length,
    },
  }
}

const levelFromXp = (xp: number) => {
  const thresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200]
  let level = 1
  thresholds.forEach((t, i) => {
    if (xp >= t) level = i + 1
  })
  return level
}

function userFromEmail(email: string): AppUser {
  const local = email.split('@')[0] || 'learner'
  return {
    name: local.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    username: local.toLowerCase(),
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

/** Data yang benar-benar milik satu akun; harus dibersihkan saat akun berganti. */
const emptyAccountData = {
  onboarding: null,
  completedLessons: [],
  quizResults: [],
  gameScores: {},
  activeDates: [],
  bookmarks: [],
  notes: {},
  claimedRewards: [],
  notificationsRead: [],
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: defaultTheme,
      user: null,
      lastAccountEmail: null,
      onboarding: null,
      completedLessons: [],
      quizResults: [],
      gameScores: {},
      activeDates: [],
      bookmarks: [],
      notes: {},
      claimedRewards: [],
      notificationsRead: [],
      toast: null,

      setThemeMode: (mode) => {
        const theme = { ...get().theme, mode }
        set({ theme })
        applyThemeToDocument(theme)
      },
      setAccent: (accent) => {
        const theme = { ...get().theme, accent }
        set({ theme })
        applyThemeToDocument(theme)
      },
      setDensity: (density) => {
        const theme = { ...get().theme, density }
        set({ theme })
        applyThemeToDocument(theme)
      },
      setBackgroundStyle: (backgroundStyle) => {
        const theme = { ...get().theme, backgroundStyle }
        set({ theme })
        applyThemeToDocument(theme)
      },
      resetTheme: () => {
        set({ theme: defaultTheme })
        applyThemeToDocument(defaultTheme)
        get().showToast('Tema dikembalikan ke pengaturan awal', 'info')
      },
      applyTheme: () => applyThemeToDocument(get().theme),

      signIn: (email) => {
        const state = get()
        const sameAccount =
          state.user?.email === email || state.lastAccountEmail === email
        if (sameAccount) {
          // Login ulang ke akun yang sama: progres/onboarding tidak dihapus.
          set({ user: state.user ?? userFromEmail(email), lastAccountEmail: email })
          return
        }
        // Akun benar-benar berbeda: bersihkan semua data milik akun sebelumnya.
        set({ ...emptyAccountData, user: userFromEmail(email), lastAccountEmail: email })
      },
      signOut: () => set({ user: null }),
      updateProfile: (patch) => {
        const user = get().user
        if (user) set({ user: { ...user, ...patch } })
      },
      finishOnboarding: (data) => {
        const user = get().user
        const base: AppUser = user ?? {
          name: data.name || 'Learner',
          username: (data.name || 'learner').toLowerCase().replace(/\s+/g, ''),
          email: 'learner@nalarin.id',
          level: 1, xp: 0, streak: 0, longestStreak: 0, totalActiveDays: 0,
          companion: data.companion, avatar: '#7563E8',
        }
        set({
          onboarding: data,
          user: { ...base, name: data.name || base.name, companion: data.companion },
          theme: data.theme,
        })
        applyThemeToDocument(data.theme)
      },
      completeLesson: (id) => {
        const state = get()
        if (state.completedLessons.includes(id)) {
          state.showToast('Lesson ini sudah selesai sebelumnya', 'info')
          return
        }
        const patch = activityPatch(state)
        const base = patch.user ?? state.user
        const xp = (base?.xp ?? 0) + 20
        set({
          ...patch,
          completedLessons: [...state.completedLessons, id],
          ...(base ? { user: { ...base, xp, level: levelFromXp(xp) } } : {}),
        })
        state.showToast('+20 XP, lesson selesai!', 'success')
      },
      submitQuiz: (result) => {
        const state = get()
        const key = `quiz:${result.quizId}`
        const alreadyClaimed = state.claimedRewards.includes(key)
        const best = state.quizResults.find((r) => r.quizId === result.quizId)
        const newBest = !best || result.score > best.score
        const quizResults = [...state.quizResults.filter((r) => r.quizId !== result.quizId), result]
        const patch = activityPatch(state)
        const base = patch.user ?? state.user
        const xp = (base?.xp ?? 0) + 30
        set({
          ...patch,
          quizResults,
          ...(base && newBest && !alreadyClaimed
            ? { user: { ...base, xp, level: levelFromXp(xp) }, claimedRewards: [...state.claimedRewards, key] }
            : {}),
        })
        if (newBest && !alreadyClaimed) state.showToast('+30 XP, kuis selesai!', 'success')
      },
      submitGameScore: (slug, score) => {
        const state = get()
        set({
          ...activityPatch(state),
          gameScores: { ...state.gameScores, [slug]: Math.max(state.gameScores[slug] ?? 0, score) },
        })
      },
      toggleBookmark: (id) => {
        const bookmarks = get().bookmarks
        const next = bookmarks.includes(id) ? bookmarks.filter((b) => b !== id) : [...bookmarks, id]
        set({ bookmarks: next })
        get().showToast(bookmarks.includes(id) ? 'Bookmark dihapus' : 'Disimpan ke koleksi', 'info')
      },
      setNote: (lessonId, note) => set({ notes: { ...get().notes, [lessonId]: note } }),
      claimReward: (key) => get().awardXp(50, key),
      awardXp: (amount, key) => {
        if (get().claimedRewards.includes(key)) {
          get().showToast('Reward untuk aktivitas ini sudah diambil', 'info')
          return
        }
        const user = get().user
        if (!user) return
        const xp = user.xp + amount
        set({ claimedRewards: [...get().claimedRewards, key], user: { ...user, xp, level: levelFromXp(xp) } })
        get().showToast(`+${amount} XP diperoleh!`, 'success')
      },
      markNotificationRead: (id) => set({ notificationsRead: [...new Set([...get().notificationsRead, id])] }),
      markAllNotificationsRead: (ids) => set({ notificationsRead: ids }),
      showToast: (message, tone = 'success') => set({ toast: { id: Date.now(), message, tone } }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'nalarin-store',
      version: 2,
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<AppState>
        const theme = state.theme
        const wasUntouchedDefault =
          theme &&
          theme.mode === 'system' &&
          theme.accent.toLowerCase() === defaultTheme.accent.toLowerCase() &&
          theme.density === defaultTheme.density &&
          theme.backgroundStyle === defaultTheme.backgroundStyle
        if (version < 2 && wasUntouchedDefault) state.theme = { ...theme, mode: 'light' }
        return state as AppState
      },
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        lastAccountEmail: state.lastAccountEmail,
        onboarding: state.onboarding,
        completedLessons: state.completedLessons,
        quizResults: state.quizResults,
        gameScores: state.gameScores,
        activeDates: state.activeDates,
        bookmarks: state.bookmarks,
        notes: state.notes,
        claimedRewards: state.claimedRewards,
        notificationsRead: state.notificationsRead,
      }),
    },
  ),
)

export { levelFromXp }
