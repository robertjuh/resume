import { Skill } from '../models/content';
const professional = 'Professional experience' as const;
const personal = 'Personal projects & tooling' as const;
const exploring = 'Exploring next' as const;
export const skills: readonly Skill[] = [
  { name: 'Angular', context: professional, description: 'Frontend development on professional ERP and business applications at WDD / Fresh-IQ and Colijn IT.', experienceIds: ['wdd', 'colijn'], projectIds: ['colijn-erp', 'fresh-iq-wdd'] },
  { name: 'TypeScript', context: professional, description: 'A core language across my professional frontend and fullstack work.', experienceIds: ['wdd', 'colijn'], projectIds: ['colijn-erp', 'fresh-iq-wdd'] },
  { name: 'JavaScript', context: professional, description: 'Professional web application development across frontend and backend roles.', experienceIds: ['wdd', 'colijn'], projectIds: ['colijn-erp', 'fresh-iq-wdd'] },
  { name: 'Node.js', context: professional, description: 'Backend development as part of my fullstack role at WDD / Fresh-IQ.', experienceIds: ['wdd'], projectIds: ['fresh-iq-wdd'] },
  { name: 'NestJS', context: professional, description: 'Backend work using NestJS in the WDD / Fresh-IQ application stack.', experienceIds: ['wdd'], projectIds: ['fresh-iq-wdd'] },
  { name: 'REST APIs', context: professional, description: 'API development and integration in my web-development background, with further API integration practice in personal projects.', experienceIds: [], projectIds: ['economic-dashboard'] },
  { name: 'Google Cloud', context: professional, description: 'Worked with service accounts, Cloud SQL, BigQuery, Firestore and logging in Google Cloud at WDD / Fresh-IQ, including writing SQL queries.', experienceIds: ['wdd'], projectIds: ['fresh-iq-wdd'] },
  { name: 'Version control', context: professional, description: 'GitHub and GitLab at WDD / Fresh-IQ; SVN and Jira at Colijn IT.', experienceIds: ['wdd', 'colijn'], projectIds: ['colijn-erp', 'fresh-iq-wdd'] },
  { name: 'PHP', context: professional, description: 'PHP template customization and dynamic WordPress content at VHBP, alongside personal PHP / Symfony projects.', experienceIds: ['vhbp'], projectIds: ['economic-dashboard'] },
  { name: 'Tabris / Cordova', context: professional, description: 'Cross-platform order-signature application work at Colijn IT.', experienceIds: ['colijn'], projectIds: ['colijn-erp'] },
  { name: 'Symfony', context: personal, description: 'Hands-on experience through personal projects and three SymfonyCasts courses. I am interested in learning more about Symfony.', experienceIds: [], projectIds: ['economic-dashboard'] },
  { name: 'Doctrine ORM', context: personal, description: 'Storing market data with Doctrine ORM in my PHP / Symfony dashboard.', experienceIds: [], projectIds: ['economic-dashboard'] },
  { name: 'Twig', context: personal, description: 'Twig templates for presenting market data and economic indicators in my PHP / Symfony dashboard.', experienceIds: [], projectIds: ['economic-dashboard'] },
  { name: 'Stimulus', context: personal, description: 'Interactive news filtering with Stimulus in my PHP / Symfony dashboard.', experienceIds: [], projectIds: ['economic-dashboard'] },
  { name: 'Tailwind CSS', context: personal, description: 'Responsive styling for my PHP / Symfony dashboard with Tailwind CSS.', experienceIds: [], projectIds: ['economic-dashboard'] },
  ...['Claude Code', 'Codex', 'Cursor'].map(name => ({ name, context: personal, description: 'I have used and experimented with ' + name + ' as an AI-assisted development tool. I am interested in its use for debugging, code generation, refactoring and exploring unfamiliar codebases.', experienceIds: [], projectIds: [] })),
  { name: 'CI/CD', context: professional, description: 'Used and maintained CI/CD pipelines across multiple applications, including GitLab pipelines for BEX at Fresh-IQ / WDD.', experienceIds: ['wdd'], projectIds: ['fresh-iq-wdd'] },
  { name: 'n8n', context: professional, description: 'Used n8n for a WordPress SEO workflow at VHBP, integrating several SEO-related APIs.', experienceIds: ['vhbp'], projectIds: [] },
  { name: 'WordPress', context: professional, description: 'WordPress customization at VHBP using PHP templates, ACF/custom fields, WP_Query and taxonomies, plus JavaScript interactions and responsive CSS/layout fixes.', experienceIds: ['vhbp'], projectIds: [] },
  { name: 'React', context: exploring, description: 'Interested in learning React and comparing its approach to building interfaces with my Angular experience.', experienceIds: [], projectIds: [] },
  { name: 'Laravel', context: exploring, description: 'Interested in learning Laravel and exploring another approach to PHP web development.', experienceIds: [], projectIds: [] },
  { name: 'Vue', context: exploring, description: 'Interested in learning Vue and comparing its approach to building interfaces with my Angular experience.', experienceIds: [], projectIds: [] },
  { name: 'Software design patterns', context: exploring, description: 'Interested in learning more about software design patterns and when to apply them to keep code clear and maintainable.', experienceIds: [], projectIds: [] },
  { name: 'RAG', context: exploring, description: 'Interested in learning more about Retrieval-Augmented Generation (RAG) and how it is used in applications.', experienceIds: [], projectIds: [] },
  { name: 'LLM integration', context: exploring, description: 'Interested in learning how to integrate language models into existing applications and build reliable behavior around them.', experienceIds: [], projectIds: [] },
  { name: 'AI agents & tool use', context: exploring, description: 'Interested in exploring how AI agents use tools and how to evaluate AI-generated outputs.', experienceIds: [], projectIds: [] },
  { name: 'API & system design', context: exploring, description: 'Exploring REST, GraphQL and gRPC trade-offs, service boundaries, event-driven communication, real-time systems, consistency and scalability.', experienceIds: [], projectIds: [] }
];
export const skillGroups = [professional, personal, exploring] as const;

export const aiTooling = {
  title: 'AI & Developer Tooling',
  introduction: "I experiment with Claude Code, Codex and Cursor as AI-assisted development tools. I am also interested in learning more about RAG.",
  workflows: 'My tooling interests include debugging, code generation, refactoring, exploring unfamiliar codebases and accelerating development.'
} as const;

export const learningInterests = {
  title: 'Frameworks & software design',
  introduction: "I have professional experience with Angular and want to learn more about React, Symfony, Laravel and Vue, as well as software design patterns."
} as const;
