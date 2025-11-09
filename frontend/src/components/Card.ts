import { Component } from './Component';

export interface CardProps {
  title?: string;
  content: string | HTMLElement;
  footer?: string | HTMLElement;
  hoverable?: boolean;
  onClick?: () => void;
}

export class Card extends Component {
  private props: CardProps;

  constructor(props: CardProps) {
    super('div', 'card');
    this.props = props;
    if (this.props.hoverable) {
      this.element.classList.add('card-hoverable');
    }
  }

  render(): HTMLElement {
    const card = this.element;

    // Add title if provided
    if (this.props.title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'card-title';
      titleElement.textContent = this.props.title;
      card.appendChild(titleElement);
    }

    // Add content
    const contentElement = document.createElement('div');
    contentElement.className = 'card-content';
    if (typeof this.props.content === 'string') {
      contentElement.innerHTML = this.props.content;
    } else {
      contentElement.appendChild(this.props.content);
    }
    card.appendChild(contentElement);

    // Add footer if provided
    if (this.props.footer) {
      const footerElement = document.createElement('div');
      footerElement.className = 'card-footer';
      if (typeof this.props.footer === 'string') {
        footerElement.innerHTML = this.props.footer;
      } else {
        footerElement.appendChild(this.props.footer);
      }
      card.appendChild(footerElement);
    }

    // Add click handler if provided
    if (this.props.onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', this.props.onClick);
    }

    return card;
  }
}