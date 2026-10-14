import type { ApexOptions } from "apexcharts";
import { NOMINA_CHART_CHROME } from "@/constants/nomina.constants";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/**
 * Opciones comunes de las gráficas de la nómina: sin barra de herramientas ni
 * animaciones, rejilla tenue, rótulos atenuados y tooltip oscuro en pesos.
 */
export function buildNominaChartBase(): ApexOptions {
  return {
    chart: {
      fontFamily: "var(--font-body)",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      background: "transparent",
      foreColor: NOMINA_CHART_CHROME.label,
    },
    grid: { borderColor: NOMINA_CHART_CHROME.grid, strokeDashArray: 0, padding: { left: 4, right: 8 } },
    dataLabels: { enabled: false },
    legend: { show: false },
    theme: { mode: "dark" },
    tooltip: { theme: "dark", y: { formatter: (value: number) => formatExactCurrency(value) } },
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  };
}
