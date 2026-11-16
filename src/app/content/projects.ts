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
    description: 'Built a reusable Angular table component for CRUD screens and custom modules. Helped set up a new NestJS backend and bring data-science output to APIs and the frontend.',
    overview: [
      'At Fresh-IQ / WDD, I helped develop BEX, an ERP system for the fresh-produce sector, using Angular and TypeScript on the frontend and Node.js/NestJS on the backend.',
      'The work included inventory-forecasting and market-data applications, with Google Cloud in the project stack.'
    ],
    technologies: ['Angular', 'TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'Google Cloud'],
    relatedExperience: ['wdd'],
    screenshots: [{
      src: 'assets/projects/bex-angular-dashboard.png',
      alt: 'BEX Angular dashboard showing revenue, gross profit and volume graphs above financial results and customer tables.',
      caption: 'BEX at Fresh-IQ / WDD: I worked on the Angular graph and table components.'
    }],
    technicalDetails: [],
    contributions: [
      { title: 'Reusable Angular components', description: 'Designed and built a generic Angular table component to support different CRUD screens and custom modules.' },
      { title: 'NestJS backend', description: 'Helped set up a new NestJS backend from scratch to replace the existing vanilla JavaScript backend.' },
      { title: 'Data-science collaboration', description: 'Worked with data scientists to make their data retrievable through APIs and present it in the frontend.' }
    ]
  },
  {
    id: 'ai-campaign', number: '01', title: 'AI Campaign App', category: 'Personal', label: 'Interactive walkthrough',
    description: 'A locally hosted multiplayer RPG with an AI game master, a shared story screen, individual player actions and persistent campaigns.',
    overview: [
      'A Dungeons & Dragons-like campaign application I have been developing for playing with friends.',
      'Players create characters, join a campaign and submit free-text actions. An AI game master narrates the story while the backend manages game rules and saved state.',
      'Campaigns can be resumed between sessions, with character progress, inventory, world state and turn history stored in SQLite.'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'Fastify', 'SQLite', 'Zod'],
    relatedExperience: [],
    // Add real screenshots in flow order: setup, character creation/joining, player actions, story, resumed campaign.
    screenshots: [],
    technicalDetails: [
      'React frontend with shared TypeScript and Zod schemas for campaign, character and action data.',
      'Node.js/Fastify API for campaign creation, joining, player actions and live updates through server-sent events.',
      'SQLite persists campaign state, character data, turns and journals so sessions can be resumed.'
    ],
    walkthrough: [
      { title: 'Campaign setup', description: 'A campaign begins with its own setting, premise and tone. These choices shape the kind of story the group wants to explore.', items: ['Campaign name and setting', 'Premise and tone', 'Custom instructions'] },
      { title: 'Characters & joining', description: 'Players create a character from a template or a generated concept and join a campaign using an invitation link, session code or QR code.', items: ['Character creation', 'Invite links and session codes', 'Shared story screen and individual player views'] },
      { title: 'Player actions', description: 'Players submit free-text actions through their own view. The application gathers these actions into turns for the AI game master and game engine to resolve.', items: ['Free-text player actions', 'Individual player chats', 'Turn-based play'] },
      { title: 'AI game master', description: 'The AI game master narrates scenes and reacts to player actions. Backend rules handle game state, dice rolls, resources and inventory updates.', items: ['AI narration', 'Backend game rules', 'Shared campaign story'] },
      { title: 'Campaign context', description: 'Campaign settings, characters, inventories, locations, quests, NPCs and turn history are stored in SQLite. Returning players can resume a saved campaign.', items: ['Saved characters and inventory', 'Locations, quests and NPCs', 'Resume a saved campaign'] }
    ]
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
      caption: 'Built to learn: API integrations, data storage and a working dashboard.'
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

