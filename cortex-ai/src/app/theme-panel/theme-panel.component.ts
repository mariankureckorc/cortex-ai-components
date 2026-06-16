import { Component, inject } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-panel',
  standalone: true,
  template: `
    <aside class="panel">
      <div class="panel-title">Theme</div>
      <div class="panel-subtitle">Switch the tenant brand colour. The whole library re-skins live.</div>
      <div class="swatches">
        @for (p of theme.presets; track p.id) {
          <button
            class="swatch"
            [title]="p.name"
            [style.background]="p.color"
            [style.box-shadow]="isActive(p.color) ? '0 0 0 2px #fff, 0 0 0 4px ' + p.color : 'inset 0 0 0 1px rgba(20,23,33,.14)'"
            (click)="theme.setTheme(p.color)"
          ></button>
        }
      </div>
      <label class="custom-label">
        <span class="custom-text">Custom colour</span>
        <span class="custom-right">
          <span class="hex-display">{{ theme.brandPrimary() }}</span>
          <input type="color" [value]="theme.brandPrimary()" (input)="onColorInput($event)" (change)="onColorInput($event)" class="color-input" />
        </span>
      </label>
      <div class="semantic-note">
        <span class="dots">
          <span class="dot" style="background:var(--success)"></span>
          <span class="dot" style="background:var(--danger)"></span>
          <span class="dot" style="background:var(--warning)"></span>
          <span class="dot" style="background:var(--info)"></span>
        </span>
        <span class="note-text">Semantic colours are fixed and never change with the brand.</span>
      </div>
    </aside>
  `,
  styles: [`
    .panel {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 50;
      width: 268px;
      background: var(--bg-card, #fff);
      border-radius: var(--radius-xl, 20px);
      box-shadow: var(--elev-3);
      padding: 18px;
    }
    .panel-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: -.01em;
      color: var(--text-strong, #1F2430);
    }
    .panel-subtitle {
      font-size: 12px;
      line-height: 1.45;
      color: var(--text-muted, #5C6370);
      margin-top: 3px;
    }
    .swatches {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }
    .swatch {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      cursor: pointer;
      padding: 0;
      border: none;
      transition: box-shadow var(--dur-1) var(--ease-standard);
    }
    .custom-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 8px;
      padding: 11px 12px;
      border: 1px solid var(--border, #E6E8EC);
      border-radius: var(--radius-md, 12px);
      cursor: pointer;
      transition: border-color var(--dur-1) var(--ease-standard);
    }
    .custom-label:hover {
      border-color: var(--brand-300);
    }
    .custom-text {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-strong, #1F2430);
    }
    .custom-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hex-display {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-muted, #5C6370);
      text-transform: uppercase;
    }
    .color-input {
      width: 26px;
      height: 26px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      border-radius: 6px;
    }
    .semantic-note {
      margin-top: 12px;
      display: flex;
      gap: 9px;
      align-items: flex-start;
      padding: 11px 12px;
      background: var(--bg-subtle, #F6F7F9);
      border-radius: var(--radius-md, 12px);
    }
    .dots {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
      margin-top: 3px;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }
    .note-text {
      font-size: 11px;
      color: var(--text-muted, #5C6370);
      line-height: 1.45;
    }
  `]
})
export class ThemePanelComponent {
  theme = inject(ThemeService);

  isActive(color: string): boolean {
    return color.toLowerCase() === this.theme.brandPrimary().toLowerCase();
  }

  onColorInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.theme.setTheme(input.value);
  }
}
