import { Navbar } from "@/components/shared/Navbar";
import { DashboardView } from "@/components/dashboard/DashboardView";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <DashboardView />
      </main>
    </>
  );
}
