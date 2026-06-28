import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  COMPANY_EMAIL,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_FROM
} from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_HOST || !EMAIL_PORT) {
      console.error('Error de configuración de email: faltan parámetros SMTP', {
        EMAIL_USER,
        EMAIL_HOST,
        EMAIL_PORT
      })
      return NextResponse.json(
        { error: 'Error de configuración de email' },
        { status: 500 }
      )
    }

    // Configurar el transporter SMTP
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_SECURE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verificar la conexión
    try {
      await transporter.verify()
    } catch (error) {
      console.error('Error al verificar conexión con Gmail:', error)
      return NextResponse.json(
        { error: 'Error de configuración de email' },
        { status: 500 }
      )
    }

    // Configurar el email
    const mailOptions = {
      from: `"YaLoTenés" <${EMAIL_FROM}>`,
      to: COMPANY_EMAIL,
      subject: 'Nuevo mensaje desde el formulario de contacto - YaLoTenés',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">Mensaje:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de YaLoTenés.</p>
          </div>
        </div>
      `,
      replyTo: email
    }

    // Enviar el email
    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Email enviado exitosamente:', {
      messageId: info.messageId,
      from: `${name} <${email}>`,
      to: COMPANY_EMAIL,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado exitosamente'
    })

  } catch (error) {
    console.error('❌ Error al enviar email:', error)

    // Determinar el tipo de error para dar una respuesta apropiada
    let errorMessage = 'Error interno del servidor'

    if (error instanceof Error) {
      if (error.message.includes('Authentication failed')) {
        errorMessage = 'Error de autenticación con el servidor de email'
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'No se pudo conectar al servidor de email'
      } else if (error.message.includes('Invalid login')) {
        errorMessage = 'Credenciales de email inválidas'
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}