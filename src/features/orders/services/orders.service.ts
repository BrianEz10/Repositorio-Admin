import api from '@/lib/axios'
import type { Order, OrderStatus } from '@/features/orders/types'

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await api.get<Order[]>('/orders')
  return data
}

export const getOrderById = async (id: number): Promise<Order> => {
  const { data } = await api.get<Order>(`/orders/${id}`)
  return data
}

export const updateOrderStatus = async (id: number, estado: OrderStatus): Promise<Order> => {
  const { data } = await api.patch<Order>(`/orders/${id}/status`, { estado })
  return data
}
