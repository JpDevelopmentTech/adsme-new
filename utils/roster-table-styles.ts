/**
 * Columnas fijas del roster: cuando el panel es más estrecho que la tabla
 * (consulta de contenedor), «Cliente» y el «+» se quedan pegados a la izquierda
 * con fondo opaco para que el resto se desplace por debajo.
 */
const STICKY_BASE = "@max-[1000px]:sticky @max-[1000px]:z-10 @max-[1000px]:bg-[#140c26]";

export const ROSTER_STICKY_FIRST_CLASSES = `${STICKY_BASE} @max-[1000px]:left-0 w-[180px] min-w-[180px]`;

export const ROSTER_STICKY_SECOND_CLASSES = `${STICKY_BASE} @max-[1000px]:left-[180px] w-12 min-w-12`;

/** Ancho mínimo de la tabla; debajo de él el panel desplaza en horizontal. */
export const ROSTER_TABLE_MIN_WIDTH_CLASS = "min-w-[1000px]";
