/**
 * Pesan error auth sengaja digeneralisasi supaya tidak membocorkan
 * apakah sebuah email terdaftar (user enumeration).
 */

export const GENERIC_LOGIN_ERROR = 'Email atau password salah'
export const GENERIC_SIGNUP_ERROR = 'Pendaftaran gagal. Silakan coba lagi.'
export const GENERIC_GOOGLE_ERROR = 'Login Google gagal. Silakan coba lagi.'

const RATE_LIMIT_PATTERN = /rate limit|too many|terlalu banyak|email.*limit|request.*limit/i

export function mapLoginError(message: string): string {
  if (RATE_LIMIT_PATTERN.test(message)) return 'Terlalu banyak percobaan. Coba lagi beberapa saat.'
  return GENERIC_LOGIN_ERROR
}

export function mapSignupError(message: string): string {
  if (RATE_LIMIT_PATTERN.test(message)) return 'Terlalu banyak percobaan. Coba lagi beberapa saat.'
  return GENERIC_SIGNUP_ERROR
}

export function mapGoogleError(message: string): string {
  if (RATE_LIMIT_PATTERN.test(message)) return 'Terlalu banyak percobaan. Coba lagi beberapa saat.'
  return GENERIC_GOOGLE_ERROR
}
