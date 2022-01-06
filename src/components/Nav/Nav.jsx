import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//components
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

//mui styles
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

function Nav() {
  //stores
  const user = useSelector((store) => store.user);

  //hooks
  const dispatch = useDispatch();

  return (
    <>
      {/* If no user is logged in, show these links */}
      {user.id === null || user.clearance_level === 0 &&
        // If there's no user, show login/registration links
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                South Carolina Language Map
              </Typography>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "login" })
                }}>Login</Button>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "register" })
                }}>Register</Button>

            </Toolbar>
          </AppBar>
        </Box>
      }



      {/* if user is approved and has admin clearance, see this navbar */}
      {user.clearance_level >= 1 && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                South Carolina Language Map
              </Typography>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "site" })
                }}>Sites</Button>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "language" })
                }}>Language</Button>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "category" })
                }}>Category</Button>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "approval" })
                }}>Approvals</Button>

              <Button
                color="inherit"
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "about" })
                }}>About</Button>

              <Button
                color="inherit"
                onClick={() => dispatch({ type: 'LOGOUT' })
                }>Logout</Button>

            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>


    
  );
}

export default Nav;
