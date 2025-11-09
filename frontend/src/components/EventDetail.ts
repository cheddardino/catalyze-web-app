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
