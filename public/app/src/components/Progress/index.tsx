import React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';

interface Props {
  progress: number;
}

export default function Progress({ progress }: Props) {
  return (
    <>
      <LinearProgress variant="determinate" value={progress} />
      <Box alignItems="center" flex="1" marginTop="5px">
        <Typography>{progress}% Concluído</Typography>
      </Box>
    </>
  );
}
