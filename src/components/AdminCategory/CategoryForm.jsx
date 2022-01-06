//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

function CategoryForm() {
  const dispatch = useDispatch();

  return (
    <form>
      <TextField
        required
        id="filled-required"
        label="Site Name"
        variant="standard"
        helperText="ex. Raleigh"
        //Will assign the value of input to the useState associated key
        onChange={(event) =>
          setLocation({ ...newLocation, site_name: event.target.value })
        }
      />
    </form>
  );
}
