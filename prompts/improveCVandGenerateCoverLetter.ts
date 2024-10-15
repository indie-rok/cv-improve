export default function ImproveAndGenerateCoverLetter(
  rawCV: string,
  jobDescription: string
): string {
  return `Improve the following CV to match the job description by highlighting relevant skills, experiences, and achievements. Add measurable key metrics where applicable. Also, generate a personalized cover letter that addresses the job requirements and explains why the candidate is a good fit for the position.
  
  CV: ${rawCV}
  
  Job Description: ${jobDescription}
  
  Return the response in JSON format with the following structure:
  {
    "improvedCV": "Improved CV content in Markdown format",
    "coverLetter": "Cover letter content in Markdown format"
  }
  
  I want the output to of objects as described and only that. No extra characters. No '''json '''output. Only the text ready to be parsed by JSON.parse() without any additional text or formatting.
`;
}
