import api from '@/lib/axios'
import type { LoginRequest, LoginResponse } from '@/features/auth/types'

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials)
  return data
}