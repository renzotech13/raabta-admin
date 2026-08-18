import { ShoppingBag } from "lucide-react"
import ComingSoon from "@/pages/ComingSoon"

export default function Productos() {
  return (
    <ComingSoon
      icon={ShoppingBag}
      title="Productos"
      description="Catálogo de belleza: cremas y skincare que hoy son una tarjeta fija en la portada."
      phase="Fase 3"
    />
  )
}
