import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language';

// Read the language signal on each view check so unchanged source copy updates when switching language.
@Pipe({ name: 't', pure: false })
export class Translate implements PipeTransform {
  private readonly locale = inject(LanguageService);
  transform(value: string | null | undefined): string { return this.locale.translate(value); }
}
