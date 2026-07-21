"use client"

import { useRef } from "react"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { OffersCarousel } from "@/components/offers-carousel"
import { PackageCarousel } from "@/components/package-carousel"
import { RecentProducts } from "@/components/recent-products"

import { motion } from "motion/react"

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
        <motion.div layout>
          <OffersCarousel />
        </motion.div>

        <motion.div layout ref={packagesRef}>
          <PackageCarousel />
        </motion.div>

        <motion.div layout ref={productsRef}>
          <RecentProducts />
        </motion.div>
      </main>
    </div>
  )
}
