import api from '@/lib/axios'
import type { AdminUser, AdminUserUpdate, Rol } from '@/features/admin-users/types'
export const getUsers = async (params?: { offset?: number; limit?: number; rol?: string }): Promise<AdminUser[]> => {
  const { data } = await api.get<AdminUser[]>('/admin/usuarios', { params })
  return data
}
export const getUserById = async (id: number): Promise<AdminUser> => {
  const { data } = await api.get<AdminUser>(`/admin/usuarios/${id}`)
  return data
}
export const updateUser = async (id: number, payload: AdminUserUpdate): Promise<AdminUser> => {
  const { data } = await api.patch<AdminUser>(`/admin/usuarios/${id}`, payload)
  return data
}
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/admin/usuarios/${id}`)
}
export const assignRoles = async (id: number, roles: string[]): Promise<AdminUser> => {
  const { data } = await api.patch<AdminUser>(`/admin/usuarios/${id}/roles`, { roles })
  return data
}
export const getRoles = async (): Promise<Rol[]> => {
  const { data } = await api.get<Rol[]>('/roles/')
  return data
}