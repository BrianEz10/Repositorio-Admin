import api from '@/lib/axios'
import type { Product, ProductDetail, ProductFormData } from '@/features/products/types'

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}

function toSnakeCase(payload: ProductFormData) {
  return {
    nombre: payload.nombre,
    descripcion: payload.descripcion,
    precio_base: payload.precioBase,
    imagenes_url: payload.imagenesUrl,
    stock_cantidad: payload.stockCantidad,
    disponible: payload.disponible,
    unidad_venta_id: payload.unidadVentaId,
    categorias: payload.categorias.map((c) => ({
      categoria_id: c.categoriaId,
      es_principal: c.esPrincipal,
    })),
    ingredientes: payload.ingredientes.map((i) => ({
      ingrediente_id: i.ingredienteId,
      cantidad: i.cantidad,
      unidad_medida_id: i.unidadMedidaId,
      es_removible: i.esRemovible,
    })),
  }
}

function toCamelCase(data: any): Product {
  return {
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precioBase: data.precio_base,
    imagenesUrl: data.imagenes_url ?? [],
    stockCantidad: data.stock_cantidad,
    disponible: data.disponible,
    unidadVentaId: data.unidad_venta_id,
  }
}

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<PaginatedResponse<any>>('/productos/')
  return data.items.map(toCamelCase)
}

export const getProductById = async (id: number): Promise<ProductDetail> => {
  const { data } = await api.get<any>(`/productos/${id}`)
  return {
    ...toCamelCase(data),
    categorias: (data.categorias ?? []).map((c: any) => ({
      id: c.id,
      nombre: c.nombre,
      esPrincipal: c.es_principal ?? false,
    })),
    ingredientes: (data.ingredientes ?? []).map((i: any) => ({
      id: i.id,
      nombre: i.nombre,
      esAlergeno: i.es_alergeno ?? false,
      esRemovible: i.es_removible ?? false,
    })),
  }
}

export const createProduct = async (payload: ProductFormData): Promise<Product> => {
  const { data } = await api.post<any>('/productos/', toSnakeCase(payload))
  return toCamelCase(data)
}

function toSnakePartial(payload: Partial<ProductFormData>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  if (payload.nombre !== undefined) result.nombre = payload.nombre
  if (payload.descripcion !== undefined) result.descripcion = payload.descripcion
  if (payload.precioBase !== undefined) result.precio_base = payload.precioBase
  if (payload.imagenesUrl !== undefined) result.imagenes_url = payload.imagenesUrl
  if (payload.stockCantidad !== undefined) result.stock_cantidad = payload.stockCantidad
  if (payload.disponible !== undefined) result.disponible = payload.disponible
  if (payload.unidadVentaId !== undefined) result.unidad_venta_id = payload.unidadVentaId
  if (payload.categorias !== undefined) {
    result.categorias = payload.categorias.map((c) => ({
      categoria_id: c.categoriaId,
      es_principal: c.esPrincipal,
    }))
  }
  if (payload.ingredientes !== undefined) {
    result.ingredientes = payload.ingredientes.map((i) => ({
      ingrediente_id: i.ingredienteId,
      cantidad: i.cantidad,
      unidad_medida_id: i.unidadMedidaId,
      es_removible: i.esRemovible,
    }))
  }
  return result
}

export const updateProduct = async (
  id: number,
  payload: Partial<ProductFormData>,
): Promise<Product> => {
  const { data } = await api.put<any>(`/productos/${id}`, toSnakePartial(payload))
  return toCamelCase(data)
}

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/productos/${id}`)
}

export const toggleProductDisponible = async (
  id: number,
  disponible: boolean,
): Promise<Product> => {
  const { data } = await api.patch<any>(`/productos/${id}/disponibilidad`, { disponible })
  return toCamelCase(data)
}
