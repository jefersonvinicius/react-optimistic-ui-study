import { IconButton, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import { ITask } from 'types';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  task: ITask;
}

export default function Task({ task }: Props) {
  return (
    <ListItem>
      <IconButton>
        <CheckIcon />
      </IconButton>
      <Typography>{task.label}</Typography>
    </ListItem>
  );
}