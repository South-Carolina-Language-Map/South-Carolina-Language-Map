import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  IconButton
} from '@mui/material';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/admin">
        <h2 className="nav-title">South Carolina Language Map</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null  || user.clearance_level === 0 &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.clearance_level >= 1 && (
          <>
            <Link className="navLink" to="/admin/site">
              Site
            </Link>

            <Link className="navLink" to="/admin/language">
              Language
            </Link>

            <Link className="navLink" to="/admin/category">
              Category
            </Link>

            <Link className="navLink" to="/admin/approvals">
              Approvals
            </Link>

            <Link className="navLink" to="/admin/about">
              About
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/admin/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
