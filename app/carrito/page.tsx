"use client"

import { Header } from "@/components/header"
import { useCart } from "@/context/cart-context"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, MessageSquare, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { MAX_CART_ITEM_QUANTITY, WHATSAPP_COMPANY_PHONE } from "@/lib/config"

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart, totalDiscount } = useCart()
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const shouldShow = scrollTop < 100 && documentHeight > windowHeight * 1.5 && items.length > 0

      setShowScrollIndicator(shouldShow)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [items.length])

  const truncateOrderName = (name: string) => {
    if (name.length <= 15) return name

    const middleLength = 9
    const keepLength = name.length - middleLength
    const prefixLength = Math.ceil(keepLength / 2)
    const suffixLength = Math.floor(keepLength / 2)

    return `${name.slice(0, prefixLength)}...${name.slice(name.length - suffixLength)}`
  }

  const orderLines = items
    .map((item) => `- ${truncateOrderName(item.name)} (x${item.quantity})`)
    .join("\n")

  const whatsappUrl = `${"https://api.whatsapp.com/send/?phone=" + WHATSAPP_COMPANY_PHONE}&text=${encodeURIComponent(
    `Hola, quiero hacer mi pedido:\n${orderLines}`
  )}&type=phone_number&app_absent=0`

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-muted-foreground mb-8">
              Parece que aún no has añadido ningún producto a tu carrito.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver productos
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showScrollIndicator && (
        <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-40">
          <div className="scroll-indicator">
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-primary animate-wave-1" />
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-primary animate-wave-2" />
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-primary animate-wave-3" />
          </div>
        </div>
      )}
      <main ref={mainRef} className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Tu pedido
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-card border border-border rounded-lg p-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="font-medium text-foreground line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Precio unitario</span>
                        <span className="font-bold text-foreground">
                          ${new Intl.NumberFormat("es-CL").format(item.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-bold text-foreground">
                          ${new Intl.NumberFormat("es-CL").format(item.price * item.quantity)}
                        </span>
                      </div>
                      {item.originalPrice && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Antes</span>
                          <span className="line-through">
                            ${new Intl.NumberFormat("es-CL").format(item.originalPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 bg-secondary hover:bg-secondary/80 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= MAX_CART_ITEM_QUANTITY}
                          className={`p-1 rounded transition-colors ${
                            item.quantity >= MAX_CART_ITEM_QUANTITY
                              ? "bg-secondary/60 text-muted-foreground cursor-not-allowed"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Resumen del pedido
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ${new Intl.NumberFormat("es-CL").format(totalPrice + totalDiscount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Descuento</span>
                    <span className="text-emerald-600 font-medium">
                      -${new Intl.NumberFormat("es-CL").format(totalDiscount)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="font-bold text-foreground">
                        ${new Intl.NumberFormat("es-CL").format(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-200 text-emerald-900 py-3 rounded-md font-medium hover:bg-emerald-300 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Hacer mi pedido
                </a>
                <Link
                  href="/productos"
                  className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
