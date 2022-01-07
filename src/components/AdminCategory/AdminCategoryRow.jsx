import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import {
    Button,
    TableRow,
    TableCell,
    TextField
} from "@mui/material";

export default function AdminCategoryRow({ row }) {

    //hooks
    const dispatch = useDispatch();

    //useStates for edit mode
    const [handleEditMode, setHandleEditMode] = useState(false);
    const [edit, setEdit] = useState(row || '')

    //toggles to input view
    const CallEditMode = () => {
        console.log("CallEditMode", row.id);
        setHandleEditMode(true)
    }


    // function dispatch new edit to database
    const handleEdit = () => {
        console.log("HandleEdit", edit);
        dispatch({
            type: 'UPDATE_CATEGORY',
            payload: edit
        })
        //close edit mode
        setHandleEditMode(false);
    };


    //function to delete this row associated with ID
    const handleDelete = () => {
        console.log("Delete", row.id);
        dispatch({
            type: 'DELETE_CATEGORY',
            payload: row.id
        })
    };
    //Mui Snackbar
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            {!handleEditMode ?
                <TableRow>
                    <TableCell component="th" scope="row" align="center">
                        {row.name}
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={CallEditMode}
                        >
                            Edit
                        </Button>
                        <Button variant="contained" onClick={handleDelete}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                :
                <TableRow>
                    <TableCell align="center">
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            value={edit.name}
                            onChange={(event) =>
                                setEdit({ ...edit, name: event.target.value })}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={handleEdit}
                        >
                            Submit
                        </Button>
                        <Button variant="contained" onClick={() => setHandleEditMode(false)}>
                            Cancel
                        </Button>
                    </TableCell>
                </TableRow>}
        </>
    )
}//end adminCategoryRow