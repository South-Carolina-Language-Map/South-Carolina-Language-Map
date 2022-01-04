import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import listTypeReducer from '../../redux/reducers/viewReducers/view.listType.reducer';

function AutoCompleteRegion() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_REGIONS"})
  }, []);

  const regions = useSelector(store => store.viewReducer.listTypeReducer);

  const handleRegionValue = (event, value) => {
    dispatch({type: 'SET_NEW_SITE', payload: value.id})  
    console.log(value);}

  console.log("The store for regions", regions);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      options={regions}
      autoHighlight
      getOptionLabel={(option) => option.name}
      onChange={handleRegionValue}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      {option.id}. {option.name} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a region"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default AutoCompleteRegion;
