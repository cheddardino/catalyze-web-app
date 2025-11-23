import { Component } from './Component';
import { mockCleaningCycles } from '../services/mockData';

export interface UsageChartProps {
  days?: number;
}

export class UsageChart extends Component {
  private props: UsageChartProps;

  constructor(props: UsageChartProps) {
    super('div', 'usage-chart');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;
    const days = this.props.days || 7;
    const data = this.getChartData(days);

    container.innerHTML = `
      <div class="chart-header">
        <h3 class="chart-title">Cleaning Cycle Frequency</h3>
      </div>
      <div class="chart-container">
        ${this.renderBars(data)}
      </div>
    `;

    // Add some basic styles for the chart if not already present
    // Note: Ideally these should be in styles.css, but for now we can rely on existing chart classes
    // or add inline styles if needed. Assuming 'chart-bars', 'bar-group', etc. exist from HealthChart.

    return container;
  }

  private getChartData(days: number): any[] {
    // In a real app, we would filter mockCleaningCycles.history based on date range
    // For now, we just take the last N entries or map them
    return mockCleaningCycles.history.slice(0, days).map(d => ({
      label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: d.count
    })).reverse();
  }

  private renderBars(data: any[]): string {
    const maxValue = Math.max(...data.map(d => d.value), 5);

    return `
      <div class="chart-bars">
        ${data.map(d => `
          <div class="bar-group">
            <div class="bar-stack">
              <div class="bar" style="height: ${(d.value / maxValue) * 100}%; background-color: var(--primary-color);" title="${d.value} cycles"></div>
            </div>
            <div class="bar-label">${d.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
