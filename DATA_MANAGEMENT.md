# Guía de Edición Dinámica de Datos

## Descripción General

Todos los datos de productos, ofertas y paquetes se cargan desde archivos JSON centralizados:
- `data/products.json` - Productos y ofertas
- `data/packages.json` - Paquetes/combos

Esto permite editar la información **sin modificar código**, facilitando actualizaciones futuras con base de datos.

## Estructura de Datos

### Productos (`data/products.json`)

```json
{
  "products": [
    {
      "id": 1,
      "name": "Auriculares Bluetooth Pro",
      "price": 89990,
      "originalPrice": 129990,
      "image": "https://images.unsplash.com/...",
      "category": "Audio",
      "discount": 30
    }
  ]
}
```

**Campos Obligatorios:**
- `id`: Número único (usado como clave primaria)
- `name`: Nombre del producto
- `price`: Precio actual en pesos
- `image`: URL de la imagen (preferiblemente de Unsplash o similar)
- `category`: Categoría para filtros

**Campos Opcionales:**
- `originalPrice`: Precio antes del descuento (si no existe, no se muestra el tachado)
- `discount`: Porcentaje de descuento (si existe, aparece en "Ofertas", sino en "Productos Recientes")

### Paquetes (`data/packages.json`)

```json
{
  "packages": [
    {
      "id": 1001,
      "slug": "bazar",
      "name": "Paquete Bazar",
      "description": "Incluye todo lo necesario para tu comedor y cocina",
      "productIds": [19, 20, 21],
      "discountPercentage": 15,
      "categories": [
        { "emoji": "🍴", "label": "Cubiertos" },
        { "emoji": "🍽️", "label": "Vajilla" }
      ]
    }
  ]
}
```

**Campos Obligatorios:**
- `id`: Número único (recomendado usar 1000+)
- `slug`: Identificador URL único (sin espacios, minúsculas, ej: "bazar", "festejo")
- `name`: Nombre del paquete
- `description`: Descripción breve
- `productIds`: Array de IDs de productos incluidos
- `discountPercentage`: Porcentaje de descuento
- `categories`: Array de categorías con emoji y etiqueta

## Autenticación

### Configuración Inicial

1. **Edita `.env.local`:**
```
ADMIN_PASSWORD=tu-contraseña-segura-aqui
JWT_SECRET=tu-secreto-jwt-muy-seguro-cambiar-en-produccion
```

2. **Genera un JWT_SECRET seguro:**
```bash
openssl rand -base64 32
```

### Flujo de Autenticación

1. **Obtener token** → POST a `/api/auth/login` con contraseña
2. **Usar token** → Incluir en header `Authorization: Bearer <token>`
3. **Token expira** → Cada 24 horas (revalidar)

## Cómo Editar Datos

### Opción 1: Edición Manual de JSON

1. Abre `data/products.json` o `data/packages.json` en tu editor de código
2. Edita los valores directamente
3. El cambio se refleja automáticamente en la aplicación

**Ventajas:**
- Rápido y sencillo
- No requiere infraestructura adicional

**Desventajas:**
- Requiere acceso al servidor
- Manualmente propenso a errores

### Opción 2: APIs de Administración (Autenticadas)

Se incluyen rutas API protegidas con JWT para editar datos programáticamente:

#### Obtener Token JWT
```bash
POST /api/auth/login
Content-Type: application/json

{
  "password": "tu-contraseña-segura-aqui"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Token válido por 24 horas"
}
```

**Respuesta error (401):**
```json
{
  "error": "Invalid credentials"
}
```

#### Obtener productos
```bash
GET /api/admin/products
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "products": [...]
}
```

#### Actualizar productos
```bash
POST /api/admin/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "products": [
    {
      "id": 1,
      "name": "Auriculares Bluetooth Pro",
      "price": 89990,
      "originalPrice": 129990,
      "image": "https://...",
      "category": "Audio",
      "discount": 30
    }
  ]
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Products updated"
}
```

#### Obtener paquetes
```bash
GET /api/admin/packages
Authorization: Bearer <token>
```

#### Actualizar paquetes
```bash
POST /api/admin/packages
Authorization: Bearer <token>
Content-Type: application/json

{
  "packages": [...]
}
```

#### Obtener productos
```bash
GET /api/admin/products
```

**Respuesta:**
```json
{
  "products": [...]
}
```

#### Actualizar productos
```bash
POST /api/admin/products
Content-Type: application/json

{
  "products": [
    {
      "id": 1,
      "name": "Auriculares Bluetooth Pro",
      "price": 89990,
      "originalPrice": 129990,
      "image": "https://...",
      "category": "Audio",
      "discount": 30
    }
  ]
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Products updated"
}
```

#### Obtener paquetes
```bash
GET /api/admin/packages
```

#### Actualizar paquetes
```bash
POST /api/admin/packages
Content-Type: application/json

{
  "packages": [...]
}
```

### Opción 3: Interfaz de Administración Futura

Se puede desarrollar una interfaz web para editar los datos sin tocar JSON. Usaría las APIs anteriores.

## Validaciones Implementadas

- ✅ Estructura básica del JSON
- ✅ Campos obligatorios
- ❌ Unicidad de IDs (pendiente)
- ❌ Referencias válidas en paquetes (verificar que productIds existan)
- ❌ Validación de URLs de imágenes
- ❌ Rangos de precios y descuentos

## Cómo Funcionan los Datos en Componentes

### En la Home (`app/page.tsx`)

1. **Ofertas** → Componentes con `discount` definido
   - Mostrados en: `<OffersCarousel />`
   - Datos desde: `offerProducts` en `data/products.ts`

2. **Productos Recientes** → Componentes sin `discount`
   - Mostrados en: `<RecentProducts />`
   - Datos desde: `recentProducts` en `data/products.ts`

3. **Paquetes** → Combinaciones de productos
   - Mostrados en: `<PackageCarousel />`
   - Datos desde: `packageOffers` en `data/packages.ts`

### Flujo de Carga

```
data/products.json
        ↓
data/products.ts (importa JSON)
        ↓
Componentes (usan allProducts, offerProducts, recentProducts)
```

## Próximos Pasos

1. **Validación mejorada**: Agregar validaciones de integridad
2. **Interfaz de admin**: Crear panel para editar datos sin JSON
3. **Base de datos**: Migrar archivos JSON a tabla PostgreSQL/MySQL
4. **Caché**: Implementar estrategia de caché para performance
5. **Historial**: Guardar versiones previas de datos

## Archivo de Ayuda Técnica

Ver `lib/data-manager.ts` para funciones de lectura/escritura de datos.
