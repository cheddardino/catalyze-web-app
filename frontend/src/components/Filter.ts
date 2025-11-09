import { Component } from './Component';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string) => void;
}

export class Filter extends Component {
  private props: FilterProps;

  constructor(props: FilterProps) {
    super('div', 'filter-group');
    this.props = props;
  }

  render(): HTMLElement {
    const container = this.element;

    const label = document.createElement('label');
    label.className = 'filter-label';
    label.textContent = this.props.label;
    container.appendChild(label);

    const select = document.createElement('select');
    select.className = 'filter-select';

    this.props.options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      if (this.props.value === option.value) {
        optionEl.selected = true;
      }
      select.appendChild(optionEl);
    });

    select.addEventListener('change', (e) => {
      this.props.onChange((e.target as HTMLSelectElement).value);
    });

    container.appendChild(select);

    return container;
  }
}
