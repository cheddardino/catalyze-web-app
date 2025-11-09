# Phase 3: Health Events & Tracking Pages

**Goal:** Create health event listing, filtering, detailed view, and event history visualization.

**Estimated Time:** 50-60 minutes

**Prerequisites:** Phase 2 completed successfully

---

## Instructions for AI

Now let's build the health tracking interface where users can view, filter, and analyze their cats' bathroom events.

### Step 1: Create Filter Component

**Create `frontend/src/components/Filter.ts`:**
```typescript
import { Component } from './Component';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string) => void;
}

export class Filter extends Component {
  private props: FilterProps;

  constructor(props: FilterProps) {
    super('div', 'filter-group');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;

    const label = document.createElement('label');
    label.className = 'filter-label';
    label.textContent = this.props.label;
    container.appendChild(label);

    const select = document.createElement('select');
    select.className = 'filter-select';

    this.props.options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      if (this.props.value === option.value) {
        optionEl.selected = true;
      }
      select.appendChild(optionEl);
    });

    select.addEventListener('change', (e) => {
      this.props.onChange((e.target as HTMLSelectElement).value);
    });

    container.appendChild(select);

    return container;
  }
}
```

**Add filter styles to `frontend/public/styles.css`:**
```css
/* Filter Styles */
.filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-700);
}

.filter-select {
    padding: 10px 16px;
    border: 2px solid var(--gray-300);
    border-radius: 8px;
    font-size: 15px;
    background-color: var(--white);
    cursor: pointer;
    transition: border-color 0.3s ease;
}

.filter-select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.filters-container {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
    padding: 20px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Step 2: Create Event Detail Component

**Create `frontend/src/components/EventDetail.ts`:**
```typescript
import { Component } from './Component';
import { HealthEvent, ScreeningResult } from '../types';
import { getCatById } from '../services/mockData';

export interface EventDetailProps {
  event: HealthEvent;
}

export class EventDetail extends Component {
  private props: EventDetailProps;

  constructor(props: EventDetailProps) {
    super('div', 'event-detail');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;
    const event = this.props.event;
    const cat = getCatById(event.catId);

    container.innerHTML = `
      <div class="event-detail-header">
        <div class="event-detail-cat">
          <span class="event-detail-icon">${cat?.photoUrl || '🐱'}</span>
          <div>
            <div class="event-detail-cat-name">${cat?.name || 'Unknown'}</div>
            <div class="event-detail-timestamp">${new Date(event.timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div class="event-detail-type-badge ${event.type}">
          ${event.type === 'defecation' ? '💩 Defecation' : '💧 Urination'}
        </div>
      </div>

      ${event.imageUrl ? `
        <div class="event-detail-image">
          <div class="image-placeholder">📷 Image Available</div>
        </div>
      ` : ''}

      ${event.screeningResult ? this.renderScreeningResult(event.screeningResult) : ''}

      ${event.notes ? `
        <div class="event-detail-section">
          <h3 class="section-title">📝 Notes</h3>
          <p class="event-notes">${event.notes}</p>
        </div>
      ` : ''}

      <div class="event-detail-actions">
        <button class="btn btn-outline btn-small">Add Note</button>
        <button class="btn btn-outline btn-small">Share with Vet</button>
      </div>
    `;

    return container;
  }

  private renderScreeningResult(result: ScreeningResult): string {
    const hasAnomalies = result.anomalies.length > 0;

    return `
      <div class="event-detail-section">
        <h3 class="section-title">🔬 Screening Results</h3>
        
        <div class="screening-grid">
          <div class="screening-item">
            <span class="screening-label">Color:</span>
            <span class="screening-value">${result.color}</span>
          </div>
          <div class="screening-item">
            <span class="screening-label">Consistency:</span>
            <span class="screening-value">${result.consistency}</span>
          </div>
          <div class="screening-item">
            <span class="screening-label">Size:</span>
            <span class="screening-value">${result.size}</span>
          </div>
          <div class="screening-item">
            <span class="screening-label">Shape:</span>
            <span class="screening-value">${result.shape}</span>
          </div>
          <div class="screening-item">
            <span class="screening-label">Confidence:</span>
            <span class="screening-value">${(result.confidenceScore * 100).toFixed(0)}%</span>
          </div>
        </div>

        ${hasAnomalies ? `
          <div class="anomalies-section">
            <h4 class="anomalies-title">⚠️ Detected Anomalies</h4>
            <ul class="anomalies-list">
              ${result.anomalies.map(a => `<li>${a}</li>`).join('')}
            </ul>
            <div class="disclaimer-box">
              ⚠️ <strong>Important:</strong> This is screening only, not a diagnosis. 
              Consult your veterinarian for medical advice.
            </div>
          </div>
        ` : '<div class="no-anomalies">✅ No anomalies detected</div>'}
      </div>
    `;
  }
}
```

**Add event detail styles to `frontend/public/styles.css`:**
```css
/* Event Detail Styles */
.event-detail {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
}

.event-detail-cat {
    display: flex;
    align-items: center;
    gap: 16px;
}

.event-detail-icon {
    font-size: 56px;
}

.event-detail-cat-name {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-800);
}

.event-detail-timestamp {
    font-size: 14px;
    color: var(--gray-600);
    margin-top: 4px;
}

.event-detail-type-badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
}

.event-detail-type-badge.defecation {
    background-color: var(--secondary-color)20;
    color: var(--secondary-color);
}

.event-detail-type-badge.urination {
    background-color: var(--primary-color)20;
    color: var(--primary-color);
}

.event-detail-image {
    margin-bottom: 24px;
}

.image-placeholder {
    background-color: var(--gray-100);
    border: 2px dashed var(--gray-300);
    border-radius: 12px;
    padding: 60px;
    text-align: center;
    font-size: 24px;
    color: var(--gray-600);
}

.event-detail-section {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray-200);
}

.event-detail-section:last-of-type {
    border-bottom: none;
}

.section-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 16px;
}

.screening-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
}

.screening-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.screening-label {
    font-size: 13px;
    color: var(--gray-600);
    font-weight: 600;
}

.screening-value {
    font-size: 16px;
    color: var(--gray-800);
    font-weight: 500;
    text-transform: capitalize;
}

.anomalies-section {
    background-color: var(--warning-color)10;
    border-left: 4px solid var(--warning-color);
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
}

.anomalies-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--warning-color);
    margin-bottom: 12px;
}

.anomalies-list {
    margin: 0 0 16px 20px;
    padding: 0;
    color: var(--gray-700);
}

.anomalies-list li {
    margin-bottom: 8px;
}

.disclaimer-box {
    background-color: var(--danger-color)10;
    border: 1px solid var(--danger-color)30;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    color: var(--gray-800);
    line-height: 1.6;
}

.no-anomalies {
    background-color: var(--secondary-color)10;
    color: var(--secondary-color);
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    margin-top: 16px;
}

.event-notes {
    color: var(--gray-700);
    line-height: 1.6;
    padding: 16px;
    background-color: var(--gray-100);
    border-radius: 8px;
}

.event-detail-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
```

### Step 3: Create Health Events Page

**Create `frontend/src/pages/HealthEventsPage.ts`:**
```typescript
import { Component } from '../components/Component';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import { EventDetail } from '../components/EventDetail';
import { mockHealthEvents, mockCats } from '../services/mockData';
import { HealthEvent } from '../types';

export class HealthEventsPage extends Component {
  private filteredEvents: HealthEvent[] = mockHealthEvents;
  private currentCatFilter: string = 'all';
  private currentTypeFilter: string = 'all';
  private currentDateFilter: string = 'all';

  constructor() {
    super('div', 'page health-events-page');
  }

  render(): HTMLElement {
    const page = this.element;

    // Header
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
      <div>
        <h1 class="page-title">Health Events</h1>
        <p class="page-subtitle">Track and monitor your cats' bathroom activities</p>
      </div>
    `;
    page.appendChild(header);

    // Filters
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';
    filtersContainer.id = 'filters-container';
    this.renderFilters(filtersContainer);
    page.appendChild(filtersContainer);

    // Events List
    const eventsContainer = document.createElement('div');
    eventsContainer.id = 'events-list';
    this.renderEventsList(eventsContainer);
    page.appendChild(eventsContainer);

    return page;
  }

  private renderFilters(container: HTMLElement): void {
    container.innerHTML = '';

    // Cat Filter
    const catFilter = new Filter({
      label: 'Cat',
      options: [
        { label: 'All Cats', value: 'all' },
        ...mockCats.map(cat => ({ label: cat.name, value: cat.id }))
      ],
      value: this.currentCatFilter,
      onChange: (value) => {
        this.currentCatFilter = value;
        this.applyFilters();
      }
    });
    catFilter.mount(container);

    // Type Filter
    const typeFilter = new Filter({
      label: 'Event Type',
      options: [
        { label: 'All Types', value: 'all' },
        { label: 'Defecation', value: 'defecation' },
        { label: 'Urination', value: 'urination' }
      ],
      value: this.currentTypeFilter,
      onChange: (value) => {
        this.currentTypeFilter = value;
        this.applyFilters();
      }
    });
    typeFilter.mount(container);

    // Date Filter
    const dateFilter = new Filter({
      label: 'Time Period',
      options: [
        { label: 'All Time', value: 'all' },
        { label: 'Today', value: 'today' },
        { label: 'Last 7 Days', value: 'week' },
        { label: 'Last 30 Days', value: 'month' }
      ],
      value: this.currentDateFilter,
      onChange: (value) => {
        this.currentDateFilter = value;
        this.applyFilters();
      }
    });
    dateFilter.mount(container);

    // Reset Button
    const resetBtn = new Button({
      text: 'Reset Filters',
      variant: 'outline',
      size: 'small',
      onClick: () => this.resetFilters()
    });
    resetBtn.element.style.marginTop = 'auto';
    resetBtn.mount(container);
  }

  private applyFilters(): void {
    let filtered = [...mockHealthEvents];

    // Filter by cat
    if (this.currentCatFilter !== 'all') {
      filtered = filtered.filter(e => e.catId === this.currentCatFilter);
    }

    // Filter by type
    if (this.currentTypeFilter !== 'all') {
      filtered = filtered.filter(e => e.type === this.currentTypeFilter);
    }

    // Filter by date
    if (this.currentDateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.timestamp);
        const diffDays = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (this.currentDateFilter === 'today') {
          return diffDays < 1;
        } else if (this.currentDateFilter === 'week') {
          return diffDays <= 7;
        } else if (this.currentDateFilter === 'month') {
          return diffDays <= 30;
        }
        return true;
      });
    }

    this.filteredEvents = filtered;
    
    const eventsContainer = document.getElementById('events-list');
    if (eventsContainer) {
      this.renderEventsList(eventsContainer);
    }
  }

  private resetFilters(): void {
    this.currentCatFilter = 'all';
    this.currentTypeFilter = 'all';
    this.currentDateFilter = 'all';
    this.filteredEvents = mockHealthEvents;

    const filtersContainer = document.getElementById('filters-container');
    const eventsContainer = document.getElementById('events-list');
    
    if (filtersContainer) {
      this.renderFilters(filtersContainer);
    }
    if (eventsContainer) {
      this.renderEventsList(eventsContainer);
    }
  }

  private renderEventsList(container: HTMLElement): void {
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card';

    const header = document.createElement('div');
    header.style.marginBottom = '20px';
    header.innerHTML = `
      <h3 class="card-title">
        Events Found: ${this.filteredEvents.length}
      </h3>
    `;
    card.appendChild(header);

    if (this.filteredEvents.length === 0) {
      const empty = document.createElement('div');
      empty.style.textAlign = 'center';
      empty.style.padding = '60px 20px';
      empty.style.color = 'var(--gray-600)';
      empty.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
        <p style="font-size: 18px;">No events match your filters</p>
      `;
      card.appendChild(empty);
    } else {
      this.filteredEvents.forEach(event => {
        const eventCard = new EventCard({
          event,
          onClick: () => this.showEventDetail(event)
        });
        eventCard.mount(card);
      });
    }

    container.appendChild(card);
  }

  private showEventDetail(event: HealthEvent): void {
    const detailContent = new EventDetail({ event });
    
    const modal = new Modal({
      title: 'Event Details',
      content: detailContent.render()
    });
    
    modal.mount(document.body);
  }
}
```

**Add health events page styles to `frontend/public/styles.css`:**
```css
/* Health Events Page Styles */
.health-events-page {
    padding: 40px 20px;
}

.page-header {
    margin-bottom: 32px;
}

@media (max-width: 768px) {
    .filters-container {
        flex-direction: column;
    }
    
    .screening-grid {
        grid-template-columns: 1fr 1fr;
    }
}
```

### Step 4: Create Health Analytics Component (Bonus)

**Create `frontend/src/components/HealthChart.ts`:**
```typescript
import { Component } from './Component';
import { mockHealthEvents } from '../services/mockData';

export interface HealthChartProps {
  catId?: string;
  days?: number;
}

export class HealthChart extends Component {
  private props: HealthChartProps;

  constructor(props: HealthChartProps) {
    super('div', 'health-chart');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;

    // Get events for the last N days
    const days = this.props.days || 7;
    const data = this.getChartData(days);

    container.innerHTML = `
      <div class="chart-header">
        <h3 class="chart-title">Activity Over Last ${days} Days</h3>
      </div>
      <div class="chart-container">
        ${this.renderBars(data)}
      </div>
      <div class="chart-legend">
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--primary-color);"></span>
          <span>Urination</span>
        </div>
        <div class="legend-item">
          <span class="legend-color" style="background-color: var(--secondary-color);"></span>
          <span>Defecation</span>
        </div>
      </div>
    `;

    return container;
  }

  private getChartData(days: number): any[] {
    const now = new Date();
    const data: any[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      let events = mockHealthEvents.filter(e => 
        e.timestamp.startsWith(dateStr)
      );

      if (this.props.catId) {
        events = events.filter(e => e.catId === this.props.catId);
      }

      data.push({
        date: dateStr,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        urination: events.filter(e => e.type === 'urination').length,
        defecation: events.filter(e => e.type === 'defecation').length
      });
    }

    return data;
  }

  private renderBars(data: any[]): string {
    const maxValue = Math.max(...data.map(d => d.urination + d.defecation), 5);

    return `
      <div class="chart-bars">
        ${data.map(d => `
          <div class="bar-group">
            <div class="bar-stack">
              <div class="bar bar-urination" style="height: ${(d.urination / maxValue) * 100}%;" title="${d.urination} urinations"></div>
              <div class="bar bar-defecation" style="height: ${(d.defecation / maxValue) * 100}%;" title="${d.defecation} defecations"></div>
            </div>
            <div class="bar-label">${d.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
```

**Add chart styles to `frontend/public/styles.css`:**
```css
/* Health Chart Styles */
.health-chart {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-header {
    margin-bottom: 24px;
}

.chart-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--gray-800);
}

.chart-container {
    height: 200px;
    margin-bottom: 16px;
}

.chart-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    gap: 8px;
}

.bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.bar-stack {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 2px;
}

.bar {
    width: 100%;
    min-height: 4px;
    border-radius: 4px 4px 0 0;
    transition: opacity 0.3s ease;
}

.bar:hover {
    opacity: 0.8;
}

.bar-urination {
    background-color: var(--primary-color);
}

.bar-defecation {
    background-color: var(--secondary-color);
}

.bar-label {
    font-size: 12px;
    color: var(--gray-600);
    text-align: center;
}

.chart-legend {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--gray-200);
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--gray-700);
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}
```

### Step 5: Update Router and Component Exports

**Update `frontend/src/app.ts`:**
```typescript
import { router } from './utils/router';
import { Navbar } from './components';
import { DashboardPage } from './pages/DashboardPage';
import { HealthEventsPage } from './pages/HealthEventsPage';
import { Component } from './components/Component';

class App {
  private appRoot: HTMLElement | null;
  private navbar: Navbar | null = null;

  constructor() {
    this.appRoot = document.getElementById('app');
    this.setupRouter();
  }

  private setupRouter(): void {
    router.register('/', () => this.renderPage(new DashboardPage()));
    router.register('/dashboard', () => this.renderPage(new DashboardPage()));
    router.register('/health', () => this.renderPage(new HealthEventsPage()));
    // More routes will be added in later phases
  }

  private renderPage(page: Component): void {
    if (!this.appRoot) return;

    this.appRoot.innerHTML = '';

    // Add Navbar
    if (!this.navbar) {
      this.navbar = new Navbar({
        items: [
          { label: 'Dashboard', path: '/', icon: '🏠' },
          { label: 'Health', path: '/health', icon: '💚' },
          { label: 'Devices', path: '/devices', icon: '🔧' },
          { label: 'Reports', path: '/reports', icon: '📋' },
          { label: 'Settings', path: '/settings', icon: '⚙️' },
        ],
        currentPath: router.getCurrentRoute()
      });
    }
    
    this.navbar.mount(this.appRoot);

    // Add page container
    const container = document.createElement('div');
    container.className = 'container';
    page.mount(container);
    this.appRoot.appendChild(container);
  }

  init(): void {
    router.init();
  }
}

export default App;
```

**Update `frontend/src/components/index.ts`:**
```typescript
export { Component } from './Component';
export { Button } from './Button';
export type { ButtonProps } from './Button';
export { Card } from './Card';
export type { CardProps } from './Card';
export { Input } from './Input';
export type { InputProps } from './Input';
export { Navbar } from './Navbar';
export type { NavbarProps, NavItem } from './Navbar';
export { Modal } from './Modal';
export type { ModalProps } from './Modal';
export { StatCard } from './StatCard';
export type { StatCardProps } from './StatCard';
export { EventCard } from './EventCard';
export type { EventCardProps } from './EventCard';
export { DeviceStatus } from './DeviceStatus';
export type { DeviceStatusProps } from './DeviceStatus';
export { Filter } from './Filter';
export type { FilterProps, FilterOption } from './Filter';
export { EventDetail } from './EventDetail';
export type { EventDetailProps } from './EventDetail';
export { HealthChart } from './HealthChart';
export type { HealthChartProps } from './HealthChart';
```

### Step 6: Test Health Events Page

```bash
cd frontend
npm start
```

Navigate to the Health page and test:
- Filtering by cat, type, and date
- Viewing event details in modal
- Checking responsive layout

---

## Verification Checklist

- [ ] Health events page loads
- [ ] All filters work correctly
- [ ] Event list updates when filters change
- [ ] Event cards are clickable
- [ ] Modal shows full event details
- [ ] Screening results display properly
- [ ] Empty state shows when no events match
- [ ] Reset filters button works
- [ ] Layout is responsive

---

## Next Phase

Once health tracking is complete, proceed to **Phase 4: Device Management & Reports Pages**.
