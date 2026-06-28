import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-12">
      <div className="px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">
          YaLoTenés 2026. Todos los derechos reservados.
        </p>
        <nav className="flex gap-6">
          <Link href="/politicas" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            Nuestras Políticas
          </Link>
          <Link href="/privacidad" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            Privacidad
          </Link>
          <Link href="/contacto" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  )
}
