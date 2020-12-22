export interface ITask {
  id: number;
  label: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  saving?: boolean;
  errorOnSave?: boolean;
}

export interface IAPISaveTask {
  label: string;
}

export interface IAPIUpdateTask {
  label: string;
  completed: boolean;
}
