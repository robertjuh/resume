import { ChangeDetectionStrategy, Component } from '@angular/core';
import { coreCompetencies } from '../content/core-competencies';
import { Translate } from '../i18n/translate';
import { Icon } from './icon';

@Component({
  selector: 'app-core-competencies',
  imports: [Translate, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="competency-grid">
      @for (competency of competencies; track competency.title) {
        <article class="competency-card">
          <div class="competency-card-heading">
            <span class="competency-icon"><app-icon [name]="competency.icon" /></span>
            <h3>{{ competency.title | t }}</h3>
          </div>
          <p class="competency-description">{{ competency.description | t }}</p>
          @for (group of competency.groups; track group.context) {
            <div class="competency-group" [class.competency-group-personal]="group.context !== 'Professional experience'">
              <p class="competency-context">{{ group.context | t }}</p>
              <ul class="competency-items">
                @for (item of group.items; track item) { <li>{{ item | t }}</li> }
              </ul>
            </div>
          }
        </article>
      }
    </div>
  `,
  styles: `
    :host{display:block}
    .competency-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .competency-card{display:flex;flex-direction:column;min-width:0;padding:19px 18px;background:var(--panel);border:1px solid var(--border);border-radius:9px}
    .competency-card-heading{display:flex;align-items:center;gap:10px;margin-bottom:12px;min-height:34px}
    .competency-icon{display:inline-flex;align-items:center;justify-content:center;width:31px;height:31px;flex-shrink:0;border:1px solid #4c3b66;border-radius:8px;background:#241b32;color:var(--purple);font-size:17px}
    .competency-card h3{font-size:14px;line-height:1.35;letter-spacing:-.015em}
    .competency-description{margin:0 0 16px;color:var(--muted);font-size:12px;line-height:1.65}
    .competency-group{margin-top:auto}
    .competency-group+.competency-group{margin-top:13px}
    .competency-context{margin:0 0 7px;color:var(--muted);font-size:10px;line-height:1.4}
    .competency-group-personal .competency-context{color:var(--accent)}
    .competency-items{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0}
    .competency-items li{font-size:11px;line-height:1.5;padding:3px 7px;border:1px solid #493a5b;border-radius:4px;background:#201929;color:var(--text)}
    @media(max-width:650px){
      .competency-grid{grid-template-columns:1fr;gap:10px}
      .competency-card{padding:16px}
      .competency-card-heading{min-height:0;margin-bottom:12px}
      .competency-card h3{font-size:15px}
      .competency-items li{font-size:12px}
      .competency-context{font-size:11px}
    }
  `
})
export class CoreCompetencies {
  protected readonly competencies = coreCompetencies;
}
