export interface ProductCategory {
  categoriaId: number
  categoriaNombre: string
  esPrincipal: boolean
}

export interface ProductIngredient {
  ingredienteId: number
  ingredienteNombre: string
  esAlergeno: boolean
  esRemovible: boolean
  esOpcional: boolean
}

export interface Product {
  id: number
  nombre: string
  descripcion: string
  precioBase: number
  imagenesUrl: string[]
  tiempoPrepMin: number | null
  disponible: boolean
  categorias: ProductCategory[]
  ingredientes: ProductIngredient[]
}

export interface ProductFormData {
  nombre: string
  descripcion: string
  precioBase: number
  imagenesUrl: string[]
  tiempoPrepMin: number | null
  disponible: boolean
  categoriaIds: number[]
  ingredienteIds: number[]
}
