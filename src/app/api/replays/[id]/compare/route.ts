import { NextResponse } from "next/server";
import { ReplayRepository } from "@/services/database/replay-repository";
import { generateComparison } from "@/services/ai/comparison-engine";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const replay = await ReplayRepository.getById(id);

    if (!replay) {
      return NextResponse.json(
        { success: false, error: "Replay not found" },
        { status: 404 }
      );
    }

    const comparison = await generateComparison(replay);
    return NextResponse.json({ success: true, comparison, replay });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to compare scenarios" },
      { status: 500 }
    );
  }
}
