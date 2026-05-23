# admin-app

Panel de administración de un sistema de pedidos de comida.
Parte de un sistema con dos apps separadas: admin-app (este repo) y store-app (repo aparte).

## Roles del sistema
- admin: CRUD completo
- empleado: solo lectura
- cajero: gestión de estados de pedidos

## Stack
- Vite 8 + React 19 + TypeScript 6
- React Router DOM v7
- TanStack Query v5
- TanStack Table v8
- TanStack Form v1
- Axios v1
- Zustand v5
- Tailwind CSS v4

## Estructura de carpetas
src/
  features/         # un módulo por dominio
    products/
    ingredients/
    categories/
    orders/
  shared/           # componentes reutilizables (Layout, Sidebar, Navbar)
  store/            # stores de Zustand
  lib/              # instancia de axios y utilidades
  router/           # configuración de rutas

## Convenciones
- Alias @/ apunta a src/
- Sin "any" en TypeScript
- Imports con @/ siempre, nunca rutas relativas largas
- Nombres de archivos en camelCase, componentes en PascalCase
- Cada feature tiene: types.ts, services/, hooks/, page/

## Restricciones
- No modificar src/index.css (Tailwind ya configurado)
- No crear lógica en App.tsx, solo entry point
- No mezclar lógica de store-app en este repo
- No usar localStorage directamente, siempre a través de Zustand
## Diseño
Ver DESIGN.md para el sistema de diseño completo.
Respetar colores, tipografía, espaciados y filosofía visual.
Esquinas siempre sharp (0px border-radius salvo excepciones del sistema).