import { Component } from './Component';
import { Device } from '../types';

export interface DeviceStatusProps {
  device: Device;
}

export class DeviceStatus extends Component {
  private props: DeviceStatusProps;

  constructor(props: DeviceStatusProps) {
    super('div', 'device-status');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;
    const device = this.props.device;

    const statusColor = device.status === 'online' ? 'var(--secondary-color)' :
                        device.status === 'offline' ? 'var(--danger-color)' :
                        'var(--warning-color)';

    container.innerHTML = `
      <div class="device-header">
        <div>
          <div class="device-name">${device.name}</div>
          <div class="device-firmware">Firmware: ${device.firmwareVersion}</div>
        </div>
        <div class="device-status-badge" style="background-color: ${statusColor}20; color: ${statusColor};">
          <span class="status-dot" style="background-color: ${statusColor};"></span>
          ${device.status}
        </div>
      </div>
      
      <div class="device-metrics">
        <div class="device-metric">
          <div class="metric-label">Litter Level</div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${device.litterLevel}%; background-color: var(--primary-color);"></div>
          </div>
          <div class="metric-value">${device.litterLevel}%</div>
        </div>
        
        <div class="device-metric">
          <div class="metric-label">Waste Level</div>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${device.wasteLevel}%; background-color: ${device.wasteLevel > 70 ? 'var(--danger-color)' : 'var(--warning-color)'};"></div>
          </div>
          <div class="metric-value">${device.wasteLevel}%</div>
        </div>

        ${device.batteryLevel ? `
          <div class="device-metric">
            <div class="metric-label">Battery</div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${device.batteryLevel}%; background-color: var(--secondary-color);"></div>
            </div>
            <div class="metric-value">${device.batteryLevel}%</div>
          </div>
        ` : ''}
      </div>

      ${device.lastCleaned ? `
        <div class="device-footer">
          Last cleaned: ${new Date(device.lastCleaned).toLocaleString()}
        </div>
      ` : ''}
    `;

    return container;
  }
}
