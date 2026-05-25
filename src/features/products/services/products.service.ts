import api from '@/lib/axios'
import type { Product, ProductFormData } from '@/features/products/types'

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

export const createProduct = async (payload: ProductFormData): Promise<Product> => {
  const { data } = await api.post<Product>('/products', payload)
  return data
}

export const updateProduct = async (
  id: number,
  payload: Partial<ProductFormData>,
): Promise<Product> => {
  const { data } = await api.put<Product>(`/products/${id}`, payload)
  return data
}

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`)
}

export const toggleProductDisponible = async (
  id: number,
  disponible: boolean,
): Promise<Product> => {
  const { data } = await api.patch<Product>(`/products/${id}/disponible`, { disponible })
  return data
}
