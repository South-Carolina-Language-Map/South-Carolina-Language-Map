//Imported necessary libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

import AutoComplete from "../AutoComplete/AutoComplete";

function LanguageForm() {
  //initialize dispatch
  const dispatch = useDispatch();

  //bring in category ID stored in reducer
  const category = useSelector(
    (store) => store.adminReducer.newLanguageCategoryIDReducer
  );

  //create empty object to store the values of the form
  //local state stores the value for category input
  const [newLanguage, setLanguage] = useState({
    language: "",
    glottocode: "",
    description: "",
    endonym: "",
    global_speakers: "",
    sc_speakers: "",
    category_id: category,
    examples: [{ link_text: "", hyperlink: "" }],
  });

  console.log(
    "NEW LANGUAGE: Packaged language object sent to server",
    newLanguage
  );

  useEffect(() => {
    setLanguage({ ...newLanguage, category_id: category });
  }, [category]);

  return (
    //form sends object with multiple values containing new language and associated values in DB
    // <Grid container spacing={0.5}>
    <form
      onSubmit={() => dispatch({ type: "ADD_LANGUAGE", payload: newLanguage })}
    >
      <Paper elevation={5}>
        <Grid container textAlign="center">
          <Grid item xs={2.4}>
            <TextField
              required
              variant="standard"
              id="filled-required"
              label="Language Name"
              helperText="ex. Hmong"
              onChange={(event) =>
                setLanguage({ ...newLanguage, language: event.target.value })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={2.4}>
            <TextField
              required
              id="filled-required"
              label="Glottocode"
              variant="standard"
              helperText="ex. Firs1234"
              onChange={(event) =>
                setLanguage({ ...newLanguage, glottocode: event.target.value })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={2.4}>
            <TextField
              required
              id="filled-required"
              label="Endonym"
              variant="standard"
              helperText="ex. Hmong"
              onChange={(event) =>
                setLanguage({ ...newLanguage, endonym: event.target.value })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={2.4}>
            <TextField
              required
              id="filled-required"
              label="Global Speakers"
              variant="standard"
              helperText="ex. 2,700,000"
              onChange={(event) =>
                setLanguage({
                  ...newLanguage,
                  global_speakers: event.target.value,
                })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={2.4}>
            <TextField
              required
              id="filled-required"
              label="SC Speakers"
              variant="standard"
              helperText="ex. 3,772"
              onChange={(event) =>
                setLanguage({
                  ...newLanguage,
                  sc_speakers: event.target.value,
                })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={3}>
            <TextField
              required
              multiline
              minRows={3}
              maxRows={10}
              id="filled-required"
              label="Description"
              variant="standard"
              onChange={(event) =>
                setLanguage({ ...newLanguage, description: event.target.value })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={2} sx={{ pr: 2 }}>
            <AutoComplete table="category" />
          </Grid>
          {/*  */}
          <Grid item xs={3}>
            <TextField
              id="filled-required"
              label="Link Title"
              variant="standard"
              onChange={(event) =>
                setLanguage({
                  ...newLanguage,
                  examples: [
                    {
                      ...newLanguage.examples[0],
                      link_text: event.target.value,
                    },
                  ],
                })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={3}>
            <TextField
              id="filled-required"
              label="Hyperlink"
              variant="standard"
              onChange={(event) =>
                setLanguage({
                  ...newLanguage,
                  examples: [
                    {
                      ...newLanguage.examples[0],
                      hyperlink: event.target.value,
                    },
                  ],
                })
              }
            />
          </Grid>
          {/*  */}
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" endIcon={<PublishIcon />}>
              Submit
            </Button>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Paper>
    </form>
    // </Grid>
  );
}

export default LanguageForm;
