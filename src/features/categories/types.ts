export interface Category {
  id: number
  parent_id: number | null
  nombre: string
  descripcion?: string
  icono: string
  activo: boolean
  orden_display: number
  subcategorias?: Category[]
}

export interface CategoryFormData {
  parent_id: number | null
  nombre: string
  descripcion?: string
  icono: string
  activo: boolean
}