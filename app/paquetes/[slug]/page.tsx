import { Header } from "@/components/header"
import { SectionTitle } from "@/components/section-title"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { packageOffers } from "@/data/packages"
import { allProducts } from "@/data/products"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface PackagePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return packageOffers.map((pack) => ({
    slug: pack.slug,
  }))
}

export async function generateMetadata({ params }: PackagePageProps) {
  const resolvedParams = await params
  const pack = packageOffers.find((p) => p.slug === resolvedParams.slug)

  if (!pack) {
    return {
      title: "Paquete no encontrado",
    }
  }

  return {
    title: `${pack.name} - YaLoTenés`,
    description: pack.description,
  }
}

export default async function PackagePage({ params }: PackagePageProps) {
  const resolvedParams = await params
  
  const pack = packageOffers.find((p) => p.slug === resolvedParams.slug)
  
  if (!pack) {
    notFound()
  }

  const products = pack.productIds
    .map((productId) => allProducts.find((product) => product.id === productId))
    .filter(Boolean) as typeof allProducts

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0)
  const discount = pack.discountPercentage
  const discountedPrice = Math.round(totalPrice * (100 - discount) / 100)
  const savings = totalPrice - discountedPrice

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {pack.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {pack.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {pack.categories.map((category) => (
                <Badge key={category.label} variant="outline" className="gap-2">
                  <span>{category.emoji}</span>
                  {category.label}
                </Badge>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-2xl text-muted-foreground line-through">
                    ${new Intl.NumberFormat("es-CL").format(totalPrice)}
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    -{discount}%
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Precio total del paquete</p>
                  <p className="text-4xl font-bold text-foreground">
                    ${new Intl.NumberFormat("es-CL").format(discountedPrice)}
                  </p>
                </div>
                <p className="text-lg font-semibold text-emerald-600">
                  Ahorrás ${new Intl.NumberFormat("es-CL").format(savings)}
                </p>
              </div>
            </div>
          </div>

          <SectionTitle title="Productos incluidos" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.category}
                hideAddToCart
              />
            ))}
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">
              📹 Próximamente: Video de YouTube con más detalles sobre este paquete
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
