// Local Files Import
import AutoComplete from "../AutoComplete/AutoComplete";

// React imports
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//MUI Imports
import PublishIcon from "@mui/icons-material/Publish";
import { Typography, Grid, TextField, Button, Alert, Snackbar} from "@mui/material";

function AdminHomeForm() {
  const dispatch = useDispatch();
  //Reducer set up for NewSite values for language and region ids
  const dropDownValues = useSelector((store) => store.adminReducer.newSiteReducer);
  //Reducer set up for error catching
  const mapBoxMessage = useSelector((store) => store.errors.mapBoxMessage);
  //Reducer set up for clearing the Input
  let clearAutoComplete = useSelector((store) => store.adminReducer.clearAutoCompleteReducer);

  //Mui Snackbar
  const [open, setOpen] = React.useState(false);
  //Initialize value for clearing 
  let autoKey = clearAutoComplete ? 1 : 2;

  //default values for site_name and addresses - set to empty strings
  let base = {
    site_name: "",
    address: "",
  };

  let presentationFiller = {
    site_name: "Upper Richmond Community Center",
    address: " 280 Camp Ground Rd, Columbia, SC 29203",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //sends over new object to saga/server to process and send to DB
    let newSite = {
      site_name: newLocation.site_name,
      address: newLocation.address,
      language_id: dropDownValues.language_id,
      region_id: dropDownValues.region_id,
    };
    //sends action to saga with newSite object to create a new GeoTag
    dispatch({ type: "ADD_SITE", payload: newSite });
    //empty inputs
    setLocation(base);
    dispatch({ type: "RESET_AUTOCOMPLETE" });
      //opens snackbar
      setOpen(true);
  };


  //closes snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //local state to store site name and address
  let [newLocation, setLocation] = useState(base);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={3}>
          {/* Text field used for Site Name input */}
          <TextField
            required
            label="Site Name"
            variant="standard"
            id="filled-required"
            helperText="ex. Raleigh"
            value={newLocation.site_name}
            //Will assign the value of input to the useState associated key
            onChange={(event) =>
              setLocation({ ...newLocation, site_name: event.target.value })
            }
          />
        </Grid>
        {/*  */}
        <Grid item xs={3}>
          <TextField
            required
            label="Address"
            variant="standard"
            id="filled-required"
            helperText="Address"
            value={newLocation.address}
            //Will assign the value of input to the useState associated key
            onChange={(event) =>
              setLocation({ ...newLocation, address: event.target.value })
            }
          />
        </Grid>
        {/*  */}
        <Grid item xs={3}>
          {/* Drop down autofill input for Regions of South Carolina */}
          <AutoComplete table="region" key={autoKey} />
        </Grid>
        <Grid item xs={3}>
          {/* Drop down autofill input for languages provided by university */}
          <AutoComplete table="language" key={autoKey} />
          {/* Link will redirect you to ADD NEW LANGUAGE form  */}
          <a
            onClick={() => dispatch({ type: 'SET_ADMIN_VIEW', payload: 'language' })}
            href='#/admin'
          >{`Don't see your language? Click here!`}</a>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
            Submit
          </Button>
          {/* If the error exists, display the following message provided in reducer */}
          {mapBoxMessage.length > 0 && <Typography>{mapBoxMessage}</Typography>}
        </Grid>
        <Typography onClick={() => setLocation(presentationFiller)}>*</Typography>
      </Grid>

      {/* confirmation on successful post */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          "Success! A new site has been added."
        </Alert>
      </Snackbar>

    </form>
  );
}

export default AdminHomeForm;
