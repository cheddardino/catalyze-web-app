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