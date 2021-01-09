import React, { ChangeEvent, useState, FocusEvent, KeyboardEvent, useEffect } from 'react';
import { Box, CircularProgress, Fade, IconButton, ListItem, ListItemText, TextField, Tooltip } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { ITask } from 'types';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  task: ITask;
  indexInList: number;
  onDeleteClick: (task: ITask, index: number) => void;
  onMarkClick: (task: ITask, index: number) => void;
  onUpdate: (task: ITask, newLabel: string) => void;
  onSyncServer: (task: ITask, index: number) => void;
}

export default function Task({ task, indexInList, onDeleteClick, onMarkClick, onUpdate, onSyncServer }: Props) {
  const [label, setLabel] = useState(task.label);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [errorTooltip, setErrorTooltip] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

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

  function openErrorTooltip() {
    setErrorTooltip(true);
  }

  function closeErrorTooltip() {
    setErrorTooltip(false);
  }

  return (
    <Fade in={animate} timeout={1000}>
      <div>
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
              <ListItemText style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.label}
              </ListItemText>
            )}
          </Box>
          {task.saving && <CircularProgress size={20} />}
          {task.errorOnSave && (
            <Tooltip title="Erro ao sincronizar no servidor! Clique para tentar novamente." open={errorTooltip}>
              <IconButton
                onMouseEnter={openErrorTooltip}
                onMouseLeave={closeErrorTooltip}
                onClick={() => {
                  onSyncServer(task, indexInList);
                }}
              >
                <WarningRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>
      </div>
    </Fade>
  );
}
