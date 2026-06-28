import packagesData from './packages.json'

export interface PackageCategory {
  emoji: string
  label: string
}

export interface PackageOffer {
  id: number
  slug: string
  name: string
  description: string
  productIds: number[]
  categories: PackageCategory[]
  discountPercentage: number
}

export const packageOffers: PackageOffer[] = packagesData.packages
