import { ChangeDetectionStrategy, Component, input } from '@angular/core';
const paths: Record<string, string> = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  briefcase: 'M8 6V4h8v2 M3 7h18v13H3z M3 11l9 4 9-4 M10 14h4',
  layers: 'm12 3 10 5-10 5L2 8z M2 12l10 5 10-5 M2 16l10 5 10-5',
  code: 'm8 7-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-2a8 8 0 0 1 16 0v2',
  mail: 'M3 5h18v14H3z m0 1 9 7 9-7',
  arrow: 'M4 12h15 m-6-6 6 6-6 6',
  external: 'M14 3h7v7 M21 3 10 14 M10 3H3v18h18v-7',
  download: 'M12 3v12 m-5-5 5 5 5-5 M4 16v5h16v-5',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0 M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  chevron: 'm9 5 7 7-7 7',
  close: 'm6 6 12 12 M6 18 18 6',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  music: 'M9 18V5l12-2v13 M9 8l12-2 M9 18c0 4-6 4-6 1s6-4 6-1 M21 16c0 4-6 4-6 1s6-4 6-1',
  game: 'M7 7h10c4 0 6 11 3 12-2 1-5-3-5-3H9s-3 4-5 3C1 18 3 7 7 7 M6 10v5 M3.5 12.5h5 M16 11h.01 M19 14h.01',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
  image: 'M3 3h18v18H3z m0 14 5-5 4 4 3-3 6 6 M9 8h.01',
  check: 'm5 12 4 4L19 6'
};
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (name() === 'linkedin') {
      <img src="assets/brands/linkedin-in-black.png" alt="" aria-hidden="true">
    } @else if (name() === 'github') {
      <img [src]="variant() === 'social' ? 'assets/brands/github-invertocat-black.svg' : 'assets/brands/github-invertocat-white.svg'" alt="" aria-hidden="true">
    } @else if (name() === 'mail' && variant() === 'social') {
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3Zm0 2 9 7 9-7v2l-9 7-9-7V6Z" /></svg>
    } @else {
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name()] || paths['code']" /></svg>
    }
  `,
  host: { 'aria-hidden': 'true', '[class.social-icon]': "variant() === 'social'" },
  styles: ':host{display:inline-flex;width:1.15em;height:1.15em;flex-shrink:0}svg,img{width:100%;height:100%}img{object-fit:contain}:host(.social-icon){width:20px;height:20px;padding:2px;background:#fff;border-radius:2px;color:#000}'
})
export class Icon { readonly name = input('code'); readonly variant = input<'default' | 'social'>('default'); protected readonly paths = paths; }

