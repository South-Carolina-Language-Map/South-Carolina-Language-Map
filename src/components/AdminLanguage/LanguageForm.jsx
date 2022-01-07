//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Typography, Autocomplete } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

import AutoComplete from "../AutoComplete/AutoComplete";

function LanguageForm() {
    //initialize dispatch 
  const dispatch = useDispatch();

  //bring in category ID stored in reducer
  const category = useSelector((store) => store.adminReducer.newLanguageCategoryIDReducer);

  //create empty object to store the values of the form
  const base = {
      language: "",
      glottocode: "",
      description: "",
      endonym: "",
      global_speakers:"",
      sc_speakers: "",
      category_id: category.category_id,
      examples: {link_text: "", hyperlink: ""}
  }
  //local state stores the value for category input
  const [newLanguage, setLanguage] = useState(base);
  return (
    //form sends object with multiple values containing new language and associated values in DB  
    <Grid container spacing={.5}>
    <form
      onSubmit={() => dispatch({ type: "ADD_LANGUAGE", payload: newLanguage })}
    >
    <Grid item>
      <Typography>Add a new language!</Typography>
      <Grid item >
      <TextField
        required
        id="filled-required"
        label="Language Name"
        variant="standard"
        helperText="ex. Hmong"
        onChange={(event) => setLanguage({...newLanguage, language: event.target.value })}
      />
      </Grid>
      <Grid item >
      <TextField
        required
        id="filled-required"
        label="Glottocode"
        variant="standard"
        helperText="ex. Firs1234"
        onChange={(event) => setLanguage({...newLanguage, glottocode: event.target.value })}
      />
      </Grid>
      <Grid item >
       <TextField
        required
        id="filled-required"
        label="Description"
        variant="standard"
        onChange={(event) => setLanguage({...newLanguage, description: event.target.value })}
      />
       <Grid item >
       <TextField
        required
        id="filled-required"
        label="Endonym"
        variant="standard"
        helperText="ex. Hmong"
        onChange={(event) => setLanguage({...newLanguage, endonym: event.target.value })}
      />
      </Grid>
      <Grid item>
      <TextField
        required
        id="filled-required"
        label="Global Speakers"
        variant="standard"
        helperText="ex. 2,700,000"
        onChange={(event) => setLanguage({...newLanguage, global: event.target.value })}
      />
      </Grid>
      <Grid item>
      <TextField
        required
        id="filled-required"
        label="SC Speakers"
        variant="standard"
        helperText="ex. 3,772"
        onChange={(event) => setLanguage({...newLanguage, sc_speakers: event.target.value })}
      />
      </Grid>
      <Grid item>
     <AutoComplete table="category"/>
     </Grid>
     <Grid item>
      <TextField
        id="filled-required"
        label="Link Title"
        variant="standard"
        onChange={(event) => setLanguage({...newLanguage, ...examples, link_text: event.target.value })}
      />
      </Grid>
      <Grid item>
      <TextField
        id="filled-required"
        label="Hyperlink"
        variant="standard"
        onChange={(event) => setLanguage({...newLanguage, ...examples, hyperlink: event.target.value })}
      />
      </Grid>
      <Grid item>
      <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
        Submit
      </Button>
      </Grid>
      </Grid>
      </Grid>
    </form>
    </Grid> 
  );
}

export default LanguageForm;
