import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//mui styling
import {
  TextField,
  FormLabel,
  Button,
  Stack,
  FormControl,
  Grid,
  Typography
} from '@mui/material';

let userInfo = {
  username: '',
  password: '',
  fullName: '',
  email: ''
}


function RegisterForm() {
  const [user, setUser] = useState(userInfo);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    console.log('in register user', )
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        fullName: fullName,
        email: email
      },
    });

  }; // end registerUser

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={registerUser}>
        <Grid item>
          <h2>Register User</h2>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
        </Grid>

        <Grid item xs={12}>
          <FormLabel>
            Username
          </FormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="username"
            variant="outlined"
            type="text"
            margin="normal"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel>
            Password
          </FormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <FormLabel>
            Full Name
          </FormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            type="fullName"
            label="Full Name"
            value={fullName}
            required
            onChange={(event) => setFullName(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel>
            Email
          </FormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            type="email"
            label="Email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" value="Register">
            Submit
          </Button>
        </Grid>

      </form>
    </Grid>
  );
}

export default RegisterForm;
