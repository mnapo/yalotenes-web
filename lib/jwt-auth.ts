import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro-cambiar-en-produccion'

export interface JWTPayload {
  role: 'admin'
  iat?: number
  exp?: number
}

/**
 * Genera un token JWT válido por 24 horas
 */
export function generateToken(): string {
  const token = jwt.sign(
    {
      role: 'admin',
    } as JWTPayload,
    JWT_SECRET,
    {
      expiresIn: '24h',
    }
  )
  return token
}

/**
 * Valida un token JWT y retorna el payload si es válido
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Extrae el token del header Authorization
 */
export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null
  
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null
  }
  
  return parts[1]
}
