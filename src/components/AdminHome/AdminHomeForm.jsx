// Local Files Import
import AutoCompleteLanguage from "./AutoCompleteLanguage";
import AutoCompleteRegion from "./AutoCompleteRegion";

//Imported necessary libraries 
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Grid,
    TextField,
    Button,
} from '@mui/material';
import PublishIcon from "@mui/icons-material/Publish";

function AdminHomeForm() {
  const dispatch = useDispatch();
  const dropDownValues = useSelector(
    (store) => store.adminReducer.newSiteReducer
  );
  const mapBoxMessage = useSelector((store) => store.errors.mapBoxMessage);

  let base = {
    site_name: "",
    address: "",
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
    console.log("newSite====================", newSite);
    dispatch({ type: "ADD_SITE", payload: newSite });
  };

  let [newLocation, setLocation] = useState(base);

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs>
          {/* Text field used for Site Name input */}
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
      </Grid>
      <Grid item xs>
        <TextField
          required
          id="filled-required"
          label="Address"
          variant="standard"
          helperText="Address"
          //Will assign the value of input to the useState associated key
          onChange={(event) =>
            setLocation({ ...newLocation, address: event.target.value })
          }
        />
      </Grid>
      <Grid item xs>
          {/* Drop down autofill input for Regions of South Carolina */}
        <AutoCompleteRegion />
      </Grid>
      <Grid item xs>
          {/* Drop down autofill input for languages provided by university */}
        <AutoCompleteLanguage />
        {/* Link will redirect you to ADD NEW LANGUAGE form  */}
        <Link>Don't see your language? Click here!</Link>
      </Grid>
      <Grid item xs>
        <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
          Submit
        </Button>
        {/* If the error exists, display the following message provided in reducer */}
        {mapBoxMessage.length > 0 && <Typography>{mapBoxMessage}</Typography>}
      </Grid>
    </form>
  );
}

export default AdminHomeForm;
