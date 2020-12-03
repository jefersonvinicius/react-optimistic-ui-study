import { Box, IconButton, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import { ITask } from 'types';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  task: ITask;
  indexInList: number;
  onDeleteClick: (task: ITask, index: number) => void;
  onMarkClick: (task: ITask, index: number) => void;
}

export default function Task({ task, indexInList, onDeleteClick, onMarkClick }: Props) {
  return (
    <ListItem style={{ opacity: task.completed ? 0.5 : 1 }}>
      <Box flex="1">
        <Typography style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.label}</Typography>
      </Box>
      <IconButton onClick={() => onDeleteClick(task, indexInList)}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => onMarkClick(task, indexInList)}>
        <CheckIcon />
      </IconButton>
    </ListItem>
  );
}
