import { Cat, Device, HealthEvent, ScreeningResult, Notification } from '../types';

// Mock User
export const mockUser = {
  email: 'user@example.com',
  name: 'John Doe'
};

// Mock Cleaning Cycles
export const mockCleaningCycles = {
  total: 145,
  today: 3,
  history: [
    { date: '2024-11-09', count: 3 },
    { date: '2024-11-08', count: 4 },
    { date: '2024-11-07', count: 3 },
    { date: '2024-11-06', count: 5 },
    { date: '2024-11-05', count: 2 },
    { date: '2024-11-04', count: 4 },
    { date: '2024-11-03', count: 3 }
  ]
};

// Mock Usage Data (in minutes)
export const mockUsageData = [
  { date: '2024-11-09', duration: 45 },
  { date: '2024-11-08', duration: 60 },
  { date: '2024-11-07', duration: 30 },
  { date: '2024-11-06', duration: 55 },
  { date: '2024-11-05', duration: 40 },
  { date: '2024-11-04', duration: 50 },
  { date: '2024-11-03', duration: 35 }
];

// Mock Anomalies
export const mockAnomalies = [
  {
    id: 'anomaly-1',
    timestamp: '2024-11-09T09:00:00Z',
    description: 'Unusual consistency detected'
  },
  {
    id: 'anomaly-2',
    timestamp: '2024-11-07T14:30:00Z',
    description: 'Extended duration in litter box'
  },
  {
    id: 'anomaly-3',
    timestamp: '2024-11-05T08:15:00Z',
    description: 'Frequent visits detected'
  }
];

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

export function getAnomalies(limit: number = 5) {
  return mockAnomalies.slice(0, limit);
}
