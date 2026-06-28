import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { SectionTitle } from "@/components/section-title"
import { offerProducts } from "@/data/products"

export default function OfertasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8">
        <SectionTitle title="Ofertas" />
        <p className="text-muted-foreground mb-8">
          Aprovecha nuestras mejores ofertas y descuentos exclusivos.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {offerProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} priority={index < 4} />
          ))}
        </div>
      </main>
    </div>
  )
}
