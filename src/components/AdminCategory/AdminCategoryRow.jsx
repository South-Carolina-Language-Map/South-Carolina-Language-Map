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

    //useStates
    const [handleEditMode, setHandleEditMode] = useState(false);

    const CallEditMode = () => {
        console.log("CallEditMode", row.id);
        setHandleEditMode(true)
    }


    // function to edit this category
    const handleEdit = () => {
        console.log("HandleEdit", row.id);
    };


    //function to delete this row assocaited with ID
    const handleDelete = () => {
        console.log("Delete", row.id);
        dispatch({
            type: 'DELETE_CATEGORY',
            payload: row.id
        })
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
                            value={row.name} />
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            sx={{ mr: 1 }}
                            variant="contained"
                            onClick={handleEdit}
                        >
                            Submit
                        </Button>
                        <Button variant="contained" onClick={() =>setHandleEditMode(false)}>
                            Cancel
                        </Button>
                    </TableCell>
                </TableRow> }
        </>
    )
}//end adminCategoryRow