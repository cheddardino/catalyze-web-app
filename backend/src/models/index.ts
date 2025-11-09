export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}