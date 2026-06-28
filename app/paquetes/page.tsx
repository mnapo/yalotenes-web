import { Header } from "@/components/header"
import { SectionTitle } from "@/components/section-title"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { packageOffers } from "@/data/packages"
import { allProducts } from "@/data/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PaquetesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 md:px-8 lg:px-16 py-8">
        <SectionTitle title="Nuestros Paquetes" />
        
        <div className="max-w-6xl mx-auto">
          <p className="text-lg text-muted-foreground text-center mb-12">
            Descubrí nuestros paquetes especialmente diseñados para diferentes ocasiones y necesidades.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageOffers.map((pack) => {
              const products = pack.productIds
                .map((productId) => allProducts.find((product) => product.id === productId))
                .filter(Boolean) as typeof allProducts
              const totalPrice = products.reduce((sum, product) => sum + product.price, 0)
              const discountedPrice = Math.round(totalPrice * (100 - pack.discountPercentage) / 100)
              const savings = totalPrice - discountedPrice

              return (
                <Card key={pack.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow">
                    <div>
                      <p className="text-sm text-muted-foreground">Precio del paquete</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${new Intl.NumberFormat("es-CL").format(discountedPrice)}
                      </p>
                      <p className="text-sm text-emerald-600 font-semibold mt-1">
                        -{pack.discountPercentage}% de descuento
                      </p>
                      <p className="text-lg font-semibold text-emerald-600 mt-2">
                        Ahorras ${new Intl.NumberFormat("es-CL").format(savings)}
                      </p>
                    </div>
                    <p className="text-sm italic text-muted-foreground">
                      Incluye {products.length} productos
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pack.categories.map((category) => (
                        <Badge key={category.label} variant="outline" className="gap-2">
                          <span>{category.emoji}</span>
                          {category.label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Link
                      href={`/paquetes/${pack.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Ver detalles
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
