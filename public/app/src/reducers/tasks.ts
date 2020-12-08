import { calculateProgress } from 'common/progress';
import { ITask } from 'types';

interface IReducerTasks {
  progress: number;
  tasks: ITask[];
}

enum TasksActionsTypes {
  INIT_STATE = 'INIT_STATE',
  TOGGLE_TASK = 'TOGGLE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

interface IPayloadInitTasks {
  progress: number;
  tasks: ITask[];
}

interface IPayloadToggleTask {
  taskIndex: number;
}

interface IPayloadDeleteTask {
  taskId: number;
}

interface IReducerTasksAction {
  type: TasksActionsTypes;
  payload: IPayloadInitTasks | IPayloadToggleTask | IPayloadDeleteTask;
}

export const initialState = { tasks: [], progress: 0 };

export const TasksActions = {
  initTasks: (data: IPayloadInitTasks): IReducerTasksAction => {
    return { type: TasksActionsTypes.INIT_STATE, payload: data };
  },
  toggleTask: (data: IPayloadToggleTask): IReducerTasksAction => {
    return { type: TasksActionsTypes.TOGGLE_TASK, payload: data };
  },
  deleteTask: (data: IPayloadDeleteTask): IReducerTasksAction => {
    return { type: TasksActionsTypes.DELETE_TASK, payload: data };
  },
};

export default function reducer(state: IReducerTasks, action: IReducerTasksAction): IReducerTasks {
  switch (action.type) {
    case TasksActionsTypes.INIT_STATE:
      return action.payload as IPayloadInitTasks;

    case TasksActionsTypes.TOGGLE_TASK:
      const index = (action.payload as IPayloadToggleTask).taskIndex;
      const taskForToggle = state.tasks[index];
      const tasksToggled = [
        ...state.tasks.slice(0, index),
        { ...taskForToggle, completed: !taskForToggle.completed },
        ...state.tasks.slice(index + 1),
      ];
      return {
        progress: calculateProgress(tasksToggled),
        tasks: tasksToggled,
      };

    case TasksActionsTypes.DELETE_TASK:
      const taskId = (action.payload as IPayloadDeleteTask).taskId;
      const tasksDeleted = state.tasks.filter((task) => task.id !== taskId);
      return {
        progress: calculateProgress(tasksDeleted),
        tasks: tasksDeleted,
      };

    default:
      return state;
  }
}
