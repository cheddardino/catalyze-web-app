# Phase 1: UI Components & Layout System

**Goal:** Create reusable UI components and a consistent layout system for the entire application.

**Estimated Time:** 40-50 minutes

**Prerequisites:** Phase 0 completed successfully

---

## Instructions for AI

Let's build a comprehensive component library with buttons, cards, forms, navigation, and layout components.

### Step 1: Create Base Component Class

**Create `frontend/src/components/Component.ts`:**
```typescript
export abstract class Component {
  protected element: HTMLElement;

  constructor(tag: string = 'div', className?: string) {
    this.element = document.createElement(tag);
    if (className) {
      this.element.className = className;
    }
  }

  abstract render(): HTMLElement;

  mount(parent: HTMLElement): void {
    parent.appendChild(this.render());
  }

  unmount(): void {
    this.element.remove();
  }

  show(): void {
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
  }
}
```

### Step 2: Create Button Component

**Create `frontend/src/components/Button.ts`:**
```typescript
import { Component } from './Component';

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: string;
}

export class Button extends Component {
  private props: ButtonProps;

  constructor(props: ButtonProps) {
    super('button', 'btn');
    this.props = props;
  }

  render(): HTMLElement {
    const button = this.element as HTMLButtonElement;
    
    // Add variant class
    const variant = this.props.variant || 'primary';
    button.classList.add(`btn-${variant}`);

    // Add size class
    const size = this.props.size || 'medium';
    button.classList.add(`btn-${size}`);

    // Set content
    if (this.props.icon) {
      button.innerHTML = `
        <span class="btn-icon">${this.props.icon}</span>
        <span>${this.props.text}</span>
      `;
    } else {
      button.textContent = this.props.text;
    }

    // Set disabled state
    if (this.props.disabled) {
      button.disabled = true;
      button.classList.add('btn-disabled');
    }

    // Add click handler
    if (this.props.onClick && !this.props.disabled) {
      button.addEventListener('click', this.props.onClick);
    }

    return button;
  }
}
```

**Update `frontend/public/styles.css` (add button styles):**
```css
/* Add these button styles after the existing .btn class */

.btn-small {
    padding: 8px 16px;
    font-size: 14px;
}

.btn-medium {
    padding: 12px 24px;
    font-size: 16px;
}

.btn-large {
    padding: 16px 32px;
    font-size: 18px;
}

.btn-outline {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
}

.btn-outline:hover {
    background-color: var(--primary-color);
    color: var(--white);
}

.btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-icon {
    margin-right: 8px;
}
```

### Step 3: Create Card Component

**Create `frontend/src/components/Card.ts`:**
```typescript
import { Component } from './Component';

export interface CardProps {
  title?: string;
  content: string | HTMLElement;
  footer?: string | HTMLElement;
  onClick?: () => void;
  hoverable?: boolean;
}

export class Card extends Component {
  private props: CardProps;

  constructor(props: CardProps) {
    super('div', 'card');
    this.props = props;
  }

  render(): HTMLElement {
    const card = this.element;

    if (this.props.hoverable) {
      card.classList.add('card-hoverable');
    }

    // Title
    if (this.props.title) {
      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = this.props.title;
      card.appendChild(title);
    }

    // Content
    const content = document.createElement('div');
    content.className = 'card-content';
    
    if (typeof this.props.content === 'string') {
      content.innerHTML = this.props.content;
    } else {
      content.appendChild(this.props.content);
    }
    card.appendChild(content);

    // Footer
    if (this.props.footer) {
      const footer = document.createElement('div');
      footer.className = 'card-footer';
      
      if (typeof this.props.footer === 'string') {
        footer.innerHTML = this.props.footer;
      } else {
        footer.appendChild(this.props.footer);
      }
      card.appendChild(footer);
    }

    // Click handler
    if (this.props.onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', this.props.onClick);
    }

    return card;
  }
}
```

**Add card styles to `frontend/public/styles.css`:**
```css
/* Add after existing .card class */

.card-hoverable {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hoverable:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-800);
    margin-bottom: 16px;
}

.card-content {
    color: var(--gray-700);
    line-height: 1.6;
}

.card-footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--gray-200);
}
```

### Step 4: Create Input Components

**Create `frontend/src/components/Input.ts`:**
```typescript
import { Component } from './Component';

export interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  error?: string;
}

export class Input extends Component {
  private props: InputProps;
  private input: HTMLInputElement;

  constructor(props: InputProps) {
    super('div', 'input-group');
    this.props = props;
    this.input = document.createElement('input');
  }

  render(): HTMLElement {
    const container = this.element;

    // Label
    const label = document.createElement('label');
    label.className = 'input-label';
    label.textContent = this.props.label;
    if (this.props.required) {
      label.innerHTML += ' <span class="text-danger">*</span>';
    }
    container.appendChild(label);

    // Input
    this.input.type = this.props.type || 'text';
    this.input.className = 'input-field';
    this.input.placeholder = this.props.placeholder || '';
    
    if (this.props.value) {
      this.input.value = this.props.value;
    }

    if (this.props.onChange) {
      this.input.addEventListener('input', (e) => {
        this.props.onChange!((e.target as HTMLInputElement).value);
      });
    }

    container.appendChild(this.input);

    // Error message
    if (this.props.error) {
      const error = document.createElement('span');
      error.className = 'input-error';
      error.textContent = this.props.error;
      container.appendChild(error);
      this.input.classList.add('input-error-state');
    }

    return container;
  }

  getValue(): string {
    return this.input.value;
  }

  setValue(value: string): void {
    this.input.value = value;
  }

  clear(): void {
    this.input.value = '';
  }
}
```

**Add input styles to `frontend/public/styles.css`:**
```css
/* Form Styles */
.input-group {
    margin-bottom: 20px;
}

.input-label {
    display: block;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 8px;
    font-size: 14px;
}

.input-field {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--gray-300);
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    outline: none;
    border-color: var(--primary-color);
}

.input-error {
    display: block;
    color: var(--danger-color);
    font-size: 14px;
    margin-top: 4px;
}

.input-error-state {
    border-color: var(--danger-color);
}

.text-danger {
    color: var(--danger-color);
}
```

### Step 5: Create Navigation Component

**Create `frontend/src/components/Navbar.ts`:**
```typescript
import { Component } from './Component';
import { router } from '../utils/router';

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface NavbarProps {
  items: NavItem[];
  currentPath?: string;
}

export class Navbar extends Component {
  private props: NavbarProps;

  constructor(props: NavbarProps) {
    super('nav', 'navbar');
    this.props = props;
  }

  render(): HTMLElement {
    const nav = this.element;

    nav.innerHTML = `
      <div class="navbar-container">
        <div class="navbar-brand">
          <span class="navbar-logo">🐱</span>
          <span class="navbar-title">Catalyze</span>
        </div>
        <ul class="navbar-menu" id="navbar-menu"></ul>
      </div>
    `;

    const menu = nav.querySelector('#navbar-menu') as HTMLElement;

    this.props.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'navbar-item';

      const link = document.createElement('a');
      link.className = 'navbar-link';
      link.href = item.path;
      
      if (this.props.currentPath === item.path) {
        link.classList.add('navbar-link-active');
      }

      link.innerHTML = item.icon 
        ? `<span class="navbar-icon">${item.icon}</span>${item.label}`
        : item.label;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(item.path);
      });

      li.appendChild(link);
      menu.appendChild(li);
    });

    return nav;
  }
}
```

**Add navbar styles to `frontend/public/styles.css`:**
```css
/* Navigation Styles */
.navbar {
    background-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
}

.navbar-logo {
    font-size: 32px;
}

.navbar-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--white);
}

.navbar-menu {
    display: flex;
    list-style: none;
    gap: 8px;
    margin: 0;
    padding: 0;
}

.navbar-item {
    margin: 0;
}

.navbar-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    color: var(--white);
    text-decoration: none;
    border-radius: 6px;
    transition: background-color 0.3s ease;
    font-weight: 500;
}

.navbar-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.navbar-link-active {
    background-color: rgba(255, 255, 255, 0.2);
}

.navbar-icon {
    font-size: 20px;
}
```

### Step 6: Create Modal Component

**Create `frontend/src/components/Modal.ts`:**
```typescript
import { Component } from './Component';

export interface ModalProps {
  title: string;
  content: string | HTMLElement;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export class Modal extends Component {
  private props: ModalProps;

  constructor(props: ModalProps) {
    super('div', 'modal-overlay');
    this.props = props;
  }

  render(): HTMLElement {
    const overlay = this.element;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = this.props.title;
    header.appendChild(title);

    if (this.props.showCloseButton !== false) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'modal-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => this.close());
      header.appendChild(closeBtn);
    }

    modalContent.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body';
    
    if (typeof this.props.content === 'string') {
      body.innerHTML = this.props.content;
    } else {
      body.appendChild(this.props.content);
    }
    modalContent.appendChild(body);

    overlay.appendChild(modalContent);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });

    return overlay;
  }

  close(): void {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.unmount();
  }
}
```

**Add modal styles to `frontend/public/styles.css`:**
```css
/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content {
    background-color: var(--white);
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid var(--gray-200);
}

.modal-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-800);
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 32px;
    color: var(--gray-600);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    color: var(--gray-800);
}

.modal-body {
    padding: 24px;
}
```

### Step 7: Create Component Index

**Create `frontend/src/components/index.ts`:**
```typescript
export { Component } from './Component';
export { Button } from './Button';
export type { ButtonProps } from './Button';
export { Card } from './Card';
export type { CardProps } from './Card';
export { Input } from './Input';
export type { InputProps } from './Input';
export { Navbar } from './Navbar';
export type { NavbarProps, NavItem } from './Navbar';
export { Modal } from './Modal';
export type { ModalProps } from './Modal';
```

### Step 8: Create Demo Page

**Update `frontend/src/app.ts` to demo components:**
```typescript
import { router } from './utils/router';
import { Button, Card, Input, Navbar, Modal } from './components';

class App {
  private appRoot: HTMLElement | null;

  constructor() {
    this.appRoot = document.getElementById('app');
    this.setupRouter();
  }

  private setupRouter(): void {
    router.register('/', () => this.renderComponentDemo());
  }

  private renderComponentDemo(): void {
    if (!this.appRoot) return;

    this.appRoot.innerHTML = '';

    // Add Navbar
    const navbar = new Navbar({
      items: [
        { label: 'Home', path: '/', icon: '🏠' },
        { label: 'Dashboard', path: '/dashboard', icon: '📊' },
        { label: 'Devices', path: '/devices', icon: '🔧' },
        { label: 'Health', path: '/health', icon: '💚' },
      ],
      currentPath: '/'
    });
    navbar.mount(this.appRoot);

    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    container.style.paddingTop = '40px';
    container.style.paddingBottom = '40px';

    // Title
    const title = document.createElement('h1');
    title.textContent = '🎨 Component Library Demo';
    title.style.marginBottom = '40px';
    title.style.color = 'var(--gray-800)';
    container.appendChild(title);

    // Buttons Section
    const buttonsCard = new Card({
      title: 'Buttons',
      content: this.createButtonsDemo()
    });
    buttonsCard.mount(container);

    // Inputs Section
    const inputsCard = new Card({
      title: 'Form Inputs',
      content: this.createInputsDemo()
    });
    inputsCard.mount(container);

    // Cards Section
    const cardsSection = document.createElement('div');
    cardsSection.innerHTML = '<h2 style="margin: 24px 0 16px; color: var(--gray-800);">Cards</h2>';
    container.appendChild(cardsSection);

    const cardsGrid = document.createElement('div');
    cardsGrid.style.display = 'grid';
    cardsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    cardsGrid.style.gap = '20px';

    for (let i = 1; i <= 3; i++) {
      const demoCard = new Card({
        title: `Feature ${i}`,
        content: `This is a hoverable card component. It can contain any content and has smooth hover effects.`,
        footer: '<button class="btn btn-primary btn-small">Learn More</button>',
        hoverable: true
      });
      demoCard.mount(cardsGrid);
    }
    container.appendChild(cardsGrid);

    // Modal Demo
    const modalSection = document.createElement('div');
    modalSection.style.marginTop = '40px';
    
    const modalBtn = new Button({
      text: 'Open Modal',
      icon: '🪟',
      onClick: () => {
        const modal = new Modal({
          title: 'Demo Modal',
          content: '<p>This is a modal component. Click outside or the X button to close.</p>'
        });
        modal.mount(document.body);
      }
    });
    modalBtn.mount(modalSection);
    container.appendChild(modalSection);

    this.appRoot.appendChild(container);
  }

  private createButtonsDemo(): HTMLElement {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    div.style.gap = '12px';

    const buttons = [
      new Button({ text: 'Primary', variant: 'primary' }),
      new Button({ text: 'Secondary', variant: 'secondary' }),
      new Button({ text: 'Danger', variant: 'danger' }),
      new Button({ text: 'Outline', variant: 'outline' }),
      new Button({ text: 'With Icon', icon: '🚀', variant: 'primary' }),
      new Button({ text: 'Disabled', variant: 'primary', disabled: true }),
    ];

    buttons.forEach(btn => btn.mount(div));
    return div;
  }

  private createInputsDemo(): HTMLElement {
    const div = document.createElement('div');

    const textInput = new Input({
      label: 'Text Input',
      placeholder: 'Enter text...',
      required: true
    });

    const emailInput = new Input({
      label: 'Email',
      type: 'email',
      placeholder: 'your@email.com'
    });

    const errorInput = new Input({
      label: 'Input with Error',
      error: 'This field is required',
      value: ''
    });

    textInput.mount(div);
    emailInput.mount(div);
    errorInput.mount(div);

    return div;
  }

  init(): void {
    router.init();
  }
}

export default App;
```

### Step 9: Test the Components

```bash
cd frontend
npm start
```

You should see:
- A blue navigation bar with the Catalyze logo
- A component demo page showing all UI components
- Buttons in different variants
- Form inputs
- Hoverable cards
- A button to open a modal

---

## Verification Checklist

- [ ] All components render correctly
- [ ] Buttons are clickable and styled properly
- [ ] Cards have hover effects
- [ ] Form inputs accept user input
- [ ] Navbar is sticky at the top
- [ ] Modal opens and closes
- [ ] All styles are applied correctly
- [ ] Components are reusable

---

## Next Phase

Once all components work perfectly, proceed to **Phase 2: Dashboard & Home Page**.
