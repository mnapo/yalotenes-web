"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

import { InfoCarousel } from "@/components/info-carousel"

interface HeroProps {
  onProductsClick: () => void
  onPackagesClick: () => void
}

export function Hero({
  onProductsClick,
  onPackagesClick,
}: HeroProps) {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence mode="popLayout">
      {visible && (
        <motion.section
          layout
          initial={{
            opacity: 0,
            y: -24,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -16,
            scale: 0.98,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
            layout: {
              duration: 0.25,
              ease: "easeOut",
            },
          }}
          className="relative mb-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/60 p-6 shadow-sm md:p-8"
        >
          <button
            type="button"
            aria-label="Cerrar hero"
            onClick={() => setVisible(false)}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground transition-all duration-200 hover:bg-background hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
            {/* Columna izquierda */}
            <div className="flex flex-1 flex-col justify-center">
              <p className="mb-3 inline-flex w-fit items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-sm font-medium text-muted-foreground">
                ✨ Productos seleccionados para una compra más simple
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Encontrá lo que necesitás con una experiencia más clara y rápida.
              </h1>

              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Explorá ofertas, paquetes y productos destacados sin perder
                tiempo en navegación innecesaria.
              </p>
            </div>

            {/* Columna derecha */}
            <div className="flex w-full flex-col justify-between gap-6 lg:max-w-md">
              <InfoCarousel variant="hero" />

              <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={onProductsClick}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Ver productos
                </button>

                <button
                  type="button"
                  onClick={onPackagesClick}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Ver paquetes
                </button>

                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}