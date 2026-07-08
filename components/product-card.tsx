"use client"

import Image from "next/image"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  discount?: number
  hideAddToCart?: boolean
}

export function ProductCard({ id, name, price, originalPrice, image, category, discount, hideAddToCart, priority = false }: ProductCardProps & { priority?: boolean }) {
  const { addItem, isInCart } = useCart()
  const isAdded = isInCart(id)

  const handleAddToCart = () => {
    if (isAdded) return
    addItem({ id, name, price, originalPrice, image, category })
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-sm">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
          {name}
        </h3>
        <div className={`mt-3 flex items-center ${hideAddToCart ? "" : "justify-between"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-foreground">
              ${new Intl.NumberFormat('es-CL').format(price)}
            </span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${new Intl.NumberFormat('es-CL').format(originalPrice)}
              </span>
            )}
          </div>
          {!hideAddToCart && (
            isAdded ? (
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
                <Check className="h-4 w-4" />
                Añadido
              </span>
            ) : (
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Agregar</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
