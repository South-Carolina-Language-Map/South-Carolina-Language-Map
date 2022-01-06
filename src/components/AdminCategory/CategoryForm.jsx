//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

function CategoryForm() {
  const dispatch = useDispatch();
  //initialize the value of the input 
  const [newCategory, setCategory] = useState('');
  console.log("newCategory", newCategory);
  return (
    <form onSubmit={()=> dispatch({type: "ADD_CATEGORY", payload: newCategory})}>
      <TextField
        required
        id="filled-required"
        label="Category Name"
        variant="standard"
        helperText="ex. Native American"
        onChange={(event) => setCategory({name: event.target.value})}
      />
      <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
        Submit
      </Button>
    </form>
  );
}

export default CategoryForm;
