import { ITask } from 'types';

export function createTask(): ITask {
  return {
    id: Math.random(),
    completed: Math.floor(Math.random() * 1) === 0,
    label: Math.random().toString(36).substring(7),
    createdAt: '',
    updatedAt: '',
  };
}

export function createTasks(amount = 1): ITask[] {
  return Array(amount).map(() => {
    return createTask();
  });
}
