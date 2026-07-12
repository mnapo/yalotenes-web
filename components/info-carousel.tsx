"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const homeInfoCards = [
  {
    emoji: "💳",
    label: "Tarjeta crédito",
    description: "Aceptamos todos los medios de pago",
  },
  {
    emoji: "🚚",
    label: "Envío gratis",
    description: "Envío gratis y en el día a todo CABA",
  },
  {
    emoji: "📦",
    label: "Compra mínima",
    description: "Compra mínima $50.000",
  },
]

interface InfoCarouselProps {
  variant?: "default" | "hero"
  className?: string
}

export function InfoCarousel({
  variant = "default",
  className,
}: InfoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homeInfoCards.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [])

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? homeInfoCards.length - 1 : current - 1,
    )
  }

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % homeInfoCards.length)
  }

  const isHero = variant === "hero"

  return (
    <section
      className={cn(
        !isHero && "mb-12 px-4 sm:px-6",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",

          isHero
            ? "w-full"
            : "mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950/80 px-4 py-10 shadow-xl shadow-slate-950/20 sm:px-6 sm:py-12",
        )}
      >
        <div
          className={cn(
            "relative flex w-full items-center justify-center",

            isHero
              ? "min-h-[130px]"
              : "mx-auto min-h-[340px] max-w-xl",
          )}
        >
          {homeInfoCards.map((card, index) => (
            <article
              key={card.label}
              aria-hidden={activeIndex !== index}
              className={cn(
                "absolute inset-0 transition-all duration-[1000ms] ease-out",

                isHero
                  ? "bg-transparent"
                  : "rounded-[1.75rem] border border-white/10 bg-slate-950/95 px-8 py-10 shadow-2xl shadow-slate-950/20",

                activeIndex === index
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-[0.98] opacity-0",
              )}
            >
              <div
                className={cn(
                  "flex h-full flex-col items-center justify-center text-center",

                  isHero
                    ? "gap-2"
                    : "min-h-[260px] gap-5",
                )}
              >
                <div
                  className={cn(
                    "leading-none",

                    isHero
                      ? "text-4xl"
                      : "text-[4.5rem] sm:text-[5rem]",
                  )}
                >
                  {card.emoji}
                </div>

                <p
                  className={cn(
                    "font-semibold leading-tight",

                    isHero
                      ? "max-w-xs text-base text-foreground"
                      : "max-w-[22rem] text-lg text-white sm:text-xl md:text-2xl",
                  )}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className={cn(
            "flex items-center justify-center gap-2",
            isHero ? "mt-2" : "mt-6",
          )}
        >
          {homeInfoCards.map((card, index) => (
            <button
              key={card.label}
              type="button"
              aria-label={`Ir a la tarjeta ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",

                activeIndex === index
                  ? isHero
                    ? "w-8 bg-primary"
                    : "w-8 bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  : isHero
                    ? "w-2.5 bg-muted"
                    : "w-2.5 bg-slate-400/70",
              )}
            />
          ))}
        </div>

        {!isHero && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Anterior beneficio"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente beneficio"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </section>
  )
}