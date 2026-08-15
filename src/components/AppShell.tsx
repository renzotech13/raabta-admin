import type { ReactNode } from "react"
import { CalendarCheck2, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default function AppShell({ children }: { children: ReactNode }) {
  const { session, signOut } = useAuth()

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
            R
          </div>
          <div>
            <div className="text-sm font-semibold">Panel Raabta</div>
            <div className="text-xs text-muted-foreground">Administración</div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          <a
            href="/"
            className="flex items-center gap-2.5 rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground"
          >
            <CalendarCheck2 className="size-4" />
            Reservas
          </a>
        </nav>
        <div className="border-t border-sidebar-border px-3 py-3">
          <div className="mb-2 truncate px-2 text-xs text-muted-foreground">{session?.user.email}</div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => signOut()}>
            <LogOut className="size-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
