import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/shared/Layout'
import ProtectedRoute from '@/shared/ProtectedRoute'
import NotFoundPage from '@/shared/NotFoundPage'
import CajeroPage from '@/features/cajero/page/CajeroPage'
import DashboardPage from '@/features/dashboard/page/DashboardPage'
import LoginPage from '@/features/auth/page/LoginPage'
import ProductosPage from '@/features/products/page/ProductosPage'
import DetalleProductoPage from '@/features/products/page/DetalleProductoPage'
import IngredientesPage from '@/features/ingredients/page/IngredientesPage'
import CategoriasPage from '@/features/categorias/page/CategoriasPage'
import PedidosPage from '@/features/orders/page/PedidosPage'
import RegisterPage from '@/features/auth/page/RegisterPage'
import AdminUsersPage from '@/features/admin-users/page/AdminUsersPage'
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="/productos" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'productos',
            element: <ProductosPage />,
          },
          {
            path: 'productos/:id',
            element: <DetalleProductoPage />,
          },
          {
            path: 'ingredientes',
            element: <IngredientesPage />,
          },
          {
            path: 'categorias',
            element: <CategoriasPage />,
          },
          {
            path: 'pedidos',
            element: <PedidosPage />,
          },
          {
            path: 'cajero',
            element: <CajeroPage />,
          },
          {
            path: 'admin/usuarios',
            element: <AdminUsersPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])


export default router
