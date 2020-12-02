import { ITask } from 'types';

export function calculateProgress(tasks: ITask[]) {
  if (tasks.length === 0) {
    return 0;
  }
  const numberOfTasksCompleted = tasks.filter((task) => task.completed).length;
  return (numberOfTasksCompleted / tasks.length) * 100;
}
