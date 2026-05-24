import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Category, CategoryFormData } from '@/features/categories/types'

/* ── DATOS MOCK (borrar cuando haya backend) ── */
const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    parent_id: null,
    nombre: 'Cortes Principales',
    descripcion: 'Los mejores cortes de carne',
    icono: 'local_fire_department',
    activo: true,
    orden_display: 1,
    subcategorias: [
      { id: 10, parent_id: 1, nombre: 'Carnes Rojas', icono: 'restaurant', activo: true, orden_display: 1 },
      { id: 11, parent_id: 1, nombre: 'Aves', icono: 'egg', activo: true, orden_display: 2 },
      { id: 12, parent_id: 1, nombre: 'Cortes Especiales', icono: 'star', activo: true, orden_display: 3 },
    ],
  },
  {
    id: 2,
    parent_id: null,
    nombre: 'Entradas y Tapas',
    descripcion: 'Para comenzar la velada',
    icono: 'tapas',
    activo: true,
    orden_display: 2,
    subcategorias: [
      { id: 20, parent_id: 2, nombre: 'Frías', icono: 'ac_unit', activo: true, orden_display: 1 },
      { id: 21, parent_id: 2, nombre: 'Calientes', icono: 'local_fire_department', activo: true, orden_display: 2 },
    ],
  },
  {
    id: 3,
    parent_id: null,
    nombre: 'Mixología y Vinos',
    descripcion: 'Carta de bebidas premium',
    icono: 'wine_bar',
    activo: false,
    orden_display: 3,
    subcategorias: [
      { id: 30, parent_id: 3, nombre: 'Cócteles Clásicos', icono: 'local_bar', activo: true, orden_display: 1 },
      { id: 31, parent_id: 3, nombre: 'Vinos Tintos', icono: 'wine_bar', activo: true, orden_display: 2 },
      { id: 32, parent_id: 3, nombre: 'Vinos Blancos', icono: 'wine_bar', activo: false, orden_display: 3 },
    ],
  },
  {
    id: 4,
    parent_id: null,
    nombre: 'Postres',
    descripcion: 'El broche de oro',
    icono: 'cake',
    activo: true,
    orden_display: 4,
    subcategorias: [],
  },
]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Cuenta total de subcategorías de una categoría padre */
function countItems(cat: Category): number {
  return (cat.subcategorias?.length ?? 0)
}
/* ── FIN MOCK ── */

export { countItems }

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await delay(600)
      return MOCK_CATEGORIES.filter((c) => c.parent_id === null)
    },
  })

export const useCategory = (id: number) =>
  useQuery({
    queryKey: ['categories', id],
    queryFn: async () => {
      await delay(300)
      const found = MOCK_CATEGORIES.find((c) => c.id === id)
      if (!found) throw new Error('No encontrado')
      return found
    },
  })

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CategoryFormData) => {
      await delay(500)
      const newCat: Category = {
        id: Date.now(),
        ...payload,
        orden_display: MOCK_CATEGORIES.length + 1,
        subcategorias: [],
      }
      if (payload.parent_id) {
        // añadir como subcategoría
        const parent = MOCK_CATEGORIES.find((c) => c.id === payload.parent_id)
        if (parent) {
          if (!parent.subcategorias) parent.subcategorias = []
          parent.subcategorias.push(newCat)
        }
      } else {
        MOCK_CATEGORIES.push(newCat)
      }
      return newCat
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<CategoryFormData> }) => {
      await delay(500)
      // buscar en raíz
      let idx = MOCK_CATEGORIES.findIndex((c) => c.id === id)
      if (idx !== -1) {
        MOCK_CATEGORIES[idx] = { ...MOCK_CATEGORIES[idx], ...payload }
        return MOCK_CATEGORIES[idx]
      }
      // buscar en subcategorías
      for (const parent of MOCK_CATEGORIES) {
        if (!parent.subcategorias) continue
        const subIdx = parent.subcategorias.findIndex((s) => s.id === id)
        if (subIdx !== -1) {
          parent.subcategorias[subIdx] = { ...parent.subcategorias[subIdx], ...payload }
          return parent.subcategorias[subIdx]
        }
      }
      throw new Error('No encontrado')
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await delay(500)
      // buscar en raíz
      const idx = MOCK_CATEGORIES.findIndex((c) => c.id === id)
      if (idx !== -1) {
        MOCK_CATEGORIES.splice(idx, 1)
        return
      }
      // buscar en subcategorías
      for (const parent of MOCK_CATEGORIES) {
        if (!parent.subcategorias) continue
        const subIdx = parent.subcategorias.findIndex((s) => s.id === id)
        if (subIdx !== -1) {
          parent.subcategorias.splice(subIdx, 1)
          return
        }
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
