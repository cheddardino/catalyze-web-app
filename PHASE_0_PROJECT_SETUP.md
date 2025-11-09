# Phase 0: Project Initialization & Base Configuration

**Goal:** Set up the web application project with all dependencies and basic configuration files.

**Estimated Time:** 20-30 minutes

---

## Instructions for AI

Please help me create the Catalyze web application project structure with proper TypeScript, Webpack, and AWS CDK configuration.

### Step 1: Project Initialization

Create the base directory structure:
```bash
cd /Users/janfrancisnaval/PUP\ 4th\ Year/catalyze-web-app
```

### Step 2: Frontend Setup

#### 2.1 Initialize Frontend Package

```bash
cd frontend
npm init -y
```

#### 2.2 Install Frontend Dependencies

```bash
# Core dependencies
npm install typescript webpack webpack-cli webpack-dev-server
npm install html-webpack-plugin css-loader style-loader ts-loader

# Development tools
npm install --save-dev @types/node

# Utilities (we'll add more as needed)
npm install date-fns
```

#### 2.3 Create Frontend Configuration Files

**Create `frontend/package.json` (update scripts):**
```json
{
  "name": "catalyze-frontend",
  "version": "1.0.0",
  "description": "Catalyze Web Frontend",
  "main": "src/main.ts",
  "scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "watch": "webpack --watch"
  },
  "keywords": ["catalyze", "health", "pet"],
  "author": "Catalyze Team",
  "license": "ISC"
}
```

**Create `frontend/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Create `frontend/webpack.config.js`:**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  devServer: {
    static: './dist',
    port: 8080,
    hot: true,
    open: true,
  },
};
```

### Step 3: Create Frontend Structure

Create these directories and files:

```bash
cd frontend

# Create directory structure
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/styles
mkdir -p src/types
mkdir -p public
```

#### 3.1 Create Base HTML Template

**Create `frontend/public/index.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Catalyze - Smart Litter Box Health Monitoring">
    <title>Catalyze - Pet Health Monitoring</title>
</head>
<body>
    <div id="app"></div>
    <!-- Webpack will inject the bundle here -->
</body>
</html>
```

#### 3.2 Create Base Styles

**Create `frontend/public/styles.css`:**
```css
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #3B82F6;
    --secondary-color: #10B981;
    --danger-color: #EF4444;
    --warning-color: #F59E0B;
    --dark-color: #1F2937;
    --light-color: #F3F4F6;
    --white: #FFFFFF;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: var(--light-color);
    color: var(--dark-color);
    line-height: 1.6;
}

#app {
    min-height: 100vh;
}

/* Utility Classes */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--white);
}

.btn-primary:hover {
    background-color: #2563EB;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: var(--white);
}

.btn-secondary:hover {
    background-color: #059669;
}

.btn-danger {
    background-color: var(--danger-color);
    color: var(--white);
}

.card {
    background: var(--white);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

/* Loading Spinner */
.spinner {
    border: 3px solid var(--gray-200);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Hide class */
.hidden {
    display: none !important;
}
```

#### 3.3 Create Type Definitions

**Create `frontend/src/types/index.ts`:**
```typescript
// Cat Types
export interface Cat {
  id: string;
  name: string;
  breed?: string;
  dateOfBirth?: string;
  weight?: number;
  photoUrl?: string;
  createdAt: string;
}

// Device Types
export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  firmwareVersion: string;
  litterLevel: number;
  wasteLevel: number;
  lastCleaned?: string;
  batteryLevel?: number;
}

// Health Event Types
export interface HealthEvent {
  id: string;
  catId: string;
  timestamp: string;
  type: 'urination' | 'defecation';
  imageUrl?: string;
  screeningResult?: ScreeningResult;
  notes?: string;
}

export interface ScreeningResult {
  color: string;
  consistency: string;
  size: string;
  shape: string;
  anomalies: string[];
  confidenceScore: number;
}

// Cleaning Types
export interface CleaningCycle {
  id: string;
  deviceId: string;
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'failed';
  type: 'manual' | 'automatic';
}

// User Types (for Phase 6)
export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  timestamp: string;
  read: boolean;
}

// Report Types
export interface VetReport {
  id: string;
  dateRange: {
    start: string;
    end: string;
  };
  catIds: string[];
  generatedAt: string;
  format: 'pdf' | 'html';
}
```

#### 3.4 Create Router Utility

**Create `frontend/src/utils/router.ts`:**
```typescript
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
```

#### 3.5 Create DOM Utilities

**Create `frontend/src/utils/dom.ts`:**
```typescript
export function createElement(
  tag: string,
  className?: string,
  textContent?: string
): HTMLElement {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

export function clearElement(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function showElement(element: HTMLElement): void {
  element.classList.remove('hidden');
}

export function hideElement(element: HTMLElement): void {
  element.classList.add('hidden');
}

export function toggleElement(element: HTMLElement): void {
  element.classList.toggle('hidden');
}
```

#### 3.6 Create Main App Entry Point

**Create `frontend/src/app.ts`:**
```typescript
import { router } from './utils/router';

class App {
  private appRoot: HTMLElement | null;

  constructor() {
    this.appRoot = document.getElementById('app');
    this.setupRouter();
  }

  private setupRouter(): void {
    // Routes will be registered in each phase
    // For now, just setup the home route
    router.register('/', () => this.renderHome());
  }

  private renderHome(): void {
    if (!this.appRoot) return;
    
    this.appRoot.innerHTML = `
      <div class="container" style="padding: 40px 20px; text-align: center;">
        <h1 style="color: var(--primary-color); font-size: 48px; margin-bottom: 20px;">
          🐱 Catalyze
        </h1>
        <p style="font-size: 20px; color: var(--gray-600); margin-bottom: 40px;">
          Smart Litter Box Health Monitoring System
        </p>
        <div class="card" style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: var(--gray-800); margin-bottom: 16px;">
            ✅ Phase 0 Complete!
          </h2>
          <p style="color: var(--gray-600);">
            Project setup successful. Ready to start building the UI.
          </p>
        </div>
      </div>
    `;
  }

  init(): void {
    router.init();
  }
}

export default App;
```

**Create `frontend/src/main.ts`:**
```typescript
import App from './app';
import '../public/styles.css';

// Initialize the application
const app = new App();
app.init();

console.log('🚀 Catalyze Web App initialized!');
```

### Step 4: Backend Setup (Placeholder)

```bash
cd ../backend
npm init -y
npm install typescript @types/node --save-dev
```

**Create `backend/package.json` (update scripts):**
```json
{
  "name": "catalyze-backend",
  "version": "1.0.0",
  "description": "Catalyze Backend API",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "keywords": ["catalyze", "api"],
  "author": "Catalyze Team",
  "license": "ISC"
}
```

**Create `backend/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 5: Infrastructure Setup (Placeholder)

```bash
cd ../infrastructure
npm init -y
npm install aws-cdk-lib constructs typescript @types/node --save-dev
```

**Create `infrastructure/package.json` (update scripts):**
```json
{
  "name": "catalyze-infrastructure",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "deploy": "cdk deploy"
  }
}
```

**Create `infrastructure/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

**Create `infrastructure/cdk.json`:**
```json
{
  "app": "node bin/catalyze-app.js",
  "context": {
    "@aws-cdk/core:enableStackNameDuplicates": "true",
    "aws-cdk:enableDiffNoFail": "true"
  }
}
```

### Step 6: Create Root Configuration Files

**Create `.gitignore` (root):**
```
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# Environment
.env
.env.local

# AWS
cdk.out/
.cdk.staging/

# OS
.DS_Store
Thumbs.db
```

### Step 7: Test the Setup

```bash
cd frontend
npm start
```

The browser should open automatically to `http://localhost:8080` and display:
- **🐱 Catalyze** header
- **Smart Litter Box Health Monitoring System** subtitle
- **✅ Phase 0 Complete!** card

---

## Verification Checklist

- [ ] Frontend project initialized
- [ ] All dependencies installed successfully
- [ ] TypeScript configured
- [ ] Webpack configured and working
- [ ] Dev server runs on port 8080
- [ ] Base HTML template loads
- [ ] Styles are applied correctly
- [ ] Router utility created
- [ ] Type definitions in place
- [ ] Backend placeholder created
- [ ] Infrastructure placeholder created
- [ ] Browser displays "Phase 0 Complete" message

---

## Troubleshooting

**If webpack fails to start:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure you're in the `frontend` directory

**If styles don't load:**
- Check that `styles.css` is in `public/` folder
- Verify the import in `main.ts`

---

## Next Phase

Once you see the success message in your browser, proceed to **Phase 1: UI Components & Layout System**.
