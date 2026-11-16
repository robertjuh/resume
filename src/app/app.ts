import { AfterViewInit, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from './i18n/language';
import { Translate } from './i18n/translate';
import { profile, links, sections, portraits } from './content/profile';
import { education, certifications, languages, interests, developmentApproach } from './content/personal';
import { Icon } from './components/icon';
import { ExperienceTimeline } from './components/experience-timeline';
import { ProjectGrid } from './components/project-grid';
import { EngineeringNotes } from './components/engineering-notes';
import { SkillExplorer } from './components/skill-explorer';
import { CoreCompetencies } from './components/core-competencies';
import { PrintResume } from './components/print-resume';
import { FooterQuotes } from './components/footer-quotes';
import { LanguageSelect } from './components/language-select';

@Component({
  selector: 'app-root',
  imports: [Translate, Icon, ExperienceTimeline, ProjectGrid, EngineeringNotes, SkillExplorer, CoreCompetencies, PrintResume, FooterQuotes, LanguageSelect],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  host: { '(document:keydown.escape)': 'closeNavigation()' }
})
export class App implements AfterViewInit {
  protected readonly locale = inject(LanguageService);
  protected readonly currentSection = computed(() => sections.find(section => section.id === this.activeSection())?.label ?? 'Overview');
  // protected readonly cvUrl = computed(() => 'cv/robert-walhout-' + this.locale.language() + '.pdf');
  protected readonly cvFilename = computed(() => 'Robert-Walhout-CV-' + this.locale.language().toUpperCase() + '.pdf');
  protected readonly profile = profile;
  protected readonly portraits = portraits;
  protected readonly links = links;
  protected readonly sections = sections;
  protected readonly education = education;
  protected readonly certifications = certifications;
  protected readonly languages = languages;
  protected readonly developmentApproach = developmentApproach;
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly interests = interests.map(interest => ({
    ...interest,
    links: interest.links?.map(link => ({
      ...link,
      // Embed URLs are authored in local content, never supplied by visitors.
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(link.embedUrl)
    }))
  }));
  protected readonly activeSection = signal('home');
  protected readonly mobileOpen = signal(false);
  protected readonly expandedInterest = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);
  private cancelInterestScroll: (() => void) | null = null;

  ngAfterViewInit(): void {
    // Capture the requested anchor before scroll tracking starts updating the URL.
    const initialHash = location.hash;
    const elements = sections
      .map(section => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    let frame: number | null = null;
    let pendingHash: string | null = initialHash || null;
    let navigationTimer: number | undefined;
    let anchorFrame: number | null = null;

    const updateSection = (): void => {
      frame = null;
      if (!elements.length || this.mobileOpen() || document.querySelector('dialog[open]')) return;
      if (pendingHash) {
        const target = document.getElementById(pendingHash.slice(1))?.closest('main > section');
        if (target) this.activeSection.set(target.id);
        return;
      }

      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const anchorOffset = Math.max(...elements.map(element =>
        scrollPadding + (parseFloat(getComputedStyle(element).scrollMarginTop) || 0)
      ));
      const marker = Math.max(window.innerHeight * 0.3, anchorOffset + 1);
      let current = elements[0]!;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > marker) break;
        current = element;
      }

      if (window.scrollY <= 1) {
        current = elements[0]!;
      } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = elements[elements.length - 1]!;
      }

      this.activeSection.set(current.id);
      const hash = '#' + current.id;
      if (location.hash !== hash) {
        const url = new URL(location.href);
        url.hash = current.id;
        history.replaceState(history.state, '', url.href);
      }
    };
    const scheduleUpdate = (): void => {
      // Let explicit anchor navigation and scroll restoration finish before replacing its URL.
      if (pendingHash) {
        clearTimeout(navigationTimer);
        navigationTimer = window.setTimeout(() => {
          pendingHash = null;
          navigationTimer = undefined;
          scheduleUpdate();
        }, 150);
      }
      if (frame === null) frame = requestAnimationFrame(updateSection);
    };
    const onHashNavigation = (): void => {
      pendingHash = location.hash || '#home';
      const requestedHash = pendingHash;
      if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
      anchorFrame = requestAnimationFrame(() => {
        anchorFrame = null;
        document.getElementById(requestedHash.slice(1))?.scrollIntoView();
        scheduleUpdate();
      });
      scheduleUpdate();
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', onHashNavigation);
    window.addEventListener('popstate', onHashNavigation);
    frame = requestAnimationFrame(() => {
      frame = null;
      if (initialHash) document.getElementById(initialHash.slice(1))?.scrollIntoView();
      scheduleUpdate();
    });
    this.destroyRef.onDestroy(() => {
      this.cancelInterestScroll?.();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', onHashNavigation);
      window.removeEventListener('popstate', onHashNavigation);
      clearTimeout(navigationTimer);
      if (frame !== null) cancelAnimationFrame(frame);
      if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
    });
  }
  protected toggleInterest(name: string, trigger: HTMLButtonElement): void {
    this.cancelInterestScroll?.();
    const opening = this.expandedInterest() !== name;
    const previousPanel = document.querySelector<HTMLElement>('.interest.is-open .interest-panel');
    const startTop = trigger.getBoundingClientRect().top;
    const root = document.documentElement;
    const topOffset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const shouldFollow = opening && previousPanel !== null &&
      (previousPanel.compareDocumentPosition(trigger) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0 &&
      startTop - previousPanel.getBoundingClientRect().height < topOffset;
    const duration = previousPanel
      ? (parseFloat(getComputedStyle(previousPanel).transitionDuration) || 0) * 1000
      : 0;

    this.expandedInterest.set(opening ? name : null);
    if (!shouldFollow) return;

    // Follow the live heading position, since its document position changes during collapse.
    const previousAnchor = root.style.overflowAnchor;
    root.style.overflowAnchor = 'none';
    let frame: number | null = null;
    let started: number | null = null;
    const interruptEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'resize'] as const;
    const cancel = (): void => {
      if (frame !== null) cancelAnimationFrame(frame);
      for (const event of interruptEvents) window.removeEventListener(event, cancel);
      root.style.overflowAnchor = previousAnchor;
      this.cancelInterestScroll = null;
    };
    this.cancelInterestScroll = cancel;
    for (const event of interruptEvents) window.addEventListener(event, cancel, { passive: true });

    const follow = (time: number): void => {
      frame = null;
      started ??= time;
      const progress = duration > 0 ? Math.min((time - started) / duration, 1) : 1;
      const desiredTop = topOffset + (startTop - topOffset) * (1 - progress) ** 3;
      window.scrollTo({
        top: window.scrollY + trigger.getBoundingClientRect().top - desiredTop,
        behavior: 'instant'
      });
      if (progress < 1) frame = requestAnimationFrame(follow);
      else cancel();
    };
    frame = requestAnimationFrame(follow);
  }

  protected navigate(id: string): void {
    this.activeSection.set(id);
    this.mobileOpen.set(false);
    if (window.matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
    }
  }
  protected closeNavigation(): void {
    if (!this.mobileOpen()) return;
    this.mobileOpen.set(false);
    document.getElementById('navigation-toggle')?.focus({ preventScroll: true });
  }
}

