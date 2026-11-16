import { ChangeDetectionStrategy, Component } from '@angular/core';
import { engineeringNotes } from '../content/engineering-notes';
import { Translate } from '../i18n/translate';

@Component({
  selector: 'app-engineering-notes',
  imports: [Translate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (notes.length) {
      <section class="engineering-notes" aria-labelledby="engineering-notes-title">
        <h3 id="engineering-notes-title">{{ 'Engineering Notes' | t }}</h3>
        @for (note of notes; track note.id) {
          <details class="engineering-note">
            <summary>{{ note.title | t }}</summary>
            <p>{{ note.summary | t }}</p>
            @for (paragraph of note.paragraphs; track paragraph) { <p>{{ paragraph | t }}</p> }
          </details>
        }
      </section>
    }
  `
})
export class EngineeringNotes {
  protected readonly notes = engineeringNotes;
}
