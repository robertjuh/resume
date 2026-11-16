import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, Injector, input, signal, viewChild, viewChildren } from '@angular/core';
import { Language, LanguageService } from '../i18n/language';
import { Translate } from '../i18n/translate';
import { Icon } from './icon';

@Component({
  selector: 'app-language-flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @if (language() === 'nl') {
      <svg viewBox="0 0 30 20" aria-hidden="true"><path fill="#ae1c28" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#21468b" d="M0 13h30v7H0z"/></svg>
    } @else {
      <svg viewBox="0 0 30 20" aria-hidden="true"><path fill="#012169" d="M0 0h30v20H0z"/><path stroke="#fff" stroke-width="4" d="m0 0 30 20M30 0 0 20"/><path stroke="#c8102e" stroke-width="1.5" d="m0 0 30 20M30 0 0 20"/><path stroke="#fff" stroke-width="7" d="M15 0v20M0 10h30"/><path stroke="#c8102e" stroke-width="4" d="M15 0v20M0 10h30"/></svg>
    }
  `,
  styles: ':host{display:block;width:24px;height:16px;flex-shrink:0;overflow:hidden;border-radius:2px;box-shadow:0 0 0 1px #ffffff18}svg{display:block;width:100%;height:100%}'
})
class LanguageFlag {
  readonly language = input.required<Language>();
}

@Component({
  selector: 'app-language-select',
  imports: [LanguageFlag, Translate, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'onKeydown($event)',
    '(focusout)': 'onFocusOut($event)'
  },
  template: `
    <button #trigger type="button" class="language-toggle" aria-haspopup="menu"
      [attr.aria-expanded]="open()" [attr.aria-controls]="open() ? 'language-menu' : null"
      [attr.aria-label]="('Language' | t) + ': ' + selectedLabel()" (click)="toggle()">
      <app-language-flag [language]="locale.language()" /><app-icon name="chevron" />
    </button>
    @if (open()) {
      <div id="language-menu" class="language-menu" role="menu" [attr.aria-label]="'Language' | t">
        @for (choice of choices; track choice.code) {
          <button #option type="button" role="menuitemradio" tabindex="-1" [lang]="choice.code"
            [attr.aria-label]="choice.label" [attr.aria-checked]="locale.language() === choice.code"
            (click)="select(choice.code)">
            <app-language-flag [language]="choice.code" />
          </button>
        }
      </div>
    }
  `,
  styles: `
    :host{position:relative;display:inline-flex;flex-shrink:0}
    button{display:flex;align-items:center;justify-content:center;min-height:34px;padding:7px 9px;border:1px solid #59416c;border-radius:5px;background:var(--panel);color:var(--text)}
    button:hover{background:var(--hover);border-color:var(--purple)}
    .language-toggle{gap:8px}
    .language-toggle>app-icon{font-size:10px;transform:rotate(90deg)}
    .language-menu{position:absolute;top:calc(100% + 6px);right:0;z-index:110;display:grid;gap:4px;min-width:100%;padding:4px;border:1px solid var(--border);border-radius:7px;background:var(--panel);box-shadow:0 8px 24px #0006}
    .language-menu>button{width:100%;border-color:transparent}
    .language-menu>button[aria-checked="true"]{background:#2a1e39;border-color:#765390}
  `
})
export class LanguageSelect {
  protected readonly locale = inject(LanguageService);
  protected readonly open = signal(false);
  protected readonly choices = [{ code: 'nl', label: 'Nederlands' }, { code: 'en', label: 'English' }] as const;
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly options = viewChildren<ElementRef<HTMLButtonElement>>('option');

  protected selectedLabel(): string {
    return this.choices.find(choice => choice.code === this.locale.language())!.label;
  }

  protected toggle(): void {
    if (this.open()) this.close(true);
    else this.show(this.choices.findIndex(choice => choice.code === this.locale.language()));
  }

  protected select(language: Language): void {
    this.locale.setLanguage(language);
    this.close(true);
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.target instanceof Node && !this.element.nativeElement.contains(event.target)) this.close();
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!(event.relatedTarget instanceof Node) || !this.element.nativeElement.contains(event.relatedTarget)) this.close();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.show(event.key === 'ArrowDown' ? 0 : this.choices.length - 1);
      }
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close(true);
    } else if (event.key === 'Tab') {
      this.close(true);
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const options = this.options();
      const current = options.findIndex(option => option.nativeElement === document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
        : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
      options[next]?.nativeElement.focus();
    }
  }

  private show(index: number): void {
    this.open.set(true);
    afterNextRender(() => this.options()[index]?.nativeElement.focus(), { injector: this.injector });
  }

  private close(focusTrigger = false): void {
    this.open.set(false);
    if (focusTrigger) this.trigger().nativeElement.focus({ preventScroll: true });
  }
}
