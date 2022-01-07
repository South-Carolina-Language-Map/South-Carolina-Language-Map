// Local Files Import
import AutoComplete from "../AutoComplete/AutoComplete";

//Imported necessary libraries 
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Typography,
    Grid,
    TextField,
    Button,
} from '@mui/material';
import PublishIcon from "@mui/icons-material/Publish";

function AdminHomeForm() {
  const dispatch = useDispatch();
  //Reducer set up for NewSite values for language and region ids
  const dropDownValues = useSelector((store) => store.adminReducer.newSiteReducer);
  //Reducer set up for error catching
  const mapBoxMessage = useSelector((store) => store.errors.mapBoxMessage);

//default values for site_name and addresses - set to empty strings
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
    //sends action to saga with newSite object to create a new GeoTag
    dispatch({ type: "ADD_SITE", payload: newSite });
    setLocation(base);
  };

  //local state to store site name and address
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
          value={newLocation.site_name}
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
          value={newLocation.address}
          //Will assign the value of input to the useState associated key
          onChange={(event) =>
            setLocation({ ...newLocation, address: event.target.value })
          }
        />
      </Grid>
      <Grid item xs>
          {/* Drop down autofill input for Regions of South Carolina */}
        <AutoComplete
        table="region"/>
      </Grid>
      <Grid item xs>
          {/* Drop down autofill input for languages provided by university */}
        <AutoComplete table="language"/>
        {/* Link will redirect you to ADD NEW LANGUAGE form  */}
        <Link>{`Don't see your language? Click here!`}</Link>
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
