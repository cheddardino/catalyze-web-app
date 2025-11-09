# Phase 4: Device Management & Reports Pages

**Goal:** Create device management interface and health reports/analytics pages.

**Estimated Time:** 60-70 minutes

**Prerequisites:** Phase 3 completed successfully

---

## Instructions for AI

Now let's build the device management and reporting features to complete the core user interface.

### Step 1: Create Device Management Page

**Create `frontend/src/pages/DevicesPage.ts`:**
```typescript
import { Component } from '../components/Component';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { DeviceStatus } from '../components/DeviceStatus';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { mockDevices } from '../services/mockData';

export class DevicesPage extends Component {
  constructor() {
    super('div', 'page devices-page');
  }

  render(): HTMLElement {
    const page = this.element;

    // Header
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
      <div>
        <h1 class="page-title">Device Management</h1>
        <p class="page-subtitle">Monitor and configure your Catalyze devices</p>
      </div>
    `;

    const addButton = new Button({
      text: 'Add Device',
      icon: '➕',
      variant: 'primary',
      onClick: () => this.showAddDeviceModal()
    });
    addButton.element.style.alignSelf = 'flex-start';
    header.appendChild(addButton.render());

    page.appendChild(header);

    // Devices Grid
    const devicesGrid = document.createElement('div');
    devicesGrid.className = 'devices-grid';

    mockDevices.forEach(device => {
      const deviceCard = this.createDeviceCard(device);
      devicesGrid.appendChild(deviceCard);
    });

    page.appendChild(devicesGrid);

    return page;
  }

  private createDeviceCard(device: any): HTMLElement {
    const card = document.createElement('div');
    card.className = 'device-card';

    const statusColor = device.status === 'online' ? 'var(--secondary-color)' : 
                       device.status === 'offline' ? 'var(--gray-400)' : 
                       'var(--warning-color)';

    card.innerHTML = `
      <div class="device-card-header">
        <div class="device-icon">📱</div>
        <div class="device-status-dot" style="background-color: ${statusColor};"></div>
      </div>
      <div class="device-card-body">
        <h3 class="device-name">${device.name}</h3>
        <p class="device-model">${device.model}</p>
        <div class="device-info">
          <div class="device-info-item">
            <span class="info-label">Battery:</span>
            <span class="info-value">${device.batteryLevel}%</span>
          </div>
          <div class="device-info-item">
            <span class="info-label">Status:</span>
            <span class="info-value" style="text-transform: capitalize;">${device.status}</span>
          </div>
          <div class="device-info-item">
            <span class="info-label">Last Sync:</span>
            <span class="info-value">${new Date(device.lastSync).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div class="device-card-actions">
        <button class="btn-icon" title="Settings">⚙️</button>
        <button class="btn-icon" title="Details">📊</button>
        <button class="btn-icon" title="Remove">🗑️</button>
      </div>
    `;

    // Add event listeners
    const buttons = card.querySelectorAll('.btn-icon');
    buttons[0].addEventListener('click', () => this.showDeviceSettings(device));
    buttons[1].addEventListener('click', () => this.showDeviceDetails(device));
    buttons[2].addEventListener('click', () => this.confirmRemoveDevice(device));

    return card;
  }

  private showAddDeviceModal(): void {
    const content = document.createElement('div');
    content.innerHTML = `
      <p style="margin-bottom: 20px;">Follow these steps to add a new device:</p>
      <ol style="margin-left: 20px; line-height: 2;">
        <li>Turn on your Catalyze device</li>
        <li>Press and hold the pairing button for 3 seconds</li>
        <li>Wait for the LED to blink blue</li>
        <li>Click "Start Pairing" below</li>
      </ol>
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '24px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '12px';

    const pairBtn = new Button({
      text: 'Start Pairing',
      variant: 'primary',
      onClick: () => {
        alert('🔄 Searching for devices...\n\nThis would normally connect to your device via Bluetooth or WiFi.');
      }
    });
    pairBtn.mount(buttonContainer);

    const cancelBtn = new Button({
      text: 'Cancel',
      variant: 'outline',
      onClick: () => {
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
      }
    });
    cancelBtn.mount(buttonContainer);

    content.appendChild(buttonContainer);

    const modal = new Modal({
      title: 'Add New Device',
      content
    });
    modal.mount(document.body);
  }

  private showDeviceSettings(device: any): void {
    const content = document.createElement('div');
    content.className = 'device-settings';

    const nameInput = new Input({
      label: 'Device Name',
      value: device.name,
      placeholder: 'Enter device name'
    });
    nameInput.mount(content);

    const notificationsDiv = document.createElement('div');
    notificationsDiv.style.marginTop = '20px';
    notificationsDiv.innerHTML = `
      <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <input type="checkbox" checked style="width: 20px; height: 20px;">
        <span>Enable notifications</span>
      </label>
    `;
    content.appendChild(notificationsDiv);

    const autoSyncDiv = document.createElement('div');
    autoSyncDiv.style.marginTop = '16px';
    autoSyncDiv.innerHTML = `
      <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
        <input type="checkbox" checked style="width: 20px; height: 20px;">
        <span>Auto-sync data</span>
      </label>
    `;
    content.appendChild(autoSyncDiv);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '24px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '12px';

    const saveBtn = new Button({
      text: 'Save Changes',
      variant: 'primary',
      onClick: () => {
        alert('✅ Settings saved successfully!');
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
      }
    });
    saveBtn.mount(buttonContainer);

    const cancelBtn = new Button({
      text: 'Cancel',
      variant: 'outline',
      onClick: () => {
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
      }
    });
    cancelBtn.mount(buttonContainer);

    content.appendChild(buttonContainer);

    const modal = new Modal({
      title: `Settings - ${device.name}`,
      content
    });
    modal.mount(document.body);
  }

  private showDeviceDetails(device: any): void {
    const content = document.createElement('div');
    content.className = 'device-details';

    content.innerHTML = `
      <div class="detail-section">
        <h4>Device Information</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Model:</span>
            <span class="detail-value">${device.model}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Serial Number:</span>
            <span class="detail-value">${device.id}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Firmware:</span>
            <span class="detail-value">v2.1.3</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Battery Health:</span>
            <span class="detail-value">Good</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h4>Connection Info</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Status:</span>
            <span class="detail-value" style="text-transform: capitalize;">${device.status}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Sync:</span>
            <span class="detail-value">${new Date(device.lastSync).toLocaleString()}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Connected Since:</span>
            <span class="detail-value">${new Date(device.lastSync).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h4>Usage Statistics</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Total Events:</span>
            <span class="detail-value">1,234</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">This Month:</span>
            <span class="detail-value">156</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Uptime:</span>
            <span class="detail-value">99.8%</span>
          </div>
        </div>
      </div>
    `;

    const modal = new Modal({
      title: device.name,
      content
    });
    modal.mount(document.body);
  }

  private confirmRemoveDevice(device: any): void {
    const content = document.createElement('div');
    content.innerHTML = `
      <p style="margin-bottom: 20px;">Are you sure you want to remove <strong>${device.name}</strong>?</p>
      <p style="color: var(--gray-600);">This action cannot be undone. All device data will be removed.</p>
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '24px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '12px';

    const removeBtn = new Button({
      text: 'Remove Device',
      variant: 'danger',
      onClick: () => {
        alert('🗑️ Device removed successfully!');
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
      }
    });
    removeBtn.mount(buttonContainer);

    const cancelBtn = new Button({
      text: 'Cancel',
      variant: 'outline',
      onClick: () => {
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
      }
    });
    cancelBtn.mount(buttonContainer);

    content.appendChild(buttonContainer);

    const modal = new Modal({
      title: 'Remove Device',
      content
    });
    modal.mount(document.body);
  }
}
```

**Add device page styles to `frontend/public/styles.css`:**
```css
/* Devices Page Styles */
.devices-page {
    padding: 40px 20px;
}

.devices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
}

.device-card {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.device-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.device-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.device-icon {
    font-size: 48px;
}

.device-status-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: 0 0 8px currentColor;
}

.device-card-body {
    margin-bottom: 20px;
}

.device-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 4px;
}

.device-model {
    font-size: 14px;
    color: var(--gray-600);
    margin-bottom: 16px;
}

.device-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.device-info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--gray-200);
}

.device-info-item:last-child {
    border-bottom: none;
}

.info-label {
    font-size: 14px;
    color: var(--gray-600);
}

.info-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-800);
}

.device-card-actions {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--gray-200);
}

.btn-icon {
    flex: 1;
    padding: 10px;
    background: var(--gray-100);
    border: none;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-icon:hover {
    background: var(--gray-200);
}

.device-settings, .device-details {
    min-width: 400px;
}

.detail-section {
    margin-bottom: 24px;
}

.detail-section h4 {
    font-size: 16px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 12px;
}

.detail-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
}

.detail-label {
    font-size: 14px;
    color: var(--gray-600);
}

.detail-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-800);
}

@media (max-width: 768px) {
    .devices-grid {
        grid-template-columns: 1fr;
    }
    
    .device-settings, .device-details {
        min-width: auto;
    }
}
```

### Step 2: Create Reports Page

**Create `frontend/src/pages/ReportsPage.ts`:**
```typescript
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
```

**Add reports page styles to `frontend/public/styles.css`:**
```css
/* Reports Page Styles */
.reports-page {
    padding: 40px 20px;
}

.report-filters {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.report-select {
    padding: 12px 16px;
    border: 2px solid var(--gray-300);
    border-radius: 8px;
    font-size: 15px;
    background-color: var(--white);
    cursor: pointer;
    transition: border-color 0.3s ease;
    min-width: 200px;
}

.report-select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
}

.summary-card {
    background: var(--white);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 16px;
}

.summary-icon {
    font-size: 36px;
}

.summary-content {
    flex: 1;
}

.summary-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--gray-800);
    line-height: 1;
}

.summary-title {
    font-size: 14px;
    color: var(--gray-600);
    margin-top: 4px;
}

.insights-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.insight-item {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid;
}

.insight-success {
    background-color: var(--secondary-color)10;
    border-color: var(--secondary-color);
}

.insight-warning {
    background-color: var(--warning-color)10;
    border-color: var(--warning-color);
}

.insight-info {
    background-color: var(--primary-color)10;
    border-color: var(--primary-color);
}

.insight-icon {
    font-size: 24px;
}

.insight-content {
    flex: 1;
}

.insight-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-800);
    margin-bottom: 4px;
}

.insight-description {
    font-size: 14px;
    color: var(--gray-700);
    line-height: 1.5;
}

@media (max-width: 768px) {
    .summary-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .report-filters {
        flex-direction: column;
    }
    
    .report-select {
        min-width: auto;
    }
}
```

### Step 3: Create Settings Page

**Create `frontend/src/pages/SettingsPage.ts`:**
```typescript
import { Component } from '../components/Component';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export class SettingsPage extends Component {
  constructor() {
    super('div', 'page settings-page');
  }

  render(): HTMLElement {
    const page = this.element;

    // Header
    const header = document.createElement('div');
    header.className = 'page-header';
    header.innerHTML = `
      <div>
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your account and application preferences</p>
      </div>
    `;
    page.appendChild(header);

    // Settings Sections
    const sectionsContainer = document.createElement('div');
    sectionsContainer.className = 'settings-container';

    // Profile Section
    const profileSection = this.createSection('👤 Profile', [
      this.createInput('Full Name', 'John Doe'),
      this.createInput('Email', 'john.doe@example.com'),
      this.createInput('Phone', '+1 (555) 123-4567')
    ]);
    sectionsContainer.appendChild(profileSection);

    // Notifications Section
    const notificationsSection = this.createSection('🔔 Notifications', [
      this.createToggle('Event Notifications', true),
      this.createToggle('Anomaly Alerts', true),
      this.createToggle('Device Status Updates', false),
      this.createToggle('Weekly Summary Report', true)
    ]);
    sectionsContainer.appendChild(notificationsSection);

    // Preferences Section
    const preferencesSection = this.createSection('⚙️ Preferences', [
      this.createDropdown('Time Zone', ['UTC-8 Pacific', 'UTC-5 Eastern', 'UTC+0 GMT']),
      this.createDropdown('Date Format', ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']),
      this.createDropdown('Temperature Unit', ['Celsius', 'Fahrenheit'])
    ]);
    sectionsContainer.appendChild(preferencesSection);

    // Privacy Section
    const privacySection = this.createSection('🔒 Privacy & Security', [
      this.createToggle('Share Data with Vets', true),
      this.createToggle('Anonymous Usage Statistics', false),
      this.createButton('Change Password', 'outline'),
      this.createButton('Two-Factor Authentication', 'outline')
    ]);
    sectionsContainer.appendChild(privacySection);

    page.appendChild(sectionsContainer);

    // Action Buttons
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'settings-actions';

    const saveBtn = new Button({
      text: 'Save Changes',
      variant: 'primary',
      onClick: () => {
        alert('✅ Settings saved successfully!');
      }
    });
    saveBtn.mount(actionsContainer);

    const resetBtn = new Button({
      text: 'Reset to Defaults',
      variant: 'outline',
      onClick: () => {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
          alert('🔄 Settings reset to defaults!');
        }
      }
    });
    resetBtn.mount(actionsContainer);

    page.appendChild(actionsContainer);

    return page;
  }

  private createSection(title: string, items: HTMLElement[]): HTMLElement {
    const section = document.createElement('div');
    section.className = 'settings-section';

    const titleEl = document.createElement('h3');
    titleEl.className = 'section-heading';
    titleEl.textContent = title;
    section.appendChild(titleEl);

    const content = document.createElement('div');
    content.className = 'section-content';
    items.forEach(item => content.appendChild(item));
    section.appendChild(content);

    return section;
  }

  private createInput(label: string, value: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'setting-item';
    
    const input = new Input({
      label,
      value,
      placeholder: `Enter ${label.toLowerCase()}`
    });
    input.mount(container);
    
    return container;
  }

  private createToggle(label: string, checked: boolean): HTMLElement {
    const container = document.createElement('div');
    container.className = 'setting-item';
    
    const labelEl = document.createElement('label');
    labelEl.className = 'toggle-label';
    labelEl.innerHTML = `
      <span>${label}</span>
      <input type="checkbox" ${checked ? 'checked' : ''} class="toggle-input">
      <span class="toggle-slider"></span>
    `;
    container.appendChild(labelEl);
    
    return container;
  }

  private createDropdown(label: string, options: string[]): HTMLElement {
    const container = document.createElement('div');
    container.className = 'setting-item';
    
    const labelEl = document.createElement('label');
    labelEl.className = 'input-label';
    labelEl.textContent = label;
    container.appendChild(labelEl);
    
    const select = document.createElement('select');
    select.className = 'setting-select';
    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    container.appendChild(select);
    
    return container;
  }

  private createButton(text: string, variant: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'setting-item';
    
    const btn = new Button({
      text,
      variant: variant as any,
      onClick: () => {
        alert(`${text} clicked!`);
      }
    });
    btn.mount(container);
    
    return container;
  }
}
```

**Add settings page styles to `frontend/public/styles.css`:**
```css
/* Settings Page Styles */
.settings-page {
    padding: 40px 20px;
    max-width: 800px;
    margin: 0 auto;
}

.settings-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
}

.settings-section {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-heading {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--gray-200);
}

.section-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.setting-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.toggle-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 15px;
    color: var(--gray-700);
}

.toggle-input {
    display: none;
}

.toggle-slider {
    position: relative;
    width: 50px;
    height: 26px;
    background-color: var(--gray-300);
    border-radius: 13px;
    transition: background-color 0.3s ease;
}

.toggle-slider::before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: var(--white);
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
}

.toggle-input:checked + .toggle-slider {
    background-color: var(--primary-color);
}

.toggle-input:checked + .toggle-slider::before {
    transform: translateX(24px);
}

.setting-select {
    padding: 10px 16px;
    border: 2px solid var(--gray-300);
    border-radius: 8px;
    font-size: 15px;
    background-color: var(--white);
    cursor: pointer;
    transition: border-color 0.3s ease;
}

.setting-select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.settings-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .settings-actions {
        flex-direction: column;
    }
}
```

### Step 4: Update Router and Exports

**Update `frontend/src/app.ts`:**
```typescript
import { router } from './utils/router';
import { Button, Card, Navbar, Modal } from './components';
import type { NavItem } from './components';
import { DashboardPage } from './pages/DashboardPage';
import { HealthEventsPage } from './pages/HealthEventsPage';
import { DevicesPage } from './pages/DevicesPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export default class App {
  private modal: Modal | null = null;
  private deviceDetected: boolean = false;

  constructor() {}

  init() {
    this.setupRouter();
    router.init();
    
    // Show device detection modal on first load
    if (!this.deviceDetected) {
      this.showDeviceDetectionModal();
    }
  }

  private setupRouter() {
    router.register('/', () => this.renderPage(new DashboardPage()));
    router.register('/dashboard', () => this.renderPage(new DashboardPage()));
    router.register('/health', () => this.renderPage(new HealthEventsPage()));
    router.register('/devices', () => this.renderPage(new DevicesPage()));
    router.register('/reports', () => this.renderPage(new ReportsPage()));
    router.register('/settings', () => this.renderPage(new SettingsPage()));
  }

  // ... rest of the app.ts code remains the same
}
```

**Update `frontend/src/pages/index.ts`:**
```typescript
export { HomePage } from './HomePage';
export { LoginPage } from './LoginPage';
export { DashboardPage } from './DashboardPage';
export { HealthEventsPage } from './HealthEventsPage';
export { DevicesPage } from './DevicesPage';
export { ReportsPage } from './ReportsPage';
export { SettingsPage } from './SettingsPage';
```

### Step 5: Test the Application

```bash
cd frontend
npm start
```

Navigate through all pages and test:
- Device management (add, view, edit, remove)
- Reports with different filters and periods
- Settings with toggles and inputs
- All navigation and modals

---

## Verification Checklist

- [ ] Devices page loads and displays all devices
- [ ] Add device modal works
- [ ] Device settings modal works
- [ ] Device details modal works
- [ ] Remove device confirmation works
- [ ] Reports page loads with summary cards
- [ ] Report filters update charts and data
- [ ] Health insights display correctly
- [ ] Export PDF button shows message
- [ ] Settings page loads all sections
- [ ] Settings toggles work
- [ ] Save and reset buttons work
- [ ] All pages are responsive

---

## Project Complete!

Congratulations! You've completed the Catalyze web application frontend. All core features are now implemented:
- ✅ Phase 0: Project setup
- ✅ Phase 1: UI components
- ✅ Phase 2: Dashboard
- ✅ Phase 3: Health tracking
- ✅ Phase 4: Devices & reports

The application is ready for backend integration!
