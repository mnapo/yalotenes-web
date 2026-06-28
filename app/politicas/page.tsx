"use client"

import { Header } from "@/components/header"
import { Link } from "lucide-react"
import { useState } from "react"

export default function Politicas() {
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
        <h1 className="text-3xl font-bold mb-8">Nuestras Políticas</h1>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 id="envio" className="text-2xl font-semibold">Envío</h2>
            <button
              onClick={() => copyLink('envio')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Copiar enlace"
            >
              <Link className="h-5 w-5" />
            </button>
            {copiedId === 'envio' && <span className="text-sm text-green-600">Enlace copiado</span>}
          </div>
          <p className="text-muted-foreground">
            Para CABA el envío se hace el mismo día y es gratis. Para Interior y Provincia de Bs.As. se despacha dentro de las 24hs luego de coordinar el transporte.
          </p>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 id="forma-de-pago" className="text-2xl font-semibold">Forma de pago</h2>
            <button
              onClick={() => copyLink('forma-de-pago')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Copiar enlace"
            >
              <Link className="h-5 w-5" />
            </button>
            {copiedId === 'forma-de-pago' && <span className="text-sm text-green-600">Enlace copiado</span>}
          </div>
          <p className="text-muted-foreground">
            Para poder reservar el pedido, el pago se debe hacer previamente y enviar comprobante. Aceptamos todos los medios de pago y la compra está asegurada mediante MercadoPago.
          </p>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 id="contraentrega" className="text-2xl font-semibold">Contraentrega</h2>
            <button
              onClick={() => copyLink('contraentrega')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Copiar enlace"
            >
              <Link className="h-5 w-5" />
            </button>
            {copiedId === 'contraentrega' && <span className="text-sm text-green-600">Enlace copiado</span>}
          </div>
          <p className="text-muted-foreground">
            Aceptamos pago al momento de recibir la mercadería, pero requiere una seña del 20%
          </p>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 id="devoluciones" className="text-2xl font-semibold">Devoluciones</h2>
            <button
              onClick={() => copyLink('devoluciones')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Copiar enlace"
            >
              <Link className="h-5 w-5" />
            </button>
            {copiedId === 'devoluciones' && <span className="text-sm text-green-600">Enlace copiado</span>}
          </div>
          <p className="text-muted-foreground">
            Si el producto trae fallas, coordinamos un cambio
          </p>
        </section>
      </main>
    </div>
  )
}