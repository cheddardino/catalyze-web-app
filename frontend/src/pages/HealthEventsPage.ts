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
