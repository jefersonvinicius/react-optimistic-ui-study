import { Divider, List } from '@material-ui/core';
import React from 'react';
import { ITask } from 'types';
import Task from './Task';

interface Props {
  tasks: ITask[];
  onMarkClick: (task: ITask, index: number) => void;
  onDeleteClick: (task: ITask, index: number) => void;
}

export default function TasksList({ tasks, onMarkClick, onDeleteClick }: Props) {
  return (
    <List>
      {tasks.map((task, index) => {
        return (
          <>
            <Task
              key={task.id}
              task={task}
              indexInList={index}
              onMarkClick={onMarkClick}
              onDeleteClick={onDeleteClick}
            />
            <Divider />
          </>
        );
      })}
    </List>
  );
}
