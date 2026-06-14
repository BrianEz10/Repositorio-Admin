import type { ProductoVendido } from '@/features/dashboard/types'

interface Props {
  productos: ProductoVendido[]
}

const MEDALS = ['emoji_events', 'military_tech', 'workspace_premium']

export default function ProductosTop({ productos }: Props) {
  return (
    <div className="bg-surface-container p-6 border border-outline-variant/20">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-[20px] text-on-surface-variant">trending_up</span>
        <h3 className="text-label-md text-on-surface uppercase tracking-wider font-bold">
          Productos Más Vendidos
        </h3>
      </div>
      <div className="space-y-1">
        {productos.map((p, i) => (
          <div
            key={p.nombre}
            className={`flex items-center justify-between px-4 py-3 transition-colors ${
              i === 0
                ? 'bg-warning/5 border-l-2 border-warning'
                : i === 1
                  ? 'bg-surface-variant/10 border-l-2 border-outline-variant/40'
                  : i === 2
                    ? 'bg-tertiary-container/5 border-l-2 border-tertiary/30'
                    : 'border-l-2 border-transparent hover:bg-surface-variant/10'
            }`}
          >
            <div className="flex items-center gap-3">
              {i < 3 ? (
                <span className={`material-symbols-outlined text-[20px] ${
                  i === 0 ? 'text-warning' : i === 1 ? 'text-on-surface-variant' : 'text-tertiary'
                }`}>
                  {MEDALS[i]}
                </span>
              ) : (
                <span className="w-5 text-center text-label-sm text-on-surface-variant/50 font-bold">
                  {i + 1}
                </span>
              )}
              <div>
                <p className="text-body-md text-on-surface font-medium">{p.nombre}</p>
                <p className="text-label-sm text-on-surface-variant/60">{p.totalVendido} unidades vendidas</p>
              </div>
            </div>
            <span className="text-label-sm font-bold text-primary">{p.totalVendido}</span>
          </div>
        ))}
        {productos.length === 0 && (
          <p className="text-label-sm text-on-surface-variant/50 text-center py-8">
            No hay productos vendidos aún
          </p>
        )}
      </div>
    </div>
  )
}
