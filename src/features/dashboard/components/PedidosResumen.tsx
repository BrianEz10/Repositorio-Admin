import type { DashboardResponse } from '@/features/dashboard/types'

const ESTADO_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  PENDIENTE: { dot: 'bg-warning', text: 'text-warning', bg: 'bg-warning/10' },
  CONFIRMADO: { dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/10' },
  EN_PREP: { dot: 'bg-tertiary', text: 'text-tertiary', bg: 'bg-tertiary/10' },
  ENTREGADO: { dot: 'bg-success', text: 'text-success', bg: 'bg-success/10' },
  CANCELADO: { dot: 'bg-error', text: 'text-error', bg: 'bg-error/20' },
}

const ESTADO_LABELS: Record<string, string> = {
  PENDIENTE: 'Pendientes',
  CONFIRMADO: 'Confirmados',
  EN_PREP: 'En Preparación',
  ENTREGADO: 'Entregados',
  CANCELADO: 'Cancelados',
}

interface Props {
  pedidosPorEstado: DashboardResponse['pedidosPorEstado']
  totalPorFormaPago: DashboardResponse['totalPorFormaPago']
}

export default function PedidosResumen({ pedidosPorEstado, totalPorFormaPago }: Props) {
  const sorted = [...pedidosPorEstado].sort((a, b) => b.cantidad - a.cantidad)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Pedidos por estado */}
      <div className="bg-surface-container p-6 border border-outline-variant/20">
        <div className="flex items-center gap-2 mb-5">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">bar_chart</span>
          <h3 className="text-label-md text-on-surface uppercase tracking-wider font-bold">
            Pedidos por Estado
          </h3>
        </div>
        <div className="space-y-3">
          {sorted.map((item) => {
            const style = ESTADO_STYLES[item.estado] ?? { dot: 'bg-on-surface-variant/40', text: 'text-on-surface-variant', bg: 'bg-surface-variant/20' }
            const max = sorted[0]?.cantidad ?? 1
            const pct = Math.round((item.cantidad / max) * 100)
            return (
              <div key={item.estado}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                    <span className="text-label-sm text-on-surface font-medium">
                      {ESTADO_LABELS[item.estado] ?? item.estado}
                    </span>
                  </div>
                  <span className={`text-label-sm font-bold ${style.text}`}>
                    {item.cantidad}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: item.estado === 'ENTREGADO' ? '#22c55e' :
                        item.estado === 'PENDIENTE' ? '#eab308' :
                        item.estado === 'CONFIRMADO' ? '#6366f1' :
                        item.estado === 'EN_PREP' ? '#06b6d4' :
                        item.estado === 'CANCELADO' ? '#ef4444' :
                        '#94a3b8',
                    }}
                  />
                </div>
              </div>
            )
          })}
          {sorted.length === 0 && (
            <p className="text-label-sm text-on-surface-variant/50 text-center py-4">
              Sin datos
            </p>
          )}
        </div>
      </div>

      {/* Total por forma de pago */}
      <div className="bg-surface-container p-6 border border-outline-variant/20">
        <div className="flex items-center gap-2 mb-5">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">account_balance_wallet</span>
          <h3 className="text-label-md text-on-surface uppercase tracking-wider font-bold">
            Ingresos por Forma de Pago
          </h3>
        </div>
        <div className="space-y-4">
          {totalPorFormaPago.map((item) => {
            const max = totalPorFormaPago.reduce((m, x) => Math.max(m, x.total), 0)
            const pct = max > 0 ? Math.round((item.total / max) * 100) : 0
            return (
              <div key={item.formaPago}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-label-sm text-on-surface font-medium uppercase">
                    {item.formaPago}
                  </span>
                  <span className="text-label-sm font-bold text-on-surface">
                    ${item.total.toFixed(2)}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-variant/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          {totalPorFormaPago.length === 0 && (
            <p className="text-label-sm text-on-surface-variant/50 text-center py-4">
              Sin datos
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
