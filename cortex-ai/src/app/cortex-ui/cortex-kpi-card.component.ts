import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type DeltaDir = 'up' | 'down';

@Component({
  selector: 'cortex-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class.card--brand]="brand">
      <div class="label">{{ label }}</div>
      <div class="value">{{ value }}</div>
      <div class="footer">
        @if (delta) {
          <span class="delta" [class.delta--up]="dir === 'up'" [class.delta--down]="dir === 'down'">
            {{ dir === 'up' ? '▲' : '▼' }} {{ delta }}
          </span>
        }
        <span class="sub">{{ sub }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .card {
      background: var(--surface-muted);
      border-radius: var(--radius-md);
      padding: var(--space-4);
    }
    .card--brand { background: var(--surface-brand); }

    .label {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: var(--tracking-caption);
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
    }

    .value {
      font: var(--type-kpi);
      letter-spacing: var(--tracking-tight);
      color: var(--text-strong);
      margin-top: var(--space-2);
      line-height: 1;
      font-variant-numeric: var(--numeric-tabular);
    }

    .footer {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-3);
    }

    .delta {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      font: var(--type-caption);
      font-weight: 600;
      padding: 2px var(--space-2);
      border-radius: var(--radius-pill);
      font-variant-numeric: var(--numeric-tabular);
    }
    .delta--up   { color: var(--success-strong); background: var(--success-bg); }
    .delta--down { color: var(--danger-strong);  background: var(--danger-bg);  }

    .sub {
      font: var(--type-caption);
      color: var(--text-muted);
    }
  `]
})
export class CortexKpiCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
  @Input() sub = '';
  @Input() delta = '';
  @Input() dir: DeltaDir = 'up';
  @Input() brand = false;
}
