import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        newSite: false,
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
    if (properties.newSite) {
      dispatch({ type: properties.set, payload: value.id });
    }
    console.log(value);
  };

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      options={regions}
      autoHighlight
      // getOptionLabel is what is displayed on TextField when input is selected from dropdown
      getOptionLabel={(option) => option[properties.option]}
      onChange={handleStoreId}
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
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default AutoComplete;
