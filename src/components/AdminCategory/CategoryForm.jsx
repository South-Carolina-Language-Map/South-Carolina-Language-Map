//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CategoryForm() {
    //initialize dispatch 
  const dispatch = useDispatch();
  //local state stores the value for category input
  const [newCategory, setCategory] = useState("");

   //Mui Snackbar
   const [open, setOpen] = useState(false);

   const handleClose = (event, reason) => {
       if (reason === 'clickaway') {
           return;
       }
       setOpen(false);
   };

   const handleSubmit = () => {dispatch({ type: "ADD_CATEGORY", 
   payload: newCategory })
   setOpen(true);
  }

  return (
    //form sends object with one key value pair containing new category name    
  <>
    <form
  
      onSubmit={(handleSubmit)}
    >
      <Typography>Add a new category!</Typography>
      <TextField
        required
        id="filled-required"
        label="Category Name"
        variant="standard"
        helperText="ex. Native American"
        onChange={(event) => setCategory({ name: event.target.value })}
      />
      <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
        Submit
      </Button>
    </form>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Category has been added.
                </Alert>
            </Snackbar>
   </>
    
  );
}

export default CategoryForm;
