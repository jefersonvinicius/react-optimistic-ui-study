import React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';

interface Props {
  progress: number;
}

export default function Progress({ progress }: Props) {
  return (
    <>
      <LinearProgress variant="determinate" value={progress} />
      <Box marginTop="5px">
        <Typography align="center">{Math.floor(progress)}% Concluído</Typography>
      </Box>
    </>
  );
}
