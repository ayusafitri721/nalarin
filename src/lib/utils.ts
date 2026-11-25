export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} menit`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} jam ${m} menit` : `${h} jam`
}

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '').trim()
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(clean)) return null
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number]
}

function toHex(rgb: [number, number, number]): string {
  return '#' + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

export function isHexColor(value: string): boolean {
  return hexToRgb(value) !== null
}

export function readableTextColor(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#ffffff'
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }) as [number, number, number]
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.42 ? '#25233A' : '#ffffff'
}

export function darkenColor(hex: string, amount = 0.12): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return toHex(rgb.map((v) => v * (1 - amount)) as [number, number, number])
}

export function contrastRatio(a: string, b: string): number {
  const lum = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return 1
    const [r, g, bl] = rgb.map((v) => {
      const s = v / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const l1 = lum(a)
  const l2 = lum(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}
