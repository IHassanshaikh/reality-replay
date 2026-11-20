import { Navbar } from "@/components/shared/Navbar";
import { CompareFuturesView } from "@/components/comparison/CompareFuturesView";

export default async function ComparePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <CompareFuturesView replayId={id} />
      </main>
    </>
  );
}
