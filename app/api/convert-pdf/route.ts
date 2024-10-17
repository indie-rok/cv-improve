import { NextResponse, NextRequest } from "next/server";
import { convert } from "mdpdf";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: NextRequest) {
  try {
    const { improvedCV } = await req.json();

    const filePath = path.join("/tmp", "improvedCV.md");
    await fs.writeFile(filePath, improvedCV);

    const outputFilePath = path.join("/tmp", "improvedCV.pdf");

    // Define options for the convert function
    let options = {
      source: filePath,
      destination: outputFilePath,
      styles: path.join(process.cwd(), "gg.css"),
      pdf: {
        format: "A4",
        orientation: "portrait",
      },
    };

    const pdf = await convert(options);

    const pdfBuffer = await fs.readFile(pdf);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="improvedCV.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
