import { Navbar } from "@/components/shared/Navbar";
import { ReplayClientLoader } from "@/components/replay-canvas/ReplayClientLoader";
import { ReplayRepository } from "@/services/database/replay-repository";
import { SHOWCASE_REPLAY } from "@/services/ai/showcase-data";

export const dynamic = "force-dynamic";

export default async function ReplayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let replay = await ReplayRepository.getById(id);

  if (!replay && (id === "replay_showcase_career_choice" || id === "demo")) {
    replay = SHOWCASE_REPLAY;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <ReplayClientLoader replayId={id} initialReplay={replay} />
      </main>
    </>
  );
}
