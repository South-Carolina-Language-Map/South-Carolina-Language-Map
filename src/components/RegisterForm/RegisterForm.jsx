// React Imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//MUI Imports
import {
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

//framework for registration object
let userInfo = {
  username: "",
  password: "",
  fullName: "",
  email: "",
};


  //for presentation
let presentationFiller = {
  username: "JBayl",
  password: "12345",
  fullName: "Julia Bayless",
  email: "JB@linguistic.com",
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
    console.log("in register user");
    dispatch({
      type: "REGISTER",
      payload: newUser,
    });
    setNewUser(userInfo);
    setOpen(true);
  }; // end registerUser

  //onClose of the dialogue
  const handleClose = () => {
    setOpen(false);
    history.push("/login");
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={registerUser}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography onClick={() => setNewUser(presentationFiller)}>Username</Typography>
          <TextField
            required
            type="text"
            label="required"
            variant="filled"
            value={newUser.username}
            onChange={(event) =>
              setNewUser({ ...newUser, username: event.target.value })
            }
          />
        </Grid>
        {/*  */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>Password</Typography>
          <TextField
            required
            type="password"
            label="required"
            variant="filled"
            value={newUser.password}
            onChange={(event) =>
              setNewUser({ ...newUser, password: event.target.value })
            }
          />
        </Grid>
        {/*  */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>Full Name</Typography>
          <TextField
            required
            type="fullName"
            label="required"
            variant="filled"
            value={newUser.fullName}
            onChange={(event) =>
              setNewUser({ ...newUser, fullName: event.target.value })
            }
          />
        </Grid>
        {/*  */}
        <Grid item xs={12}>
          <Typography>Email</Typography>
          <TextField
            required
            type="email"
            label="required"
            variant="filled"
            value={newUser.email}
            onChange={(event) =>
              setNewUser({ ...newUser, email: event.target.value })
            }
          />
        </Grid>
        {/*  */}
        <Grid item xs={12}>
          <Button
            size="large"
            type="submit"
            value="Register"
            variant="contained"
            sx={{ mt: 4, mb: 2 }}
          >
            Submit Registration
          </Button>
        </Grid>
      </form>
      <button
        type="button"
        onClick={() => {
          history.push("/login");
        }}
        className="btn btn_asLink"
      >
        Login
      </button>

      {/* dialogue that pops up when user hits submit */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="Thank You for Your Request">
          {"Thank You!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your submission has been put in queue for approval. Please notify
            the administrators for faster approval.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back to Login</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default RegisterForm;
