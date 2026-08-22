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
  deposit_amount: number | null
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

export type SiteContent = {
  id: number
  hero_eyebrow: string
  hero_title: string
  hero_subtitle: string
  hero_image_url: string | null
  about_eyebrow: string
  about_title: string
  about_body: string
  about_image_big: string | null
  about_image_small1: string | null
  about_image_small2: string | null
  footer_tagline: string
  updated_at: string
}

export type Testimonial = {
  id: string
  avatar_url: string | null
  name: string
  service: string
  quote: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  role: "staff" | "alumna"
  full_name: string | null
  phone: string | null
  created_at: string
}

export type Course = {
  id: string
  icon: string
  title: string
  meta: string
  description: string
  images: string[]
  price: number | null
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export type CourseDay = {
  id: string
  course_id: string
  title: string
  sort_order: number
}

export type LessonModality = "Video" | "Presencial"

export type CourseLesson = {
  id: string
  day_id: string
  title: string
  modality: LessonModality
  duration: string
  video_url: string | null
  sort_order: number
}

export type CourseMaterial = {
  id: string
  course_id: string
  name: string
  meta: string
  file_url: string
  sort_order: number
}

export type EnrollmentStatus = "pending" | "active" | "cancelled" | "completed"

export const ENROLLMENT_STATUS_LABEL: Record<EnrollmentStatus, string> = {
  pending: "Pendiente",
  active: "Activa",
  cancelled: "Cancelada",
  completed: "Completada",
}

export type Enrollment = {
  id: string
  student_id: string
  course_id: string
  status: EnrollmentStatus
  requested_at: string
  decided_at: string | null
}
