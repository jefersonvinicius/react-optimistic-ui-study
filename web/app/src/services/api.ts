import axios, { AxiosResponse } from 'axios';
import { ITask, IAPISaveTask, IAPIUpdateTask } from 'types';

const BASE_URL = process.env.API || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

export const APIRequests = {
  saveTask: (data: IAPISaveTask) => {
    return api.post<any, AxiosResponse<ITask>>('/tasks', {
      task: data.label,
    });
  },
  deleteTask: (taskId: number) => {
    return api.delete(`/tasks/${taskId}`);
  },
  updateTask: (taskId: number, data: IAPIUpdateTask) => {
    return api.put<any, AxiosResponse<ITask>>(`/tasks/${taskId}`, {
      task: data.label,
      completed: data.completed,
    });
  },
};

export default api;
