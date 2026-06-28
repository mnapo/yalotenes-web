import { Header } from "@/components/header"
import { SectionTitle } from "@/components/section-title"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/data/products"

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 md:px-8 lg:px-16 py-8">
        <SectionTitle title="Todos los productos" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
