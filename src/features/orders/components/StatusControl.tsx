import useAuthStore from '@/store/useAuthStore'
import {
  STATUS_FLOW,
  STATUS_LABELS,
  STATUS_ICONS,
} from '@/features/orders/types'
import type { OrderStatus } from '@/features/orders/types'

interface StatusControlProps {
  orderId: number
  currentStatus: OrderStatus
  onStatusChange?: (orderId: number, newStatus: OrderStatus) => void
}

export default function StatusControl({
  orderId,
  currentStatus,
  onStatusChange,
}: StatusControlProps) {
  const rol = useAuthStore((s) => s.rol)
  const canChange = rol === 'admin' || rol === 'cajero'

  if (!canChange) return null

  const currentIndex = STATUS_FLOW.indexOf(currentStatus)
  const isTerminal = currentStatus === 'cancelado'
  const isLastStep = currentIndex === STATUS_FLOW.length - 1

  if (isTerminal || isLastStep) return null

  const prevStatus: OrderStatus | null =
    currentIndex > 0 ? STATUS_FLOW[currentIndex - 1] : null
  const nextStatus: OrderStatus | null =
    currentIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentIndex + 1] : null

  const handleChange = (newStatus: OrderStatus) => {
    if (onStatusChange) {
      onStatusChange(orderId, newStatus)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {prevStatus && (
        <button
          onClick={() => handleChange(prevStatus)}
          className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface-variant text-label-md hover:bg-surface-container-high transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {STATUS_LABELS[prevStatus]}
        </button>
      )}

      {nextStatus && (
        <button
          onClick={() => handleChange(nextStatus)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-container text-on-primary-container text-label-md font-bold hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">{STATUS_ICONS[nextStatus]}</span>
          Mover a {STATUS_LABELS[nextStatus]}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      )}

      <button
        onClick={() => handleChange('cancelado')}
        className="flex items-center gap-2 px-4 py-2 border border-error/30 text-error text-label-md hover:bg-error/10 transition-all ml-auto"
      >
        <span className="material-symbols-outlined text-[18px]">cancel</span>
        Cancelar
      </button>
    </div>
  )
}
