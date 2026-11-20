import { Navbar } from "@/components/shared/Navbar";
import { DecisionWizard } from "@/components/decision-builder/DecisionWizard";

export default function NewReplayPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <DecisionWizard />
      </main>
    </>
  );
}
