import { calculateProgress } from 'common/progress';
import { isAfter, isBefore } from 'date-fns';
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
  UPDATE_TASK = 'UPDATE_TASK',
  SORT_TASKS = 'SORT_TASKS',
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

interface IUpdateData {
  label: string;
}

interface IPayloadUpdateTask {
  taskId: number;
  data: IUpdateData;
}

export enum SortTypes {
  byCompleted = 'completed',
  byNotCompleted = 'not-completed',
  byNewers = 'newers',
  byOldest = 'oldest',
}

interface IPayloadSortTasks {
  by: SortTypes;
}

interface IReducerTasksAction {
  type: TasksActionsTypes;
  payload: any;
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
  updateTask: (data: IPayloadUpdateTask): IReducerTasksAction => {
    return { type: TasksActionsTypes.UPDATE_TASK, payload: data };
  },
  sortTasks: (data: IPayloadSortTasks): IReducerTasksAction => {
    return { type: TasksActionsTypes.SORT_TASKS, payload: data };
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

    case TasksActionsTypes.UPDATE_TASK:
      const taskIdForUpdate = (action.payload as IPayloadUpdateTask).taskId;
      const data = (action.payload as IPayloadUpdateTask).data;

      const taskIndex = state.tasks.findIndex((task) => task.id === taskIdForUpdate);
      if (taskIndex === -1) {
        return state;
      }

      const taskPreviousData = state.tasks[taskIndex];

      return {
        progress: state.progress,
        tasks: [
          ...state.tasks.slice(0, taskIndex),
          { ...taskPreviousData, label: data.label },
          ...state.tasks.slice(taskIndex + 1),
        ],
      };

    case TasksActionsTypes.SORT_TASKS:
      const sortType = (action.payload as IPayloadSortTasks).by;
      if (sortType === SortTypes.byCompleted) {
        return {
          progress: state.progress,
          tasks: sortTasksByCompleted(state.tasks),
        };
      }
      if (sortType === SortTypes.byNotCompleted) {
        return {
          progress: state.progress,
          tasks: sortTasksByNotCompleted(state.tasks),
        };
      }
      if (sortType === SortTypes.byNewers) {
        return {
          progress: state.progress,
          tasks: sortTasksByNewers(state.tasks),
        };
      }
      if (sortType === SortTypes.byOldest) {
        return {
          progress: state.progress,
          tasks: sortTasksByOldest(state.tasks),
        };
      }

      return state;
    default:
      return state;
  }

  function shouldInsertInSpecificIndex(index: number | undefined) {
    return index !== undefined && index >= 0 && index <= state.tasks.length;
  }

  function sortTasksByCompleted(tasks: ITask[]) {
    const tasksSorted = tasks.sort((taskA, taskB) => {
      if (taskB.completed) {
        return 1;
      }
      if (taskA.completed) {
        return -1;
      }
      return 0;
    });
    return tasksSorted;
  }

  function sortTasksByNotCompleted(tasks: ITask[]) {
    const tasksSorted = tasks.sort((taskA, taskB) => {
      if (!taskB.completed) {
        return 1;
      }
      if (!taskA.completed) {
        return -1;
      }
      return 0;
    });
    return tasksSorted;
  }

  function sortTasksByNewers(tasks: ITask[]) {
    const tasksSorted = tasks.sort((taskA, taskB) => {
      const dateA = new Date(taskA.createdAt);
      const dateB = new Date(taskB.createdAt);
      if (isAfter(dateA, dateB)) {
        return -1;
      }
      if (isAfter(dateB, dateA)) {
        return 1;
      }
      return 0;
    });
    return tasksSorted;
  }

  function sortTasksByOldest(tasks: ITask[]) {
    const tasksSorted = tasks.sort((taskA, taskB) => {
      const dateA = new Date(taskA.createdAt);
      const dateB = new Date(taskB.createdAt);
      if (isBefore(dateA, dateB)) {
        return -1;
      }
      if (isBefore(dateB, dateA)) {
        return 1;
      }
      return 0;
    });
    return tasksSorted;
  }
}
