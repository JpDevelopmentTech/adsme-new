import { redirect } from "next/navigation";
import { DASHBOARD_ROUTE } from "@/constants/routes.constants";

export default function HomePage() {
  redirect(DASHBOARD_ROUTE);
}
