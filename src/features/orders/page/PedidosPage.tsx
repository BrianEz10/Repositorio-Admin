import { useState, useCallback, useEffect } from 'react'
import { MOCK_ORDERS } from '@/features/orders/mocks/orders.mock'
import OrdersTable from '@/features/orders/components/OrdersTable'
import OrderDetailPanel from '@/features/orders/components/OrderDetailPanel'
import useAuthStore from '@/store/useAuthStore'
import type { Order } from '@/features/orders/types'

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // ─── Mock auth: auto-login como cajero si no hay sesión ───
  const token = useAuthStore((s) => s.token)
  const rol = useAuthStore((s) => s.rol)
  const login = useAuthStore((s) => s.login)

  useEffect(() => {
    if (!token) {
      login(
        { id: 1, nombre: 'Cajero Demo', email: 'cajero@midnight.dev' },
        'mock-jwt-token-dev',
        'cajero',
      )
    }
  }, [token, login])
  // ─── Fin mock auth ───

  const handleStatusChange = useCallback(
    (orderId: number, newStatus: Order['estado']) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, estado: newStatus, actualizadoEn: new Date().toISOString() }
            : o,
        ),
      )
      setSelectedOrder((prev) =>
        prev && prev.id === orderId
          ? { ...prev, estado: newStatus, actualizadoEn: new Date().toISOString() }
          : prev,
      )
    },
    [],
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-headline-lg text-on-surface font-bold">
            Panel de Pedidos
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Gestión de pedidos en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-label-sm text-on-surface-variant bg-surface-container-high px-3 py-1.5 border border-outline-variant/20">
            ROL: {rol?.toUpperCase()} · MOCK DATA · {orders.length} pedidos
          </span>
        </div>
      </div>

      {/* Tabla */}
      <OrdersTable
        data={orders}
        onSelectOrder={setSelectedOrder}
        selectedOrderId={selectedOrder?.id ?? null}
      />

      {/* Panel de detalle */}
      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
