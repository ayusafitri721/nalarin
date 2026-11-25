import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '@/App'
import { ToastHost } from '@/components/ui'
import { useAppStore } from '@/store/useAppStore'
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
})

function ThemeSync() {
  const applyTheme = useAppStore((s) => s.applyTheme)
  useEffect(() => {
    applyTheme()
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme()
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [applyTheme])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeSync />
        <App />
        <ToastHost />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
