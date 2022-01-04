import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import adminLanguagesReducer from '../../redux/reducers/adminReducers/admin.languages.reducer';


function AutoCompleteLanguage() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_LANGUAGES"})
  }, []);

  const languages = useSelector(store => store.adminReducer.adminLanguagesReducer)

  const handleLanguageValue = (event, value) => {
    dispatch({type: 'SET_NEW_LANGUAGE', payload: value.id})  
    console.log(value);}

  console.log("The store for languages", languages);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      options={languages}
      autoHighlight
      getOptionLabel={(option) => option.language}
      onChange={handleLanguageValue}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      {option.id}. {option.language}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a language"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default AutoCompleteLanguage;
