import type { NominaArtistCampaign } from "@/domain/entities/nomina-campaign-spend";
import type { NominaEnrollment } from "@/domain/entities/nomina-enrollment";
import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaCalendar, SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";
import { previousMonth } from "@/utils/previous-month";
import { suggestService } from "@/utils/suggest-service";

/**
 * Traduce un cliente inscrito, con sus ingresos y gastos reales, a la forma con
 * la que se arman las vistas de Nómina (con el gasto de sus campañas): shows por mes del calendario e
 * Inversión de Shows del mes anterior al primero (se ejecuta al mes siguiente).
 */
export function enrollmentToSpec(
  enrollment: NominaEnrollment,
  movements: NominaMovement[],
  expenses: NominaExpense[],
  campaigns: NominaArtistCampaign[],
  calendar: NominaCalendar,
): SampleArtistSpec {
  const { config } = enrollment;
  const { split } = config;
  const service = split.hasService ? split.service ?? suggestService(config.nomina, config.minShows) : 0;
  const before = previousMonth(calendar.months[0]);

  return {
    id: enrollment.clientId,
    name: enrollment.name,
    photoUrl: enrollment.avatarUrl,
    nomina: config.nomina,
    minShows: config.minShows,
    service,
    profitPercent: split.profitPercent,
    profitPerShowAfterMin: split.hasScalability ? split.profitPerShowAfterMin : 0,
    adsmeAssumesService: split.hasService && split.servicePayer === "adsme",
    showsByMonth: calendar.months.map((month) => movements.filter((item) => item.concept === "show" && item.assignedMonth === month).length),
    extraIncomes: [],
    previousInvestment: movements
      .filter((item) => item.assignedMonth === before && item.concept !== "express")
      .reduce((total, item) => total + item.split.investment, 0),
    joinedAt: config.startsOn,
    fixedProfitGoal: split.hasFixedProfit ? split.fixedProfit : null,
    socials: enrollment.socials,
    expenses,
    campaigns,
    config,
  };
}
