import * as React from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
} from "@mui/material";

//local files
import EditLanguage from "./EditLanguage";


export default function AdminLanguageRow({ language }) {

    //local state - toggle view for edit
    const [toggleEdit, setToggleEdit] = useState(false)

    //hooks
    const dispatch = useDispatch();

    // function handles edit for this ID
    const handleEditView = () => {
        setToggleEdit(!toggleEdit)
    };

    //function deletes this id
    const handleDelete = () => {
        console.log("Delete", language.id);
        dispatch({
            type: 'DELETE_LANGUAGE',
            payload: language.id
        })
    };


    return (
        <>
            {toggleEdit ?
                <TableRow hover role="checkbox" tabIndex={-1}>
                    <EditLanguage language={language}/>
                    <TableCell>
                        <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={handleEdit}
                        >
                            Submit
                        </Button>
                        <Button variant="contained" onClick={handleEditView}>
                            Cancel
                        </Button>
                    </TableCell>
                </TableRow>
                :
                <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>{language.language}</TableCell>
                    <TableCell>{language.glottocode}</TableCell>
                    <TableCell>{language.global_speakers}</TableCell>
                    <TableCell>{language.sc_speakers}</TableCell>
                    <TableCell>{language.endonym}</TableCell>
                    <TableCell>
                        <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={handleEditView}
                        >
                            Edit
                        </Button>
                        <Button variant="contained" onClick={handleDelete}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            }
        </>
    )
} //end AdminLanguageRow