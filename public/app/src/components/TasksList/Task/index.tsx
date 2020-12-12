import { Box, IconButton, ListItem, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, useState, FocusEvent, KeyboardEvent } from 'react';
import { ITask } from 'types';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  task: ITask;
  indexInList: number;
  onDeleteClick: (task: ITask, index: number) => void;
  onMarkClick: (task: ITask, index: number) => void;
  onUpdate: (task: ITask, newLabel: string) => void;
}

export default function Task({ task, indexInList, onDeleteClick, onMarkClick, onUpdate }: Props) {
  const [label, setLabel] = useState(task.label);
  const [inputEnabled, setInputEnabled] = useState(false);

  function handleDoubleClickInLabel() {
    setInputEnabled(true);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function dispatchOnUpdateIfNecessary() {
    if (label.trim() !== task.label && label.trim() !== '') {
      onUpdate(task, label.trim());
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    dispatchOnUpdateIfNecessary();
    setInputEnabled(false);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      dispatchOnUpdateIfNecessary();
      setInputEnabled(false);
    }
  }

  return (
    <ListItem style={{ opacity: task.completed ? 0.5 : 1 }}>
      <IconButton onClick={() => onDeleteClick(task, indexInList)}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => onMarkClick(task, indexInList)}>
        <CheckIcon />
      </IconButton>

      <Box flex="1" onDoubleClick={handleDoubleClickInLabel}>
        {inputEnabled ? (
          <TextField
            value={label}
            variant="outlined"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            size="small"
          />
        ) : (
          <Typography style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.label}</Typography>
        )}
      </Box>
    </ListItem>
  );
}
