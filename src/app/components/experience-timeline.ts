import { Translate } from '../i18n/translate';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experiences, earlierExperience } from '../content/experience';
import { Icon } from './icon';
@Component({
  selector: 'app-experience-timeline',
  imports: [Translate, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="timeline">
      @for (job of experiences; track job.id; let first = $first) {
        <article class="timeline-item" [id]="'role-' + job.id">
          <span class="timeline-dot" [class.first]="first"></span>
          <div class="timeline-date mono">{{ (job.period) | t }}<span>{{ (job.location) | t }}</span></div>
          <div class="experience-body">
            <div class="job-heading"><h3>{{ (job.company) | t }}</h3><span class="role-type">{{ (job.id === 'vhbp' ? 'Occasional' : job.id === 'colijn-intern' ? 'Internship' : 'Professional') | t }}</span></div>
            <p class="job-role">{{ (job.role) | t }}</p>
            <p class="muted">{{ (job.summary) | t }}</p>
            <div class="tags">@for (tech of job.technologies; track tech) { <span>{{ (tech) | t }}</span> }</div>
            <details class="role-details">
              <summary>{{ 'View role details' | t }} <app-icon name="chevron" /></summary>
              <ul>@for (highlight of job.highlights; track highlight) { <li>{{ (highlight) | t }}</li> }</ul>
              @if (job.companyContext) {
                <aside class="company-context"><span class="eyebrow">{{ 'About the company' | t }}</span><p>{{ (job.companyContext) | t }}</p>
                @for (link of job.sources; track link.url) { <a [href]="link.url" target="_blank" rel="noopener noreferrer">{{ (link.label) | t }} <app-icon name="external" /></a> }
                </aside>
              }
              @for (shot of job.screenshots; track shot.src) { <figure><img [src]="shot.src" [alt]="shot.alt | t" loading="lazy"><figcaption>{{ (shot.caption) | t }}</figcaption></figure> }
            </details>
          </div>
        </article>
      }
    </div>
    <details class="earlier-experience">
      <summary><span><app-icon name="briefcase" /> {{ 'Earlier IT experience' | t }} <span class="muted">{{ 'Support & network management' | t }}</span></span><app-icon name="chevron" /></summary>
      <div class="earlier-list">@for (job of earlier; track job.company) {
        <article><div><h3>{{ (job.company) | t }}</h3><span class="mono muted">{{ (job.period) | t }}</span></div><p>{{ (job.role) | t }}</p><p class="muted">{{ (job.description) | t }}</p></article>
      }</div>
    </details>
  `
})
export class ExperienceTimeline {
  protected readonly experiences = experiences;
  protected readonly earlier = earlierExperience;
}

