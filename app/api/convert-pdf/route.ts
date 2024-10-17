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
        border: {
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
        },
      },
    };

    const pdf = await convert(options);

    const pdfBuffer = await fs.readFile(pdf);

    const dateNow = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    const fileName = `cv_${dateNow}.pdf`;

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
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
