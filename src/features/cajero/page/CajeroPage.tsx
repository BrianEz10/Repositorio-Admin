import { useState } from 'react'
import {
  useCajeroProducts,
  useFormasPago,
  useCreatePedido,
  useCart,
} from '@/features/cajero/hooks/useCajero'
import ProductGrid from '@/features/cajero/components/Productgrid'
import CartPanel from '@/features/cajero/components/CartPanel'
import OrderSuccessModal from '@/features/cajero/components/OrderSuccessModal'
import type { PedidoOut } from '@/features/cajero/types'
export default function CajeroPage() {
  const { data: products, isLoading, isError, refetch } = useCajeroProducts()
  const { data: formasPago } = useFormasPago()
  const { mutateAsync: createPedido, isPending } = useCreatePedido()
  const cart = useCart()
  const [selectedPago, setSelectedPago] = useState('')
  const [successPedido, setSuccessPedido] = useState<PedidoOut | null>(null)
  const handleCreateOrder = async () => {
    if (cart.isEmpty || !selectedPago) return
    try {
      const pedido = await createPedido({
        forma_pago_codigo: selectedPago,
        notas: null,
        items: cart.items.map((i) => ({
          producto_id: i.id,
          cantidad: i.cantidad,
          personalizacion: null,
        })),
      })
      setSuccessPedido(pedido)
      cart.clearCart()
      setSelectedPago('')
    } catch {
      // error handled by React Query
    }
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-on-surface-variant">Cargando productos...</p>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <span className="material-symbols-outlined text-[48px] text-error opacity-60">cloud_off</span>
        <p className="text-body-md text-on-surface-variant">Error al cargar productos</p>
        <button onClick={() => void refetch()} className="px-4 py-2 bg-primary text-on-primary text-label-md font-bold hover:brightness-110 transition-all cursor-pointer">Reintentar</button>
      </div>
    )
  }
  return (
    <div className="flex gap-0 h-[calc(100vh-7rem)]">
      <ProductGrid products={products ?? []} onAddProduct={cart.addItem} />
      <CartPanel
        items={cart.items}
        formasPago={formasPago ?? []}
        selectedPago={selectedPago}
        onSelectPago={setSelectedPago}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        subtotal={cart.subtotal}
        isEmpty={cart.isEmpty}
        isSubmitting={isPending}
        onCreateOrder={handleCreateOrder}
      />
      {successPedido && (
        <OrderSuccessModal pedido={successPedido} onClose={() => setSuccessPedido(null)} />
      )}
    </div>
  )
}