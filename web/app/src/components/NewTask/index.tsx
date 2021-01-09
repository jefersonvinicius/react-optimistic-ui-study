import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, { FormEvent, useRef } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (taskLabel: string) => void;
}

export default function NewTask({ open, onClose, onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = inputRef.current?.value || '';
    if (label.trim() !== '') {
      onAdd(label);
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Criar nova tarefa</DialogTitle>
        <DialogContent>
          <TextField inputRef={inputRef} autoFocus />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
