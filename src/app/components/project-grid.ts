import { Translate } from '../i18n/translate';
import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { projects, projectFilters, ProjectFilter } from '../content/projects';
import { Project } from '../models/content';
import { Icon } from './icon';
import { ProjectArt } from './project-art';
import { ProjectGallery } from './project-gallery';
@Component({
  selector: 'app-project-grid',
  imports: [Translate, Icon, ProjectArt, ProjectGallery],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="project-toolbar">
      <div class="filters" [attr.aria-label]="'Filter projects' | t">
        @for (filter of filters; track filter) { <button type="button" [class.active]="selectedFilter() === filter" [attr.aria-pressed]="selectedFilter() === filter" (click)="selectedFilter.set(filter)">{{ (filter) | t }}</button> }
      </div>
      <span class="mono project-count" aria-live="polite">{{ filteredProjects().length.toString() }} {{ 'projects' | t }}</span>
    </div>
    <div class="projects-grid">
      @for (project of filteredProjects(); track project.id) {
        <article class="project-card">
          <div class="project-art-display">
            <app-project-art [kind]="project.id" /></div>
          <div class="project-info">
            <div class="project-kicker"><span>{{ (project.category + ' project') | t }}</span></div>
            <h3>{{ (project.title) | t }}</h3><p>{{ (project.description) | t }}</p>
            <div class="project-bottom"><span class="project-label"><span class="tiny-dot"></span>{{ (project.label) | t }}</span><button type="button" class="text-button" [attr.aria-label]="('Explore' | t) + ' ' + project.title" (click)="open(project)">{{ 'Explore' | t }} <app-icon name="arrow" /></button></div>
          </div>
        </article>
      }
    </div>
    <dialog #detailDialog class="project-dialog" [class.project-dialog-live]="selectedProject()?.id === 'bitcoin-index'" (close)="afterClose()" (click)="onBackdrop($event)" aria-labelledby="project-title">
      @if (selectedProject(); as project) {
        <div class="dialog-header"><span class="eyebrow">{{ (project.category + ' project') | t }} · {{ (project.label) | t }}</span><button type="button" class="icon-button" autofocus (click)="close()" [attr.aria-label]="'Close project details' | t"><app-icon name="close" /></button></div>
        <div class="dialog-content">
          <h2 id="project-title">{{ (project.title) | t }}</h2>
          @for (paragraph of project.overview; track paragraph) { <p class="muted">{{ (paragraph) | t }}</p> }
          @if (project.id === 'bitcoin-index') {
            <div class="project-live-embed">
              <iframe class="project-live-frame" src="https://freerunnl.nl/btc-index/#/" [title]="'Bitcoin Index live app' | t" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
          }
          @if (project.role) { <h3>{{ 'My role' | t }}</h3><p>{{ project.role | t }}</p> }
          @if (project.technologies.length) { <div class="tags">@for (tech of project.technologies; track tech) { <span>{{ (tech) | t }}</span> }</div> }
          @if (project.walkthrough; as steps) {
            <div class="walkthrough"><div class="walkthrough-heading"><h3>{{ 'How the game flow works' | t }}</h3><span class="mono">{{ 'Game flow' | t }}</span></div>
              <div class="walkthrough-tabs" [attr.aria-label]="'Game flow sections' | t">
                @for (step of steps; track step.title; let index = $index) { <button type="button" [class.active]="walkthroughIndex() === index" [attr.aria-pressed]="walkthroughIndex() === index" (click)="walkthroughIndex.set(index)"><span class="mono" aria-hidden="true">0{{ index + 1 }}</span>{{ (step.title) | t }}</button> }
              </div>
              @if (steps[walkthroughIndex()]; as step) { <div class="walkthrough-content" aria-live="polite"><h4>{{ (step.title) | t }}</h4><p>{{ (step.description) | t }}</p><ul>@for (item of step.items; track item) { <li>{{ (item) | t }}</li> }</ul></div> }
            </div>
          }
          @if (project.technicalDetails.length || project.contributions?.length) {
            <h3>{{ 'Technical focus' | t }}</h3>
            @if (project.contributions; as contributions) {
              <ul class="project-contributions">
                @for (contribution of contributions; track contribution.title) {
                  <li><strong>{{ contribution.title | t }}</strong><p>{{ contribution.description | t }}</p></li>
                }
              </ul>
            }
            @for (detail of project.technicalDetails; track detail) { <p>{{ (detail) | t }}</p> }
          }
          @if (project.challenges?.length) { <h3>{{ 'Challenges' | t }}</h3><ul>@for (challenge of project.challenges; track challenge) { <li>{{ challenge | t }}</li> }</ul> }
          @if (project.learnings?.length) { <h3>{{ 'What I learned' | t }}</h3><ul>@for (learning of project.learnings; track learning) { <li>{{ learning | t }}</li> }</ul> }
          @if (project.repositoryUrl) { <a class="button secondary" [href]="project.repositoryUrl" target="_blank" rel="noopener noreferrer">{{ 'View repository' | t }} <app-icon name="external" /></a> }
          @if (project.id !== 'bitcoin-index') { <app-project-gallery [screenshots]="project.screenshots" /> }
          @if (project.liveUrl) { <a class="button primary" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer">{{ (project.id === 'bitcoin-index' ? 'Open in new tab' : 'Visit live project') | t }} <app-icon name="external" /></a> }
          @if (project.relatedExperience.length) { <button type="button" class="button secondary" (click)="goToExperience()">{{ 'View experience' | t }} <app-icon name="arrow" /></button> }
        </div>
      }
    </dialog>
  `
})
export class ProjectGrid {
  protected readonly filters = projectFilters;
  protected readonly selectedFilter = signal<ProjectFilter>('All projects');
  protected readonly filteredProjects = computed(() => projects.filter(project => this.selectedFilter() === 'All projects' || project.category === this.selectedFilter()));
  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly walkthroughIndex = signal(0);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('detailDialog');
  private trigger: HTMLElement | null = null;

  protected open(project: Project): void {
    this.trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.selectedProject.set(project);
    this.walkthroughIndex.set(0);
    this.dialog().nativeElement.showModal();
    document.body.classList.add('modal-open');
  }
  protected close(): void { this.dialog().nativeElement.close(); }
  protected afterClose(): void {
    document.body.classList.remove('modal-open');
    this.selectedProject.set(null);
    this.trigger?.focus({ preventScroll: true });
  }
  protected onBackdrop(event: MouseEvent): void {
    if (event.target !== this.dialog().nativeElement) return;
    const rect = this.dialog().nativeElement.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.close();
  }
  protected goToExperience(): void { this.close(); window.location.hash = 'experience'; }
}

