import { PenLine } from "lucide-react"
import ComingSoon from "@/pages/ComingSoon"

export default function Front() {
  return (
    <ComingSoon
      icon={PenLine}
      title="Front"
      description="Textos e imágenes del sitio: hero, sobre nosotros, testimonios, footer."
      phase="Fase 5"
    />
  )
}
