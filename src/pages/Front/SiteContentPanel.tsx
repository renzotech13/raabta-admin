import { useEffect, useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import type { SiteContent } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"

type FormState = Omit<SiteContent, "id" | "updated_at">

const EMPTY: FormState = {
  hero_eyebrow: "",
  hero_title: "",
  hero_subtitle: "",
  hero_image_url: "",
  about_eyebrow: "",
  about_title: "",
  about_body: "",
  about_image_big: "",
  about_image_small1: "",
  about_image_small2: "",
  footer_tagline: "",
}

export default function SiteContentPanel({ section }: { section: "hero" | "about" | "footer" }) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      const { data, error } = await supabase.from("site_content").select("*").eq("id", 1).single()
      if (!active) return
      if (error) {
        toast.error("No se pudo cargar el contenido del sitio.")
      } else {
        const row = data as SiteContent
        setForm({
          hero_eyebrow: row.hero_eyebrow,
          hero_title: row.hero_title,
          hero_subtitle: row.hero_subtitle,
          hero_image_url: row.hero_image_url ?? "",
          about_eyebrow: row.about_eyebrow,
          about_title: row.about_title,
          about_body: row.about_body,
          about_image_big: row.about_image_big ?? "",
          about_image_small1: row.about_image_small1 ?? "",
          about_image_small2: row.about_image_small2 ?? "",
          footer_tagline: row.footer_tagline,
        })
      }
      setLoading(false)
    }
    load()
    return () => {
      active = false
    }
  }, [])

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSave() {
    setSubmitting(true)
    const payload = {
      ...form,
      hero_image_url: form.hero_image_url?.trim() || null,
      about_image_big: form.about_image_big?.trim() || null,
      about_image_small1: form.about_image_small1?.trim() || null,
      about_image_small2: form.about_image_small2?.trim() || null,
    }
    const { error } = await supabase.from("site_content").update(payload).eq("id", 1)
    setSubmitting(false)
    if (error) {
      toast.error("No se pudo guardar.")
      return
    }
    toast.success("Contenido actualizado.")
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <div className="flex max-w-xl flex-col gap-4">
      {section === "hero" && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="hero-eyebrow">Etiqueta superior</Label>
            <Input id="hero-eyebrow" value={form.hero_eyebrow} onChange={(e) => set("hero_eyebrow", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="hero-title">Título</Label>
            <Textarea id="hero-title" value={form.hero_title} onChange={(e) => set("hero_title", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="hero-subtitle">Subtítulo</Label>
            <Textarea id="hero-subtitle" value={form.hero_subtitle} onChange={(e) => set("hero_subtitle", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="hero-image">Imagen (URL o ruta)</Label>
            <Input
              id="hero-image"
              value={form.hero_image_url ?? ""}
              onChange={(e) => set("hero_image_url", e.target.value)}
              placeholder="assets/hero-image.webp"
            />
          </div>
        </>
      )}

      {section === "about" && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="about-eyebrow">Etiqueta superior</Label>
            <Input id="about-eyebrow" value={form.about_eyebrow} onChange={(e) => set("about_eyebrow", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="about-title">Título</Label>
            <Textarea id="about-title" value={form.about_title} onChange={(e) => set("about_title", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="about-body">Descripción</Label>
            <Textarea id="about-body" value={form.about_body} onChange={(e) => set("about_body", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="about-img-big">Imagen grande (URL o ruta)</Label>
              <Input
                id="about-img-big"
                value={form.about_image_big ?? ""}
                onChange={(e) => set("about_image_big", e.target.value)}
                placeholder="assets/gallery-1.webp"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="about-img-small1">Imagen pequeña 1</Label>
              <Input
                id="about-img-small1"
                value={form.about_image_small1 ?? ""}
                onChange={(e) => set("about_image_small1", e.target.value)}
                placeholder="assets/gallery-5.webp"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="about-img-small2">Imagen pequeña 2</Label>
              <Input
                id="about-img-small2"
                value={form.about_image_small2 ?? ""}
                onChange={(e) => set("about_image_small2", e.target.value)}
                placeholder="assets/gallery-4.webp"
              />
            </div>
          </div>
        </>
      )}

      {section === "footer" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="footer-tagline">Texto bajo el logo</Label>
          <Textarea id="footer-tagline" value={form.footer_tagline} onChange={(e) => set("footer_tagline", e.target.value)} />
        </div>
      )}

      <div>
        <Button onClick={handleSave} disabled={submitting}>
          {submitting ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </div>
  )
}
