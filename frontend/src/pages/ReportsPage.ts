import { Component } from '../components/Component';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { HealthChart } from '../components/HealthChart';
import { mockCats, mockHealthEvents } from '../services/mockData';

export class ReportsPage extends Component {
  private selectedCatId: string = 'all';
  private selectedPeriod: string = 'week';

  constructor() {
    super('div', 'page reports-page');
  }

  render(): HTMLElement {
    const page = this.element;

    // Header
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
      <div>
        <h1 class="page-title">Health Reports</h1>
        <p class="page-subtitle">View analytics and insights about your cats' health</p>
      </div>
    `;

    const exportButton = new Button({
      text: 'Export PDF',
      icon: '📄',
      variant: 'outline',
      onClick: () => this.exportReport()
    });
    exportButton.element.style.alignSelf = 'flex-start';
    header.appendChild(exportButton.render());

    page.appendChild(header);

    // Filters
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'report-filters';
    filtersContainer.id = 'report-filters';
    this.renderFilters(filtersContainer);
    page.appendChild(filtersContainer);

    // Summary Cards
    const summaryContainer = document.createElement('div');
    summaryContainer.id = 'summary-container';
    this.renderSummary(summaryContainer);
    page.appendChild(summaryContainer);

    // Chart
    const chartContainer = document.createElement('div');
    chartContainer.id = 'chart-container';
    chartContainer.style.marginBottom = '24px';
    this.renderChart(chartContainer);
    page.appendChild(chartContainer);

    // Insights
    this.renderInsights(page);

    return page;
  }

  private renderFilters(container: HTMLElement): void {
    container.innerHTML = '';

    const catSelect = document.createElement('select');
    catSelect.className = 'report-select';
    catSelect.innerHTML = `
      <option value="all">All Cats</option>
      ${mockCats.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
    `;
    catSelect.value = this.selectedCatId;
    catSelect.addEventListener('change', (e) => {
      this.selectedCatId = (e.target as HTMLSelectElement).value;
      this.updateReport();
    });
    container.appendChild(catSelect);

    const periodSelect = document.createElement('select');
    periodSelect.className = 'report-select';
    periodSelect.innerHTML = `
      <option value="week">Last 7 Days</option>
      <option value="month">Last 30 Days</option>
      <option value="quarter">Last 90 Days</option>
    `;
    periodSelect.value = this.selectedPeriod;
    periodSelect.addEventListener('change', (e) => {
      this.selectedPeriod = (e.target as HTMLSelectElement).value;
      this.updateReport();
    });
    container.appendChild(periodSelect);
  }

  private renderSummary(container: HTMLElement): void {
    container.innerHTML = '';
    container.className = 'summary-grid';

    const events = this.getFilteredEvents();
    const urinations = events.filter(e => e.type === 'urination').length;
    const defecations = events.filter(e => e.type === 'defecation').length;
    const anomalies = events.filter(e => e.screeningResult?.anomalies.length > 0).length;
    const days = this.selectedPeriod === 'week' ? 7 : this.selectedPeriod === 'month' ? 30 : 90;

    const summaryData = [
      { title: 'Total Events', value: events.length, icon: '📊', color: 'var(--primary-color)' },
      { title: 'Urinations', value: urinations, icon: '💧', color: 'var(--primary-color)' },
      { title: 'Defecations', value: defecations, icon: '💩', color: 'var(--secondary-color)' },
      { title: 'Anomalies Detected', value: anomalies, icon: '⚠️', color: 'var(--warning-color)' },
      { title: 'Daily Average', value: (events.length / days).toFixed(1), icon: '📈', color: 'var(--gray-700)' }
    ];

    summaryData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'summary-card';
      card.innerHTML = `
        <div class="summary-icon" style="color: ${item.color};">${item.icon}</div>
        <div class="summary-content">
          <div class="summary-value">${item.value}</div>
          <div class="summary-title">${item.title}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  private renderChart(container: HTMLElement): void {
    container.innerHTML = '';
    const days = this.selectedPeriod === 'week' ? 7 : this.selectedPeriod === 'month' ? 30 : 90;
    const chart = new HealthChart({
      catId: this.selectedCatId === 'all' ? undefined : this.selectedCatId,
      days
    });
    chart.mount(container);
  }

  private renderInsights(container: HTMLElement): void {
    const insightsCard = document.createElement('div');
    insightsCard.className = 'card';
    insightsCard.innerHTML = `
      <h3 class="card-title">💡 Health Insights</h3>
      <div class="insights-list">
        <div class="insight-item insight-success">
          <div class="insight-icon">✅</div>
          <div class="insight-content">
            <div class="insight-title">Normal Activity Levels</div>
            <div class="insight-description">Your cats are showing consistent bathroom habits.</div>
          </div>
        </div>
        <div class="insight-item insight-warning">
          <div class="insight-icon">⚠️</div>
          <div class="insight-content">
            <div class="insight-title">Color Variation Detected</div>
            <div class="insight-description">Whiskers had 2 events with unusual stool color. Consider veterinary consultation.</div>
          </div>
        </div>
        <div class="insight-item insight-info">
          <div class="insight-icon">ℹ️</div>
          <div class="insight-content">
            <div class="insight-title">Hydration Reminder</div>
            <div class="insight-description">Ensure fresh water is available. Urination frequency is within normal range.</div>
          </div>
        </div>
        <div class="insight-item insight-success">
          <div class="insight-icon">📊</div>
          <div class="insight-content">
            <div class="insight-title">Monitoring Active</div>
            <div class="insight-description">All devices are online and collecting data successfully.</div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(insightsCard);
  }

  private getFilteredEvents(): any[] {
    let events = [...mockHealthEvents];

    // Filter by cat
    if (this.selectedCatId !== 'all') {
      events = events.filter(e => e.catId === this.selectedCatId);
    }

    // Filter by period
    const now = new Date();
    const days = this.selectedPeriod === 'week' ? 7 : this.selectedPeriod === 'month' ? 30 : 90;
    events = events.filter(e => {
      const eventDate = new Date(e.timestamp);
      const diffDays = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });

    return events;
  }

  private updateReport(): void {
    const summaryContainer = document.getElementById('summary-container');
    const chartContainer = document.getElementById('chart-container');

    if (summaryContainer) {
      this.renderSummary(summaryContainer);
    }
    if (chartContainer) {
      this.renderChart(chartContainer);
    }
  }

  private exportReport(): void {
    alert('📄 Generating PDF report...\n\nThis would normally create a downloadable PDF with all health data and charts.');
  }
}
