import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cortex-suggestion-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="chip cortex-focusable" (click)="selected.emit(label)">{{ label }}</button>
  `,
  styles: [`
    :host { display: inline-block; }

    .chip {
      background: var(--neutral-0);
      border: 1px solid var(--border-default, var(--neutral-200));
      color: var(--text-strong);
      font: var(--type-body);
      font-size: 0.84375rem;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-pill);
      cursor: pointer;
      position: relative;
      transition:
        border-color var(--duration-short) var(--easing-standard),
        color        var(--duration-short) var(--easing-standard);
    }

    .chip::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius-pill);
      background: var(--brand-primary);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration-short) var(--easing-standard);
    }

    .chip:hover {
      border-color: var(--brand-300);
      color: var(--brand-700);
    }
    .chip:hover::after { opacity: var(--state-hover-opacity); }
    .chip:active::after { opacity: var(--state-pressed-opacity); }
  `]
})
export class CortexSuggestionChipComponent {
  @Input({ required: true }) label!: string;
  @Output() selected = new EventEmitter<string>();
}
