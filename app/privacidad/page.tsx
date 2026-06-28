"use client"

import { Header } from "@/components/header"
import { Link } from "lucide-react"
import { useState } from "react"

export default function Privacidad() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Políticas de Privacidad</h1>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 id="informacion-sensible" className="text-2xl font-semibold">Información Sensible</h2>
            <button
              onClick={() => copyLink('informacion-sensible')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Copiar enlace"
            >
              <Link className="h-5 w-5" />
            </button>
            {copiedId === 'informacion-sensible' && <span className="text-sm text-green-600">Enlace copiado</span>}
          </div>
          <p className="text-muted-foreground">
            Nuestra empresa mantiene la información sensible de manera segura y no la comparte con terceros.
          </p>
        </section>
      </main>
    </div>
  )
}