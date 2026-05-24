import api from '@/lib/axios'
import type { Category, CategoryFormData } from '@/features/categories/types'

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>('/categories')
  return data
}

export const getCategoryById = async (id: number): Promise<Category> => {
  const { data } = await api.get<Category>(`/categories/${id}`)
  return data
}

export const createCategory = async (payload: CategoryFormData): Promise<Category> => {
  const { data } = await api.post<Category>('/categories', payload)
  return data
}

export const updateCategory = async (
  id: number,
  payload: Partial<CategoryFormData>,
): Promise<Category> => {
  const { data } = await api.put<Category>(`/categories/${id}`, payload)
  return data
}

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`)
}
