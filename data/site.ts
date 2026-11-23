// Edit this file only: all team, contact and project details live here.
// Any value containing "[" is treated as a placeholder and is not shown as a link.

export const site = {
  name: "LabGuard AI",
  group: "Group CS 91",
  university: "Informatics Institute of Technology, Sri Lanka",
  module: "AGILE TEAM PROJECT (ATP)",
  supervisor: "Ms. Vishmi Abuldeniya",
  email: "labguardai.team@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/SoapDevX/labguard-ai" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/[PAGE]" },
  ],
};

export type Member = { name: string; linkedin?: string };

export const team: Member[] = [
  { name: "Ruvin De Zoyza", linkedin: "https://www.linkedin.com/in/ruvin-de-zoysa-173079212?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Isuru Cooray", linkedin: "https://www.linkedin.com/in/isurucooray11/" },
  { name: "[Oshana Perera]", linkedin: "https://www.linkedin.com/in/[USERNAME]" },
  { name: "[Sahan]", linkedin: "https://www.linkedin.com/in/[USERNAME]" },
  { name: "[Kavish]", linkedin: "https://www.linkedin.com/in/[USERNAME]" },
];

export const isReal = (s?: string): s is string => !!s && !s.includes("[");
