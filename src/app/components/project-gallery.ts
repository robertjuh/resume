import { Translate } from '../i18n/translate';
import { ChangeDetectionStrategy, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { Screenshot } from '../models/content';
import { Icon } from './icon';
@Component({
  selector: 'app-project-gallery',
  imports: [Translate, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (current(); as shot) {
      <figure class="gallery-image">
        <button type="button" class="gallery-enlarge" (click)="openImage()" [attr.aria-label]="'Enlarge screenshot' | t" [title]="'Enlarge screenshot' | t">
          <img [src]="shot.src" [alt]="shot.alt | t" loading="lazy">
        </button>
        <figcaption>{{ (shot.caption) | t }}</figcaption>
      </figure>
      <dialog #imageDialog class="screenshot-dialog" [attr.aria-label]="'Enlarged screenshot' | t" (click)="onImageBackdrop($event)">
        <div class="screenshot-dialog-toolbar">
          <button type="button" class="icon-button" autofocus (click)="closeImage()" [attr.aria-label]="'Close enlarged screenshot' | t"><app-icon name="close" /></button>
        </div>
        <figure>
          <div class="screenshot-viewport"><img [src]="shot.src" [alt]="shot.alt | t"></div>
          <figcaption>{{ shot.caption | t }}</figcaption>
        </figure>
      </dialog>
      @if (screenshots().length > 1) {
        <div class="gallery-controls" [attr.aria-label]="'Screenshot gallery' | t">
          <button type="button" (click)="move(-1)" [attr.aria-label]="'Previous screenshot' | t">←</button>
          <span class="mono" aria-live="polite">{{ index() + 1 }} / {{ screenshots().length }}</span>
          <button type="button" (click)="move(1)" [attr.aria-label]="'Next screenshot' | t">→</button>
        </div>
      }
    }
  `
})
export class ProjectGallery {
  readonly screenshots = input.required<readonly Screenshot[]>();
  protected readonly index = signal(0);
  protected readonly current = computed(() => this.screenshots()[this.index()]);
  private readonly imageDialog = viewChild.required<ElementRef<HTMLDialogElement>>('imageDialog');

  protected openImage(): void { this.imageDialog().nativeElement.showModal(); }
  protected closeImage(): void { this.imageDialog().nativeElement.close(); }
  protected onImageBackdrop(event: MouseEvent): void {
    const dialog = this.imageDialog().nativeElement;
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.closeImage();
  }

  protected move(direction: number): void {
    const count = this.screenshots().length;
    if (count) this.index.update(index => (index + direction + count) % count);
  }
}

