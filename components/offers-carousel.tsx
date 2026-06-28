"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ProductCard } from "./product-card"
import { SectionTitle } from "./section-title"
import { offerProducts } from "@/data/products"

export function OffersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const updateOverflow = () => {
      const maxScroll = element.scrollWidth - element.clientWidth
      setCanScrollLeft(element.scrollLeft > 0)
      setCanScrollRight(element.scrollLeft < maxScroll - 2)
    }

    updateOverflow()
    const resizeObserver = new ResizeObserver(updateOverflow)
    resizeObserver.observe(element)
    element.addEventListener("scroll", updateOverflow)
    window.addEventListener("resize", updateOverflow)

    return () => {
      resizeObserver.disconnect()
      element.removeEventListener("scroll", updateOverflow)
      window.removeEventListener("resize", updateOverflow)
    }
  }, [])

  return (
    <section className="mb-12">
      <SectionTitle title="Ofertas" />
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-secondary border border-border p-2 rounded-full transition-colors ${canScrollLeft ? "" : "hidden"}`}
          aria-label="Desplazar ofertas a la izquierda"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {offerProducts.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-56">
              <ProductCard {...product} priority={index === 0} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-secondary border border-border p-2 rounded-full transition-colors ${canScrollRight ? "" : "hidden"}`}
          aria-label="Desplazar ofertas a la derecha"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </section>
  )
}
