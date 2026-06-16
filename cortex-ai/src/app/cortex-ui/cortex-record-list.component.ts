import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface ListItem {
  name: string;
  meta: string;
  value: string;
  href?: string;
}

@Component({
  selector: 'cortex-record-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list">
      @for (item of items; track item.name; let i = $index) {
        <div class="row" [style.border-top]="i === 0 ? 'none' : '1px solid var(--divider)'">
          <span class="dot" aria-hidden="true"></span>
          <div class="content">
            <a [href]="item.href || '#'" class="link cortex-focusable">{{ item.name }}</a>
            <div class="meta">{{ item.meta }}</div>
          </div>
          <span class="value">{{ item.value }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .list { overflow: hidden; }

    .row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: 15px var(--space-5);
      position: relative;
      transition: background var(--duration-short) var(--easing-standard);
    }
    .row::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--brand-primary);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration-short) var(--easing-standard);
    }
    .row:hover::after { opacity: var(--state-hover-opacity); }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--brand-primary);
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .content { flex: 1; min-width: 0; position: relative; z-index: 1; }

    .link {
      font: var(--type-body);
      font-weight: 600;
      font-size: 0.90625rem;
      color: var(--brand-700);
      text-decoration: none;
    }
    .link:hover { text-decoration: underline; }

    .meta {
      font: var(--type-caption);
      color: var(--text-muted);
      margin-top: 2px;
    }

    .value {
      font: var(--type-body);
      color: var(--text-strong);
      font-variant-numeric: var(--numeric-tabular);
      position: relative;
      z-index: 1;
    }
  `]
})
export class CortexRecordListComponent {
  @Input({ required: true }) items!: ListItem[];
}
