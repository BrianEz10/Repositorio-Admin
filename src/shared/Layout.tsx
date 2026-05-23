import { Outlet } from 'react-router-dom'
import Navbar from '@/shared/Navbar'
import Sidebar from '@/shared/Sidebar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
