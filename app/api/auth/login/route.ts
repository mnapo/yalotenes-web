import { generateToken } from '@/lib/jwt-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Validar la contraseña contra la variable de entorno
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD no configurada en .env')
      return NextResponse.json(
        { error: 'Server not properly configured' },
        { status: 500 }
      )
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generar token JWT
    const token = generateToken()

    return NextResponse.json({
      success: true,
      token,
      message: 'Token válido por 24 horas',
    })
  } catch (error) {
    console.error('Error in login:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
