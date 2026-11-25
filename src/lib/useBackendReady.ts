import { useEffect, useState } from 'react'

const configured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

/** Gate ringan: tidak mengimpor supabase-js ke chunk utama. */
export function useBackendReady(): boolean {
  const [ready, setReady] = useState(!configured)

  useEffect(() => {
    if (!configured) return
    let active = true
    let cleanup: (() => void) | undefined

    void import('./backendSync').then(({ startBackendSync }) => {
      if (!active) return
      cleanup = startBackendSync(() => setReady(true))
    })

    return () => {
      active = false
      cleanup?.()
    }
  }, [])

  return ready
}
