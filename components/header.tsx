"use client"

import { ChevronLeft, Search, ShoppingCart, Menu, X } from "lucide-react"
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { searchProducts } from "@/data/products"
import { ThemeSwitcher } from "./theme-switcher"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false)
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null)

  const handleSearchIconClick = () => {
    setIsMenuOpen(true)
    setShouldFocusSearch(true)
  }

  useEffect(() => {
    if (isMenuOpen && shouldFocusSearch) {
      mobileSearchInputRef.current?.focus()
      setShouldFocusSearch(false)
    }
  }, [isMenuOpen, shouldFocusSearch])

  const searchSuggestions = useMemo(() => {
    const trimmedQuery = searchQuery.trim()
    if (!trimmedQuery) return []
    return searchProducts(trimmedQuery).slice(0, 3)
  }, [searchQuery])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedQuery = searchQuery.trim()
    router.push(trimmedQuery ? `/buscar?q=${encodeURIComponent(trimmedQuery)}` : "/buscar")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative inline-flex items-center overflow-hidden rounded-2xl px-4 py-2 argentina-flag-background text-[#0f2a52] text-xl font-bold">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 argentina-flag-sun" aria-hidden="true" />
              <span className="relative inline-flex items-end gap-[0.1rem] whitespace-nowrap">
                <span className="wavy-letter">Y</span>
                <span className="wavy-letter">a</span>
                <span className="wavy-letter">L</span>
                <span className="wavy-letter">o</span>
                <span className="wavy-letter">T</span>
                <span className="wavy-letter">e</span>
                <span className="wavy-letter">n</span>
                <span className="wavy-letter">é</span>
                <span className="wavy-letter">s</span>
              </span>
            </Link>
            {pathname !== "/" && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver
              </Link>
            )}
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <div className="relative w-full flex">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-l-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 bg-primary text-primary-foreground text-sm font-medium rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  Buscar
                </button>
              </div>
              {searchSuggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border border-border bg-background shadow-md">
                  {searchSuggestions.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/buscar?q=${encodeURIComponent(product.name)}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <span className="line-clamp-1">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </Link>
            <Link href="/productos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Productos
            </Link>
            <Link href="/paquetes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Paquetes
            </Link>
            <Link href="/ofertas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Ofertas
            </Link>
            <Link href="/contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={handleSearchIconClick}
              aria-label="Buscar productos"
            >
              <Search className="h-5 w-5 text-foreground" />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <ThemeSwitcher />
            </div>
            <Link href="/carrito" className="relative p-2 hover:bg-secondary rounded-md transition-colors">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            {pathname !== "/" && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver
              </Link>
            )}
            <form onSubmit={handleSearch} className="relative mb-4">
              <div className="flex">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    ref={mobileSearchInputRef}
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-l-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 bg-primary text-primary-foreground text-sm font-medium rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  Buscar
                </button>
              </div>
              {searchSuggestions.length > 0 && (
                <ul className="mt-1 overflow-hidden rounded-md border border-border bg-background shadow-md">
                  {searchSuggestions.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/buscar?q=${encodeURIComponent(product.name)}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="line-clamp-1">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">Tema</span>
              <ThemeSwitcher />
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link href="/productos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Productos
              </Link>
              <Link href="/paquetes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Paquetes
              </Link>
              <Link href="/ofertas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ofertas
              </Link>
              <Link href="/contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
