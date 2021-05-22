import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

function Loading(isLoading) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
