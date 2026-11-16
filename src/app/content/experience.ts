import { Experience } from '../models/content';
export const experiences: readonly Experience[] = [
  {
    id: 'wdd', company: 'WDD / Fresh-IQ', role: 'Fullstack JavaScript Web Developer',
    period: 'Feb 2022 — Nov 2025', location: 'Remote',
    summary: 'ERP and business applications for inventory forecasting and market data in the fresh-produce sector.',
    highlights: [
      'Developed across the frontend and backend using Angular, TypeScript, Node.js and NestJS.',
      'Worked with operational data and business workflows, with Google Cloud in the project stack.',
      'Used Git-based development workflows, including GitHub and GitLab.'
    ],
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'Google Cloud', 'GitHub', 'GitLab'],
    companyContext: 'WDD built data-driven software for fresh produce and floriculture, with a focus on forecasting and market information.',
    sources: [{ label: 'Company website', url: 'https://wdd.nl/' }],
    // TODO(REVIEW): Add personal feature examples, architecture and authorized screenshots.
    screenshots: []
  },
  {
    id: 'colijn', company: 'Colijn IT', role: 'Frontend Developer',
    period: 'Jun 2018 — Dec 2021', location: 'Goes, Netherlands',
    summary: 'Angular frontend development on a large ERP application, in a team of approximately 17 developers.',
    highlights: [
      'Contributed to an ERP application covering relationship management, article management, absence management and transactions.',
      'Worked on development and publication of an order-signature application for Android, Windows and Apple platforms.',
      'Collaborated with international colleagues, using SVN and Jira.'
    ],
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'Tabris / Cordova', 'SVN', 'Jira'],
    companyContext: 'Colijn IT develops ERP and related business software for the home-furnishing industry.',
    sources: [{ label: 'Company website', url: 'https://www.colijn-it.nl/en/' }],
    screenshots: []
  },
  {
    id: 'colijn-intern', company: 'Colijn IT', role: 'Web Development Intern',
    period: 'Jun 2017 — Jan 2018', location: 'Goes, Netherlands',
    summary: 'Researched augmented-reality frameworks and developed an AR mobile application prototype.',
    highlights: ['Investigated augmented-reality development frameworks.', 'Developed a prototype augmented-reality mobile application.'],
    technologies: [], screenshots: []
  },
  {
    id: 'vhbp', company: 'VHBP', role: 'Part-time Web Development / Website Customization',
    // TODO(REVIEW): Do not assert an ongoing engagement; confirm end date.
    period: 'Started Oct 2013', location: 'Remote',
    summary: 'Part-time website customization for Van Herk Business Promotions, using PHP.',
    highlights: ['Carried out customization work for a website-development business.'],
    technologies: ['PHP'],
    companyContext: 'VHBP creates and maintains business websites and provides related web design and online marketing services.',
    sources: [{ label: 'Company website', url: 'https://www.vhbp.nl/' }],
    screenshots: []
  }
];
export const earlierExperience = [
  { company: 'Admiraal de Ruyter Ziekenhuis', period: 'Feb — Oct 2011', role: 'IT Service & Support Intern', description: 'Second-line IT service and support internship, followed by holiday work.' },
  { company: 'ROC Zeeland', period: '', role: 'Network Management Intern', description: 'Assisted with network maintenance and employee computer issues.' },
  { company: 'ADZ, Middelburg', period: 'Feb — Jun 2009', role: 'Network Management Intern', description: 'Network maintenance and IT support for staff.' }
] as const;

