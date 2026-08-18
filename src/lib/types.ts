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

export type BookingGroup = "Principales" | "Complementarios" | "Opcionales"
export const BOOKING_GROUPS: BookingGroup[] = ["Principales", "Complementarios", "Opcionales"]

export type ServiceCategory = {
  id: string
  icon: string
  title: string
  description: string
  images: string[]
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  category_id: string
  booking_group: BookingGroup
  name: string
  duration: string
  price: string
  description: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  name: string
  price: number
  description: string
  image_url: string | null
  active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}
