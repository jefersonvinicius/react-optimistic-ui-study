import { ITask } from 'types';

export function createTask(label: string): ITask {
  return {
    id: -Date.now(),
    label: label,
    completed: false,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    saving: true,
    errorOnSave: false,
  };
}
