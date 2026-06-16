import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CortexStatusBadgeComponent, BadgeTone } from './cortex-status-badge.component';

export interface TableRow {
  customer: string;
  value: string;
  status: string;
  tone: BadgeTone;
}

@Component({
  selector: 'cortex-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CortexStatusBadgeComponent],
  template: `
    <div class="table">
      <div class="thead">
        <span class="th">CUSTOMER</span>
        <span class="th th--right">VALUE</span>
        <span class="th th--status">STATUS</span>
      </div>
      @for (row of rows; track row.customer; let i = $index) {
        <div class="tr" [class.tr--alt]="i % 2 === 0"
             [style.border-top]="i === 0 ? 'none' : '1px solid var(--divider)'">
          <span class="td td--name">{{ row.customer }}</span>
          <span class="td td--value">{{ row.value }}</span>
          <span class="td td--status">
            <cortex-status-badge [label]="row.status" [tone]="row.tone" />
          </span>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .thead {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1.3fr;
      padding: var(--space-3) var(--space-5);
      border-bottom: 1px solid var(--divider);
    }

    .th {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: var(--tracking-caption);
      color: var(--text-muted);
      font-weight: 600;
    }
    .th--right  { text-align: right; }
    .th--status { padding-left: var(--space-5); }

    .tr {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1.3fr;
      align-items: center;
      padding: 15px var(--space-5);
      transition: background var(--duration-short) var(--easing-standard);
      cursor: default;
      position: relative;
    }
    .tr::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--brand-primary);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration-short) var(--easing-standard);
    }
    .tr:hover::after { opacity: var(--state-hover-opacity); }
    .tr--alt { background: var(--surface-muted); }

    .td--name  { font: var(--type-body); font-weight: 600; color: var(--text-strong); }
    .td--value { font: var(--type-body); color: var(--text-strong); text-align: right; font-variant-numeric: var(--numeric-tabular); }
    .td--status { padding-left: var(--space-5); }
  `]
})
export class CortexDataTableComponent {
  @Input({ required: true }) rows!: TableRow[];
}
