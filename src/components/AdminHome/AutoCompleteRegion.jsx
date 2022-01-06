import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminRegionReducer from "../../redux/reducers/adminReducers/admin.region.reducer";

function AutoCompleteRegion() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_REGIONS" });
  }, []);

  //Bring in reducer that stores all available regions in SC
  const regions = useSelector((store) => store.adminReducer.adminRegionReducer);

  //handle region input and store the associated ID to reducer
  const handleRegionValue = (event, value) => {
    dispatch({ type: "SET_NEW_SITE", payload: value.id });
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      options={regions}
      autoHighlight
      // getOptionLabel is what is displayed on TextField when input is selected from dropdown
      getOptionLabel={(option) => option.name}
      onChange={handleRegionValue}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {/* These two options are the displayed values IN the drop down */}
          {option.id}. {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a region"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default AutoCompleteRegion;
