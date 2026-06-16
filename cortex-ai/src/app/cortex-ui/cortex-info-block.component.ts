import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export type InfoVariant = 'brand' | 'success' | 'danger' | 'warning' | 'info';

const ICONS: Record<InfoVariant, string> = {
  brand:   'M12 4l7 8-7 8-7-8z',
  success: 'M5 13l4 4 10-10',
  danger:  'M12 7v6 M12 17h.01',
  warning: 'M12 7v6 M12 17h.01',
  info:    'M12 11v6 M12 8h.01',
};

@Component({
  selector: 'cortex-info-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="block" [attr.data-variant]="variant">
      <div class="icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path [attr.d]="iconPath"/>
        </svg>
      </div>
      <div class="content">
        <div class="title">{{ title }}</div>
        <div class="body">{{ body }}</div>
        @if (action) {
          <button class="action cortex-focusable" (click)="actionClick.emit()">{{ action }}</button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .block {
      display: flex;
      gap: var(--space-3);
      align-items: flex-start;
      border-left: 4px solid;
      border-radius: var(--radius-md);
      padding: var(--space-4) var(--space-4);
    }

    .icon {
      width: 30px;
      height: 30px;
      border-radius: var(--radius-xs);
      display: grid;
      place-items: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .content { flex: 1; min-width: 0; }

    .title {
      font: var(--type-label);
      color: var(--text-strong);
    }

    .body {
      font: var(--type-body);
      color: var(--text-body);
      line-height: 1.5;
      margin-top: var(--space-1);
    }

    .action {
      margin-top: var(--space-2);
      background: none;
      border: none;
      padding: 0;
      font: var(--type-label);
      cursor: pointer;
      transition: text-decoration var(--duration-short);
    }
    .action:hover { text-decoration: underline; }

    [data-variant="brand"]   { background: var(--brand-subtle); border-color: var(--brand-primary); }
    [data-variant="brand"]   .icon   { background: var(--brand-primary); }
    [data-variant="brand"]   .action { color: var(--brand-700); }

    [data-variant="success"] { background: var(--success-bg); border-color: var(--success-main); }
    [data-variant="success"] .icon   { background: var(--success-main); }
    [data-variant="success"] .action { color: var(--success-strong); }

    [data-variant="danger"]  { background: var(--danger-bg); border-color: var(--danger-main); }
    [data-variant="danger"]  .icon   { background: var(--danger-main); }
    [data-variant="danger"]  .action { color: var(--danger-strong); }

    [data-variant="warning"] { background: var(--warning-bg); border-color: var(--warning-main); }
    [data-variant="warning"] .icon   { background: var(--warning-main); }
    [data-variant="warning"] .action { color: var(--warning-strong); }

    [data-variant="info"]    { background: var(--info-bg); border-color: var(--info-main); }
    [data-variant="info"]    .icon   { background: var(--info-main); }
    [data-variant="info"]    .action { color: var(--info-strong); }
  `]
})
export class CortexInfoBlockComponent {
  @Input({ required: true }) variant!: InfoVariant;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) body!: string;
  @Input() action = '';
  @Output() actionClick = new EventEmitter<void>();

  get iconPath() { return ICONS[this.variant] ?? ICONS.info; }
}
