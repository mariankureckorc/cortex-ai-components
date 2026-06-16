import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  brandPrimary = signal('#F26B21');

  private hexToRgb(h: string): [number, number, number] {
    h = (h || '').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16) || 0;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  private toHex(r: number, g: number, b: number): string {
    const f = (x: number) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0');
    return '#' + f(r) + f(g) + f(b);
  }

  darken(h: string, a: number): string {
    const [r, g, b] = this.hexToRgb(h);
    return this.toHex(r * (1 - a), g * (1 - a), b * (1 - a));
  }

  mix(h: string, a: number): string {
    const [r, g, b] = this.hexToRgb(h);
    return this.toHex(r + (255 - r) * a, g + (255 - g) * a, b + (255 - b) * a);
  }

  cssVars = computed(() => {
    const brand = this.brandPrimary();
    return {
      '--brand-primary': brand,
      '--brand-50': this.mix(brand, 0.92),
      '--brand-100': this.mix(brand, 0.84),
      '--brand-300': this.mix(brand, 0.48),
      '--brand-700': this.darken(brand, 0.24),
      '--brand-hover': this.darken(brand, 0.12),
      '--brand-active': this.darken(brand, 0.24),
      '--bg-surface': this.mix(brand, 0.95),
    };
  });

  presets = [
    { id: 'rare', name: 'Rare Crew', color: '#F26B21' },
    { id: 'ocean', name: 'Ocean', color: '#2563EB' },
    { id: 'forest', name: 'Forest', color: '#0E8F73' },
    { id: 'plum', name: 'Plum', color: '#B5258F' },
  ];

  setTheme(color: string) {
    this.brandPrimary.set(color);
  }
}
