import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { serviceName } from "@/lib/services"
import { STATUS_LABEL, type Booking, type BookingStatus } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const STATUS_ORDER: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"]
const FILTERS: { key: "all" | BookingStatus; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "pending", label: "Pendientes" },
  { key: "confirmed", label: "Confirmadas" },
  { key: "completed", label: "Completadas" },
  { key: "cancelled", label: "Canceladas" },
]

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge
      variant="outline"
      className="border-transparent"
      style={{
        color: `var(--status-${status})`,
        backgroundColor: `var(--status-${status}-bg)`,
      }}
    >
      {STATUS_LABEL[status]}
    </Badge>
  )
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("es-PE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | BookingStatus>("all")

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("booking_date", { ascending: true })
        .order("booking_time", { ascending: true })
      if (!active) return
      if (error) {
        toast.error("No se pudieron cargar las reservas.")
      } else {
        setBookings(data as Booking[])
      }
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel("bookings-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => {
        load()
      })
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  async function updateStatus(id: string, status: BookingStatus) {
    const previous = bookings
    setBookings((rows) => rows.map((b) => (b.id === id ? { ...b, status } : b)))
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id)
    if (error) {
      setBookings(previous)
      toast.error("No se pudo actualizar el estado.")
    } else {
      toast.success(`Reserva marcada como ${STATUS_LABEL[status].toLowerCase()}.`)
    }
  }

  const filtered = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter],
  )

  const pendingCount = bookings.filter((b) => b.status === "pending").length

  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reservas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading
              ? "Cargando…"
              : pendingCount > 0
                ? `${pendingCount} reserva${pendingCount === 1 ? "" : "s"} pendiente${pendingCount === 1 ? "" : "s"} de confirmar.`
                : "Sin reservas pendientes."}
          </p>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-4">
        <TabsList>
          {FILTERS.map((f) => (
            <TabsTrigger key={f.key} value={f.key}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {loading ? (
          <div className="flex flex-col gap-3 p-5">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-muted-foreground">
            No hay reservas en esta categoría todavía.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead>1ª visita</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="whitespace-nowrap font-medium capitalize">
                      {formatDate(b.booking_date)} · {b.booking_time}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{b.customer_name}</div>
                      <a
                        href={`https://wa.me/51${b.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        {b.phone}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-56">
                      <span className="text-sm">
                        {b.service_ids.map((id) => serviceName(id)).join(", ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {b.first_visit === null ? "—" : b.first_visit ? "Sí" : "No"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
                          Cambiar estado
                          <ChevronDown className="size-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {STATUS_ORDER.map((s) => (
                            <DropdownMenuItem
                              key={s}
                              disabled={s === b.status}
                              onClick={() => updateStatus(b.id, s)}
                            >
                              {STATUS_LABEL[s]}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
