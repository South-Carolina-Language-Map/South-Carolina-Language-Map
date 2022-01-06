// React Imports
import React from "react";
import { useHistory } from "react-router-dom";

// Local Imports
import LoginForm from "../LoginForm/LoginForm";

// MUI Imports
import {
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
      <Box>
        <Grid container sx={{ m: 2, alignContent: "center" }}>
          {/*  */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h5">LOG IN</Typography>
            <Typography variant="h6">to continue to the Admin side.</Typography>
          </Grid>
          {/*  */}
          <Grid item xs={12}>
            <LoginForm />
          </Grid>
          {/*  */}
          <Grid item xs={12}>
            <Typography>Username:</Typography>
            <TextField label="Required" variant="filled" required />
          </Grid>
          {/*  */}
          <Grid item xs={12} sx={{ mt: 4, mb: 5 }}>
            <Typography>Password:</Typography>
            <TextField
              label="Required"
              variant="filled"
              type="password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input className="btn" type="submit" name="submit" value="Log In" />
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
      </Box>
  );
}

export default LoginPage;
