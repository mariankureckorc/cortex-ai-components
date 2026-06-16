import { Component, ChangeDetectionStrategy, Input, signal } from '@angular/core';

export interface BarDatum {
  label: string;
  value: number;
  fill: string;
}

interface Bar { label: string; fill: string; path: string; cx: number; vy: number; vlabel: string; valueFull: string; }
interface Tick { y: number; ty: number; label: string; }

const X0 = 52, X1 = 468, TOP = 20, BOT = 190, BW = 44;

function roundTopRect(x: number, y: number, w: number, h: number, r: number): string {
  r = Math.max(0, Math.min(r, h, w / 2));
  return `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;
}

@Component({
  selector: 'cortex-bar-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="header">
        <span class="title">{{ title }}</span>
        @if (tip()) { <span class="tip">{{ tip() }}</span> }
      </div>
      <svg viewBox="0 0 480 240" class="svg" [attr.aria-label]="title">
        @for (t of ticks; track t.y) {
          <line x1="52" [attr.x2]="468" [attr.y1]="t.y" [attr.y2]="t.y" stroke="var(--divider)" stroke-width="1"/>
          <text x="44" [attr.y]="t.ty" text-anchor="end" font-size="11" fill="var(--text-muted)">{{ t.label }}</text>
        }
        @for (b of bars; track b.label) {
          <path [attr.d]="b.path" [attr.fill]="b.fill" class="bar"
                (mouseenter)="tip.set(b.label + ' · ' + b.valueFull)"
                (mouseleave)="tip.set('')"/>
          <text [attr.x]="b.cx" [attr.y]="b.vy" text-anchor="middle" font-size="11" font-weight="600"
                fill="var(--text-strong)" style="font-variant-numeric:tabular-nums;">{{ b.vlabel }}</text>
          <text [attr.x]="b.cx" y="222" text-anchor="middle" font-size="11" fill="var(--text-muted)">{{ b.label }}</text>
        }
      </svg>
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

    .svg {
      width: 100%;
      height: auto;
      font-family: 'Inter', sans-serif;
    }

    .bar {
      cursor: pointer;
      transition: opacity var(--duration-short) var(--easing-standard);
    }
    .bar:hover { opacity: 0.82; }
  `]
})
export class CortexBarChartComponent {
  @Input({ required: true }) data!: BarDatum[];
  @Input() title = '';

  tip = signal('');

  get bars(): Bar[] {
    if (!this.data?.length) return [];
    const max = Math.ceil(Math.max(...this.data.map(d => d.value)) / 100) * 100;
    const slot = (X1 - X0) / this.data.length;
    return this.data.map((d, i) => {
      const h = d.value / max * (BOT - TOP);
      const x = X0 + slot * i + (slot - BW) / 2;
      const y = BOT - h;
      return {
        label: d.label, fill: d.fill,
        path: roundTopRect(Math.round(x), Math.round(y), BW, Math.round(h), 5),
        cx: Math.round(x + BW / 2), vy: Math.round(y - 7),
        vlabel: '$' + d.value + 'K',
        valueFull: '$' + (d.value * 1000).toLocaleString(),
      };
    });
  }

  get ticks(): Tick[] {
    if (!this.data?.length) return [];
    const max = Math.ceil(Math.max(...this.data.map(d => d.value)) / 100) * 100;
    return [0, 1, 2, 3, 4].map(i => {
      const t = Math.round(max * i / 4);
      const y = BOT - (t / max * (BOT - TOP));
      return { y: Math.round(y), ty: Math.round(y + 4), label: t === 0 ? '0' : '$' + t + 'K' };
    });
  }
}
