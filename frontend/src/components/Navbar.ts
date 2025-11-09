import { Component } from './Component';

export interface NavItem {
  text: string;
  path: string;
  icon?: string;
}

export interface NavbarProps {
  logo?: string;
  logoText?: string;
  items: NavItem[];
  onNavigate?: (path: string) => void;
}

export class Navbar extends Component {
  private props: NavbarProps;

  constructor(props: NavbarProps) {
    super('nav', 'navbar');
    this.props = props;
  }

  render(): HTMLElement {
    const navbar = this.element;

    // Create navbar container
    const container = document.createElement('div');
    container.className = 'navbar-container';

    // Add logo section
    const logoSection = document.createElement('div');
    logoSection.className = 'navbar-logo';
    
    if (this.props.logo) {
      const logoImg = document.createElement('img');
      logoImg.src = this.props.logo;
      logoImg.alt = 'Logo';
      logoImg.className = 'navbar-logo-img';
      logoSection.appendChild(logoImg);
    }
    
    if (this.props.logoText) {
      const logoText = document.createElement('span');
      logoText.className = 'navbar-logo-text';
      logoText.textContent = this.props.logoText;
      logoSection.appendChild(logoText);
    }
    
    container.appendChild(logoSection);

    // Add navigation items
    const navItems = document.createElement('ul');
    navItems.className = 'navbar-items';

    this.props.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'navbar-item';

      const link = document.createElement('a');
      link.className = 'navbar-link';
      link.href = item.path;
      
      if (item.icon) {
        link.innerHTML = `
          <span class="navbar-icon">${item.icon}</span>
          <span>${item.text}</span>
        `;
      } else {
        link.textContent = item.text;
      }

      // Handle navigation
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.querySelectorAll('.navbar-link').forEach(l => {
          l.classList.remove('active');
        });
        
        // Add active class to clicked item
        link.classList.add('active');
        
        // Call navigation handler
        if (this.props.onNavigate) {
          this.props.onNavigate(item.path);
        }
      });

      li.appendChild(link);
      navItems.appendChild(li);
    });

    container.appendChild(navItems);
    navbar.appendChild(container);

    return navbar;
  }

  setActive(path: string): void {
    const links = this.element.querySelectorAll('.navbar-link');
    links.forEach(link => {
      const href = (link as HTMLAnchorElement).getAttribute('href');
      if (href === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
