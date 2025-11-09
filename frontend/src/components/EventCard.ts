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
