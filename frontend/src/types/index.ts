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
