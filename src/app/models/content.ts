export interface Link { readonly label: string; readonly url: string }
export interface Screenshot { readonly src: string; readonly alt: string; readonly caption: string }
export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly companyContext?: string;
  readonly sources?: readonly Link[];
  readonly screenshots: readonly Screenshot[];
}
export type ProjectCategory = 'Personal' | 'Professional';
export interface WalkthroughStep { readonly title: string; readonly description: string; readonly items: readonly string[] }
export interface Project {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly label: string;
  readonly description: string;
  readonly overview: readonly string[];
  readonly technologies: readonly string[];
  readonly relatedExperience: readonly string[];
  readonly screenshots: readonly Screenshot[];
  readonly liveUrl?: string;
  readonly walkthrough?: readonly WalkthroughStep[];
  readonly technicalDetails: readonly string[];
  readonly contributions?: readonly { readonly title: string; readonly description: string }[];
  readonly role?: string;
  readonly challenges?: readonly string[];
  readonly learnings?: readonly string[];
  readonly repositoryUrl?: string;
}
export interface Skill {
  readonly name: string;
  readonly context: 'Professional experience' | 'Personal projects & tooling' | 'Exploring next';
  readonly description: string;
  readonly experienceIds: readonly string[];
  readonly projectIds: readonly string[];
}
export interface Education { readonly title: string; readonly institution: string; readonly period: string; readonly completion?: string }
export interface MediaLink extends Link { readonly embedUrl: string }
export interface Interest { readonly name: string; readonly detail: string; readonly icon: string; readonly links?: readonly MediaLink[] }


export interface ProfilePhoto {
  readonly src: string;
  readonly srcset: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface EngineeringNote {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly paragraphs: readonly string[];
}
