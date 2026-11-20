import { Navbar } from "@/components/shared/Navbar";
import { LandingView } from "@/components/landing/LandingView";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LandingView />
      </main>
    </>
  );
}
