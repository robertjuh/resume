import { Translate } from '../i18n/translate';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'app-project-art',
  imports: [Translate],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class]': '"project-art art-" + (kind() === "colijn-erp" || kind() === "fresh-iq-wdd" ? "enterprise" : kind())' },
  template: `
    <div class="art-grid"></div>
    @switch (kind()) {
      @case ('ai-campaign') {
        <svg class="campaign-symbol" viewBox="0 0 240 170" fill="none"><path d="m120 12 65 40v68l-65 38-65-38V52z" stroke="currentColor"/><path d="m120 12 23 68 42-28-65 106-65-106 42 28z M55 120l42-40h46l42 40 M120 158V99 M97 80l23 19 23-19" stroke="currentColor"/><circle cx="120" cy="85" r="73" stroke="currentColor" stroke-opacity=".15" stroke-dasharray="3 8"/></svg>
        <span class="art-caption">{{ 'WORLDS. CHOICES. STORIES.' | t }}</span>
      }
      @case ('bitcoin-index') { <span class="bitcoin-symbol">₿</span><span class="art-orbit one"></span><span class="art-orbit two"></span><span class="art-caption">{{ 'BTC Fear & greed index app' | t }}</span> }
      @case ('economic-dashboard') { <div class="economic-symbol"><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="art-caption">{{ 'DATA, WITH CONTEXT.' | t }}</span> }
      @case ('colijn-erp') { <div class="enterprise-symbol"><span></span><span></span><span></span></div><span class="art-caption">{{ 'FURNITURE ERP' | t }}</span> }
      @case ('fresh-iq-wdd') { <div class="enterprise-symbol"><span></span><span></span><span></span></div><span class="art-caption">{{ 'DATA FOR FRESH PRODUCE' | t }}</span> }
    }
  `
})
export class ProjectArt { readonly kind = input.required<string>(); }

