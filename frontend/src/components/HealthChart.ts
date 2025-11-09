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
