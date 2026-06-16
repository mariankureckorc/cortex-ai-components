import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { ThemeService } from '../theme.service';

const NAV_ITEMS = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'chat', label: 'Chat primitives' },
  { id: 'kpi', label: 'KPI cards' },
  { id: 'tables', label: 'Tables' },
  { id: 'badges', label: 'Status badges' },
  { id: 'info', label: 'Information blocks' },
  { id: 'charts', label: 'Charts' },
  { id: 'lists', label: 'Lists' },
];

@Component({
  selector: 'app-side-nav',
  standalone: true,
  template: `
    <nav class="sidenav">
      <div class="nav-list">
        @for (item of navItems; track item.id) {
          <a
            [href]="'#' + item.id"
            class="nav-link"
            [class.active]="activeId() === item.id"
            (click)="setActive(item.id)"
          >{{ item.label }}</a>
        }
      </div>
    </nav>
  `,
  styles: [`
    .sidenav {
      position: sticky;
      top: 24px;
      width: 196px;
      flex-shrink: 0;
    }
    .nav-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-left: 14px;
      border-left: 2px solid var(--hairline);
    }
    .nav-link {
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 8px;
      text-decoration: none;
      transition: background var(--dur-1) var(--ease-standard), color var(--dur-1) var(--ease-standard);
      color: var(--text-muted, #5C6370);
      font-weight: 500;
    }
    .nav-link:hover {
      background: var(--brand-50);
      color: var(--brand-700);
    }
    .nav-link.active {
      background: var(--brand-50);
      color: var(--brand-700);
      font-weight: 600;
    }
  `]
})
export class SideNavComponent implements OnInit, OnDestroy {
  theme = inject(ThemeService);
  navItems = NAV_ITEMS;
  activeId = signal('tokens');
  private observer?: IntersectionObserver;

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeId.set(entry.target.id);
        }
      });
    }, { rootMargin: '-42% 0px -52% 0px' });

    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  setActive(id: string) {
    this.activeId.set(id);
  }
}
