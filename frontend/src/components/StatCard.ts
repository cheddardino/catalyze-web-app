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
