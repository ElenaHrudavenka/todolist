import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  LinearProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RequestStatusType } from "../state/app-reducer.type";
import { AppRootStateType } from "../app/store";

export default function ButtonAppBar() {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit"> Login </Button>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>
  );
}
