export abstract class Component {
  public element: HTMLElement;

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
