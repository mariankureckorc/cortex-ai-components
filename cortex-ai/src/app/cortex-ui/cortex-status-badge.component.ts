import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

export type BadgeTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

@Component({
  selector: 'cortex-status-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge cortex-focusable">
      <span class="dot"></span>{{ label }}
    </span>
  `,
  styles: [`
    :host { display: inline-block; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      height: 24px;
      padding: 0 var(--space-2);
      border-radius: var(--radius-pill);
      font: var(--type-caption);
      font-weight: 600;
      letter-spacing: var(--tracking-label);
      white-space: nowrap;
      background: var(--surface-muted);
      color: var(--text-muted);
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
      background: var(--neutral-400);
    }

    :host(.tone-success) .badge { background: var(--success-bg); color: var(--success-strong); }
    :host(.tone-success) .dot  { background: var(--success-main); }

    :host(.tone-danger) .badge { background: var(--danger-bg); color: var(--danger-strong); }
    :host(.tone-danger) .dot  { background: var(--danger-main); }

    :host(.tone-warning) .badge { background: var(--warning-bg); color: var(--warning-strong); }
    :host(.tone-warning) .dot  { background: var(--warning-main); }

    :host(.tone-info) .badge { background: var(--info-bg); color: var(--info-strong); }
    :host(.tone-info) .dot  { background: var(--info-main); }
  `]
})
export class CortexStatusBadgeComponent {
  @Input({ required: true }) label!: string;
  @Input() tone: BadgeTone = 'neutral';

  @HostBinding('class') get hostClass() { return 'tone-' + this.tone; }
}
