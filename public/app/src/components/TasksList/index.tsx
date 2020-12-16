import { Divider, List } from '@material-ui/core';
import React, { ForwardRefRenderFunction, Fragment, useImperativeHandle, useRef } from 'react';
import { ITask } from 'types';
import Task from './Task';

interface Props {
  tasks: ITask[];
  onMarkClick: (task: ITask, index: number) => void;
  onDeleteClick: (task: ITask, index: number) => void;
  onUpdateTask: (task: ITask, newLabel: string) => void;
}

interface Handle {
  scrollToEnd: () => void;
}

const TasksList: ForwardRefRenderFunction<Handle, Props> = (
  { tasks, onDeleteClick, onMarkClick, onUpdateTask },
  ref
) => {
  const listRef = useRef<HTMLUListElement>(null);

  useImperativeHandle(ref, () => {
    return {
      scrollToEnd: () => {
        listRef.current?.scrollTo(0, document.body.scrollHeight);
      },
    };
  });

  return (
    <List innerRef={listRef}>
      {tasks.map((task, index) => {
        return (
          <Fragment key={task.id}>
            <Task
              task={task}
              indexInList={index}
              onMarkClick={onMarkClick}
              onDeleteClick={onDeleteClick}
              onUpdate={onUpdateTask}
            />
            <Divider />
          </Fragment>
        );
      })}
    </List>
  );
};

export default React.forwardRef(TasksList);
