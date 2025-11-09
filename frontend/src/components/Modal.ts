import { Component } from './Component';

export interface ModalProps {
  title: string;
  content: string | HTMLElement;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  onClose?: () => void;
}

export class Modal extends Component {
  private props: ModalProps;
  private overlay!: HTMLElement;
  private modalContent!: HTMLElement;

  constructor(props: ModalProps) {
    super('div', 'modal');
    this.props = {
      showCloseButton: true,
      closeOnBackdrop: true,
      ...props
    };
  }

  render(): HTMLElement {
    const modal = this.element;
    modal.style.display = 'none'; // Hidden by default

    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    if (this.props.closeOnBackdrop) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Create modal content
    this.modalContent = document.createElement('div');
    this.modalContent.className = 'modal-content';

    // Create header
    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = this.props.title;
    header.appendChild(title);

    // Add close button if enabled
    if (this.props.showCloseButton) {
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', () => this.close());
      header.appendChild(closeButton);
    }

    this.modalContent.appendChild(header);

    // Create body
    const body = document.createElement('div');
    body.className = 'modal-body';
    
    if (typeof this.props.content === 'string') {
      body.innerHTML = this.props.content;
    } else {
      body.appendChild(this.props.content);
    }
    
    this.modalContent.appendChild(body);

    this.overlay.appendChild(this.modalContent);
    modal.appendChild(this.overlay);

    return modal;
  }

  open(): void {
    this.element.style.display = 'block';
    // Add animation class
    setTimeout(() => {
      this.overlay.classList.add('modal-show');
      this.modalContent.classList.add('modal-show');
    }, 10);
  }

  close(): void {
    this.overlay.classList.remove('modal-show');
    this.modalContent.classList.remove('modal-show');
    
    // Wait for animation to complete
    setTimeout(() => {
      this.element.style.display = 'none';
      if (this.props.onClose) {
        this.props.onClose();
      }
    }, 300);
  }

  setContent(content: string | HTMLElement): void {
    const body = this.modalContent.querySelector('.modal-body');
    if (body) {
      body.innerHTML = '';
      if (typeof content === 'string') {
        body.innerHTML = content;
      } else {
        body.appendChild(content);
      }
    }
  }
}
