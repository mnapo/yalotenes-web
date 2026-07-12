import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { SectionTitle } from "@/components/section-title"
import { searchProducts } from "@/data/products"
import { Search } from "lucide-react"
import Link from "next/link"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""
  const results = query ? searchProducts(query) : []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8">
        <SectionTitle title={query ? `Resultados para "${query}"` : "Buscar productos"} />
        
        {query && results.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            {results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </p>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium text-foreground mb-2">
              No encontramos resultados para &quot;{query}&quot;
            </h2>
            <p className="text-muted-foreground mb-6">
              Intenta con otros términos o explora nuestras categorías
            </p>
            <Link
              href="/productos"
              className="inline-block text-sm text-primary hover:text-primary/80 border border-primary px-6 py-2 rounded-md transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        )}

        {!query && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium text-foreground mb-2">
              Busca productos en nuestra tienda
            </h2>
            <p className="text-muted-foreground mb-6">
              Usa la barra de búsqueda en el header para encontrar lo que necesitas
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
