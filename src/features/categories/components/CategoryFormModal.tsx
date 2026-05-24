import { useState, useEffect } from 'react'
import type { Category, CategoryFormData } from '@/features/categories/types'

const ICON_OPTIONS = [
  'local_fire_department',
  'tapas',
  'wine_bar',
  'cake',
  'restaurant',
  'egg',
  'local_bar',
  'star',
  'ac_unit',
  'kitchen',
  'lunch_dining',
  'ramen_dining',
  'bakery_dining',
  'icecream',
  'coffee',
  'emoji_food_beverage',
]

interface Props {
  category: Category | null
  parentCategories: Category[]
  defaultParentId?: number | null
  onSubmit: (data: CategoryFormData) => void
  onClose: () => void
  isSubmitting: boolean
}

export default function CategoryFormModal({
  category,
  parentCategories,
  defaultParentId = null,
  onSubmit,
  onClose,
  isSubmitting,
}: Props) {
  const isEditing = !!category
  const isSubcategory = isEditing ? category.parent_id !== null : defaultParentId !== null

  const [nombre, setNombre] = useState(category?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(category?.descripcion ?? '')
  const [icono, setIcono] = useState(category?.icono ?? ICON_OPTIONS[0])
  const [activo, setActivo] = useState(category?.activo ?? true)
  const [parentId, setParentId] = useState<number | null>(
    category?.parent_id ?? defaultParentId,
  )

  useEffect(() => {
    if (category) {
      setNombre(category.nombre)
      setDescripcion(category.descripcion ?? '')
      setIcono(category.icono)
      setActivo(category.activo)
      setParentId(category.parent_id)
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return
    onSubmit({
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || undefined,
      icono,
      activo,
      parent_id: parentId,
    })
  }

  const title = isEditing
    ? isSubcategory
      ? 'Editar Subcategoría'
      : 'Editar Categoría'
    : isSubcategory
      ? 'Crear Subcategoría'
      : 'Nueva Categoría'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-surface-container border border-outline-variant/20 w-full max-w-lg mx-4 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-outline-variant/20 flex items-center justify-between">
          <h2 className="text-headline-md font-bold text-on-surface">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-6">
          {/* Categoría padre (solo para subcategorías) */}
          {(isSubcategory || (!isEditing && parentCategories.length > 0)) && (
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface-variant">
                Categoría Padre
              </label>
              <select
                value={parentId ?? ''}
                onChange={(e) => setParentId(e.target.value ? Number(e.target.value) : null)}
                className="bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">Sin padre (categoría raíz)</option>
                {parentCategories.map((pc) => (
                  <option key={pc.id} value={pc.id}>
                    {pc.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface-variant">
              Nombre
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder={isSubcategory ? 'Ej: Vinos Tintos de Reserva' : 'Ej: Midnight Cocktails'}
              className="bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface-variant">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Breve descripción de los elementos contenidos..."
              rows={3}
              className="bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 resize-none"
            />
          </div>

          {/* Identidad Visual / Icono */}
          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface-variant">
              Identidad Visual / Icono
            </label>
            <div className="grid grid-cols-8 gap-2">
              {ICON_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setIcono(icon)}
                  className={`w-full aspect-square flex items-center justify-center border transition-all cursor-pointer ${
                    icono === icon
                      ? 'bg-primary-container/20 border-primary text-primary'
                      : 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:border-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Estado */}
          <div className="flex flex-col gap-3">
            <label className="text-label-md font-label-md text-on-surface-variant">
              Estado
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setActivo(true)}
                className={`flex-1 flex flex-col items-center gap-2 py-4 border transition-all cursor-pointer ${
                  activo
                    ? 'bg-tertiary-container/10 border-tertiary text-tertiary'
                    : 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:border-outline'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${activo ? 'bg-tertiary' : 'bg-on-surface-variant/30'}`} />
                <span className="text-label-md font-label-md">Activo</span>
              </button>
              <button
                type="button"
                onClick={() => setActivo(false)}
                className={`flex-1 flex flex-col items-center gap-2 py-4 border transition-all cursor-pointer ${
                  !activo
                    ? 'bg-surface-variant/20 border-on-surface-variant text-on-surface'
                    : 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:border-outline'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${!activo ? 'bg-on-surface-variant' : 'bg-on-surface-variant/30'}`} />
                <span className="text-label-md font-label-md">Borrador</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-outline-variant/30 text-on-surface-variant text-label-md font-label-md hover:bg-surface-container-high transition-colors cursor-pointer disabled:opacity-50 uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !nombre.trim()}
              className="px-6 py-2.5 bg-primary-container text-on-primary-container text-label-md font-label-md font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  Guardando...
                </>
              ) : isEditing ? (
                'Guardar Cambios'
              ) : isSubcategory ? (
                'Guardar Subcategoría'
              ) : (
                'Guardar Categoría'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
