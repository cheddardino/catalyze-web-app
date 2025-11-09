# Phase 2: Dashboard & Home Page

**Goal:** Build the main dashboard with health summary, device status, and quick actions using mock data.

**Estimated Time:** 45-55 minutes

**Prerequisites:** Phase 1 completed successfully

---

## Instructions for AI

Now let's create the main dashboard where users see their cats' health summary, device status, and can access key features.

### Step 1: Create Mock Data Service

**Create `frontend/src/services/mockData.ts`:**
```typescript
import { Cat, Device, HealthEvent, ScreeningResult, Notification } from '../types';

// Mock Cats
export const mockCats: Cat[] = [
  {
    id: '1',
    name: 'Whiskers',
    breed: 'Persian',
    dateOfBirth: '2020-05-15',
    weight: 4.5,
    photoUrl: '🐱',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Siamese',
    dateOfBirth: '2021-03-20',
    weight: 3.8,
    photoUrl: '🐈',
    createdAt: '2024-01-01'
  }
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Living Room Litter Box',
    status: 'online',
    firmwareVersion: '2.1.0',
    litterLevel: 75,
    wasteLevel: 45,
    lastCleaned: '2024-11-09T08:30:00Z',
    batteryLevel: 92
  }
];

// Mock Screening Results
const mockScreeningResults: ScreeningResult[] = [
  {
    color: 'brown',
    consistency: 'normal',
    size: 'medium',
    shape: 'formed',
    anomalies: [],
    confidenceScore: 0.92
  },
  {
    color: 'dark brown',
    consistency: 'slightly soft',
    size: 'medium',
    shape: 'formed',
    anomalies: ['slightly soft consistency'],
    confidenceScore: 0.88
  }
];

// Mock Health Events
export const mockHealthEvents: HealthEvent[] = [
  {
    id: 'event-1',
    catId: '1',
    timestamp: '2024-11-09T10:30:00Z',
    type: 'defecation',
    imageUrl: '📷',
    screeningResult: mockScreeningResults[0],
    notes: 'Normal event'
  },
  {
    id: 'event-2',
    catId: '1',
    timestamp: '2024-11-09T08:15:00Z',
    type: 'urination',
    notes: 'Normal'
  },
  {
    id: 'event-3',
    catId: '2',
    timestamp: '2024-11-09T07:45:00Z',
    type: 'defecation',
    imageUrl: '📷',
    screeningResult: mockScreeningResults[1]
  },
  {
    id: 'event-4',
    catId: '1',
    timestamp: '2024-11-08T22:20:00Z',
    type: 'defecation',
    screeningResult: mockScreeningResults[0]
  },
  {
    id: 'event-5',
    catId: '2',
    timestamp: '2024-11-08T20:10:00Z',
    type: 'urination'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Anomaly Detected',
    message: 'Unusual consistency detected for Whiskers. Review recommended.',
    type: 'warning',
    timestamp: '2024-11-09T09:00:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Cleaning Complete',
    message: 'Living Room Litter Box has been cleaned successfully.',
    type: 'success',
    timestamp: '2024-11-09T08:30:00Z',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Litter Level Low',
    message: 'Litter level at 75%. Consider refilling soon.',
    type: 'info',
    timestamp: '2024-11-09T07:00:00Z',
    read: true
  }
];

// Helper functions
export function getCatById(id: string): Cat | undefined {
  return mockCats.find(cat => cat.id === id);
}

export function getTodayEvents(): HealthEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return mockHealthEvents.filter(event => 
    event.timestamp.startsWith(today)
  );
}

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter(n => !n.read);
}

export function getRecentEvents(limit: number = 5): HealthEvent[] {
  return mockHealthEvents.slice(0, limit);
}
```

### Step 2: Create Stat Card Component

**Create `frontend/src/components/StatCard.ts`:**
```typescript
import { Component } from './Component';

export interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

export class StatCard extends Component {
  private props: StatCardProps;

  constructor(props: StatCardProps) {
    super('div', 'stat-card');
    this.props = props;
  }

  render(): HTMLElement {
    const card = this.element;
    const color = this.props.color || 'var(--primary-color)';

    card.innerHTML = `
      <div class="stat-icon" style="background-color: ${color}20; color: ${color};">
        ${this.props.icon}
      </div>
      <div class="stat-content">
        <div class="stat-label">${this.props.label}</div>
        <div class="stat-value">${this.props.value}</div>
        ${this.props.trend ? this.renderTrend() : ''}
      </div>
    `;

    return card;
  }

  private renderTrend(): string {
    const trendIcon = this.props.trend === 'up' ? '↗' : this.props.trend === 'down' ? '↘' : '→';
    const trendColor = this.props.trend === 'up' ? 'var(--secondary-color)' : 
                       this.props.trend === 'down' ? 'var(--danger-color)' : 
                       'var(--gray-600)';
    
    return `
      <div class="stat-trend" style="color: ${trendColor};">
        <span>${trendIcon}</span>
        <span>${this.props.trendValue}</span>
      </div>
    `;
  }
}
```

**Add stat card styles to `frontend/public/styles.css`:**
```css
/* Stat Card Styles */
.stat-card {
    background: var(--white);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
}

.stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
}

.stat-content {
    flex: 1;
}

.stat-label {
    font-size: 14px;
    color: var(--gray-600);
    margin-bottom: 4px;
}

.stat-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--gray-800);
}

.stat-trend {
    font-size: 14px;
    font-weight: 600;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}
```

### Step 3: Create Event Card Component

**Create `frontend/src/components/EventCard.ts`:**
```typescript
import { Component } from './Component';
import { HealthEvent } from '../types';
import { getCatById } from '../services/mockData';

export interface EventCardProps {
  event: HealthEvent;
  onClick?: () => void;
}

export class EventCard extends Component {
  private props: EventCardProps;

  constructor(props: EventCardProps) {
    super('div', 'event-card');
    this.props = props;
  }

  render(): HTMLElement {
    const card = this.element;
    const event = this.props.event;
    const cat = getCatById(event.catId);
    const time = new Date(event.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const hasAnomaly = event.screeningResult && 
                       event.screeningResult.anomalies.length > 0;

    card.innerHTML = `
      <div class="event-cat-icon">${cat?.photoUrl || '🐱'}</div>
      <div class="event-content">
        <div class="event-header">
          <span class="event-cat-name">${cat?.name || 'Unknown'}</span>
          <span class="event-time">${time}</span>
        </div>
        <div class="event-type">
          ${event.type === 'defecation' ? '💩' : '💧'} 
          ${event.type === 'defecation' ? 'Defecation' : 'Urination'}
        </div>
        ${hasAnomaly ? `
          <div class="event-alert">
            ⚠️ ${event.screeningResult!.anomalies[0]}
          </div>
        ` : ''}
      </div>
      ${event.imageUrl ? '<div class="event-image">📷</div>' : ''}
    `;

    if (this.props.onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', this.props.onClick);
    }

    return card;
  }
}
```

**Add event card styles to `frontend/public/styles.css`:**
```css
/* Event Card Styles */
.event-card {
    background: var(--white);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    margin-bottom: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.event-cat-icon {
    font-size: 40px;
    flex-shrink: 0;
}

.event-content {
    flex: 1;
}

.event-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.event-cat-name {
    font-weight: 600;
    color: var(--gray-800);
    font-size: 16px;
}

.event-time {
    font-size: 14px;
    color: var(--gray-600);
}

.event-type {
    color: var(--gray-700);
    font-size: 14px;
    margin-bottom: 4px;
}

.event-alert {
    background-color: var(--warning-color)20;
    color: var(--warning-color);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 8px;
    display: inline-block;
}

.event-image {
    font-size: 24px;
    flex-shrink: 0;
}
```

### Step 4: Create Device Status Component

**Create `frontend/src/components/DeviceStatus.ts`:**
```typescript
import { Component } from './Component';
import { Device } from '../types';

export interface DeviceStatusProps {
  device: Device;
}

export class DeviceStatus extends Component {
  private props: DeviceStatusProps;

  constructor(props: DeviceStatusProps) {
    super('div', 'device-status');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;
    const device = this.props.device;

    const statusColor = device.status === 'online' ? 'var(--secondary-color)' :
                        device.status === 'offline' ? 'var(--danger-color)' :
                        'var(--warning-color)';

    container.innerHTML = `
      <div class="device-header">
        <div>
          <div class="device-name">${device.name}</div>
          <div class="device-firmware">Firmware: ${device.firmwareVersion}</div>
        </div>
        <div class="device-status-badge" style="background-color: ${statusColor}20; color: ${statusColor};">
          <span class="status-dot" style="background-color: ${statusColor};"></span>
          ${device.status}
        </div>
      </div>
      
      <div class="device-metrics">
        <div class="device-metric">
          <div class="metric-label">Litter Level</div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${device.litterLevel}%; background-color: var(--primary-color);"></div>
          </div>
          <div class="metric-value">${device.litterLevel}%</div>
        </div>
        
        <div class="device-metric">
          <div class="metric-label">Waste Level</div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${device.wasteLevel}%; background-color: ${device.wasteLevel > 70 ? 'var(--danger-color)' : 'var(--warning-color)'};"></div>
          </div>
          <div class="metric-value">${device.wasteLevel}%</div>
        </div>

        ${device.batteryLevel ? `
          <div class="device-metric">
            <div class="metric-label">Battery</div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${device.batteryLevel}%; background-color: var(--secondary-color);"></div>
            </div>
            <div class="metric-value">${device.batteryLevel}%</div>
          </div>
        ` : ''}
      </div>

      ${device.lastCleaned ? `
        <div class="device-footer">
          Last cleaned: ${new Date(device.lastCleaned).toLocaleString()}
        </div>
      ` : ''}
    `;

    return container;
  }
}
```

**Add device status styles to `frontend/public/styles.css`:**
```css
/* Device Status Styles */
.device-status {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.device-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}

.device-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 4px;
}

.device-firmware {
    font-size: 14px;
    color: var(--gray-600);
}

.device-status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: capitalize;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.device-metrics {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.device-metric {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.metric-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-700);
}

.metric-bar {
    height: 8px;
    background-color: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
}

.metric-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
}

.metric-value {
    font-size: 14px;
    color: var(--gray-600);
    text-align: right;
}

.device-footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--gray-200);
    font-size: 14px;
    color: var(--gray-600);
}
```

### Step 5: Create Dashboard Page

**Create `frontend/src/pages/DashboardPage.ts`:**
```typescript
import { Component } from '../components/Component';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatCard } from '../components/StatCard';
import { EventCard } from '../components/EventCard';
import { DeviceStatus } from '../components/DeviceStatus';
import { router } from '../utils/router';
import { 
  mockCats, 
  mockDevices, 
  getTodayEvents, 
  getUnreadNotifications,
  getRecentEvents 
} from '../services/mockData';

export class DashboardPage extends Component {
  constructor() {
    super('div', 'page dashboard-page');
  }

  render(): HTMLElement {
    const page = this.element;

    // Header
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    header.innerHTML = `
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Welcome back! Here's your pet health summary.</p>
      </div>
    `;
    page.appendChild(header);

    // Stats Grid
    const statsGrid = document.createElement('div');
    statsGrid.className = 'stats-grid';

    const todayEvents = getTodayEvents();
    const unreadNotifs = getUnreadNotifications();

    const stats = [
      new StatCard({
        icon: '🐱',
        label: 'Total Cats',
        value: mockCats.length,
        color: 'var(--primary-color)'
      }),
      new StatCard({
        icon: '📊',
        label: 'Today\'s Events',
        value: todayEvents.length,
        trend: 'neutral',
        trendValue: 'Normal',
        color: 'var(--secondary-color)'
      }),
      new StatCard({
        icon: '🔔',
        label: 'Notifications',
        value: unreadNotifs.length,
        color: 'var(--warning-color)'
      }),
      new StatCard({
        icon: '🔧',
        label: 'Devices',
        value: mockDevices.filter(d => d.status === 'online').length + '/' + mockDevices.length,
        color: 'var(--primary-color)'
      })
    ];

    stats.forEach(stat => stat.mount(statsGrid));
    page.appendChild(statsGrid);

    // Main Content Grid
    const contentGrid = document.createElement('div');
    contentGrid.className = 'dashboard-content';

    // Left Column
    const leftColumn = document.createElement('div');
    leftColumn.className = 'dashboard-column';

    // Recent Events Card
    const eventsCard = new Card({
      title: '📅 Recent Events',
      content: this.renderRecentEvents()
    });
    eventsCard.mount(leftColumn);

    // Quick Actions Card
    const actionsCard = new Card({
      title: '⚡ Quick Actions',
      content: this.renderQuickActions()
    });
    actionsCard.mount(leftColumn);

    contentGrid.appendChild(leftColumn);

    // Right Column
    const rightColumn = document.createElement('div');
    rightColumn.className = 'dashboard-column';

    // Device Status Card
    const deviceCard = new Card({
      title: '🔧 Device Status',
      content: this.renderDeviceStatus()
    });
    deviceCard.mount(rightColumn);

    // Cats Overview Card
    const catsCard = new Card({
      title: '🐱 Your Cats',
      content: this.renderCatsOverview()
    });
    catsCard.mount(rightColumn);

    contentGrid.appendChild(rightColumn);
    page.appendChild(contentGrid);

    return page;
  }

  private renderRecentEvents(): HTMLElement {
    const container = document.createElement('div');
    const events = getRecentEvents(5);

    if (events.length === 0) {
      container.innerHTML = '<p style="color: var(--gray-600); text-align: center; padding: 20px;">No recent events</p>';
      return container;
    }

    events.forEach(event => {
      const eventCard = new EventCard({
        event,
        onClick: () => router.navigate(`/health/events/${event.id}`)
      });
      eventCard.mount(container);
    });

    const viewAllBtn = new Button({
      text: 'View All Events',
      variant: 'outline',
      onClick: () => router.navigate('/health')
    });
    viewAllBtn.element.style.marginTop = '16px';
    viewAllBtn.element.style.width = '100%';
    viewAllBtn.mount(container);

    return container;
  }

  private renderQuickActions(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'quick-actions-grid';

    const actions = [
      {
        icon: '📸',
        text: 'View Health Events',
        onClick: () => router.navigate('/health')
      },
      {
        icon: '🔧',
        text: 'Manage Devices',
        onClick: () => router.navigate('/devices')
      },
      {
        icon: '📋',
        text: 'Generate Report',
        onClick: () => router.navigate('/reports')
      },
      {
        icon: '⚙️',
        text: 'Settings',
        onClick: () => router.navigate('/settings')
      }
    ];

    actions.forEach(action => {
      const btn = new Button({
        text: action.text,
        icon: action.icon,
        variant: 'outline',
        onClick: action.onClick
      });
      btn.element.style.width = '100%';
      btn.mount(container);
    });

    return container;
  }

  private renderDeviceStatus(): HTMLElement {
    const container = document.createElement('div');
    
    mockDevices.forEach(device => {
      const deviceStatus = new DeviceStatus({ device });
      deviceStatus.mount(container);
    });

    return container;
  }

  private renderCatsOverview(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'cats-overview';

    mockCats.forEach(cat => {
      const catCard = document.createElement('div');
      catCard.className = 'cat-overview-card';
      catCard.innerHTML = `
        <div class="cat-photo">${cat.photoUrl}</div>
        <div class="cat-info">
          <div class="cat-name">${cat.name}</div>
          <div class="cat-breed">${cat.breed || 'Mixed'}</div>
          <div class="cat-weight">${cat.weight} kg</div>
        </div>
      `;
      container.appendChild(catCard);
    });

    return container;
  }
}
```

**Add dashboard styles to `frontend/public/styles.css`:**
```css
/* Dashboard Styles */
.dashboard-page {
    padding: 40px 20px;
}

.dashboard-header {
    margin-bottom: 32px;
}

.page-title {
    font-size: 32px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 8px;
}

.page-subtitle {
    font-size: 16px;
    color: var(--gray-600);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.dashboard-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

@media (max-width: 968px) {
    .dashboard-content {
        grid-template-columns: 1fr;
    }
}

.dashboard-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.quick-actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.cats-overview {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cat-overview-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: var(--gray-100);
    border-radius: 12px;
    transition: background-color 0.3s ease;
}

.cat-overview-card:hover {
    background-color: var(--gray-200);
}

.cat-photo {
    font-size: 48px;
}

.cat-info {
    flex: 1;
}

.cat-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-800);
}

.cat-breed {
    font-size: 14px;
    color: var(--gray-600);
}

.cat-weight {
    font-size: 14px;
    color: var(--gray-600);
    margin-top: 4px;
}
```

### Step 6: Update App Router

**Update `frontend/src/app.ts`:**
```typescript
import { router } from './utils/router';
import { Navbar } from './components';
import { DashboardPage } from './pages/DashboardPage';

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

### Step 7: Update Component Exports

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
```

### Step 8: Test the Dashboard

```bash
cd frontend
npm start
```

You should see:
- A complete dashboard with navigation
- 4 stat cards showing totals
- Recent health events list
- Quick action buttons
- Device status with progress bars
- Cats overview cards

---

## Verification Checklist

- [ ] Dashboard loads successfully
- [ ] All stat cards display correct data
- [ ] Recent events show with cat info
- [ ] Device status shows metrics correctly
- [ ] Cats overview displays
- [ ] Quick action buttons are clickable
- [ ] Navigation works (shows placeholders for other pages)
- [ ] Layout is responsive

---

## Next Phase

Once the dashboard is complete, proceed to **Phase 3: Health Events & Tracking Pages**.
