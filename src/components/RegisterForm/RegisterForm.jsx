import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui styling
import {
  TextField,
  FormLabel,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';

//framework for registration object
let userInfo = {
  username: '',
  password: '',
  fullName: '',
  email: ''
}


function RegisterForm() {
  //useState for registration object
  const [newUser, setNewUser] = useState(userInfo);
  //useState for confirmation popup
  const [open, setOpen] = React.useState(false);

  //store & hooks
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  //send of registration user info for approval
  const registerUser = (event) => {
    event.preventDefault();
    console.log('in register user',)
    dispatch({
      type: 'REGISTER',
      payload: newUser
    });
    setNewUser(userInfo);
    setOpen(true);
  }; // end registerUser


  //onClose of the dialogue
  const handleClose = () => {
    setOpen(false);
    history.push('/login')
  };


  return (
    <>
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
              value={newUser.username}
              required
              onChange={(event) => setNewUser({ ...newUser, username: event.target.value })}
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
              value={newUser.password}
              required
              onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} />
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
              value={newUser.fullName}
              required
              onChange={(event) => setNewUser({ ...newUser, fullName: event.target.value })}
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
              value={newUser.email}
              required
              onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit" value="Register">
              Submit
            </Button>
          </Grid>

        </form>
      </Grid>

      {/* dialogue that pops up when user hits submit */}

      <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="Thank You for Your Request">
      {"Thank You"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Your submission has been put in queue for approval. Please notify the admins
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Navigate back to Login</Button>
    </DialogActions>
  </Dialog>
    </>
  );
}

export default RegisterForm;
