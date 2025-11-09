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

  private renderPage(page: any) {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = '';

    // Create navbar
    const navItems: NavItem[] = [
      { text: 'Home', path: '/', icon: '🏠' },
      { text: 'Dashboard', path: '/dashboard', icon: '📊' },
      { text: 'Health', path: '/health', icon: '❤️' },
      { text: 'Settings', path: '/settings', icon: '⚙️' }
    ];

    const navbar = new Navbar({
      logoText: 'Catalyze',
      items: navItems,
      onNavigate: (path) => {
        router.navigate(path);
      }
    });

    navbar.mount(app);
    navbar.setActive(router.getCurrentRoute());

    // Add page content
    const container = document.createElement('div');
    container.className = 'container';
    page.mount(container);
    app.appendChild(container);
  }

  private renderPlaceholder(pageName: string) {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = '';

    // Create navbar
    const navItems: NavItem[] = [
      { text: 'Home', path: '/', icon: '🏠' },
      { text: 'Dashboard', path: '/dashboard', icon: '📊' },
      { text: 'Health', path: '/health', icon: '❤️' },
      { text: 'Settings', path: '/settings', icon: '⚙️' }
    ];

    const navbar = new Navbar({
      logoText: 'Catalyze',
      items: navItems,
      onNavigate: (path) => {
        router.navigate(path);
      }
    });

    navbar.mount(app);
    navbar.setActive(router.getCurrentRoute());

    // Add placeholder content
    const container = document.createElement('div');
    container.className = 'container';
    container.style.padding = '40px 20px';
    
    const card = new Card({
      title: pageName,
      content: `<p style="text-align: center; font-size: 18px; color: var(--gray-600);">This page is coming soon in Phase 3!</p>`
    });
    card.mount(container);
    
    app.appendChild(container);
  }

  private showDeviceDetectionModal() {
    const modalContent = document.createElement('div');
    modalContent.style.textAlign = 'center';
    
    const message = document.createElement('p');
    message.style.fontSize = '18px';
    message.style.marginBottom = '24px';
    message.textContent = 'Please select your device type for the best viewing experience:';
    modalContent.appendChild(message);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '12px';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.flexWrap = 'wrap';

    // Desktop button
    const desktopBtn = new Button({
      text: 'Desktop',
      icon: '🖥️',
      variant: 'primary',
      size: 'large',
      onClick: () => {
        this.deviceDetected = true;
        this.setDeviceMode('desktop');
        this.modal?.close();
      }
    });
    desktopBtn.mount(buttonContainer);

    // Tablet button
    const tabletBtn = new Button({
      text: 'Tablet',
      icon: '📱',
      variant: 'secondary',
      size: 'large',
      onClick: () => {
        this.deviceDetected = true;
        this.setDeviceMode('tablet');
        this.modal?.close();
      }
    });
    tabletBtn.mount(buttonContainer);

    // Mobile button
    const mobileBtn = new Button({
      text: 'Mobile',
      icon: '📱',
      variant: 'outline',
      size: 'large',
      onClick: () => {
        this.deviceDetected = true;
        this.setDeviceMode('mobile');
        this.modal?.close();
      }
    });
    mobileBtn.mount(buttonContainer);

    modalContent.appendChild(buttonContainer);

    this.modal = new Modal({
      title: 'Device Selection',
      content: modalContent,
      showCloseButton: false,
      closeOnBackdrop: false
    });

    const app = document.getElementById('app');
    if (app) {
      this.modal.mount(app);
      this.modal.open();
    }
  }

  private setDeviceMode(device: 'desktop' | 'tablet' | 'mobile') {
    const root = document.documentElement;
    
    // Set CSS variables based on device
    if (device === 'mobile') {
      root.style.fontSize = '14px';
      console.log('📱 Mobile mode activated');
    } else if (device === 'tablet') {
      root.style.fontSize = '15px';
      console.log('📱 Tablet mode activated');
    } else {
      root.style.fontSize = '16px';
      console.log('🖥️ Desktop mode activated');
    }
    
    // Store preference
    localStorage.setItem('deviceMode', device);
  }
}
