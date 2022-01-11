//Imported necessary libraries
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui styles
import {
    TextField,
    TableCell,
    Typography
} from "@mui/material";

//local files
import AutoComplete from "../AutoComplete/AutoComplete";


export default function EditLanguage({ language }) {
    //initialize dispatch
    const dispatch = useDispatch();

    //store to grab language sent from AdminLanguageRow component
    const editLanguage = useSelector((store) => store.adminReducer.adminEditReducer);

    //handle changing the language object in the reducer at every key stroke
    function handleChange(event, property) {
        dispatch({
            type: 'EDIT_LANGUAGE_ONCHANGE',
            payload: { property: property, value: event.target.value }
        });
    }


//for presentation
    const functionPresentation = () => {
        dispatch({
            type: 'SET_EDIT_LANGUAGE',
            payload: {
            id: language.id,
            language: "Hmonglish",
            glottocode: "Firs1234",
            description: "Combination of Hmong and English. Primarily spoken in the United States",
            endonym: "Hmong",
            global_speakers: 40000,
            sc_speakers: 27723,
            category_id: 3,
            status: "Current",
            language_id: language.id,
            // link_text: "A new way of speaking for Hmong in the United States",
            // hyperlink: "https://www.abebooks.com/9783659522956/Hmonglish-new-way-speaking-Hmong-3659522953/plp" 
        }})
    }

        return (
            <>
                
                <TableCell>
                    <TextField
                        required
                        id="filled-required"
                        variant="standard"
                        helperText="ex. Hmong"
                        value={editLanguage.language || ''}
                        onChange={(event) => handleChange(event, 'language')}
                        sx = {{ width: 100}}
                    />
                </TableCell>
                <TableCell>
                <Typography onClick={functionPresentation}>*</Typography>
                    <TextField
                        required
                        id="filled-required"
                        label="Glottocode"
                        variant="standard"
                        helperText="ex. Firs1234"
                        value={editLanguage.glottocode || ''}
                        onChange={(event) => handleChange(event, 'glottocode')}
                        sx = {{ width: 100}}
                    />
                </TableCell>



                <TableCell>
                    <TextField
                        required
                        id="filled-required"
                        label="Global Speakers"
                        variant="standard"
                        helperText="ex. 2,700,000"
                        value={editLanguage.global_speakers || ''}
                        onChange={(event) => handleChange(event, 'global_speakers')}
                        sx = {{ width: 100}}
                    />
                </TableCell>

                <TableCell>
                    <TextField
                        required
                        id="filled-required"
                        label="SC Speakers"
                        variant="standard"
                        helperText="ex. 3,772"
                        value={editLanguage.sc_speakers || ''}
                        onChange={(event) => handleChange(event, 'sc_speakers')}
                        sx = {{ width: 100}}
                    />
                </TableCell>

                <TableCell>
                    <TextField
                        required
                        id="filled-required"
                        label="Endonym"
                        variant="standard"
                        helperText="ex. Hmong"
                        value={editLanguage.endonym || ''}
                        onChange={(event) => handleChange(event, 'endonym')}
                        sx = {{ width: 100}}
                    />
                </TableCell>

                <TableCell>
                    <TextField
                        required
                        id="filled-required"
                        label="Description"
                        variant="standard"
                        value={editLanguage.description || ''}
                        onChange={(event) => handleChange(event, 'description')}
                        sx = {{ width: 300}}
                    />
                </TableCell>

                <TableCell>
                    <AutoComplete table="category" />
                </TableCell>

                <TableCell>
                    <TextField
                        required
                        id="filled-required"
                        label="Status"
                        variant="standard"
                        helperText="Current"
                        value={editLanguage.status || ''}
                        onChange={(event) => handleChange(event, 'status')}
                        sx = {{ width: 100}}
                    />
                </TableCell>

                <TableCell>
                    <TextField
                        id="filled-required"
                        label="Link Title"
                        variant="standard"
                        value={editLanguage.link_text || ''}
                        onChange={(event) => handleChange(event, 'link_text')}
                        sx = {{ width: 150}}
                    />
                </TableCell>

                <TableCell>
                    <TextField
                        id="filled-required"
                        label="Hyperlink"
                        variant="standard"
                        value={editLanguage.hyperlink || ''}
                        onChange={(event) => handleChange(event, 'hyperlink')}
                        sx = {{ width: 150}}
                    />
                </TableCell>
            </>
        );
    }

