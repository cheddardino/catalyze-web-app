import { Cat, Device, HealthEvent, ScreeningResult, Notification } from '../types';

// Mock Cats
export const mockCats: Cat[] = [
  {
    id: '1',
    name: 'Whiskers',
    breed: 'Persian',
    dateOfBirth: '2020-05-15',
    weight: 4.5,
    photoUrl: '🐱',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Siamese',
    dateOfBirth: '2021-03-20',
    weight: 3.8,
    photoUrl: '🐈',
    createdAt: '2024-01-01'
  }
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Living Room Litter Box',
    status: 'online',
    firmwareVersion: '2.1.0',
    litterLevel: 75,
    wasteLevel: 45,
    lastCleaned: '2024-11-09T08:30:00Z'
  }
];

// Mock Screening Results
const mockScreeningResults: ScreeningResult[] = [
  {
    color: 'brown',
    consistency: 'normal',
    size: 'medium',
    shape: 'formed',
    anomalies: [],
    confidenceScore: 0.92
  },
  {
    color: 'dark brown',
    consistency: 'slightly soft',
    size: 'medium',
    shape: 'formed',
    anomalies: ['slightly soft consistency'],
    confidenceScore: 0.88
  }
];

// Mock Health Events
export const mockHealthEvents: HealthEvent[] = [
  {
    id: 'event-1',
    catId: '1',
    timestamp: '2024-11-09T10:30:00Z',
    type: 'defecation',
    imageUrl: '📷',
    screeningResult: mockScreeningResults[0],
    notes: 'Normal event'
  },
  {
    id: 'event-2',
    catId: '1',
    timestamp: '2024-11-09T08:15:00Z',
    type: 'urination',
    notes: 'Normal'
  },
  {
    id: 'event-3',
    catId: '2',
    timestamp: '2024-11-09T07:45:00Z',
    type: 'defecation',
    imageUrl: '📷',
    screeningResult: mockScreeningResults[1]
  },
  {
    id: 'event-4',
    catId: '1',
    timestamp: '2024-11-08T22:20:00Z',
    type: 'defecation',
    screeningResult: mockScreeningResults[0]
  },
  {
    id: 'event-5',
    catId: '2',
    timestamp: '2024-11-08T20:10:00Z',
    type: 'urination'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Anomaly Detected',
    message: 'Unusual consistency detected for Whiskers. Review recommended.',
    type: 'warning',
    timestamp: '2024-11-09T09:00:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Cleaning Complete',
    message: 'Living Room Litter Box has been cleaned successfully.',
    type: 'success',
    timestamp: '2024-11-09T08:30:00Z',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Litter Level Low',
    message: 'Litter level at 75%. Consider refilling soon.',
    type: 'info',
    timestamp: '2024-11-09T07:00:00Z',
    read: true
  }
];

// Helper functions
export function getCatById(id: string): Cat | undefined {
  return mockCats.find(cat => cat.id === id);
}

export function getTodayEvents(): HealthEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return mockHealthEvents.filter(event => 
    event.timestamp.startsWith(today)
  );
}

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter(n => !n.read);
}

export function getRecentEvents(limit: number = 5): HealthEvent[] {
  return mockHealthEvents.slice(0, limit);
}
