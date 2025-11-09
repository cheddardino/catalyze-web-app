type RouteHandler = () => void;

class Router {
  private routes: Map<string, RouteHandler> = new Map();
  private currentRoute: string = '/';

  constructor() {
    window.addEventListener('popstate', () => {
      this.loadRoute(window.location.pathname);
    });
  }

  register(path: string, handler: RouteHandler): void {
    this.routes.set(path, handler);
  }

  navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.loadRoute(path);
  }

  private loadRoute(path: string): void {
    this.currentRoute = path;
    const handler = this.routes.get(path);
    
    if (handler) {
      handler();
    } else {
      // Default to home if route not found
      const homeHandler = this.routes.get('/');
      if (homeHandler) homeHandler();
    }
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }

  init(): void {
    this.loadRoute(window.location.pathname || '/');
  }
}

export const router = new Router();
