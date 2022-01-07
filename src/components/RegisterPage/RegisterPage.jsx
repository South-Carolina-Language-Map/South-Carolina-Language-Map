// React Imports
import React from "react";

// Local Imports
import RegisterForm from "../RegisterForm/RegisterForm";

//MUI Imports
import { Grid, Paper, Typography } from "@mui/material";

function RegisterPage() {
  return (
    <center>
      <Typography variant="h4" sx={{ mt: 2 }}>
        South Carolina Language Map
      </Typography>
      <Paper elevation={5} sx={{ m: 5 }}>
        <Grid container sx={{ p: 2, alignContent: "center" }}>
          <Grid item xs={12} sx={{ mb: 2, textAlign: "center" }}>
            <Typography variant="h5">
              <strong>REGISTER</strong>
            </Typography>
            <Typography variant="h6">To become an Admin</Typography>
          </Grid>
          <RegisterForm />
        </Grid>
      </Paper>
    </center>
  );
}

export default RegisterPage;
