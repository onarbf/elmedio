export default function titleToSlug({ title }: { title: string }) {
  return title
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios al principio y al final
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres no alfanuméricos (excepto espacios y guiones)
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .replace(/-+/g, '-') // Eliminar guiones consecutivos
}
