import type { SupabaseClient } from "@supabase/supabase-js";
import type { NominaCampaignSpend } from "@/domain/entities/nomina-campaign-spend";
import type { NominaEnrollment } from "@/domain/entities/nomina-enrollment";
import type { NominaClientExpense } from "@/domain/entities/nomina-expense";
import type { NominaClientMovement } from "@/domain/entities/nomina-movement";
import type { NominaRepository } from "@/domain/interfaces/nomina-repository";
import { createSupabaseNominaCampaignSpendRepository } from "@/infrastructure/repositories/supabase-nomina-campaign-spend-repository";
import { createSupabaseNominaEnrollmentRepository } from "@/infrastructure/repositories/supabase-nomina-enrollment-repository";
import { createSupabaseNominaLedgerRepository } from "@/infrastructure/repositories/supabase-nomina-ledger-repository";
import { buildArtistFacts } from "@/infrastructure/sample-data/nomina/build-artist-facts";
import { buildNominaCalendar } from "@/infrastructure/sample-data/nomina/build-nomina-calendar";
import { buildNominaFinance } from "@/infrastructure/sample-data/nomina/build-nomina-finance";
import { buildSampleOverview } from "@/infrastructure/sample-data/nomina/build-sample-overview";
import { buildSampleProfile } from "@/infrastructure/sample-data/nomina/build-sample-profile";
import { buildSampleRosterEntry } from "@/infrastructure/sample-data/nomina/build-sample-roster";
import { enrollmentToSpec } from "@/infrastructure/sample-data/nomina/enrollment-to-spec";
import { groupArtistCampaigns } from "@/utils/group-artist-campaigns";
import { resolveFinancePeriod } from "@/utils/resolve-finance-period";

/**
 * Nómina sobre los clientes reales: los artistas son los clientes inscritos
 * en `client_payroll` y sus cifras salen de `nomina_incomes` y
 * `nomina_expenses`, con el reparto que quedó guardado en cada ingreso. El
 * gasto de sus campañas de AdsME (vista `nomina_campaign_spend`) se descuenta
 * del presupuesto de Ads como un gasto más.
 */
export function createSupabaseNominaRepository(supabase: SupabaseClient, now: Date): NominaRepository {
  const enrollments = createSupabaseNominaEnrollmentRepository(supabase);
  const ledger = createSupabaseNominaLedgerRepository(supabase);
  const campaignSpend = createSupabaseNominaCampaignSpendRepository(supabase);
  const calendar = buildNominaCalendar(now);

  /** Cifras de cada inscrito con sus propios ingresos y gastos. */
  const toFacts = (items: NominaEnrollment[], incomes: NominaClientMovement[], expenses: NominaClientExpense[], spend: NominaCampaignSpend[]) =>
    items.map((item) => {
      const movements = incomes.filter((income) => income.clientId === item.clientId);
      const own = expenses.filter((expense) => expense.clientId === item.clientId);
      const campaigns = groupArtistCampaigns(spend.filter((row) => row.clientId === item.clientId));
      return buildArtistFacts(enrollmentToSpec(item, movements, own, campaigns, calendar), movements, calendar);
    });

  const loadRoster = async () => {
    const [items, incomes, expenses, spend] = await Promise.all([
      enrollments.listEnrollments(), ledger.listIncomes(), ledger.listExpenses(), campaignSpend.listCampaignSpend(),
    ]);
    return { roster: toFacts(items, incomes, expenses, spend), incomes };
  };

  return {
    async getOverview() {
      return buildSampleOverview((await loadRoster()).roster, calendar);
    },
    async listRoster() {
      return (await loadRoster()).roster.map(buildSampleRosterEntry);
    },
    async getArtistProfile(artistId) {
      const enrollment = await enrollments.getEnrollment(artistId);
      if (!enrollment) return null;
      const [incomes, expenses, spend] = await Promise.all([ledger.listIncomes(), ledger.listExpenses(), campaignSpend.listCampaignSpend()]);
      return buildSampleProfile(toFacts([enrollment], incomes, expenses, spend)[0], calendar);
    },
    async getFinance(selection) {
      const { roster, incomes } = await loadRoster();
      const months = incomes.map((income) => income.assignedMonth).sort();
      const bounds = months.length > 0 ? { first: months[0], last: months[months.length - 1] } : null;
      return buildNominaFinance(roster, resolveFinancePeriod(selection, calendar.currentMonth, bounds), calendar);
    },
  };
}
