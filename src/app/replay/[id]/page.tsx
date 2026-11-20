import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { TimelineCanvas } from "@/components/replay-canvas/TimelineCanvas";
import { ReplayRepository } from "@/services/database/replay-repository";
import { SHOWCASE_REPLAY } from "@/services/ai/showcase-data";

export default async function ReplayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let replay = await ReplayRepository.getById(id);

  if (!replay) {
    if (id === "replay_showcase_career_choice" || id === "demo") {
      replay = SHOWCASE_REPLAY;
    } else {
      notFound();
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <TimelineCanvas initialReplay={replay} />
      </main>
    </>
  );
}
