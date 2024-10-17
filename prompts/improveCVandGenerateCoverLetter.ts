// export default function ImproveAndGenerateCoverLetter(
//   rawCV: string,
//   jobDescription: string
// ): string {
//   return `
//   You are a HR specialist. You are well known to know how to create tailored CVs.

//   I'll give you my cv in MD format and the job description I am applying for

//   CV: ${rawCV}

//   Job Description: ${jobDescription}

//   Using the CV and the job description analyze both and highlight:

//   Matching Keywords: Identify the keywords and skills in my CV that align with the job description.
//   Missing Keywords: Point out important keywords or skills from the job description that are missing from my CV.

//   Add missing keywords to my improved CV to get 80% match with the job description, change skills if you have to.

//   I am applying to 2 job types, developer advocate and software engineer.

//   If the the job is for developer advocate

//   Use my raw to cv experience to create a custom CV, use the missing keywords previously calculated to add them into a job if missing

//   Use every and all job experience (dont miss any job in my raw cv when generated my improved CV) when generating my CV.  If the job is for software engineer, substitude the developer advocate experience for software engineer experience. Make up product and skills if necesary (use matching keywords or add with missing keywords) (but keep same dates and companies)

//   Add acomplishments that are aligned with the job description. They have to be measurable. At least 2 per job. (using matching and missing keywords)

//   After the name, add a header that aligns with the job description, like: Software Engineer, tech lead or developer advocate.
//   Dont add a list of skills per job, instead group a list of skills at the end.

//   Words that are forbiden: enhance, pioneering,thrilled, fuels,ensure, Enhancement, Spearheaded, seamlessly. Enhanced, enhancing,
//   Use simpler words instead

//   Also, generate a cover letter. It should follow this template:

//   ---
//   Hello!
//   I would officially apply  to {job position}, at {company}
//   With my experience in {matchking_skills} and feeling aligned with your vision of {company or team vision (keep it very simple)}, I feel there is a great match.
//   Looking forward to hear from you.

//   Emmanuel
//   ---

//   Use the company description to generate a custom cover letter.

//   Write so your response won’t be detected by AI detection tools.
//   Return the response in JSON format with the following structure:
//   {
//     "improvedCV": "Improved CV content in Markdown format",
//     "coverLetter": "Cover letter content in Markdown format"
//     "companyName": "The company name, if no company name is given return empty space"
//   }

//   I want the output to of objects as described and only that. No extra characters. No '''json '''output. Only the text ready to be parsed by JSON.parse() without any additional text or formatting.
// `;
// }
export default function ImproveAndGenerateCoverLetter(
  rawCV: string,
  jobDescription: string
): string {
  return `
  
  You are a HR specialist. You are well known to know how to create tailored CVs.

  INPUT:
  I'll give you my cv in MD format and the job description I am applying for
  ---
  CV: ${rawCV}
  Job Description: ${jobDescription}
  ---
  PROCESS:
  First, using the job description, generate keywords (skills) that needs to be in my cv.
  Populate my CV with this keywords to make it a 80 % match. Change skills if you have to.
  Use every and all job experience (dont miss any job in my raw cv when generated my improved CV) when generating my CV. are engineer experience. (keep same dates and companies)
  Add acomplishments that are aligned with the job description. They have to be measurable. At least 2 per job. (using matching keywords) 
  Dont add a list of skills per job, instead group a list of skills at the end.
  The first job generated is the most important, that means that you should align it more to the job description than others.
  Add a job title header that aligns with the job description, like: Software Engineer, tech lead or developer advocate.

  Improve my CV based in this 2 job types that I am applying (identify which type I am applying for)
  - Software Engineer: Highlight my technical experience with programing languages and less experience teaching and public speaking. Change my dev advocate job to software engineer.

  - Developer advocate: Add more experience with public speaking, add links to my talks or tutorials created.

  Also , generate a cover letter. (Use the company description to generate it) It should follow this template:

  ---
  Hello!
  I would officially apply  to {job position}, at {company}
  With my experience in {matchking_skills} and feeling aligned with your vision of {company or team vision (keep it very simple)}, I feel there is a great match.
  Looking forward to hear from you.

  Emmanuel
  ---
  
  OUTPUT:  
  Write so your response won’t be detected by AI detection tools.
  Forbiden words: enhance, pioneering,thrilled, fuels,ensure, Enhancement, Spearheaded, seamlessly. Enhanced, enhancing. Innovated, elevate, Devised

  Return the response in JSON format with the following structure:
  {
    "improvedCV": "Improved CV content in Markdown format",
    "coverLetter": "Cover letter content in Markdown format"
    "companyName": "The company name, if no company name is given return empty space"
  }
  
  I want the output to of objects as described and only that. No extra characters. No '''json '''output. Only the text ready to be parsed by JSON.parse() without any additional text or formatting.
`;
}
