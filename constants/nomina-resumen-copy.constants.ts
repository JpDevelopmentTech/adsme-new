/** Textos literales de la pantalla Resumen de la Nómina Plan. */
export const NOMINA_RESUMEN_COPY = {
  metaTitle: "Resumen · adsme",
  title: "Resumen",
  subtitle: (month: string) => `Vista panorámica del negocio · ${month}`,
  grossLabel: (monthName: string) => `Ingresos Brutos · ${monthName}`,
  grossNote: (month: string) => `Suma de los ingresos con Mes Asignado = ${month}`,
  profit: "Utilidad",
  ads: "Ads (Inversión)",
  services: "Servicios",
  taxes: "Impuestos",
  performanceTitle: "Rendimiento en el tiempo",
  performanceSubtitle: "Ingresos diarios del roster · agrupado por mes calendario completo",
  distributionTitle: "Distribución",
  topTitle: "Top Artistas",
  topSubtitle: "Los 5 artistas con más ingresos este mes",
  seeRoster: "Ver roster completo",
  monthIncome: (amount: string) => `${amount} este mes`,
  scalability: "Escalabilidad",
  shows: (shows: number, minShows: number, percent: number) => `${shows}/${minShows} shows · ${percent}%`,
  openProfile: (name: string) => `Abrir el perfil de ${name}`,
  emptyTitle: "Aún no hay artistas con ingresos",
  emptyWithArtists: "Registra un ingreso para ver el ranking del mes.",
  emptyWithoutArtists: "Crea tu primer artista con “Nuevo artista” para empezar.",
} as const;

/** Nota del Servicio asumido por AdsME, compartida por Resumen y Artistas. */
export const SERVICE_ASSUMED_COPY = {
  all: "Asumido por AdsME",
  some: (assumed: number, total: number) => `AdsME asume el de ${assumed} de ${total} artistas`,
} as const;
