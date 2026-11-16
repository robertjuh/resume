import { Translate } from '../i18n/translate';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile, links } from '../content/profile';
import { experiences, earlierExperience } from '../content/experience';
import { projects } from '../content/projects';
import { education, certifications, languages } from '../content/personal';
@Component({
  selector: 'app-print-resume',
  imports: [Translate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="print-resume">
      <header><h1>{{ (profile.name) | t }}</h1><p>{{ (profile.title) | t }} · {{ (profile.location) | t }}</p><p>{{ (profile.email) | t }} · {{ (links.github) | t }}<br>{{ (links.linkedin) | t }}</p></header>
      <section><h2>{{ 'Profile' | t }}</h2><p>{{ (profile.summary) | t }}</p></section>
      <section><h2>{{ 'Professional experience' | t }}</h2>@for (job of experiences; track job.id) {
        <article class="print-job"><h3>{{ (job.company) | t }} — {{ (job.role) | t }}</h3><p>{{ (job.period) | t }} · {{ (job.location) | t }}</p><p>{{ (job.summary) | t }}</p><ul>@for (item of job.highlights; track item) { <li>{{ (item) | t }}</li> }</ul>@if (job.technologies.length) { <p><strong>{{ 'Technologies:' | t }}</strong> {{ (job.technologies.join(', ')) | t }}</p> }</article>
      }</section>
      <section><h2>{{ 'Earlier IT experience' | t }}</h2>@for (job of earlier; track job.company) { <p><strong>{{ (job.company) | t }}</strong> · {{ (job.role) | t }}@if (job.period) { · {{ (job.period) | t }} }<br>{{ (job.description) | t }}</p> }</section>
      <section><h2>{{ 'Selected projects' | t }}</h2>@for (project of projects; track project.id) { <div class="print-project"><h3>{{ (project.title) | t }} · {{ (project.category) | t }}</h3><p>{{ (project.description) | t }}</p>@if (project.liveUrl) { <p>{{ (project.liveUrl) | t }}</p> }</div> }</section>
      <section><h2>{{ 'Education' | t }}</h2>@for (item of education; track item.title) { <p><strong>{{ (item.title) | t }}</strong> · {{ (item.period) | t }}<br>{{ (item.institution) | t }}</p> }</section>
      <section><h2>{{ 'Certifications and learning' | t }}</h2>@for (item of certifications; track item.title) { <p>{{ (item.title) | t }} · {{ item.year }}</p> }<p>{{ 'Symfony is personal learning and project experience.' | t }}</p></section>
      <section><h2>{{ 'Languages' | t }}</h2><p>@for (language of languages; track language.name; let last = $last) { {{ (language.name) | t }} {{ language.level }}{{ (last ? '' : ' · ') | t }} }</p></section>
      <footer>{{ (links.portfolio) | t }}</footer>
    </article>
  `
})
export class PrintResume {
  protected readonly profile = profile;
  protected readonly links = links;
  protected readonly experiences = experiences;
  protected readonly earlier = earlierExperience;
  protected readonly projects = projects;
  protected readonly education = education;
  protected readonly certifications = certifications;
  protected readonly languages = languages;
}

