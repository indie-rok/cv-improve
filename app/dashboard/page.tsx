"use client";

import { ChangeEvent } from "react";
import apiClient from "@/libs/api";
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

**Technologies used**:  
Event organization platforms, Public speaking, Training creation tools  

**Project: External Evangelization**  
- Organized and hosted a 500-attendee event: [Dev Summit](https://www.adeo.com/en/press/dev-summit/)  
- Represented Leroy Merlin at external events such as [Devoxx Paris](https://medium.com/@indie_rok/adeo-meets-devoxx-paris-2023-9b9dd2534fa9) and DevFest Lille to showcase digital transformation efforts  

**Technologies used**:  
Event hosting, Developer evangelism, Public relations  

---

### **Faculty Professor | Kibo University**  
*January 2023 – January 2024*  
- Taught weekly classes on front-end development to 50 students  
- Created and delivered the [Front End for Python Devs](https://indie-rok.github.io/front-end-for-python-devs/) course  
- Produced video content on front-end development  

**Technologies used**:  
JavaScript, React, Python, Video editing software, Content creation tools  

---

### **Tech Lead | Partoo**  
*March 2022 – January 2023*  
- Led a team of 3 developers to build new features for an existing app  
- Developed features using TypeScript and Python  
- Conducted technical seminars for both technical and non-technical teams  
- Led technical interviews for new hires  

**Technologies used**:  
TypeScript, Python, Team leadership, Technical interviews  

---

### **Lead Teacher Software Engineering | Wild Code School**  
*March 2021 – March 2022*  
- Delivered full-stack software engineering curriculum to 15 students  
- Created content (videos, articles, tweets) on tech topics like JavaScript, React, and algorithms  
- Organized in-person and online events to introduce the school’s methodology  
- Collaborated with internal and external teams to enhance the learning experience  
- Coached other teachers on technical and pedagogical skills  

**Technologies used**:  
JavaScript, React, Content creation tools, Public speaking, Teaching methodologies  

---

### **Software Engineer | Trainline**  
*February 2020 – March 2021*  
- Developed new features for web applications (mobile/desktop)  
- Monitored production releases to maintain 99% uptime  
- Paired with other engineers to raise technical standards  

**Technologies used**:  
JavaScript, React, Continuous integration tools, Web development, Production monitoring  

---

### **Software Engineer | Kapten**  
*March 2019 – September 2019*  
- Developed scalable front-end and back-end services using React, Express, and MongoDB  

**Technologies used**:  
React, Express, MongoDB, Node.js, Scalable web development  

---

### **Software Engineer Consultant | Crowdbotics**  
*June 2018 – January 2020*

**Project: Ready 2 Meet**  
- Led a team of 4 developers to create a dating mobile app using React Native, Redux, and Firebase  

**Technologies used**:  
React Native, Redux, Firebase, Mobile app development  

**Project: Constellation**  
- Connected React front-end to an Ethereum back-end using w3.js  
- Developed a high-performance back-end in Python to handle multiple requests per second  

**Technologies used**:  
React, w3.js, Ethereum, Python, Backend development  

---

### **Senior Teacher & Web Developer | Laboratoria**  
*January 2017 – June 2018*  
- Taught JavaScript at a startup focused on empowering women in Latin America through coding  
- Organized hackathons, meetups, and conferences for students  
- Collaborated with an international team to improve JavaScript syllabus for a 6-month intensive course  
- Delivered daily classes to groups of over 100 students  
- Managed junior teachers to enhance their technical and teaching skills  

**Technologies used**:  
JavaScript, HTML, Event organization, Teaching methodologies, Hackathon organization  

---

### **Web Developer & Tech Lead | Pachuco Digital**  
*October 2015 – November 2016*

**Project: Riot Games**  
- Developed a REST API for the World Cup, increasing page views by 60%  
- Designed an HTML client to consume the API  

**Technologies used**:  
REST API development, HTML, JavaScript, Web development  

**Project: Aristegui Noticias**  
- Enhanced team efficiency through improved tech architecture and SCRUM planning  
- Implemented a drag-and-drop builder to boost editor performance  

**Technologies used**:  
SCRUM, JavaScript, HTML, Team collaboration tools  

---

### **Web Developer | Coco MKT**  
*February 2012 – May 2014*  
- Built a video CMS from scratch based on client requirements  
- Designed and developed custom WordPress templates  

**Technologies used**:  
WordPress, PHP, CMS development, Custom template creation  

---

## Technical Skills

- **Programming Languages**: JavaScript, Ruby, Python , Typescript 
- **Data Management**: MongoDB, MySQL, PostgreSQL  
- **Web Frameworks**: Ruby on Rails, React, Node.js, Django , Express 
- **Testing**: Enzyme, React Testing Library, Jest, Capybara, RSpec  
- **Blockchain Development**: web3.js, Ethereum contracts, Ganache, solc  
- **UI/UX Development**: HTML5, CSS, Photoshop

---

## Education

**Instituto Politécnico Nacional**  
*Mexico City | 2010 – 2014*  
- Bachelor’s Degree in Computer Science
`;

export default function CVImprove() {
  const [jobDescription, setJobDescription] = useState(``);
  const [improvedCV, setImprovedCV] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
    setJobDescription(textarea.value);
  };

  const generatePdf = async () => {
    const response = await fetch("/api/convert-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ improvedCV }),
    });

    console.log("response", response);

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "test.pdf";
    link.click();
  };

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
            onChange={handleInput}
            placeholder="Paste the job description here..."
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleImprove} className="btn btn-primary flex-1">
            Improve CV and Generate Cover Letter
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
              components={{
                li: ({ children }) => (
                  <li style={{ listStyleType: "square" }}>{children}</li>
                ),
              }}
            />
          </div>

          <button onClick={generatePdf} className="btn btn-secondary mt-4">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
