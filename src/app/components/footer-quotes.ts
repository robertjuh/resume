import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { footerQuotes } from '../content/footer-quotes';

const storageKey = 'portfolio-footer-quote';

function initialQuoteIndex(): number {
  let previous: string | null = null;
  try { previous = sessionStorage.getItem(storageKey); } catch { /* Storage is optional. */ }
  const candidates = footerQuotes.map((_, index) => index).filter(index => footerQuotes[index] !== previous);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

@Component({
  selector: 'app-footer-quotes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { lang: 'en' },
  template: `
    @for (quote of quotes; track quote; let index = $index) {
      <span class="footer-quote" [class.is-active]="index === activeIndex()"
        [attr.aria-hidden]="index === activeIndex() ? null : 'true'">{{ quote }}</span>
    }
  `,
  styles: `
    :host { display: grid; min-width: 0; max-width: 52ch; }
    .footer-quote {
      grid-area: 1 / 1;
      overflow-wrap: anywhere;
      opacity: 0;
      filter: blur(5px);
      transform: translateY(3px);
      transition: opacity 1200ms ease, filter 1200ms ease, transform 1200ms ease;
    }
    .footer-quote.is-active { opacity: 1; filter: blur(0); transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) {
      .footer-quote, .footer-quote.is-active { transition-property: opacity; filter: none; transform: none; }
    }
  `
})
export class FooterQuotes {
  protected readonly quotes = footerQuotes;
  protected readonly activeIndex = signal(initialQuoteIndex());

  constructor() {
    this.rememberQuote();
    const timer = window.setInterval(() => {
      this.activeIndex.update(index => (index + 1) % footerQuotes.length);
      this.rememberQuote();
    }, 7_000);
    inject(DestroyRef).onDestroy(() => window.clearInterval(timer));
  }

  private rememberQuote(): void {
    try { sessionStorage.setItem(storageKey, footerQuotes[this.activeIndex()]); }
    catch { /* Rotation also works without browser storage. */ }
  }
}
