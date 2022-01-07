//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

function LanguageForm() {
    //initialize dispatch 
  const dispatch = useDispatch();
  const base = {
      language: "",
      glottocode: "",
      description: "",
      endonym: "",
      global_speakers:"",
      sc_speakers: "",
      category_id: "",
      examples: [link_text: "", hyperlink: ""]
  }
  //local state stores the value for category input
  const [newLanguage, setLanguage] = useState(base);
  return (
    //form sends object with one key value pair containing new category name    
    <form
      onSubmit={() => dispatch({ type: "ADD_LANGUAGE", payload: newLanguage })}
    >
      <Typography>Add a new language!</Typography>
      <TextField
        required
        id="filled-required"
        label="Language Name"
        variant="standard"
        helperText="ex. Hmong"
        onChange={(event) => setLanguage({...newLanguage, language: event.target.value })}
      />
      <TextField
        required
        id="filled-required"
        label="Glottocode"
        variant="standard"
        helperText="ex. Firs1234"
        onChange={(event) => setLanguage({...newLanguage, glottocode: event.target.value })}
      />
       <TextField
        required
        id="filled-required"
        label="Description"
        variant="standard"
        onChange={(event) => setLanguage({...newLanguage, description: event.target.value })}
      />
       <TextField
        required
        id="filled-required"
        label="Endonym"
        variant="standard"
        helperText="ex. Hmong"
        onChange={(event) => setLanguage({...newLanguage, endonym: event.target.value })}
      />
      <TextField
        required
        id="filled-required"
        label="Global Speakers"
        variant="standard"
        helperText="ex. 2,700,000"
        onChange={(event) => setLanguage({...newLanguage, global: event.target.value })}
      />
      <TextField
        required
        id="filled-required"
        label="SC Speakers"
        variant="standard"
        helperText="ex. 2,700,000"
        onChange={(event) => setLanguage({...newLanguage, sc_speakers: event.target.value })}
      />
      {/* AutoComplete FEATURE */}
      {/* <TextField
        required
        id="filled-required"
        label="Category"
        variant="standard"
        helperText="ex. 2,700,000"
        onChange={(event) => setLanguage({...newLanguage, category_id: event.target.value })}
      /> */}
      <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
        Submit
      </Button>
    </form>
  );
}

export default LanguageForm;
