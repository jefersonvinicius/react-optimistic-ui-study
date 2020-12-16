import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Box, Button, Snackbar, Typography } from '@material-ui/core';
import api from 'services/api';
import { ITask } from 'types';
import tasksReducer, { initialState, SortTypes, TasksActions } from 'reducers/tasks';
import Progress from 'components/Progress';
import TasksList from 'components/TasksList';
import DeleteConfirm from 'components/DeleteConfirm';
import SortSelection from 'components/SortSelection';
import AddButton from 'components/AddButton';
import NewTask from 'components/NewTask';

interface ITaskForDelete {
  task: ITask;
  index: number;
}

type ListHandle = React.ElementRef<typeof TasksList>;

export default function App() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [currentSort, setCurrentSort] = useState<SortTypes>(SortTypes.byNewers);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListHandle>(null);
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

  function handleSortChange(sortType: SortTypes) {
    setCurrentSort(sortType);
    dispatch(TasksActions.sortTasks({ by: sortType }));
  }

  function handleFABAddClick() {
    setNewTaskOpen(true);
  }

  function handleAddTask(taskLabel: string) {
    setNewTaskOpen(false);
    const newTask: ITask = {
      id: Date.now(),
      label: taskLabel,
      completed: false,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    dispatch(TasksActions.addTask({ newTask }));
    // TODO :: FAZER SCROLL PARA FINAL DA LISTA DE TAREFAS
  }

  return (
    <Box {...({ ref: containerRef } as any)} padding="20px" position="relative">
      <Typography variant="h2" component="h2" align="center">
        Worldwide Todolist
      </Typography>
      <Progress progress={state.progress} />
      <SortSelection value={currentSort} onChange={handleSortChange} />
      <TasksList
        ref={listRef}
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
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      />
      <AddButton onClick={handleFABAddClick} />
    </Box>
  );
}
