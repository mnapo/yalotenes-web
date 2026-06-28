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
    const data = await readDataFile('packages')
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
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
    if (!body.packages || !Array.isArray(body.packages)) {
      return NextResponse.json(
        { error: 'Invalid data structure. Expected { packages: [...] }' },
        { status: 400 }
      )
    }

    // Validar que cada paquete tenga campos requeridos
    for (const pkg of body.packages) {
      if (
        !pkg.id ||
        !pkg.slug ||
        !pkg.name ||
        !pkg.description ||
        !pkg.productIds ||
        pkg.discountPercentage === undefined ||
        !pkg.categories
      ) {
        return NextResponse.json(
          {
            error:
              'Each package must have: id, slug, name, description, productIds, discountPercentage, categories',
          },
          { status: 400 }
        )
      }
    }

    await writeDataFile('packages', body)
    return NextResponse.json({ success: true, message: 'Packages updated' })
  } catch (error) {
    console.error('Error updating packages:', error)
    return NextResponse.json(
      { error: 'Failed to update packages' },
      { status: 500 }
    )
  }
}
