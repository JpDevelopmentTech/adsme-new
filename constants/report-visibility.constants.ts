import type { ReportVisibilityGroup } from "@/types/report-visibility.types";

/** Prefijo de los interruptores de visibilidad dentro del FormData. */
export const REPORT_VISIBILITY_FIELD_PREFIX = "show-";

/**
 * Qué puede ver el cliente, agrupado por la pregunta que responde cada parte
 * del reporte. El orden sigue al del propio reporte, de arriba abajo.
 */
export const REPORT_VISIBILITY_GROUPS: ReportVisibilityGroup[] = [
  {
    title: "Cifras principales",
    options: [
      {
        section: "headline",
        label: "Personas alcanzadas",
        description: "La cifra grande de la portada del reporte",
      },
      {
        section: "plays",
        label: "Reproducciones",
        description: "Total de reproducciones del lanzamiento",
      },
      {
        section: "engagement",
        label: "Interacciones",
        description: "Interacciones, comentarios y compartidos",
      },
      {
        section: "investment",
        label: "Inversión",
        description:
          "Lo gastado y el % del presupuesto, en todo el reporte y en el del artista",
      },
    ],
  },
  {
    title: "Gráficas y plataformas",
    options: [
      {
        section: "growth",
        label: "Cómo fue creciendo",
        description: "Gráfica de reproducciones por día",
      },
      {
        section: "platforms",
        label: "Dónde te vieron",
        description: "Comparación de las reproducciones entre plataformas",
      },
      {
        section: "platformDetails",
        label: "Cada plataforma en detalle",
        description: "Todas las métricas de cada cuenta",
      },
      {
        section: "adPreview",
        label: "Vista del anuncio",
        description: "Maqueta del creativo con la portada del lanzamiento",
      },
    ],
  },
  {
    title: "Público",
    options: [
      {
        section: "regions",
        label: "Regiones",
        description: "De qué regiones vino la gente que vio la pauta",
      },
      {
        section: "gender",
        label: "Sexo",
        description: "Reparto de la audiencia por sexo",
      },
      {
        section: "age",
        label: "Edad",
        description: "Reparto de la audiencia por franja de edad",
      },
    ],
  },
  {
    title: "Otros lanzamientos",
    options: [
      {
        section: "artistReport",
        label: "Reporte consolidado del artista",
        description:
          "Enlace a todos los lanzamientos del artista; apagado, esa página no se abre",
      },
    ],
  },
];
