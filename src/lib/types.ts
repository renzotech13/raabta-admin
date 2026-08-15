export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed"

export type Booking = {
  id: string
  customer_name: string
  phone: string
  service_ids: string[]
  booking_date: string
  booking_time: string
  first_visit: boolean | null
  comment: string | null
  status: BookingStatus
  created_at: string
  updated_at: string
}

export const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Completada",
}
