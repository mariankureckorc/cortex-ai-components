import { Component, inject, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ThemeService } from './theme.service';
import { ThemePanelComponent } from './theme-panel/theme-panel.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {
  CortexUserBubbleComponent,
  CortexAssistantMessageComponent,
  CortexTypingIndicatorComponent,
  CortexSuggestionChipComponent,
  CortexChatInputComponent,
  CortexKpiCardComponent,
  CortexDataTableComponent,
  CortexStatusBadgeComponent,
  CortexInfoBlockComponent,
  CortexBarChartComponent,
  CortexLineChartComponent,
  CortexDonutChartComponent,
  CortexRecordListComponent,
  type TableRow,
  type DeltaDir,
  type InfoVariant,
  type BadgeTone,
  type ListItem,
  type BarDatum,
  type LineDatum,
  type DonutDatum,
} from './cortex-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgStyle,
    ThemePanelComponent,
    SideNavComponent,
    CortexUserBubbleComponent,
    CortexAssistantMessageComponent,
    CortexTypingIndicatorComponent,
    CortexSuggestionChipComponent,
    CortexChatInputComponent,
    CortexKpiCardComponent,
    CortexDataTableComponent,
    CortexStatusBadgeComponent,
    CortexInfoBlockComponent,
    CortexBarChartComponent,
    CortexLineChartComponent,
    CortexDonutChartComponent,
    CortexRecordListComponent,
  ],
  template: `
    <div class="root-wrapper" [style]="themeVarsStyle()">
      <div class="page-bg">
        <app-theme-panel/>

        <!-- HERO -->
        <div class="hero-container">
          <div class="hero-logo-row">
            <span class="logo-diamond" [style.background]="theme.brandPrimary()"></span>
            <span class="logo-label">CORTEX&nbsp;AI</span>
          </div>
          <h1 class="hero-h1">Chat assistant component library</h1>
          <p class="hero-p">Every reusable component the Cortex AI assistant renders inside the CRM, defined once. The system is white-label ready: one brand token drives the entire palette, while semantic colours stay constant.</p>
        </div>

        <!-- BODY -->
        <div class="body-layout">
          <app-side-nav/>

          <main class="main-content">

            <!-- ===== 01 TOKENS ===== -->
            <section id="tokens" class="section">
              <div class="section-num">01</div>
              <h2 class="section-h2">Tokens</h2>
              <p class="section-p">The brand colour is tenant-configurable and resolves to a full tonal ramp; everything else stays fixed across tenants.</p>

              <div class="card">
                <div class="sub-header">
                  Brand
                  <span class="badge-pill brand">tenant-configurable</span>
                </div>
                <div class="brand-color-grid">
                  <div class="color-chip-card">
                    <div class="color-chip" [style.background]="theme.brandPrimary()" style="height:58px;"></div>
                    <div class="color-chip-info">
                      <div class="color-chip-name">Primary</div>
                      <div class="color-chip-token">--brand-primary</div>
                    </div>
                  </div>
                </div>
                <div class="token-note">Surface, hover, and accessible-text tints are derived automatically — tenants only set the primary brand colour.</div>

                <div class="divider"></div>

                <div class="sub-header">
                  Semantic
                  <span class="badge-pill neutral">fixed</span>
                </div>
                <div class="semantic-grid">
                  @for (g of semanticGroups; track g.name) {
                    <div class="semantic-card">
                      <div class="semantic-swatches">
                        <span class="sem-swatch" [style.background]="g.c1"></span>
                        <span class="sem-swatch sem-swatch--border" [style.background]="g.c2" [style.border-color]="g.c3"></span>
                        <span class="sem-swatch" [style.background]="g.c3"></span>
                      </div>
                      <div class="semantic-name">{{ g.name }}</div>
                      <div class="semantic-tokens">strong · bg · border</div>
                    </div>
                  }
                </div>

                <div class="divider"></div>

                <div class="sub-header-plain">Neutrals</div>
                <div class="neutral-grid">
                  @for (s of neutralSwatches; track s.name) {
                    <div class="neutral-card">
                      <div class="neutral-chip" [style.background]="s.bg"></div>
                      <div class="neutral-label">{{ s.name }}</div>
                    </div>
                  }
                </div>

                <div class="divider"></div>

                <div class="sub-header-plain">Type scale</div>
                <div class="type-scale-list">
                  @for (t of typeScale; track t.role) {
                    <div class="type-row">
                      <span [ngStyle]="t.style">{{ t.role }}</span>
                      <span class="type-spec">{{ t.spec }}</span>
                    </div>
                  }
                </div>
              </div>
              <div class="section-tokens">tokens: --brand-primary · --brand-50/100/300/700 · --text-strong/muted · --divider · --surface-brand/muted · semantic-main/bg/border/strong · --radius-* · --elevation-* · --easing-standard · --duration-*</div>
            </section>

            <!-- ===== 02 CHAT PRIMITIVES ===== -->
            <section id="chat" class="section">
              <div class="section-num">02</div>
              <h2 class="section-h2">Chat primitives</h2>
              <p class="section-p">The building blocks of a Cortex AI conversation turn.</p>

              <div class="card" style="display:flex;flex-direction:column;gap:20px;">
                <cortex-user-bubble message="Give me key sales figures: total booked revenue, open pipeline value, and active deals."/>

                <cortex-assistant-message message="Here are the figures you asked for. Total booked revenue is $950,000 year to date, with $2,850,000 in open pipeline across 4 active deals."/>

                <cortex-typing-indicator/>

                <div class="chips-section">
                  <div class="chips-label">SUGGESTED PROMPTS</div>
                  <div class="chips-row">
                    @for (chip of chips; track chip) {
                      <cortex-suggestion-chip [label]="chip"/>
                    }
                  </div>
                </div>

                <cortex-chat-input/>
              </div>
              <div class="section-tokens">tokens: --brand-primary · --color-on-brand · --brand-subtle · --radius-md/pill · --elevation-2 · state layers: var(--state-hover-opacity)</div>
            </section>

            <!-- ===== 03 KPI CARDS ===== -->
            <section id="kpi" class="section">
              <div class="section-num">03</div>
              <h2 class="section-h2">KPI / metric cards</h2>
              <p class="section-p">Uppercase label, large tabular value, and a muted sub-line. Used when Cortex surfaces key figures.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;">
                  <div class="kpi-grid">
                    @for (k of kpis; track k.label) {
                      <cortex-kpi-card [label]="k.label" [value]="k.value" [sub]="k.sub" [delta]="k.delta" [dir]="k.dir" [brand]="k.brand"/>
                    }
                  </div>
                </div>
              </div>
              <div class="section-tokens">tokens: --surface-muted · --surface-brand · --text-strong/muted · --success/danger-bg/strong · --radius-md</div>
            </section>

            <!-- ===== 04 DATA TABLE ===== -->
            <section id="tables" class="section">
              <div class="section-num">04</div>
              <h2 class="section-h2">Data table</h2>
              <p class="section-p">Quiet uppercase header, hairline dividers, right-aligned tabular numerics, a status column, and a row-hover state layer.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;padding:0;overflow:hidden;">
                  <cortex-data-table [rows]="tableRows"/>
                </div>
              </div>
              <div class="section-tokens">tokens: --neutral-0 · --divider · --text-strong/muted · --surface-muted (zebra) · state layer: var(--state-hover-opacity) · semantic badge tokens</div>
            </section>

            <!-- ===== 05 STATUS BADGES ===== -->
            <section id="badges" class="section">
              <div class="section-num">05</div>
              <h2 class="section-h2">Status badges</h2>
              <p class="section-p">One precise spec: consistent height, a quiet tint, and a colour dot that carries the meaning. Semantic tokens only.</p>

              <div class="card" style="padding:8px 24px;">
                @for (b of badgeItems; track b.label; let i = $index) {
                  <div class="badge-row" [style.border-top]="i === 0 ? 'none' : '1px solid var(--divider)'">
                    <cortex-status-badge [label]="b.label" [tone]="b.tone"/>
                    <span class="badge-meaning">{{ b.meaning }}</span>
                    <span class="badge-token">{{ b.token }}</span>
                  </div>
                }
              </div>
              <div class="section-tokens">tokens: --success/danger/warning/info-main (dot) · -bg (tint) · -strong (label) · --surface-muted (neutral)</div>
            </section>

            <!-- ===== 06 INFORMATION BLOCKS ===== -->
            <section id="info" class="section">
              <div class="section-num">06</div>
              <h2 class="section-h2">Information blocks</h2>
              <p class="section-p">One component, one spec: tonal-tint background, a 4px accent, an optically-aligned role icon, identical padding. Only the role colour differs.</p>

              <div class="info-blocks-list">
                @for (b of infoBlocks; track b.title) {
                  <cortex-info-block [variant]="b.variant" [title]="b.title" [body]="b.body" [action]="b.action"/>
                }
              </div>
              <div class="section-tokens">tokens: --brand-subtle/primary/700 · semantic -bg (tint) / -main (accent+icon) / -strong (action) · --radius-md</div>
            </section>

            <!-- ===== 07 CHARTS ===== -->
            <section id="charts" class="section">
              <div class="section-num">07</div>
              <h2 class="section-h2">Charts</h2>
              <p class="section-p">Rendered inside an assistant card. The categorical palette is derived from the brand ramp plus semantic tones, so charts re-theme live. Hover for values.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;">
                  <div class="chart-intro">Cortex showed you these in your last session.</div>
                  <cortex-bar-chart title="Deal value by customer" [data]="barData"/>
                  <cortex-line-chart title="Open pipeline trend" [data]="lineData" style="margin-top:14px;"/>
                  <cortex-donut-chart title="Pipeline by stage" [data]="donutData" style="margin-top:14px;"/>
                </div>
              </div>
              <div class="section-tokens">tokens: --brand-primary · --brand-100 · --info-main · --success-main · --warning-main · --neutral-400 · --text-muted · --divider · --elevation-3 (tooltip)</div>
            </section>

            <!-- ===== 08 LISTS ===== -->
            <section id="lists" class="section" style="margin-bottom:24px;">
              <div class="section-num">08</div>
              <h2 class="section-h2">Lists</h2>
              <p class="section-p">A compact record list with brand-accent links and a row-hover state layer.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;padding:0;overflow:hidden;">
                  <cortex-record-list [items]="listItems"/>
                </div>
              </div>
              <div class="section-tokens">tokens: --brand-700 (link) · --brand-primary (dot) · --neutral-0 · --divider · state layer: var(--state-hover-opacity)</div>
            </section>

          </main>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .root-wrapper { min-height: 100vh; }

    .page-bg {
      min-height: 100vh;
      background: #F1F2F4;
      padding-bottom: 88px;
    }

    .hero-container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 48px 28px 12px;
    }

    .hero-logo-row {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .logo-diamond {
      width: 13px;
      height: 13px;
      border-radius: 4px;
      transform: rotate(45deg);
    }

    .logo-label {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      letter-spacing: .18em;
      color: var(--brand-700);
      font-weight: 600;
    }

    .hero-h1 {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 40px;
      line-height: 1.05;
      letter-spacing: -.022em;
      color: var(--text-strong);
      margin: 16px 0 0;
      max-width: 780px;
    }

    .hero-p {
      font-size: 16px;
      line-height: 1.55;
      color: var(--text-muted);
      max-width: 670px;
      margin: 14px 0 0;
    }

    .body-layout {
      display: flex;
      gap: 40px;
      max-width: 1180px;
      margin: 0 auto;
      padding: 32px 28px 0;
      align-items: flex-start;
    }

    .main-content {
      flex: 1;
      min-width: 0;
      max-width: 818px;
    }

    .section {
      scroll-margin-top: 24px;
      margin-bottom: 56px;
    }

    .section-num {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      letter-spacing: .04em;
      color: var(--brand-700);
      font-weight: 600;
    }

    .section-h2 {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 24px;
      letter-spacing: -.01em;
      color: var(--text-strong);
      margin: 8px 0 6px;
    }

    .section-p {
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-muted);
      margin: 0 0 20px;
    }

    .section-tokens {
      margin-top: 12px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      color: var(--text-muted);
    }

    .card {
      background: var(--neutral-0);
      border-radius: var(--radius-lg);
      box-shadow: var(--elevation-1);
      padding: 24px;
    }

    /* Tokens section */
    .sub-header {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sub-header-plain {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong);
    }

    .badge-pill {
      font-size: 11px;
      font-weight: 500;
      padding: 2px 9px;
      border-radius: var(--radius-pill);
    }
    .badge-pill.brand   { color: var(--brand-700); background: var(--brand-subtle); }
    .badge-pill.neutral { color: var(--text-muted); background: var(--surface-muted); }

    .brand-color-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 14px;
    }

    .color-chip-card {
      border: 1px solid var(--divider);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .color-chip { width: 100%; }

    .color-chip-info { padding: 11px 14px; }

    .color-chip-name {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong);
    }

    .color-chip-token {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .token-note {
      font-size: 12px;
      line-height: 1.45;
      color: var(--text-muted);
      margin-top: 12px;
    }

    .divider {
      height: 1px;
      background: var(--divider);
      margin: 24px 0;
    }

    .semantic-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }

    .semantic-card {
      border: 1px solid var(--divider);
      border-radius: var(--radius-md);
      padding: 14px;
    }

    .semantic-swatches { display: flex; gap: 6px; }

    .sem-swatch { flex: 1; height: 30px; border-radius: 6px; }
    .sem-swatch--border { border: 1px solid; }

    .semantic-name {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong);
      margin-top: 11px;
      text-transform: capitalize;
    }

    .semantic-tokens {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 10.5px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .neutral-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      margin-top: 14px;
    }

    .neutral-card {
      border: 1px solid var(--divider);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .neutral-chip {
      height: 44px;
      border-bottom: 1px solid var(--divider);
    }

    .neutral-label {
      padding: 8px 10px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-strong);
    }

    .type-scale-list {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .type-row { display: flex; align-items: baseline; gap: 16px; }

    .type-spec {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-muted);
      margin-left: auto;
      white-space: nowrap;
    }

    /* Shared layout */
    .assistant-card-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .robot-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--brand-subtle);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    /* Chat section */
    .chips-section {}
    .chips-label {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      letter-spacing: .07em;
      color: var(--text-muted);
      font-weight: 600;
      margin-bottom: 10px;
    }
    .chips-row { display: flex; flex-wrap: wrap; gap: 10px; }

    /* KPI section */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    /* Badges section */
    .badge-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 0;
    }

    .badge-meaning {
      font-size: 13px;
      color: var(--text-muted);
    }

    .badge-token {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11.5px;
      color: var(--text-muted);
      opacity: 0.7;
      margin-left: auto;
    }

    /* Info blocks section */
    .info-blocks-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Charts section */
    .chart-intro {
      font-size: 14px;
      color: var(--text-strong);
      margin-bottom: 18px;
    }
  `]
})
export class AppComponent {
  theme = inject(ThemeService);

  themeVarsStyle = computed(() => {
    const vars = this.theme.cssVars();
    return Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';');
  });

  // ===== DATA =====

  semanticGroups = [
    { name: 'success', c1: 'var(--success-main)', c2: 'var(--success-bg)', c3: 'var(--success-border)' },
    { name: 'danger',  c1: 'var(--danger-main)',  c2: 'var(--danger-bg)',  c3: 'var(--danger-border)'  },
    { name: 'warning', c1: 'var(--warning-main)', c2: 'var(--warning-bg)', c3: 'var(--warning-border)' },
    { name: 'info',    c1: 'var(--info-main)',    c2: 'var(--info-bg)',    c3: 'var(--info-border)'    },
  ];

  neutralSwatches = [
    { name: '--text-strong',    bg: 'var(--text-strong)'  },
    { name: '--text-muted',     bg: 'var(--text-muted)'   },
    { name: '--divider',        bg: 'var(--divider)'       },
    { name: '--surface-muted',  bg: 'var(--surface-muted)' },
  ];

  typeScale = [
    { role: 'Display',  spec: 'Poppins 700 · 40 / 1.05 · -0.02em', style: { fontFamily: "'Poppins',sans-serif", fontWeight: '700', fontSize: '26px', letterSpacing: '-.02em', color: 'var(--text-strong)' } },
    { role: 'Headline', spec: 'Poppins 600 · 24 / 1.15 · -0.01em', style: { fontFamily: "'Poppins',sans-serif", fontWeight: '600', fontSize: '20px', letterSpacing: '-.01em', color: 'var(--text-strong)' } },
    { role: 'Title',    spec: 'Poppins 600 · 14 / 1.3',             style: { fontFamily: "'Poppins',sans-serif", fontWeight: '600', fontSize: '15px', color: 'var(--text-strong)' } },
    { role: 'Body',     spec: 'Inter 400 · 14 / 1.5',               style: { fontFamily: "'Inter',sans-serif",  fontWeight: '400', fontSize: '15px', color: 'var(--text-strong)' } },
    { role: 'LABEL',    spec: 'mono 600 · 11 · 0.07em',             style: { fontFamily: 'ui-monospace,Menlo,monospace', fontWeight: '600', fontSize: '12px', letterSpacing: '.07em', color: 'var(--text-muted)' } },
    { role: 'Caption',  spec: 'Inter 400 · 12 / 1.45',              style: { fontFamily: "'Inter',sans-serif",  fontWeight: '400', fontSize: '13px', color: 'var(--text-muted)' } },
  ];

  chips = ['Show deals at risk', 'Forecast this quarter', 'Top 5 open opportunities', 'Summarise Acme Corp'];

  kpis: Array<{ label: string; value: string; sub: string; delta: string; dir: DeltaDir; brand: boolean }> = [
    { label: 'TOTAL BOOKED REVENUE', value: '$950,000',   sub: '2026 YTD',        delta: '8.2%', dir: 'up',   brand: false },
    { label: 'OPEN PIPELINE VALUE',  value: '$2,850,000', sub: 'As of 2026-06-16', delta: '',     dir: 'up',   brand: true  },
    { label: 'ACTIVE DEALS',         value: '4',          sub: 'As of 2026-06-16', delta: '1',    dir: 'down', brand: false },
  ];

  tableRows: TableRow[] = [
    { customer: 'Acme Corp',       value: '$500,000',   status: 'In Negotiation', tone: 'warning' },
    { customer: 'Global Tech',     value: '$1,200,000', status: 'Proposal Sent',  tone: 'info'    },
    { customer: 'Innovate Ltd.',   value: '$850,000',   status: 'Contracting',    tone: 'info'    },
    { customer: 'Future Dynamics', value: '$950,000',   status: 'Closed Won',     tone: 'success' },
    { customer: 'Bright Future',   value: '$300,000',   status: 'Initial Contact',tone: 'neutral' },
  ];

  badgeItems: Array<{ label: string; tone: BadgeTone; meaning: string; token: string }> = [
    { label: 'Closed Won',     tone: 'success', meaning: 'Won / complete',      token: '--success-main' },
    { label: 'In Progress',    tone: 'info',    meaning: 'In progress',          token: '--info-main'    },
    { label: 'In Negotiation', tone: 'warning', meaning: 'Needs attention',      token: '--warning-main' },
    { label: 'Draft',          tone: 'neutral', meaning: 'Inactive / draft',     token: '--surface-muted' },
    { label: 'Overdue',        tone: 'danger',  meaning: 'Critical / overdue',   token: '--danger-main'  },
  ];

  infoBlocks: Array<{ variant: InfoVariant; title: string; body: string; action: string }> = [
    { variant: 'brand',   title: 'Featured insight', body: 'Open pipeline is up 12% versus last quarter, led by enterprise deals.', action: 'View pipeline' },
    { variant: 'success', title: 'Closed won',        body: 'Future Dynamics ($950,000) moved to Closed Won this week.',             action: 'Open deal'    },
    { variant: 'danger',  title: 'At risk',            body: 'Acme Corp ($500,000) has been in negotiation beyond the expected cycle.',action: 'Review deal'  },
    { variant: 'warning', title: 'Needs attention',   body: 'Three deals are missing a next step. Assign owners to keep them moving.',action: 'Assign owners'},
    { variant: 'info',    title: 'For your information', body: 'The quarterly forecast refreshes automatically on 2026-06-30.',       action: ''            },
  ];

  listItems: ListItem[] = [
    { name: 'Acme Corp',       meta: 'In Negotiation · Owner: A. Kostic', value: '$500,000'   },
    { name: 'Global Tech',     meta: 'Proposal Sent · Owner: M. Mlak',    value: '$1,200,000' },
    { name: 'Innovate Ltd.',   meta: 'Contracting · Owner: A. Kostic',    value: '$850,000'   },
    { name: 'Future Dynamics', meta: 'Closed Won · Owner: M. Mlak',       value: '$950,000'   },
  ];

  barData: BarDatum[] = [
    { label: 'Acme',     value: 500,  fill: 'var(--warning-main)'  },
    { label: 'Global',   value: 1200, fill: 'var(--info-main)'     },
    { label: 'Innovate', value: 850,  fill: 'var(--brand-primary)' },
    { label: 'Future',   value: 950,  fill: 'var(--success-main)'  },
    { label: 'Bright',   value: 300,  fill: 'var(--neutral-400)'   },
  ];

  lineData: LineDatum[] = [
    { label: 'Jan', value: 1.8  },
    { label: 'Feb', value: 2.1  },
    { label: 'Mar', value: 2.0  },
    { label: 'Apr', value: 2.4  },
    { label: 'May', value: 2.6  },
    { label: 'Jun', value: 2.85 },
  ];

  donutData: DonutDatum[] = [
    { label: 'In Negotiation', value: 500,  color: 'var(--warning-main)'  },
    { label: 'Proposal Sent',  value: 1200, color: 'var(--info-main)'     },
    { label: 'Contracting',    value: 850,  color: 'var(--brand-primary)' },
    { label: 'Closed Won',     value: 950,  color: 'var(--success-main)'  },
    { label: 'Initial Contact',value: 300,  color: 'var(--neutral-400)'   },
  ];
}
