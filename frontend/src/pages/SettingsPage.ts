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
