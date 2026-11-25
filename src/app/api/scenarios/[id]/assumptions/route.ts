import { NextResponse } from "next/server";
import { ReplayRepository } from "@/services/database/replay-repository";
import { ScenarioAssumption } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: scenarioId } = await params;
    const { replayId, assumptions, replay: clientReplay } = await request.json();

    if (!replayId || !assumptions || !Array.isArray(assumptions)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    let updated = await ReplayRepository.updateAssumptions(
      replayId,
      scenarioId,
      assumptions as ScenarioAssumption[]
    );

    if (!updated && clientReplay && clientReplay.id === replayId) {
      await ReplayRepository.save(clientReplay);
      updated = await ReplayRepository.updateAssumptions(
        replayId,
        scenarioId,
        assumptions as ScenarioAssumption[]
      );
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Replay or scenario not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, replay: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update assumptions" },
      { status: 500 }
    );
  }
}
