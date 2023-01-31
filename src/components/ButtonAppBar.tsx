import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  LinearProgress,
} from '@material-ui/core';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Typography } from '@mui/material';
import { RequestStatusType } from '../state/app-reducer.type';

type ButtonAppBarPropsType = {
  logoutHandler: () => void;
  status: RequestStatusType;
  isLoggedIn: boolean;
};
const ButtonAppBar = (props: ButtonAppBarPropsType) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <ListAltIcon />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            To-do lists
          </Typography>
          {props.isLoggedIn && (
            <Button color='inherit' onClick={props.logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {props.status === 'loading' && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
export default ButtonAppBar;
