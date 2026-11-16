import { Project } from '../models/content';
export const projects: readonly Project[] = [
  {
    id: 'colijn-erp', number: '04', title: 'Colijn IT - Furniture ERP', category: 'Professional', label: 'Professional experience',
    description: 'Angular frontend development on an ERP system for the furniture industry, covering relationship management, article management, transactions and business workflows.',
    overview: [
      'At Colijn IT, I worked on a large Angular ERP application for the furniture and home-furnishing industry, in a team of approximately 17 developers.',
      'The system covered relationship management, article management, absence management and transactions.',
      'I also contributed to a cross-platform order-signature application for Android, Windows and Apple platforms.'
    ],
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'Tabris / Cordova', 'SVN', 'Jira'],
    relatedExperience: ['colijn'],
    screenshots: [],
    technicalDetails: []
  },
  {
    id: 'fresh-iq-wdd', number: '05', title: 'Fresh-IQ / WDD - Business Applications', category: 'Professional', label: 'Professional experience',
    description: 'Business applications for the fresh-produce sector, combining Angular frontend development with Node.js and NestJS backend work. My Bex work included graph and table components.',
    overview: [
      'At Fresh-IQ / WDD, I developed business applications for the fresh-produce sector, working with Angular and TypeScript on the frontend and Node.js and NestJS on the backend.',
      'The work included inventory-forecasting and market-data applications, with Google Cloud in the project stack.',
      'The screenshot shows Bex, an Angular business dashboard. I worked on its graph and table components to present business figures in charts and tables.'
    ],
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'Google Cloud'],
    relatedExperience: ['wdd'],
    screenshots: [{
      src: 'assets/projects/bex-angular-dashboard.png',
      alt: 'Bex Angular dashboard showing revenue, gross profit and volume graphs above financial results and customer tables.',
      caption: 'Bex at Fresh-IQ / WDD: I worked on the Angular graph and table components.'
    }],
    technicalDetails: []
  },
  {
    id: 'ai-campaign', number: '01', title: 'AI Campaign App', category: 'Personal', label: 'Interactive walkthrough',
    description: 'An AI-assisted RPG campaign project exploring player-driven storytelling, different worlds and an AI game master.',
    overview: [
      'A Dungeons & Dragons-like campaign application I have been developing for playing with friends.',
      'The project explores an AI game master, free-text player actions and configurable campaign settings. Campaigns have been created or tested in fantasy, cyberpunk, science-fiction and horror settings.',
      'The walkthrough below explains the product concept. It does not run AI or simulate responses from the application.'
    ],
    technologies: [], relatedExperience: [], screenshots: [], technicalDetails: [],
    walkthrough: [
      { title: 'Campaign setup', description: 'A campaign begins with its own setting, premise and tone. These choices shape the kind of story the group wants to explore.', items: ['Campaign name and setting', 'Premise and tone', 'Custom instructions'] },
      { title: 'Player actions', description: 'The concept uses free-text player actions, giving players room to describe what they want their character to do.', items: ['Player-driven decisions', 'Solo and multiplayer concept', 'Actions within the campaign setting'] },
      { title: 'AI game master', description: 'An AI game master is the central narration concept: responding to player choices within the campaign world.', items: ['AI-assisted narration concept', 'Campaign settings influence the story', 'Different genres and themes'] },
      { title: 'Campaign context', description: 'Keeping campaign and character information between sessions is a design goal. The exact implementation is not described here.', items: ['Characters and locations', 'Inventory, quests and NPCs', 'Continuity as a design goal'] }
    ]
    // TODO(REVIEW): Confirm delivered features, stack, state handling and screenshots.
  },
  {
    id: 'bitcoin-index', number: '02', title: 'Bitcoin Index', category: 'Personal', label: 'Independent project',
    description: 'Handcoded project combining two datasets through separate APIs: Bitcoin prices from a price API and market sentiment from the Fear and Greed Index API.',
    overview: [
      'Handcoded project combining two datasets through separate APIs: Bitcoin prices from a price API and market sentiment from the Fear and Greed Index API.'
    ],
    technologies: [], relatedExperience: [], screenshots: [], technicalDetails: [],
    liveUrl: 'https://freerunnl.nl/btc-index/#/'
    // TODO(REVIEW): Creation date, stack, API providers, architecture, challenges and repository.
  },
  {
    id: 'economic-dashboard', number: '03', title: 'Economic Data Dashboard', category: 'Personal', label: 'Independent project',
    description: 'A hand-coded PHP/Symfony learning project combining precious metal prices, inflation figures, US labour-market data and financial news through external APIs.',
    overview: [
      'I built this market dashboard by hand as a personal learning project using PHP, Symfony, Twig, Tailwind CSS and TypeScript.',
      'External APIs bring together precious metal prices, inflation figures, US labour-market indicators and financial news in a responsive interface.'
    ],
    technologies: ['PHP', 'Symfony', 'Twig', 'Tailwind CSS', 'TypeScript', 'Stimulus', 'Doctrine ORM', 'REST APIs'],
    relatedExperience: [],
    screenshots: [{
      src: 'assets/projects/market-dashboard.png',
      alt: 'Market dashboard showing gold and silver prices, inflation figures, US labour-market indicators and financial news filters.',
      caption: 'Not perticularly an aesthetic masterpiece, it\'s about the experience.'
    }],
    role: 'Independent development, from backend and API integration to database management and frontend design.',
    technicalDetails: [
      'Interactive news filtering with Stimulus.',
      'Monthly and yearly inflation change calculations.',
      'Market data persistence with Doctrine ORM.'
    ]
    // TODO(REVIEW): Creation date, API providers and repository.
  },
  
];
export const projectFilters = ['All projects', 'Personal', 'Professional'] as const;
export type ProjectFilter = typeof projectFilters[number];

