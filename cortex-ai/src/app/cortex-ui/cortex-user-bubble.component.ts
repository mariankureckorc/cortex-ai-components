import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cortex-user-bubble',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <div class="bubble">{{ message }}</div>
      <div class="avatar" aria-hidden="true"></div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .row {
      display: flex;
      gap: var(--space-3);
      justify-content: flex-end;
      align-items: flex-end;
    }

    .bubble {
      background: var(--brand-primary);
      color: var(--color-on-brand);
      padding: var(--space-3) var(--space-4);
      border-radius: 18px 18px 6px 18px;
      max-width: 72%;
      font: var(--type-body-lg);
      line-height: 1.55;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
      background-color: var(--neutral-300);
      background-image: repeating-linear-gradient(
        45deg,
        var(--neutral-300) 0 6px,
        var(--neutral-200) 6px 12px
      );
    }
  `]
})
export class CortexUserBubbleComponent {
  @Input({ required: true }) message!: string;
}
