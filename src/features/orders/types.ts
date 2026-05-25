export const ORDER_STATUSES = [
  'pendiente',
  'en_preparacion',
  'listo',
  'entregado',
  'cancelado',
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

/** Flujo secuencial permitido (sin cancelado, ese es lateral) */
export const STATUS_FLOW: OrderStatus[] = [
  'pendiente',
  'en_preparacion',
  'listo',
  'entregado',
]

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pendiente: 'Pendiente',
  en_preparacion: 'En Preparación',
  listo: 'Listo',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

export const STATUS_ICONS: Record<OrderStatus, string> = {
  pendiente: 'schedule',
  en_preparacion: 'outdoor_grill',
  listo: 'moped',
  entregado: 'check_circle',
  cancelado: 'cancel',
}

export interface OrderItem {
  productoId: number
  nombre: string
  cantidad: number
  precio: number
}

export interface Order {
  id: number
  cliente: string
  estado: OrderStatus
  formaPago: string
  items: OrderItem[]
  subtotal: number
  descuento: number
  costoEnvio: number
  total: number
  notas: string | null
  creadoEn: string
  actualizadoEn: string
}
