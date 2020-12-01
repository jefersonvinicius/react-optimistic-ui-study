import { List } from '@material-ui/core';
import React from 'react';
import { ITask } from 'types';
import Task from './Task';

interface Props {
  tasks: ITask[];
  onMarkClick: (task: ITask) => void;
  onDeleteClick: (task: ITask) => void;
}

export default function TasksList({ tasks }: Props) {
  return (
    <List>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </List>
  );
}
