import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Box, Button, Snackbar, Typography } from '@material-ui/core';
import api, { APIRequests } from 'services/api';
import { IAPIUpdateTask, ITask } from 'types';
import tasksReducer, { initialState, SortTypes, TasksActions } from 'reducers/tasks';
import Progress from 'components/Progress';
import TasksList from 'components/TasksList';
import DeleteConfirm from 'components/DeleteConfirm';
import SortSelection from 'components/SortSelection';
import AddButton from 'components/AddButton';
import NewTask from 'components/NewTask';
import { scrollToEndPageAfterTime } from 'common/dom';
import { Alert } from '@material-ui/lab';
import { createTask } from 'common/tasks';

// Improve code:
// Create 'syncWithSuccess'

interface ITaskForDelete {
  task: ITask;
  index: number;
}

export default function App() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [currentSort, setCurrentSort] = useState<SortTypes>(SortTypes.byNewers);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState({
    open: false,
    message: 'Ocorreu um erro!',
  });

  const taskForDelete = useRef<ITaskForDelete>();

  useEffect(() => {
    api.get('/tasks').then((response) => {
      dispatch(TasksActions.initTasks(response.data));
    });
  }, []);

  function saveTaskOnServer(taskForSave: ITask) {
    APIRequests.saveTask({ label: taskForSave.label })
      .then((response) => {
        const newTaskIndex = state.tasks.findIndex((task) => task.id === taskForSave.id);
        dispatch(TasksActions.deleteTask({ taskId: taskForSave.id }));
        dispatch(TasksActions.addTask({ newTask: response.data, index: newTaskIndex }));
      })
      .catch(() => {
        const updateData = {
          label: taskForSave.label,
          errorOnSave: true,
          saving: false,
        };
        const action = TasksActions.updateTask({ taskId: taskForSave.id, data: updateData });
        dispatch(action);
      });
  }

  function deleteTaskOnServer(taskForDelete: ITaskForDelete) {
    APIRequests.deleteTask(taskForDelete.task.id).catch(() => {
      const action = TasksActions.addTask({
        newTask: taskForDelete.task,
        index: taskForDelete.index,
      });
      dispatch(action);
      setSnackbarError({
        message: 'Erro ao deletar a tarefa!',
        open: true,
      });
    });
  }

  function updateTaskOnServer(taskId: number, data: IAPIUpdateTask) {
    APIRequests.updateTask(taskId, data)
      .then(() => {
        const action = TasksActions.updateTask({
          taskId: taskId,
          data: {
            label: data.label,
            errorOnSave: false,
            saving: false,
          },
        });
        dispatch(action);
      })
      .catch(() => {
        const action = TasksActions.updateTask({
          taskId: taskId,
          data: {
            label: data.label,
            errorOnSave: true,
            saving: false,
          },
        });
        dispatch(action);
      });
  }

  function toggleTaskOnServer(taskId: number, data: IAPIUpdateTask) {
    APIRequests.updateTask(taskId, data)
      .then(() => {
        const action = TasksActions.updateTask({
          taskId: taskId,
          data: {
            label: data.label,
            errorOnSave: false,
            saving: false,
          },
        });
        dispatch(action);
      })
      .catch(() => {
        const action = TasksActions.updateTask({
          taskId: taskId,
          data: {
            label: data.label,
            errorOnSave: true,
            saving: false,
          },
        });
        dispatch(action);
      });
  }

  function handleMarkClick(task: ITask, index: number) {
    dispatch(TasksActions.toggleTask({ taskIndex: index }));

    const shouldToggleTaskOnServer = task.id > 0;

    if (shouldToggleTaskOnServer) {
      const updateAction = TasksActions.updateTask({
        taskId: task.id,
        data: {
          label: task.label,
          errorOnSave: false,
          saving: true,
        },
      });
      dispatch(updateAction);

      toggleTaskOnServer(task.id, {
        completed: !task.completed,
        label: task.label,
      });
    }
  }

  function handleDeleteClick(task: ITask, index: number) {
    taskForDelete.current = { task, index };
    setDeleteConfirmOpen(true);
  }

  function handleUpdateTask(task: ITask, newLabel: string) {
    const shouldUpdateOnServer = task.id > 0;

    const action = TasksActions.updateTask({
      taskId: task.id,
      data: {
        label: newLabel,
        errorOnSave: false,
        saving: shouldUpdateOnServer ? true : false,
      },
    });
    dispatch(action);

    if (shouldUpdateOnServer) {
      const data: IAPIUpdateTask = {
        label: newLabel,
        completed: task.completed,
      };
      updateTaskOnServer(task.id, data);
    }
  }

  function handleDeleteConfirm() {
    if (!taskForDelete.current) {
      return;
    }

    const taskId = taskForDelete.current.task.id;
    dispatch(TasksActions.deleteTask({ taskId: taskId }));
    setDeleteConfirmOpen(false);
    setSnackbarOpen(true);

    if (shouldDeleteTaskOnServer()) {
      const taskForDeleteHolder = taskForDelete.current;
      deleteTaskOnServer(taskForDeleteHolder);
    }

    function shouldDeleteTaskOnServer() {
      return taskId > 0;
    }
  }

  function handleUndoDeleteClick() {
    if (!taskForDelete.current) {
      return;
    }

    const action = TasksActions.addTask({
      newTask: taskForDelete.current.task,
      index: taskForDelete.current.index,
    });
    dispatch(action);

    taskForDelete.current = undefined;
    setSnackbarOpen(false);
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

  function handleCloseSnackbarError() {
    setSnackbarError({
      ...snackbarError,
      open: false,
    });
  }

  function handleSortChange(sortType: SortTypes) {
    setCurrentSort(sortType);
    dispatch(TasksActions.sortTasks({ by: sortType }));
  }

  function handleFABAddClick() {
    setNewTaskOpen(true);
  }

  function handleAddTask(taskLabel: string) {
    setNewTaskOpen(false);
    const newTask = createTask(taskLabel);
    dispatch(TasksActions.addTask({ newTask }));
    scrollToEndPageAfterTime();
    saveTaskOnServer(newTask);
  }

  function handleSyncOnServer(task: ITask, _: number) {
    const needSaveOnServer = task.id < 0;
    if (needSaveOnServer) {
      const updateData = {
        label: task.label,
        saving: true,
        errorOnSave: false,
      };
      dispatch(TasksActions.updateTask({ taskId: task.id, data: updateData }));
      saveTaskOnServer(task);
    } else {
      const updateData = {
        label: task.label,
        saving: true,
        errorOnSave: false,
      };
      dispatch(TasksActions.updateTask({ taskId: task.id, data: updateData }));

      const updateDataOnServer: IAPIUpdateTask = {
        label: task.label,
        completed: task.completed,
      };
      updateTaskOnServer(task.id, updateDataOnServer);
    }
  }

  return (
    <Box padding="20px" position="relative" id="test">
      <Typography variant="h2" component="h2" align="center">
        Worldwide Todolist
      </Typography>
      <Progress progress={state.progress} />
      <SortSelection value={currentSort} onChange={handleSortChange} />
      <TasksList
        tasks={state.tasks}
        onDeleteClick={handleDeleteClick}
        onMarkClick={handleMarkClick}
        onUpdateTask={handleUpdateTask}
        onSyncServer={handleSyncOnServer}
      />
      <DeleteConfirm
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onDelete={handleDeleteConfirm}
      />
      <NewTask open={newTaskOpen} onClose={() => setNewTaskOpen(false)} onAdd={handleAddTask} />
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
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
      <Snackbar
        open={snackbarError.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbarError}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert onClose={handleCloseSnackbarError} severity="error" variant="filled">
          {snackbarError.message}
        </Alert>
      </Snackbar>
      <AddButton onClick={handleFABAddClick} />
    </Box>
  );
}
