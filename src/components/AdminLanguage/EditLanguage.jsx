//Imported necessary libraries
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    TableCell,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

import AutoComplete from "../AutoComplete/AutoComplete";

export default function EditLanguage(event, { language }) {
    //initialize dispatch
    const dispatch = useDispatch();
    
    dispatch({ 
        type: 'EDIT_LANGUAGE_ONCHANGE', 
        payload: { property: property, value: event.target.value }
    });

}

    //local state stores the value for category input
    const [editLanguage, setLanguage] = useState(language);




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
                        // setLanguage({ ...editLanguage, language: event.target.value })
                        setLanguage(event, 'language')
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
                        // setLanguage({ ...editLanguage, glottocode: event.target.value })
                        setLanguage(event, 'glottocode')
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
                        // setLanguage({ ...editLanguage, description: event.target.value })
                        setLanguage(event, 'description')
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
                    value={editLanguage.global_speakers}
                    onChange={(event) =>
                        // setLanguage({
                        //     ...editLanguage, global_speakers: event.target.value,
                        // })}
                        setLanguage(event, 'global_speakers')}
                />
            </TableCell>

            <TableCell>
                <TextField
                    required
                    id="filled-required"
                    label="SC Speakers"
                    variant="standard"
                    helperText="ex. 3,772"
                    value={editLanguage.global_speakers}
                    onChange={(event) =>
                        // setLanguage({
                        //     ...newLanguage, sc_speakers: event.target.value,
                        // })}
                        setLanguage(event, 'sc_speakers')}
                />
            </TableCell>

            <TableCell>
                <TextField
                    required
                    id="filled-required"
                    label="Endonym"
                    variant="standard"
                    helperText="ex. Hmong"
                    alue={editLanguage.endonym}
                    onChange={(event) =>
                        // setLanguage({ ...editLanguage, endonym: event.target.value })
                        setLanguage(event, 'endonym')
                    }
                />
            </TableCell>

            <TableCell>
                <AutoComplete table="category" />
            </TableCell>

            <TableCell>
                <TextField
                    id="filled-required"
                    label="Link Title"
                    variant="standard"
                    onChange={(event) =>
                        // setLanguage({
                        //     ...editLanguage,
                        //     examples: [{ ...editLanguage.examples[0], link_text: event.target.value }]
                        // })}
                        setLanguage(event, 'examples.link_text')}
                />
            </TableCell>

            <TableCell>
                <TextField
                    id="filled-required"
                    label="Hyperlink"
                    variant="standard"
                    onChange={(event) =>
                        // setLanguage({
                        //     ...editLanguage,
                        //     examples: [{ ...editLanguage.examples[0], hyperlink: event.target.value }]

                        // })}
                        setLanguage(event, 'examples.hyperlink')}
                />
            </TableCell>
        </>
    );
}


