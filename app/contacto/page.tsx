"use client"

import { Header } from "@/components/header"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_HOURS } from "@/lib/config"

const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`${COMPANY_ADDRESS}`)}&output=embed`

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">Contacto</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-foreground">¿Dónde estamos?</h2>
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <iframe
                src={mapUrl}
                title="Mapa de ubicación"
                className="w-full h-96 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-medium text-foreground">Información de contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{COMPANY_EMAIL}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Teléfono</p>
                  <p className="text-sm text-muted-foreground">{COMPANY_PHONE}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Dirección</p>
                  <p className="text-sm text-muted-foreground">{COMPANY_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Horario</p>
                  <p className="text-sm text-muted-foreground">{COMPANY_HOURS.weekdays}</p>
                  <p className="text-sm text-muted-foreground">{COMPANY_HOURS.saturday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
