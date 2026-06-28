"use client"

import { ChevronLeft, ChevronRight, ShoppingCart, Check, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionTitle } from "./section-title"
import { allProducts } from "@/data/products"
import { packageOffers } from "@/data/packages"
import { useCart } from "@/context/cart-context"

export function PackageCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const { addItem, isInCart } = useCart()

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
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
      <SectionTitle title="Paquetes" />
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-secondary border border-border p-2 rounded-full transition-colors ${canScrollLeft ? "" : "hidden"}`}
          aria-label="Desplazar paquetes a la izquierda"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <div
          ref={scrollRef}
          className="grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packageOffers.map((pack) => {
            const products = pack.productIds
              .map((productId) => allProducts.find((product) => product.id === productId))
              .filter(Boolean) as typeof allProducts
            const totalPrice = products.reduce((sum, product) => sum + product.price, 0)
            const discountedPrice = Math.round(totalPrice * (100 - pack.discountPercentage) / 100)
            const isAdded = isInCart(pack.id)

            const handleAddToCart = () => {
              if (isAdded) return
              addItem({
                id: pack.id,
                name: pack.name,
                price: discountedPrice,
                originalPrice: totalPrice,
                image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
                category: "Paquete",
              })
            }

            return (
              <div key={pack.id} className="flex-shrink-0 w-72">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow">
                    <div>
                      <p className="text-sm text-muted-foreground">Precio final</p>
                      <p className="text-lg font-semibold text-foreground">
                        ${new Intl.NumberFormat("es-CL").format(discountedPrice)}
                      </p>
                      <p className="text-sm text-emerald-600 font-semibold mt-1">
                        -{pack.discountPercentage}% de descuento
                      </p>
                    </div>
                    <p className="text-sm italic text-muted-foreground">Incluye {products.length} productos</p>
                    <div className="flex flex-wrap gap-2">
                      {pack.categories.map((category) => (
                        <Badge key={category.label} variant="outline" className="gap-2">
                          <span>{category.emoji}</span>
                          {category.label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardContent className="pt-0 border-t border-border mt-4 space-y-3">
                    <Link
                      href={`/paquetes/${pack.slug}`}
                      className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Ver Detalles
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <div className="pt-3 border-t border-border">
                      {isAdded ? (
                        <div className="w-full inline-flex items-center justify-center gap-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-4 py-3 rounded-md font-medium">
                          <Check className="h-4 w-4" />
                          Añadido al carrito
                        </div>
                      ) : (
                        <button
                          onClick={handleAddToCart}
                          className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground px-4 py-3 rounded-md font-medium transition-all duration-300 hover:scale-[1.02]"
                          aria-label={`Añadir ${pack.name} al carrito`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Añadir al carrito
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-secondary border border-border p-2 rounded-full transition-colors ${canScrollRight ? "" : "hidden"}`}
          aria-label="Desplazar paquetes a la derecha"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </section>
  )
}
