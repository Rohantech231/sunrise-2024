// src/model/Task.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  group: number;
  persona: string;
  completed: boolean;
}
