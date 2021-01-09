import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  content?: string;
}

const DEFAULT_CONTENT = 'Tem certeza que deseja realizar essa exclusão?';

export default function DeleteConfirm({ open, onClose, onDelete, title, content }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{content || DEFAULT_CONTENT}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} color="primary">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
