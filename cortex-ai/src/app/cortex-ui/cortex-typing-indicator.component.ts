import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cortex-typing-indicator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <div class="avatar" aria-label="Cortex AI is typing">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary)"/>
          <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
          <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
          <path d="M12 3.6V8" stroke="var(--brand-primary)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary)"/>
        </svg>
      </div>
      <div class="bubble" role="status" aria-label="Cortex AI is typing">
        <span class="dot" style="animation-delay:0s"></span>
        <span class="dot" style="animation-delay:.18s"></span>
        <span class="dot" style="animation-delay:.36s"></span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .row {
      display: flex;
      gap: var(--space-3);
      align-items: center;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--brand-subtle);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .bubble {
      background: var(--neutral-0);
      box-shadow: var(--elevation-2);
      padding: var(--space-3) var(--space-4);
      border-radius: 6px 16px 16px 16px;
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--brand-primary);
      animation: ccdot 1.2s infinite;
    }
  `]
})
export class CortexTypingIndicatorComponent {}
