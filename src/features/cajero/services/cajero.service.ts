import api from '@/lib/axios'
import { toCamelCaseProduct, type CajeroProduct, type FormaPago, type PedidoCreatePayload, type PedidoOut } from '@/features/cajero/types'
export const getProducts = async (): Promise<CajeroProduct[]> => {
  const { data } = await api.get<any[]>('/productos/', {
    params: { disponible: true, limit: 100 },
  })
  return data.map(toCamelCaseProduct)
}
export const getFormasPago = async (): Promise<FormaPago[]> => {
  const { data } = await api.get<FormaPago[]>('/formas-pago/')
  return data.filter((fp) => fp.habilitado)
}
export const createPedido = async (payload: PedidoCreatePayload): Promise<PedidoOut> => {
  const { data } = await api.post<PedidoOut>('/pedidos/', payload)
  return data
}
export const getRecentOrders = async (): Promise<PedidoOut[]> => {
  const { data } = await api.get<PedidoOut[]>('/pedidos/')
  return data.slice(0, 10)
}