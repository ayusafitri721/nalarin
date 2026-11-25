export type ThemeMode = 'light' | 'dark' | 'system'
export type Density = 'comfortable' | 'compact'
export type Difficulty = 'Pemula' | 'Menengah' | 'Lanjut'

export interface ThemeState {
  mode: ThemeMode
  accent: string
  density: Density
  backgroundStyle: 'minimal' | 'gradient' | 'pattern' | 'illustration'
}

export interface Interests {
  science: boolean
  technology: boolean
  psychology: boolean
  finance: boolean
  history: boolean
  creativity: boolean
  language: boolean
  logic: boolean
  general: boolean
}

export interface OnboardingData {
  name: string
  interests: string[]
  goals: string[]
  dailyGoal: number
  companion: string
  theme: ThemeState
}

export interface Universe {
  id: string
  slug: string
  title: string
  description: string
  accent: string
  soft: string
  icon: string
  art: 'castle' | 'island' | 'brain' | 'city' | 'vault' | 'studio' | 'sphere' | 'arena'
  topicCount: number
  gameCount: number
  questCount: number
  progress: number
  subcategories: string[]
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'callout' | 'quote' | 'list' | 'summary'
  text: string
  items?: string[]
}

export interface Lesson {
  id: string
  title: string
  duration: number
  blocks: ContentBlock[]
  completed?: boolean
}

export interface Topic {
  id: string
  slug: string
  universeSlug: string
  title: string
  description: string
  difficulty: Difficulty
  duration: number
  objectives: string[]
  lessons: Lesson[]
  quizId: string
  progress: number
  art: Universe['art']
  accent: string
  soft: string
  status: 'belum' | 'berjalan' | 'selesai'
}

export interface QuizOption {
  id: string
  label: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: QuizOption[]
  correctId: string
  explanation: string
}

export interface Quiz {
  id: string
  topicTitle: string
  questions: QuizQuestion[]
}

export interface Game {
  slug: string
  title: string
  description: string
  category: 'Brain' | 'Puzzle' | 'Word' | 'Story' | 'Memory' | 'Fact' | 'Decision'
  difficulty: Difficulty
  bestScore: number
  accent: string
  art: string
  xp: number
}

export interface Quest {
  id: string
  title: string
  description: string
  category: 'Harian' | 'Mingguan' | 'Spesial' | 'Dunia Nyata'
  reward: number
  progress: number
  target: number
  status: 'aktif' | 'selesai'
  deadline?: string
}

export interface Friend {
  username: string
  name: string
  avatar: string
  color: string
  online: boolean
  lastActive: string
  level: number
  common: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  color: string
}

export interface NotificationItem {
  id: string
  type: 'learning' | 'social' | 'achievement' | 'system'
  title: string
  body: string
  time: string
  read: boolean
  href: string
}
