import { useRef } from "react"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { OffersCarousel } from "@/components/offers-carousel"
import { PackageCarousel } from "@/components/package-carousel"
import { RecentProducts } from "@/components/recent-products"

export default function Home() {

  const productsRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8">
        <Hero 
          onProductsClick={scrollToProducts}
          onPackagesClick={scrollToPackages}
        />
        <OffersCarousel />
        <div ref={packagesRef}><PackageCarousel /></div>
        <div ref={productsRef}><RecentProducts /></div>
      </main>
    </div>
  )
}
