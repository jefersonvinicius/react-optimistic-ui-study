import axios, { AxiosResponse } from 'axios';
import { ITask } from 'types';

const BASE_URL = process.env.API || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

export const APIRequests = {
  saveTask: (data: ISaveData) => {
    return api.post<any, AxiosResponse<ITask>>('/tasks', {
      task: data.task,
    });
  },
  deleteTask: (taskId: number) => {
    return api.delete(`/tasks/${taskId}`);
  },
};

interface ISaveData {
  task: string;
}

export default api;
