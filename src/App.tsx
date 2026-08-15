import { AuthProvider, useAuth } from "@/lib/auth"
import Login from "@/pages/Login"
import Bookings from "@/pages/Bookings"
import AppShell from "@/components/AppShell"

function Gate() {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Login />

  return (
    <AppShell>
      <Bookings />
    </AppShell>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}
