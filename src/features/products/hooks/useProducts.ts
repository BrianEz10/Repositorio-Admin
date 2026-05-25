import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product, ProductFormData } from '@/features/products/types'

/* ── DATOS MOCK (borrar cuando haya backend) ── */
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    nombre: 'Midnight Ramen',
    descripcion: 'Caldo tonkotsu con cerdo braseado, huevo mollet y nori artesanal.',
    precioBase: 16.5,
    imagenesUrl: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop'],
    tiempoPrepMin: 25,
    disponible: true,
    categorias: [
      { categoriaId: 1, categoriaNombre: 'Cortes Principales', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 4, ingredienteNombre: 'Pimienta Negra Grano', esAlergeno: false, esRemovible: true, esOpcional: false },
      { ingredienteId: 7, ingredienteNombre: 'Huevos de Campo', esAlergeno: true, esRemovible: true, esOpcional: false },
      { ingredienteId: 8, ingredienteNombre: 'Sal Marina', esAlergeno: false, esRemovible: false, esOpcional: false },
    ],
  },
  {
    id: 2,
    nombre: 'Steak Tartare Noir',
    descripcion: 'Solomillo crudo cortado a cuchillo con yema curada, alcaparras y pan de carbón.',
    precioBase: 24.0,
    imagenesUrl: ['https://images.unsplash.com/photo-1432139509613-5c4255a1d197?w=600&h=600&fit=crop'],
    tiempoPrepMin: 15,
    disponible: true,
    categorias: [
      { categoriaId: 2, categoriaNombre: 'Entradas y Tapas', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 1, ingredienteNombre: 'Solomillo de Ternera', esAlergeno: false, esRemovible: false, esOpcional: false },
      { ingredienteId: 7, ingredienteNombre: 'Huevos de Campo', esAlergeno: true, esRemovible: false, esOpcional: false },
      { ingredienteId: 6, ingredienteNombre: 'Aceite de Oliva Extra Virgen', esAlergeno: false, esRemovible: false, esOpcional: false },
    ],
  },
  {
    id: 3,
    nombre: 'Camarones al Fuego',
    descripcion: 'Camarones flambeados con ajo negro, mantequilla ahumada y cítricos.',
    precioBase: 19.9,
    imagenesUrl: ['https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=600&h=600&fit=crop'],
    tiempoPrepMin: 18,
    disponible: true,
    categorias: [
      { categoriaId: 2, categoriaNombre: 'Entradas y Tapas', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 5, ingredienteNombre: 'Camarones Frescos', esAlergeno: true, esRemovible: false, esOpcional: false },
      { ingredienteId: 9, ingredienteNombre: 'Mantequilla Sin Sal', esAlergeno: true, esRemovible: false, esOpcional: false },
      { ingredienteId: 8, ingredienteNombre: 'Sal Marina', esAlergeno: false, esRemovible: false, esOpcional: false },
    ],
  },
  {
    id: 4,
    nombre: 'Old Fashioned Noir',
    descripcion: 'Bourbon añejo, bitters de cereza negra, piel de naranja ahumada.',
    precioBase: 14.0,
    imagenesUrl: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=600&fit=crop'],
    tiempoPrepMin: 5,
    disponible: false,
    categorias: [
      { categoriaId: 3, categoriaNombre: 'Mixología y Vinos', esPrincipal: true },
    ],
    ingredientes: [],
  },
  {
    id: 5,
    nombre: 'Lava Cake Obsidian',
    descripcion: 'Volcán de chocolate amargo 72% con corazón fundido y helado de vainilla negra.',
    precioBase: 12.5,
    imagenesUrl: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop'],
    tiempoPrepMin: 20,
    disponible: true,
    categorias: [
      { categoriaId: 4, categoriaNombre: 'Postres', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 2, ingredienteNombre: 'Harina de Trigo 00', esAlergeno: true, esRemovible: false, esOpcional: false },
      { ingredienteId: 7, ingredienteNombre: 'Huevos de Campo', esAlergeno: true, esRemovible: false, esOpcional: false },
      { ingredienteId: 3, ingredienteNombre: 'Leche Entera', esAlergeno: true, esRemovible: false, esOpcional: false },
      { ingredienteId: 9, ingredienteNombre: 'Mantequilla Sin Sal', esAlergeno: true, esRemovible: false, esOpcional: false },
    ],
  },
  {
    id: 6,
    nombre: 'Ensalada Carbón & Trufa',
    descripcion: 'Mix de hojas verdes, láminas de trufa negra, parmesano y vinagreta balsámica.',
    precioBase: 15.0,
    imagenesUrl: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop'],
    tiempoPrepMin: 10,
    disponible: true,
    categorias: [
      { categoriaId: 2, categoriaNombre: 'Entradas y Tapas', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 6, ingredienteNombre: 'Aceite de Oliva Extra Virgen', esAlergeno: false, esRemovible: false, esOpcional: false },
      { ingredienteId: 12, ingredienteNombre: 'Tomate Cherry', esAlergeno: false, esRemovible: true, esOpcional: true },
      { ingredienteId: 3, ingredienteNombre: 'Leche Entera', esAlergeno: true, esRemovible: true, esOpcional: true },
    ],
  },
  {
    id: 7,
    nombre: 'Costillas BBQ Midnight',
    descripcion: 'Rack de costillas baby back glaseadas con salsa BBQ de bourbon y miel ahumada.',
    precioBase: 28.0,
    imagenesUrl: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop'],
    tiempoPrepMin: 45,
    disponible: true,
    categorias: [
      { categoriaId: 1, categoriaNombre: 'Cortes Principales', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 8, ingredienteNombre: 'Sal Marina', esAlergeno: false, esRemovible: false, esOpcional: false },
      { ingredienteId: 4, ingredienteNombre: 'Pimienta Negra Grano', esAlergeno: false, esRemovible: false, esOpcional: false },
    ],
  },
  {
    id: 8,
    nombre: 'Gyozas de Cerdo Negro',
    descripcion: 'Empanadillas al vapor con cerdo ibérico, jengibre fresco y salsa ponzu.',
    precioBase: 13.0,
    imagenesUrl: ['https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=600&fit=crop'],
    tiempoPrepMin: 12,
    disponible: false,
    categorias: [
      { categoriaId: 2, categoriaNombre: 'Entradas y Tapas', esPrincipal: true },
    ],
    ingredientes: [
      { ingredienteId: 2, ingredienteNombre: 'Harina de Trigo 00', esAlergeno: true, esRemovible: false, esOpcional: false },
    ],
  },
]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
/* ── FIN MOCK ── */

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      await delay(600)
      return [...MOCK_PRODUCTS]
    },
  })

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      await delay(300)
      const found = MOCK_PRODUCTS.find((p) => p.id === id)
      if (!found) throw new Error('Producto no encontrado')
      return found
    },
  })

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: ProductFormData) => {
      await delay(500)
      const newProduct: Product = {
        id: Date.now(),
        nombre: payload.nombre,
        descripcion: payload.descripcion,
        precioBase: payload.precioBase,
        imagenesUrl: payload.imagenesUrl,
        tiempoPrepMin: payload.tiempoPrepMin,
        disponible: payload.disponible,
        categorias: payload.categoriaIds.map((cid) => ({
          categoriaId: cid,
          categoriaNombre: `Categoría ${cid}`,
          esPrincipal: false,
        })),
        ingredientes: payload.ingredienteIds.map((iid) => ({
          ingredienteId: iid,
          ingredienteNombre: `Ingrediente ${iid}`,
          esAlergeno: false,
          esRemovible: true,
          esOpcional: false,
        })),
      }
      MOCK_PRODUCTS.push(newProduct)
      return newProduct
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: Partial<ProductFormData> }) => {
      await delay(500)
      const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id)
      if (idx === -1) throw new Error('Producto no encontrado')
      MOCK_PRODUCTS[idx] = {
        ...MOCK_PRODUCTS[idx],
        ...payload,
        categorias: payload.categoriaIds
          ? payload.categoriaIds.map((cid) => ({
              categoriaId: cid,
              categoriaNombre:
                MOCK_PRODUCTS[idx].categorias.find((c) => c.categoriaId === cid)?.categoriaNombre ??
                `Categoría ${cid}`,
              esPrincipal: false,
            }))
          : MOCK_PRODUCTS[idx].categorias,
        ingredientes: payload.ingredienteIds
          ? payload.ingredienteIds.map((iid) => ({
              ingredienteId: iid,
              ingredienteNombre:
                MOCK_PRODUCTS[idx].ingredientes.find((i) => i.ingredienteId === iid)
                  ?.ingredienteNombre ?? `Ingrediente ${iid}`,
              esAlergeno:
                MOCK_PRODUCTS[idx].ingredientes.find((i) => i.ingredienteId === iid)?.esAlergeno ??
                false,
              esRemovible: true,
              esOpcional: false,
            }))
          : MOCK_PRODUCTS[idx].ingredientes,
      }
      return MOCK_PRODUCTS[idx]
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await delay(500)
      const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id)
      if (idx !== -1) MOCK_PRODUCTS.splice(idx, 1)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useToggleDisponible = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, disponible }: { id: number; disponible: boolean }) => {
      await delay(300)
      const idx = MOCK_PRODUCTS.findIndex((p) => p.id === id)
      if (idx === -1) throw new Error('Producto no encontrado')
      MOCK_PRODUCTS[idx].disponible = disponible
      return MOCK_PRODUCTS[idx]
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
