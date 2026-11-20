import { NextResponse } from "next/server";
import { CreateDecisionSchema } from "@/lib/validations/decision-schema";
import { generateScenariosForDecision } from "@/services/ai/scenario-engine";
import { ReplayRepository } from "@/services/database/replay-repository";

export async function GET() {
  try {
    const replays = await ReplayRepository.getAll();
    return NextResponse.json({ success: true, replays });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch replays" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateDecisionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    // Generate scenarios via AI engine (or intelligent simulation fallback)
    const newReplay = await generateScenariosForDecision(parsed.data);
    await ReplayRepository.save(newReplay);

    return NextResponse.json({ success: true, replay: newReplay });
  } catch (error: any) {
    console.error("[API /api/replays POST error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create replay" },
      { status: 500 }
    );
  }
}
