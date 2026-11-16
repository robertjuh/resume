import { Translate } from '../i18n/translate';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { skills, skillGroups, aiTooling, learningInterests } from '../content/skills';
import { experiences } from '../content/experience';
import { projects } from '../content/projects';
import { Icon } from './icon';
@Component({
  selector: 'app-skill-explorer',
  imports: [Translate, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skill-intro" aria-labelledby="learning-interests-title">
      <h3 id="learning-interests-title">{{ learningInterests.title | t }}</h3>
      <p>{{ learningInterests.introduction | t }}</p>
    </div>
    <div class="skill-intro" aria-labelledby="ai-tooling-title">
      <h3 id="ai-tooling-title">{{ aiTooling.title | t }}</h3>
      <p>{{ aiTooling.introduction | t }}</p>
      <p>{{ aiTooling.workflows | t }}</p>
    </div>
    <div class="skill-explorer">
      <div class="skill-groups">@for (group of groups; track group) {
        <div class="skill-group"><h3>{{ (group) | t }}</h3><div class="skill-buttons">
          @for (skill of skillsIn(group); track skill.name) { <button type="button" [class.active]="selected().name === skill.name" [attr.aria-pressed]="selected().name === skill.name" (click)="selected.set(skill)">{{ (skill.name) | t }}</button> }
        </div></div>
      }</div>
      <aside class="skill-context" aria-live="polite">
        <div class="skill-context-top"><span class="skill-icon"><app-icon name="code" /></span><span class="eyebrow">{{ (selected().context) | t }}</span></div>
        <h3>{{ (selected().name) | t }}</h3>
        @if (selected().context === 'Exploring next') { <span class="exploring-label">{{ 'Exploring' | t }}</span> }
        <p>{{ (selected().description) | t }}</p>
        @if (relatedJobs().length) { <span class="eyebrow context-label">{{ "Where I've used it" | t }}</span>@for (job of relatedJobs(); track job.id) { <a class="context-link" [href]="'#role-' + job.id"><span>{{ (job.company) | t }}<small>{{ (job.role) | t }}</small></span><app-icon name="arrow" /></a> } }
        @if (relatedProjects().length) { <span class="eyebrow context-label">{{ 'Related projects' | t }}</span>@for (project of relatedProjects(); track project.id) { <a class="context-link" href="#projects"><span>{{ (project.title) | t }}<small>{{ (project.category + ' project') | t }}</small></span><app-icon name="arrow" /></a> } }
      </aside>
    </div>
  `
})
export class SkillExplorer {
  protected readonly aiTooling = aiTooling;
  protected readonly learningInterests = learningInterests;
  protected readonly groups = skillGroups;
  protected readonly selected = signal(skills[0]!);
  protected readonly relatedJobs = computed(() => experiences.filter(job => this.selected().experienceIds.includes(job.id)));
  protected readonly relatedProjects = computed(() => projects.filter(project => this.selected().projectIds.includes(project.id)));
  protected skillsIn(group: string) { return skills.filter(skill => skill.context === group); }
}

