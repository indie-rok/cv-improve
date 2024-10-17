import { NextResponse, NextRequest } from "next/server";
import { sendOpenAi } from "@/libs/gpt";
import improveAndGenerateCoverLetter from "@/prompts/improveCVandGenerateCoverLetter";

export async function POST(req: NextRequest) {
  const { rawCV, jobDescription } = await req.json();

  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant that improves CVs and generates cover letters.",
    },
    {
      role: "user",
      content: improveAndGenerateCoverLetter(rawCV, jobDescription),
    },
  ];

  try {
    const response = await sendOpenAi(messages, "1", 16384); // Assuming userId is 1 for simplicity

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating improved CV:", error);
    return NextResponse.json(
      { error: "Failed to generate improved CV" },
      { status: 500 }
    );
  }
}
