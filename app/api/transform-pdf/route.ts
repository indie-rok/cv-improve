import { NextResponse, NextRequest } from "next/server";
import { sendOpenAi } from "@/libs/gpt";
import { transcriptCV } from "@/prompts/transcriptCV";

export async function POST(req: NextRequest) {
  const { cv } = await req.json();
  try {
    const formatCV = await sendOpenAi(transcriptCV(cv), "1", 16000, 0.8);
    return NextResponse.json({ formatCV });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
