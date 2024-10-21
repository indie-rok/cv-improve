export function transcriptCV(images: string[]) {
  return [
    {
      role: "system",
      content:
        "You are an excelent writter that transcribes images to text. Attention to detail is required and no errors allowed",
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `
              This images are a CV. Transcript images to text in a more organized output with the  template I will provide you, dont change any on the content. You just want to change the organization of the CV. I want the output on md format

            TEMPLATE:
            1. **Header:**
            - Name: Use a bold, larger font.
            - Job Title: Italicized below the name.
            - Contact Information: Phone number, email, location.

            2. **Personal Statement:**
            - A brief paragraph summarizing professional goals and key skills.

            3. **Academic Background:**
            - Use a heading.
            - List education details in reverse chronological order.
            - Include institution name, degree, location, and dates.
            - Add bullet points for relevant coursework.

            4. **Professional Experience:**
            - Use a heading.
            - List work experiences in reverse chronological order.
            - For each job, include company name, job title, location, and dates.
            - Use bullet points to describe responsibilities and achievements.

            5. **Associative Experience:**
            - Use a heading
            - Include volunteer roles or association involvement.
            - Provide association name, role, location, and dates.
            - Briefly describe contributions.

            6. **Skills:**
            - Use a heading.
            - List languages with proficiency levels.
            - Include technical skills/software proficiency.

            7. **Interests:**
            - Use a heading for "Centres d’Intérêts."
            - List relevant hobbies or interests.

            **Markdown Formatting:**
            - Use # for main headings, ## for subheadings  and ### for a point in a subheding like a company name in a profesional experience
            - Italics for job title using *.
            - Bullet points with -.
            - Dont add ** to headings as # is already a heading
            
            OUTPUT:
            Detect the language of the CV and output on the same language.I want the output like mark down text. Only UTF-8 encoded characters. No extra characters. No '''markdown '''output without any additional text or formatting.
              `,
        },
        ...images.map((base64Image) => ({
          type: "image_url",
          image_url: {
            url: base64Image,
          },
        })),
      ],
    },
  ];
}
