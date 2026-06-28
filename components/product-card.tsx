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
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </span>
        <h3 className="font-medium text-foreground mt-1 line-clamp-2 text-sm">
          {name}
        </h3>
        <div className={`flex items-center mt-3 ${hideAddToCart ? "" : "justify-between"}`}>
          <div className="flex items-center gap-2">
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
              <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
                <Check className="h-4 w-4" />
                Añadido
              </span>
            ) : (
              <button 
                onClick={handleAddToCart}
                className="p-2 rounded-md transition-all duration-300 bg-secondary hover:bg-primary hover:text-primary-foreground hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
