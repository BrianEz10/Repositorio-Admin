import type { OrderStatus } from '@/features/orders/types'
import { STATUS_LABELS, STATUS_ICONS } from '@/features/orders/types'

const statusStyles: Record<OrderStatus, string> = {
  pendiente:
    'bg-primary-container/15 text-primary border-primary-container/30',
  en_preparacion:
    'bg-tertiary/10 text-tertiary border-tertiary/30',
  listo:
    'bg-secondary/10 text-secondary border-secondary/30',
  entregado:
    'bg-on-surface-variant/10 text-on-surface-variant border-on-surface-variant/20',
  cancelado:
    'bg-error/10 text-error border-error/30',
}

interface StatusBadgeProps {
  status: OrderStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 border text-label-sm tracking-wide font-semibold ${statusStyles[status]}`}
    >
      <span className="material-symbols-outlined text-[14px]">
        {STATUS_ICONS[status]}
      </span>
      {STATUS_LABELS[status]}
    </span>
  )
}
