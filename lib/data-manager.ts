import fs from 'fs/promises'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

export interface DataFile {
  type: 'products' | 'packages'
  path: string
}

const dataFiles: Record<string, DataFile> = {
  products: {
    type: 'products',
    path: path.join(dataDir, 'products.json'),
  },
  packages: {
    type: 'packages',
    path: path.join(dataDir, 'packages.json'),
  },
}

/**
 * Lee un archivo JSON del directorio de datos
 */
export async function readDataFile<T = unknown>(
  fileType: keyof typeof dataFiles
): Promise<T> {
  try {
    const fileConfig = dataFiles[fileType]
    const content = await fs.readFile(fileConfig.path, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Error reading ${fileType} data:`, error)
    throw new Error(`Failed to read ${fileType} data`)
  }
}

/**
 * Escribe un archivo JSON en el directorio de datos
 */
export async function writeDataFile<T = unknown>(
  fileType: keyof typeof dataFiles,
  data: T
): Promise<void> {
  try {
    const fileConfig = dataFiles[fileType]
    const content = JSON.stringify(data, null, 2)
    await fs.writeFile(fileConfig.path, content, 'utf-8')
  } catch (error) {
    console.error(`Error writing ${fileType} data:`, error)
    throw new Error(`Failed to write ${fileType} data`)
  }
}

/**
 * Lee todos los archivos de datos
 */
export async function readAllData() {
  const [products, packages] = await Promise.all([
    readDataFile('products'),
    readDataFile('packages'),
  ])

  return {
    products,
    packages,
  }
}
