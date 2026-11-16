import { Injectable, effect, signal } from '@angular/core';
import { dutch } from './nl';

export type Language = 'nl' | 'en';
const storageKey = 'portfolio-language';

function preferredLanguage(): Language {
  try { return localStorage.getItem(storageKey) === 'en' ? 'en' : 'nl'; }
  catch { return 'nl'; }
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly selected = signal<Language>(preferredLanguage());
  readonly language = this.selected.asReadonly();

  constructor() {
    effect(() => {
      const language = this.language();
      document.documentElement.lang = language;
      document.title = this.translate('Robert Walhout -> Fullstack Software Developer');
      const description = 'Robert Walhout, fullstack software developer in Goes, Netherlands. Angular, TypeScript, Node.js and NestJS. Explore my experience and personal projects.';
      document.querySelector('meta[name="description"]')?.setAttribute('content', this.translate(description));
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', this.translate("Enterprise web applications, personal projects, and a few things I'm curious about. Based in Goes, Netherlands."));
      document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'nl' ? 'nl_NL' : 'en_GB');
    });
  }

  setLanguage(language: Language): void {
    this.selected.set(language);
    try { localStorage.setItem(storageKey, language); } catch { /* Language selection also works without browser storage. */ }
  }

  translate(value: string | null | undefined): string {
    if (!value) return '';
    return this.language() === 'nl' ? dutch[value] ?? value : value;
  }
}
