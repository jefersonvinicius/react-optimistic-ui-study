import React from 'react';
import { Container } from './styles';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  return (
    <Container color="primary" onClick={onClick}>
      <AddIcon />
    </Container>
  );
}
