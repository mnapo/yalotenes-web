import productsData from './products.json'

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  discount?: number
}

export const allProducts: Product[] = productsData.products

export const offerProducts = allProducts.filter(p => p.discount)
export const recentProducts = allProducts.filter(p => !p.discount)

export const categories = [...new Set(allProducts.map(p => p.category))]

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return []
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}
