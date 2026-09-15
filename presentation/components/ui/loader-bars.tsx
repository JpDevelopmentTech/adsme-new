import { LOADER_BAR_DELAYS } from "@/constants/loader.constants";

/**
 * Indicador de actividad de adsme: las tres barras de la marca, pulsando. Hereda
 * el color del contenedor (`bg-current`), así que sirve igual sobre vidrio claro
 * que sobre el panel de tinta.
 */
export function LoaderBars() {
  return (
    <span aria-hidden className="flex h-7 items-center gap-[5px]">
      {LOADER_BAR_DELAYS.map((delay) => (
        <span
          key={delay}
          style={{ animationDelay: delay }}
          className="animate-loader-bar h-full w-[5px] rounded-pill bg-current"
        />
      ))}
    </span>
  );
}
