import { Education, Interest } from '../models/content';
export const education: readonly Education[] = [
  { title: 'Three completed Symfony courses', institution: 'SymfonyCasts', period: '2026' },
  { title: 'HBO-ICT', institution: 'University of Applied Sciences, Vlissingen', period: '2012 — 2018' },
  { title: 'MBO 4-ICT — Private Digital Researcher', institution: 'ROC Zeeland ICT, Vlissingen', period: '2007 — 2011' }
];
export const certifications = [
  { title: 'Cisco Exploration', year: '2017' },
  { title: 'EXIN Cloud Computing', year: '2017' }
] as const;
export const languages = [
  { name: 'Dutch', level: 'C2' }, { name: 'English', level: 'C1' },
  { name: 'German', level: 'A2' }, { name: 'Russian', level: 'A1' }
] as const;
export const interests: readonly Interest[] = [
  { name: 'Music production', detail: 'Making electronic music with software and hardware instruments, including Circuit Tracks and the Arturia MicroFreak. I enjoy experimenting with synthesizers and MIDI workflows.', icon: 'music', links: [
    { label: 'Dawless synth performance (YouTube)', url: 'https://www.youtube.com/watch?v=MClX0UCTC9c', embedUrl: 'https://www.youtube-nocookie.com/embed/MClX0UCTC9c' },
    { label: 'Fruity Loops track (YouTube)', url: 'https://www.youtube.com/watch?v=8h3LKusQZeA', embedUrl: 'https://www.youtube-nocookie.com/embed/8h3LKusQZeA' },
    { label: 'SoundCloud track', url: 'https://soundcloud.com/rowbird/dont-let-your-dreams-be-sreams', embedUrl: 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Frowbird%2Fdont-let-your-dreams-be-sreams&auto_play=false&visual=true' }
  ] },
  { name: 'Online gaming', detail: 'In my spare time, I enjoy playing Path of Exile 2, Age of Empires III and Dota 2. I find it rewarding to understand new systems and solve complex problems. I try different strategies, learn from mistakes and adapt my approach as situations change.\n\nLeading a guild has also taught me a lot about teamwork and decision-making. In a challenging environment, you need to adapt quickly, communicate clearly and take different people and ideas into account. As a guild leader, I learned to weigh up different proposals, make decisions and clearly explain why we chose a particular approach. What I enjoy most is tackling a difficult challenge together and seeing us improve as a group.', icon: 'game' },
  { name: 'Psychology & philosophy', detail: "I find it interesting how people think and why they make certain choices. Philosophy, including existentialism, connects with that curiosity.\n\nI recognize that same curiosity in programming and games. I enjoy learning new things and want to understand how a system fits together, why a particular approach works and what other possibilities there are.", icon: 'spark' },
  { name: 'Blockchain & market data', detail: 'Curious about blockchain technology: how decentralized protocols, smart contracts and on-chain systems work, and how to visualize market data.', icon: 'layers' },
  { name: 'Language learning', detail: 'I enjoy learning new languages and have learned the Cyrillic alphabet. And yes, programming languages count too, though TypeScript has yet to help me order a coffee.', icon: 'globe' }
];

