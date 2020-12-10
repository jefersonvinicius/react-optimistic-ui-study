import { calculateProgress } from 'common/progress';
import { ITask } from 'types';

export interface IReducerTasksState {
  progress: number;
  tasks: ITask[];
}

enum TasksActionsTypes {
  INIT_STATE = 'INIT_STATE',
  TOGGLE_TASK = 'TOGGLE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  ADD_TASK = 'ADD_TASK',
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

interface IPayloadAddTask {
  newTask: ITask;
  index?: number;
}

interface IReducerTasksAction {
  type: TasksActionsTypes;
  payload: IPayloadInitTasks | IPayloadToggleTask | IPayloadDeleteTask | IPayloadAddTask;
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
  addTask: (data: IPayloadAddTask): IReducerTasksAction => {
    return { type: TasksActionsTypes.ADD_TASK, payload: data };
  },
};

export default function tasksReducer(state: IReducerTasksState, action: IReducerTasksAction): IReducerTasksState {
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

    case TasksActionsTypes.ADD_TASK:
      const insertThisIndex = (action.payload as IPayloadAddTask).index;
      const newTask = (action.payload as IPayloadAddTask).newTask;

      let newTasks;
      if (shouldInsertInSpecificIndex(insertThisIndex)) {
        newTasks = [...state.tasks.slice(0, insertThisIndex), newTask, ...state.tasks.slice(insertThisIndex)];
      } else {
        newTasks = [...state.tasks, newTask];
      }

      return {
        progress: calculateProgress(newTasks),
        tasks: newTasks,
      };
    default:
      return state;
  }

  function shouldInsertInSpecificIndex(index: number | undefined) {
    return index !== undefined && index >= 0 && index <= state.tasks.length;
  }
}
