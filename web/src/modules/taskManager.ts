import { Task } from '@/model/Task';

let tasks: Task[] = [];
let taskIdCounter = 1;

export function initializeTasks(): void {
  if (tasks.length === 0) {
    tasks.push({
      id: taskIdCounter++,
      title: 'Initial Setup',
      description: 'Set up your development environment.',
      group: 1,
      persona: 'Intern',
      completed: false,
    });
  }
}

export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed);
}

export function completeTask(title: string): void {
  const task = tasks.find(task => task.title === title);
  if (task && !task.completed) {
    task.completed = true;
    unlockNextTask(task.group);
  }
}

function unlockNextTask(completedGroup: number): void {
  if (completedGroup < 10) {
    const nextGroupTasks = predefinedTasks.filter(task => task.group === completedGroup + 1);
    nextGroupTasks.forEach(task => {
      if (!tasks.some(existingTask => existingTask.title === task.title)) {
        tasks.push(task);
      }
    });
  }
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  tasks.push({
    id: taskIdCounter++,
    title,
    description,
    group,
    persona,
    completed: false,
  });
}

export function updateTask(id: number, updatedTask: Partial<Task>): void {
  const task = tasks.find(task => task.id === id);
  if (task) {
    Object.assign(task, updatedTask);
  }
}

export function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id);
}

const predefinedTasks: Task[] = [
  { id: taskIdCounter++, title: 'Basic Introduction', description: 'Learn the basics of programming.', group: 1, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'Basic Git', description: 'Learn basic Git commands.', group: 2, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'Git Collaboration', description: 'Collaborate on a Git repository.', group: 2, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'JavaScript Basics', description: 'Learn the basics of JavaScript.', group: 3, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'JavaScript Project', description: 'Create a JavaScript project.', group: 3, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'API Introduction', description: 'Introduction to APIs.', group: 4, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'API Consumption', description: 'Consume APIs in a project.', group: 4, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'Final Project', description: 'Work on the final project.', group: 5, persona: 'Intern', completed: false },
  { id: taskIdCounter++, title: 'Project Presentation', description: 'Prepare and present your project.', group: 5, persona: 'Intern', completed: false },
];
