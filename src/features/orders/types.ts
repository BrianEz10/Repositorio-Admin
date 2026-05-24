export type OrderStatus =
  | 'pendiente'
  | 'en_preparacion'
  | 'listo'
  | 'entregado'
  | 'cancelado'

export interface OrderItem {
  productoId: number
  nombre: string
  cantidad: number
  precio: number
}

export interface Order {
  id: number
  estado: OrderStatus
  items: OrderItem[]
  total: number
  creadoEn: string
}
