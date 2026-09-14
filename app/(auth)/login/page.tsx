import type { Metadata } from "next";
import { AuthShowcasePanel } from "@/presentation/components/auth/auth-showcase-panel";
import { LoginPanel } from "@/presentation/components/auth/login-panel";

export const metadata: Metadata = {
  title: "Inicia sesión · adsme",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-dvh flex-1">
      <AuthShowcasePanel />
      <LoginPanel initialError={typeof error === "string" ? error : undefined} />
    </div>
  );
}
