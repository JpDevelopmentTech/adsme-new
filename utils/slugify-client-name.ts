/** Identificador estable de un cliente a partir de su nombre: sin tildes, en minúsculas y con guiones. */
export function slugifyClientName(name: string): string {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return slug || "cliente";
}
