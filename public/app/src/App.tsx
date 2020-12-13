import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from '@material-ui/core';
import TasksList from 'components/TasksList';
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';
import api from './services/api';
import { ITask } from './types';
import Progress from 'components/Progress';
import tasksReducer, { initialState, SortTypes, TasksActions } from 'reducers/tasks';
import DeleteConfirm from 'components/DeleteConfirm';
import { setSourceMapRange } from 'typescript';

interface ITaskForDelete {
  task: ITask;
  index: number;
}

export default function App() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [currentSort, setCurrentSort] = useState<SortTypes | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const taskForDelete = useRef<ITaskForDelete>();

  useEffect(() => {
    api.get('/tasks').then((response) => {
      dispatch(TasksActions.initTasks(response.data));
    });
  }, []);

  function handleMarkClick(_: ITask, index: number) {
    dispatch(TasksActions.toggleTask({ taskIndex: index }));
  }

  function handleDeleteClick(task: ITask, index: number) {
    taskForDelete.current = { task, index };
    setDeleteConfirmOpen(true);
  }

  function handleUpdateTask(task: ITask, newLabel: string) {
    const action = TasksActions.updateTask({
      taskId: task.id,
      data: {
        label: newLabel,
      },
    });
    dispatch(action);
  }

  function handleDeleteConfirm() {
    if (!taskForDelete.current) {
      return;
    }
    const taskId = taskForDelete.current.task.id;
    dispatch(TasksActions.deleteTask({ taskId: taskId }));
    setDeleteConfirmOpen(false);
    setSnackbarOpen(true);
  }

  function handleUndoDeleteClick() {
    if (!taskForDelete.current) {
      return;
    }
    dispatch(TasksActions.addTask({ newTask: taskForDelete.current.task, index: taskForDelete.current.index }));
    taskForDelete.current = undefined;
    setSnackbarOpen(false);
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
    taskForDelete.current = undefined;
  }

  function handleSortChange(event: ChangeEvent<HTMLInputElement>) {
    const sortType = event.target.value as SortTypes;
    setCurrentSort(sortType);
    dispatch(TasksActions.sortTasks({ by: sortType }));
  }

  return (
    <Box padding="20px">
      <Typography variant="h2" component="h2" align="center">
        Worldwide Todolist
      </Typography>
      <Progress progress={state.progress} />
      <FormControl>
        <FormLabel>Label 1</FormLabel>
        <RadioGroup value={currentSort} onChange={handleSortChange}>
          <FormControlLabel value={SortTypes.byCompleted} control={<Radio />} label="completado" />
          <FormControlLabel value={SortTypes.byNotCompleted} control={<Radio />} label="não completado" />
        </RadioGroup>
      </FormControl>
      <TasksList
        tasks={state.tasks}
        onDeleteClick={handleDeleteClick}
        onMarkClick={handleMarkClick}
        onUpdateTask={handleUpdateTask}
      />
      <DeleteConfirm
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onDelete={handleDeleteConfirm}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message="Tarefa excluída"
        action={
          <Button onClick={handleUndoDeleteClick} color="secondary" size="small">
            Desfazer
          </Button>
        }
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      />
    </Box>
  );
}
