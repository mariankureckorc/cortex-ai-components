import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ThemeService } from './theme.service';
import { ThemePanelComponent } from './theme-panel/theme-panel.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemePanelComponent, SideNavComponent, NgStyle],
  template: `
    <div class="root-wrapper" [style]="themeVarsStyle()">
      <div class="page-bg">
        <app-theme-panel></app-theme-panel>

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
          <app-side-nav></app-side-nav>

          <main class="main-content">

            <!-- ===== 01 TOKENS ===== -->
            <section id="tokens" class="section">
              <div class="section-num">01</div>
              <h2 class="section-h2">Tokens</h2>
              <p class="section-p">The brand colour is tenant-configurable and resolves to a full tonal ramp; everything else stays fixed across tenants.</p>

              <div class="card">
                <!-- Brand subsection -->
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

                <!-- Semantic subsection -->
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

                <!-- Neutrals -->
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

                <!-- Type scale -->
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
              <div class="section-tokens">tokens: --brand-primary · derived tints (--brand-50/100/300/700) · --text-strong/muted · --hairline · --bg-surface/subtle · semantic strong/bg/border/deep · --radius-* · --elev-* · --ease-* · --dur-*</div>
            </section>

            <!-- ===== 02 CHAT PRIMITIVES ===== -->
            <section id="chat" class="section">
              <div class="section-num">02</div>
              <h2 class="section-h2">Chat primitives</h2>
              <p class="section-p">The building blocks of a Cortex AI conversation turn.</p>

              <div class="card" style="display:flex;flex-direction:column;gap:20px;">
                <!-- User bubble -->
                <div class="bubble-row bubble-row--user">
                  <div class="user-bubble">Give me key sales figures: total booked revenue, open pipeline value, and active deals.</div>
                  <div class="user-avatar"></div>
                </div>

                <!-- Assistant message -->
                <div class="bubble-row bubble-row--assistant">
                  <div class="robot-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary,#F26B21)"/>
                      <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                      <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                      <path d="M12 3.6V8" stroke="var(--brand-primary,#F26B21)" stroke-width="2" stroke-linecap="round"/>
                      <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary,#F26B21)"/>
                    </svg>
                  </div>
                  <div class="assistant-bubble">Here are the figures you asked for. Total booked revenue is $950,000 year to date, with $2,850,000 in open pipeline across 4 active deals.</div>
                </div>

                <!-- Typing indicator -->
                <div class="bubble-row bubble-row--typing">
                  <div class="robot-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary,#F26B21)"/>
                      <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                      <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                      <path d="M12 3.6V8" stroke="var(--brand-primary,#F26B21)" stroke-width="2" stroke-linecap="round"/>
                      <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary,#F26B21)"/>
                    </svg>
                  </div>
                  <div class="typing-bubble">
                    <span class="typing-dot" style="animation-delay:0s"></span>
                    <span class="typing-dot" style="animation-delay:.18s"></span>
                    <span class="typing-dot" style="animation-delay:.36s"></span>
                  </div>
                </div>

                <!-- Suggestion chips -->
                <div class="chips-section">
                  <div class="chips-label">SUGGESTED PROMPTS</div>
                  <div class="chips-row">
                    @for (chip of chips; track chip) {
                      <button class="chip">{{ chip }}</button>
                    }
                  </div>
                </div>

                <!-- Input bar -->
                <div class="input-section">
                  <div class="input-bar">
                    <span class="input-placeholder">Ask Cortex AI</span>
                    <button class="send-btn">
                      Send
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    </button>
                  </div>
                  <div class="disclaimer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Prompts and actions are logged and auditable.
                  </div>
                </div>
              </div>
              <div class="section-tokens">tokens: --brand-primary · --brand-on · --brand-50 · --radius-lg · --elev-2 · state layers: brand-50 hover / brand-100 pressed</div>
            </section>

            <!-- ===== 03 KPI CARDS ===== -->
            <section id="kpi" class="section">
              <div class="section-num">03</div>
              <h2 class="section-h2">KPI / metric cards</h2>
              <p class="section-p">Uppercase label, large tabular value, and a muted sub-line. Used when Cortex surfaces key figures.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary,#F26B21)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary,#F26B21)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary,#F26B21)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;">
                  <div class="kpi-grid">
                    @for (k of kpis; track k.label) {
                      <div class="kpi-card" [style.background]="k.brand ? 'var(--brand-50)' : 'var(--bg-subtle)'">
                        <div class="kpi-label">{{ k.label }}</div>
                        <div class="kpi-value">{{ k.value }}</div>
                        <div class="kpi-footer">
                          @if (k.delta) {
                            <span class="kpi-delta" [style.color]="k.dir === 'up' ? 'var(--success-deep)' : 'var(--danger-deep)'" [style.background]="k.dir === 'up' ? 'var(--success-bg)' : 'var(--danger-bg)'">
                              {{ k.dir === 'up' ? '▲' : '▼' }} {{ k.delta }}
                            </span>
                          }
                          <span class="kpi-sub">{{ k.sub }}</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div class="section-tokens">tokens: --bg-card · --brand-50 · --bg-subtle · --text-strong/muted · --success/danger-bg/deep · --radius-lg</div>
            </section>

            <!-- ===== 04 DATA TABLE ===== -->
            <section id="tables" class="section">
              <div class="section-num">04</div>
              <h2 class="section-h2">Data table</h2>
              <p class="section-p">Quiet uppercase header, hairline dividers, right-aligned tabular numerics, a status column, and a row-hover state layer.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary,#F26B21)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary,#F26B21)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary,#F26B21)"/>
                  </svg>
                </div>
                <div class="card table-card" style="flex:1;min-width:0;padding:0;overflow:hidden;">
                  <div class="table-header">
                    <span class="th">CUSTOMER</span>
                    <span class="th th--right">VALUE</span>
                    <span class="th th--status">STATUS</span>
                  </div>
                  @for (d of tableDeals; track d.customer; let i = $index) {
                    <div class="table-row" [class.table-row--odd]="i % 2 === 0" [style.border-top]="i === 0 ? 'none' : '1px solid var(--hairline)'">
                      <span class="td td--name">{{ d.customer }}</span>
                      <span class="td td--value">{{ d.value }}</span>
                      <span class="td td--status">
                        <span class="badge" [style.background]="getBadgeBg(d.kind)" [style.color]="getBadgeDeep(d.kind)">
                          <span class="badge-dot" [style.background]="getBadgeDot(d.kind)"></span>
                          {{ d.status }}
                        </span>
                      </span>
                    </div>
                  }
                </div>
              </div>
              <div class="section-tokens">tokens: --bg-card · --hairline · --text-strong/muted · --bg-subtle (zebra) · --brand-50 (row hover) · semantic badge tokens</div>
            </section>

            <!-- ===== 05 STATUS BADGES ===== -->
            <section id="badges" class="section">
              <div class="section-num">05</div>
              <h2 class="section-h2">Status badges</h2>
              <p class="section-p">One precise spec: consistent height, a quiet tint, and a colour dot that carries the meaning. Semantic tokens only.</p>

              <div class="card" style="padding:8px 24px;">
                @for (b of badgeItems; track b.label; let i = $index) {
                  <div class="badge-row" [style.border-top]="i === 0 ? 'none' : '1px solid var(--hairline)'">
                    <span class="badge" [style.background]="getBadgeBg(b.kind)" [style.color]="getBadgeDeep(b.kind)">
                      <span class="badge-dot" [style.background]="getBadgeDot(b.kind)"></span>
                      {{ b.label }}
                    </span>
                    <span class="badge-meaning">{{ b.meaning }}</span>
                    <span class="badge-token">{{ b.token }}</span>
                  </div>
                }
              </div>
              <div class="section-tokens">tokens: --success/danger/warning/info (dot) · -bg (tint) · -deep (label) · --bg-subtle (neutral)</div>
            </section>

            <!-- ===== 06 INFORMATION BLOCKS ===== -->
            <section id="info" class="section">
              <div class="section-num">06</div>
              <h2 class="section-h2">Information blocks</h2>
              <p class="section-p">One component, one spec: tonal-tint background, a 4px accent, an optically-aligned role icon, identical padding. Only the role colour differs.</p>

              <div class="info-blocks-list">
                @for (b of infoBlocks; track b.title) {
                  <div class="info-block" [style.background]="b.bg" [style.border-left-color]="b.color">
                    <div class="info-icon" [style.background]="b.color">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path [attr.d]="b.iconPath"/>
                      </svg>
                    </div>
                    <div class="info-content">
                      <div class="info-title">{{ b.title }}</div>
                      <div class="info-body">{{ b.body }}</div>
                      @if (b.action) {
                        <button class="info-action" [style.color]="b.deep">{{ b.action }}</button>
                      }
                    </div>
                  </div>
                }
              </div>
              <div class="section-tokens">tokens: --brand-50/primary/700 · semantic -bg (tint) / strong (accent+icon) / -deep (action) · --radius-lg</div>
            </section>

            <!-- ===== 07 CHARTS ===== -->
            <section id="charts" class="section">
              <div class="section-num">07</div>
              <h2 class="section-h2">Charts</h2>
              <p class="section-p">Rendered inside an assistant card. The categorical palette is derived from the brand ramp plus semantic tones, so charts re-theme live. Hover for values.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary,#F26B21)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary,#F26B21)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary,#F26B21)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;">
                  <div class="chart-intro">Cortex showed you these in your last session.</div>

                  <!-- Bar Chart -->
                  <div class="chart-container">
                    <div class="chart-header">
                      <span class="chart-title">Deal value by customer</span>
                      @if (barTip()) {
                        <span class="tooltip">{{ barTip() }}</span>
                      }
                    </div>
                    <svg viewBox="0 0 480 240" style="width:100%;height:auto;font-family:'Inter',sans-serif;">
                      @for (t of barTicks; track t.y) {
                        <line x1="52" [attr.x2]="468" [attr.y1]="t.y" [attr.y2]="t.y" stroke="var(--hairline)" stroke-width="1"/>
                        <text x="44" [attr.y]="t.ty" text-anchor="end" font-size="11" fill="var(--text-muted,#5C6370)">{{ t.label }}</text>
                      }
                      @for (b of bars; track b.label) {
                        <path [attr.d]="b.path" [attr.fill]="b.fill" class="bar-path" (mouseenter)="setBarTip(b.label + ' · ' + b.valueFull)" (mouseleave)="setBarTip('')"/>
                        <text [attr.x]="b.cx" [attr.y]="b.vy" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-strong,#1F2430)" style="font-variant-numeric:tabular-nums;">{{ b.vlabel }}</text>
                        <text [attr.x]="b.cx" y="222" text-anchor="middle" font-size="11" fill="var(--text-muted,#5C6370)">{{ b.label }}</text>
                      }
                    </svg>
                  </div>

                  <!-- Line Chart -->
                  <div class="chart-container" style="margin-top:14px;">
                    <div class="chart-header">
                      <span class="chart-title">Open pipeline trend</span>
                      @if (lineTip()) {
                        <span class="tooltip">{{ lineTip() }}</span>
                      }
                    </div>
                    <svg viewBox="0 0 480 240" style="width:100%;height:auto;font-family:'Inter',sans-serif;">
                      @for (t of lineTicks; track t.y) {
                        <line x1="52" x2="468" [attr.y1]="t.y" [attr.y2]="t.y" stroke="var(--hairline)" stroke-width="1"/>
                        <text x="44" [attr.y]="t.ty" text-anchor="end" font-size="11" fill="var(--text-muted,#5C6370)">{{ t.label }}</text>
                      }
                      <polygon [attr.points]="lineArea" fill="var(--brand-100,#FDE7DB)" opacity="0.55"/>
                      <polyline [attr.points]="linePoints" fill="none" stroke="var(--brand-primary,#F26B21)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
                      @for (p of lineDots; track p.label) {
                        <circle [attr.cx]="p.x" [attr.cy]="p.y" r="11" fill="transparent" class="line-hit" (mouseenter)="setLineTip(p.label + ' · ' + p.value)" (mouseleave)="setLineTip('')"/>
                        <circle [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="#fff" stroke="var(--brand-primary,#F26B21)" stroke-width="2.5" style="pointer-events:none;"/>
                        <text [attr.x]="p.x" y="222" text-anchor="middle" font-size="11" fill="var(--text-muted,#5C6370)">{{ p.label }}</text>
                      }
                    </svg>
                  </div>

                  <!-- Donut Chart -->
                  <div class="chart-container" style="margin-top:14px;">
                    <div class="chart-header">
                      <span class="chart-title">Pipeline by stage</span>
                      @if (donutTip()) {
                        <span class="tooltip">{{ donutTip() }}</span>
                      }
                    </div>
                    <div class="donut-row">
                      <svg viewBox="0 0 180 180" style="width:168px;height:168px;flex-shrink:0;">
                        <circle cx="90" cy="90" r="70" fill="none" stroke="var(--bg-subtle,#F6F7F9)" stroke-width="24"/>
                        @for (s of donutSegs; track s.label) {
                          <circle
                            cx="90" cy="90" r="70" fill="none"
                            [attr.stroke]="s.color"
                            stroke-width="24"
                            [attr.stroke-dasharray]="s.dash"
                            [attr.stroke-dashoffset]="s.offset"
                            stroke-linecap="round"
                            transform="rotate(-90 90 90)"
                            class="donut-seg"
                            (mouseenter)="setDonutTip(s.label + ' · ' + s.value + ' · ' + s.pct + '%')"
                            (mouseleave)="setDonutTip('')"
                          />
                        }
                        <text x="90" y="84" text-anchor="middle" font-family="'Poppins',sans-serif" font-weight="700" font-size="23" letter-spacing="-0.5" fill="var(--text-strong,#1F2430)">{{ donutTotal }}</text>
                        <text x="90" y="103" text-anchor="middle" font-family="'Inter',sans-serif" font-size="11" fill="var(--text-muted,#5C6370)">pipeline</text>
                      </svg>
                      <div class="donut-legend">
                        @for (l of donutLegend; track l.label) {
                          <div class="legend-row">
                            <span class="legend-dot" [style.background]="l.color"></span>
                            <span class="legend-label">{{ l.label }}</span>
                            <span class="legend-pct">{{ l.pct }}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="section-tokens">tokens: --brand-primary · --info · --success · --warning · --text-faint · --hairline · --elev-3 (tooltip)</div>
            </section>

            <!-- ===== 08 LISTS ===== -->
            <section id="lists" class="section" style="margin-bottom:24px;">
              <div class="section-num">08</div>
              <h2 class="section-h2">Lists</h2>
              <p class="section-p">A compact record list with brand-accent links and a row-hover state layer.</p>

              <div class="assistant-card-row">
                <div class="robot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="8" width="16" height="11" rx="4" fill="var(--brand-primary,#F26B21)"/>
                    <circle cx="9.5" cy="13.5" r="1.7" fill="#fff"/>
                    <circle cx="14.5" cy="13.5" r="1.7" fill="#fff"/>
                    <path d="M12 3.6V8" stroke="var(--brand-primary,#F26B21)" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="3" r="1.6" fill="var(--brand-primary,#F26B21)"/>
                  </svg>
                </div>
                <div class="card" style="flex:1;min-width:0;padding:0;overflow:hidden;">
                  @for (item of listItems; track item.name; let i = $index) {
                    <div class="list-row" [style.border-top]="i === 0 ? 'none' : '1px solid var(--hairline)'">
                      <span class="list-dot"></span>
                      <div class="list-content">
                        <a href="#lists" class="list-link">{{ item.name }}</a>
                        <div class="list-meta">{{ item.meta }}</div>
                      </div>
                      <span class="list-value">{{ item.value }}</span>
                    </div>
                  }
                </div>
              </div>
              <div class="section-tokens">tokens: --brand-700 (link) · --brand-primary (dot) · --bg-card · --hairline · --brand-50 (row hover)</div>
            </section>

          </main>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .root-wrapper {
      min-height: 100vh;
    }
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
      color: var(--brand-700, #B85119);
      font-weight: 600;
    }
    .hero-h1 {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 40px;
      line-height: 1.05;
      letter-spacing: -.022em;
      color: var(--text-strong, #1F2430);
      margin: 16px 0 0;
      max-width: 780px;
    }
    .hero-p {
      font-size: 16px;
      line-height: 1.55;
      color: var(--text-muted, #5C6370);
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
      color: var(--brand-700, #B85119);
      font-weight: 600;
    }
    .section-h2 {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 24px;
      letter-spacing: -.01em;
      color: var(--text-strong, #1F2430);
      margin: 8px 0 6px;
    }
    .section-p {
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-muted, #5C6370);
      margin: 0 0 20px;
    }
    .section-tokens {
      margin-top: 12px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      color: var(--text-muted, #5C6370);
    }
    .card {
      background: var(--bg-card, #fff);
      border-radius: var(--radius-xl, 20px);
      box-shadow: var(--elev-1);
      padding: 24px;
    }
    .table-card {
      padding: 0;
    }
    .sub-header {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong, #1F2430);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sub-header-plain {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong, #1F2430);
    }
    .badge-pill {
      font-size: 11px;
      font-weight: 500;
      padding: 2px 9px;
      border-radius: 999px;
    }
    .badge-pill.brand {
      color: var(--brand-700, #B85119);
      background: var(--brand-50, #FEF3ED);
    }
    .badge-pill.neutral {
      color: var(--text-muted, #5C6370);
      background: var(--bg-subtle, #F6F7F9);
    }
    .brand-color-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 14px;
    }
    .color-chip-card {
      border: 1px solid var(--hairline);
      border-radius: var(--radius-lg, 16px);
      overflow: hidden;
    }
    .color-chip {
      width: 100%;
    }
    .color-chip-info {
      padding: 11px 14px;
    }
    .color-chip-name {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong, #1F2430);
    }
    .color-chip-token {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-muted, #5C6370);
      margin-top: 2px;
    }
    .token-note {
      font-size: 12px;
      line-height: 1.45;
      color: var(--text-muted, #5C6370);
      margin-top: 12px;
    }
    .divider {
      height: 1px;
      background: var(--hairline);
      margin: 24px 0;
    }
    .semantic-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    .semantic-card {
      border: 1px solid var(--hairline);
      border-radius: var(--radius-lg, 16px);
      padding: 14px;
    }
    .semantic-swatches {
      display: flex;
      gap: 6px;
    }
    .sem-swatch {
      flex: 1;
      height: 30px;
      border-radius: 6px;
    }
    .sem-swatch--border {
      border: 1px solid;
    }
    .semantic-name {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong, #1F2430);
      margin-top: 11px;
      text-transform: capitalize;
    }
    .semantic-tokens {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 10.5px;
      color: var(--text-muted, #5C6370);
      margin-top: 2px;
    }
    .neutral-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      margin-top: 14px;
    }
    .neutral-card {
      border: 1px solid var(--hairline);
      border-radius: var(--radius-md, 12px);
      overflow: hidden;
    }
    .neutral-chip {
      height: 44px;
      border-bottom: 1px solid var(--hairline);
    }
    .neutral-label {
      padding: 8px 10px;
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-strong, #1F2430);
    }
    .type-scale-list {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .type-row {
      display: flex;
      align-items: baseline;
      gap: 16px;
    }
    .type-spec {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      color: var(--text-muted, #5C6370);
      margin-left: auto;
      white-space: nowrap;
    }

    /* Chat primitives */
    .bubble-row {
      display: flex;
      gap: 12px;
    }
    .bubble-row--user {
      justify-content: flex-end;
      align-items: flex-end;
    }
    .bubble-row--assistant {
      align-items: flex-start;
    }
    .bubble-row--typing {
      align-items: center;
    }
    .user-bubble {
      background: var(--brand-primary, #F26B21);
      color: #fff;
      padding: 13px 18px;
      border-radius: 18px 18px 6px 18px;
      max-width: 72%;
      font-size: 15px;
      line-height: 1.55;
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #D9DCE3;
      flex-shrink: 0;
      background-image: repeating-linear-gradient(45deg, #cfd3da 0 6px, #d9dce3 6px 12px);
    }
    .robot-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--brand-50, #FEF3ED);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .assistant-bubble {
      background: var(--brand-50, #FEF3ED);
      padding: 14px 18px;
      border-radius: 6px 18px 18px 18px;
      max-width: 72%;
      font-size: 15px;
      line-height: 1.55;
      color: var(--text-strong, #1F2430);
    }
    .typing-bubble {
      background: var(--bg-card, #fff);
      box-shadow: var(--elev-2);
      padding: 13px 16px;
      border-radius: 6px 16px 16px 16px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .typing-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--brand-primary, #F26B21);
      animation: ccdot 1.2s infinite;
    }
    .chips-section { }
    .chips-label {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      letter-spacing: .07em;
      color: var(--text-muted, #5C6370);
      font-weight: 600;
      margin-bottom: 10px;
    }
    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .chip {
      background: var(--bg-card, #fff);
      border: 1px solid var(--border, #E6E8EC);
      color: var(--text-strong, #1F2430);
      font-size: 13.5px;
      padding: 8px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background var(--dur-1) var(--ease-standard), border-color var(--dur-1) var(--ease-standard), color var(--dur-1) var(--ease-standard);
      font-family: inherit;
    }
    .chip:hover {
      border-color: var(--brand-300);
      background: var(--brand-50);
      color: var(--brand-700);
    }
    .chip:active {
      background: var(--brand-100);
    }
    .input-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1.5px solid var(--border, #E6E8EC);
      border-radius: var(--radius-lg, 16px);
      padding: 6px 6px 6px 18px;
      background: var(--bg-card, #fff);
      transition: border-color var(--dur-1) var(--ease-standard);
    }
    .input-bar:hover {
      border-color: var(--brand-300);
    }
    .input-placeholder {
      flex: 1;
      font-size: 15px;
      color: var(--text-faint, #8A909C);
    }
    .send-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      background: var(--brand-primary, #F26B21);
      color: #fff;
      border: none;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 14px;
      padding: 10px 16px;
      border-radius: var(--radius-md, 12px);
      cursor: pointer;
      transition: background var(--dur-1) var(--ease-standard);
    }
    .send-btn:hover { background: var(--brand-hover, #D55E1D); }
    .send-btn:active { background: var(--brand-active, #B85119); }
    .disclaimer {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 10px;
      color: var(--text-muted, #5C6370);
      font-size: 12px;
    }

    /* KPI */
    .assistant-card-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .kpi-card {
      border-radius: var(--radius-lg, 16px);
      padding: 16px;
    }
    .kpi-label {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      letter-spacing: .07em;
      color: var(--text-muted, #5C6370);
      font-weight: 600;
    }
    .kpi-value {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 30px;
      letter-spacing: -.02em;
      color: var(--text-strong, #1F2430);
      margin-top: 10px;
      line-height: 1;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .kpi-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
    }
    .kpi-delta {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      font-variant-numeric: tabular-nums;
    }
    .kpi-sub {
      font-size: 12px;
      color: var(--text-muted, #5C6370);
    }

    /* Table */
    .table-header {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1.3fr;
      padding: 13px 24px;
      border-bottom: 1px solid var(--hairline);
    }
    .th {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11px;
      letter-spacing: .07em;
      color: var(--text-muted, #5C6370);
      font-weight: 600;
    }
    .th--right { text-align: right; }
    .th--status { padding-left: 20px; }
    .table-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1.3fr;
      align-items: center;
      padding: 15px 24px;
      transition: background var(--dur-1) var(--ease-standard);
    }
    .table-row:hover { background: var(--brand-50) !important; }
    .table-row--odd { background: var(--bg-subtle); }
    .td {}
    .td--name {
      font-size: 14px;
      color: var(--text-strong, #1F2430);
      font-weight: 600;
    }
    .td--value {
      font-size: 14px;
      color: var(--text-strong, #1F2430);
      text-align: right;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .td--status { padding-left: 20px; }

    /* Badges */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 24px;
      padding: 0 11px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .01em;
      white-space: nowrap;
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .badge-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 0;
    }
    .badge-meaning {
      font-size: 13px;
      color: var(--text-muted, #5C6370);
    }
    .badge-token {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 11.5px;
      color: var(--text-faint, #8A909C);
      margin-left: auto;
    }

    /* Info blocks */
    .info-blocks-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .info-block {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      border-left: 4px solid;
      border-radius: var(--radius-lg, 16px);
      padding: 16px 18px;
    }
    .info-icon {
      width: 30px;
      height: 30px;
      border-radius: 9px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .info-content { flex: 1; min-width: 0; }
    .info-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-strong, #1F2430);
    }
    .info-body {
      font-size: 14px;
      color: var(--text-muted, #5C6370);
      line-height: 1.5;
      margin-top: 3px;
    }
    .info-action {
      margin-top: 9px;
      background: none;
      border: none;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }
    .info-action:hover { text-decoration: underline; }

    /* Charts */
    .chart-intro {
      font-size: 14px;
      color: var(--text-strong, #1F2430);
      margin-bottom: 18px;
    }
    .chart-container {
      position: relative;
      border: 1px solid var(--hairline);
      border-radius: var(--radius-lg, 16px);
      padding: 18px;
    }
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 26px;
      margin-bottom: 8px;
    }
    .chart-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-strong, #1F2430);
    }
    .tooltip {
      animation: cctip var(--dur-1) var(--ease-standard);
      background: var(--bg-card);
      box-shadow: var(--elev-3);
      border: 1px solid var(--hairline);
      color: var(--text-strong);
      font-size: 12px;
      font-weight: 500;
      padding: 5px 11px;
      border-radius: 8px;
      font-variant-numeric: tabular-nums;
    }
    .bar-path {
      cursor: pointer;
      transition: opacity var(--dur-1) var(--ease-standard);
    }
    .bar-path:hover { opacity: 0.82; }
    .line-hit { cursor: pointer; }
    .donut-row {
      display: flex;
      gap: 28px;
      align-items: center;
      flex-wrap: wrap;
    }
    .donut-seg {
      cursor: pointer;
      transition: stroke-width var(--dur-1) var(--ease-standard);
    }
    .donut-seg:hover { stroke-width: 28; }
    .donut-legend {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      min-width: 170px;
    }
    .legend-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .legend-label {
      font-size: 13px;
      color: var(--text-strong, #1F2430);
      flex: 1;
    }
    .legend-pct {
      font-size: 13px;
      color: var(--text-muted, #5C6370);
      font-variant-numeric: tabular-nums;
    }

    /* Lists */
    .list-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px 22px;
      transition: background var(--dur-1) var(--ease-standard);
    }
    .list-row:hover { background: var(--brand-50); }
    .list-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--brand-primary, #F26B21);
      flex-shrink: 0;
    }
    .list-content { flex: 1; min-width: 0; }
    .list-link {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--brand-700, #B85119);
      text-decoration: none;
    }
    .list-meta {
      font-size: 12.5px;
      color: var(--text-muted, #5C6370);
      margin-top: 2px;
    }
    .list-value {
      font-size: 14px;
      color: var(--text-strong, #1F2430);
      font-variant-numeric: tabular-nums lining-nums;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  theme = inject(ThemeService);

  // Tooltip signals
  barTip = signal('');
  lineTip = signal('');
  donutTip = signal('');

  setBarTip(v: string) { this.barTip.set(v); }
  setLineTip(v: string) { this.lineTip.set(v); }
  setDonutTip(v: string) { this.donutTip.set(v); }

  themeVarsStyle = computed(() => {
    const vars = this.theme.cssVars();
    return Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';');
  });

  // ===== DATA =====

  semanticGroups = [
    { name: 'success', c1: 'var(--success)', c2: 'var(--success-bg)', c3: 'var(--success-border)' },
    { name: 'danger', c1: 'var(--danger)', c2: 'var(--danger-bg)', c3: 'var(--danger-border)' },
    { name: 'warning', c1: 'var(--warning)', c2: 'var(--warning-bg)', c3: 'var(--warning-border)' },
    { name: 'info', c1: 'var(--info)', c2: 'var(--info-bg)', c3: 'var(--info-border)' },
  ];

  neutralSwatches = [
    { name: '--text-strong', bg: '#1F2430' },
    { name: '--text-muted', bg: '#5C6370' },
    { name: '--border', bg: '#E6E8EC' },
    { name: '--bg-surface', bg: 'var(--bg-surface)' },
  ];

  typeScale = [
    { role: 'Display', spec: 'Poppins 700 · 40 / 1.05 · -0.02em', style: { fontFamily: "'Poppins',sans-serif", fontWeight: '700', fontSize: '26px', letterSpacing: '-.02em', color: 'var(--text-strong)' } },
    { role: 'Headline', spec: 'Poppins 600 · 24 / 1.15 · -0.01em', style: { fontFamily: "'Poppins',sans-serif", fontWeight: '600', fontSize: '20px', letterSpacing: '-.01em', color: 'var(--text-strong)' } },
    { role: 'Title', spec: 'Poppins 600 · 14 / 1.3', style: { fontFamily: "'Poppins',sans-serif", fontWeight: '600', fontSize: '15px', color: 'var(--text-strong)' } },
    { role: 'Body', spec: 'Inter 400 · 14 / 1.5', style: { fontFamily: "'Inter',sans-serif", fontWeight: '400', fontSize: '15px', color: 'var(--text-strong)' } },
    { role: 'LABEL', spec: 'mono 600 · 11 · 0.07em', style: { fontFamily: 'ui-monospace,Menlo,monospace', fontWeight: '600', fontSize: '12px', letterSpacing: '.07em', color: 'var(--text-muted)' } },
    { role: 'Caption', spec: 'Inter 400 · 12 / 1.45', style: { fontFamily: "'Inter',sans-serif", fontWeight: '400', fontSize: '13px', color: 'var(--text-muted)' } },
  ];

  chips = ['Show deals at risk', 'Forecast this quarter', 'Top 5 open opportunities', 'Summarise Acme Corp'];

  kpis = [
    { label: 'TOTAL BOOKED REVENUE', value: '$950,000', sub: '2026 YTD', delta: '8.2%', dir: 'up', brand: false },
    { label: 'OPEN PIPELINE VALUE', value: '$2,850,000', sub: 'As of 2026-06-16', delta: '', dir: '', brand: true },
    { label: 'ACTIVE DEALS', value: '4', sub: 'As of 2026-06-16', delta: '1', dir: 'down', brand: false },
  ];

  tableDeals = [
    { customer: 'Acme Corp', value: '$500,000', status: 'In Negotiation', kind: 'warning' },
    { customer: 'Global Tech', value: '$1,200,000', status: 'Proposal Sent', kind: 'info' },
    { customer: 'Innovate Ltd.', value: '$850,000', status: 'Contracting', kind: 'info' },
    { customer: 'Future Dynamics', value: '$950,000', status: 'Closed Won', kind: 'positive' },
    { customer: 'Bright Future', value: '$300,000', status: 'Initial Contact', kind: 'neutral' },
  ];

  badgeItems = [
    { label: 'Closed Won', kind: 'positive', meaning: 'Won / complete', token: '--success' },
    { label: 'In Progress', kind: 'info', meaning: 'In progress', token: '--info' },
    { label: 'In Negotiation', kind: 'warning', meaning: 'Needs attention', token: '--warning' },
    { label: 'Draft', kind: 'neutral', meaning: 'Inactive / draft', token: '--bg-subtle' },
    { label: 'Overdue', kind: 'danger', meaning: 'Critical / overdue', token: '--danger' },
  ];

  infoBlocks = [
    { title: 'Featured insight', body: 'Open pipeline is up 12% versus last quarter, led by enterprise deals.', action: 'View pipeline', kind: 'brand', iconPath: 'M12 4l7 8-7 8-7-8z', color: 'var(--brand-primary)', bg: 'var(--brand-50)', deep: 'var(--brand-700)' },
    { title: 'Closed won', body: 'Future Dynamics ($950,000) moved to Closed Won this week.', action: 'Open deal', kind: 'positive', iconPath: 'M5 13l4 4 10-10', color: 'var(--success)', bg: 'var(--success-bg)', deep: 'var(--success-deep)' },
    { title: 'At risk', body: 'Acme Corp ($500,000) has been in negotiation beyond the expected cycle.', action: 'Review deal', kind: 'danger', iconPath: 'M12 7v6 M12 17h.01', color: 'var(--danger)', bg: 'var(--danger-bg)', deep: 'var(--danger-deep)' },
    { title: 'Needs attention', body: 'Three deals are missing a next step. Assign owners to keep them moving.', action: 'Assign owners', kind: 'warning', iconPath: 'M12 7v6 M12 17h.01', color: 'var(--warning)', bg: 'var(--warning-bg)', deep: 'var(--warning-deep)' },
    { title: 'For your information', body: 'The quarterly forecast refreshes automatically on 2026-06-30.', action: '', kind: 'info', iconPath: 'M12 11v6 M12 8h.01', color: 'var(--info)', bg: 'var(--info-bg)', deep: 'var(--info-deep)' },
  ];

  listItems = [
    { name: 'Acme Corp', meta: 'In Negotiation · Owner: A. Kostic', value: '$500,000' },
    { name: 'Global Tech', meta: 'Proposal Sent · Owner: M. Mlak', value: '$1,200,000' },
    { name: 'Innovate Ltd.', meta: 'Contracting · Owner: A. Kostic', value: '$850,000' },
    { name: 'Future Dynamics', meta: 'Closed Won · Owner: M. Mlak', value: '$950,000' },
  ];

  // ===== BADGE HELPERS =====
  private badgeColors: Record<string, { bg: string; deep: string; dot: string }> = {
    positive: { bg: 'var(--success-bg)', deep: 'var(--success-deep)', dot: 'var(--success)' },
    info: { bg: 'var(--info-bg)', deep: 'var(--info-deep)', dot: 'var(--info)' },
    warning: { bg: 'var(--warning-bg)', deep: 'var(--warning-deep)', dot: 'var(--warning)' },
    danger: { bg: 'var(--danger-bg)', deep: 'var(--danger-deep)', dot: 'var(--danger)' },
    neutral: { bg: 'var(--bg-subtle)', deep: '#44505F', dot: '#8A93A0' },
  };

  getBadgeBg(kind: string): string { return this.badgeColors[kind]?.bg ?? this.badgeColors['neutral'].bg; }
  getBadgeDeep(kind: string): string { return this.badgeColors[kind]?.deep ?? this.badgeColors['neutral'].deep; }
  getBadgeDot(kind: string): string { return this.badgeColors[kind]?.dot ?? this.badgeColors['neutral'].dot; }

  // ===== CHARTS =====
  private roundTopRect(x: number, y: number, w: number, h: number, r: number): string {
    r = Math.max(0, Math.min(r, h, w / 2));
    return `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;
  }

  // Bar chart
  readonly bars: Array<{ label: string; fill: string; path: string; cx: number; vy: number; vlabel: string; valueFull: string }>;
  readonly barTicks: Array<{ y: number; ty: number; label: string }>;

  // Line chart
  readonly lineDots: Array<{ x: number; y: number; label: string; value: string }>;
  readonly linePoints: string;
  readonly lineArea: string;
  readonly lineTicks: Array<{ y: number; ty: number; label: string }>;

  // Donut chart
  readonly donutSegs: Array<{ label: string; color: string; dash: string; offset: string; value: string; pct: string }>;
  readonly donutLegend: Array<{ label: string; color: string; pct: string }>;
  readonly donutTotal: string;

  constructor() {
    const x0 = 52, x1 = 468, top = 20, bot = 190;

    // Bar
    const barRaw: Array<[string, number, string]> = [
      ['Acme', 500, 'var(--warning)'],
      ['Global', 1200, 'var(--info)'],
      ['Innovate', 850, 'var(--brand-primary)'],
      ['Future', 950, 'var(--success)'],
      ['Bright', 300, 'var(--text-faint)'],
    ];
    const bMax = 1200, slot = (x1 - x0) / barRaw.length, bw = 44;
    this.bars = barRaw.map(([lbl, v, fill], i) => {
      const h = v / bMax * (bot - top);
      const x = x0 + slot * i + (slot - bw) / 2;
      const y = bot - h;
      return {
        label: lbl, fill,
        path: this.roundTopRect(Math.round(x), Math.round(y), bw, Math.round(h), 5),
        cx: Math.round(x + bw / 2), vy: Math.round(y - 7),
        vlabel: '$' + v + 'K',
        valueFull: '$' + (v * 1000).toLocaleString(),
      };
    });
    this.barTicks = [0, 300, 600, 900, 1200].map(t => {
      const y = bot - (t / bMax * (bot - top));
      return { y: Math.round(y), ty: Math.round(y + 4), label: t === 0 ? '0' : ('$' + t + 'K') };
    });

    // Line
    const lvRaw: Array<[string, number]> = [['Jan', 1.8], ['Feb', 2.1], ['Mar', 2.0], ['Apr', 2.4], ['May', 2.6], ['Jun', 2.85]];
    const lMax = 3, lstep = (x1 - x0) / (lvRaw.length - 1);
    this.lineDots = lvRaw.map(([lbl, v], i) => ({
      x: Math.round(x0 + lstep * i),
      y: Math.round(bot - (v / lMax * (bot - top))),
      label: lbl,
      value: '$' + v.toFixed(2) + 'M',
    }));
    this.linePoints = this.lineDots.map(p => `${p.x},${p.y}`).join(' ');
    this.lineArea = `${x0},${bot} ${this.linePoints} ${x1},${bot}`;
    this.lineTicks = [0, 1, 2, 3].map(t => {
      const y = bot - (t / lMax * (bot - top));
      return { y: Math.round(y), ty: Math.round(y + 4), label: t === 0 ? '0' : ('$' + t + 'M') };
    });

    // Donut
    const dRaw: Array<[string, number, string]> = [
      ['In Negotiation', 500, 'var(--warning)'],
      ['Proposal Sent', 1200, 'var(--info)'],
      ['Contracting', 850, 'var(--brand-primary)'],
      ['Closed Won', 950, 'var(--success)'],
      ['Initial Contact', 300, 'var(--text-faint)'],
    ];
    const dTotal = dRaw.reduce((s, x) => s + x[1], 0);
    const C = 2 * Math.PI * 70, gapPx = 3;
    let cum = 0;
    this.donutSegs = [];
    this.donutLegend = [];
    dRaw.forEach(([lbl, val, color]) => {
      const frac = val / dTotal, len = frac * C, vis = Math.max(0, len - gapPx);
      const pct = Math.round(frac * 100);
      this.donutSegs.push({
        label: lbl, color,
        dash: `${vis.toFixed(2)} ${(C - vis).toFixed(2)}`,
        offset: `${(-cum).toFixed(2)}`,
        value: '$' + (val * 1000).toLocaleString(),
        pct: pct + '%',
      });
      this.donutLegend.push({ label: lbl, color, pct: pct + '%' });
      cum += len;
    });
    this.donutTotal = '$' + (dTotal / 1000).toFixed(1) + 'M';
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
