"use client";

import { ChangeEvent } from "react";
import apiClient from "@/libs/api";
import { useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import slugify from "@/libs/slugiy";

export default function CVImprove() {
  const [jobDescription, setJobDescription] = useState(``);
  const [improvedCV, setImprovedCV] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setImprovedCV(e.target.value);
  };

  const generatePdf = async () => {
    const slugifiedName = "emmanuel_orozco";
    const fileName = `cv_${slugifiedName}_${companyName}.pdf`;

    const response = await fetch("/api/convert-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ improvedCV }),
    });

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = slugify(fileName);
    link.click();
  };

  const handleImprove = async () => {
    try {
      setIsLoading(true); // Set loading to true when the process starts

      const { rawCV } = await apiClient.get<string, { rawCV: string }>("/cv");
      const data = await apiClient.post<string, { response: string }>(
        "/improve-cv",
        {
          rawCV,
          jobDescription,
        }
      );

      const result = JSON.parse(data.response);

      setImprovedCV(result.improvedCV);
      setCoverLetter(result.coverLetter);
      setCompanyName(result.companyName);
    } catch (error) {
      console.error("Error improving CV:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the process ends
    }
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 w space-y-4 w-44">
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
            placeholder="Paste the job description here..."
            className="textarea textarea-bordered w-full h-60"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleImprove} className="btn btn-primary flex-1">
            Improve CV and Generate Cover Letter
          </button>
        </div>
        <div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Name
            </label>
            <input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter the company name here..."
              className="input input-bordered w-full"
            />
          </div>
          <label
            htmlFor="improvedCV"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Improved CV
          </label>
          <textarea
            id="improvedCV"
            value={improvedCV}
            onChange={handleInput}
            placeholder="Your improved CV will appear here..."
            className="textarea textarea-bordered w-full h-60"
          />
        </div>
        <div>
          <label
            htmlFor="coverLetter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Generated Cover Letter
          </label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Your generated cover letter will appear here..."
            className="textarea textarea-bordered w-full h-60"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="top-4">
          <div className="sticky flex items-center space-x-4">
            <h2 className="text-xl font-semibold ">CV Preview</h2>
            <button onClick={generatePdf} className="btn btn-secondary">
              Download PDF
            </button>
          </div>
          <div>
            <MarkdownPreview
              source={improvedCV}
              style={{ padding: 16, background: "white", color: "black" }}
              components={{
                li: ({ children }) => (
                  <li style={{ listStyleType: "square" }}>{children}</li>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
