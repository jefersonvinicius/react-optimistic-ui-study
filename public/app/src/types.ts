export interface ITask {
  id: number;
  label: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  saving?: boolean;
  errorOnSave?: boolean;
}
