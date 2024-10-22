"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/libs/api";
import slugify from "@/libs/slugiy";
import showdown from "showdown";
import styles from "./styles.module.css";
const { setFlavor, Converter } = showdown;
import { version, GlobalWorkerOptions, getDocument } from "pdfjs-dist";

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;

GlobalWorkerOptions.workerSrc = workerSrc;

function parseMarkdownToHtml(markdown: string) {
  setFlavor("github");
  const options = {
    prefixHeaderId: false,
    ghCompatibleHeaderId: true,
  };

  const converter = new Converter(options);

  return converter.makeHtml(markdown);
}

const UploadCVPage = () => {
  const [imagesSend, setImagesSend] = useState([]);
  const [cvContent, setCvContent] = useState<string>("");

  const generatePdf = async () => {
    const fileName = `cv_good_.pdf`;

    const response = await fetch("/api/convert-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ improvedCV: cvContent }),
    });

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = slugify(fileName);
    link.click();
  };

  const handlePDFUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert PDF to images
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result as ArrayBuffer);
        const pdf = await getDocument(typedArray).promise;
        const images = [];

        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const viewport = page.getViewport({ scale: 3 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
        }
        setImagesSend(images);
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const sendCV = async () => {
    const { formatCV } = await apiClient.post<string, { formatCV: string }>(
      "/transform-pdf",
      {
        cv: imagesSend,
      }
    );
    setCvContent(formatCV);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Upload Your CV</h1>
      {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".pdf"
            onChange={handlePDFUpload}
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
          <button className="btn btn-primary" onClick={sendCV}>
            Upload PDF
          </button>
        </div>
      </div>

      <div className="flex flex-row ">
        <div className="w-1/2">
          <textarea
            className="w-full h-64 p-2 border rounded"
            value={cvContent}
            onChange={(e) => setCvContent(e.target.value)}
            placeholder="Enter your CV in markdown format..."
          />
          <button className="btn mt-2">Save CV</button>
        </div>
        <div className="w-1/2 pl-4">
          <button onClick={generatePdf}>PDF</button>
          <div
            className={styles["preview-cv"]}
            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(cvContent) }}
          />
        </div>
      </div>
    </>
  );
};

export default UploadCVPage;
