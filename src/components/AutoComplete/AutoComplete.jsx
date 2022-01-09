// React Imports
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { Box, TextField, Autocomplete } from "@mui/material";

function AutoComplete({ table }) {
  const dispatch = useDispatch();
  let properties;

  switch (table) {
    case "region":
      properties = {
        fetch: "FETCH_REGIONS",
        set: "SET_NEW_REGION",
        reducer: "adminRegionsReducer",
        option: "name",
        label: "region",
        newSite: true,
      };
      break;
    case "language":
      properties = {
        fetch: "FETCH_LANGUAGES",
        set: "SET_NEW_LANGUAGE",
        reducer: "adminLanguagesReducer",
        option: "language",
        label: "language",
        newSite: true,
      };
      break;
    case "category":
      properties = {
        fetch: "FETCH_CATEGORIES",
        set: "SET_NEW_CATEGORY",
        reducer: "adminCategoriesReducer",
        option: "name",
        label: "category",
        newSite: true,
      };
      break;
  }

  useEffect(() => {
    dispatch({ type: properties.fetch });
  }, []);

  //Bring in reducer that stores all available regions in SC
  const regions = useSelector(
    (store) => store.adminReducer[properties.reducer]
  );

  //handle region input and store the associated ID to reducer
  const handleStoreId = (event, value) => {
    //if autocomplete set to empty, clear reducer
    if(!value){
      dispatch({type: properties.set, payload: ''});
      return;
    }

    // Else if on site view, update reducer
    if (properties.newSite) {
      dispatch({ type: properties.set, payload: value.id});
    }
  };

  return (
    <Autocomplete
      autoHighlight
      options={regions}
      sx={{ width: 2 / 2 }}
      onChange={handleStoreId}
      id="country-select-demo"
      // getOptionLabel is what is displayed on TextField when input is selected from dropdown
      getOptionLabel={(option) => option[properties.option]}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {/* These two options are the displayed values IN the drop down */}
          {option.id}. {option[properties.option]}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`Choose a ${properties.label}`}
          inputProps={{
            ...params.inputProps,
            autoComplete: "dont-fill-me-please", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default AutoComplete;
