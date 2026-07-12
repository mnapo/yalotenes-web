import Link from "next/link"
import { Header } from "@/components/header"
import { WelcomeSection } from "@/components/welcome-section"
import { OffersCarousel } from "@/components/offers-carousel"
import { PackageCarousel } from "@/components/package-carousel"
import { InfoCarousel } from "@/components/info-carousel"
import { RecentProducts } from "@/components/recent-products"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8">
        <WelcomeSection />
        <InfoCarousel />
        <OffersCarousel />
        <PackageCarousel />
        <RecentProducts />
      </main>
    </div>
  )
}
