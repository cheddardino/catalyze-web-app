import { Component } from './Component';

export interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel';
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

export class Input extends Component {
  private props: InputProps;
  private inputElement!: HTMLInputElement;

  constructor(props: InputProps) {
    super('div', 'input-group');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;

    // Add label if provided
    if (this.props.label) {
      const label = document.createElement('label');
      label.className = 'input-label';
      label.textContent = this.props.label;
      if (this.props.required) {
        label.innerHTML += '<span class="text-danger">*</span>';
      }
      container.appendChild(label);
    }

    // Create input element
    this.inputElement = document.createElement('input');
    this.inputElement.type = this.props.type || 'text';
    this.inputElement.className = 'input';
    
    if (this.props.placeholder) {
      this.inputElement.placeholder = this.props.placeholder;
    }
    
    if (this.props.value) {
      this.inputElement.value = this.props.value;
    }
    
    if (this.props.disabled) {
      this.inputElement.disabled = true;
    }
    
    if (this.props.required) {
      this.inputElement.required = true;
    }

    // Add error class if error exists
    if (this.props.error) {
      this.inputElement.classList.add('input-error');
    }

    // Add change handler
    if (this.props.onChange) {
      this.inputElement.addEventListener('input', (e) => {
        this.props.onChange!((e.target as HTMLInputElement).value);
      });
    }

    container.appendChild(this.inputElement);

    // Add error message if provided
    if (this.props.error) {
      const errorElement = document.createElement('span');
      errorElement.className = 'input-error-message';
      errorElement.textContent = this.props.error;
      container.appendChild(errorElement);
    }

    return container;
  }

  getValue(): string {
    return this.inputElement.value;
  }

  setValue(value: string): void {
    this.inputElement.value = value;
  }

  setError(error: string): void {
    this.props.error = error;
    this.inputElement.classList.add('input-error');
    
    // Add error message if not already present
    const existingError = this.element.querySelector('.input-error-message');
    if (existingError) {
      existingError.textContent = error;
    } else {
      const errorElement = document.createElement('span');
      errorElement.className = 'input-error-message';
      errorElement.textContent = error;
      this.element.appendChild(errorElement);
    }
  }

  clearError(): void {
    this.props.error = undefined;
    this.inputElement.classList.remove('input-error');
    const errorElement = this.element.querySelector('.input-error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
}
