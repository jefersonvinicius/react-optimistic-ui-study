import { Divider, List } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ITask } from 'types';
import Task from './Task';

interface Props {
  tasks: ITask[];
  onMarkClick: (task: ITask, index: number) => void;
  onDeleteClick: (task: ITask, index: number) => void;
  onUpdateTask: (task: ITask, newLabel: string) => void;
  onSyncServer: (task: ITask, index: number) => void;
}

export default function TasksList({ tasks, onDeleteClick, onMarkClick, onUpdateTask, onSyncServer }: Props) {
  return (
    <List>
      {tasks.map((task, index) => {
        return (
          <Fragment key={task.id}>
            <Task
              task={task}
              indexInList={index}
              onMarkClick={onMarkClick}
              onDeleteClick={onDeleteClick}
              onUpdate={onUpdateTask}
              onSyncServer={onSyncServer}
            />
            <Divider />
          </Fragment>
        );
      })}
    </List>
  );
}
