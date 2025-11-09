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
