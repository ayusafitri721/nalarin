import { supabase } from './supabase'
import type { AppUser, QuizResult } from '@/store/useAppStore'
import type { OnboardingData, ThemeState } from '@/types'

export interface ProgressPayload {
  completedLessons: string[]
  bookmarks: string[]
  notes: Record<string, string>
  claimedRewards: string[]
  notificationsRead: string[]
}

export interface RemoteState {
  user: Partial<AppUser>
  onboarding: OnboardingData | null
  theme: ThemeState | null
  progress: ProgressPayload | null
  quizResults: QuizResult[]
}

export interface ProfilePatch {
  username: string
  full_name: string
  email: string
  avatar: string
  bio: string | null
  companion: string
  level: number
  xp: number
  streak: number
  longest_streak: number
  total_active_days: number
  onboarding: OnboardingData | null
  theme: ThemeState | null
}

type ProfileRow = {
  id: string
  username: string | null
  full_name: string | null
  email: string | null
  avatar: string | null
  bio: string | null
  companion: string | null
  level: number
  xp: number
  streak: number
  longest_streak: number
  total_active_days: number
  onboarding: OnboardingData | null
  theme: ThemeState | null
}

type ProgressRow = {
  completed_lessons: string[] | null
  bookmarks: string[] | null
  notes: Record<string, string> | null
  claimed_rewards: string[] | null
  notifications_read: string[] | null
}

type QuizResultRow = {
  quiz_id: string
  score: number
  total: number
  answers: Record<string, string> | null
  completed_at: string
}

export async function getAuthUserId(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user?.id ?? null
}

export function buildProfilePatch(user: AppUser | null, onboarding: OnboardingData | null, theme: ThemeState | null, fallbackEmail = ''): ProfilePatch {
  return {
    username: user?.username || fallbackEmail.split('@')[0] || 'learner',
    full_name: user?.name ?? 'Learner',
    email: user?.email ?? fallbackEmail,
    avatar: user?.avatar ?? '#7563E8',
    bio: user?.bio ?? null,
    companion: user?.companion ?? 'nori',
    level: user?.level ?? 1,
    xp: user?.xp ?? 0,
    streak: user?.streak ?? 0,
    longest_streak: user?.longestStreak ?? 0,
    total_active_days: user?.totalActiveDays ?? 0,
    onboarding,
    theme,
  }
}

export function buildProgressPayload(progress: ProgressPayload): {
  completed_lessons: string[]
  bookmarks: string[]
  notes: Record<string, string>
  claimed_rewards: string[]
  notifications_read: string[]
  updated_at: string
} {
  return {
    completed_lessons: progress.completedLessons,
    bookmarks: progress.bookmarks,
    notes: progress.notes,
    claimed_rewards: progress.claimedRewards,
    notifications_read: progress.notificationsRead,
    updated_at: new Date().toISOString(),
  }
}

export async function fetchRemoteState(userId: string): Promise<RemoteState | null> {
  if (!supabase) return null

  const [profileRes, progressRes, quizRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('user_progress').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('quiz_results').select('quiz_id, score, total, answers, completed_at').eq('user_id', userId),
  ])

  const profile = profileRes.data as ProfileRow | null
  const progress = progressRes.data as ProgressRow | null
  const quizzes = (quizRes.data ?? []) as QuizResultRow[]

  if (!profile && !progress && quizzes.length === 0) return null

  const user: Partial<AppUser> = profile
    ? {
        name: profile.full_name ?? 'Learner',
        username: profile.username ?? '',
        email: profile.email ?? '',
        avatar: profile.avatar ?? '#7563E8',
        bio: profile.bio ?? undefined,
        companion: profile.companion ?? 'nori',
        level: profile.level ?? 1,
        xp: profile.xp ?? 0,
        streak: profile.streak ?? 0,
        longestStreak: profile.longest_streak ?? 0,
        totalActiveDays: profile.total_active_days ?? 0,
      }
    : {}

  return {
    user,
    onboarding: profile?.onboarding ?? null,
    theme: profile?.theme ?? null,
    progress: progress
      ? {
          completedLessons: progress.completed_lessons ?? [],
          bookmarks: progress.bookmarks ?? [],
          notes: progress.notes ?? {},
          claimedRewards: progress.claimed_rewards ?? [],
          notificationsRead: progress.notifications_read ?? [],
        }
      : null,
    quizResults: quizzes.map((q) => ({
      quizId: q.quiz_id,
      score: q.score,
      total: q.total,
      answers: q.answers ?? {},
      completedAt: q.completed_at,
    })),
  }
}

export async function upsertProfile(userId: string, patch: ProfilePatch): Promise<void> {
  if (!supabase) return
  const { error } = await supabase.from('profiles').upsert({ id: userId, ...patch }, { onConflict: 'id' })
  if (error) console.error('[backend] upsertProfile failed:', error.message)
}

export async function upsertProgress(userId: string, progress: ProgressPayload): Promise<void> {
  if (!supabase) return
  const { error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, ...buildProgressPayload(progress) }, { onConflict: 'user_id' })
  if (error) console.error('[backend] upsertProgress failed:', error.message)
}

export async function upsertQuizResults(userId: string, results: QuizResult[]): Promise<void> {
  if (!supabase || results.length === 0) return
  const rows = results.map((r) => ({
    user_id: userId,
    quiz_id: r.quizId,
    score: r.score,
    total: r.total,
    answers: r.answers,
    completed_at: r.completedAt,
  }))
  const { error } = await supabase.from('quiz_results').upsert(rows, { onConflict: 'user_id, quiz_id' })
  if (error) console.error('[backend] upsertQuizResults failed:', error.message)
}
