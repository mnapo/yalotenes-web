/**
 * Ejemplos de uso de las APIs de datos
 * Estos ejemplos muestran cómo:
 * 1. Autenticarse con JWT
 * 2. Obtener datos actuales
 * 3. Modificar datos
 * 4. Enviar los cambios al servidor
 */

// ============================================
// EJEMPLO 0: Obtener Token JWT
// ============================================

async function getJWTToken(password: string): Promise<string | null> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      console.error('Invalid credentials')
      return null
    }

    const data = await response.json()
    console.log('Token obtenido, válido por 24 horas')
    return data.token
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}

// ============================================
// EJEMPLO 1: Obtener productos actuales (autenticado)
// ============================================

async function getProducts(token: string) {
  try {
    const response = await fetch('/api/admin/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    console.log('Productos actuales:', data.products)
    return data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// ============================================
// EJEMPLO 2: Agregar un nuevo producto
// ============================================

async function addProduct(
  token: string,
  newProduct: {
    id: number
    name: string
    price: number
    image: string
    category: string
    originalPrice?: number
    discount?: number
  }
) {
  try {
    // Obtener datos actuales
    const response = await fetch('/api/admin/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    const products = data.products

    // Agregar el nuevo producto
    products.push(newProduct)

    // Enviar datos actualizados
    const updateResponse = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    })

    const result = await updateResponse.json()
    console.log('Producto agregado:', result)
    return result
  } catch (error) {
    console.error('Error adding product:', error)
  }
}

// ============================================
// EJEMPLO 3: Modificar un producto existente
// ============================================

async function updateProduct(
  token: string,
  productId: number,
  updates: { name?: string; price?: number; discount?: number }
) {
  try {
    // Obtener datos actuales
    const response = await fetch('/api/admin/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    const products = data.products

    // Buscar y modificar el producto
    const product = products.find((p: any) => p.id === productId)
    if (!product) {
      console.error(`Producto ${productId} no encontrado`)
      return
    }

    Object.assign(product, updates)

    // Enviar datos actualizados
    const updateResponse = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    })

    const result = await updateResponse.json()
    console.log('Producto actualizado:', result)
    return result
  } catch (error) {
    console.error('Error updating product:', error)
  }
}

// ============================================
// EJEMPLO 4: Eliminar un producto
// ============================================

async function deleteProduct(token: string, productId: number) {
  try {
    // Obtener datos actuales
    const response = await fetch('/api/admin/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    let products = data.products

    // Filtrar el producto a eliminar
    products = products.filter((p: any) => p.id !== productId)

    // Enviar datos actualizados
    const updateResponse = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    })

    const result = await updateResponse.json()
    console.log('Producto eliminado:', result)
    return result
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

// ============================================
// EJEMPLO 5: Obtener paquetes actuales
// ============================================

async function getPackages(token: string) {
  try {
    const response = await fetch('/api/admin/packages', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    console.log('Paquetes actuales:', data.packages)
    return data.packages
  } catch (error) {
    console.error('Error fetching packages:', error)
  }
}

// ============================================
// EJEMPLO 6: Agregar nuevo paquete
// ============================================

async function addPackage(
  token: string,
  newPackage: {
    id: number
    slug: string
    name: string
    description: string
    productIds: number[]
    discountPercentage: number
    categories: Array<{ emoji: string; label: string }>
  }
) {
  try {
    // Obtener datos actuales
    const response = await fetch('/api/admin/packages', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    const packages = data.packages

    // Agregar el nuevo paquete
    packages.push(newPackage)

    // Enviar datos actualizados
    const updateResponse = await fetch('/api/admin/packages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ packages }),
    })

    const result = await updateResponse.json()
    console.log('Paquete agregado:', result)
    return result
  } catch (error) {
    console.error('Error adding package:', error)
  }
}

// ============================================
// EJEMPLO 7: Modificar descuento de paquete
// ============================================

async function updatePackageDiscount(
  token: string,
  packageId: number,
  newDiscount: number
) {
  try {
    // Obtener datos actuales
    const response = await fetch('/api/admin/packages', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.error('Unauthorized or invalid token')
      return null
    }

    const data = await response.json()
    const packages = data.packages

    // Buscar y modificar el paquete
    const pkg = packages.find((p: any) => p.id === packageId)
    if (!pkg) {
      console.error(`Paquete ${packageId} no encontrado`)
      return
    }

    pkg.discountPercentage = newDiscount

    // Enviar datos actualizados
    const updateResponse = await fetch('/api/admin/packages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ packages }),
    })

    const result = await updateResponse.json()
    console.log('Paquete actualizado:', result)
    return result
  } catch (error) {
    console.error('Error updating package:', error)
  }
}

// ============================================
// EJEMPLO 8: React Hook para sincronizar datos
// ============================================

/*
import { useEffect, useState } from 'react'

interface UseProductsProps {
  token: string
}

function useProducts({ token }: UseProductsProps) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Unauthorized or invalid token')
      }
      
      const data = await response.json()
      setProducts(data.products)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshProducts()
  }, [token])

  return { products, loading, error, refreshProducts }
}

// Uso en componente:
// const { products, loading, error, refreshProducts } = useProducts({ token })
*/

// ============================================
// CÓMO USAR ESTOS EJEMPLOS
// ============================================

/*
1. Obtener un token JWT primero:
   const token = await getJWTToken('tu-contraseña-segura-aqui')
   
   Si es null, la contraseña es incorrecta.

2. Usar el token en todas las llamadas:
   const products = await getProducts(token)
   await updateProduct(token, 1, { price: 99990 })
   await addProduct(token, { ... })

3. El token expira en 24 horas, luego deberás obtener uno nuevo.

4. Ver DATA_MANAGEMENT.md para documentación completa.
*/

export {
  getJWTToken,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getPackages,
  addPackage,
  updatePackageDiscount,
}
