import { writeDataFile, readDataFile } from '@/lib/data-manager'
import { verifyToken, getTokenFromHeader } from '@/lib/jwt-auth'
import { NextRequest, NextResponse } from 'next/server'

function validateAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = getTokenFromHeader(authHeader)

  if (!token) {
    return { valid: false, error: 'Missing authorization token' }
  }

  const payload = verifyToken(token)
  if (!payload) {
    return { valid: false, error: 'Invalid or expired token' }
  }

  return { valid: true }
}

export async function GET(request: NextRequest) {
  const auth = validateAuth(request)
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error },
      { status: 401 }
    )
  }

  try {
    const data = await readDataFile('products')
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const auth = validateAuth(request)
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error },
      { status: 401 }
    )
  }
  try {
    const body = await request.json()

    // Validar estructura básica
    if (!body.products || !Array.isArray(body.products)) {
      return NextResponse.json(
        { error: 'Invalid data structure. Expected { products: [...] }' },
        { status: 400 }
      )
    }

    // Validar que cada producto tenga campos requeridos
    for (const product of body.products) {
      if (!product.id || !product.name || !product.price || !product.image || !product.category) {
        return NextResponse.json(
          { error: 'Each product must have: id, name, price, image, category' },
          { status: 400 }
        )
      }
    }

    await writeDataFile('products', body)
    return NextResponse.json({ success: true, message: 'Products updated' })
  } catch (error) {
    console.error('Error updating products:', error)
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    )
  }
}
