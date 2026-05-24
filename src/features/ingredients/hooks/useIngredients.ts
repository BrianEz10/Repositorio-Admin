import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import {
//   getIngredients,
//   getIngredientById,
//   createIngredient,
//   updateIngredient,
//   deleteIngredient,
// } from '@/features/ingredients/services/ingredients.service'
import type { Ingredient, IngredientFormData } from '@/features/ingredients/types'

/* ── DATOS MOCK (borrar cuando haya backend) ── */
const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 1, nombre: 'Solomillo de Ternera', es_alergeno: false },
  { id: 2, nombre: 'Harina de Trigo 00', es_alergeno: true },
  { id: 3, nombre: 'Leche Entera', es_alergeno: true },
  { id: 4, nombre: 'Pimienta Negra Grano', es_alergeno: false },
  { id: 5, nombre: 'Camarones Frescos', es_alergeno: true },
  { id: 6, nombre: 'Aceite de Oliva Extra Virgen', es_alergeno: false },
  { id: 7, nombre: 'Huevos de Campo', es_alergeno: true },
  { id: 8, nombre: 'Sal Marina', es_alergeno: false },
  { id: 9, nombre: 'Mantequilla Sin Sal', es_alergeno: true },
  { id: 10, nombre: 'Vino de la Casa (Tinto)', es_alergeno: false },
  { id: 11, nombre: 'Maní Tostado', es_alergeno: true },
  { id: 12, nombre: 'Tomate Cherry', es_alergeno: false },
]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
/* ── FIN MOCK ── */

export const useIngredients = () =>
  useQuery({
    queryKey: ['ingredients'],
    queryFn: async () => {
      await delay(600) // simula latencia
      return MOCK_INGREDIENTS
    },
  })

export const useIngredient = (id: number) =>
  useQuery({
    queryKey: ['ingredients', id],
    queryFn: async () => {
      await delay(300)
      const found = MOCK_INGREDIENTS.find((i) => i.id === id)
      if (!found) throw new Error('No encontrado')
      return found
    },
  })

export const useCreateIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: IngredientFormData) => {
      await delay(500)
      const newIngredient: Ingredient = {
        id: Date.now(),
        ...payload,
      }
      MOCK_INGREDIENTS.push(newIngredient)
      return newIngredient
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['ingredients'] })
    },
  })
}

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<IngredientFormData> }) => {
      await delay(500)
      const idx = MOCK_INGREDIENTS.findIndex((i) => i.id === id)
      if (idx === -1) throw new Error('No encontrado')
      MOCK_INGREDIENTS[idx] = { ...MOCK_INGREDIENTS[idx], ...payload }
      return MOCK_INGREDIENTS[idx]
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['ingredients'] })
    },
  })
}

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await delay(500)
      const idx = MOCK_INGREDIENTS.findIndex((i) => i.id === id)
      if (idx !== -1) MOCK_INGREDIENTS.splice(idx, 1)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['ingredients'] })
    },
  })
}