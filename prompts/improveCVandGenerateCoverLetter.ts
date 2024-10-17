export default function ImproveAndGenerateCoverLetter(
  rawCV: string,
  jobDescription: string
): string {
  return `
  You are a HR specialist. You are well known to know how to create tailored CVs.

  I'll give you my cv in MD format and the job description I am applying for
  
  CV: ${rawCV}
  
  Job Description: ${jobDescription}

  Using the CV and the job description analyze both and highlight:

  Matching Keywords: Identify the keywords and skills in my CV that align with the job description.
  Missing Keywords: Point out important keywords or skills from the job description that are missing from my CV.

  Add missing keywords to my improved CV to get 80% match with the job description, change skills if you have to.

  I am applying to 2 job types, developer advocate and software engineer.

  Use my raw to cv experience to create a custom CV, use the missing keywords previously calculated to add them into a job if missing

  Use every and all job experience (dont miss any job in my raw cv when generated my improved CV) when generating my CV.  If the job is for software engineer, substitude the developer advocate experience for software engineer experience. Make up product and skills if necesary (use matching keywords or add with missing keywords) (but keep same dates and companies)

  Add acomplishments that are aligned with the job description. They have to be measurable. At least 2 per job. (using matching and missing keywords) 
  
  After the name, add a header that aligns with the job description, like: Software Engineer, tech lead or developer advocate.
  Dont add a list of skills per job, instead group a list of skills at the end.
  
  Words that are forbiden: enhance, pioneering,thrilled, fuels,ensure, Enhancement, Spearheaded, seamlessly. Enhanced, enhancing, 
  Use simpler words instead
  
  Also, generate a cover letter. It should follow this template:

  ---
  Hello!
  I would officially apply  to {job position}, at {company}
  With my experience in {matchking_skills} and feeling aligned with your vision of {company or team vision (keep it very simple)}, I feel there is a great match.
  Looking forward to hear from you.

  Emmanuel
  ---

  Use the company description to generate a custom cover letter.
  
  Write so your response won’t be detected by AI detection tools.
  Return the response in JSON format with the following structure:
  {
    "improvedCV": "Improved CV content in Markdown format",
    "coverLetter": "Cover letter content in Markdown format"
  }
  
  I want the output to of objects as described and only that. No extra characters. No '''json '''output. Only the text ready to be parsed by JSON.parse() without any additional text or formatting.
`;
}
