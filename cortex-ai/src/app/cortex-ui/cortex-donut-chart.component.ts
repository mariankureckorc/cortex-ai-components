import { Component, ChangeDetectionStrategy, Input, signal } from '@angular/core';

export interface DonutDatum {
  label: string;
  value: number;
  color: string;
}

interface Seg { label: string; color: string; dash: string; offset: string; value: string; pct: string; }
interface LegendItem { label: string; color: string; pct: string; }

const R = 70, C = 2 * Math.PI * R, GAP = 3;

@Component({
  selector: 'cortex-donut-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="header">
        <span class="title">{{ title }}</span>
        @if (tip()) { <span class="tip">{{ tip() }}</span> }
      </div>
      <div class="row">
        <svg viewBox="0 0 180 180" class="donut" aria-hidden="true">
          <circle cx="90" cy="90" [attr.r]="R" fill="none" stroke="var(--surface-muted)" stroke-width="24"/>
          @for (s of segs; track s.label) {
            <circle cx="90" cy="90" [attr.r]="R" fill="none"
                    [attr.stroke]="s.color" stroke-width="24"
                    [attr.stroke-dasharray]="s.dash"
                    [attr.stroke-dashoffset]="s.offset"
                    stroke-linecap="round"
                    transform="rotate(-90 90 90)"
                    class="seg"
                    (mouseenter)="tip.set(s.label + ' · ' + s.value + ' · ' + s.pct)"
                    (mouseleave)="tip.set('')"/>
          }
          <text x="90" y="84" text-anchor="middle" font-family="'Poppins',sans-serif"
                font-weight="700" font-size="23" letter-spacing="-0.5" fill="var(--text-strong)">{{ total }}</text>
          <text x="90" y="103" text-anchor="middle" font-family="'Inter',sans-serif"
                font-size="11" fill="var(--text-muted)">pipeline</text>
        </svg>
        <div class="legend">
          @for (l of legend; track l.label) {
            <div class="legend-row">
              <span class="legend-dot" [style.background]="l.color"></span>
              <span class="legend-label">{{ l.label }}</span>
              <span class="legend-pct">{{ l.pct }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .container {
      border: 1px solid var(--divider);
      border-radius: var(--radius-md);
      padding: var(--space-4);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 26px;
      margin-bottom: var(--space-2);
    }

    .title {
      font: var(--type-label);
      color: var(--text-strong);
    }

    .tip {
      background: var(--neutral-0);
      box-shadow: var(--elevation-3);
      border: 1px solid var(--divider);
      color: var(--text-strong);
      font: var(--type-caption);
      font-weight: 500;
      padding: 5px 11px;
      border-radius: 8px;
      font-variant-numeric: tabular-nums;
      animation: cctip var(--duration-short) var(--easing-standard);
    }

    .row {
      display: flex;
      gap: 28px;
      align-items: center;
      flex-wrap: wrap;
    }

    .donut {
      width: 168px;
      height: 168px;
      flex-shrink: 0;
    }

    .seg {
      cursor: pointer;
      transition: stroke-width var(--duration-short) var(--easing-standard);
    }
    .seg:hover { stroke-width: 28; }

    .legend {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      flex: 1;
      min-width: 170px;
    }

    .legend-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
    }

    .legend-label {
      font: var(--type-body);
      color: var(--text-strong);
      flex: 1;
    }

    .legend-pct {
      font: var(--type-body);
      color: var(--text-muted);
      font-variant-numeric: tabular-nums;
    }
  `]
})
export class CortexDonutChartComponent {
  @Input({ required: true }) data!: DonutDatum[];
  @Input() title = '';

  tip = signal('');

  readonly R = R;

  get segs(): Seg[] {
    if (!this.data?.length) return [];
    const total = this.data.reduce((s, d) => s + d.value, 0);
    let cum = 0;
    return this.data.map(d => {
      const frac = d.value / total;
      const len = frac * C;
      const vis = Math.max(0, len - GAP);
      const pct = Math.round(frac * 100);
      const seg: Seg = {
        label: d.label, color: d.color,
        dash: `${vis.toFixed(2)} ${(C - vis).toFixed(2)}`,
        offset: `${(-cum).toFixed(2)}`,
        value: '$' + (d.value * 1000).toLocaleString(),
        pct: pct + '%',
      };
      cum += len;
      return seg;
    });
  }

  get legend(): LegendItem[] {
    if (!this.data?.length) return [];
    const total = this.data.reduce((s, d) => s + d.value, 0);
    return this.data.map(d => ({
      label: d.label, color: d.color,
      pct: Math.round(d.value / total * 100) + '%',
    }));
  }

  get total(): string {
    if (!this.data?.length) return '';
    const sum = this.data.reduce((s, d) => s + d.value, 0);
    return '$' + (sum / 1000).toFixed(1) + 'M';
  }
}
