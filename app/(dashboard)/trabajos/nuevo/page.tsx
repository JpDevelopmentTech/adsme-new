import type { Metadata } from "next";
import { EMPTY_JOB_VALUES, JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { createListClients } from "@/domain/use-cases/list-clients";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobBasicsForm } from "@/presentation/components/trabajos/wizard/job-basics-form";
import { toClientOptions } from "@/utils/to-client-options";

export const metadata: Metadata = { title: "Nuevo trabajo · adsme" };

/** Pantalla `B6 · Wizard Paso 1`: datos básicos y portada del trabajo. */
export default async function NuevoTrabajoPage() {
  const repository = createSupabaseClientRepository(
    await createServerSupabaseClient(),
  );
  const clients = await createListClients(repository)();

  return (
    <JobBasicsForm
      title={JOB_WIZARD_COPY.title}
      initialValues={EMPTY_JOB_VALUES}
      clientOptions={toClientOptions(clients)}
    />
  );
}
