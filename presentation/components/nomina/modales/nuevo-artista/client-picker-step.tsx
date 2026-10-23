"use client";

import { Search, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ENROLL_COPY } from "@/constants/nomina-enrollment-copy.constants";
import { NEW_CLIENT_ROUTE } from "@/constants/routes.constants";
import { EligibleClientOption } from "@/presentation/components/nomina/modales/nuevo-artista/eligible-client-option";
import type { ClientPickerStepProps } from "@/types/nomina-modales-artista.types";
import { foldSearchText } from "@/utils/fold-search-text";

/**
 * Paso 1 del alta: elegir el cliente que entra a Nómina. Si no está, se crea
 * en Clientes, que es el único lugar de los datos de identidad.
 */
export function ClientPickerStep({ clients, onPick }: ClientPickerStepProps) {
  const [query, setQuery] = useState("");
  const folded = foldSearchText(query);
  const visible = clients.filter((client) => foldSearchText(`${client.name} ${client.handle}`).includes(folded));
  const emptyText = clients.length === 0 ? ENROLL_COPY.noEligible : ENROLL_COPY.noMatches;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] leading-[1.45] text-text-secondary">{ENROLL_COPY.pickHelp}</p>
      <label className="glass-field flex h-11 items-center gap-2.5 rounded-md px-3.5 focus-within:border-white/40">
        <Search size={16} strokeWidth={1.5} className="text-text-muted" aria-hidden />
        <span className="sr-only">{ENROLL_COPY.searchLabel}</span>
        <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ENROLL_COPY.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" />
      </label>
      {visible.length > 0 ? (
        <ul className="flex max-h-[360px] flex-col gap-2 overflow-y-auto pr-1">
          {visible.map((client) => <EligibleClientOption key={client.id} client={client} onPick={onPick} />)}
        </ul>
      ) : (
        <p className="rounded-md border border-dashed border-border px-4 py-6 text-center text-[13px] text-text-muted">{emptyText}</p>
      )}
      <Link href={NEW_CLIENT_ROUTE} className="flex w-fit items-center gap-2 rounded-pill px-1 text-[13px] text-lilac underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
        <UserPlus size={15} strokeWidth={1.6} aria-hidden />
        {ENROLL_COPY.createClient}
      </Link>
    </div>
  );
}
