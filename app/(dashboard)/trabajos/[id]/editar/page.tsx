import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createListClients } from "@/domain/use-cases/list-clients";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobBasicsForm } from "@/presentation/components/trabajos/wizard/job-basics-form";
import { toClientOptions } from "@/utils/to-client-options";
import { toJobBasicsValues } from "@/utils/to-job-basics-values";

export const metadata: Metadata = { title: "Editar trabajo · adsme" };

export default async function EditarTrabajoPage({
  params,
}: PageProps<"/trabajos/[id]/editar">) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const [job, clients] = await Promise.all([
    createGetJob(createSupabaseJobRepository(supabase))(id),
    createListClients(createSupabaseClientRepository(supabase))(),
  ]);

  if (!job) notFound();

  return (
    <JobBasicsForm
      jobId={job.id}
      title={JOB_WIZARD_COPY.editTitle}
      initialValues={toJobBasicsValues(job)}
      initialCoverUrl={job.coverUrl}
      clientOptions={toClientOptions(clients)}
    />
  );
}
