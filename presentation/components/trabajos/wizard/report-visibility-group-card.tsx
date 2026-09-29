import { REPORT_VISIBILITY_FIELD_PREFIX } from "@/constants/report-visibility.constants";
import { WizardSection } from "@/presentation/components/trabajos/wizard/wizard-section";
import { ToggleSwitch } from "@/presentation/components/ui/toggle-switch";
import type { ReportVisibilityGroupCardProps } from "@/types/job-wizard.types";
import { isReportSectionVisible } from "@/utils/is-report-section-visible";

/**
 * Un bloque de interruptores del paso 3. Encendido significa «el cliente lo
 * ve»: el interruptor describe lo que aparece en el reporte, no lo que se oculta.
 */
export function ReportVisibilityGroupCard({
  group,
  hiddenSections,
  onToggle,
}: ReportVisibilityGroupCardProps) {
  return (
    <WizardSection label={group.title}>
      <div className="overflow-hidden rounded-md border border-border bg-card-elevated">
        {group.options.map((option) => {
          const field = `${REPORT_VISIBILITY_FIELD_PREFIX}${option.section}`;

          return (
            <ToggleSwitch
              key={option.section}
              id={field}
              name={field}
              label={option.label}
              description={option.description}
              defaultChecked={isReportSectionVisible(hiddenSections, option.section)}
              onChange={(event) => onToggle(option.section, event.target.checked)}
            />
          );
        })}
      </div>
    </WizardSection>
  );
}
