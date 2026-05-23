export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagenUrl?: string
  activo: boolean
  categoriaId: number
}

export interface ProductFormData {
  nombre: string
  descripcion: string
  precio: number
  imagenUrl?: string
  activo: boolean
  categoriaId: number
}
