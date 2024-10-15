"use client";

import apiClient from "@/libs/api";
import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const rawCV = `
# Emmanuel Orozco  
**Based in Paris, 🇫🇷**  
[http://emmanuelorozco.com](http://emmanuelorozco.com/)  

**Lead Software Engineer | Developer Advocate | Professor**  
**Speaks 🇺🇸, 🇪🇸, & 🇫🇷**  

📞 +33 7 45 00 68 92  
✉️ [yo@emmanuelorozco.com](mailto:yo@emmanuelorozco.com)  

---

## Work Experience

### **Developer Advocate | Leroy Merlin**  
*January 2023 – Present*  

**Project: Inner Source Transformation**  
- Organized in-person and online events to evangelize developers on Inner Source projects  
- Created and taught developer training on _contributing to Inner Source projects successfully_  
- Coached engineers on public speaking to improve their presentations

**Project: External Evangelization**  
- Organized and hosted a 500-attendee event: [Dev Summit](https://www.adeo.com/en/press/dev-summit/)  
- Represented Leroy Merlin at external events such as [Devoxx Paris](https://medium.com/@indie_rok/adeo-meets-devoxx-paris-2023-9b9dd2534fa9) and DevFest Lille to showcase digital transformation efforts  

**DevRel Resources**  
- Host: [InnerSource Awards 2024](https://youtu.be/-NIP3bnNTE8?si=0x4N9RzLsvtPapS4&t=1171)  
- Speaker: [Implementing an Educational Program](https://www.youtube.com/watch?v=kGQZFnGFf9o) (InnerSource Summit)  
- Speaker (Spanish): [Blockchain for Front-end Engineers](https://www.youtube.com/watch?v=DSzrjgpxajY) (EventLoop Mexico)  
- Video Tutorial: [Data fetching in React](https://www.youtube.com/watch?v=RidTAIQvjaE&t=17s)  
- Course Creator: [Front End for Python Devs](https://indie-rok.github.io/front-end-for-python-devs/)  
- Blog Post: [ADEO Meets Devoxx 2023](https://medium.com/@indie_rok/adeo-meets-devoxx-paris-2023-9b9dd2534fa9)

---

### **Faculty Professor | Kibo University**  
*January 2023 – January 2024*  
- Taught weekly classes on front-end development to 50 students  
- Created and delivered the [Front End for Python Devs](https://indie-rok.github.io/front-end-for-python-devs/) course  
- Produced video content on front-end development

---

### **Tech Lead | Partoo**  
*March 2022 – January 2023*  
- Led a team of 3 developers to build new features for an existing app  
- Developed features using TypeScript and Python  
- Conducted technical seminars for both technical and non-technical teams  
- Led technical interviews for new hires

---

## Education

**Instituto Politécnico Nacional**  
*Mexico City | 2010 – 2014*  
- Bachelor’s Degree in Computer Science
`;

export default function CVImprove() {
  const [jobDescription, setJobDescription] = useState(`
    ChartMogul (https://chartmogul.com )| Remote | Full-time
Since 2014, we have been building the leading Subscription Analytics Platform for growing SaaS businesses and CRM purpose-built for B2B SaaS teams. We're a remote-first company with 66 team members across 23 different countries. Profitable and self-sustaining since our seed funding.

Read our blog post on our Product Roadmap through 2024: https://chartmogul.com/blog/chartmoguls-product-roadmap-thro...

---

Tech Stack: Ruby, Ruby on Rails, Vue.js, Typescript, Postgres, AWS

- Senior Full Stack Engineer: https://jobs.chartmogul.com/o/senior-full-stack-engineer-del...

- Senior Ruby Engineer, Pipeline team: https://jobs.chartmogul.com/o/senior-ruby-engineer-pipeline-...
    `);
  const [company, setCompany] = useState("");
  const [improvedCV, setImprovedCV] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleImprove = async () => {
    try {
      const data = await apiClient.post<string, { response: string }>("/cv", {
        rawCV,
        jobDescription,
      });

      const result = JSON.parse(data.response);

      console.log(result);

      setImprovedCV(result.improvedCV);
      setCoverLetter(result.coverLetter);
    } catch (error) {
      console.error("Error improving CV:", error);
    }
  };

  const handleDownloadPDF = () => {
    alert("Downloading PDF...");
  };

  const handleSaveJob = () => {
    alert(
      `Job saved as applied:\nCompany: ${company}\nJob Description: ${jobDescription}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 space-y-4">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company
          </label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter the company name"
            className="input input-bordered w-full"
          />
        </div>
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
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="textarea textarea-bordered w-full h-40"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleImprove} className="btn btn-primary flex-1">
            Improve CV and Generate Cover Letter
          </button>
          <button
            onClick={handleSaveJob}
            className="btn btn-outline flex items-center gap-2"
          >
            <FloppyDisk className="w-4 h-4" />
            Save Job as Applied
          </button>
        </div>
        <div>
          <label
            htmlFor="improvedCV"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Improved CV
          </label>
          <textarea
            id="improvedCV"
            value={improvedCV}
            onChange={(e) => setImprovedCV(e.target.value)}
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
        <div className="sticky top-4">
          <h2 className="text-xl font-semibold mb-2">CV Preview</h2>
          <div>
            <MarkdownPreview
              source={improvedCV}
              style={{ padding: 16, background: "white", color: "black" }}
            />
          </div>
          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary w-full"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
