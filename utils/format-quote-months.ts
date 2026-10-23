import { PLATFORM_FEES_COPY } from "@/constants/quote-platforms-copy.constants";

/** «1 mes» o «{n} meses». */
export function formatQuoteMonths(months: number): string {
  return `${months} ${months === 1 ? PLATFORM_FEES_COPY.month : PLATFORM_FEES_COPY.monthsPlural}`;
}
