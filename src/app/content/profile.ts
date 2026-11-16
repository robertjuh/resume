import { ProfilePhoto } from '../models/content';
// Public copy curated from docs/ROBERT_WALHOUT_RESUME_CONTENT.md, Part A only.
export const profile = {
  name: 'Robert Walhout',
  title: 'Fullstack Software Developer',
  location: 'Goes, Zeeland, Netherlands',
  shortLocation: 'Goes, Netherlands',
  email: 'robertwalhout@gmail.com',
  introduction: "I'm a software developer based in Goes, Netherlands, with more than seven years of professional experience building web applications.",
  workingStyle: 'My work has included direct customer interaction and translating requirements into functionality. I enjoy investigating how interfaces, APIs and data fit together.',
  focus: 'Most of my work has been in Angular, TypeScript, Node.js and NestJS, particularly on ERP systems and data-heavy business software.',
  summary: 'Fullstack JavaScript/TypeScript developer with over seven years of professional experience in enterprise web applications. Worked on ERP systems for the fresh-produce and home-furnishing industries, using Angular for frontend development and Node.js/NestJS for backend services. Familiar with complex business workflows, data-oriented interfaces, APIs, and working in established development teams.',
  about: "I enjoy projects where there's an interesting system to figure out, whether that's business software, a small market-data tool, or a game I want to play with friends. Outside programming, I make electronic music, play games, and spend time on psychology, philosophy and language learning.",
  opportunity: 'Interested in frontend, backend and fullstack roles in Zeeland, with hybrid or remote work.',
  core: ['Angular', 'TypeScript', 'Node.js', 'NestJS'],
  // TODO(REVIEW): Phone omitted pending explicit public-display preference.
} as const;
export const links = {
  github: 'https://github.com/robertjuh',
  linkedin: 'https://www.linkedin.com/in/robert-walhout-85852849',
  email: 'mailto:robertwalhout@gmail.com',
  portfolio: 'https://www.freerunnl.nl/resume/',
} as const;
export const sections = [
  { id: 'home', label: 'Overview', icon: 'grid' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'competencies', label: 'Core competencies', icon: 'layers' },
  { id: 'projects', label: 'Projects', icon: 'layers' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
] as const;


export const portraits = {
  hero: {
    src: 'assets/profile/portrait-720.webp',
    srcset: 'assets/profile/portrait-360.webp 360w, assets/profile/portrait-720.webp 720w',
    width: 720, height: 1080, alt: 'Portrait of Robert Walhout'
  },
  avatar: {
    src: 'assets/profile/white-shirt-960.webp',
    srcset: '', width: 160, height: 173, alt: ''
  },
  about: [
    {
      src: '',
      srcset: '',
      width: 960, height: 657, alt: 'Robert Walhout in a white shirt'
    }
  ]
} satisfies { hero: ProfilePhoto; avatar: ProfilePhoto; about: readonly ProfilePhoto[] };
