import { LinearProgress } from '@material-ui/core';
import TasksList from './components/TasksList';
import React, { useEffect, useReducer } from 'react';
import api from './services/api';
import { ITask } from './types';

interface IReducerState {
  progress: number;
  tasks: ITask[];
}

enum ActionsTypes {
  INIT_STATE = 'INIT_STATE',
}

interface IPayloadInitState {
  progress: number;
  tasks: ITask[];
}

interface IReducerAction {
  type: ActionsTypes;
  payload: IPayloadInitState;
}

const initialState = { tasks: [], progress: 0 };

function reducer(state: IReducerState, action: IReducerAction): IReducerState {
  switch (action.type) {
    case ActionsTypes.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    api.get('/tasks').then((response) => {
      console.log(response);
      dispatch({ type: ActionsTypes.INIT_STATE, payload: response.data });
    });
  }, []);

  function handleMarkClick(task: ITask) {
    console.log('MARK TASK: ', task.label);
  }

  function handleDeleteClick(task: ITask) {
    console.log('DELETE TASK: ', task.label);
  }

  return (
    <div>
      <LinearProgress variant="determinate" value={state.progress} />
      <TasksList tasks={state.tasks} onDeleteClick={handleDeleteClick} onMarkClick={handleMarkClick} />
    </div>
  );
}
