import { Component, ChangeDetectionStrategy, Input, signal } from '@angular/core';

export interface LineDatum {
  label: string;
  value: number;
}

interface LineDot { x: number; y: number; label: string; value: string; }
interface Tick { y: number; ty: number; label: string; }

const X0 = 52, X1 = 468, TOP = 20, BOT = 190;

@Component({
  selector: 'cortex-line-chart',
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
          <line x1="52" x2="468" [attr.y1]="t.y" [attr.y2]="t.y" stroke="var(--divider)" stroke-width="1"/>
          <text x="44" [attr.y]="t.ty" text-anchor="end" font-size="11" fill="var(--text-muted)">{{ t.label }}</text>
        }
        <polygon [attr.points]="areaPoints" fill="var(--brand-100)" opacity="0.55"/>
        <polyline [attr.points]="linePoints" fill="none" stroke="var(--brand-primary)"
                  stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        @for (d of dots; track d.label) {
          <circle [attr.cx]="d.x" [attr.cy]="d.y" r="11" fill="transparent" class="hit"
                  (mouseenter)="tip.set(d.label + ' · ' + d.value)"
                  (mouseleave)="tip.set('')"/>
          <circle [attr.cx]="d.x" [attr.cy]="d.y" r="4" fill="#fff"
                  stroke="var(--brand-primary)" stroke-width="2.5" style="pointer-events:none;"/>
          <text [attr.x]="d.x" y="222" text-anchor="middle" font-size="11" fill="var(--text-muted)">{{ d.label }}</text>
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

    .hit { cursor: pointer; }
  `]
})
export class CortexLineChartComponent {
  @Input({ required: true }) data!: LineDatum[];
  @Input() title = '';

  tip = signal('');

  get dots(): LineDot[] {
    if (!this.data?.length) return [];
    const max = Math.ceil(Math.max(...this.data.map(d => d.value)));
    const step = (X1 - X0) / Math.max(1, this.data.length - 1);
    return this.data.map((d, i) => ({
      x: Math.round(X0 + step * i),
      y: Math.round(BOT - (d.value / max * (BOT - TOP))),
      label: d.label,
      value: '$' + d.value.toFixed(2) + 'M',
    }));
  }

  get linePoints(): string {
    return this.dots.map(p => `${p.x},${p.y}`).join(' ');
  }

  get areaPoints(): string {
    const pts = this.dots;
    if (!pts.length) return '';
    return `${pts[0].x},${BOT} ${this.linePoints} ${pts[pts.length - 1].x},${BOT}`;
  }

  get ticks(): Tick[] {
    if (!this.data?.length) return [];
    const max = Math.ceil(Math.max(...this.data.map(d => d.value)));
    return Array.from({ length: max + 1 }, (_, i) => {
      const y = BOT - (i / max * (BOT - TOP));
      return { y: Math.round(y), ty: Math.round(y + 4), label: i === 0 ? '0' : '$' + i + 'M' };
    });
  }
}
