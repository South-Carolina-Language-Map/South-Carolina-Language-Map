import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const routeChange = () => {
    console.log('click')
    let path = `/home`;
    history.push(path);
  }

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

              <Button onClick={routeChange} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                South Carolina Language Map
              </Button>


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


    /* // <div className="nav">
    //   <Link to="/admin">
    //     <h2 className="nav-title">South Carolina Language Map</h2>
    //   </Link>
    //   <div>
    //     {/* If no user is logged in, show these links */
    //     {user.id === null  || user.clearance_level === 0 &&
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     } */}

    //     {/* If a user is logged in, show these links */}
    //     {user.clearance_level >= 1 && (
    //       <>
    //         <Link className="navLink" to="/admin/site">
    //           Site
    //         </Link>

    //         <Link className="navLink" to="/admin/language">
    //           Language
    //         </Link>

    //         <Link className="navLink" to="/admin/category">
    //           Category
    //         </Link>

    //         <Link className="navLink" to="/admin/approvals">
    //           Approvals
    //         </Link>

    //         <Link className="navLink" to="/admin/about">
    //           About
    //         </Link>

    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/admin/about">
    //       About
    //     </Link>
    //   </div>
    // </div>
  );
}

export default Nav;
