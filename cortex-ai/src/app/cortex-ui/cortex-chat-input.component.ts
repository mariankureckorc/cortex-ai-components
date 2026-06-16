import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cortex-chat-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap">
      <div class="bar">
        <span class="placeholder">{{ placeholder }}</span>
        <button class="send cortex-focusable" (click)="send.emit()" aria-label="Send">
          Send
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
      <div class="disclaimer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        {{ disclaimer }}
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .bar {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      border: 1.5px solid var(--border-default, var(--neutral-200));
      border-radius: var(--radius-md);
      padding: 6px 6px 6px var(--space-4);
      background: var(--neutral-0);
      transition: border-color var(--duration-short) var(--easing-standard);
    }
    .bar:focus-within,
    .bar:hover { border-color: var(--brand-300); }

    .placeholder {
      flex: 1;
      font: var(--type-body-lg);
      color: var(--text-faint, var(--neutral-400));
      pointer-events: none;
    }

    .send {
      display: flex;
      align-items: center;
      gap: 7px;
      background: var(--brand-primary);
      color: var(--color-on-brand);
      border: none;
      font: var(--type-label);
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-sm);
      cursor: pointer;
      position: relative;
      transition: background var(--duration-short) var(--easing-standard);
    }
    .send::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius-sm);
      background: #000;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration-short) var(--easing-standard);
    }
    .send:hover::after   { opacity: var(--state-hover-opacity); }
    .send:active::after  { opacity: var(--state-pressed-opacity); }

    .disclaimer {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: var(--space-2);
      color: var(--text-muted);
      font: var(--type-caption);
    }
  `]
})
export class CortexChatInputComponent {
  @Input() placeholder = 'Ask Cortex AI';
  @Input() disclaimer = 'Prompts and actions are logged and auditable.';
  @Output() send = new EventEmitter<void>();
}
