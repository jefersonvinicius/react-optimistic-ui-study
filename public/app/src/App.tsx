import { Box } from '@material-ui/core';
import TasksList from 'components/TasksList';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import api from './services/api';
import { ITask } from './types';
import Progress from 'components/Progress';
import reducer, { initialState, TasksActions } from 'reducers/tasks';
import DeleteConfirm from 'components/DeleteConfirm';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmModalTexts, setDeleteConfirmModalTexts] = useState({
    title: '',
    content: '',
  });

  const taskForDelete = useRef<ITask>();
  const tasksDeleted = useRef<ITask[]>([]);

  useEffect(() => {
    api.get('/tasks').then((response) => {
      console.log(response);
      dispatch(TasksActions.initTasks(response.data));
    });
  }, []);

  function handleMarkClick(_: ITask, index: number) {
    dispatch(TasksActions.toggleTask({ taskIndex: index }));
  }

  function handleDeleteClick(task: ITask, _: number) {
    taskForDelete.current = task;
    setDeleteConfirmOpen(true);
  }

  function handleDeleteConfirm() {
    if (!taskForDelete.current) {
      return;
    }
    tasksDeleted.current.push(taskForDelete.current);
    const taskId = taskForDelete.current.id;
    dispatch(TasksActions.deleteTask({ taskId: taskId }));
    setDeleteConfirmOpen(false);
  }

  return (
    <Box padding="20px">
      <Progress progress={state.progress} />
      <TasksList tasks={state.tasks} onDeleteClick={handleDeleteClick} onMarkClick={handleMarkClick} />
      <DeleteConfirm
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onDelete={handleDeleteConfirm}
      />
    </Box>
  );
}
