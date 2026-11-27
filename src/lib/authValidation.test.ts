import { describe, expect, it } from 'vitest'
import { forgotSchema, loginSchema, registerSchema, resetSchema } from './authValidation'

const validRegister = {
  name: 'Nalarin User',
  username: 'nalarin_user',
  email: 'user@nalarin.id',
  password: 'rahasia123',
  confirm: 'rahasia123',
  agree: true as const,
}

describe('loginSchema', () => {
  it('menerima email dan password yang valid', () => {
    expect(loginSchema.safeParse({ email: 'user@nalarin.id', password: 'rahasia123' }).success).toBe(true)
  })

  it('menerima username minimal 3 karakter', () => {
    expect(loginSchema.safeParse({ email: 'user', password: 'rahasia123' }).success).toBe(true)
  })

  it('menolak email kosong', () => {
    const result = loginSchema.safeParse({ email: '', password: 'rahasia123' })
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.issues[0].message).toBe('Email atau username wajib diisi')
  })

  it('menolak username kurang dari 3 karakter', () => {
    expect(loginSchema.safeParse({ email: 'ab', password: 'rahasia123' }).success).toBe(false)
  })

  it('menolak password kurang dari 6 karakter', () => {
    expect(loginSchema.safeParse({ email: 'user@nalarin.id', password: '12345' }).success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('menerima data pendaftaran yang valid', () => {
    expect(registerSchema.safeParse(validRegister).success).toBe(true)
  })

  it('menolak nama kurang dari 2 karakter', () => {
    expect(registerSchema.safeParse({ ...validRegister, name: 'A' }).success).toBe(false)
  })

  it('menolak username dengan huruf kapital atau spasi', () => {
    expect(registerSchema.safeParse({ ...validRegister, username: 'UserSatu' }).success).toBe(false)
    expect(registerSchema.safeParse({ ...validRegister, username: 'user satu' }).success).toBe(false)
  })

  it('menolak format email salah', () => {
    expect(registerSchema.safeParse({ ...validRegister, email: 'bukan-email' }).success).toBe(false)
  })

  it('menolak password kurang dari 8 karakter', () => {
    expect(registerSchema.safeParse({ ...validRegister, password: 'pendek', confirm: 'pendek' }).success).toBe(false)
  })

  it('menolak konfirmasi password yang tidak cocok', () => {
    const result = registerSchema.safeParse({ ...validRegister, confirm: 'bedasecret' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirm')
      expect(result.error.issues[0].message).toBe('Konfirmasi password tidak cocok')
    }
  })

  it('menolak jika ketentuan tidak disetujui', () => {
    const result = registerSchema.safeParse({ ...validRegister, agree: false })
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.issues[0].message).toBe('Kamu harus menyetujui ketentuan')
  })
})

describe('forgotSchema', () => {
  it('menerima email valid', () => {
    expect(forgotSchema.safeParse({ email: 'user@nalarin.id' }).success).toBe(true)
  })

  it('menolak email tidak valid', () => {
    expect(forgotSchema.safeParse({ email: 'salah' }).success).toBe(false)
  })
})

describe('resetSchema', () => {
  it('menerima password baru yang sama', () => {
    expect(resetSchema.safeParse({ password: 'rahasia123', confirm: 'rahasia123' }).success).toBe(true)
  })

  it('menolak password kurang dari 8 karakter', () => {
    expect(resetSchema.safeParse({ password: 'pendek', confirm: 'pendek' }).success).toBe(false)
  })

  it('menolak konfirmasi yang tidak cocok', () => {
    const result = resetSchema.safeParse({ password: 'rahasia123', confirm: 'berbeda12' })
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.issues[0].path).toContain('confirm')
  })
})
