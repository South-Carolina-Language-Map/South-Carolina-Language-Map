// React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//components
import "./Nav.css";

//mui styles
import {
  Box,
  Menu,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  //hooks
  const dispatch = useDispatch();
  //stores
  const user = useSelector((store) => store.user);

  // Variables
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* If no user is logged in, show these links */}
      {user.id === null ||
        (user.clearance_level === 0 && (
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
                    dispatch({ type: "SET_ADMIN_VIEW", payload: "login" });
                  }}
                >
                  Login
                </Button>

                <Button
                  color="inherit"
                  onClick={() => {
                    dispatch({ type: "SET_ADMIN_VIEW", payload: "register" });
                  }}
                >
                  Register
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        ))}

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
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "approval" });
                }}
              >
                Approvals
              </Button>

              <IconButton
                id="basic-button"
                aria-haspopup="true"
                onClick={handleClick}
                aria-expanded={open ? "true" : undefined}
                aria-controls={open ? "basic-menu" : undefined}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                open={open}
                id="basic-menu"
                anchorEl={anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose;
                    dispatch({ type: "SET_ADMIN_VIEW", payload: "site" });
                  }}
                >
                  Sites
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose;
                    dispatch({ type: "SET_ADMIN_VIEW", payload: "language" });
                  }}
                >
                  Languages
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose;
                    dispatch({ type: "SET_ADMIN_VIEW", payload: "category" });
                  }}
                >
                  Categories
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose;
                    dispatch({ type: "SET_ADMIN_VIEW", payload: "about" });
                  }}
                >
                  About
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose;
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  <Typography color="error">Logout</Typography>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}

export default Nav;
