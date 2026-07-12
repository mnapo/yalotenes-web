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
}

export function InfoCarousel({
  variant = "default",
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

  return (
    <section
      className={cn(
        variant === "default" && "mb-12 px-4 sm:px-6",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",

          variant === "default"
            ? "mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950/80 px-4 py-10 shadow-xl shadow-slate-950/20 sm:px-6 sm:py-12"
            : "w-full max-w-sm",
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex w-full items-center justify-center",

            variant === "default"
              ? "max-w-xl min-h-[340px]"
              : "max-w-xs min-h-[180px]",
          )}
        >
          {homeInfoCards.map((card, index) => (
            <article
              key={card.label}
              aria-hidden={activeIndex !== index}
              className={cn(
                "absolute inset-0 transition-all duration-[1000ms] ease-out",

                variant === "default"
                  ? "rounded-[1.75rem] border border-white/10 bg-slate-950/95 px-8 py-10 shadow-2xl shadow-slate-950/20"
                  : "border-none bg-transparent px-2 py-2 shadow-none",

                activeIndex === index
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-[0.98] opacity-0",
              )}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center text-center",

                  variant === "default"
                    ? "min-h-[260px] gap-5"
                    : "min-h-[150px] gap-2",
                )}
              >
                <div
                  className={cn(
                    "leading-none",

                    variant === "default"
                      ? "text-[4.5rem] sm:text-[5rem]"
                      : "text-5xl",
                  )}
                >
                  {card.emoji}
                </div>

                <p
                  className={cn(
                    "font-semibold leading-tight",

                    variant === "default"
                      ? "max-w-[22rem] text-lg text-white sm:text-xl md:text-2xl"
                      : "max-w-[16rem] text-base text-foreground",
                  )}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {homeInfoCards.map((card, index) => (
            <button
              key={card.label}
              type="button"
              aria-label={`Ir a la tarjeta ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                variant === "default"
                  ? "bg-slate-400/70"
                  : "bg-muted",

                "h-2.5 rounded-full transition-all duration-300",

                activeIndex === index
                  ? variant === "default"
                    ? "w-8 bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    : "w-8 bg-primary"
                  : "w-2.5",
              )}
            />
          ))}
        </div>

        {variant === "default" && (
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