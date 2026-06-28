import Link from "next/link"
import { ProductCard } from "./product-card"
import { SectionTitle } from "./section-title"
import { recentProducts } from "@/data/products"

const maxHomeProducts = 8

export function RecentProducts() {
  const visibleProducts = recentProducts.slice(0, maxHomeProducts)

  return (
    <section>
      <SectionTitle title="Productos Recientes" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href="/productos"
          className="text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary px-6 py-2 rounded-md transition-colors"
        >
          Ver más
        </Link>
      </div>
    </section>
  )
}
