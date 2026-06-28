"use client"

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) {
    return null
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-3xl bg-slate-900/90 text-white shadow-2xl ring-1 ring-white/10 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <ArrowUp className="m-auto h-6 w-6" />
    </button>
  )
}
