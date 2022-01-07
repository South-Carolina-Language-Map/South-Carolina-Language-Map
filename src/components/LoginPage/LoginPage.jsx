// React Imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import LoginForm from "../LoginForm/LoginForm";

// MUI Imports
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <center>
      <Typography variant="h4" sx={{ mt: 2 }}>
        South Carolina Language Map
      </Typography>
      <Paper elevation={5} sx={{ m: 5 }}>
        <Grid container sx={{ p: 2, alignContent: "center" }}>
          {/*  */}
          <Grid item xs={12} sx={{ mb: 2, textAlign: "center" }}>
            <Typography variant="h5" sx={{color:"#00000"}}>
              <strong>LOG IN</strong>
            </Typography>
            <Typography variant="h6">To continue to Admin</Typography>
          </Grid>
          {/*  */}
          <Grid item xs={12}>
            <Typography>Username:</Typography>
            <TextField
              required
              label="Required"
              variant="filled"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          {/*  */}
          <Grid item xs={12} sx={{ mt: 4, mb: 4 }}>
            <Typography>Password:</Typography>
            <TextField
              required
              type="password"
              label="Required"
              variant="filled"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              sx={{ mb: 2 }}
              onClick={login}
              variant="contained"
            >
              Log In
            </Button>
          </Grid>
          {/*  */}
          <Grid item xs={12}>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push("/registration");
              }}
            >
              Register
            </button>
          </Grid>
        </Grid>
      </Paper>
    </center>
  );
}

export default LoginPage;
