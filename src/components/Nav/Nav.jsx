// React Imports
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//components
import "./Nav.css";

//mui styles
import {
  Box,
  Menu,
  Badge,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";

function Nav() {
  //hooks
  const history = useHistory();
  const dispatch = useDispatch();

  //stores
  const user = useSelector((store) => store.user);
  const approvals = useSelector(store => store.adminReducer.adminApprovalsReducer);
  const adminView = useSelector(store => store.adminViewReducer);

  // Variables
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeChange = () => {
    console.log("click");
    let path = `/home`;
    history.push(path);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -4,
      top: -1,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: 'red',
    },
  }));

  useEffect(() => {
    dispatch({type: 'FETCH_UNAPPROVED'})
  },[]);

  return (
    <>
      {/* If no user is logged in, show these links */}
      {user.id === null ||
        (user.clearance_level === 0 && (
          // If there's no user, show login/registration links
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">
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
                  color="red"
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
              <Typography
                variant="h6"
                onClick={routeChange}
                sx={{
                  flexGrow: 1,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                South Carolina Language Map
              </Typography>


              <Button
                color="inherit"
                sx={{margin: '10px'}}
                onClick={() => {
                  dispatch({ type: "SET_ADMIN_VIEW", payload: "approval" });
                }}
              >
                <StyledBadge badgeContent={approvals.length} color="primary">
                  Approvals
                </StyledBadge>
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
