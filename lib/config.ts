export const WHATSAPP_COMPANY_PHONE = "5491154864458"
export const WHATSAPP_BASE_URL = "https://api.whatsapp.com/send/"
export const MAX_CART_ITEM_QUANTITY = 10

// Contact information
export const COMPANY_EMAIL = "yalotenes.ar@gmail.com"
export const COMPANY_PHONE = "+54 9 1154864458"
export const COMPANY_ADDRESS = "Av. Corrientes 2100, Ciudad Autónoma de Buenos Aires, Argentina"
export const COMPANY_HOURS = {
  weekdays: "Lunes a Viernes: 9:00 - 18:00",
  saturday: "Sábados: 10:00 - 14:00"
}

// Email configuration
export const EMAIL_USER = process.env.EMAIL_USER || ''
export const EMAIL_PASS = process.env.EMAIL_PASS || ''
export const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com'
export const EMAIL_PORT = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 465
export const EMAIL_SECURE = process.env.EMAIL_SECURE ? process.env.EMAIL_SECURE === 'true' : true
export const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER
