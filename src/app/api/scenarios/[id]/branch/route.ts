import { NextResponse } from "next/server";
import { ReplayRepository } from "@/services/database/replay-repository";
import { BranchGenerationRequestSchema } from "@/lib/validations/scenario-schema";
import { generateBranchScenarios } from "@/services/ai/branch-engine";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: scenarioId } = await params;
    const body = await request.json();
    const parsed = BranchGenerationRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    let replay = await ReplayRepository.getById(parsed.data.replayId);
    if (!replay && parsed.data.replay && parsed.data.replay.id === parsed.data.replayId) {
      replay = await ReplayRepository.save(parsed.data.replay);
    }
    if (!replay) {
      return NextResponse.json(
        { success: false, error: "Replay not found" },
        { status: 404 }
      );
    }

    const parentScenario = replay.scenarios.find((s) => s.id === scenarioId);
    if (!parentScenario) {
      return NextResponse.json(
        { success: false, error: "Parent scenario not found" },
        { status: 404 }
      );
    }

    const parentEvent = parentScenario.timeline.find(
      (e) => e.id === parsed.data.parentEventId
    );
    if (!parentEvent) {
      return NextResponse.json(
        { success: false, error: "Parent event not found" },
        { status: 404 }
      );
    }

    // Generate child branch scenarios
    const childScenarios = await generateBranchScenarios({
      replay,
      parentScenario,
      parentEvent,
      newDecision: parsed.data.newDecision,
      options: parsed.data.options,
    });

    const updatedReplay = await ReplayRepository.addBranch(
      replay.id,
      childScenarios
    );

    return NextResponse.json({
      success: true,
      childScenarios,
      replay: updatedReplay,
    });
  } catch (error: any) {
    console.error("[API Branch error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate branches" },
      { status: 500 }
    );
  }
}
