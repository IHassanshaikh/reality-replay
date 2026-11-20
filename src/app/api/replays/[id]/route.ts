import { NextResponse } from "next/server";
import { ReplayRepository } from "@/services/database/replay-repository";

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

    return NextResponse.json({ success: true, replay });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch replay" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await ReplayRepository.delete(id);

    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete replay" },
      { status: 500 }
    );
  }
}
