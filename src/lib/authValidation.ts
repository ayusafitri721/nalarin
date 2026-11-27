import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email atau username wajib diisi').refine(
    (v) => v.includes('@') || v.length >= 3,
    'Masukkan email atau username yang valid',
  ),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  remember: z.boolean().optional(),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  username: z.string()
    .min(3, 'Username minimal 3 karakter')
    .regex(/^[a-z0-9_]+$/, 'Gunakan huruf kecil, angka, dan underscore'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirm: z.string(),
  agree: z.literal(true, { errorMap: () => ({ message: 'Kamu harus menyetujui ketentuan' }) }),
}).refine((d) => d.password === d.confirm, {
  message: 'Konfirmasi password tidak cocok',
  path: ['confirm'],
})

export const forgotSchema = z.object({
  email: z.string().email('Format email tidak valid'),
})

export const resetSchema = z.object({
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: 'Konfirmasi password tidak cocok',
  path: ['confirm'],
})

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type ForgotForm = z.infer<typeof forgotSchema>
export type ResetForm = z.infer<typeof resetSchema>
