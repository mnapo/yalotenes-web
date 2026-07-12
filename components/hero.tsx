import Link from "next/link"

import { InfoCarousel } from "@/components/info-carousel"

export function Hero() {
  return (
    <section className="mb-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/60 p-6 shadow-sm md:p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:items-stretch">
        <div className="flex flex-col justify-center">
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-sm font-medium text-muted-foreground">
            ✨ Productos seleccionados para una compra más simple
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Encontrá lo que necesitás con una experiencia más clara y rápida.
          </h1>

          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Explorá ofertas, paquetes y productos destacados sin perder tiempo
            en navegación innecesaria.
          </p>
        </div>

        <div className="flex items-start justify-center lg:justify-end">
          <InfoCarousel variant="hero" />
        </div>

        <div />

        <div className="flex flex-wrap items-end justify-center gap-3 lg:justify-end">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver productos
          </Link>

          <Link
            href="/paquetes"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Ver paquetes
          </Link>

          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  )
}