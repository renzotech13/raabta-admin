import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider, useAuth } from "@/lib/auth"
import Login from "@/pages/Login"
import Bookings from "@/pages/Bookings"
import Front from "@/pages/Front"
import Productos from "@/pages/Productos"
import Servicios from "@/pages/Servicios"
import Elearning from "@/pages/Elearning"
import AppShell from "@/components/AppShell"

function Gate() {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Login />

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/reservas" replace />} />
        <Route path="/front" element={<Front />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/reservas" element={<Bookings />} />
        <Route path="/elearning" element={<Elearning />} />
        <Route path="*" element={<Navigate to="/reservas" replace />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Gate />
      </AuthProvider>
    </BrowserRouter>
  )
}
