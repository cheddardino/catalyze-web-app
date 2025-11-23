import { Component } from '../components/Component';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatCard } from '../components/StatCard';
import { EventCard } from '../components/EventCard';
import { DeviceStatus } from '../components/DeviceStatus';
import { UsageChart } from '../components/UsageChart';
import { router } from '../utils/router';
import { 
  mockCats, 
  mockDevices, 
  getTodayEvents, 
  getUnreadNotifications,
  getRecentEvents,
  mockUser,
  mockCleaningCycles,
  getAnomalies
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
        <p class="page-subtitle">Welcome back, ${mockUser.email}</p>
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
        icon: '●',
        label: 'Cleaning Cycles',
        value: mockCleaningCycles.total,
        trend: 'up',
        trendValue: `+${mockCleaningCycles.today} today`,
        color: 'var(--primary-color)'
      }),
      new StatCard({
        icon: '▲',
        label: 'Today\'s Events',
        value: todayEvents.length,
        trend: 'neutral',
        trendValue: 'Normal',
        color: 'var(--info-color)'
      }),
      new StatCard({
        icon: '◆',
        label: 'Notifications',
        value: unreadNotifs.length,
        color: 'var(--warning-color)'
      }),
      new StatCard({
        icon: '■',
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

    // Usage Chart Card
    const usageCard = new Card({
      title: 'Cleaning Frequency',
      content: new UsageChart({ days: 7 }).render()
    });
    usageCard.mount(leftColumn);

    // Quick Actions Card
    const actionsCard = new Card({
      title: 'Quick Actions',
      content: this.renderQuickActions()
    });
    actionsCard.mount(leftColumn);

    contentGrid.appendChild(leftColumn);

    // Right Column
    const rightColumn = document.createElement('div');
    rightColumn.className = 'dashboard-column';

    // Anomaly Detection History
    const anomalyCard = new Card({
      title: 'Anomaly Detection',
      content: this.renderAnomalies()
    });
    anomalyCard.mount(rightColumn);

    contentGrid.appendChild(rightColumn);
    page.appendChild(contentGrid);

    return page;
  }

  private renderAnomalies(): HTMLElement {
    const container = document.createElement('div');
    const anomalies = getAnomalies(5);

    if (anomalies.length === 0) {
      container.innerHTML = '<p style="color: var(--gray-600); text-align: center; padding: 20px;">No anomalies detected</p>';
      return container;
    }

    anomalies.forEach(anomaly => {
      const item = document.createElement('div');
      item.className = 'anomaly-item';
      item.style.padding = '12px';
      item.style.borderBottom = '1px solid var(--gray-200)';
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 500; color: var(--danger-color);">Issue Detected</span>
          <span style="font-size: 0.85rem; color: var(--text-tertiary);">${new Date(anomaly.timestamp).toLocaleDateString()}</span>
        </div>
        <div style="color: var(--text-secondary);">${anomaly.description}</div>
      `;
      container.appendChild(item);
    });

    return container;
  }

  private renderQuickActions(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'quick-actions-grid';

    const actions = [
      {
        icon: '',
        text: 'View Health Events',
        onClick: () => router.navigate('/health')
      },
      {
        icon: '',
        text: 'Manage Devices',
        onClick: () => router.navigate('/devices')
      },
      {
        icon: '',
        text: 'Generate Report',
        onClick: () => router.navigate('/reports')
      },
      {
        icon: '',
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
}
