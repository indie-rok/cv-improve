"use client";

import React from "react";
import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import MarkdownPreview from "@uiw/react-markdown-preview";

const CVEditor = () => {
  const [cvContent, setCvContent] = useState<string>("");
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCV = async () => {
      setLoading(true); // Start loading
      try {
        const response = await apiClient.get<string, { rawCV: string }>("/cv");
        setCvContent(response.rawCV);
        // Resize the textarea after setting the content
        const textarea = document.querySelector("textarea");
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      } catch (error) {
        console.error(error);
        setAlert("Failed to fetch CV.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCV();
  }, []);

  const handleSave = async () => {
    try {
      await apiClient.post("/cv", { content: cvContent });
      setAlert("CV saved successfully!");
    } catch (error) {
      console.error(error);
      setAlert("Failed to save CV.");
    }
  };

  return (
    <div className="p-4 flex">
      {loading ? (
        <div>Loading...</div> // Loading screen
      ) : (
        <>
          <div className="w-1/2">
            {alert && <>{alert}</>}
            <textarea
              className="w-full h-64 p-2 border rounded"
              value={cvContent}
              onChange={(e) => setCvContent(e.target.value)}
              placeholder="Enter your CV in markdown format..."
            />
            <button className="btn mt-2" onClick={handleSave}>
              Save CV
            </button>
          </div>
          <div className="w-1/2 pl-4">
            <MarkdownPreview
              source={cvContent}
              style={{ padding: 16, background: "white", color: "black" }}
              components={{
                li: ({ children }) => (
                  <li style={{ listStyleType: "square" }}>{children}</li>
                ),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CVEditor;
