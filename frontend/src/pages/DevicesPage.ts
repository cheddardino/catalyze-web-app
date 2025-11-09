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
            <span class="info-label">Status:</span>
            <span class="info-value" style="text-transform: capitalize;">${device.status}</span>
          </div>
          <div class="device-info-item">
            <span class="info-label">Power:</span>
            <span class="info-value">Connected</span>
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
            <span class="detail-label">Power Status:</span>
            <span class="detail-value">Connected</span>
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
