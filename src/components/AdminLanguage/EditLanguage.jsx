//Imported necessary libraries
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Grid,
    TextField,
    Button,
    Typography,
    Autocomplete,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

import AutoComplete from "../AutoComplete/AutoComplete";

export default function EditLanguage({ language }) {
    //initialize dispatch
    const dispatch = useDispatch();

    //bring in category ID stored in reducer
    const category = useSelector(
        (store) => store.adminReducer.newLanguageCategoryIDReducer
    );


    //local state stores the value for category input
    const [editLanguage, setLanguage] = useState(language);

    console.log(
        "NEW LANGUAGE: Packaged language object sent to server",
        newLanguage
    );


    return (
        <>
    //form sends object with multiple values containing new language and associated values in DB
            <TableCell>
                <TextField
                    required
                    id="filled-required"
                    label="Language Name"
                    variant="standard"
                    helperText="ex. Hmong"
                    value={editLanguage.language}
                    onChange={(event) =>
                        setLanguage({ ...editLanguage, language: event.target.value })
                    }
                />
            </TableCell>

            <TableCell>
                <TextField
                    required
                    id="filled-required"
                    label="Glottocode"
                    variant="standard"
                    helperText="ex. Firs1234"
                    value={editLanguage.glottocode}
                    onChange={(event) =>
                        setLanguage({ ...editLanguage, glottocode: event.target.value })
                    }
                />
            </TableCell>

            <TableCell>
                <TextField
                    required
                    id="filled-required"
                    label="Description"
                    variant="standard"
                    value={editLanguage.description}
                    onChange={(event) =>
                        setLanguage({ ...editLanguage, description: event.target.value })
                    }
                />
            </TableCell>

            <TableCell>
                <TextField
                    required
                    id="filled-required"
                    label="Global Speakers"
                    variant="standard"
                    helperText="ex. 2,700,000"
                    
                    onChange={(event) =>
                        setLanguage({
                            ...editLanguage, global_speakers: event.target.value,
                        })}
                />
            </TableCell>
            <TableCell>{language.endonym}</TableCell>
            <Grid container spacing={0.5}>
                <form
                    onSubmit={() =>
                        dispatch({ type: "EDIT_LANGUAGE", payload: newLanguage })
                    }
                >
                    <Grid item>
                        <Typography>Add a new language!</Typography>
                        <
                     
                     
                  
                            <Grid item>
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
                        <Grid item>
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
                        <Grid item>
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
                        <Grid item>
                            <AutoComplete table="category" />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="filled-required"
                                label="Link Title"
                                variant="standard"
                                onChange={(event) =>
                                    setLanguage({
                                        ...newLanguage, examples: [{ ...newLanguage.examples[0], link_text: event.target.value }]
                                    })}
                            />
                        </Grid>
                        <Grid item>
                            <AutoComplete
                                table="language" />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="filled-required"
                                label="Hyperlink"
                                variant="standard"
                                onChange={(event) =>
                                    setLanguage({
                                        ...newLanguage,
                                        examples: [{ ...newLanguage.examples[0], hyperlink: event.target.value }]

                                    })
                                }
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<PublishIcon />}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
            </Grid>
        </form>
            </Grid >
        </>
    );
}


