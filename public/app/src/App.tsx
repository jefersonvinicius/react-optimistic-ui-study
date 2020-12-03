import { Box } from '@material-ui/core';
import TasksList from 'components/TasksList';
import React, { useEffect, useReducer } from 'react';
import api from './services/api';
import { ITask } from './types';
import Progress from 'components/Progress';
import reducer, { initialState, TasksActions } from 'reducers/tasks';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    dispatch(TasksActions.deleteTask({ taskId: task.id }));
  }

  return (
    <Box padding="20px">
      <Progress progress={state.progress} />
      <TasksList tasks={state.tasks} onDeleteClick={handleDeleteClick} onMarkClick={handleMarkClick} />
    </Box>
  );
}
