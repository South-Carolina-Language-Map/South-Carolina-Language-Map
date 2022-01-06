//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

function CategoryForm() {
    //initialize dispatch 
  const dispatch = useDispatch();
  //local state stores the value for category input
  const [newCategory, setCategory] = useState("");
  return (
    //form sends object with one key value pair containing new category name    
    <form
      onSubmit={() => dispatch({ type: "ADD_CATEGORY", payload: newCategory })}
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
  );
}

export default CategoryForm;
