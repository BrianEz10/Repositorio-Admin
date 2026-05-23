import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '@/features/orders/services/orders.service'
import type { OrderStatus } from '@/features/orders/types'

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

export const useOrder = (id: number) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderById(id),
  })

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: OrderStatus }) =>
      updateOrderStatus(id, estado),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
