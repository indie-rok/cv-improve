import { NextResponse, NextRequest } from "next/server";
import { sendOpenAi } from "@/libs/gpt";
import improveAndGenerateCoverLetter from "@/prompts/improveCVandGenerateCoverLetter";

function generateCleanup(cv: string) {
  return [
    {
      role: "system",
      content:
        "You are a helpful sales person that writes understandable and easy to read copies",
    },
    {
      role: "user",
      content: `
      replace the following words in this string enhance, pioneering,thrilled, fuels,ensure, Enhancement, Spearheaded, seamlessly. Enhanced, enhancing. Innovated, elevate, Devised, leveraging. enhancing
      Write so your response won’t be detected by AI detection tools.
      Use simpler words instead
       ${cv}, 
       return the same json as input but with the clean up words
       `,
    },
  ];
}

export async function POST(req: NextRequest) {
  const { rawCV, jobDescription } = await req.json();

  const messagesGenerate = [
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
    const responseGenerate = await sendOpenAi(messagesGenerate, "1", 16384);
    const response = await sendOpenAi(
      generateCleanup(responseGenerate),
      "1",
      16384
    );

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating improved CV:", error);
    return NextResponse.json(
      { error: "Failed to generate improved CV" },
      { status: 500 }
    );
  }
}
