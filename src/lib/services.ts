// Nombres de servicios para mostrar en el panel. Duplica temporalmente los ids de
// SERVICE_GROUPS en reserva.html — cuando el catálogo se migre a Supabase (fase 3)
// esto se reemplaza por una consulta a la tabla `services`.
export const SERVICE_NAMES: Record<string, string> = {
  microblading: "Microblading",
  "micro-cejas": "Micropigmentación de cejas",
  "micro-labios": "Micropigmentación de labios",
  delineado: "Delineado de ojo",
  hidralips: "Hidralips",
  depilacion: "Depilación",
  faciales: "Faciales",
  rejuvenecimiento: "Rejuvenecimiento facial",
  planing: "Planing",
  pedicure: "Pedicure",
  manicure: "Manicure",
  lifting: "Lifting de pestañas",
  pestanas: "Pestañas",
  henna: "Henna",
}

export function serviceName(id: string): string {
  return SERVICE_NAMES[id] ?? id
}
