import React, { ChangeEvent } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio } from '@material-ui/core';
import { ControlsContainer } from './styles';
import { SortTypes } from 'reducers/tasks';

interface Props {
  value: SortTypes | null;
  onChange: (sortType: SortTypes) => void;
}

export default function SortSelection({ value, onChange }: Props) {
  function dispatchOnChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value as SortTypes);
  }

  return (
    <FormControl>
      <FormLabel>Ordenação</FormLabel>
      <ControlsContainer value={value} onChange={dispatchOnChange}>
        <FormControlLabel value={SortTypes.byNewers} control={<Radio />} label="mais novas" />
        <FormControlLabel value={SortTypes.byOldest} control={<Radio />} label="mais antigas" />
        <FormControlLabel value={SortTypes.byCompleted} control={<Radio />} label="completado" />
        <FormControlLabel value={SortTypes.byNotCompleted} control={<Radio />} label="não completado" />
      </ControlsContainer>
    </FormControl>
  );
}
