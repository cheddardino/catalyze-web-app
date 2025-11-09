export function addClass(element: HTMLElement, className: string): void {
  if (element && className) {
    element.classList.add(className);
  }
}

export function removeClass(element: HTMLElement, className: string): void {
  if (element && className) {
    element.classList.remove(className);
  }
}

export function toggleClass(element: HTMLElement, className: string): void {
  if (element && className) {
    element.classList.toggle(className);
  }
}

export function setAttribute(element: HTMLElement, attribute: string, value: string): void {
  if (element && attribute) {
    element.setAttribute(attribute, value);
  }
}

export function getAttribute(element: HTMLElement, attribute: string): string | null {
  return element ? element.getAttribute(attribute) : null;
}